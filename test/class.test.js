describe('Class API:', function() {
    describe('#addClass()', function() {
        let $ele = null
        before(function() {
            let div = document.createElement('div')
            div.id = 'J_addClass'
            document.body.appendChild(div)
            $ele = document.querySelector('#J_addClass')
        })
        it(`bftools.addClass($ele, 'test') should return true`, function() {
            bftools.addClass($ele, 'test')
            assert(bftools.hasClass($ele, 'test'))
        });
        after(function() {
            document.body.removeChild($ele)
        })
    });

    describe('#hasClass()', function() {
        let $ele = null
        before(function() {
            let div = document.createElement('div')
            div.id = 'J_hasClass'
            document.body.appendChild(div)
            $ele = document.querySelector('#J_hasClass')
            bftools.addClass($ele, 'test')
        })
        it(`bftools.hasClass($ele, 'test') should return true`, function() {
            assert(bftools.hasClass($ele, 'test'))
        });
        after(function() {
            document.body.removeChild($ele)
        })
    });

    describe('#removeClass()', function() {
        let $ele = null
        before(function() {
            let div = document.createElement('div')
            div.id = 'J_removeClass'
            document.body.appendChild(div)
            $ele = document.querySelector('#J_removeClass')
            bftools.addClass($ele, 'test')
        })
        it(`bftools.removeClass($ele, 'test') should return false`, function() {
            bftools.removeClass($ele, 'test')
            assert.notEqual(bftools.hasClass($ele, 'test'))
        });
        after(function() {
            document.body.removeChild($ele)
        })
    });
});