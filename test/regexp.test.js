describe('Regexp API:', function() {

    describe('#isEmail()', function() {
        it('bftools.isEmail("leiquanlive.com") should return false ', function() {
            assert.notEqual(bftools.isEmail("leiquanlive.com"))
        });
        it('bftools.isEmail("leiquan@live.com") should return true ', function() {
            assert(bftools.isEmail("leiquan@live.com"))
        });
    });

    describe('#isIdCard()', function() {
        it('bftools.isIdCard("622224188203234033") should return true ', function() {
            assert(bftools.isIdCard("622224188203234033"))
        });
        it('bftools.isIdCard("zas224188203234033") should return false', function() {
            assert(!bftools.isIdCard("leiquan@live.com"))
        });
    });

    describe('#isPhoneNum()', function() {
        it('bftools.isPhoneNum("18882324234") should return true ', function() {
            assert(bftools.isPhoneNum("18882324234"))
        });
        it('bftools.isPhoneNum("8618882324234") should return true ', function() {
            assert(bftools.isPhoneNum("8618882324234"))
        });
        it('bftools.isPhoneNum("5534553") should return false', function() {
            assert(!bftools.isPhoneNum("5534553"))
        });
    });

    describe('#isUrl()', function() {
        it('bftools.isUrl("https://www.baidu.com/s?wd=www.slane.cn&rsv_spt=1") should return true ', function() {
            assert(bftools.isUrl("https://www.baidu.com/s?wd=www.slane.cn&rsv_spt=1"))
        });
        it('bftools.isUrl("http://www.baidu.com/s?wd=www.slane.cn&rsv_spt=1") should return true ', function() {
            assert(bftools.isUrl("http://www.baidu.com/s?wd=www.slane.cn&rsv_spt=1"))
        });
        it('bftools.isUrl("www.baidu.com") should return true', function() {
            assert(bftools.isUrl("www.baidu.com"))
        });
        it('bftools.isUrl("baidu.com") should return true', function() {
            assert(bftools.isUrl("baidu.com"))
        });
        it('bftools.isUrl("http://baiducom") should return false', function() {
            assert(!bftools.isUrl("http://baiducom"))
        });
    });

});