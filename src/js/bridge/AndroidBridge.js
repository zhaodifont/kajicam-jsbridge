import AbstractBridge from "./AbstractBridge";
import AppInfo from "./model/AppInfo";
import AppCommonResult from "./model/AppCommonResult";
import EventCameraResult from "./model/EventCameraResult";
import GetCameraResult from "./model/GetCameraResult";
import CameraResult from "./model/CameraResult";
import BrowserChecker from "../util/BrowserChecker";

let instance = null;
let native = window.B612KajiBridgeInterface;

export default class AndroidBridge extends AbstractBridge {
    constructor() {
        super();
        if (!instance) {
            instance = this;
            super._initInstance(instance);
        }
        return instance;
    }

    /**
     * app 返回基础信息
     * @param userCallback
     *    : callback param 0 - ./model/AppInfo
     */
    appInfo(userCallback) {
        const callbackMethodFullName = this._registerCallback("appInfo", userCallback, AppInfo);
        native.appInfo(callbackMethodFullName);
    }

    /**
     * 向应用程序传送图像或录像带，要求在短时间内储存。
     * @param saveShareParam (@see ./param/SaveShareParam)
     * @param userCallback
     */
    save(saveShareParam, userCallback) {
        const callbackMethodFullName = this._registerCallback("save", userCallback, AppCommonResult);
        native.save(callbackMethodFullName, saveShareParam.toString());
    }

    /**
     * 向app传递图像或录像带请求分享。
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
     * 앱으로 camera 나 gallery 호출을 요청한다.
     * @param eventCameraParam (@see ./param/EventCameraParam)
     * @param userCallback
     */
    eventCamera(eventCameraParam, userCallback) {
        //기획 변경 : 안드로이드의 경우에는 속도이슈로 Filter만 적용(Sticker 제외)
        if (BrowserChecker.isAndroid()) {
            // eventCameraParam.filterId = undefined;
            // eventCameraParam.categoryId = undefined;
            // eventCameraParam.stickerId = undefined;
        }
        const callbackMethodFullName = this._registerCallback(
            "eventCamera", userCallback, EventCameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        native.eventCamera(callbackMethodFullName, eventCameraParam.toString(true));
    }

    eventCameraWithLandmarks(eventCameraParam, userCallback) {
        //기획 변경 : 안드로이드의 경우에는 속도이슈로 Filter만 적용(Sticker 제외)
        if (BrowserChecker.isAndroid()) {
            eventCameraParam.filterId = undefined;
            eventCameraParam.categoryId = undefined;
            eventCameraParam.stickerId = undefined;
        }

        const callbackMethodFullName = this._registerCallback(
            "eventCameraWithLandmarks", userCallback, CameraResult, eventCameraParam.type, eventCameraParam.cameraPosition);

        native.eventCameraWithLandmarks(callbackMethodFullName, eventCameraParam.toString(true));
    }

    /**
     * 把进入页面前拍摄的照片带入h5页面，通过confirmbanner进入才可实现
     * @param userCallback
     */
    getCameraImage(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImage", userCallback, GetCameraResult);
        native.getCameraImage(callbackMethodFullName);
    }

    getCameraImageWithLandmarks(userCallback) {
        const callbackMethodFullName = this._registerCallback("getCameraImageWithLandmarks", userCallback, CameraResult);
        native.getCameraImageWithLandmarks(callbackMethodFullName);
    }
    // 关闭页面
    close() {
      if (BrowserChecker.appVersionLessThan([6, 5, 3])){
        alert('this version is not support this method')
        return
      }
      native.close()
    }
    // 隐藏titlebar
    titleBarVisible(isVisible = false) {
      if (BrowserChecker.appVersionLessThan([7, 10, 1])){
        alert('this version is not support this method')
        return
      }
      native.titleBarVisible(JSON.stringify({isVisible:isVisible}));
    }
}
