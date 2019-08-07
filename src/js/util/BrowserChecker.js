export default class BrowserChecker {
    static isIos() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }

    static isAndroid() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    }

    static isIosOrAndroid() {
        return BrowserChecker.isIos() || BrowserChecker.isAndroid();
    }

    static isIosLowerThan11() {
        let result = false;
        if (BrowserChecker.isIos()) {
            const majorVersion = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1];
            result = majorVersion <= 10;
        }
        return result
    }

    static isIos8or9() {
        const ua = navigator.userAgent;
        return (ua.indexOf('OS 8_') >= 0 || ua.indexOf('OS 9_') >= -1);
    }
    // 判断此版本app是否支持此功能的
    static appVersionLessThan(versonArr) {
      let fnLimitVersionArr = versonArr
      let appVersionArr = window.kajiAppVersion
      for (let i = 0; i < fnLimitVersionArr.length; i++) {
        let cur = parseInt(appVersionArr[i], 10) || 0
        let limit = parseInt(fnLimitVersionArr[i], 10) || 0
        if (cur < limit) {
          return true
        } else if (cur > limit) {
          return false
        }
      }
      return false
    }
}
