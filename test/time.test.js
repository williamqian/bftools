describe('Time API:', function() {
    describe('#formatPassTime()', function() {
        it(`bftools.formatPassTime(new Date().getTime() - 30000) === '"刚刚"' should return true`, function() {
            let time = new Date().getTime() - 30000
            assert(bftools.formatPassTime(time) === "刚刚")
        });

        it(`bftools.formatPassTime(new Date().getTime() - 70000) === '"1分钟前"' should return true`, function() {
            let time = new Date().getTime() - 70000
            assert(bftools.formatPassTime(time) === "1分钟前")
        });

        it(`bftools.formatPassTime(new Date().getTime() - 70000 * 60) === '"1小时前"' should return true`, function() {
            let time = new Date().getTime() - 70000 * 60
            assert(bftools.formatPassTime(time) === "1小时前")
        });

        it(`bftools.formatPassTime(new Date().getTime() - 70000 * 60 * 24) === '"1天前"' should return true`, function() {
            let time = new Date().getTime() - 70000 * 60 * 24
            assert(bftools.formatPassTime(time) === "1天前")
        });

        it(`bftools.formatPassTime(new Date().getTime() - 70000 * 60 * 24 * 30) === '"1个月前"' should return true`, function() {
            let time = new Date().getTime() - 70000 * 60 * 24 * 30
            assert(bftools.formatPassTime(time) === "1个月前")
        });

        it(`bftools.formatPassTime(new Date().getTime() - 70000 * 60 * 24 * 30 * 12) === '"1年前"' should return true`, function() {
            let time = new Date().getTime() - 70000 * 60 * 24 * 30 * 12
            assert(bftools.formatPassTime(time) === "1年前")
        });
    });

    describe('#formatRemainTime()', function() {
        it(`bftools.formatRemainTime(new Date().getTime() + oneSecond + oneMinute + oneHour + oneDay) === '"1天1小时1分钟1秒"' should return true`, function() {
            let time = new Date().getTime(),
                oneSecond = 1000,
                oneMinute = oneSecond * 60,
                oneHour = oneMinute * 60,
                oneDay = oneHour * 24;
            time = time + oneSecond + oneMinute + oneHour + oneDay
            assert(bftools.formatRemainTime(time) === "1天 1小时 1分钟 1秒")
        });
    });

    describe('#isSameDay()', function() {
        it(`bftools.isSameDay(new Date()) should return true`, function() {
            assert(bftools.isSameDay(new Date()) === true)
        });
        it(`bftools.isSameDay(new Date(), new Date(new Date().getTime() - 86400000)) should return false`, function() {
            assert(bftools.isSameDay(new Date(), new Date(new Date().getTime() - 86400000)) === false)
        });
    });
})