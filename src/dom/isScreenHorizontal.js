/**
 * 
 * @desc  判断屏幕是不是横屏
 * 
 */
function isScreenHorizontal() {
    let bool = true;
    if (typeof(window.orientation) != 'undefined') {
        if (window.orientation != 90 && window.orientation != -90) {
            bool = false;
        }
    } else {
        if (window.innerWidth < window.innerHeight) {
            bool = false;
        }
    }
    return bool;
}

module.exports = isScreenHorizontal;