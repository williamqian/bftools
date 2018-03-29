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

let options = {
    appid: '', //必填， 公众号appid
    url: '', //必填， jsonp url地址
    callback: 'callback', //可选，jsonp 回调键名
    data: { //可选， jsonp get参数
        jssdk_url: location.href
    },
    isDebug: false, //可选， 是否开启jssdk调试模式
    shareInfo: { //可选， 微信分享接口信息
        title: document.title,
        des: document.title,
        link: location.href,
        image: '',
    },
    apiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], //可选， 要使用的jssdk接口
    success: function() {}, //可选，wx.ready回调
    error: function() {}, //可选，wx.error回调

}

function jsonpJssdk(options) {
    jsonp({
        url: options.url,
        data: {
            jssdk_url: location.href,
            appid: options.appid
        },
        callback: 'callback',
        success: function(config) {
            jssdk(config, shareInfo, apiList);
        }
    });
}

function jsonpJssdk(appid, url, shareInfo, apiList) {
    jsonp({
        url: url,
        data: {
            jssdk_url: location.href,
            appid: appid
        },
        callback: 'callback',
        success: function(config) {
            jssdk(config, shareInfo, apiList);
        }
    });
}


module.exports = jsonpJssdk;