## jsBridge 文档

[返回首页](./index.md)
 
 
* 对于 jsBridge
* 在android beta app和real app可以用同一份jsbridge 没有区别
* 在ios中(_calliOSFunction 函数) : 
  - beta app调用jsbridge 设置scheme为 **b612cnb://native/** 
  - real app调用jsbridge 设置scheme为 **b612cn://native/**
  

### jsBridge的引入

```
// bridge/BridgeFactory.js
export default class BridgeFactory {
    static getBridge() {
        if (BrowserChecker.isIos()) {
            return new IosBridge();

        } else if (BrowserChecker.isAndroid()) {
            return new AndroidBridge();

        } else {
            return new NullBridge();
        }
    }
}
```

判断 ios: 引入iosBridge；  android: 引入AndroidBridge； 其他系统: 引入NullBridge (不触发咔叽的功能 只会给一个log提示)


### appInfo

```
/**
     * app 在app内部获取app的信息
     * @param userCallback
     *    : callback param 0 - ./model/AppInfo
     */
    appInfo(userCallback) {
        const callbackMethodFullName = this._registerCallback("appInfo", userCallback, AppInfo);
        this._calliOSFunction("appInfo", null, callbackMethodFullName);
    }
    
    //成功示例
    {app: '7.3.1', 'os': '23', 'deviceModel': 'CAM-TL00', 'language': 'zh-CN', 'country': 'CN'}
```


### shareWithCallback

```
/**
     * 将页面中的图片或视频 保存到用户的手机终端 并触发分享
     * @param saveShareParam (@see ./param/SaveShareParam)
     * @param sharePoppedCallback - app中分享面板弹出时触发 (关闭面板时可能会再次触发) callback
     * @param shareMediaClickedCallback - app选择分享媒介时触发 callback (现阶段无效 ??)
     */
    shareWithCallback(saveShareParam, sharePoppedCallback, shareMediaClickedCallback) {
        const sharePoppedCallbackName = this._registerCallback('sharePoppedCallback', sharePoppedCallback, AppCommonResult);
        const shareMediaClickedCallbackName = this._registerCallback('shareMediaClickedCallback', shareMediaClickedCallback, AppCommonResult);

        const options = JSON.parse(saveShareParam.toString());
        options.clickShareButton = shareMediaClickedCallbackName;

        this._calliOSFunction("share", options, sharePoppedCallbackName);
    }
 ```
 
> save的进化版  不近能保存 还分享
>
> 分享面板弹出一次的过程中 弹出和关闭都会触发此函数 正确统计这一次的分享
> 
> 一般使用此功能时 代码可能是这样:
```
export function handleSave(){
  const param = new SaveShareParam($('#distImg')[0].src, SaveShareParam.types.image);
  var iosState = false; //  设置一个变量
  bridgeFactory.getBridge().shareWithCallback(param, result => {
    if(!iosState){ //  这样只统计一次
      showToast('保存成功')
      iosState = !iosState
      _hmt.push(['_trackEvent', eventCategory+ inState, 'Btn', '保存分享' + _years[yearAct].imgTial[_styleAct]])
    }
  }, res => {
  });
}
```


### save
```
/**
     * 将页面中的图片或视频 保存到用户的手机终端
     * @param saveShareParam (@see ./param/SaveShareParam)
     * @param userCallback
     */
    save(saveShareParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("save", userCallback, AppCommonResult);
        this._calliOSFunction("save", saveShareParam, callbackMethodFullName);
    }
 ```
 
> 使用频率较低  注意和 shareWidthCallback的区别













[返回首页](./index.md)


