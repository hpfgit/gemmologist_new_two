<template>
  <view class="container">
    <view class="lists">
      <view
        class="item"
        v-for="(item, index) in lists"
        :key="index"
        @tap="gotoDetails(item.id)"
      >
        <image class="left-image" :src="getPath(item.cover_image)"></image>
        <view class="item-right">
          <view class="top">
            <text>{{ item.brand_name }}</text>
            <view class="time">
              <image :src="qiniuUrl + '/时间(3)@2x.png'"></image>
              <text>{{ item.publish_at }}</text>
            </view>
          </view>
          <view class="center">
            <view class="info">{{ item.appr_sn }}</view>
            <view class="status true" v-if="item.final_result === 1"
              ><text>鉴定为真</text></view
            >
            <view class="status false" v-if="item.final_result === 0"
              ><text>鉴定为假</text></view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="no-data" v-if="!lists.length">
      <view>
        <image :src="qiniuUrl + '/暂无鉴定贴@2x.png'"></image>
      </view>
      <view>
        <image :src="qiniuUrl + '/暂时没有鉴定贴~@2x.png'"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { work_order, all } from "../../api/means2";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
  data() {
    return {
      lists: [],
      imgPath: config[NODE_ENV].imgUrl,
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      type: "",
      mold: ""
    };
  },
  onLoad(options) {
    uni.showLoading({
      title: '加载中...',
      icon: 'none'
    });
    const { type } = options;
    if (type === 'work_order') {
      work_order({
        page: 1
      }).then(result => {
        const { data } = result.data;
        this.lists = data;
        uni.hideLoading();
      });
    } else if (type === 'all') {
      all({
        page: 1
      }).then(result => {
        const { data } = result.data;
        this.lists = data;
        uni.hideLoading();
      })
    }
  },
  methods: {
    getPath(path) {
      return config[NODE_ENV].imgUrl + path;
    },
    gotoDetails(id) {
      uni.navigateTo({
        url:
          "../Identificationdetails2/Identificationdetails2?id=" +
          id +
          "&type=" +
          this.type +
          "&mold=" +
          this.mold +
          "&isJD=false"
      });
    }
  }
};
</script>

<style lang="scss">
.lists {
  padding-top: 24rpx;
  .item {
    display: flex;
    width: 690rpx;
    height: 180rpx;
    border-radius: 20rpx;
    background-color: #ffffff;
    margin: 0 auto 24rpx;
    padding: 24rpx;
  }
  .left-image {
    width: 132rpx;
    height: 132rpx;
    border-radius: 10rpx;
  }
  .item-right {
    margin-left: 24rpx;
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      text {
        &:nth-of-type(1) {
          font-size: 28rpx;
        }
        &:nth-of-type(2) {
          font-size: 24rpx;
          color: #858585;
        }
      }
      image {
        width: 22rpx;
        height: 22rpx;
        vertical-align: top;
        margin-top: 9rpx;
        margin-right: 10rpx;
      }
      .time {
        text {
          font-size: 24rpx;
          color: #858585;
        }
      }
    }
    .center {
      margin-top: 44rpx;
      display: flex;
      justify-content: space-between;

      .time {
        width: 26rpx;
        height: 28rpx;
      }
      .info {
        width: 110rpx;
        height: 30rpx;
        line-height: 30rpx;
        text-align: center;
        font-size: 26rpx;
        background-image: url("../../static/images/组10@2x.png");
        background-size: cover;
      }
      .status {
        &.true {
          background-image: linear-gradient(
              135deg,
              rgba(28, 211, 249, 0.5) 0%,
              rgba(61, 180, 247, 0.5) 39%,
              rgba(94, 149, 244, 0.5) 100%
            ),
            linear-gradient(#5e95f4, #5e95f4);
          border: solid 2rpx #50b8f7;
        }
        &.false {
          background-color: #dd3133;
          border: solid 2rpx #dd3133;
        }
        background-blend-mode: normal, normal;
        border-radius: 14rpx 14rpx 14rpx 0rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;
        line-height: 30rpx;
        text {
          font-size: 20rpx;
          font-weight: bold;
          color: #fefefe;
        }
      }
    }
    .bottom {
      margin-top: 14rpx;
      text {
        font-size: 22rpx;
        color: #282828;
      }
      .zy {
        color: #5e95f4;
      }
    }
  }
}
.no-data {
  overflow: hidden;
  view {
    text-align: center;
    &:nth-of-type(1) {
      margin-top: 200rpx;
      image {
        width: 300rpx;
        height: 298rpx;
      }
    }
    &:nth-of-type(2) {
      image {
        width: 192rpx;
        height: 34rpx;
      }
    }
  }
}
</style>
