webpackJsonp([1],{"2CaA":function(e,t){e.exports={assetsPublicPath:"./",assetsRoot:"../dist/release/",b612Scheme:"b612cn://",sitePrefix:"http://h5.kajicam.com/events/",uploadUrl:"https://b612-fs.snowcam.cn/v1/event/vision/xiaofu/upload-only",imgProcess:"https://b612-fs.snowcam.cn/v1/event/vision/xiaofu",imagePrefix:"https://b612kaji-org.oss-cn-beijing.aliyuncs.com/",filterId:"235",categoryId:"20005",stickerId:"301197"}},"2uFj":function(e,t,a){a("6rvf");var n=a("2CaA"),i=(a("TcyI"),null);i=n,e.exports=i},"6rvf":function(e,t){e.exports={assetsPublicPath:"./",assetsRoot:"../dist/beta/",b612Scheme:"b612cnb://",sitePrefix:"http://h5-beta.kajicam.com/events",uploadUrl:"http://qa-b612-fs.snowcam.cn/v1/event/vision/xiaofu/upload-only",imgProcess:"http://qa-b612-fs.snowcam.cn/v1/event/vision/xiaofu",imagePrefix:"https://qa-b612.snowcam.cn/owfs/",filterId:"235",categoryId:"20136",stickerId:"301197",activityName:"sept",downLink:"https://lnk0.com/easylink/EL50AJ9g"}},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),i=a.n(n),s=a("Zrlr"),r=a.n(s),o=a("wxAW"),l=a.n(o),c=function(){function e(){r()(this,e)}return l()(e,null,[{key:"isIos",value:function(){return!!navigator.userAgent.match(/iPhone|iPad|iPod/i)}},{key:"isAndroid",value:function(){return!!navigator.userAgent.match(/Android/i)}},{key:"isIosOrAndroid",value:function(){return console.log("[navigation.userAgent] : "+navigator.userAgent),e.isIos()||e.isAndroid()}},{key:"isIosLowerThan11",value:function(){var t=!1;e.isIos()&&(t=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]<=10);return t}},{key:"isIos8or9",value:function(){var e=navigator.userAgent;return e.indexOf("OS 8_")>=0||e.indexOf("OS 9_")>=-1}}]),e}(),u=a("Zx67"),v=a.n(u),h=a("zwoO"),m=a.n(h),g=a("Pf15"),d=a.n(g),f=a("yEsh"),k=a.n(f),p={bridgeNs1st:"B612",bridgeNs2nd:"Native",_initB612Context:function(){return window[this.bridgeNs1st]=window[this.bridgeNs1st]||{},window[this.bridgeNs1st][this.bridgeNs2nd]=window[this.bridgeNs1st][this.bridgeNs2nd]||{},window[this.bridgeNs1st][this.bridgeNs2nd]},getB612NativeContext:function(){var e=this._initB612Context();return e.namespace=this.bridgeNs1st+"."+this.bridgeNs2nd,e}},b=function(){function e(){return r()(this,e),null}return l()(e,[{key:"_initInstance",value:function(){this.className=this.constructor.name,this.fullName=p.getB612NativeContext().namespace+"."+this.className,this.callback={},this.callback.fullName=this.fullName+".callback",this._registerGlobal()}},{key:"_registerGlobal",value:function(){p.getB612NativeContext()[this.className]=p.getB612NativeContext()[this.className]||this}},{key:"_registerCallback",value:function(e,t,a){for(var n=arguments.length,i=Array(n>3?n-3:0),s=3;s<n;s++)i[s-3]=arguments[s];var r=this;return this.callback[e]=function(n){r._logResult(n,e);var s=a?a.from(n):n;t.apply(void 0,[s].concat(i))},this._makeNativeCallbackName(e)}},{key:"_makeNativeCallbackName",value:function(e){return this.callback.fullName+"."+e}},{key:"_logResult",value:function(e,t){var a=e;"string"==typeof e&&(a=e.substring(0,1e3)),console.log("[Native callback]["+t+"] : "+a)}},{key:"printThis",value:function(){console.log("--- print this below --- "),console.log(this),console.log("--- end of print this --- ")}}],[{key:"getInstance",value:function(){return null}}]),e}(),y=null,C=function(e){function t(){var e;r()(this,t);var a=m()(this,(t.__proto__||v()(t)).call(this));return y||(y=a,k()(t.prototype.__proto__||v()(t.prototype),"_initInstance",a).call(a,y)),e=y,m()(a,e)}return d()(t,e),l()(t,[{key:"appInfo",value:function(e){console.log("[NullBridge] appInfo")}},{key:"save",value:function(e,t){console.log("[NullBridge] save, param : "+e.toString())}},{key:"shareWithCallback",value:function(e,t,a){console.log("[NullBridge] shareWithCallback, param : "+e.toString())}},{key:"eventCamera",value:function(e,t){console.log("[NullBridge] eventCamera, param : "+e.toString())}},{key:"eventCameraWithLandmarks",value:function(e,t){console.log("[NullBridge] eventCamera, param : "+e.toString())}},{key:"getCameraImage",value:function(e){console.log("[NullBridge] getCameraImage")}},{key:"getCameraImageWithLandmarks",value:function(e){console.log("[NullBridge] getCameraImage")}}]),t}(b),_=function(){function e(t,a,n,i,s){r()(this,e),this.app=t,this.os=a,this.deviceModel=n,this.language=i,this.country=s}return l()(e,null,[{key:"from",value:function(t){var a=JSON.parse(t);return new e(a.app,a.os,a.deviceModel,a.language,a.country)}}]),e}(),I=function(){function e(t){r()(this,e),this.success=t}return l()(e,null,[{key:"from",value:function(t){return new e(JSON.parse(t).success)}}]),e}(),N=function(){function e(t,a){r()(this,e),this.base64Image=t,this.success=a}return l()(e,null,[{key:"from",value:function(t){return new e(t,!!t)}}]),e}(),w=function(){function e(t,a){r()(this,e),this.base64Image=t,this.success=a}return l()(e,null,[{key:"from",value:function(t){return t?new e(t.replace(/\n/gi,""),!0):new e(t,!1)}}]),e}(),S=function(){function e(t){var a=t.success,n=t.base64Image,s=t.url,o=t.landmarks;r()(this,e),this.success=a,this.base64Image=n,this.url=s,this.landmarks=i()(o)}return l()(e,null,[{key:"from",value:function(t){return new e(JSON.parse(t))}}]),e}(),x=null,A=window.B612KajiBridgeInterface,P=function(e){function t(){var e;r()(this,t);var a=m()(this,(t.__proto__||v()(t)).call(this));return x||(x=a,k()(t.prototype.__proto__||v()(t.prototype),"_initInstance",a).call(a,x)),e=x,m()(a,e)}return d()(t,e),l()(t,[{key:"appInfo",value:function(e){var t=this._registerCallback("appInfo",e,_);A.appInfo(t)}},{key:"save",value:function(e,t){var a=this._registerCallback("save",t,I);A.save(a,e.toString())}},{key:"shareWithCallback",value:function(e,t,a){var n=this._registerCallback("sharePoppedCallback",t,I),i=this._registerCallback("shareMediaClickedCallback",a,I);A.shareWithCallback(n,i,e.toString())}},{key:"eventCamera",value:function(e,t){c.isAndroid()&&(e.categoryId=void 0,e.stickerId=void 0);var a=this._registerCallback("eventCamera",t,N,e.type,e.cameraPosition);A.eventCamera(a,e.toString(!0))}},{key:"eventCameraWithLandmarks",value:function(e,t){c.isAndroid()&&(e.filterId=void 0,e.categoryId=void 0,e.stickerId=void 0);var a=this._registerCallback("eventCameraWithLandmarks",t,S,e.type,e.cameraPosition);A.eventCameraWithLandmarks(a,e.toString(!0))}},{key:"getCameraImage",value:function(e){var t=this._registerCallback("getCameraImage",e,w);A.getCameraImage(t)}},{key:"getCameraImageWithLandmarks",value:function(e){var t=this._registerCallback("getCameraImageWithLandmarks",e,S);A.getCameraImageWithLandmarks(t)}}]),t}(b),L=a("2uFj"),O=a.n(L),W=null,B=function(e){function t(){var e;r()(this,t);var a=m()(this,(t.__proto__||v()(t)).call(this));return W||(W=a,k()(t.prototype.__proto__||v()(t.prototype),"_initInstance",a).call(a,W)),e=W,m()(a,e)}return d()(t,e),l()(t,[{key:"appInfo",value:function(e){var t=this._registerCallback("appInfo",e,_);this._calliOSFunction("appInfo",null,t)}},{key:"save",value:function(e,t){var a=this._registerCallback("save",t,I);this._calliOSFunction("save",e,a)}},{key:"shareWithCallback",value:function(e,t,a){var n=this._registerCallback("sharePoppedCallback",t,I),i=this._registerCallback("shareMediaClickedCallback",a,I),s=JSON.parse(e.toString());s.clickShareButton=i,this._calliOSFunction("share",s,n)}},{key:"eventCamera",value:function(e,t){var a=this._registerCallback("eventCamera",t,S,e.type,e.cameraPosition);this._calliOSFunction("eventCamera",e,a)}},{key:"eventCameraWithLandmarks",value:function(e,t){var a=this._registerCallback("eventCameraWithLandmarks",t,S,e.type,e.cameraPosition);this._calliOSFunction("eventCameraWithLandmarks",e,a)}},{key:"getCameraImage",value:function(e){var t=this._registerCallback("getCameraImage",e,S);this._calliOSFunction("getCameraImage",null,t)}},{key:"getCameraImageWithLandmarks",value:function(e){var t=this._registerCallback("getCameraImageWithLandmarks",e,S);this._calliOSFunction("getCameraImageWithLandmarks",null,t)}},{key:"_calliOSFunction",value:function(e,t,a){var n=O.a.b612Scheme+"native/",s={};s.functionName=e,a&&(s.success=a),t&&(s.args=t),n+=i()(s),this._openCustomURLinIFrame(n)}},{key:"_openCustomURLinIFrame",value:function(e){var t=document.documentElement,a=document.createElement("IFRAME");a.setAttribute("src",e),t.appendChild(a),a.parentNode.removeChild(a)}}]),t}(b),F=function(){function e(){r()(this,e)}return l()(e,null,[{key:"getBridge",value:function(){return c.isIos()?new B:c.isAndroid()?new P:new C}}]),e}();new VConsole;console.log(O.a);var j={isAnd:!1,isIos:!1,isInApp:!1};c.isIos()?j.isIos=!0:c.isAndroid()&&(j.isAnd=!0),document.querySelector(".baseState").innerText=i()(j),F.getBridge().appInfo(function(e){document.querySelector(".AppInfo").innerText=i()(e),e.app&&(j.isInApp=!0,document.querySelector(".baseState").innerText=i()(j))})},TcyI:function(e,t){e.exports={assetsPublicPath:"./",assetsRoot:"../dist/local/",b612Scheme:"b612cnb://",sitePrefix:"http://h5-beta.kajicam.com/events",uploadUrl:"http://qa-b612-fs.snowcam.cn/v1/event/vision/travel/upload-only",imgProcess:"http://qa-b612-fs.snowcam.cn/v1/event/vision/travel",imagePrefix:"https://qa-b612.snowcam.cn/owfs/",filterId:"235",categoryId:"20136",stickerId:"301197",activityName:"sept",downLink:"https://lnk0.com/easylink/EL50AJ9g"}}},["NHnr"]);
//# sourceMappingURL=app.06f7ada99f9073a8487f.js.map