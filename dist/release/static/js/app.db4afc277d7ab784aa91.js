webpackJsonp([1],{"2CaA":function(e,t){e.exports={assetsPublicPath:"./",assetsRoot:"../dist/release/",b612Scheme:"b612cn://",sitePrefix:"http://h5.kajicam.com/events/",uploadUrl:"https://b612-fs.snowcam.cn/v1/event/vision/xiaofu/upload-only",imgProcess:"https://b612-fs.snowcam.cn/v1/event/vision/xiaofu",imagePrefix:"https://b612kaji-org.oss-cn-beijing.aliyuncs.com/",filterId:"235",categoryId:"20005",stickerId:"301197"}},"2uFj":function(e,t,a){a("6rvf");var n=a("2CaA"),i=(a("TcyI"),null);i=n,e.exports=i},"6rvf":function(e,t){e.exports={assetsPublicPath:"./",assetsRoot:"../dist/beta/",b612Scheme:"b612cnb://",sitePrefix:"http://h5-beta.kajicam.com/events",uploadUrl:"http://qa-b612-fs.snowcam.cn/v1/event/vision/xiaofu/upload-only",imgProcess:"http://qa-b612-fs.snowcam.cn/v1/event/vision/xiaofu",imagePrefix:"https://qa-b612.snowcam.cn/owfs/",filterId:"235",categoryId:"20136",stickerId:"301197",activityName:"sept",downLink:"https://lnk0.com/easylink/EL50AJ9g"}},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),i=a.n(n),r=a("Zrlr"),s=a.n(r),o=a("wxAW"),l=a.n(o),c=function(){function e(){s()(this,e)}return l()(e,null,[{key:"isIos",value:function(){return!!navigator.userAgent.match(/iPhone|iPad|iPod/i)}},{key:"isAndroid",value:function(){return!!navigator.userAgent.match(/Android/i)}},{key:"isIosOrAndroid",value:function(){return console.log("[navigation.userAgent] : "+navigator.userAgent),e.isIos()||e.isAndroid()}},{key:"isIosLowerThan11",value:function(){var t=!1;e.isIos()&&(t=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]<=10);return t}},{key:"isIos8or9",value:function(){var e=navigator.userAgent;return e.indexOf("OS 8_")>=0||e.indexOf("OS 9_")>=-1}}]),e}(),u=a("Zx67"),g=a.n(u),m=a("zwoO"),v=a.n(m),h=a("Pf15"),d=a.n(h),f=a("yEsh"),k=a.n(f),p={bridgeNs1st:"B612",bridgeNs2nd:"Native",_initB612Context:function(){return window[this.bridgeNs1st]=window[this.bridgeNs1st]||{},window[this.bridgeNs1st][this.bridgeNs2nd]=window[this.bridgeNs1st][this.bridgeNs2nd]||{},window[this.bridgeNs1st][this.bridgeNs2nd]},getB612NativeContext:function(){var e=this._initB612Context();return e.namespace=this.bridgeNs1st+"."+this.bridgeNs2nd,e}},b=function(){function e(){return s()(this,e),null}return l()(e,[{key:"_initInstance",value:function(){this.className=this.constructor.name,this.fullName=p.getB612NativeContext().namespace+"."+this.className,this.callback={},this.callback.fullName=this.fullName+".callback",this._registerGlobal()}},{key:"_registerGlobal",value:function(){p.getB612NativeContext()[this.className]=p.getB612NativeContext()[this.className]||this}},{key:"_registerCallback",value:function(e,t,a){for(var n=arguments.length,i=Array(n>3?n-3:0),r=3;r<n;r++)i[r-3]=arguments[r];var s=this;return this.callback[e]=function(n){s._logResult(n,e);var r=a?a.from(n):n;t.apply(void 0,[r].concat(i))},this._makeNativeCallbackName(e)}},{key:"_makeNativeCallbackName",value:function(e){return this.callback.fullName+"."+e}},{key:"_logResult",value:function(e,t){var a=e;"string"==typeof e&&(a=e.substring(0,1e3)),console.log("[Native callback]["+t+"] : "+a)}},{key:"printThis",value:function(){console.log("--- print this below --- "),console.log(this),console.log("--- end of print this --- ")}}],[{key:"getInstance",value:function(){return null}}]),e}(),y=null,C=function(e){function t(){var e;s()(this,t);var a=v()(this,(t.__proto__||g()(t)).call(this));return y||(y=a,k()(t.prototype.__proto__||g()(t.prototype),"_initInstance",a).call(a,y)),e=y,v()(a,e)}return d()(t,e),l()(t,[{key:"appInfo",value:function(e){console.log("[NullBridge] appInfo")}},{key:"save",value:function(e,t){console.log("[NullBridge] save, param : "+e.toString())}},{key:"shareWithCallback",value:function(e,t,a){console.log("[NullBridge] shareWithCallback, param : "+e.toString())}},{key:"eventCamera",value:function(e,t){console.log("[NullBridge] eventCamera, param : "+e.toString())}},{key:"eventCameraWithLandmarks",value:function(e,t){console.log("[NullBridge] eventCamera, param : "+e.toString())}},{key:"getCameraImage",value:function(e){console.log("[NullBridge] getCameraImage")}},{key:"getCameraImageWithLandmarks",value:function(e){console.log("[NullBridge] getCameraImage")}}]),t}(b),I=function(){function e(t,a,n,i,r){s()(this,e),this.app=t,this.os=a,this.deviceModel=n,this.language=i,this.country=r}return l()(e,null,[{key:"from",value:function(t){var a=JSON.parse(t);return new e(a.app,a.os,a.deviceModel,a.language,a.country)}}]),e}(),_=function(){function e(t){s()(this,e),this.success=t}return l()(e,null,[{key:"from",value:function(t){return new e(JSON.parse(t).success)}}]),e}(),N=function(){function e(t,a){s()(this,e),this.base64Image=t,this.success=a}return l()(e,null,[{key:"from",value:function(t){return new e(t,!!t)}}]),e}(),w=function(){function e(t,a){s()(this,e),this.base64Image=t,this.success=a}return l()(e,null,[{key:"from",value:function(t){return t?new e(t.replace(/\n/gi,""),!0):new e(t,!1)}}]),e}(),S=function(){function e(t){var a=t.success,n=t.base64Image,r=t.url,o=t.landmarks;s()(this,e),this.success=a,this.base64Image=n,this.url=r,this.landmarks=i()(o)}return l()(e,null,[{key:"from",value:function(t){return new e(JSON.parse(t))}}]),e}(),A=null,P=window.B612KajiBridgeInterface,x=function(e){function t(){var e;s()(this,t);var a=v()(this,(t.__proto__||g()(t)).call(this));return A||(A=a,k()(t.prototype.__proto__||g()(t.prototype),"_initInstance",a).call(a,A)),e=A,v()(a,e)}return d()(t,e),l()(t,[{key:"appInfo",value:function(e){var t=this._registerCallback("appInfo",e,I);P.appInfo(t)}},{key:"save",value:function(e,t){var a=this._registerCallback("save",t,_);P.save(a,e.toString())}},{key:"shareWithCallback",value:function(e,t,a){var n=this._registerCallback("sharePoppedCallback",t,_),i=this._registerCallback("shareMediaClickedCallback",a,_);P.shareWithCallback(n,i,e.toString())}},{key:"eventCamera",value:function(e,t){c.isAndroid()&&(e.categoryId=void 0,e.stickerId=void 0);var a=this._registerCallback("eventCamera",t,N,e.type,e.cameraPosition);P.eventCamera(a,e.toString(!0))}},{key:"eventCameraWithLandmarks",value:function(e,t){c.isAndroid()&&(e.categoryId=void 0,e.stickerId=void 0);var a=this._registerCallback("eventCameraWithLandmarks",t,S,e.type,e.cameraPosition);P.eventCameraWithLandmarks(a,e.toString(!0))}},{key:"getCameraImage",value:function(e){var t=this._registerCallback("getCameraImage",e,w);P.getCameraImage(t)}},{key:"getCameraImageWithLandmarks",value:function(e){var t=this._registerCallback("getCameraImageWithLandmarks",e,S);P.getCameraImageWithLandmarks(t)}}]),t}(b),B=a("2uFj"),L=a.n(B),W=null,O=function(e){function t(){var e;s()(this,t);var a=v()(this,(t.__proto__||g()(t)).call(this));return W||(W=a,k()(t.prototype.__proto__||g()(t.prototype),"_initInstance",a).call(a,W)),e=W,v()(a,e)}return d()(t,e),l()(t,[{key:"appInfo",value:function(e){var t=this._registerCallback("appInfo",e,I);this._calliOSFunction("appInfo",null,t)}},{key:"save",value:function(e,t){var a=this._registerCallback("save",t,_);this._calliOSFunction("save",e,a)}},{key:"shareWithCallback",value:function(e,t,a){var n=this._registerCallback("sharePoppedCallback",t,_),i=this._registerCallback("shareMediaClickedCallback",a,_),r=JSON.parse(e.toString());r.clickShareButton=i,this._calliOSFunction("share",r,n)}},{key:"eventCamera",value:function(e,t){var a=this._registerCallback("eventCamera",t,S,e.type,e.cameraPosition);this._calliOSFunction("eventCamera",e,a)}},{key:"eventCameraWithLandmarks",value:function(e,t){var a=this._registerCallback("eventCameraWithLandmarks",t,S,e.type,e.cameraPosition);this._calliOSFunction("eventCameraWithLandmarks",e,a)}},{key:"getCameraImage",value:function(e){var t=this._registerCallback("getCameraImage",e,S);this._calliOSFunction("getCameraImage",null,t)}},{key:"getCameraImageWithLandmarks",value:function(e){var t=this._registerCallback("getCameraImageWithLandmarks",e,S);this._calliOSFunction("getCameraImageWithLandmarks",null,t)}},{key:"_calliOSFunction",value:function(e,t,a){var n=L.a.b612Scheme+"native/",r={};r.functionName=e,a&&(r.success=a),t&&(r.args=t),n+=i()(r),this._openCustomURLinIFrame(n)}},{key:"_openCustomURLinIFrame",value:function(e){var t=document.documentElement,a=document.createElement("IFRAME");a.setAttribute("src",e),t.appendChild(a),a.parentNode.removeChild(a)}}]),t}(b),F=function(){function e(){s()(this,e)}return l()(e,null,[{key:"getBridge",value:function(){return c.isIos()?new O:void 0!=window.B612KajiBridgeInterface&&c.isAndroid()?new x:new C}}]),e}(),j=(a("Avvh"),a("0/sL"),{imageCamera:"imageCamera",imageAlbum:"imageAlbum"}),R={front:"0",back:"1"},q=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";s()(this,t);var l=v()(this,(t.__proto__||g()(t)).call(this));if(!j[e])throw"[illegal type] "+e;return l.type=e,l.cameraPosition=a,l.filterId=n,l.categoryId=i,l.stickerId=r,l.collageId=o,l.autoDownload=!0,l}return d()(t,e),l()(t,null,[{key:"types",get:function(){return j}},{key:"cameraPositions",get:function(){return R}}]),t}(function(){function e(){s()(this,e)}return l()(e,[{key:"toString",value:function(e){return e?i()(this,function(e,t){return t||void 0}):i()(this)}}]),e}());new VConsole;console.log(L.a);var J={isAnd:!1,isIos:!1,isInApp:!1};function T(e,t){if(console.log(">>> eventCameraCallback - result",e),e&&e.base64Image&&e.success){var a=e.base64Image,n=e.landmarks;$(".landmarks").text(n),$("#distImg").attr("src",a)}}c.isIos()?J.isIos=!0:c.isAndroid()&&(J.isAnd=!0),document.querySelector(".baseState").innerText=i()(J),F.getBridge().appInfo(function(e){document.querySelector(".AppInfo").innerText=i()(e),e.app&&(J.isInApp=!0,document.querySelector(".baseState").innerText=i()(J),$("#eventCameraWithLandmarksBtn").css("display","inline-block"))}),$("#galleryBtn").on("click",function(){if(J.isInApp){var e=new q(q.types.imageAlbum);F.getBridge().eventCamera(e,T)}else $("#inputfile").trigger("click")}),$("#cameraBtn").on("click",function(){if(J.isInApp){var e=new q(q.types.imageCamera,q.cameraPositions.front,L.a.filterId,L.a.categoryId,L.a.stickerId,"");F.getBridge().eventCamera(e,T)}else $("#inputfile").trigger("click")}),$("#eventCameraWithLandmarksBtn").on("click",function(){if(console.log("eventCameraWithLandmarks  仅兼容7.6.0以上版本"),J.isInApp){var e=new q(q.types.imageCamera,q.cameraPositions.front,L.a.filterId,L.a.categoryId,L.a.stickerId,"");F.getBridge().eventCameraWithLandmarks(e,T)}else $("#inputfile").trigger("click")}),$("#inputfile").on("change",function(){$("#distImg").attr("src",URL.createObjectURL($(this)[0].files[0]))})},TcyI:function(e,t){e.exports={assetsPublicPath:"./",assetsRoot:"../dist/local/",b612Scheme:"b612cnb://",sitePrefix:"http://h5-beta.kajicam.com/events",uploadUrl:"http://qa-b612-fs.snowcam.cn/v1/event/vision/travel/upload-only",imgProcess:"http://qa-b612-fs.snowcam.cn/v1/event/vision/travel",imagePrefix:"https://qa-b612.snowcam.cn/owfs/",filterId:"235",categoryId:"20136",stickerId:"301197",activityName:"sept",downLink:"https://lnk0.com/easylink/EL50AJ9g"}}},["NHnr"]);
//# sourceMappingURL=app.db4afc277d7ab784aa91.js.map