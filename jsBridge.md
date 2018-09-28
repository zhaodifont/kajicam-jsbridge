## jsBridge 文档

[返回首页](./index.md)
[]()

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
        // 注册一个回调函数  此回调函数是属于 AppInfo的
        const callbackMethodFullName = this._registerCallback("appInfo", userCallback, AppInfo);
        
        // 通过与app约定好的功能名称唤起此功能  
        this._calliOSFunction("appInfo", null, callbackMethodFullName);
         // this.calliOSFunction("appInfo", null, "B612Kaji.Native.ios.Function.getInstance().callback.appInfo")
        
    }
    
    //成功示例  注意 返回的信息属于异步请求返回的数据 如果同步的代码中需要使用此信息会失败、异常
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
 
> save的进化版  不仅能保存 还分享
>
> 分享面板弹出一次的过程中 弹出和关闭都会触发此函数的回调函数
> 
> For example:

```
import SaveShareParam from "@/common/bridge/param/SaveShareParam";

export function handleSave(){
  const param = new SaveShareParam($('#distImg')[0].src, SaveShareParam.types.image);
  let stat = false; //  初始一个变量 这次未统计
  bridgeFactory.getBridge().shareWithCallback(param, result => {
    if(!stat){ //  这样只统计一次
      showToast('保存成功')
      iosState = !iosState
      _hmt.push(['_trackEvent', eventCategory+ inState, 'Btn', '保存分享' + _years[yearAct].imgTial[_styleAct]])
    }
  }, res => {
  });
}
```

### eventCamera
```
/**
  * 调用相机或相册功能 并将拍摄或获取的照片返回给页面.
  * @param eventCameraParam : (@see ./param/EventCameraParam)
  * @param userCallback
*/
    eventCamera(eventCameraParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("eventCamera", userCallback,
            CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        this._calliOSFunction("eventCamera", eventCameraParam, callbackMethodFullName);
    }

    eventCameraWithLandmarks(eventCameraParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("eventCameraWithLandmarks", userCallback,
            CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        this._calliOSFunction("eventCameraWithLandmarks", eventCameraParam, callbackMethodFullName);
    }
```

> eventCameraParam **这个参数引用自**: ( ./param/EventCameraParam)
>

```
import EventCameraParam from "@/common/bridge/param/EventCameraParam";

const param = new EventCameraParam(
            EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
            EventCameraParam.cameraPositions.front, // 前置摄像头 0  后置摄像头: 1
            comConfig.filterId, // 贴纸id
            comConfig.categoryId, // 分栏id (贴纸是在分栏里面的 所以app一般找贴纸先找到贴纸所在的分栏)
            comConfig.stickerId, // 贴纸id
            '', // 貌似是 音乐id
            'true' // 是否自动下载此贴纸  鸡肋 以后改为默认自动下载 (如咔叽里此贴纸未下载 则无法选中使用)
    );

const galleryParams = new EventCameraParam(EventCameraParam.types.imageAlbum);

$('#cameraBtn, #galleryBtn').off('click') // 每次添加事件 先解除 否则多次添加事件会调用失败、异常
$('#cameraBtn').on('click', function(){
  bridgeFactory.getBridge().eventCamera(param, eventCameraCallback)
   _hmt.push(['_trackEvent', eventCategory+ inState, 'Btn', '相机拍照'])
})
$('#galleryBtn').on('click', function(){
  bridgeFactory.getBridge().eventCamera(galleryParams, eventCameraCallback)
   _hmt.push(['_trackEvent', eventCategory+ inState, 'Btn', '相册选取'])
})
      
```
> eventCameraWithLandmarks 为更高级的接口 不仅能返回拍摄、选取的照片  
>
> 如果拍摄、选取的是人物脸部 能够获取此照片的脸部坐标 一起返回给页面
```

function eventCameraCallback(res, type){
 if (!!res.success == true) {
   const imgSrc = res.base64Image
   const landmark = res.landmarks // 如果有坐标 一起传给人脸融合接口 效果更佳
   const type = type // 此次调用的是 相机还是相册
 }
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

###  getCameraImage

```
/**
     * 场景: 用户先在app中使用某贴纸拍照 拍照完出现一个confirmbanner 点击banner 进入H5页面.
     * 那么进入h5页面后 能够获取到拍摄的照片
     * @param userCallback
     */
    getCameraImage(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImage", userCallback, CameraResult);
        this._calliOSFunction("getCameraImage", null, callbackMethodFullName);
    }

    getCameraImageWithLandmarks(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImageWithLandmarks", userCallback, CameraResult);
        this._calliOSFunction("getCameraImageWithLandmarks", null, callbackMethodFullName);
    }
    
 ```

###  _calliOSFunction & _openCustomURLinIFrame

```
/**
  * ios 与app联动的原理
  * (app scheme 决定使用的是beta 还是 real app)
  *
  * @param functionName - 与app约定的function name
  * @param args - 传送参数对象 argument object
  * @param sCallback - 在app中传出回调
  * @private
*/
    _calliOSFunction(functionName, args, sCallback) {
        let url = ConfigFactory.scheme + "native/";
        const callInfo = {};
        callInfo.functionName = functionName;
        if (sCallback) {
            callInfo.success = sCallback;
        }
        if (args) {
            callInfo.args = args;
        }
        url += JSON.stringify(callInfo);

        this._openCustomURLinIFrame(url);
    }

    _openCustomURLinIFrame(src) {
        const rootElm = document.documentElement;
        const newFrameElm = document.createElement("IFRAME");

        newFrameElm.setAttribute("src", src);
        rootElm.appendChild(newFrameElm);
        newFrameElm.parentNode.removeChild(newFrameElm);
    }
 ```









[返回首页](./index.md)


