<template>
    <view class="level">
        <view class="title">
            <image class="level-img" src="../../static/images/level@2x.png"></image>
        </view>
        <view class="content">
            <view class="p">
                <image class="level-icon" src="../../static/images/level-icon@2x.png"></image>
                <view>会员通过累计使用次数，签到，分享获得经验</view>
            </view>
            <view class="p">
                <image class="level-icon" src="../../static/images/level-icon@2x.png"></image>
                <view>使用一次+50经验；签到+10经验；分享+10经验，每日最多分享两次</view>
            </view>
            <view class="p">
                <image class="level-icon" src="../../static/images/level-icon@2x.png"></image>
                <view>金卡经验  1000；钻卡经验  2000；黑卡经验  3000</view>
            </view>
            <view class="p">
                <image class="level-icon" src="../../static/images/level-icon@2x.png"></image>
                <view>费用标准：</view>
            </view>
            <view class="table">
                <image class="table-img" src="../../static/images/table@2x.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .level-img {
        width: 752rpx;
        height: 162rpx;
    }
    .content {
        padding-left: 30rpx;
        padding-right: 30rpx;
        margin-top: 50rpx;
        margin-bottom: 80rpx;
        .level-icon {
            width: 10rpx;
            height: 10rpx;
            margin-right: 16rpx;
            margin-top: 14rpx;
        }
        .p {
            padding-left: 8rpx;
            padding-right: 8rpx;
            margin-bottom: 32rpx;
            display: flex;
        }
        view {
            font-size: 26rpx;
            color: #000;
        }
        .table {
            margin-top: 24rpx;
            .table-img {
                width: 690rpx;
                height: 688rpx;
                margin: 0 auto;
            }
        }
    }
</style>