/**
 * 
 * @desc 通过jsonp方式获取微信jssdk的config，并且初始化微信jssdk
 * @param  {String} appid 公众号appid 
 * @param  {String} url jsonp地址 
 * @param  {Object} shareInfo
 * @param  {Array} apiList  
 * 
 */
let jsonp = require('../request/jsonp');
let jssdk = require('./jssdk');

function jsonpJssdk(appid, url, shareInfo, apiList) {
    jsonp({
        url: url,
        data: {
            jssdk_url: location.href,
            appid: appid
        },
        success: function(config) {
            jssdk(config, shareInfo, apiList);
        }
    });
}


module.exports = jsonpJssdk;