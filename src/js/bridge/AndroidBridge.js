import AbstractBridge from "./AbstractBridge"
import AppInfo from "./model/AppInfo"
import UserInfo from "./model/UserInfo"
import AppCommonResult from "./model/AppCommonResult"
import EventCameraResult from "./model/EventCameraResult"
import GetCameraResult from "./model/GetCameraResult"
import CameraResult from "./model/CameraResult"
import VideoResult from "./model/VideoResult"
import BrowserChecker from "../util/BrowserChecker"

let instance = null;
let native = window.B612KajiBridgeInterface;

export default class AndroidBridge extends AbstractBridge {
    constructor() {
        super()
        if (!instance) {
            instance = this;
            super._initInstance(instance);
        }
        return instance;
    }

    /**
    * app 内通过回调获取基本信息 6.5.3
    * callBack返回 {app, os, deviceModel, language, country, duid(7.10.1)}
    * @param userCallback
    *    : callback param 0 - ./model/AppInfo
    */
    appInfo(userCallback) {
      //B612.native.IosBridge.callback.appInfo
      const callbackMethodFullName = this._registerCallback("appInfo", userCallback, AppInfo)
      native.appInfo(callbackMethodFullName)
    }

    /**
    * 保存媒体成功 6.7.0
    * 调用成功后才执行callback
    * @param saveShareParam (@see ./param/SaveShareParam)
    * @param userCallback
    */
    save(saveShareParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("save", userCallback, AppCommonResult);
        native.save(callbackMethodFullName, saveShareParam.toString());
    }

    /**
    * 分享并保存媒体 6.7.0
    * 调用成功后才执行callback
    * 支持标题、内容、图标、链接 8.0.0
    * @param saveShareParam (@see ./param/SaveShareParam)
    * @param sharePoppedCallback - app에서 공유 div를 보여준 후 호출되는 callback
    * @param shareMediaClickedCallback - app에서 share 매체를 선택한 후 callback (호출되지 않는데 ??)
    */
    shareWithCallback(saveShareParam, sharePoppedCallback, shareMediaClickedCallback) {
        const sharePoppedCallbackName = this._registerCallback('sharePoppedCallback', sharePoppedCallback, AppCommonResult);
        const shareMediaClickedCallbackName = this._registerCallback('shareMediaClickedCallback', shareMediaClickedCallback, AppCommonResult);

        native.shareWithCallback(sharePoppedCallbackName,
            shareMediaClickedCallbackName,
            saveShareParam.toString());
    }

    /**
     * 从相册或拍照选取照片 6.5.0
     * 调用成功后callback(object, type) object:{ base64Image:...., landmarks: ....} type:imageCamera or imageAlbum
     * @param eventCameraParam (@see ./param/EventCameraParam)
     * @param userCallback
     */
    eventCamera(eventCameraParam, userCallback) {
        // 在android里部分机型同时使用filterId、categoryId、stickerId会造成app闪退，只可单独使用filterId，8.4.5.3版本之后解决了
        if (BrowserChecker.isAndroid()) {
            // eventCameraParam.filterId = undefined;
            // eventCameraParam.categoryId = undefined;
            // eventCameraParam.stickerId = undefined;
        }
        const callbackMethodFullName = this._registerCallback(
            "eventCamera", userCallback, EventCameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);
        native.eventCamera(callbackMethodFullName, eventCameraParam.toString(true));
    }
    /*
      带有landmarks的eventCamera 7.6.0
    */
    eventCameraWithLandmarks(eventCameraParam, userCallback) {
        // 在android里部分机型同时使用filterId、categoryId、stickerId会造成app闪退，只可单独使用filterId，8.4.5.3版本之后解决了
        if (BrowserChecker.isAndroid()) {
            // eventCameraParam.filterId = undefined;
            // eventCameraParam.categoryId = undefined;
            // eventCameraParam.stickerId = undefined;
        }
        if (BrowserChecker.appVersionLessThan([7, 6, 0])){
          console.log('eventCameraWithLandmarks 7.6.0支持')
        }
        const callbackMethodFullName = this._registerCallback(
            "eventCameraWithLandmarks", userCallback, CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        native.eventCameraWithLandmarks(callbackMethodFullName, eventCameraParam.toString(true));
    }

    /**
    * 6.5.3
    * 把进入页面前拍摄的照片带入h5页面，通过回调获取图片的base64，一般是通过confirmbanner配置的h5进入才可获取
    * @param userCallback
    */
    getCameraImage(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImage", userCallback, GetCameraResult);
        native.getCameraImage(callbackMethodFullName);
    }
    /**
    * 7.6.0
    * 带有getCameraImage的getCameraImage
    */
    getCameraImageWithLandmarks(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImageWithLandmarks", userCallback, CameraResult);
        native.getCameraImageWithLandmarks(callbackMethodFullName);
    }
    /*
      关闭当前h5所在的webview 6.5.3支持
    */
    close() {
      if (BrowserChecker.appVersionLessThan([6, 5, 3])){
        console.log('关闭当前h5所在的webview 6.5.3支持')
      }
      native.close()
    }
    /*
     隐藏title区域 7.10.1支持 调用默认为关闭功能
    */
    titleBarVisible(isVisible = false) {
      if (BrowserChecker.appVersionLessThan([7, 10, 1])){
        console.log('隐藏title区域 7.10.1支持')
      }
      native.titleBarVisible(JSON.stringify({isVisible:isVisible}));
    }
    /*
    8.7.0
    userSeq(Unique key), isMobileVerified(手机认证信息),
    userId(是否登陆),
    userM 手机hash值
    userSeq(Unique key), isMobileVerified(手机认证信息),
    userId(是否登陆)
    等所有用户信息通过Json传
    */
    getUserSession(userCallback){
      const callbackMethodFullName = this._registerCallback("getUserSession", userCallback, UserInfo);
      native.getUserSession(callbackMethodFullName)
    }
    /*
    8.7.0
    */
    loginWithSession(userCallback){
      const callbackMethodFullName = this._registerCallback("loginWithSession", userCallback, UserInfo);
      native.loginWithSession(callbackMethodFullName)
    }
    /*
    8.7.0
    */
    verifyPhoneWithSession(userCallback){
      const callbackMethodFullName = this._registerCallback("verifyPhoneWithSession", userCallback, UserInfo)
      native.verifyPhoneWithSession(callbackMethodFullName)
    }
    /*
    8.7.0
    VideoParam:  @/param/VideoParam
    */
    selectVideoAndUpload(VideoParam, userCallback){
      const callbackMethodFullName = this._registerCallback("selectVideoAndUpload", userCallback, VideoResult)
      native.selectVideoAndUpload(callbackMethodFullName, VideoParam.toString(true))
    }
    /*
    8.7.0
    EventCameraParam: @/param/EventCameraParam
    */
    // const callbackMethodFullName = this._registerCallback(
        // "eventCamera", userCallback, EventCameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);
    takeVideoAndUpload(EventCameraParam, userCallback){
      const callbackMethodFullName = this._registerCallback("takeVideoAndUpload", userCallback, VideoResult)
      native.takeVideoAndUpload(callbackMethodFullName, EventCameraParam.toString(true))
    }
}
