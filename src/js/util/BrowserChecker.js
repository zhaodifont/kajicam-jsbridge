class BrowserChecker {
    static isIos() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }

    static isAndroid() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    }

    static isIosOrAndroid() {
        console.log("[navigation.userAgent] : " + navigator.userAgent);
        return BrowserChecker.isIos() || BrowserChecker.isAndroid();
    }

    static isIosLowerThan11() {
        let result = false;
        if (BrowserChecker.isIos()) {
            const majorVersion = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1];
            result = majorVersion <= 10;
        }
        return result;
    }

    static isIos8or9() {
        const ua = navigator.userAgent;
        return (ua.indexOf("OS 8_") >= 0 || ua.indexOf("OS 9_") >= -1);
    }
}

export default BrowserChecker
