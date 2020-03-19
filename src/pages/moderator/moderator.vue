<template>
  <view class="container">
    <view class="jd">
      <view class="lists">
        <view class="list">
          <!-- <image v-show="!item.checked" class="icon" :src="qiniuUrl+'对号-加粗@2x.png'"></image>
            <image v-show="item.checked" class="icon" :src="qiniuUrl+'对号-加粗2@2x.png'"></image> -->
          <view class="left">
            <image class="avatar" :src="banzhu.avatar"></image>
          </view>
          <view class="right">
            <view class="nickname">{{ banzhu.name }}</view>
            <view class="level">
              <image :src="qiniuUrl + '矢量智能对象@2x.png'"></image>
              <view class="level-name">{{ banzhu.level_name }}</view>
            </view>
          </view>
          <view class="status">
            <view class="online" @tap="showStatus">
              <view class="circle" :class="{active: banzhu.is_online === 1}"></view>
              <view class="text">{{ banzhu.is_online === 1 ? '在线': '离线'}}</view>
              <image src="../../static/images/下拉@2x.png"></image>
            </view>
            <view class="status-list" v-show="isShow">
              <!-- <view class="item active">
                <view class="circle"></view>
                <view class="text">在线</view>
                <image src="../../static/images/下拉@2x.png"></image>
              </view> -->
              <view class="item" @tap="changeStatus">
                <view class="circle" :class="{active: banzhu.is_online === 0}"></view>
                <view class="text">{{ banzhu.is_online === 0 ? '在线': '离线'}}</view>
                <image style="opacity: 0;" src="../../static/images/下拉@2x.png"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="inner">
        <navigator
          class="box"
          url="/pages/means3/means3?type=djd_1&istype=banzhu"
        >
          <view class="title">
            超过1小时未鉴定
          </view>
          <view class="info">
            <image :src="qiniuUrl + '组24@2x.png'"></image>
            <text class="number">{{ djd_1 }}</text>
            <text class="text"></text>
            <image class="arrow" :src="qiniuUrl + '矩形1187@2x.png'"></image>
          </view>
        </navigator>
        <navigator
          class="box"
          url="/pages/means3/means3?type=djd_6&istype=banzhu"
        >
          <view class="title">
            超过6小时未鉴定
          </view>
          <view class="info">
            <image :src="qiniuUrl + '组24拷贝@2x.png'"></image>
            <text class="number">{{ djd_6 }}</text>
            <text class="text"></text>
            <image class="arrow" :src="qiniuUrl + '矩形1187@2x.png'"></image>
          </view>
        </navigator>
        <navigator class="box" url="/pages/means3/means3?type=wt&istype=banzhu">
          <view class="title">
            问题商品
          </view>
          <view class="info">
            <image :src="qiniuUrl + '组242@2x.png'"></image>
            <text class="number">{{ wt }}</text>
            <text class="text"></text>
            <image class="arrow" :src="qiniuUrl + '矩形1187@2x.png'"></image>
          </view>
        </navigator>
        <navigator
          class="box"
          url="/pages/means3/means3?type=all&istype=banzhu"
        >
          <view class="title">
            全部鉴定
          </view>
          <view class="info">
            <image :src="qiniuUrl + '/组24@2x.png'" mode=""></image>
            <text class="number">{{ all }}</text>
            <text class="text"></text>
            <image class="arrow" :src="qiniuUrl + '矩形1187@2x.png'"></image>
          </view>
        </navigator>
      </view>
    </view>
    <view class="modal">
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl + '全部鉴定@2x.png'"></image>
          <view class="text">全部鉴定</view>
        </view>
        <image class="arrow" :src="qiniuUrl + '矩形1@2x.png'"></image>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl + '全部鉴定@2x.png'"></image>
          <view class="text">失误记录</view>
        </view>
        <image class="arrow" :src="qiniuUrl + '矩形1@2x.png'"></image>
      </view>
    </view>
    <view class="modal">
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl + '/组26@2x.png'"></image>
          <view class="text">学习资料</view>
        </view>
        <image class="arrow" :src="qiniuUrl + '矩形1@2x.png'"></image>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl + '/组29@2x.png'"></image>
          <view class="text">考核管理</view>
        </view>
        <image class="arrow" :src="qiniuUrl + '矩形1@2x.png'"></image>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl + '/组28@2x.png'"></image>
          <view class="text">提现管理</view>
        </view>
        <image class="arrow" :src="qiniuUrl + '矩形1@2x.png'"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { banzhu_appraise_num, banzhu_appraise, changeOnline } from "../../api/moderator";
import { appraiserDetail } from "../../api/publicationappraisal";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
  data() {
    return {
      all: 9,
      djd_1: 0,
      djd_6: 2,
      wt: 0,
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      istype: "",
      banzhu: {},
      isShow: false
    };
  },
  onLoad(options) {
    const { istype } = options;
    this.istype = istype;
    this.getData();
    const userinfo = uni.getStorageSync("user_info");
    appraiserDetail({
      id: userinfo.id
    }).then(result => {
      const obj = {};
      const keys = Object.keys(result.data);
      keys.forEach(key => {
        if (/[0-9]/gi.test(key)) {
          let avatar = "";
          if (/avatar_/gi.test(result.data[key].avatar)) {
            avatar = config[NODE_ENV].imgUrl + result.data[key].avatar;
          } else {
            avatar = this.imgUrl + result.data[key].avatar;
          }
          obj['avatar'] = avatar;
          obj['level_name'] = result.data[key].last_level_name;
          obj['name'] = result.data[key].name;
          obj['is_online'] = result.data[key].is_online;
        }
      });
      this.banzhu = obj;
    });
  },
  onPullDownRefresh() {
    this.getData();
    const userinfo = uni.getStorageSync("user_info");
    appraiserDetail({
      id: userinfo.id
    }).then(result => {
      const obj = {};
      const keys = Object.keys(result.data);
      keys.forEach(key => {
        if (/[0-9]/gi.test(key)) {
          let avatar = "";
          if (/avatar_/gi.test(result.data[key].avatar)) {
            avatar = config[NODE_ENV].imgUrl + result.data[key].avatar;
          } else {
            avatar = this.imgUrl + result.data[key].avatar;
          }
          obj['avatar'] = avatar;
          obj['level_name'] = result.data[key].last_level_name;
          obj['name'] = result.data[key].name;
          obj['is_online'] = result.data[key].is_online;
        }
      });
      this.banzhu = obj;
    });
  },
  methods: {
    showStatus() {
      this.isShow = true;
    },
    changeStatus() {
      uni.showLoading({
        title: '加载中...',
        icon: 'none',
        mask: true
      });
      this.isShow = false;
      if (this.banzhu.is_online === 1) {
        this.banzhu.is_online = 0;
      } else {
        this.banzhu.is_online = 1;
      }
      changeOnline({
        is_online: this.banzhu.is_online
      }).then(result => {
        const {message} = result.data;
        uni.showToast({
          title: message,
          icon: 'none'
        });
      });
    },
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
      uni.showLoading({
        title: "加载中...",
        icon: "none"
      });
      banzhu_appraise_num().then(result => {
        const { data } = result.data;
        const { all, djd_1, djd_6, wt } = data;
        this.all = all;
        this.djd_1 = djd_1;
        this.djd_6 = djd_6;
        this.wt = wt;
        uni.hideLoading();
        uni.stopPullDownRefresh();
      });
    }
  }
};
</script>

<style lang="scss">
.lists {
  width: 678rpx;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.list {
  position: relative;
  width: 690rpx;
  height: 116rpx;
  margin-bottom: 24rpx;
  background-color: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
  border-radius: 16rpx;
  display: flex;
  padding: 30rpx;

  .icon {
    width: 32rpx;
    height: 30rpx;
    position: absolute;
    left: 0;
    top: 0;
  }

  .avatar {
    width: 70rpx;
    height: 70rpx;
    border-radius: 70rpx;
    margin-right: 16rpx;
  }

  .nickname {
    font-size: 24rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .level {
    display: flex;
    align-items: center;
    margin-top: 6rpx;

    image {
      width: 26rpx;
      height: 26rpx;
    }
    .level-name {
      font-size: 24rpx;
      color: #898989;
      margin-left: 6rpx;
    }
  }
}

.status {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .online {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  position: relative;

  .circle {
    &.active {
      background-color: #88ef39;
    }
  }
  .circle {
    width: 20rpx;
    height: 20rpx;
    border-radius: 20rpx;
    background-color: #cdcdcd;
    margin-right: 10rpx;
  }

  image {
    width: 16rpx;
    height: 10rpx;
    margin-left: 10rpx;
  }

  .status-list {
    position: absolute;
    top: 44rpx;
    right: 0;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
  }
}

.jd {
  background-size: cover;
  padding: 40rpx 0;

  navigator {
    box-sizing: border-box;
  }

  .inner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 690rpx;
    margin: 0 auto;
  }

  .box {
    width: 330rpx;
    height: 176rpx;
    background-color: #ffffff;
    padding: 30rpx;
    border-radius: 16rpx;
    margin-bottom: 30rpx;
  }

  .title {
    font-size: 28rpx;
    color: #898989;
    padding-bottom: 16rpx;
  }

  .info {
    position: relative;
    display: flex;
    align-items: center;

    image {
      width: 70rpx;
      height: 70rpx;
    }

    .arrow {
      width: 12rpx;
      height: 19rpx;
      position: absolute;
      right: 0;
      top: 0;
    }

    .number {
      font-family: PingFang-SC-Regular;
      font-size: 50rpx;
      color: #8b8b8b;
      margin-left: 18rpx;
    }

    .text {
      font-size: 50rpx;
      color: #000;
      margin-left: 16rpx;
    }
  }
}

.modal {
  display: none;
  width: 690rpx;
  background-color: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
  border-radius: 16rpx;
  margin: 20rpx auto;

  image {
    margin-right: 20rpx;
  }

  .box {
    width: 630rpx;
    margin: 0 auto;
    display: flex;
    align-content: center;
    justify-content: space-between;
    position: relative;
    padding: 32rpx 0;
  }

  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 1rpx;
    background-color: #f8f8f8;
    box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
    border-radius: 1rpx;
  }

  .left {
    display: flex;

    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .arrow {
    width: 13rpx;
    height: 21rpx;
  }
}
</style>
