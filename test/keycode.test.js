describe('Keycode API:', function() {

    describe('#getKeyName()', function() {
        it(`bftools.getKeyName(13) should return "Enter"`, function() {
            assert(bftools.getKeyName(13) === 'Enter')
        });
    });

});