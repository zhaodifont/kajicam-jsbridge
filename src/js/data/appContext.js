import Logger from "../util/Logger";

export default {
    appInfo: {},
    filterId: "201",
    categoryId: "20011",
    stickerId: "70350",
    renderedImagePrefix: "",
    imageRule: {
        minWidth: 640,
        minHeight: 640,
        maxWidth: 960,
        maxHeight: 960,
        minRatio: 0.46,
        maxRatio: 2.2,
    },
    getAppVersion: function () {
        return getAppVersion(this);
    },
    validationImageSize: function (width, height) {
        return validationImageSize(this, width, height);
    },
    validationImageType: function (type) {
        return validationImageType(this, type);
    },
    getB612Context: function() {
        window.B612 = window.B612 || {};
        return window.B612;
    },
    toRenderedImageUrl(type) {
        return this.renderedImagePrefix + "_" + type +".jpg";
    }
}

/**
 * app version을 반환한다.
 * @param context
 * @returns {*|express}
 */
function getAppVersion(context) {
    return context.appInfo.app;
}

/**
 * 이미지 크기를 validation 한다.
 * @param context
 * @param width
 * @param height
 * @returns {boolean}
 */
function validationImageSize(context, width, height) {
    if (width == 0 || height == 0) {
        Logger.error("invalid image size", 5);
        return false;
    }

    if (width >= context.imageRule.height && width < context.imageRule.minWidth) {
        Logger.error("too small image: width " + width, 5);
        return false;
    }
    if (width < height && height < context.imageRule.minHeight) {
        Logger.error("too small image: height " + height, 5);
        return false;
    }

    const imageRatio = width / height;
    if (imageRatio < context.imageRule.minRatio || imageRatio > context.imageRule.maxRatio) {
        Logger.error("invalid image ratio: " + imageRatio, 5);
        return false;
    }
    return true;
}

function validationImageType(context, type) {
    if (type !== 'image/png' && type !== 'image/jpeg') {
        Logger.error("invalid image type: " + type, 6);
        return false;
    }
    return true;
}
