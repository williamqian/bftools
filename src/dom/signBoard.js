let isScreenHorizontal = require('../dom/isScreenHorizontal');
let extend = require('../object/extend');
let offset = require('../dom/offset');
/**
 * 
 * @desc 创建一个签字板
 * @param  {Object} options 
 * {
 *   container_id: 'my_container', //必填，容器ID，容器必须已设置宽高
 *   line_width: 8, //可选，笔画粗细
 *   color: '#000000', //可选，画笔颜色
 *   force_horizontal: false //可选，强制横屏
 * }
 * @api
 * signBoard.strokeCount //获取当前画的笔画数
 * signBoard.png //获取png图片数据，可直接用于img的src
 * signBoard.jpg //获取jpg图片数据，可直接用于img的src
 * signBoard.reset({line_width:12,color:'#ff0000'}) //重置画笔颜色、粗细
 * signBoard.clear() //清空画板
 * @example
 * <!DOCTYPE html>
 * <html>
 * <head>
 *    <title></title>
 *    <style>
 *    * {
 *        margin: 0;
 *        padding: 0;
 *    }
 *    html,body {
 *        height: 100%;
 *    }
 *    #container {
 *        width: 100%;
 *        height: 100%;
 *    }
 *    </style>
 * </head>
 *  <body>
 *    <div id="container"></div>
 *    <script src="dist/bftools.min.js"></script>
 *    <script>
 *      var sb = new(bftools.signBoard)({
 *          'container_id': 'container'
 *      });
 *    </script>
 * </body>
 * </html>
 *
 **/

class signBoard
{
    constructor(options)
    {
        let defaultOptions = {
            container_id: 'my_container',
            line_width: 8,
            color: '#000000',
            force_horizontal: false
        };
        let finalOptions = extend(
        {}, defaultOptions, options);
        this.container = document.getElementById(finalOptions.container_id);
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.line_width = finalOptions.line_width;
        this.color = finalOptions.color;
        this.force_horizontal = finalOptions.force_horizontal;
        this.strokeCount = 0;
        this.setSize();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", () =>
        {
            this.setSize()
        }, false);
        this.initEvents();
    }

    //是否需要旋转
    get isNeedRotate()
    {
        let bool = false;
        let isHorizontal = isScreenHorizontal();
        if (this.force_horizontal && !isHorizontal)
        {
            bool = true;
        }
        return bool;
    }
    //获取base64的png，可直接用于img src
    get png()
    {
        return this.canvas.toDataURL("image/png");
    }
    //获取base64的jpeg，可直接用于img src
    get jpg()
    {
        return this.canvas.toDataURL("image/jpeg");
    }
    setSize()
    {
        let wW = window.innerWidth;
        let wH = window.innerHeight;
        if (this.isNeedRotate)
        {
            document.body.style.width = `${wH}px`;
            document.body.style.height = `${wW}px`;
            document.body.style.transformOrigin = 'left bottom';
            document.body.style.transform = 'translateY(-100%) rotate(90deg)';
            this.canvas.setAttribute("width", `${this.container.clientWidth}px`);
            this.canvas.setAttribute("height", `${this.container.clientHeight}px`);

        }
        else
        {
            document.body.style.width = `${wW}px`;
            document.body.style.height = `${wH}px`;
            document.body.style.transformOrigin = 'center center';
            document.body.style.transform = 'none';
            this.canvas.setAttribute("width", `${this.container.clientWidth}px`);
            this.canvas.setAttribute("height", `${this.container.clientHeight}px`);

        }
    }
    initEvents()
    {
        let touchStartY = {
            y0: 0,
            y1: 0
        };
        let touchStartX = {
            x0: 0,
            x1: 0
        };
        let isMouseDown = false;
        //移动端事件初始化
        let touchstartFunc = (e) =>
        {
            e.stopPropagation();
            e.preventDefault();
            this.context.beginPath();
            this.context.lineWidth = this.line_width;
            this.context.strokeStyle = this.color;
            if (e.touches.length > 1)
            {
                touchStartY.y0 = e.touches[0].clientY;
                touchStartY.y1 = e.touches[1].clientY;
                touchStartX.x0 = e.touches[0].clientX;
                touchStartX.x1 = e.touches[1].clientX;
            }
        };
        let touchmoveFunc = (e) =>
        {
            e.stopPropagation();
            e.preventDefault();
            if (e.touches.length == 1)
            {
                let touchX = e.touches[0].clientX;
                let touchY = e.touches[0].clientY;
                if (this.isNeedRotate)
                {
                    let temp = touchY;
                    touchY = window.innerWidth - touchX; //parseInt(this.canvas.getAttribute("height")) - touchX;
                    touchX = temp;
                }
                //console.log(touchX, touchY);
                this.context.lineTo(touchX - offset(this.canvas).left, touchY - offset(this.canvas).top);
                this.context.stroke();
                this.strokeCount++;
            }
            else
            {
                let cur_y_0 = e.touches[0].clientY;
                let cur_y_1 = e.touches[1].clientY;
                let cur_x_0 = e.touches[0].clientX;
                let cur_x_1 = e.touches[1].clientX;
                if ((cur_y_0 < (touchStartY.y0 - 30) && cur_y_1 < (touchStartY.y1 - 30) && !this.isNeedRotate) || (cur_x_0 > (touchStartX.x0 + 30) && cur_x_1 > (touchStartX.x1 + 30) && this.isNeedRotate))
                {
                    console.log('触发双指上滑事件');
                }

            }
        };
        let touchendFunc = (e) =>
        {
            e.stopPropagation();
            this.context.closePath();
        };
        //document.addEventListener('touchstart', touchstartFunc);
        this.canvas.addEventListener('touchstart', touchstartFunc);
        //document.addEventListener('touchmove', touchmoveFunc);
        this.canvas.addEventListener('touchmove', touchmoveFunc);
        //document.addEventListener('touchend', touchendFunc);
        this.canvas.addEventListener('touchend', touchendFunc);

        //pc端事件初始化
        let mousedownFunc = (e) =>
        {
            e.stopPropagation();
            e.preventDefault();
            this.context.beginPath();
            this.context.lineWidth = this.line_width;
            this.context.strokeStyle = this.color;
            isMouseDown = true;
        };
        let mousemoveFunc = (e) =>
        {
            e.stopPropagation();
            e.preventDefault();
            e = e || window.event;
            if (isMouseDown)
            {
                let x = e.clientX;
                let y = e.clientY;

                if (this.isNeedRotate)
                {
                    let temp = y;
                    y = window.innerWidth - x; //parseInt(this.canvas.getAttribute("height")) - x;
                    x = temp;
                }
                //console.log(x, y);
                this.context.lineTo(x - offset(this.canvas).left, y - offset(this.canvas).top);
                this.context.stroke();
                this.strokeCount++;
            }
        };
        let mouseupFunc = (e) =>
        {
            e.stopPropagation();
            e.preventDefault();
            this.context.closePath();
            isMouseDown = false;
        };
        //document.addEventListener('mousedown', mousedownFunc);
        this.canvas.addEventListener('mousedown', mousedownFunc);
        this.canvas.addEventListener('mousemove', mousemoveFunc);
        //document.addEventListener('mouseup', mouseupFunc);
        this.canvas.addEventListener('mouseup', mouseupFunc);
    }
    reset(options)
    {
        this.line_width = options.line_width;
        this.color = options.color;
    }
    clear()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.strokeCount = 0;
    }
}


module.exports = signBoard;