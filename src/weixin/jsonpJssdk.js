let jsonp = require('../request/jsonp');
let jssdk = require('./jssdk');
let extend = require('../object/extend');
/**
 * 
 * @desc 通过jsonp方式获取微信jssdk的config，并且初始化微信jssdk
 * @param  {Object} options 
 *{
 *    appid: '', //必填， 公众号appid
 *    url: '', //必填， jsonp url地址
 *    callback: 'callback', //可选，jsonp 回调键名
 *    data: { //可选， jsonp get参数
 *        jssdk_url: location.href
 *    },
 *    isDebug: false, //可选， 是否开启jssdk调试模式
 *    shareInfo: { //可选， 微信分享接口信息
 *        title: document.title,
 *        des: document.title,
 *        link: location.href,
 *        image: '',
 *    },
 *    apiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], //可选， 要使用的jssdk接口
 *    success: function() {}, //可选，wx.ready回调
 *    error: function(res) {}, //可选，wx.error回调*
 *}
 *
 **/


function jsonpJssdk(options) {
    let defaultOptions = {
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
        error: function(res) {}, //可选，wx.error回调
    };
    let finalOptions = extend({}, defaultOptions, options);
    jsonp({
        url: finalOptions.url,
        data: {
            jssdk_url: finalOptions.data.jssdk_url,
            appid: finalOptions.appid
        },
        callback: options.callback,
        success: function(config) {
            config.debug = finalOptions.isDebug;
            jssdk(config, finalOptions.shareInfo, finalOptions.success, finalOptions.error, finalOptions.apiList);
        }
    });
}

module.exports = jsonpJssdk;