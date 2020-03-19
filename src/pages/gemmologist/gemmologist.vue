<template>
  <view class="container">
    <view class="freeAdmission">
      <div class="top"></div>
      <view class="custom-title">我的鉴定</view>
      <view class="anError" @tap="anError">失误记录</view>
      <view class="goback" @tap="goBack">
        <image :src="qiniuUrl+'/返回@2x.png'"></image>
      </view>
      <view class="bg">
        <image
          class="bg-img"
          :src="qiniuUrl+'/bg@2x.png'"
          mode=""
        ></image>
        <view class="jd">
          <navigator class="box box1" url="/pages/means4/means4?type=work_order">
            <image
              class="info-img"
              :src="qiniuUrl+'/免费鉴定bg@2x.png'"
              mode=""
            ></image>
            <view class="title">
              <text>待解决工单</text>
            </view>
            <view class="info">
              <image
                :src="qiniuUrl+'/组24@2x.png'"
                mode=""
              ></image>
              <text class="number">{{ work_order }}</text>
              <text class="text"></text>
            </view>
          </navigator>
          <navigator class="box box2" url="/pages/means4/means4?type=all">
            <image
              class="info-img"
              :src="qiniuUrl+'/免费鉴定bg@2x.png'"
              mode=""
            ></image>
            <view class="title">
              <text>全部鉴定</text>
            </view>
            <view class="info">
              <image
                :src="qiniuUrl+'/组25@2x.png'"
                mode=""
              ></image>
              <text class="number">{{ all }}</text>
              <text class="text"></text>
            </view>
          </navigator>
        </view>
        <view class="zy">
          <view class="title">免费鉴定</view>
          <view class="cont">
            <view class="item">
              <navigator url="../means2/means2?type=mfd&mold=0">
                <view>待鉴定</view>
                <view>{{ freeAdmission.d }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means3/means3?type=mfy&mold=0">
                <view>已鉴定</view>
                <view>{{ freeAdmission.y }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means2/means2?type=mfw&mold=0">
                <view>问题商品</view>
                <view>{{ freeAdmission.w }}</view>
              </navigator>
            </view>
          </view>
        </view>
        <view class="zy">
          <view class="title">专业鉴定</view>
          <view class="cont">
            <view class="item">
              <navigator url="../means2/means2?type=zyd&mold=1">
                <view>待鉴定</view>
                <view>{{ major.d }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means3/means3?type=zyy&mold=1">
                <view>已鉴定</view>
                <view>{{ major.y }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means2/means2?type=zyw&mold=1">
                <view>问题商品</view>
                <view>{{ major.w }}</view>
              </navigator>
            </view>
          </view>
        </view>
        <view class="zy">
          <view class="title">
            专业鉴定
            <text>(保价0-2000元)</text>
          </view>
          <view class="cont">
            <view class="item">
              <navigator url="../means2/means2?type=zy1d&mold=1">
                <view>待鉴定</view>
                <view>{{ major2.d }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means3/means3?type=zy1y&mold=1">
                <view>已鉴定</view>
                <view>{{ major2.y }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means2/means2?type=zy1w&mold=1">
                <view>问题商品</view>
                <view>{{ major2.w }}</view>
              </navigator>
            </view>
          </view>
        </view>
        <view class="zy">
          <view class="title">
            专业鉴定
            <text>(保价2000元以上)</text>
          </view>
          <view class="cont">
            <view class="item">
              <navigator url="../means2/means2?type=zy2w&mold=1">
                <view>待鉴定</view>
                <view>{{ major3.d }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means3/means3?type=zy2y&mold=1">
                <view>已鉴定</view>
                <view>{{ major3.y }}</view>
              </navigator>
            </view>
            <view class="item">
              <navigator url="../means2/means2?type=zy2w&mold=1">
                <view>问题商品</view>
                <view>{{ major3.w }}</view>
              </navigator>
            </view>
          </view>
        </view>
        <view class="zy">
          <view class="cont">
            <navigator
              class="item"
              url="/pages/equipmentappraisal/equipmentappraisal"
            >
              <image
                :src="qiniuUrl+'/组26@2x.png'"
                mode=""
              ></image>
              <nav>学习资料</nav>
            </navigator>
            <navigator class="item" url="/pages/assessment/assessment">
              <image
                :src="qiniuUrl+'/组29@2x.png'"
                mode=""
              ></image>
              <view>考核管理</view>
            </navigator>
            <navigator class="item" url="/pages/cashwithdrawal/cashwithdrawal">
              <image
                :src="qiniuUrl+'/组28@2x.png'"
                mode=""
              ></image>
              <view>提现管理</view>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { appraise,newAppraise } from "../../api/gemmologist";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
  data() {
    return {
      freeAdmission: {},
      major: {},
      major2: {},
      major3: {},
      work_order: 0,
      all: 0,
      qiniuUrl: config[NODE_ENV].qiniuUrl
    };
  },
  onReady() {
    this.getData();
  },
  onPullDownRefresh() {
    this.getData();
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    anError() {
      uni.navigateTo({
        url: "/pages/faultrecord/faultrecord"
      });
    },
    getData() {
      uni.showLoading();
      newAppraise().then(result => {
        const { data } = result.data;
        const { all, mf, work_order, zy, zy1, zy2 } = data;
        this.freeAdmission = mf;
        this.major = zy;
        this.major2 = zy1;
        this.major3 = zy2;
        this.work_order = work_order;
        this.all = all;
        uni.hideLoading();
        uni.stopPullDownRefresh();
      });
    }
  }
};
</script>

<style lang="scss">
.freeAdmission {
  position: relative;

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

  .goback {
    position: absolute;
    z-index: 9;
    top: 56rpx;
    left: 26rpx;
    image {
      width: 66rpx;
      height: 66rpx;
    }
  }

  .anError {
    position: absolute;
    right: 36rpx;
    top: 130rpx;
    z-index: 10;
    font-size: 24rpx;
    color: #ffffff;
  }
}

.bg {
  position: relative;
  overflow: hidden;

  .bg-img {
    width: 750rpx;
    height: 240rpx;
    position: absolute;
    left: 0;
    top: 0;
  }

  .box {
    position: absolute;
    top: 165rpx;
    width: 356rpx;
    height: 220rpx;
    padding-left: 38rpx;

    .info-img {
      width: 356rpx;
      height: 220rpx;
      position: absolute;
      left: 0;
      top: 0;
    }

    &.box1 {
      left: 19rpx;
    }

    &.box2 {
      right: -19rpx;
    }
  }

  .title {
    font-family: PingFang-SC-Bold;
    font-size: 26rpx;
    color: #282828;
    padding-top: 28rpx;
    padding-bottom: 28rpx;
    position: relative;
    z-index: 1;

    text {
      font-size: 20rpx;
      margin-left: 10px;
    }
  }

  .info {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;

    image {
      width: 70rpx;
      height: 70rpx;
    }

    .number {
      font-family: PingFang-SC-Regular;
      font-size: 50rpx;
      color: #8b8b8b;
      margin-left: 18rpx;
    }

    .text {
      font-family: PingFang-SC-Medium;
      font-size: 24rpx;
      color: #282828;
      margin-left: 14rpx;
    }
  }

  .zy {
    width: 716rpx;
    height: 220rpx;
    /*position: absolute;*/
    /*top: 382rpx;*/
    /*left: 0;*/
    /*right: 0;*/
    margin: 0 auto;
    background-image: url("../../static/images/矩形1@2x.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-left: 38rpx;
    padding-right: 38rpx;

    &:nth-of-type(2) {
      margin-top: 382rpx;
    }

    &:nth-of-type(6) {
      margin-bottom: 60rpx;

      .cont {
        align-items: center;
        justify-content: space-around;
        height: 100%;

        image {
          width: 70rpx;
          height: 70rpx;
          margin-bottom: 10rpx;
        }
      }
    }

    .title {
      color: #282828;
      font-size: 26rpx;
      padding-top: 38rpx;
      padding-bottom: 28rpx;
    }

    .cont {
      display: flex;
      padding-left: 28rpx;
      padding-right: 28rpx;
      justify-content: space-around;

      .item {
        text-align: center;

        view {
          font-size: 24rpx;
          color: #282828;

          &:nth-of-type(2) {
            font-size: 36rpx;
            color: #5e95f4;
            margin-top: 18rpx;
            font-weight: bold;
          }
        }

        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
