<template>
    <view class="chat">
        <view class="input" :class="{active: isOther}" @keyup.enter="sendMsg">
            <input type="text" placeholder="输入聊天内容" @input="getMsg($event)" :value="msg" :class="{active: isInput}">
            <image class="other-img" :src="qiniuUrl+'加号2@2x.png'" @tap="other"></image>
            <view class="sengMsg" @tap="sendMsg" :class="{active: isInput}">发送</view>
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
            isOther: false,
            isInput: false,
            msg: ''
        }
    },
    methods: {
        other() {
            this.isOther = !this.isOther;
        },
        getMsg(e) {
            const msg = e.target.value;
            this.msg = msg;
            this.isInput = true;
            if (msg === '') {
                this.isInput = false;
            }
            console.log(msg);
            // this.$emit('sendMessage', msg);
        },
        sendMsg() {
            this.msg = '';
            console.log('发送消息');
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
        justify-content: space-between;
        align-items: center;
        transition: all .1s;

        input {
            width: 610rpx;
            height: 74rpx;
            background-color: #f8f8f8;
            border-radius: 37rpx;
            margin-right: 26rpx;
            padding-left: 26rpx;
            margin-left: 28rpx;
            transition: all .1s;
            
            &.active {
                width: 560rpx;
            }
        }

        &.active {
            bottom: 288rpx;
        }
    }
    .sengMsg {
        width: 0;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        color: #ffffff;
        border-radius: 6rpx;
        font-size: 24rpx;
        position: absolute;
        right: 28rpx;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: #08c061;
        opacity: 0;
        transition: all .1s;

        &.active {
            width: 80rpx;
            opacity: 1;
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
        margin-right: 28rpx;
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