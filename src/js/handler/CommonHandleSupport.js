'use strict';

import BrowserChecker from "../util/BrowserChecker";
import Logger from "../util/Logger";
import ConfigFactory from "../config/ConfigFactory";
import appContext from "../data/appContext";
import $ from "jquery";
import RequestHandleSupport from "./RequestHandleSupport";
import ImageHandleSupport from "./ImageHandleSupport";

export default class CommonHandleSupport {
    /**
     * 상황별 팝업창을 띠운다.
     * @param popName
     */
    static popup(popName) {
        if (!popName) return;
        $(".dimm").css("display", "block");
        $('.pop_layer').css('display', 'none');
        $('.' + popName).css('display', 'block');
    }

    /**
     * 팝업창을 해제한다.
     * @param popName
     */
    static unPopup() {
        $(".dimm").css("display", "none");
        $(".pop_layer").css("display", "none");
    }

    /**
     * 로딩 팝업을 보여주거나 숨긴다.
     */
    static displayLoading(flag) {
        if (flag) {
            $(".dimm").css("display", "block");
            $('.pop_layer').css('display', 'block');
            $.each($('.pop_sub'), function (index, each) {
                $(each).css("display", "none");
            });
        } else {
            CommonHandleSupport.unPopup();
        }
    }

    /**
     * 브라우저 체크하여 지원하지 않는 경우 리다이렉션 시킨다.
     * @returns {boolean}
     */
    static checkAccessibleBrowserOrRedirect() {
        const appVersion = appContext.getAppVersion();
        const config = ConfigFactory.getConfig();
        if (BrowserChecker.isIosOrAndroid() && appVersion === undefined) {
            alert("请更新B612咔叽版本后重试");
            location.href = config.storeUrl;
            return false;
        }

        // over 6.7.0
        if (BrowserChecker.isIosOrAndroid() && appVersion.indexOf("6.7.") !== 0 && appVersion.indexOf("7.") !== 0) {
            alert("请更新B612咔叽版本后重试");
            location.href = config.storeUrl;
            return false;
        }
        return true;
    }

    /**
     * 선택한 필터를 적용한다.
     * @param el
     */
    static applyFilter(el) {
        $.each($(".filter"), function (index, each) {
            $(each).removeClass("active");
        });
        $(el).addClass("active");
        ImageHandleSupport.cropQr(appContext.toRenderedImageUrl(el.id), canvas => {
            $("#img_result").attr("src", canvas.toDataURL('image/jpeg'));
        });
    }

}
