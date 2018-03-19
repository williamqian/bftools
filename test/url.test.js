describe('Url API:', function() {
    describe('#parseQueryString()', function() {
        it(`bftools.parseQueryString('https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10') deepEqual '{
            wd: '百度',
            rsv_spt: '10'
        }' should return true`, function() {
            let url = 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10'
            assert.deepEqual(bftools.parseQueryString(url), {
                wd: '百度',
                rsv_spt: '10'
            })
        });
        it(`bftools.parseQueryString('www.baidu.com?a=123&b=%26') deepEqual '{
            a: '123',
            b: '&'
        }' should return true`, function() {
            let url = 'www.baidu.com?a=123&b=%26'
            assert.deepEqual(bftools.parseQueryString(url), {
                a: '123',
                b: '&'
            })
        });
        it(`bftools.parseQueryString('') deepEqual '{}' should return true`, function() {
            let url = ''
            assert.deepEqual(bftools.parseQueryString(url), {})
        });
    });

    describe('#stringfyQueryString()', function() {
        it(`bftools.stringfyQueryString({
            wd: '百度',
            rsv_spt: '10'
        }) === 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10'  should return true`, function() {
            let param = {
                wd: '百度',
                rsv_spt: '10'
            }
            assert(bftools.stringfyQueryString(param) === 'wd=%E7%99%BE%E5%BA%A6&rsv_spt=10')
        });
    });
})