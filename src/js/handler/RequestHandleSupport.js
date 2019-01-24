'use strict';

import $ from "jquery";
import Logger from "../util/Logger";
import ConfigFactory from "../config/ConfigFactory";
import CommonHandleSupport from "./CommonHandleSupport";
import ImageHandleSupport from "./ImageHandleSupport";
import appContext from "../data/appContext";
import popupTypes from "../data/popupTypes";

export default class RequestHandleSupport {
    static get renderedImagePrefix() {
        return renderedImagePrefix;
    }

    /**
     * 로딩창을 띠우고 전달된 파일을 서버로 업로드한다.
     * @param base64Image
     *
     */
    static async upload(base64Image, landmarks) {
    	
        if (!base64Image) {
            Logger.error("image upload error");
            CommonHandleSupport.popup(popupTypes.POP_UNSUPPORTED_TYPE);
            return;
        }

        const formData = new FormData();
        formData.append("additionalParam", "noqrcode=false");
        formData.append("base64Image", base64Image);
        formData.append("landmarkJson", landmarks);
        
        try {
            const resJson = await $.ajax({
                type : "POST",
                url : ConfigFactory.getConfig().uploadUrl,
                data : formData,
                processData: false,
                contentType: false,
                xhrFields: {withCredentials: true},
                headers: {Accept: "*/*"},
                timeout : 30 * 60 * 60 * 1000});

            const result = resJson.result;
            if (!result.success) {
                CommonHandleSupport.displayLoading(false);
                Logger.error(`[upload fail] errorCode:${result.errorCode}, visionErrorCode:${result.visionErrorCode}, visionErrorMessage=${result.visionErrorMessage}`);
                CommonHandleSupport.popup(popupTypes.ofErrorCode(result.errorCode, result.visionErrorCode));
                return;
            }

            //생성된 이미지 경로 global 접근가능하게 등록
            const imagePrefix = ConfigFactory.getConfig().imagePrefix + result.path;
            appContext.renderedImagePrefix = imagePrefix;
            Logger.log("image full path: " + imagePrefix);

            let complete = false;

            //생성된 이미지 display
            Array.from(document.getElementsByClassName('filter')).forEach(each => {
                if (each.classList.contains('active')) {
                    ImageHandleSupport.cropQr(appContext.toRenderedImageUrl(each.id), canvas => {
                        document.getElementById('img_result').setAttribute('src', canvas.toDataURL('image/jpeg'));
                        complete = true;
                        $('#div_stage1').hide();
                        $('#div_stage2').show();
                        CommonHandleSupport.displayLoading(false);
                    });
                }
            });

            //if crop not complete in a sec
            setTimeout(() => {
                if(!complete) {
                    $('#div_stage1').hide();
                    $('#div_stage2').show();
                    CommonHandleSupport.displayLoading(false);
                }
            }, 1000);

        } catch (e) {
            CommonHandleSupport.displayLoading(false);
            Logger.error("network error : %o", e);
            CommonHandleSupport.popup(popupTypes.POP_CHECK_NETWORK);
        }
    }

    /**
     * Go 버튼 클릭 회수로 참여 count를 파악하므로
     * 이를 증가시킨다. (일정 확률로 서버로 전송)
     * @returns {Promise<void>}
     */
    static async increaseCount() {
        const config = ConfigFactory.getConfig();
        const counterRate = config.counterRate;

        //서버로 전송할 확률내에서 전송한다.
        const n = 1000000;
        if(Math.floor(Math.random() * n) >= n/counterRate) {
            Logger.log('[call] unrated : counter increase ignored.');
            return;
        }

        Logger.log('[call] increase count. counterRate : %s', counterRate);
        const data = {
            counterRate: counterRate,
            counter: 1
        };
        const formBody = RequestHandleSupport.toFormBody(data);

        try {
            const resJson = await $.ajax({
                type : "POST",
                url : config.counterSetApiUrl,
                data : formBody,
                processData: false,
                contentType: false,
                xhrFields: {withCredentials: true}
            });

            CommonHandleSupport.displayLoading(false);

            const result = resJson.result;
            Logger.log('[add counter] %o', result);
        } catch (e) {
            Logger.error('error on counter api : %o', e);
        }
    }

    static toFormBody(data) {
        const formBody = [];
        for (const property in data) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        return formBody.join("&");
    }
}
