<template>
    <view class="waiting">
        <view class="user-waiting">
            <image class="user-img" src="../../static/images/图层968@2x.png"></image>
            <view class="text">用户等待中...</view>
        </view>
        <chat></chat>
    </view>
</template>

<script>
import config from "../../config/index";
const NODE_ENV = process.env.NODE_ENV;
import chat from '../../component/chat/chat.vue';

export default {
    data() {
        return {
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl
        }
    },
    components: {
        chat
    }
}
</script>

<style lang="scss" scoped>
    .waiting {
        background-color: #edf1f4;
        min-height: 100vh;
        overflow: hidden;
    }
    .user-waiting {
        width: 274rpx;
        height: 136rpx;
        margin: 60rpx auto;
        background-color: #ffffff;
        border-radius: 20rpx;
        position: relative;
    }
    .user-img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
        position: absolute;
        left: 0;
        right: 0;
        top: -40rpx;
        margin: auto;
        background-color: #000000;
        border: solid 4rpx #ffffff;
    }
    .text {
        text-align: center;
        padding-top: 68rpx;
        color: #000000;
    }
</style>