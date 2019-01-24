export default {
    apiHost: "https://qa-b612-gw.snowcam.cn/",
    //apiHost: "http://127.0.0.1:8880/",
    assetsRoot: '../dist/local/',
    counterGetApi: "v1/event/counter/views/inminwang",
    counterSetApi: "v1/event/counter/inminwang",
    counterRate: 3,

    uploadUrl: "http://qa-b612-fs.snowcam.cn/v1/event/vision/inminwang/upload",
    // uploadUrl: "http://127.0.0.1:8881/v1/event/vision/inminwang/upload",
    imagePrefix: "http://qa.b612kaji.com/owfs/",
    b612HomePage: "http://b612cam.line-beta.me/",
    storeUrl: "http://suo.im/rj1kz", // easyLink
    b612UniversalLink: "http://qaul-b612.snowcam.cn/app/",
    b612Scheme: "b612cnb://",
    bannerLink1: "b612cnb://go?&stickerId=83115&categoryId=20052&autoDownload=true",
    bannerLink2: "b612cnb://go?filterId=220",

    get counterGetApiUrl() {
        return this.apiHost + this.counterGetApi;
    },

    get counterSetApiUrl() {
        return this.apiHost + this.counterSetApi;
    }
}
