'use strict';

import BrowserChecker from "../util/BrowserChecker";
import appContext from "../data/appContext";
import BridgeFactory from "../bridge/BridgeFactory";
import EventCameraParam from "../bridge/param/EventCameraParam";
import Logger from "../util/Logger";
import SaveShareParam from "../bridge/param/SaveShareParam";
import ImageHandleSupport from "./ImageHandleSupport";
import CommonHandleSupport from "./CommonHandleSupport";
import RequestHandleSupport from "./RequestHandleSupport";
import popupTypes from "../data/popupTypes";

export default class Handler {
    //=======================================================================
    // event handlers
    //=======================================================================
    /**
     * btnGo_OnClick
     * 이벤트 초기 화면의 시작버튼 클릭 이벤트
     */
    static btnGo_OnClick() {
        Logger.log('btnGo_OnClick');
        if(!CommonHandleSupport.checkAccessibleBrowserOrRedirect()) return;
        RequestHandleSupport.increaseCount();

        // 무조건 Camera 진입으로 SPEC 변경됨
        // CommonHandleSupport.popup(popupTypes.POP_SELECT_PICTURE)
        if(BrowserChecker.isIosOrAndroid()) {
            Handler.btnCamera_OnClick();
        } else {
            $("#input_file").click();
        }

    }

    /**
     * btnCamera_OnClick
     * 카메라 호출 이벤트
     */
    static btnCamera_OnClick() {
        Logger.log('btnCamera_OnClick');
        if (BrowserChecker.isIosOrAndroid()) {
            CommonHandleSupport.unPopup();

            const param = new EventCameraParam(EventCameraParam.types.imageCamera,
                                               EventCameraParam.cameraPositions.front,
                                               appContext.filterId,
                                               appContext.categoryId,
                                               appContext.stickerId);

            Logger.log("[call native eventCamera] %o", param.toString(true));


            BridgeFactory.getBridge().eventCameraWithLandmarks(param, eventCameraCallback);
        } else {
            Logger.log("take camera"); // DO NOTHING
        }
    }

    /**
     * btnGallery_OnClick
     * 갤러리 호출 이벤트
     */
    static btnGallery_OnClick() {
        Logger.log('btnGallery_OnClick');
        if (BrowserChecker.isIosOrAndroid()) {
            CommonHandleSupport.unPopup();

            const param = new EventCameraParam(EventCameraParam.types.imageAlbum);
            BridgeFactory.getBridge().eventCameraWithLandmarks(param, eventCameraCallback);

        } else {
            Logger.log("show gallery");
            $('#input_file').trigger("click");
        }
    }

    /**
     * inputFile_OnChange
     * PC에서 파일 선택한 경우
     */
    static inputFile_OnChange(e) {
        Logger.log('inputFile_OnChange');
        const file = e.target.files[0];
        if (!file) return;

        if(['image/png', 'image/jpeg'].includes(file.type.toLowerCase()) == false) return;

        ImageHandleSupport.preProcessAndUploadImageFromFile(file);
    }

    /**
     * itemFilter_OnClick
     * 아이템 필터를 선택하였을때의 이벤트
     */
    static itemFilter_OnClick(event) {
        Logger.log('itemFilter_OnClick');
        CommonHandleSupport.applyFilter(event.data);
    }

    /**
     * btnRetry_OnClick
     * 이미지 프로세싱 후에 다시 요청하는 버튼 클릭 이벤트 핸들러
     */
    static btnRetry_OnClick() {
        Logger.log('btnRetry_OnClick');
        RequestHandleSupport.increaseCount();

        // 무조건 Camera 진입으로 SPEC 변경됨
        // CommonHandleSupport.popup(popupTypes.POP_SELECT_PICTURE)
        if(BrowserChecker.isIosOrAndroid()) {
            Handler.btnCamera_OnClick();
        } else {
            $("#input_file").click();
        }
    }

    /**
     * divDimm_OnClick
     * 다시한번 파일 선택하여 프로세싱 하는 동안 어둡게 입혀진 divDimm를 클릭하는 경우
     */
    static divDimm_OnClick() {
        Logger.log('divDimm_OnClick');
        CommonHandleSupport.displayLoading(false);
        CommonHandleSupport.unPopup();
    }

    /**
     * btnPop_OnClick
     * 일반 팝업의 확인 버튼 클릭
     */
    static btnPop_OnClick() {
        Logger.log('btnPop_OnClick');
        CommonHandleSupport.unPopup();
    }

    /**
     * btnSave_OnClick
     * 이미지 저장
     */
    static btnSave_OnClick() {
        Logger.log('btnSave_OnClick');
        const filterName = $(".item.active")[0].id;
        $('#save_' + filterName).trigger("click");

        const param = new SaveShareParam(appContext.toRenderedImageUrl(filterName), SaveShareParam.types.image);
        BridgeFactory.getBridge().save(param, result => {
            Logger.log(`file saved : ${result}`);
            CommonHandleSupport.popup(popupTypes.POP_SAVE_SUCCESS);
            $("#div_dimm").show();
        });
    }

    /**
     * btnShare_OnClick
     * 이미지 저장
     */
    static btnShare_OnClick() {
        Logger.log('btnShare_OnClick');

        const filterName = $(".item.active")[0].id;
        // for baidu click statistics
        $('#share_' + filterName).trigger("click");

        const param = new SaveShareParam(appContext.toRenderedImageUrl(filterName), SaveShareParam.types.image);
        BridgeFactory.getBridge().shareWithCallback(param,
            result => {
                Logger.log('sharePoppedCallback : ' + result);
            },
            result => {
                Logger.log('shareMediaClickedCallback : ' + result);
            }
        );
    }

}


//=======================================================================
// function 영역
//=======================================================================

/**
 * event camera의 callback
 * 이미지를 변환하여 서버로 upload 한다.
 * @param result - base64 이미지를 포함한 result
 * @p'aram type - app으로 event를 호출했을때의 호출 유형
 */
function eventCameraCallback(result, type) {
	console.log(">> eventCameraCallback");
	console.log(result);

  alert('excute eventCameraCallback')

    if(!result) return;

    //base64Image가 없다면 사진을 찍지 않은 것이므로 통과하여야 한다.
    if (!result.base64Image) {
        Logger.error("No base64 image!");
        return;
    }

    if (!result.success) {
        Logger.error("failed callback from eventCamera!");
        CommonHandleSupport.popup(popupTypes.POP_UNSUPPORTED_TYPE);
        return;
    }

    const base64Image = result.base64Image;
    const landmarks = result.landmarks;
    $('.log').html(result.landmarks)
    ImageHandleSupport.preProcessAndUploadImage(base64Image, landmarks, type);
}
