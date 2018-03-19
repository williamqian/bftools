describe('Device API:', function() {
    describe('#getExplore()', function() {
        it(`bftools.getExplore() should return "Chrome"`, function() {
            console.log(`Explore:${bftools.getExplore()}`)
            assert(/^Chrome:/.test(bftools.getExplore()))
        });
    });

    describe('#getOS()', function() {
        it(`bftools.getOS() should return "windows"`, function() {
            console.log(`OS:${bftools.getOS()}`)
            assert(bftools.getOS() === 'windows' || bftools.getOS() === 'MacOSX' || bftools.getOS() === 'linux')
        });
    });
});