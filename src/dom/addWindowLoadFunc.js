/**
 * 
 * @desc   增加window onload事件后执行的函数
 * @param  {Function} func
 */
function addWindowLoadFunc(func)
{
    let oldFunc = window.onload;
    if (typeof(window.onload) !== 'function')
    {
        window.onload = func;
    }
    else
    {
        window.onload = function()
        {
            oldFunc();
            func();
        };
    };
};

module.exports = addWindowLoadFunc;