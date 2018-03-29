let stringfyQueryString = require('../url/stringfyQueryString');
let getRandomString = require('../random/getRandomString');
/**
 * 
 * @desc  jsonp跨域获取数据
 * @param {Object} options 
 * {
 * 	url:'http://a.com',//jsonp地址
 *  data:{},//url后所带数据
 *  callback:'cb',//回调键名
 *  success:function(data){}//成功回调
 * }
 */
function jsonp(argOptions) {
    let defaultOptions = {
        callback: 'callback',
    };
    let options = Object.assign({}, defaultOptions, argOptions);
    let url = options.url;
    let data = options.data;

    let oBody = document.getElementsByTagName('body')[0];
    let oScript = document.createElement('script');

    let callbackName = 'cb' + getRandomString(16, 'number');

    window[callbackName] = function(result) {
        options.success(result);
    }
    data[options.callback] = callbackName;

    oScript.setAttribute('src', url + '?' + stringfyQueryString(data));
    oBody.append(oScript);
}

module.exports = jsonp;