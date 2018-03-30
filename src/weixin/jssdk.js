const wx = require('wx');
let extend = require('../object/extend');
/**
 * 
 * @desc 微信jssdk config注入以及分享接口调用
 * @param  {Object} config 
 * @param  {Object} shareInfo
 * @param  {Array} apiList  
 * 
 */
function jssdk(config, shareInfo, success, error, apiList) {
    //判断有没有引入微信jssdk官方库
    if (typeof(wx) === 'undefined') {
        console.error('lack of http://res.wx.qq.com/open/js/jweixin-*.*.*.js ');
        return;
    }
    let defaultShareInfo = {
        title: document.title,
        des: document.title,
        link: location.href,
        image: ''
    };
    let finalShareInfo = extend({}, defaultShareInfo, shareInfo);
    let defaultApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
    let finalApiList = defaultApiList;
    if (Array.isArray(apiList)) {
        finalApiList = defaultApiList.concat(apiList.filter(el => !defaultApiList.includes(el)));
    }
    wx.config({
        debug: config.debug ? true : false,
        appId: config.appid,
        timestamp: config.timestamp,
        nonceStr: config.nonce_str,
        signature: config.signature,
        jsApiList: finalApiList
    });
    wx.ready(function() {
        wx.onMenuShareTimeline({
            title: finalShareInfo.title, // 分享标题
            link: finalShareInfo.link, // 分享链接
            imgUrl: finalShareInfo.image, // 分享图标
            success: function() {

            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: finalShareInfo.title, // 分享标题
            desc: finalShareInfo.des, // 分享描述
            link: finalShareInfo.link, // 分享链接
            imgUrl: finalShareInfo.image, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        if (typeof(success) === 'function') {
            success();
        }
    });
    wx.error(function(res) {
        if (typeof(error) === 'function') {
            error();
        }
    });
}


module.exports = jssdk;