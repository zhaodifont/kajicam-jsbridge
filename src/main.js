// import 'babel-polyfill'
import Bridge from '@/js/bridge/BridgeFactory'
import BrowserChecker from "@/js/util/BrowserChecker"
import 'zepto/src/zepto'
import 'zepto/src/event'
import baseConfig from '@/config/index'

import EventCameraParam from "@/js/bridge/param/EventCameraParam";
import SaveShareParam from "@/js/bridge/param/SaveShareParam"
import VideoParam from '@/js/bridge/param/videoParam'
// import 'zepto/src/ajax'
// let pathSlice = process.env.NODE_ENV == 'production' ? 'release' : process.env.NODE_ENV == 'beta' ? 'beta' : ''
let toLink = ''
switch (process.env.NODE_ENV) {
  case 'production':
    toLink = `${baseConfig.b612Scheme}inappBrowser?url=https://zhaodifont.github.io/kajicam/dist/release/index.html%3Fuuid%3D%7Bad_did%7D`
    break
  case 'beta':
    toLink = `${baseConfig.b612Scheme}inappBrowser?url=https://zhaodifont.github.io/kajicam/dist/beta/index.html%3Fuuid%3D%7Bad_did%7D`
    break
  case 'development':
    toLink = `${baseConfig.b612Scheme}inappBrowser?url=${window.location.href}%3Fuuid%3D%7Bad_did%7D`
    break
}

let VConsole = require('vconsole');new VConsole();
let dBtn = document.createElement('button')
dBtn.innerText = '11323';dBtn.setAttribute('class','debugBtn');document.body.appendChild(dBtn);
dBtn.onclick = () => {window.location.reload()}

export const eventBaseName = 'projectName'
// 初始化基本状态
let myApp = {
 inState: 'outApp',
 isInApp: false,
 version: '-',
 dpr: window.devicePixelRatio,
 duid: '-'
}
function checkAppInfo(cb) {
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
      window.kajiAppVersion = res.app.split('.')
      preObj.isInApp = true
      preObj.inState = 'inApp'
      preObj.version = res.app
      preObj.EventFullPath = `${eventBaseName}-${preObj.inState}`
      myApp = Object.assign({}, myApp, res, preObj)
      return cb()
    }
    // 是否隐藏webview导航栏 //ios无法返回到相机，需加关闭页面按钮
    // Bridge.titleBarVisible()
  })
  // outApp
  preObj.EventFullPath = `${eventBaseName}-${myApp.inState}`
  outTestTimer = setTimeout(() => {
    myApp = Object.assign({}, myApp, preObj)
    cb()
  }, 1200)
}
// var appState = {
//   isAnd: false,
//   isIos: false,
//   isInApp: false
// }
// if (BrowserChecker.isIos()) {
//   appState.isIos = true
// } else if (BrowserChecker.isAndroid()) {
//   appState.isAnd = true
// }
// document.querySelector('.baseState').innerText = JSON.stringify(appState)

// console.log(window.B612KajiBridgeInterface != undefined)
// Bridge.appInfo(res => {
//   if (res.app) {
//     appState.isInApp = true
//     window.kajiAppVersion = res.app.split('.')
//     console.log(window.kajiAppVersion);
//     document.querySelector('.baseState').innerText = JSON.stringify(appState)
//
//     $('#getUUid').attr('href', toLink)
//     $('.appControl').show()
//     $('.exit').click(() => {
//       Bridge.close()
//     })
//     let state = true
//     $('#titleBarVisible').click(() => {
//       state = !state
//       Bridge.titleBarVisible(state)
//     })
//
//     let obj = getParamsToObj()
//     $('.getUUidVal')[0].innerText = obj.uuid ? obj.uuid : ''
//   }
// })

checkAppInfo(() => {
  document.querySelector('.AppInfo').innerText = JSON.stringify(myApp)
  if (myApp.isInApp) {

    $('#getUUid').attr('href', toLink)
    $('.appControl').show()
    $('.exit').click(() => {
      Bridge.close()
    })

    let state = true
    $('#titleBarVisible').click(() => {
      state = !state
      Bridge.titleBarVisible(state)
    })

    let obj = getParamsToObj()
    $('.getUUidVal')[0].innerText = obj.uuid ? obj.uuid : ''
    //去贴纸 轻妆
    $('#goStickera').click(() => {
      window.location.href = `${baseConfig.b612Scheme}go?stickerId=${baseConfig.stickerId}&autoDownload=true`
    })
    $('#goStickerb').click(() => {
      alert(`${baseConfig.b612Scheme}go?takemode=7&stickerId=326761`)
      window.location.href = `${baseConfig.b612Scheme}go?takemode=7&stickerId=326761`
    })
    $('#goStickerc').click(() => {
      const param = new EventCameraParam({
              type: EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
              cameraPosition: EventCameraParam.cameraPositions.front, //前置摄像头 0  后置摄像头: 1
              stickerId: 326761, //轻妆模式下的轻妆贴纸
              takemode:7//轻妆模式
      })
      alert(param)
      Bridge.eventCamera(param, eventCameraCallback);
    })
  }
})

function getParamsToObj(url) {
  let _url = url || window.location.search;
  let params = _url.substring(1).split('?')
  let obj = {}
  params.forEach((item, index) => {
    let ite = item.split('=')
    obj[ite[0]] = ite[1]
  })
  return obj;
}
getParamsToObj()


// 从相册选取
$('#eventCamera_imageAlbum').on('click', () => {
  if (myApp.isInApp) {

    const param = new EventCameraParam({
            type:EventCameraParam.types.imageAlbum //字符串 imageCamera: 相机  imageAlbum： 相册
    })
    Bridge.eventCamera(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

// 用相机拍照
$('#eventCamera_imageCamera').on('click', () => {
  if (myApp.isInApp) {
    const param = new EventCameraParam({
            type: EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
            cameraPosition: EventCameraParam.cameraPositions.front, //前置摄像头 0  后置摄像头: 1
            filterId: baseConfig.filterId, // 滤镜id
            categoryId: baseConfig.categoryId, // 分栏id (贴纸是在分栏里面的 所以app一般找贴纸先找到贴纸所在的分栏)
            stickerId: baseConfig.stickerId // 贴纸id
    })
    Bridge.eventCamera(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

// 用相机拍照
$('#eventCameraWithLandmarks').on('click', () => {
  if (myApp.isInApp) {
    const param = new EventCameraParam({
            type: EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
            cameraPositions: EventCameraParam.cameraPositions.front, // 前置摄像头 0  后置摄像头: 1
            filterId: baseConfig.filterId, // 滤镜id
            categoryId: baseConfig.categoryId, // 分栏id (贴纸是在分栏里面的 所以app一般找贴纸先找到贴纸所在的分栏)
            stickerId: baseConfig.stickerId
    })
    Bridge.eventCameraWithLandmarks(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

$('#eventCameraWithLandmarks_imageAlbum').on('click', () => {
  if (myApp.isInApp) {
    const param = new EventCameraParam({
            type: EventCameraParam.types.imageAlbum // 字符串 imageCamera: 相机  imageAlbum： 相册
    })
    Bridge.eventCameraWithLandmarks(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

// ios中需要先登录才能上传成功
$('#selectVideoAndUpload').on('click', () => {
  let params = new VideoParam()
  console.log('selectVideoAndUpload params', params);
  Bridge.selectVideoAndUpload(params, res => {
    //{success: Boolean, videoPath: String}
   console.log('selectVideoAndUpload res:', res)
   if (!res.success) return
   $('#distVideo').attr({'src': res.videoPath, 'controls': 'true', 'autoplay': 'true'})
   $('#distVideo')[0].play()
  })
})
// ios中需要先登录才能上传成功
$('#takeVideoAndUpload').on('click', () => {
  let params = new EventCameraParam({
    type: EventCameraParam.types.videoCamera,
    filterId: baseConfig.filterId, // 滤镜id
    categoryId: baseConfig.categoryId, // 分栏id (贴纸是在分栏里面的 所以app一般找贴纸先找到贴纸所在的分栏)
    stickerId: baseConfig.stickerId
  })
  Bridge.takeVideoAndUpload(params, res => {
    //{success: Boolean, videoPath: String}
   console.log(res)
   if (!res.success) return
   $('#distVideo').attr({'src': res.videoPath, 'controls': 'true', 'autoplay': 'true'})
   $('#distVideo')[0].play()
  })
})

// save Img
$('#saveBtn').on('click', () => {
  // alert($('#distImg')[0].src.trim().length)
  if ($('#distImg').attr('src').length == 0) {
    alert('plz select media')
  } else {
    const param = new SaveShareParam({
      url: $('#distImg').attr('src'),
      type: SaveShareParam.types.image
    })
    Bridge.save(param, () => {
      alert('save success')
    })
  }
})

/*
  share
*/
$('#shareVideo').on('click', () => {
  let params = new SaveShareParam({
    url: 'https://b612-static.kajicam.com/stickerpr/1391/file_media_1_1545207714759.mp4',
    type: SaveShareParam.types.video
  });
  var iosShared = false;
  Bridge.shareWithCallback(params, result => {
    if (!iosShared){
      iosShared = !iosShared
      alert('video has been saved, plz choose to share from album')
    }
  }, res => {})
})

$('#sharePage').on('click', () => {
  let params = new SaveShareParam({
    title: "set title: 一起来玩最爱的B612咔叽，随手一排就是小仙女～",
    content: 'set content: 一起来玩最爱的B612咔叽，随手一排就是小仙女～',
    thumbnail: 'https://dummyimage.com/850x850/b293a4/fff&text=someImg',
    url: 'http://www.baidu.com',
    type: SaveShareParam.types.web
  })
  Bridge.shareWithCallback(params, result => {
    alert('callback')
  })
})

// save and share
$('#shareImage').on('click', () => {
  let params = new SaveShareParam({
    url: 'https://b612-static.kajicam.com/stickerpr/1388/file_media_1_1545210560520.jpg',
    type: SaveShareParam.types.image
  })
  Bridge.shareWithCallback(params, result => {
   alert('callback')
  }, res => {
  })
})

/*
  about user session
*/
$('#getUserSession').on('click', () => {
  $('.userSession').text('')
  Bridge.getUserSession(res => {
    for (let i in res){
      if (res[i] == undefined) {
        res[i] = ''
      }
    }
    console.log(res)
    $('.userSession').text(JSON.stringify(res))
  })
})

$('#loginWithSession').on('click', () => {
  $('.userSession').text('')
  Bridge.loginWithSession(res => {
    for (let i in res){
      if (res[i] == undefined) {
        res[i] = ''
      }
    }
    console.log(res)
    $('.userSession').text(JSON.stringify(res))
  })
})

$('#verifyPhoneWithSession').on('click', () => {
  $('.userSession').text('')
  Bridge.verifyPhoneWithSession(res => {
    for (let i in res){
      if (res[i] == undefined) {
        res[i] = ''
      }
    }
    console.log(res)
    $('.userSession').text(JSON.stringify(res))
  })
})

function eventCameraCallback(result, type) {
  console.log('>>> eventCameraCallback - result， type', result, type);
    if (!result) return;
    if (!result.base64Image) {
        //没有获取到照片资源
        return
    }
    if (!result.success) {
        // 获取失败
        return
    }
    const base64Image = result.base64Image;
    const landmarks = result.landmarks;
    $('.landmarks').text(landmarks)
    $('#distImg').attr('src', base64Image)
    // ImageHandleSupport.preProcessAndUploadImage(base64Image, landmarks, type);
}

$('#inputfile').on('change', function(){
  // 此处过于简单 实际请转base64 并压缩为合适尺寸大小
  $('#distImg').attr('src', URL.createObjectURL($(this)[0].files[0]))
})
