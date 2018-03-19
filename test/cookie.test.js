describe('Cookie API:', function() {
    describe('#getCookie()', function() {
        before(function() {
            bftools.setCookie('test', 'getTestValue')
        })
        it(`bftools.getCookie('test', 'getTestValue') should return true`, function() {
            assert(bftools.getCookie('test') === 'getTestValue')
        })
        after(function() {
            bftools.removeCookie('test')
        })
    })

    describe('#removeCookie()', function() {
        before(function() {
            bftools.setCookie('test', 'removeTestValue')
        })
        it(`bftools.removeCookie('test') should return false`, function() {
            bftools.removeCookie('test')
            assert.notEqual(bftools.getCookie('test') === 'removeTestValue')
        })
    })

    describe('#setCookie()', function() {
        it(`bftools.getCookie('test', 'setCookie') should return true`, function() {
            bftools.setCookie('test', 'setCookie')
            assert(bftools.getCookie('test') === 'setCookie')
        })
        after(function() {
            bftools.removeCookie('test')
        })
    })
})