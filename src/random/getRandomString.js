/**
 * 
 * @desc 生成指定长度随机字符串
 * @param  {Number} length 
 * @param  {String} mode 
 * @return {String} 
 */
function getRandomString(length, mode) {
    let resStr = '';
    let chars = '';
    if (typeof(length) == 'undefined') {
        length = 16;
    }
    switch (mode) {
        case 'number':
            chars = '1234567890';
            break;
        default:
            chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            break;
    }
    let max = chars.length;
    for (let i = 0; i < max; i++) {
        resStr += chars[Math.floor(Math.random() * max)];
    }
    return resStr;
}

module.exports = getRandomString;