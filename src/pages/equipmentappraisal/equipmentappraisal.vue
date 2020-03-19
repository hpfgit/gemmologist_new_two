<template>
  <view class="container">
    <view class="title">品牌选择</view>
    <view class="brands" v-show="currentIndex === 0">
      <view class="box" v-for="(brand, index) in xie" :key="index">
        <navigator :url="'/pages/means/means?brand_id=' + brand.id">
          <image :src="getPath(brand.cover_image)"></image>
        </navigator>
      </view>
    </view>
    <view class="brands clothing" v-show="currentIndex === 1">
      <view class="box" v-for="(cloth, index) in clothing" :key="index">
        <navigator :url="'/pages/means/means?brand_id=' + cloth.id">
          <image :src="getPath(cloth.cover_image)"></image>
        </navigator>
      </view>
    </view>
    <!--		<view class="btn">-->
    <!--			下一步 (1/2)-->
    <!--		</view>-->
  </view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import { brand, clothing } from "../../api/equipmentappraisal";
import config from "../../config";

export default {
  data() {
    return {
      currentIndex: 0,
      xie: [],
      clothing: [],
      imgPath: config[NODE_ENV].imgUrl,
      qiniuUrl: config[NODE_ENV].qiniuUrl
    };
  },
  onLoad() {
    uni.showLoading();
    brand({ page: 1, type: 0, limit: 1000 }).then(result => {
      const { data } = result.data;
      this.xie = data;
      uni.hideLoading();
    });
    clothing({ page: 1, type: 1, limit: 1000 }).then(result => {
      const { data } = result.data;
      this.clothing = data;
      uni.hideLoading();
    });
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    tabNav(index) {
      this.currentIndex = index;
    },
    getPath(path) {
      return this.imgPath + path;
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #ffffff;
}
.bg {
  position: relative;
  height: 144rpx;
  .bg-img {
    width: 750rpx;
    height: 144rpx;
    position: absolute;
    left: 0;
    top: 0;
  }
  .custom-title {
    position: absolute;
    width: 100%;
    top: 66rpx;
    left: 0;
    z-index: 3;
    text-align: center;
    font-size: 34rpx;
    color: #ffffff;
  }
  .back {
    position: absolute;
    left: 24rpx;
    top: 66rpx;
    z-index: 4;
    image {
      width: 66rpx;
      height: 66rpx;
    }
  }
}
.navs {
  width: 690rpx;
  height: 86rpx;
  background-color: #fafafa;
  border-radius: 10rpx;
  border: solid 4rpx #eef1f4;
  margin: 28rpx auto 50rpx;
  display: flex;
  justify-content: space-between;
  .nav {
    width: 340rpx;
    height: 80rpx;
    line-height: 80rpx;
    box-shadow: 2rpx 0rpx 6rpx 0rpx rgba(43, 43, 43, 0.14);
    border-radius: 10rpx;
    text-align: center;
    text {
      font-size: 26rpx;
      color: #282828;
    }
    &.active {
      background-color: #ffffff;
    }
    image {
      width: 44rpx;
      height: 23rpx;
      margin-right: 22rpx;
    }
    &:nth-of-type(2) {
      image {
        width: 40rpx;
        height: 35rpx;
      }
    }
  }
}
.title {
  padding-left: 36rpx;
}
.brands {
  padding-left: 28rpx;
  padding-right: 28rpx;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
  .box {
    margin-left: 47rpx;
    margin-top: 24rpx;
    box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);

    &:nth-of-type(3n + 1) {
      margin-left: 0;
    }

    image {
      width: 200rpx;
      height: 200rpx;
    }
  }
}
.btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750rpx;
  height: 97rpx;
  line-height: 97rpx;
  text-align: center;
  background-image: linear-gradient(
      -90deg,
      #5e95f4 0%,
      #6990f7 39%,
      #738af9 100%
    ),
    linear-gradient(#eef1f4, #eef1f4);
  background-blend-mode: normal, normal;
  font-size: 30rpx;
  color: #eef1f4;
}
</style>
