/**
 * This class depends on
 *  - load-image.js : https://github.com/blueimp/JavaScript-Load-Image
 *  - exif.js : https://github.com/exif-js/exif-js
 *
 */
export default class ImageUtil {

    static loadImagePromise(base64Image, options) {
        console.log(`[loadImagePromise] ${JSON.stringify(options)}`);
        return new Promise(resolve => {
            loadImage(base64Image, canvas => resolve(canvas), options)
        });
    }

    static transformByOrientationPromise(base64Image, orientation) {
        console.log(`[transformByOrientationPromise] orientation : ${orientation}`);
        return new Promise(resolve => {
            ImageUtil._transformByOrientation(base64Image, orientation,
                    canvas => resolve(canvas))
        });
    }

    static _transformByOrientation(base64Image, orientation, callback) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext("2d");
            const width = img.width;
            const height = img.height;

            // set proper canvas dimensions before transform & export
            if (4 < orientation && orientation < 9) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }

            // transform context before drawing image
            switch (orientation) {
                case 2:
                    ctx.transform(-1, 0, 0, 1, width, 0);
                    break; //좌우반전
                case 3:
                    ctx.transform(-1, 0, 0, -1, width, height);
                    break; //거꾸로
                case 4:
                    ctx.transform(1, 0, 0, -1, 0, height);
                    break; //상하반
                case 5:
                    ctx.transform(0, 1, 1, 0, 0, 0);
                    break; //좌우반전, 왼쪽으로 누움
                case 6:
                    ctx.transform(0, 1, -1, 0, height, 0);
                    break;  //왼쪽으로 누움
                case 7:
                    ctx.transform(0, -1, -1, 0, height, width);
                    break; //좌우반전, 오른쪽 누움
                case 8:
                    ctx.transform(0, -1, 1, 0, 0, width);
                    break; // 오른쪽 누음
                default:
                    break;
            }

            // draw image
            ctx.drawImage(img, 0, 0);
            callback(canvas);
        };
        img.src = base64Image;
    }
}
