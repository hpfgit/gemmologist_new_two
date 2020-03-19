<template>
  <view class="container">
    <scroll-view>
      <view class="box-new">
        <div class="top">
          <view class="logo">
            <image class="logo-img" src="../../static/images/鉴定2@2x.png"></image>
            <view class="text">BAN鉴定服务</view>
          </view>
          <view class="question">
            鉴定流程及常见问题
          </view>
        </div>
        <view class="info">
          <image class="chah" src="../../static/images/辛普森拷贝4@2x.png"></image>
          <view class="text"><image src="../../static/images/椭圆1402@2x.png"></image>已鉴定 <text class="number">12368</text> 次</view>
          <view class="text text2"><image src="../../static/images/椭圆1402@2x.png"></image>假货市场占有率 <text class="number">9.38</text> %</view>
          <view class="nail">
            <image class="security-img" src="../../static/images/安全@2x.png"></image>
            <view class="text">鉴定团队</view>
            <image class="arrow-img" src="../../static/images/矩形1187拷贝4@2x.png"></image>
          </view>
          <view class="class-list">
            <view class="list">
              <view class="ellipse">
                <div class="inner"></div>
              </view>
              <view class="text3">鉴定师考核模式</view>
            </view>
            <view class="list">
              <view class="ellipse">
                <div class="inner"></div>
              </view>
              <view class="text3">专业鉴定声明</view>
            </view>
            <view class="list">
              <view class="ellipse">
                <div class="inner"></div>
              </view>
              <view class="text3">保价鉴定声明</view>
            </view>
          </view>
        </view>
      </view>
      <view class="zm">
        <view class="gn">
          <view @tap="goTo(0, 'qx')">专业鉴定</view>
          <view @tap="goTo(1, 'fz')">保价鉴定</view>
        </view>
        <view class="search">查询鉴定</view>
      </view>
      <view class="lists" v-if="lists.length">
        <view class="item" v-for="(item, index) in lists" :key="index">
          <!-- <image v-if="item.is_specialty" class="specialty-img" src="../../static/images/费用信息@2x.png" @tap="priceDetails(index)"></image> -->
          <image
            class="left-image"
            :src="getPath(item.cover_image)"
            @tap="goToDetail(item.is_specialty, item.id)"
          ></image>
          <view class="item-right" @tap="goToDetail(item.is_specialty, item.id)">
            <view class="top">
              <text>{{item.brand_name}}</text>
              <!-- <view>
                <image :src="qiniuUrl+'/时间(3)@2x.png'"></image>
                <text class="date">{{item.publish_at}}</text>
              </view> -->
            </view>
            <view class="center">
              <view>{{item.appr_sn}}</view>
              <view>{{item.status}}</view>
            </view>
            <view class="bottom">
              <!-- <view v-if="item.post_status === 13">
                免费鉴定结果仅供参考, 如有疑问请进行
                <text class="zy" @tap="goTo(1)">专业鉴定</text>
              </view>
              <view v-if="item.post_status !== 13">
                {{item.hint}}
              </view> -->
            </view>
          </view>
        </view>
        <!-- 费用详情 -->
        <view class="price-detail" v-show="isShow">
          <view class="title">费用详情</view>
          <view class="price-box">
            <image class="close-img" @tap="closeDetails" src="../../static/images/price/关闭@2x.png"></image>
            <view class="price">
              <image src="../../static/images/price/01@2x.png"></image>
              <view class="img-number-container">
                <view class="number">{{details.appraisal_cost}}</view>
                <view class="yuan">元</view>
              </view>
            </view>
            <view class="total">
              <image src="../../static/images/price/02@2x.png"></image>
              <view class="img-number-container">
                <view class="number">{{details.total}}</view>
                <view class="yuan">元</view>
              </view>
            </view>
            <view class="price">
              <image src="../../static/images/price/03@2x.png"></image>
              <view class="img-number-container">
                <view class="number">{{details.appr_cost}}</view>
                <view class="yuan">元</view>
              </view>
            </view>
          </view>
          <view class="tip">*无法鉴定情况下费用会退还至账户余额，可随时提现。</view>
        </view>
      </view>
      <view class="mask" v-show="isShow"></view>
    </scroll-view>
  </view>
</template>

<script>
import { getCount, getPost, isAppraiser } from "../../api";
import config from '../../config/index';
const NODE_ENV = process.env.NODE_ENV;

export default {
  data() {
    return {
      count: "",
      fail: "",
      lists: [],
      imgUrl: config[NODE_ENV].imgUrl,
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      isAppraiser: '',
      isShow: false,
      details: {}
    };
  },
  onLoad() {
    if (!uni.getStorageSync('token')) {
      uni.redirectTo({
        url: '/pages/index/index'
      });
      return;
    }
    uni.showLoading();
    getCount().then(result => {
      const { count, fail } = result.data;
      this.count = count;
      this.fail = fail;
    });

    isAppraiser().then(result => {
      const {is_appraiser} = result.data;
      this.isAppraiser = is_appraiser;
    });

    getPost({
      page: 1,
      limit: 12
    }).then(result => {
      const { data } = result.data;
      data.forEach(item => {
        item.total = item.appr_cost + item.appraisal_cost;
        item.isShow = false;
        // item.total = (item.total).toString().split('');
      //   const appr_cost_arr = (item.appr_cost).toString().split('');
      //   const appraisal_cost_arr = (item.appraisal_cost).toString().split('');
      //   item.appr_cost = appr_cost_arr;
      //   item.appraisal_cost = appraisal_cost_arr;
      //   const arr = [];
      //   item.appr_cost.forEach(ite => {
      //     const obj = {
      //       number: ite
      //     };
      //     arr.push(obj);
      //   });
      //   item.appr_cost = arr;
      //   const arr2 = [];
      //   item.appraisal_cost.forEach(itm => {
      //     const obj = {
      //       number: itm
      //     };
      //     arr2.push(obj);
      //   });
      //   item.appraisal_cost = arr2;
      //   const arr3 = [];
      //   item.total.forEach(iem => {
      //     const obj = {
      //       number: iem
      //     };
      //     arr3.push(obj);
      //   });
        // item.total = arr3;
      });
      this.lists = data;
      uni.hideLoading();
    });
  },
  methods: {
    gemmologist() {
      uni.navigateTo({
        url: '/pages/gemmologist/gemmologist'
      });
    },
    priceDetails(index) {
      this.isShow = !this.isShow;
      this.details = this.lists[index];
    },
    closeDetails() {
      this.isShow = !this.isShow;
    },
    goToQuestion() {
      uni.navigateTo({
        url: '/pages/questions/questions'
      });
    },
    goToRZ() {
      // uni.navigateTo({
      //   url: '/pages/identificationarea/identificationarea'
      // });
    },
    getPath(path) {
      return this.imgUrl + path;
    },
    changeId(e) {
      this.jdID = e.target.value;
    },
    searchTo() {
      if (!this.jdID) {
        uni.showToast({
          title: '请输入六位鉴定id',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: '/pages/Identificationdetails/Identificationdetails?id='+this.jdID
      })
    },
    goTo(index, type) {
      if (index === 2) {
        uni.navigateTo({
          url: "/pages/gemmologist/gemmologist"
        });
        return;
      }
      uni.navigateTo({
        url: "/pages/equipmentappraisal2/equipmentappraisal2?type=" + type
      });
    },
    goToDetail(index, id) {
      uni.navigateTo({
        url: "/pages/Identificationdetails/Identificationdetails?id="+id + "&type=" + index
      });
    }
  }
};
</script>

<style lang="scss">
.box-new {
  padding: 24rpx 30rpx;
  background-image: url('../../static/images/矩形1@2x.png');
  background-size: cover;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    width: 344rpx;
    height: 82rpx;
    background-color: #ffd100;
    border-radius: 12rpx 50rpx 0rpx 0rpx;
    display: flex;
    align-items: center;
    overflow: hidden;

    .logo-img {
      width: 70rpx;
	    height: 70rpx;
      margin-left: 6rpx;
    }

    .text {
      font-size: 36rpx;
      font-weight: bold;
      color: #000000;
      margin-left: 20rpx;
    }
  }

  .question {
    width: 256rpx;
    height: 48rpx;
    line-height: 48rpx;
    background-color: #ffffff;
    border-radius: 24rpx;
    font-size: 22rpx;
    color: #4a27ac;
    text-align: center;
  }

  .info {
    width: 690rpx;
    margin: 16rpx auto 0;
    background-color: #ffffff;
    border-radius: 0rpx 40rpx 40rpx 40rpx;
    padding-bottom: 30rpx;
    position: relative;

    .chah {
      width: 277rpx;
      height: 315rpx;
      position: absolute;
      right: 0;
      top: -24rpx;
      z-index: 9;
    }

    .text,.number {
      color: #4a27ac;
      image {
        width: 22rpx;
        height: 22rpx;
        margin-right: 16rpx;
      }
    }
    
    .text,.text2 {
      display: flex;
      align-items: center;
    }

    .text {
      padding-top: 62rpx;
      margin-left: 28rpx;

      &.text2 {
        padding-top: 0;
      }
    }

    .number {
      margin-left: 10rpx;
      margin-right: 10rpx;
      font-size: 40rpx;
    }

    .nail {
      width: 204rpx;
	    height: 62rpx;
      background-color: #ffd100;
      border-radius: 10rpx 20rpx 0rpx 0rpx;
      border: solid 4rpx #441ea8;
      border-bottom: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 24rpx;
      margin-top: 48rpx;

      .text {
        margin-left: 10rpx;
        font-size: 26rpx;
        color: #4623ab;
        padding-top: 0;
      }

      .security-img {
        width: 24rpx;
        height: 28rpx;
      }

      .arrow-img {
        width: 7rpx;
        height: 12rpx;
        margin-left: 10rpx;
      }

      &.nail2 {
        width: 239rpx;
        height: 40rpx;
        background-image: url('../../static/images/圆角矩形1183拷贝2@2x.png');
        border-radius: 20rpx 0rpx 0rpx 20rpx;
        // top: 117rpx;

        .text {
          font-size: 20rpx;
          color: #ffffff;
          margin-left: 22rpx;
        }
      }
    }
  }
}
.class-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 630rpx;
	height: 86rpx;
	background-color: #ffffff;
	border-radius: 0rpx 19rpx 20rpx 20rpx;
	border: solid 4rpx #441ea8;
  margin-left: 24rpx;

  .list {
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-of-type(1) {
      .ellipse {
        .inner {
          top: 0;
        }
      }
    }

    &:nth-of-type(2) {
      .ellipse {
        .inner {
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }

    &:nth-of-type(3) {
      .ellipse {
        .inner {
          bottom: 0;
        }
      }
    }

    .ellipse {
      width: 8rpx;
      height: 24rpx;
      background-color: #ebebff;
      border-radius: 4rpx;
      margin-right: 5rpx;
      position: relative;

      .text3 {
        font-size: 26rpx;
        color: #4a27ac;
      }

      .inner {
        width: 8rpx;
        height: 8rpx;
        background-color: #4724ab;
        border-radius: 4rpx;
        position: absolute;
        left: 0;
      }
    }
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 997;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.box {
  position: relative;
  display: none;
}

.bg {
  image {
    width: 750rpx;
    height: 700rpx;
  }
}

.data-display {
  position: absolute;
  left: 0;
  right: 0;
  margin: -170rpx auto 0;
  width: 726rpx;
  padding-left: 62rpx;
  padding-top: 52rpx;
  z-index: 2;

  .data-bg {
    width: 726rpx;
    height: 264rpx;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }

  .data-display-one {
    position: relative;
    z-index: 1;

    image {
      width: 22rpx;
      height: 24rpx;
      margin-right: 16rpx;
    }

    .number {
      font-size: 36rpx;
      color: #5e95f4;
      font-weight: bold;
    }

    &:nth-of-type(2) {
      margin-top: 20rpx;

      .number {
        color: #282828;
      }
    }
  }

  .data-display-two {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
    font-size: 24rpx;
    color: #5e95f4;
    margin-top: 10rpx;
    text-align: right;
    padding-right: 76rpx;

    image {
      width: 10rpx;
      height: 18rpx;
      margin-left: 16rpx;
    }

    view {
      color: #5e95f4;
    }
  }
}

.zm {
  position: relative;
  // left: 0;
  // right: 0;
  width: 750rpx;
  margin: 40rpx auto 0;
  z-index: 1;

  image {
    width: 750rpx;
    height: 426rpx;
  }

  .is_appraiser {
    height: 300rpx;
  }

  .gn {
    display: flex;
    justify-content: space-around;

    view {
      width: 300rpx;
      height: 86rpx;
      text-align: center;
      line-height: 86rpx;
      color: #ffffff;
      background-image: linear-gradient(-90deg, 
        #5e95f4 0%, 
        #11bbfa 100%), 
      linear-gradient(
        #7283ed, 
        #7283ed);
      background-blend-mode: normal, 
        normal;
      border-radius: 43rpx;
    }
  }

  .search {
    width: 630rpx;
    height: 86rpx;
    margin: 0 auto;
    line-height: 86rpx;
    text-align: center;
    color: #5d96f4;
    background-color: #ffffff;
    box-shadow: 0rpx 0rpx 16rpx 0rpx 
      rgba(35, 45, 171, 0.5);
    border-radius: 43rpx;
    border: solid 2rpx #5d96f4;
  }

  .jds {
    image {
      width: 348rpx;
      height: 97rpx;
    }
  }
}

.lists {
  margin-top: 24rpx;
  padding-bottom: 24rpx;

  .item {
    display: flex;
    width: 690rpx;
    margin: 20rpx auto;
    padding: 20rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 0rpx 16rpx 0rpx 
      rgba(34, 32, 41, 0.1);
    border-radius: 10rpx;
    position: relative;
  }

  .specialty-img {
    width: 44rpx;
    height: 74rpx;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 997;
    margin: auto;
  }

  .left-image {
    width: 144rpx;
    height: 144rpx;
    border-radius: 10rpx;
  }

  .item-right {
    margin-left: 24rpx;
    flex: 1;

    .top {
      display: flex;
      justify-content: space-between;

      text {        
        color: #000000;
      }
      
      .date {
        color: #858585;
      }

      image {
        width: 22rpx;
        height: 22rpx;
        vertical-align: top;
        margin-top: 9rpx;
        margin-right: 10rpx;
      }
    }

    .center {
      margin-top: 6rpx;
      display: flex;
      justify-content: space-between;

      view {
        font-size: 22rpx;
        background-color: #e6dcb5;
        border-radius: 5rpx;

        &:nth-of-type(1) {
          width: 102rpx;
          height: 30rpx;
          line-height: 30rpx;
          text-align: center;
          background-image: url('../../static/images/组10@2x.png');
          background-size: cover;
        }

        &:nth-of-type(2) {
          width: 100rpx;
          height: 32rpx;
          line-height: 32rpx;
          text-align: center;
          color: #ffffff;
          background-image: linear-gradient(135deg, 
            rgba(28, 211, 249, 0.5) 0%, 
            rgba(61, 180, 247, 0.5) 39%, 
            rgba(94, 149, 244, 0.5) 100%), 
          linear-gradient(
            #5e95f4, 
            #5e95f4);
          background-blend-mode: normal, 
            normal;
          border-radius: 14rpx 14rpx 14rpx 0rpx;
          border: solid 2rpx #50b8f7;
        }
      }
    }

    .bottom {
      margin-top: 14rpx;

      text,view {
        font-size: 22rpx;
        color: #282828;
      }

      .zy {
        color: #5e95f4;
      }
    }
  }
}

.price-detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 650rpx;
	height: 510rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
  z-index: 999;
  margin: auto;
  overflow: hidden;

  .close-img {
    position: absolute;
    right: 0;
    top: 0;
    width: 70rpx;
    height: 70rpx;
    z-index: 1000;
    background-color: rgba(0,0,0,.2);
    border-radius: 70rpx;
  }

  .title {
    position: absolute;
    top: 30rpx;
    width: 100%;
    text-align: center;
  }
  
  .price-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: flex;

    .total {
      margin-top: 40rpx;
      image {
        width: 206rpx;
        height: 386rpx;  
      }

      .img-number-container {
        position: absolute;
        top: 198rpx;
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .number {
        font-size: 60rpx;
      }

      .yuan {
        font-size: 24rpx;
        padding-top: 36rpx;
        margin-left: 10rpx;
      }

      .yuan,.number {
        color: #ffffff;
      }
    }

    .price,.total {
      position: relative;
      
      .img-0,.img-2,.img-4,.img-8 {
        width: 34rpx;
        height: 40rpx;
      }
      .img-1 {
        width: 24rpx;
        height: 40rpx;
      }
      .img-3 {
        width: 41rpx;
        height: 40rpx;
      }
      .img-5 {
        width: 35rpx;
        height: 40rpx;
      }
      .img-6 {
        width: 32rpx;
        height: 40rpx;
      }
      .img-7 {
        width: 30rpx;
        height: 40rpx;
      }
      .img-9 {
        width: 30rpx;
        height: 40rpx;
      }
    }

    .price {
      margin-top: 108rpx;
      image {
        width: 206rpx;
        height: 238rpx;
      }

      .img-number-container {
        position: absolute;
        top: 128rpx;
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .number {
        font-size: 60rpx;
      }

      .yuan {
        font-size: 24rpx;
        padding-top: 36rpx;
        margin-left: 10rpx;
      }

      .yuan,.number {
        color: #30c8ff;
      }
    }
  }
  .tip {
    position: absolute;
    bottom: 40rpx;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    font-size: 22rpx;
    color: #4d4d4d;
  }
}
</style>
