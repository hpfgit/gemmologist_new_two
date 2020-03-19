<template>
    <view class="chat">
        <view class="input" :class="{active: isOther}">
            <input type="text" placeholder="输入聊天内容">
            <image class="other-img" :src="qiniuUrl+'加号2@2x.png'" @tap="other"></image>
        </view>
        <view class="uploadfile" :class="{active: isOther}">
            <image class="upload-img" :src="qiniuUrl+'上传图片@2x.png'"></image>
            <view class="font">上传图片</view>
        </view>
    </view>
</template>

<script>
import config from "../../config/index";
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            isOther: false
        }
    },
    methods: {
        other() {
            this.isOther = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .input {
        width: 750rpx;
        height: 110rpx;
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .1s;

        input {
            width: 610rpx;
            height: 74rpx;
            background-color: #f8f8f8;
            border-radius: 37rpx;
            margin-right: 26rpx;
            padding-left: 26rpx;
        }

        &.active {
            bottom: 288rpx;
        }
    }
    .uploadfile {
        width: 750rpx;
        height: 288rpx;
        position: fixed;
        bottom: -288rpx;
        left: 0;
        z-index: 2;
        background-color: #ffffff;
        border-top: 2rpx solid #edf1f4;
        padding-top: 40rpx;
        transition: all .1s;

        &.active {
            bottom: 0;
        }
    }
    .other-img {
        width: 50rpx;
        height: 50rpx;
    }
    .upload-img {
        width: 104rpx;
        height: 104rpx;
        display: block;
        margin: 0 auto;
    }
    .font {
        font-size: 22rpx;
        color: #666666;
        text-align: center;
        margin-top: 10rpx;
    }
</style>