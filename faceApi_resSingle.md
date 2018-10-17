## 人脸融合约定规范之返回单个图片

[返回首页](./index.md)

### For example

activetyName & contentName: '**travel**'

produce one image one time !



### 图片前缀 imagePrefix
https://qa-b612.snowcam.cn/owfs/   

###
### 图片尾缀 postfix：
America,Caribbean,China2,Egypt,France,Japan,home,UK2...

###
### 图片上传接口 file upload Api
http://qa-b612-fs.snowcam.cn/v1/event/vision/ **travel** /upload-only

### 人脸融合接口 image process Api
http://qa-b612-fs.snowcam.cn/v1/event/vision/ **travel**

### params:

> path = uploadSuccessPath
>
> postfix = _**travel**_UK01
>
> additionalParam = encodeURIComponent('content=' + '**travel**_UK01')

### image url produced

imagePrefix + uploadSuccessPath + _**travel**_UK01.jpg

[返回首页](./index.md)
