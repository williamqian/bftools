describe('Dom API:', function() {
    describe('#getScrollTop()', function() {
        let $body = document.body,
            bodyHeight = getComputedStyle($body).getPropertyValue('height'),
            length = 20;
        before(function() {
            $body.style.height = '10000px'
            bftools.setScrollTop(length)
        })
        it(`bftools.getScrollTop() should return true`, function() {
            assert(bftools.getScrollTop() === length)
        })
        after(function() {
            bftools.setScrollTop(0)
            $body.style.height = bodyHeight
        })
    });

    describe('#setScrollTop()', function() {
        let $body = document.body,
            bodyHeight = getComputedStyle($body).getPropertyValue('height'),
            length = 20;
        before(function() {
            $body.style.height = '10000px'
            bftools.setScrollTop(length)
        })
        it(`bftools.getScrollTop() should return true`, function() {
            bftools.setScrollTop(length)
            assert(bftools.getScrollTop() === length)
        })
        after(function() {
            bftools.setScrollTop(0)
            $body.style.height = bodyHeight
        })
    });

    describe('#offset()', function() {
        let $ele = null
        before(function() {
            let div = document.createElement('div')
            div.id = 'J_addClass'
            div.style.position = 'absolute'
            div.style.top = '200px'
            div.style.left = '300px'
            document.body.appendChild(div)
            $ele = document.querySelector('#J_addClass')
        })
        it(`bftools.offset() should return true`, function() {
            let offset = bftools.offset($ele)
            assert(offset.left === 300 && offset.top === 200)
        })
        after(function() {
            document.body.removeChild($ele)
        })
    });

    describe('#scrollTo()', function() {
        let $body = document.body,
            bodyHeight = getComputedStyle($body).getPropertyValue('height'),
            length = 20,
            y = 100,
            duration = 300;
        before(function() {
            $body.style.height = '10000px'
        })
        it(`bftools.scrollTo() should return true`, function(done) {
            bftools.scrollTo(y, duration)
            setTimeout(function() {
                assert(bftools.getScrollTop() === y)
                done()
            }, duration + 200)
        })
        after(function() {
            bftools.setScrollTop(0)
            $body.style.height = bodyHeight
        })
    });


    describe('#windowResize()', function() {
        let innerHeight = window.innerHeight
        it(`bftools.windowResize(downCb) should return true`, function(done) {
            bftools.windowResize(function() {
                // 键盘缩回回调
                assert(window.innerHeight == innerHeight)
                done()
            }, function() {})
            // 触发resize事件，模拟软键盘缩回
            window.dispatchEvent(new Event('resize'));
        })
    });

    describe('#windowResize()', function() {
        let innerHeight = window.innerHeight
        it(`bftools.windowResize(upCb) should return true`, function(done) {
            bftools.windowResize(function() {}, function() {
                // 键盘弹起回调
                assert(window.innerHeight === innerHeight - 200)
                done()
            })
            // 设置innerHeight，模拟软键盘弹起
            window.innerHeight = innerHeight - 200
            // 触发resize事件
            window.dispatchEvent(new Event('resize'));
        })
        after(function() {
            window.innerHeight = innerHeight
        })
    });


});