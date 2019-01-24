export default {
    apiHost: "https://qa-b612-gw.snowcam.cn/",
    
    counterGetApi: "v1/event/counter/views/inminwang",
    counterSetApi: "v1/event/counter/inminwang",
    counterRate: 10,

    uploadUrl: "http://qa-b612-fs.snowcam.cn/v1/event/vision/inminwang/upload",
    imagePrefix: "https://qa-b612.snowcam.cn/owfs/",
    b612HomePage: "https://qa-b612.snowcam.cn/",
    storeUrl: "http://suo.im/rj1kz", // easyLink
    b612UniversalLink: "https://qaul-b612.snowcam.cn/app/",
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
