## jsBridge 文档

[testUrl](https://zhaodifont.github.io/kajicam/bridge.html)

### jsBridge

* 区分ios、android
```
// @/js/bridge/BridgeFactory.js

import AndroidBridge from "./AndroidBridge";
import IosBridge from "./IosBridge";

export default class BridgeFactory {
    static getBridge() {
        if (BrowserChecker.isIos()) {
            return new IosBridge();

        } else if (window.B612KajiBridgeInterface != undefined && BrowserChecker.isAndroid()) {
            return new AndroidBridge();

        } else {
            return new NullBridge();
        }
    }
}
const Bridge = BridgeFactory.getBridge()
export default Bridge

```
* 引入jsbridge
```
// main.js
import Bridge from '@/js/bridge/BridgeFactory'

let isInApp = false //初始默认app外
Bridge.[调用指定功能]

```


```
// IosBridge.js 呼起App功能

 _calliOSFunction(functionName, args, sCallback) {
    let url = scheme + "native/"
    // - ios betaApp 设置 scheme = 'b612cnb://native/'
    // - ios realApp 设置 scheme为 = 'b612cn://native/'

 }
  // 如果scheme设置错误 出现的场景是 在betaApp跳至realApp 或反之
  // 当然 这个场景只会只会出现在ios中
```
> android在App的beta、real两种环境引入的jsbridge没有不同
>
> ios不同的环境在_calliOSFunction方法中设置不同的scheme

### appInfo

* 查询app信息 6.5.3

```
Bridge.appInfo(res => {
      // res : {app, os, deviceModel, language, country, duid(7.10.1)}
      if (res.app) {
        isInApp = true
      }
    })
  // 注 返回的res信息属于异步返回的数据 如果同步的代码中需要使用此信息会失误
```
> 只有在app内部，回调才会执行，改变isInApp状态
>
> 返回的res信息属于异步返回的数据 如果同步的代码中需要使用此信息会失误

### save

* 保存图片 6.7.0

```
import SaveShareParam from "@/common/bridge/param/SaveShareParam"

$('#saveBtn').on('click', () => {
  if ($('#distImg').attr('src').length == 0) {
    alert('plz select media')
  } else {
    const param = new SaveShareParam({
      url: $('#distImg').attr('src'),
      type: SaveShareParam.types.image
    })
    Bridge.save(param, () => {
      alert('save success')
    })
  }
})
```

### shareWithCallback

* 保存 + 分享 6.5.3  shareWebPage 6.7.0 shareVideo 8.0.0

```
$('#shareVideo').on('click', () => {
  let params = new SaveShareParam({
    url: 'https://b612-static.kajicam.com/stickerpr/1391/file_media_1_1545207714759.mp4',
    type: SaveShareParam.types.video
  });
  var iosShared = false //分享面板弹出一次的过程中 弹出和关闭都会触发此函数的回调函数
  Bridge.shareWithCallback(params, result => {
    if (!iosShared){
      iosShared = !iosShared
      alert('video has been saved, plz choose to share from album')
    }
  }, res => {})
})
```

### eventCamera & eventCameraWithLandmarks

> 调用相机或相册功能 并将拍摄或获取的照片（或人脸坐标）返回给页面  （6.5.0）
>

```
/**
  * @param eventCameraParam : (@see ./param/EventCameraParam)
  * @param userCallback
*/
   // ios
    eventCamera(eventCameraParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("eventCamera", userCallback,
            CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        this._calliOSFunction("eventCamera", eventCameraParam, callbackMethodFullName);
    }

    // eventCameraWithLandmarks 仅兼容app7.6.0以上
    // 在android中 如果拍照非人脸 则无法触发回调函数 慎用！！
    // (2018.11.21更新) android 版本7.9.3+ 已修复非人脸无回调bug

    eventCameraWithLandmarks(eventCameraParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("eventCameraWithLandmarks", userCallback,
            CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        this._calliOSFunction("eventCameraWithLandmarks", eventCameraParam, callbackMethodFullName);
    }


    // android 中注意 当前版本中 需要把categoryId、stickerId强制设置为undefined 不然调用时会出现卡死闪退的情况
    // 只使用 filterId即可
    // eventCameraWithLandmarks同理
    eventCamera(eventCameraParam, userCallback) {
        if(BrowserChecker.isAndroid()) {
            // eventCameraParam.filterId = undefined;
            eventCameraParam.categoryId = undefined;
            eventCameraParam.stickerId = undefined;
        }
        const callbackMethodFullName = this._registerCallback(
            "eventCamera", userCallback, EventCameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        native.eventCamera(callbackMethodFullName, eventCameraParam.toString(true));
    }

```

> eventCameraParam
>

```
import EventCameraParam from "@/common/bridge/param/EventCameraParam";

const param = new EventCameraParam(
            EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
            EventCameraParam.cameraPositions.front, // 前置摄像头 0  后置摄像头: 1
            comConfig.filterId, // 滤镜id
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
>
> For example
>

```
function eventCameraCallback(res, type){
 if (!!res.success == true) {
   const imgSrc = res.base64Image
   const landmark = res.landmarks // （如果有坐标 一起传给人脸融合接口 约定启用商汤融合技术 效果更佳）
   const type = type // 此次调用的是 相机还是相册
 }
}

```

###  getCameraImage

>加载最后拍摄的图片 (6.5.3)
>

```
/**
     * 场景: 用户先在app中使用某贴纸拍照 拍照完出现一个confirmbanner 点击banner 进入H5页面.
     * 那么进入h5页面后 能够获取到刚拍摄的照片
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

### uuid

> inappBrowser请求page时，把URL的 {ad_did}部分转换为uuid的功能。 （7.3.0版本以上支持）
>

```
  http://qa.b612kaji.com/test/test_uuid.html?uuid={ad_did}
  <a href="b612cnb://inappBrowser?url=http%3A%2F%2Fqa.b612kaji.com%2Ftest%2Ftest_uuid.html%3Fuuid%3D%7Bad_did%7D">UUID</a>
```

> uuid获取是用页面url的部分参数转换的方式，外部浏览器也可模仿这个参数，会有滥用的问题。
>
> 建议仅支持在inAppBrowser时使用 （jsBridge的 appInfo 来判断是否为inAppBrowser打开）


###  login

> 用户登录  （7.7.5）
>

```
    // 源码
    import UserInfo from "./model/UserInfo";
    login(userCallback) {
        const callbackMethodFullName = this._registerCallback("login", userCallback, UserInfo);
        this._calliOSFunction("login", null, callbackMethodFullName);
    }

```

> beta版 测试方法
>
> 在web打开以下链接，点击BETA按钮，即可进行测试 http://qa.b612kaji.com/app-static/kaji/login-test/link.html
>

step1. InAppBrowser 启动时产出cookie  
>
> 出现token cookie 的条件：
>
>1、 在kaji webview中打开，2、 一级域名为 ".snowcam.cn", ".b612kaji.com", ".yiruikecorp.com"

> 结果：
>
> 在app内 document.cookie 有一个(第一种sessionKey) 为 B6_SES=oOIUgm.....
>
```
bridge.login(userInfo => {
  console.log(userInfo.B6_SES);  //  跟第一种sessionKey很像 为登录准备的变体 这是第二种sessionKey
})
```
step2. Click按钮 -> 调起 jsBridge.login() function
step3. 登录成功后，输出通过callback 发送的session key  (userInfo.B6_SES 第二种sessionKey)
step4. session key -> API SERVER -> user 信息查询 (通过userInfo.B6_SES 发送ajax请求获取用户信息)

```
var sessionKey = document.cookie.split("=")[1];
//var sessionKey = "N9CtB4ZZOfEjGCk9i4le0oO4StKZrGBgW2l+lQQIjBboQmKQmWlYN3BRtLXfrpOCxFC7wQtYXHdIIYOw6+Itwyh25rv2reM93aXWEMGaEdI=";
console.log(sessionKey);
var url = "http://qa-api.b612kaji.com/v2/user/me";
// var url = "http://api.b612kaji.com/v2/user/me"; // real
$.ajax({
  url : url,
  dataType: "text",
  headers: {
    'Authorization': 'Bearer ' + sessionKey // 这里用的是第一种sessionKey
  },
  success : function(response) {
    console.log(response);
    document.write(response);
  }
});

```

### close

>  在咔叽webview中的h5页面关闭webView （6.5.3版本以上支持）
>

```
// 源码

// android:
close() {
  native.close()
}

// ios
close() {
  this._calliOSFunction("close", null, null);
}

 // 调用

 $('.exit button').click(() => {
      BridgeFactory.getBridge().close()
    })
```

### titleBarVisible

> 隐藏title区域，全屏展示 (7.10.1)
>

```
  	b612cnb://native/{"functionName":"titleBarVisible","args":{"isVisible": false}}
```





[返回首页](./index.md)
