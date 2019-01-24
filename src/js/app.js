'use strict';
import $ from "jquery";
import BridgeFactory from "./bridge/BridgeFactory";
import appContext from "./data/appContext";
import B612 from "./util/B612";
import ConfigFactory from "./config/ConfigFactory";
import Logger from "./util/Logger";
import CommonHandleSupport from "./handler/CommonHandleSupport";
import Handler from "./handler/Handler";

import "../statics/css/b612_event.css"
import ImageHandleSupport from "./handler/ImageHandleSupport";

//브라우저 등에서 바로 접근할 수 있는 global로 노출할 object 등록
window.$ = window.jQuery = $;
B612.globalize();
const bridge = BridgeFactory.getBridge();

//화면 초기화
$(document).ready(function () {
    Logger.enableRemoteLogging("console.re", "a0b7-7b61-a515");
    // Logger.enableRemoteLogging();
    console.log('it test log');
    _initCounter();
    _initAppInfo();
    _tryGetCameraImage();
});


//------------------------------------------------------
// event handlers
//------------------------------------------------------
$(".dimm").on("click", Handler.divDimm_OnClick);
$(".pop_btn").on("click", Handler.btnPop_OnClick);

$("#btn_go").on("click", Handler.btnGo_OnClick);
$("#btn_camera").on("click", Handler.btnCamera_OnClick);
$("#btn_gallery").on("click", Handler.btnGallery_OnClick);

$("#input_file").on("change", Handler.inputFile_OnChange);
$("#btn_retry").on("click", Handler.btnRetry_OnClick);

$("#btn_save").on("click", Handler.btnSave_OnClick);
$("#btn_share").on("click", Handler.btnShare_OnClick);

$.each($(".filter"), (index, each) => {
    $(each).on("click", null, each, Handler.itemFilter_OnClick);
});

//------------------------------------------------------
// functions
//------------------------------------------------------

/**
 * app과 연동하여 app info를 취득한다.
 * @private
 */
function _initAppInfo() {
    bridge.appInfo(_appInfo => appContext.appInfo = _appInfo);
}

/**
 * 참여자 counter 개수를 가져온다.
 * @returns {Promise<void>}
 * @private
 */
async function _initCounter() {
    const config = ConfigFactory.getConfig();
    const initCounter = 120888;
    let counter;

    try {
        const response = await $.ajax(config.counterGetApiUrl);
        Logger.log('[fetch counter] %o', response);
        counter = response.result.counter;
    } catch (e) {
        Logger.error(e);
    }

    counter = counter || initCounter;
    const $numCount = $('#num_count');

    const numbers = counter.toString().split('');
    const numCount = Math.max(8, numbers.length);
    for(let n = 0; n < numCount; n++) {
        const num = numbers[n - (numCount - numbers.length)] || 0;
        $numCount.append($(`#x_num_element_${num}`).clone());
    }
    $("#num_count").show();
    $("#num_count_init").hide();
}

function _tryGetCameraImage() {
    //배너를 통해 마지막 이미지로 처리해 달라고 들어오는 경우
    // 파라미터로 type=camera 를 전달하여야 한다.
    if(getUrlParameter("type") !== "camera") {
        return;
    }

    bridge.getCameraImageWithLandmarks(result => {
        if(result.base64Image) {
            ImageHandleSupport.preProcessAndUploadImage(result.base64Image);
        }
    });
}

/**
 * url의 파라미터를 리턴한다.
 */
function getUrlParameter(sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1));
    const sURLVariables = sPageURL.split('&');
    let sParameterName;
    let i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}


//------------------------------------------------------
//TODO - delete it
// etc event listeners for TESTING
//------------------------------------------------------
$('.test').on('click', function($e) {
    $e.stopPropagation();
    const lyIndex = $e.target.getAttribute('data-no');
    CommonHandleSupport.popup(lyIndex);
});

$("#1").click(function() {
    CommonHandleSupport.unPopup();
});

$("#2").click(function() {
    CommonHandleSupport.displayLoading();
});








