## 人脸融合接口文档
  
[返回首页](./index.md)

### interface steps 步骤
1. 用上传接口(File Upload API)将文件上传
2. 用图片处理接口(image processing API) 请求融合好的图片

> 比如此次活动命名为 cyl
>
> 对应的接口都含有 cyl

### file upload API (图片上传接口)
###
接口地址
---
* BETA : http://qa-b612-fs.snowcam.cn/v1/event/vision/cyl/upload-only
* REAL : https://b612-fs.snowcam.cn/v1/event/vision/cyl/upload-only

> method=POST,  enctype='multipart/form-data'
> 
> params: base64Image = 图片的base64格式

##### example: (一次图片上传的过程)
```
  // POST: http://qa-b612-fs.snowcam.cn/v1/event/vision/cyl/upload-only
  // base64Image: data:image/jpeg;base64,blahblahblah (你将图片转为base64格式的样子)
  
  // response sample
   
   {
    "result": {
        "errorCode": "",
        "path": "event/vision/inminwang/20180614/15/0b2897d832a8463389151a77cc957b7a/163fce24206",
        "success": true,
        "visionErrorCode": "",
        "visionErrorMessage": ""
      }
    }
  
```

> 注意这个响应的数据里的 path 下面的接口里要用到  这里定义为 succesResPath
>

### Image processing API (图片处理融合接口)
###
接口地址：
---
* BETA : http://qa-b612-fs.snowcam.cn/v1/event/vision/cyl
* REAL : https://b612-fs.snowcam.cn/v1/event/vision/cyl

> method POST,  enctype='application/x-www-form-urlencoded'
>
> params: 
>
> path = succesResPath; 
>
> postfix = _06; (融合效果 一次生成成功n个风格的图片 一次只需要指定的一个风格)
>
> additionalParam = encodeURIComponent(content=postfix)

##### example: (一次图片融合的过程)
```
  // POST http://qa-b612-fs.snowcam.cn/v1/event/vision/cyl
  // path:event/vision/inminwang/20180614/15/0b2897d832a8463389151a77cc957b7a/163fce24206
&postfix=_11&additionalParam=content%3D11

  // response sample
  {
    "result": {
        "errorCode": "",
        "message": "",
        "success": true,
        "visionErrorCode": "",
        "visionErrorMessage": ""
      }
  }
```

[返回首页](./index.md)
