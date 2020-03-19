<template>
  <view class="container">
    <view class="balance">
      <view class="mx" @tap="goto">
        明细 >
      </view>
      <view class="title">可提现余额(元)</view>
      <view class="number">{{appr_money}}</view>
      <view class="bottom">
        <view class="left">
          <view class="dj-number">{{appr_blocked_money}}</view>
          <view class="text">冻结余额(元)</view>
        </view>
        <view class="right">
          每月28号进行解冻
        </view>
      </view>
    </view>
    <view class="balance-wallet">
      <view class="inner">
        <view class="title">提现到我的钱包</view>
        <view class="price">
          <text>￥</text><input placeholder="0.00" :value="amount" name="price" id="price" @input="change" />
        </view>
        <view class="yue">
          <view>剩余金额￥{{surplus}}</view>
          <view @tap="all">全部提现</view>
        </view>
      </view>
    </view>
    <view class="btn" @tap="submit">
      确认提现
    </view>
  </view>
</template>

<script>
import {drawCashDetail, transfer} from '../../api/cashwithdrawal';

export default {
  name: "cashwithdrawal",
  data() {
    return {
      appr_blocked_money: "0.00",
      appr_money: "0.00",
      surplus: 0,
      amount: ''
    }
  },
  onLoad() {
    this.getData();
  },
  onPullDownRefresh() {
    this.amount = '';
    this.getData();
    uni.stopPullDownRefresh();
  },
  methods: {
    change(e) {
      this.amount = e.target.value;
    },
    goto() {
      uni.navigateTo({
        url: '/pages/detailed/detailed'
      });
    },
    all() {
      this.amount = this.surplus;
    },
    submit() {
      if (this.surplus <= 0) {
        uni.showToast({
          title: '您当前无可提现余额',
          icon: 'none',
          mask: true
        });
        return;
      }
      if (this.amount === '') {
        uni.showToast({
          title: '请输入提现金额',
          icon: 'none',
          mask: true
        });
        return;
      }
      if (this.amount < 0.3) {
        uni.showToast({
          title: '提现金额必须大于0.3元',
          icon: 'none',
          mask: true
        });
        return;
      }
      uni.showLoading({
        title: '提现中...',
        icon: 'none',
        mask: true
      });
      transfer({
        openid: uni.getStorageSync('openid'),
        amount: this.amount
      }).then(result => {
        uni.hideLoading();
        const {message, status} = result.data;
        if (status === 200) {
          uni.showToast({
            title: '提现成功',
            icon: 'none',
            mask: true
          });
          this.amount = '';
          setTimeout(() => {
            this.getData();
          }, 1000);
          return;
        }
        uni.showToast({
          title: '提现失败',
          icon: 'none',
          mask: true
        });
      });
    },
    getData() {
      uni.showLoading({
        title: '加载中...',
        icon: 'none',
        mask: true
      });
      drawCashDetail().then(result => {
        const {appr_blocked_money, appr_money} = result.data.data;
        this.appr_blocked_money = appr_blocked_money;
        this.appr_money = appr_money;
        this.surplus = appr_money - appr_blocked_money;
        uni.hideLoading();
      });
    }
  }
};
</script>

<style lang="scss">
.balance {
  width: 690rpx;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 6rpx 6rpx 0rpx 0rpx;
  margin: 22rpx auto 22rpx;
  .mx {
    font-size: 24rpx;
    padding-top: 34rpx;
    padding-right: 26rpx;
    text-align: right;
  }
  .title {
    text-align: center;
    margin-top: 18rpx;
    margin-bottom: 36rpx;
  }
  .number {
    text-align: center;
    font-size: 60rpx;
    color: #5e95f4;
    padding-bottom: 75rpx;
    border-bottom: solid 1rpx #eef1f4;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    height: 110rpx;
    .left,
    .right {
      text-align: center;
    }
    .left {
      flex: 0 0 260rpx;
      border-right: solid 1rpx #eef1f4;
    }
    .right {
      flex: 1;
      line-height: 110rpx;
      font-size: 26rpx;
      color: #858585;
    }
    .dj-number,
    .text {
      font-size: 26rpx;
    }
    .dj-number {
      margin-top: 18rpx;
      margin-bottom: 8rpx;
    }
  }
}
.balance-wallet {
  width: 690rpx;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 6rpx 6rpx 0rpx 0rpx;
  margin: 22rpx auto 22rpx;
  .inner {
    width: 630rpx;
    margin: 0 auto;
  }
  .title {
    height: 84rpx;
    line-height: 84rpx;
    border-bottom: solid 1rpx #eef1f4;
  }
  .price {
    height: 208rpx;
    display: flex;
    align-items: center;
    border-bottom: solid 1rpx #eef1f4;
    text {
      font-size: 30rpx;
      margin-top: 18rpx;
      margin-right: 18rpx;
    }
    input {
      font-size: 60rpx;
      color: #282828;
    }
  }
  .yue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 84rpx;
    view {
      font-size: 26rpx;
      &:nth-of-type(1) {
        color: #858585;
      }
      &:nth-of-type(2) {
        color: #5e95f4;
      }
    }
  }
}
.btn {
  width: 690rpx;
  height: 74rpx;
  line-height: 74rpx;
  text-align: center;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 68rpx;
  background-image: linear-gradient(
      -90deg,
      #5e95f4 0%,
      #3ba9f7 50%,
      #11c1fa 100%
    ),
    linear-gradient(#5e95f4, #5e95f4);
  background-blend-mode: normal, normal;
  border-radius: 6rpx;
  border: solid 1rpx rgba(1, 143, 231, 0.5);
  color: #ffffff;
}
</style>
