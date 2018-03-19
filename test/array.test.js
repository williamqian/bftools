describe('Array API:', function() {
    describe('#arrayEqual()', function() {
        it(`bftools.arrayEqual([0, 2, 3], [1, 2, 3]) should return false`, function() {
            assert.notEqual(bftools.arrayEqual([0, 2, 3], [1, 2, 3]))
        });
        it('bftools.arrayEqual([1, 2, 3], [1, 2, 3]) should return true', function() {
            assert(bftools.arrayEqual([1, 2, 3], [1, 2, 3]))
        });
        let arr = [8, 2, 3, 4, 7, 8]
        it(`bftools.arrayEqual([${arr},${arr}]) should return true`, function() {
            assert(bftools.arrayEqual(arr, arr))
        });
    });
});