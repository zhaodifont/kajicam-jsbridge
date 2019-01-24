export default {
    apiHost: "https://b612-gw.snowcam.cn/",
    assetsRoot: '../dist/release/',
    counterGetApi: "v1/event/counter/views/inminwang",
    counterSetApi: "v1/event/counter/inminwang",
    counterRate: 123,

    uploadUrl: "https://b612-fs.snowcam.cn/v1/event/vision/inminwang/upload",
    imagePrefix: "https://b612kaji-org.oss-cn-beijing.aliyuncs.com/",
    b612HomePage: "https://b612kaji.com/",
    storeUrl: "http://suo.im/rj1kz", // easyLink
    b612UniversalLink: "https://ul-b612.snowcam.cn/app/",
    b612Scheme: "b612cn://",
    bannerLink1: "b612cn://go?&stickerId=83115&categoryId=30022&autoDownload=true",
    bannerLink2: "b612cn://go?filterId=220",

    get counterGetApiUrl() {
        return this.apiHost + this.counterGetApi;
    },

    get counterSetApiUrl() {
        return this.apiHost + this.counterSetApi;
    }
}
