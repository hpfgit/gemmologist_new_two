<template>
  <view class="container">
      <view class="header">
<!--          <view class="header-top"></view>-->
<!--          <view class="custom-title">我的鉴定品牌</view>-->
          <view class="anError" @tap="statement">考核声明</view>
<!--          <view class="goback" @tap="goBack"></view>-->
      </view>
    <view class="box-container">
      <view class="box" :class="'box-'+index" v-for="(item, index) in brand_list" :key="index">
        <view class="left">
          <image :src="getPath(item.cover_image)" mode=""></image>
          <view class="font">鞋子</view>
        </view>
        <view class="right">
          <view class="top">
            <view class="text">{{ level_name(item.level) }}</view>
            <!--<view class="shallow">鉴定师</view>-->
          </view>
          <view class="center">
            <view class="progress" :class="item.progressClass"></view>
          </view>
          <view class="bottom">
            <view
              @tap="goTo(item)"
              class="mn"
            >
              <image
                :src="qiniuUrl+'/模拟考试1@2x.png'"
              ></image>
              模拟考试
            </view>
            <view class="sj" @tap="goTo(item)">
              <image :src="qiniuUrl+'/升级@2x.png'"></image>
              升级考试
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="add" @tap="addBrand">
      <text class="icon">+</text>
      添加品牌
    </view>
    <view class="mask" v-show="isShow"></view>
    <view class="check-type" :class="{'active': isShow}">
        <view class="title">选择鉴定品类</view>
        <view class="close-box"
            @tap="addBrand"
        >
            <image
                :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"
                class="close-img"
            ></image>
        </view>
        <view class="classList">
            <view class="list" @tap="goToPath(0)">
                <image
                    class="shoes-img"
                    :src="qiniuUrl+'球鞋@2x.png'"
                ></image>
                <view class="text">球鞋</view>
            </view>
            <view class="list" @tap="goToPath(1)">
                <image
                    class="clothing-img"
                    :src="qiniuUrl+'服饰@2x.png'"
                ></image>
                <view class="text">服饰</view>
            </view>
        </view>
    </view>
      <nodata v-if="!brand_list.length"/>
  </view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
import { appraisal } from "../../api/gemmologist";
import nodata from "../../component/nodata/nodata";

export default {
  data() {
    return {
      brand_list: [],
      imgPath: config[NODE_ENV].imgUrl,
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      isShow: false
    };
  },
  onLoad() {
    uni.showLoading({
      title: '加载中...',
      icon: 'none'
    });
    appraisal().then(result => {
      const { data } = result.data;
      const sortData = data.sort(function(a, b) {
        return a.level - b.level;
      });
      this.brand_list = sortData;
      this.brand_list.forEach(item => {
        item.progressClass = this.progress(item.level);
      });
      uni.hideLoading();
    });
  },
  methods: {
      goBack() {
          uni.navigateBack({
              delta: 1
          });
      },
      statement() {
          uni.navigateTo({
              url: "/pages/statement/statement"
          })
      },
    goToPath(index) {
        const that = this;
        if (index) {
            uni.navigateTo({
                url: '/pages/equipmentappraisal3/equipmentappraisal3?is_specialty='+this.is_specialty+'&type=clothing&title=球鞋',
                success() {
                    that.isShow = false;
                }
            });
        } else {
            uni.navigateTo({
                url: '/pages/equipmentappraisal3/equipmentappraisal3?is_specialty='+this.is_specialty+'&type=shoes&title=服装',
                success() {
                    that.isShow = false;
                }
            });
        }
    },
    goTo(item) {
      if (item.level === 4) {
        uni.showToast({
          title: '您已经是最高级别了',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: '/pages/examination/examination?brand_id=' + item.brand_id
      });
    },
    progress(level) {
      return 'progress-' + level;
    },
    getPath(path) {
      return this.imgPath + path;
    },
    level_name(level) {
      const level_obj = {
        1: "实习鉴定师",
        2: "鉴定师",
        3: "高级鉴定师",
        4: "鉴定顾问",
        6: "GM"
      };
      return level_obj[level];
    },
    addBrand() {
      this.isShow = !this.isShow;
      // uni.navigateTo({
      //   url: '/pages/equipmentappraisal3/equipmentappraisal3'
      // });
    }
  },
    components: {
      nodata
    }
};
</script>

<style lang="scss">
.close-img, .close-box {
    width: 24rpx;
    height: 23rpx;
    position: absolute;
}

.header-top {
    height: 136rpx;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
}

.custom-title {
    position: absolute;
    width: 100%;
    top: 96rpx;
    left: 0;
    z-index: 3;
    font-size: 32rpx;
    color: #000000;
    padding-left: 70rpx;
}

.goback {
    position: absolute;
    z-index: 9;
    top: 105rpx;
    left: 26rpx;
    width: 12px;
    height: 12px;
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    transform: rotate(-135deg);
}

.anError {
    position: fixed;
    right: 36rpx;
    top: 20rpx;
    z-index: 999;
    font-size: 26rpx;
}

.close-img {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}

.close-box {
    top: 60rpx;
    right: 50rpx;
    width: 48rpx;
    height: 48rpx;
}
.check-type {
    position: fixed;
    bottom: -454rpx;
    right: 0;
    left: 0;
    z-index: 999;
    width: 750rpx;
    height: 454rpx;
    background-color: #ffffff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    transition: all .3s;
    overflow: hidden;

    &.active {
        bottom: 0;
    }

    .title {
        text-align: center;
        margin-top: 56rpx;
        margin-bottom: 94rpx;
    }

    .classList {
        display: flex;
        justify-content: space-between;
        padding-left: 36rpx;
        padding-right: 36rpx;
    }

    .list {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 314rpx;
        height: 160rpx;
        border: solid 2rpx #ededed;
        margin-bottom: 70rpx;

        image {
            margin-right: 36rpx;
        }
    }


    .shoes-img {
        width: 97rpx;
        height: 50rpx;
    }

    .clothing-img {
        width: 63rpx;
        height: 74rpx;
    }
}

.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.container {
    position: relative;
  .box-container {
    .box {
      &:last-child {
        margin-bottom: 240rpx;
      }
    }
  }

  .box {
    width: 690rpx;
    height: 180rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
    margin: 18rpx auto;
    padding: 35rpx 35rpx 30rpx 35rpx;
    display: flex;
    justify-content: space-between;

    .left {
      image {
        width: 80rpx;
        height: 80rpx;
        box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
        border-radius: 40rpx;
      }

      .font {
        width: 60rpx;
        height: 30rpx;
        line-height: 30rpx;
        background-color: #e36cd9;
        border-radius: 15rpx;
        text-align: center;
        font-size: 20rpx;
        color: #ffffff;
        margin-top: 15rpx;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .right {
      view {
        font-size: 22rpx;
        color: #4d4d4d;
      }

      .top {
        margin-bottom: 18rpx;
        justify-content: space-between;

        .shallow {
          color: #e9e9ee;
        }

        .text {
          color: #282828;
        }
      }

      .center {
        width: 516rpx;
        height: 16rpx;
        background-color: #eeeef3;
        border-radius: 8rpx;
        position: relative;
        overflow: hidden;

        .progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 16rpx;
          width: 45%;
          border-radius: 8rpx;
          background-image: linear-gradient(90deg, #39b6f2 0%, #6a67f5 100%),
            linear-gradient(#e6dcb5, #e6dcb5);

          &.progress-1 {
            width: 25%;
          }
          &.progress-2 {
            width: 50%;
          }
          &.progress-3 {
            width: 75%;
          }
          &.progress-4 {
            width: 100%;
          }
        }
      }

      .top,
      .bottom {
        display: flex;
      }

      .bottom {
        margin-top: 24rpx;
        justify-content: flex-end;

        .mn,
        .sj {
          display: flex;
          align-items: cneter;

          image {
            width: 26rpx;
            height: 26rpx;
            margin-right: 12rpx;
          }
        }

        .sj {
          margin-left: 24rpx;
        }
      }
    }
  }
  .add {
    position: fixed;
    bottom: 90rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
      z-index: 999;
    width: 250rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #ffffff;
    border-radius: 40rpx;

    .icon {
      color: #cdcdcd;
      font-size: 36rpx;
      margin-right: 10rpx;
    }
  }
}

</style>
