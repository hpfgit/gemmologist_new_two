<template>
    <view class="onlinechat">
        <view class="chat-content">
            <view class="chat-item">
                <view class="time">2020-03-16 15:45</view>
                <view class="content">
                    <view v-for="(item, index) in content" :key="index" :class="{'appr-cont': item.source === 'appr', 'user-cont': item.source === 'user', active: isLong}" @longpress="selectCont(index)">
                        <view class="img-box" v-if="item.source === 'user'">
                            <image class="select-img" @tap="selectText(index)" :style="{display: item.selected ? 'block' : 'none'}" :src="qiniuUrl+'勾选@2x.png'"></image>
                            <image class="select-img" @tap="selectText(index)" :style="{display: item.selected ? 'none' : 'block'}" :src="qiniuUrl+'未勾选@2x.png'"></image>
                        </view>
                        <view class="text">{{item.text}}</view>
                        <view class="img-box">
                            <image class="user-img" :src="item.head"></image>
                        </view>
                        <view class="img-box" v-if="item.source === 'appr'">
                            <image class="select-img" @tap="selectText(index)" :style="{display: item.selected ? 'block' : 'none'}" :src="qiniuUrl+'勾选@2x.png'"></image>
                            <image class="select-img" @tap="selectText(index)" :style="{display: item.selected ? 'none' : 'block'}" :src="qiniuUrl+'未勾选@2x.png'"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="appraisal-result">
            <view class="result-item">
                <view class="img-box">
                    <image :src="qiniuUrl+'真灰色@2x.png'"></image>
                </view>
                <view class="text">鉴定为真</view>
            </view>
            <view class="result-item">
                <view class="img-box">
                    <image :src="qiniuUrl+'假灰色@2x.png'"></image>
                </view>
                <view class="text">鉴定为假</view>
            </view>
            <view class="result-item">
                <view class="img-box">
                    <image :src="qiniuUrl+'无法灰色@2x.png'"></image>
                </view>
                <view class="text">无法鉴定</view>
            </view>
            <view class="result-item">
                <view class="img-box">
                    <image :src="qiniuUrl+'生成报告@2x.png'"></image>
                </view>
                <view class="text">生成报告</view>
            </view>
        </view>
        <chat @sendMessage="sendMessage"></chat>
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
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            currIndex: '',
            isLong: false,
            content: [
                {
                    type: 'text',
                    text: '赶紧的，图片发来',
                    head: '../../static/images/图层968@2x.png',
                    source: 'appr',
                    selected: false
                },
                {
                    type: 'text',
                    text: '我去你妈的',
                    head: '../../static/images/图层968@2x.png',
                    source: 'user',
                    selected: false
                }
            ]
        }
    },
    onLoad() {
        // uni.connectSocket({
        //     url: "wss://106.13.179.65:8080/",
        //     success(result) {
        //         console.log(result);
        //     }
        // });
    },
    methods: {
        selectText(index) {
            this.content[index].selected = !this.content[index].selected;
        },
        selectCont(index) {
            this.currIndex = index;
            this.isLong = true;
            console.log(123);
        },
        sendMessage(msg) {
            // console.log(msg);
        }
    },
    components: {
        chat
    }
}
</script>

<style lang="scss" scoped>
    .onlinechat {
        background-color: #edf1f4;
        padding-left: 16rpx;
        padding-right: 16rpx;
        min-height: 100vh;
    }
    // .chat-content {

    // }
    .chat-item {
        overflow: hidden;
    }
    .time {
        text-align: center;
        color: #898989;
        margin-bottom: 38rpx;
        margin-top: 38rpx;
    }
    // .content {

    // }
    .select-img {
        width: 36rpx;
        height: 36rpx;
    }
    .appr-cont, .user-cont {
        display: flex;
        align-items: center;
        margin-bottom: 28rpx;

        .user-img {
            width: 82rpx;
            height: 82rpx;
            border-radius: 82rpx;
        }

        .text {
            display: inline-block;
            height: 82rpx;
            line-height: 82rpx;
            text-align: center;
            border-radius: 20rpx;
            padding-left: 22rpx;
            padding-right: 22rpx;
        }
        .select-img {
            width: 0;
            transition: all .1s;
        }
        
        &.active {
            .select-img {
                width: 36rpx;
            }
        }
    }
    .appr-cont {
        justify-content: flex-end;

        .text {
            background-color: #37374b;
            color: #ffffff;
        }
        .user-img, .text {
            margin-right: 14rpx;   
        }
    }
    .user-cont {
        justify-content: flex-start;

        .text {
            background-color: #ffffff;
            color: #000;
        }
        .user-img, .text {
            margin-left: 14rpx;
        }
    }
    .appraisal-result {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 750rpx;
        // height: 206rpx;
        height: 0;
        overflow: hidden;
        background-color: #ffffff;
        text-align: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 4;
    }
    .result-item {
        image {
            width: 104rpx;
            height: 104rpx;
        }
        .text {
            color: #666;
            font-size: 22rpx;
            margin-top: 10rpx;
        }
    }
</style>