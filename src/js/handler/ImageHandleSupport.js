'use strict';

import BrowserChecker from "../util/BrowserChecker";
import Logger from "../util/Logger";
import ConfigFactory from "../config/ConfigFactory";
import ImageUtil from "../util/ImageUtil";
import RequestHandleSupport from "./RequestHandleSupport";
import CommonHandleSupport from "./CommonHandleSupport";
import appContext from "../data/appContext";
import EventCameraParam from "../bridge/param/EventCameraParam";

export default class ImageHandleSupport {
    /**
     * base64 이미지를 전처리하여 서버로 업로드한다.
     * @param base64Image
     */
    static preProcessAndUploadImage(base64Image, landmarks, type) {
        let img = new Image();
        img.onload = function () {
            let imageType = base64Image.split(",")[0].split(";")[0].split(":")[1].toLowerCase();
            imageType = (imageType.indexOf("jpg") !== -1) ? 'image/jpeg' : imageType;

            if (!appContext.validationImageSize(img.width, img.height)) {
                return;
            }
            if (!appContext.validationImageType(imageType)) {
                return;
            }

            CommonHandleSupport.displayLoading(true);
            if (BrowserChecker.isIosLowerThan11() && type === EventCameraParam.types.imageAlbum) {
                ImageHandleSupport.uploadImageForOldIosGallery(base64Image, landmarks);
            } else if (img.width / img.height < 9 / 16) {
                ImageHandleSupport.uploadImageWithCrop(base64Image, landmarks);
            } else {
                ImageHandleSupport.uploadImage(base64Image, landmarks);
            }
        };
        img.src = base64Image;
    }

    /**
     * 전달된 파일을 전처리하여 서버로 업로드한다.
     * @param file
     */
    static preProcessAndUploadImageFromFile(file, landmarks) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const img = new Image();
            img.onload = function () {
                if (!appContext.validationImageSize(img.width, img.height)) return;
                CommonHandleSupport.displayLoading(true);
                ImageHandleSupport.uploadImage(file, landmarks);
            };
            img.src = fileReader.result;
        };
        fileReader.readAsDataURL(file);
    }

    /**
     * 이미지를 서버로 업로드한다.
     * @param base64Image
     */
    static async uploadImage(base64Image, landmarks) {
        const config = ConfigFactory.getConfig();
        let canvas = await ImageUtil.loadImagePromise(base64Image, {
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            orientation: true
        });
        RequestHandleSupport.upload(canvas.toDataURL('image/jpeg', 0.86), landmarks);
    }

    static async uploadImage4Ios(base64Image, landmarks) {
        const config = ConfigFactory.getConfig();
        let canvas = await ImageUtil.loadImagePromise(base64Image, {
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            orientation: true
        });
        RequestHandleSupport.upload(canvas.toDataURL('image/jpeg', 0.86), landmarks);
    }

    /**
     * 이미지를 16:9로 자른후 서버로 업로드 한다.
     * @param base64Image
     */
    static async uploadImageWithCrop(base64Image, landmarks) {
        Logger.log("[Handler] image croped");

        const config = ConfigFactory.getConfig();
        let canvas = await ImageUtil.loadImagePromise(base64Image, {aspectRatio: 9 / 16});
        canvas = await ImageUtil.loadImagePromise(canvas.toDataURL('image/jpeg'), {
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            orientation: true
        });
        RequestHandleSupport.upload(canvas.toDataURL('image/jpeg', 0.86), landmarks);
    }

    /**
     * 구 IOS에 EXIF 문제를 해결하여 upload 위한 함수
     * @param base64Image
     */
    static uploadImageForOldIosGallery(base64Image, landmarks) {
        const config = ConfigFactory.getConfig();
        const img = new Image();
        img.onload = function () {
            EXIF.getData(img, async function () {
                const orientation = EXIF.getTag(this, "Orientation");
                let canvas = await ImageUtil.loadImagePromise(base64Image, {
                    maxWidth: config.maxWidth,
                    maxHeight: config.maxHeight,
                    orientation: true
                });

                canvas = await ImageUtil.transformByOrientationPromise(canvas.toDataURL('image/jpeg'), orientation);
                RequestHandleSupport.upload(canvas.toDataURL('image/jpeg', 0.86), landmarks)
            });
        };
        img.src = base64Image;
    }

    /**
     * 이미지의 QR이 붙은 영역을 잘라낸다.
     */
    static cropQr(src, callback) {
        const img = new Image();
        img.onload = function() {
            const qrHeight = 140;
            const adjustHeight = img.height - qrHeight;

            const canvas = document.getElementById("canvas0");
            canvas.width = img.width;
            canvas.height = adjustHeight;
            const context = canvas.getContext('2d');

            context.drawImage(img, 0, 0, img.width, adjustHeight, 0, 0, img.width, adjustHeight);

            callback(canvas);
        };

        img.crossOrigin = "Anonymous";
        img.src = src;
    }
}
