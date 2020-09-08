import BrowserChecker from '@/bag/util/BrowserChecker'
import {Bridge, Params} from '@b612/kaji-jsbridge'
import imgSupport from '@/bag/util/imgSupport'
// import '@/bag/plugins/canvas2image'
import EXIF from 'exif-js'//获取图片信息
import MegaPixImage from '@/bag/plugins/megapix-image'//图片尺寸等比调节
import '@/bag/plugins/EZGesture'//手指拖动缩放
// import config from '@/config/index'
import cameraMenu from '@/bag/vueCommon/cameraMenu/2/c.js'
// import errMsg from '@/bag/vueCommon/errMsg/1/e'
import loading from '@/bag/vueCommon/loading/2/loading.js'
// import hmt from '@/static/js/total'
let {EventCameraParam, SaveShareParam} = Params

let EventFullPath = ""//以备此页面统计用
let cropGesture = null//拖动缩放功能
// 项目名+站内外 统计用
export const eventBaseName = '???'

export class Handlers {
  // 初始化基本状态
  static myApp = {
   inState: 'outApp',
   isInApp: false,
   version: '-',
   dpr: window.devicePixelRatio,
   duid: '-',
   EventFullPath: `${eventBaseName}-outApp`
  }
  // 检测app基本信息
  static checkAppInfo(cb) {
    let preObj = {}
    if (BrowserChecker.isIos()) {
      preObj.isIos = true
    } else if (BrowserChecker.isAndroid()) {
      preObj.isAnd = true
    }
    var outTestTimer = null
    // inApp
    Bridge.appInfo(res => {
      clearTimeout(outTestTimer)
      if (res.app) {
        window.kajiAppVersion = res.app
        preObj.isInApp = true
        preObj.inState = 'inApp'
        preObj.version = res.app
        Handlers.assignMyApp(res)
        preObj.EventFullPath = `${eventBaseName}-${preObj.inState}`
        EventFullPath = `${eventBaseName}-${preObj.inState}`
        Handlers.assignMyApp(preObj)
        return cb()
      }
      // 是否隐藏webview导航栏 //ios无法返回到相机，需加关闭页面按钮
      // Bridge.titleBarVisible()
    })
    // outApp
    preObj.EventFullPath = `${eventBaseName}-${Handlers.myApp.inState}`
    EventFullPath = `${eventBaseName}-${Handlers.myApp.inState}`
    outTestTimer = setTimeout(() => {
      Handlers.assignMyApp(preObj)
      cb()
    }, 1200)
  }
  // 当有状态改变  修改基本信息
  static assignMyApp(obj) {
    Handlers.myApp = Object.assign({}, Handlers.myApp, obj)
  }
  // 选取照片第一步
  static pickImg(sucCb) {
    if (Handlers.myApp.isInApp) {
      cameraMenu()
      $('#galleryBtn, #cameraBtn').off('click')
      $('#galleryBtn').one('click', () => {
        loading()
        setTimeout(() => { loading({state:0});cameraMenu({state: 0}) }, 1200)
        const galleryParams = new EventCameraParam({type: 'imageAlbum'})
        // hmt([`gallerybtn`])
        Bridge.eventCameraWithLandmarks(galleryParams, function(res, type) {
          Handlers.eventCameraCallback(res, type, sucCb)
        })
      })
      $('#cameraBtn').one('click', () => {
        loading()
        setTimeout(() => { loading({state:0});cameraMenu({state: 0}) }, 1200)
        // const cameraParams = new EventCameraParam({type: 'imageCamera', stickerId: config.stickerId,categoryId: config.categoryId})
        const cameraParams = new EventCameraParam({type: 'imageCamera', stickerId: '313107'})
        // hmt([`camerabtn`])
        Bridge.eventCameraWithLandmarks(cameraParams, function(res, type) {
          Handlers.eventCameraCallback(res, type, sucCb)
        })
      })
    } else {
      /*
        站外input如果没有选取照片，无法捕捉onchange事件回调，不要提前加加载效果
      */
      // 场景一 弹出默认相册
      $('#inputFile')[0].value = ''
      $('#inputFile').off("change").trigger('click')
      $('#inputFile').on('change', function(){
        return Handlers.fileChanged.call(this, sucCb)
      })
      /*
        场景二 弹出选择框
      */
      // cameraMenu()
      // $('#galleryBtn').one('click', () => {
      //   _hmt.push(['_trackEvent', EventFullPath, 'Btn', '相册选取照片'])
      //   $('#inputFile')[0].value = ''
      //   $('#inputFile').off("change").trigger('click')
      //   $('#inputFile').on('change', function(){
      //     return Handlers.fileChanged.call(this, sucCb)
      //   })
      // })
      // $('#cameraBtn').one('click', () => {
      //   const galleryParams = new EventCameraParam({type: 'imageCamera'})
      //   _hmt.push(['_trackEvent', EventFullPath, 'Btn', 'p1按钮去下载'])
      //   window.locaion.href = ''
      // })

    }
  }
  /*
    站内 拍照、选图的回调
  */
  static eventCameraCallback(res, type, sucCb){
    // console.log('eventCameraCallback', res);
    if (res.success) {
      let img = new Image()
      img.onload = function () {
        console.log(`eventCameraCallback res.base64Image:natural: Width=${this.naturalWidth};height=${this.naturalHeight};type:${type}`,);
        let imageType = this.src.split(",")[0].split(";")[0].split(":")[1].toLowerCase();
        let imageTypeCheck = imageType.includes("jpg") || imageType.includes("jpeg") || imageType.includes("png")
        // imageType = (imageType.indexOf("jpg") !== -1) ? 'image/jpeg' : imageType;
        if (!imgSupport.validationImageSize(this.width, this.height)) {
          return sucCb({errMsg: '图片尺寸或比例不符合'})
        } else if (!imageTypeCheck) {
          return sucCb({errMsg: '图片格式不符合'})
        }
        console.log(`has landmarks? ${res.hasOwnProperty('landmarks')}`);
        if(res.hasOwnProperty('landmarks')) {//eventCameraWithLandmarks进入
          console.log(`landmarks: type: ${typeof res.landmarks}, length:${res.landmarks.length}`, );
          if(res.landmarks.length > 10 ) {
            return sucCb(this, res.landmarks)
          }
          // return sucCb(this)
        }
        // else {//eventCamera
        //   console.log('eventCameraCallback: use api eventCamera');
        //   Handlers.renderFileChangedImg(this, $('#bridgeImg')[0])
        //   .then(() => {
        //     return sucCb($('#bridgeImg')[0])
        //   })
        // }
        return sucCb(this)
      }
      img.src = res.base64Image
    } else {
      sucCb()
    }
  }

  // 站外选图 回调
  static fileChanged(sucCb){
    console.log('fileChanged:', this.files[0].name);
    // loading()
    if (this.files.length <= 0){
      return sucCb()
    }
    let img = new Image()
    img.onload = function () {
      // cameraMenu({state: 0})
      if (!imgSupport.validationImageSize(this.width, this.height)) {
        return sucCb({errMsg: '图片尺寸或比例不符合'})
      }
      // 优化站外合理限制图片尺寸最大不超过980
      // Handlers.renderFileChangedImg(this, $('#bridgeImg')[0])
      // .then(() => {
      //   console.log('renderFileChangedImg', $('#bridgeImg')[0]);
      //   sucCb($('#bridgeImg')[0])
      // })
      Handlers.renderFileChangedImg(this, $('#bridgeImg')[0])
      .then(() => {
        sucCb($('#bridgeImg')[0])
      })
      // Handlers.renderFileChangedImg(this)
      // .then(distImg => {
      //   console.log('renderFileChangedImg', distImg);
      //   sucCb(distImg)
      // })
    }
    img.src = imgSupport.inputPath2url(this.files[0])
  }

  /*
    站内站外的选取完照片 添加拖动缩放功能
    dragImg: 要拖动的图片 position:relative/position
    dragArea: 可以拖动的区域 position:relative/position 与dragImg不必是父子层关系, 不要加flex！！！
    img 引入给dragImg的图片
  */
  static ezGesture({dragImg, dragArea, img}) {
    cropGesture && cropGesture.unbindEvents()//取消上次的监听
    dragImg.css({'opacity': '0', 'width': 'auto', 'height': 'auto'})
    dragImg[0].src = img.src
    return new Promise((resolve) => {
      cropGesture = new EZGesture(dragArea[0], dragImg[0], {
          targetMinWidth: Math.ceil(dragArea.offset().width),
          targetMinHeight: Math.ceil(dragArea.offset().height)
      })
      // console.log(dragImg.height() , cropGesture.targetMinHeight);
      setTimeout(() => {
        // console.log('targetMinWidth', Math.ceil(dragArea.offset().width), Math.ceil(dragArea.offset().height));
        // console.log('targetDom', dragImg[0].offsetWidth, dragImg[0].offsetHeight);
        var imgOriginX = cropGesture.targetMinWidth == 0 ? (dragImg.width() - dragArea.width()) * 0.5 : (dragImg.width() - cropGesture.targetMinWidth) * 0.5;
        var imgOriginY = cropGesture.targetMinHeight == 0 ? (dragImg.height() - dragArea.height()) * 0.5 : (dragImg.height() - cropGesture.targetMinHeight) * 0.5;
        // 初始时 将图片调至中间部分
        dragImg.css({
          'left': '-' + imgOriginX + 'px',
          'top': '-' + imgOriginY + 'px',
          'opacity': '1'
        })
        resolve()
      }, 160)
    })
  }

  // 释放图片拖放功能
  static unbindEventsEzGesture() {
    cropGesture && cropGesture.unbindEvents()
    console.log('unbindEventsEzGesture');
  }

  /**
  * 处理旋转图片的兼容处理 、 图片渲染为合适尺寸
  * @param img
  * @return {Promise<canvas>}
  */
  static renderFileChangedImg(img, distImg) {
    return new Promise(function (resolve) {
      let obj = {
        maxWidth: 1600,
        maxHeight: 1200
      }
      Handlers.detectImageAutomaticRotation().then(isAuto=>{
        // 如果是已经智能旋转了
        if(isAuto) {
          var mpImg = new MegaPixImage(img)
          mpImg.render(distImg, obj, resolve)
        } else {
          var allMetaDataa = EXIF.getAllTags(img)
          console.log('orientation1', img, allMetaDataa);

          EXIF.getData(img, () => {
            console.log('orientation2',2);
            var allMetaData = EXIF.getAllTags(img)
            var orientation = allMetaData.Orientation
            console.log('orientation',orientation);
            obj.orientation = orientation
            var mpImg = new MegaPixImage(img)
            mpImg.render(distImg, obj, resolve)
          })
        }
      })
    })
  }
  /*
    仅保存
    @param _config(obj)
    case: {url: imgUrl,type: SaveShareParam.types.image}
  */
  static save(_config){
    return new Promise((resolve, reject) => {
      try{
        const param = new SaveShareParam(_config)
        Bridge.save(param, () => {
          // hmt([`saveBtn`])
          // _hmt.push(['_trackEvent', EventFullPath, 'Btn', '保存图片'])
          resolve()
        })
      } catch(err) {
        reject('save err:', err)
      }
    })
  }
  /*
    保存并分享
    @param _config (obj)
    case: let web-params = {url: 'xxx',type: SaveShareParam.types.web,title: 'title',content: 'describe',thumbnail: 'https://h5.kajicam.com/favicon.ico'}
    let img-params = {url: '', type: SaveShareParam.types.image}
  */
  static share(_config) {
    return new Promise((resolve, reject) => {
      try{
        const param = new SaveShareParam(_config);
        var iosState = false//防止在ios中统计2次
        Bridge.shareWithCallback(param, () => {
          if (!iosState){
            iosState = !iosState
            // hmt([`${Handlers.myApp.inState}.savesharebtn`])
            // _hmt.push(['_trackEvent', EventFullPath, 'Btn', '保存分享图片'])
            resolve()
          }
        })
      } catch(err) {
        reject('shareWithCallback err:', err)
      }
    })
  }
  // 检测浏览器是否会自动回正图片
  static detectImageAutomaticRotation() {
    // 一张2x1 orientation为6的图片
      const testImageURL =
          'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
          'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
          'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
          'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
          'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
          'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
      return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            // 本是2x1的 如果图片变成 1x2，说明浏览器对图片进行了回正
            let isAutoRotation = img.width === 1 && img.height === 2
            resolve(isAutoRotation);
            console.log('isAutoRotation', isAutoRotation);
          }
          img.src = testImageURL
      });
  }

}
