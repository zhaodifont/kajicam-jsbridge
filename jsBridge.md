## jsBridge 文档

[返回首页](./index.md)
-
 
* 对于 jsBridge
* 在android beta app和real app可以用同一份jsbridge 没有区别
* 在ios中(_calliOSFunction 函数) : 
  - beta app调用jsbridge 设置scheme为 **b612cnb://native/** 
  - real app调用jsbridge 设置scheme为 **b612cn://native/**
  

### jsBridge的引入

判断如果ios 引入iosBridge；  android 引入AndroidBridge； 其他系统 引入NullBridge (不触发咔叽的功能 只会给一个log提示)













[返回首页](./index.md)


