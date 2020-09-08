export default class VideoResult {
  constructor(videoPath, success){
    this.videoPath = videoPath
    this.success = success

  }
  static from (result) {
    console.log('result', result);
    console.log('VideoResult1:', result.success, typeof result, JSON.parse(JSON.stringify(result)))
    console.log('VideoResult2:', JSON.stringify(result))
    console.log('videoPath', this.videoPath);
    let _res = `'${result}'`
    console.log('_res1', _res1, typeof _res1,  _res1.success);
    console.log('_res2', JSON.parse(_res));
    // let _res = JSON.parse(JSON.stringify(result))
    // for (let i in _res) {
    //   console.log(i, result[i]);
    // }
    const {videoPath, success} = JSON.parse(JSON.stringify(result))
    return new VideoResult(videoPath, success)
  }
}
