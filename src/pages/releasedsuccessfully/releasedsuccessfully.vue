<template>
  <view class="container">
    <view class="box">
      <image :src="qiniuUrl+'成功.png'"></image>
      <view class="text">发布成功</view>
      <view class="text">BAN鉴定团队马上为您鉴定</view>
      <view class="text">请喝杯茶稍等片刻</view>
      <view class="text">结果将以系统通知的形式通知你</view>
      <view class="btn-success" @tap="goTo">完成</view>
    </view>
  </view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
  name: "releasedsuccessfully",
  data() {
    return {
      qiniuUrl: config[NODE_ENV].qiniuUrl
    }
  },
  methods: {
    goTo() {
      uni.redirectTo({
        url: '/pages/index3/index3'
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  .box {
    text-align: center;
    padding-top: 200rpx;
  }
  
  .text {
    margin-bottom: 10rpx;
    margin-top: 10rpx;
  }

  image {
    width: 128rpx;
    height: 128rpx;
  }
}
.btn-success {
  width: 710rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  color: #ffffff;
  position: fixed;
  bottom: 36rpx;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #5e95f4;
}
</style>
