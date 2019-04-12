import 'babel-polyfill'

import BridgeFactory from '@/js/bridge/BridgeFactory'
import BrowserChecker from "@/js/util/BrowserChecker"
import config from '@/config/index'
import 'zepto/src/zepto'
import 'zepto/src/event'
import baseConfig from '@/config/index'

import EventCameraParam from "@/js/bridge/param/EventCameraParam";
import SaveShareParam from "@/js/bridge/param/SaveShareParam";
// import 'zepto/src/ajax'
let pathSlice = process.env.NODE_ENV == 'production'? 'release':'beta'
console.log(`${baseConfig.b612Scheme}inappBrowser?url=https://zhaodifont.github.io/kajicam/dist/${pathSlice}/index.html%3Fuuid%3D%7Bad_did%7D`)

var vConsole = new VConsole();

var appState = {
  isAnd: false,
  isIos: false,
  isInApp: false
}

if (BrowserChecker.isIos()) {
  appState.isIos = true
} else if (BrowserChecker.isAndroid()) {
  appState.isAnd = true
}

document.querySelector('.baseState').innerText = JSON.stringify(appState)

// console.log(window.B612KajiBridgeInterface != undefined)
BridgeFactory.getBridge().appInfo(res => {
  // app内 才能执行到这一步
  /*
    {app: '7.n.n', 'os': '23', deviceModel: 'CAM-TLOO', 'language': 'zh-CN', 'country':'CN'}
  */
  document.querySelector('.AppInfo').innerText = JSON.stringify(res)
  if (res.app) {
    appState.isInApp = true
    document.querySelector('.baseState').innerText = JSON.stringify(appState)
    document.querySelector('.shareDom').style.display = 'block'

    // 显示eventCameraWithLandmarksBtn
    $('#eventCameraWithLandmarksBtn').css('display','inline-block')

    // 显示getUUid
    $('#getUUid').show()

    $('#getUUid').attr('href', `${baseConfig.b612Scheme}inappBrowser?url=https://zhaodifont.github.io/kajicam/dist/${pathSlice}/index.html%3Fuuid%3D%7Bad_did%7D`)
    $('.exit').show()
    $('.exit button').click(() => {
      BridgeFactory.getBridge().close()
    })

    let obj = getParamsToObj()
    $('.getUUidVal')[0].innerText = !!obj.uuid ? obj.uuid : ''

    // 图片保存功能
    $('#saveBtn').show()

    // 分享功能
    $('.shareDom').show()
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
$('#galleryBtn').on('click', () => {
  if (appState.isInApp) {

    const param = new EventCameraParam(
            EventCameraParam.types.imageAlbum, // 字符串 imageCamera: 相机  imageAlbum： 相册
    );
    BridgeFactory.getBridge().eventCamera(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

// 用相机拍照
$('#cameraBtn').on('click', () => {
  if (appState.isInApp) {
    const param = new EventCameraParam(
            EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
            EventCameraParam.cameraPositions.front, // 前置摄像头 0  后置摄像头: 1
            '', // 滤镜id
            '', // 分栏id (贴纸是在分栏里面的 所以app一般找贴纸先找到贴纸所在的分栏)
            '', // 贴纸id
            '2', // 貌似是 音乐id
            'true'  // 已设置默认为true
    );
    BridgeFactory.getBridge().eventCamera(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

// 用相机拍照
$('#eventCameraWithLandmarksBtn').on('click', () => {
  console.log('eventCameraWithLandmarks  仅兼容7.6.0以上版本');
  if (appState.isInApp) {
    const param = new EventCameraParam(
            EventCameraParam.types.imageCamera, // 字符串 imageCamera: 相机  imageAlbum： 相册
            EventCameraParam.cameraPositions.front, // 前置摄像头 0  后置摄像头: 1
            baseConfig.filterId, // 滤镜id
            baseConfig.categoryId, // 分栏id (贴纸是在分栏里面的 所以app一般找贴纸先找到贴纸所在的分栏)
            baseConfig.stickerId, // 贴纸id
            '', // 貌似是 音乐id
            // 'true'  // 已设置默认为true
    );
    BridgeFactory.getBridge().eventCameraWithLandmarks(param, eventCameraCallback);
  } else {
    $('#inputfile').trigger('click')
  }
})

// saveVideo
$('#saveBtn').on('click', () => {
  alert($('#distImg')[0].src.length)
  if ($('#distImg')[0].src.length == 0) {
    alert('请选择或拍照')
  } else {
    const param = new SaveShareParam(
      $('#distImg').attr('src'),
      SaveShareParam.types.image
    )
    BridgeFactory.getBridge().save(param, () => {
      alert('保存成功')
    })
  }
})

$('#shareVideo').on('click', () => {
  let params = new SaveShareParam('https://b612-static.kajicam.com/stickerpr/1391/file_media_1_1545207714759.mp4',SaveShareParam.types.video);
  var iosShared = false;
      BridgeFactory.getBridge().shareWithCallback(params,result => {
        if(!iosShared){
          iosShared = !iosShared
          alert('video has been saved')
        }
      }, res => {
      })
})

$('#sharePage').on('click', () => {
  let title="set title: 一起来玩最爱的B612咔叽，随手一排就是小仙女～";
  let content="set content: 一起来玩最爱的B612咔叽，随手一排就是小仙女～";
  let url='http://www.baidu.com';
  let thumbnail='https://dummyimage.com/850x850/b293a4/fff&text=someImg'
  // https://f12.baidu.com/it/u=645678572,3652301717&fm=76

  let params = new SaveShareParam(url,SaveShareParam.types.web,title,content,thumbnail);
  BridgeFactory.getBridge().shareWithCallback(params,result=>{
    alert('callback')
  })
})

$('#shareImage').on('click', () => {
  let params = new SaveShareParam('https://b612-static.kajicam.com/stickerpr/1388/file_media_1_1545210560520.jpg',SaveShareParam.types.image);
  console.log(params)
  BridgeFactory.getBridge().shareWithCallback(params,result => {
   alert('callback')
  }, res => {
  })
})

function eventCameraCallback(result, type) {
	 console.log('>>> eventCameraCallback - result', result);
    if(!result) return;

    if (!result.base64Image) {
        //  没有获取到照片资源
        return;
    }

    if (!result.success) {
        // 获取失败
        return;
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
