describe('Object API:', function() {
    describe('#deepClone()', function() {
        it(`person deepEqual bftools.deepClone(person) should return true`, function() {
            let person = {
                name: "user",
                settings: {
                    first: "1",
                    second: [1, 2, 3, 4, 3]
                }
            }
            assert.deepEqual(person, bftools.deepClone(person))
        });

        it(`person === bftools.deepClone(person) should return false`, function() {
            let person = {
                name: "user",
                settings: {
                    first: "1",
                    second: [1, 2, 3, 4, 3]
                }
            }
            assert.notEqual(person, bftools.deepClone(person))
        });
    });

    describe('#isEmptyObject()', function() {
        it(`bftools.isEmptyObject({}) should return true`, function() {
            assert(bftools.deepClone({}))
        });

        it(`bftools.isEmptyObject({ one: 1 }) should return false`, function() {
            assert.notEqual(bftools.isEmptyObject({
                one: 1
            }))
        });

        it(`bftools.isEmptyObject([]) should return false`, function() {
            assert.notEqual(bftools.isEmptyObject([]))
        });
    });
})