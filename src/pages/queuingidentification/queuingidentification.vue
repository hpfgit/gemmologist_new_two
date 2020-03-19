<template>
    <view class="container">
        <view class="userinfo">
            <image class="bg" :src="qiniuUrl+'/bg@2x.png'"></image>
            <view class="user">
                <image class="hj" :src="qiniuUrl+'/火箭拷贝@2x.png'"></image>
                <image class="bg2" :src="qiniuUrl+'/鉴定bg1@2x.png'"></image>
                <view class="head">
                    <view class="head-img"></view>
                </view>
                <view class="info">
                    <view class="name">Air Jordan</view>
                    <view class="number">
                        <view class="id">
                            鉴定ID
                        </view>
                        <view class="text">268672</view>
                    </view>
                </view>
                <view class="pdz">
                    排队中
                </view>
            </view>
        </view>
        <view class="jd-pro">
            <view class="title">
                <view>当前级别：</view>
                <view>常速鉴定</view>
            </view>
            <view class="classif">
                <view>常速</view>
                <view>快速</view>
                <view>高速</view>
                <view>极速</view>
                <view>光速</view>
                <view>VIP</view>
            </view>
            <view class="progress">
                <view class="inner"></view>
            </view>
            <view class="jsb">
                <view class="number">
                    <image class="img" :src="qiniuUrl+'/加速包@2x.png'"></image>
                    <view class="num">12</view>
                    <view class="text">加速包</view>
                </view>
                <view class="cart">
                    <view class="num">￥1x</view>
                    <view class="add">+</view>
                    <view class="total">123</view>
                    <view class="red">-</view>
                </view>
            </view>
            <view class="btn">
                立即加速
            </view>
        </view>
        <view class="weixin">
            <view class="left">
                <image class="weixin-img" :src="qiniuUrl+'/微信@2x.png'"></image>
                <view class="text">建议开启微信通知，鉴定结果随时知晓</view>
            </view>
            <image class="right-img" :src="qiniuUrl+'/向右(4)@2x.png'"></image>
        </view>
        <view class="duanxin">
            <view class="left">
                <image class="duanxin-img" :src="qiniuUrl+'/短信@2x.png'"></image>
                <view class="text">建议开启短信通知，第一时间接收鉴定结果</view>
            </view>
            <image class="open-img" v-if="!openMsg" :src="qiniuUrl+'/关闭@2x.png'"></image>
            <image class="open-img" v-if="openMsg" :src="qiniuUrl+'/开启@2x.png'"></image>
        </view>
        <view class="tip">
            <view class="title">
                <view class="line"></view>
                <view class="text">鉴定耗时说明</view>
                <view class="line"></view>
            </view>
            <view class="content">
                每天有大量待鉴定内容，鉴定师会在保证准确率的前提
                下尽最快速度为您鉴定，请耐心等候。
            </view>
        </view>
        <view class="btns">
            <view class="btn-details">
                查看鉴定详情
            </view>
            <view class="btn-js">
                免费好友加速
            </view>
        </view>
    </view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
    data() {
        return {
            openMsg: false,
            qiniuUrl: config[NODE_ENV].qiniuUrl
        }
    }
}
</script>

<style lang="scss">
    .container {
        .userinfo {
            position: relative;
            height: 260rpx;
            overflow: hidden;
            
            .user {
                position: relative;
                width: 600rpx;
                height: 188rpx;
                margin: 62rpx auto 0;
                display: flex;
                align-items: center;
            }

            .bg,.bg2,.hj {
                position: absolute;
            }

            .bg {
                width: 750rpx;
                height: 210rpx;
                top: 0;
                left: 0;
                z-index: 1;
            }
            .hj {
                width: 210rpx;
                height: 224rpx;
                top: -32rpx;
                right: 106rpx;
                z-index: 3;
            }
            .bg2 {
                width: 600rpx;
                height: 188rpx;
                left: 0;
                right: 0;
                margin: 0 auto;
                z-index: 2;
            }
            .head,.info,.pdz {
                position: relative;
                z-index: 4;
            }
            .head {
                width: 142rpx;
                height: 142rpx;
                border-radius: 8rpx;
                border: dashed 1rpx #dcdfe2;
                margin-left: 22rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                .head-img {
                    width: 130rpx;
                    height: 130rpx;
                    background-color: #858585;
                    border-radius: 8rpx;
                }
            }
            .info {
                margin-left: 52rpx;

                .number {
                    display: flex;
                    margin-top: 32rpx;
                }
                .id {
                    width: 70rpx;
                    height: 30rpx;
                    font-size: 20rpx;
                    text-align: center;
                    background-color: #ffc91f;
                    border-radius: 6rpx;
                }
                .text {
                    font-size: 26rpx;
                    margin-left: 16rpx;
                }
            }
            .pdz {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 90rpx;
                height: 40rpx;
                color: #ffffff;
                line-height: 40rpx;
                font-size: 22rpx;
                text-align: center;
                background-image: linear-gradient(90deg, 
                    #f8454c 0%, 
                    #ed6b9d 100%), 
                linear-gradient(
                    #d1d1d1, 
                    #d1d1d1);
                background-blend-mode: normal, 
                    normal;
                border-radius: 6rpx 0rpx 6rpx 0rpx;
            }
        }
        .jd-pro {
            background-color: #fff;
            width: 702rpx;
            margin: 0 auto;
            border-radius: 6rpx;
            overflow: hidden;

            .title {
                width: 600rpx;
                margin: 38rpx auto 0;
                display: flex;

                view {
                    font-size: 26rpx;
                    &:nth-of-type(2) {
                        font-size: 24rpx;
                        color: #90a2b2;
                    }
                }
            }
            .classif {
                width: 630rpx;
                margin: 32rpx auto 0;
                display: flex;
                justify-content: space-around;

            }
            .progress {
                width: 622rpx;
                height: 16rpx;
                background-color: #eeeeee;
                border-radius: 8rpx;
                position: relative;
                margin: 12rpx auto 32rpx;

                .inner {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 20rpx;
                    height: 16rpx;
                    background-image: linear-gradient(90deg, 
                        #a7c4fa 0%, 
                        #78a3f1 100%), 
                    linear-gradient(
                        #78a3f1, 
                        #78a3f1);
                    background-blend-mode: normal, 
                        normal;
                    border-radius: 8rpx;
                }
            }
            .jsb {
                width: 640rpx;
                margin: 0 auto 30rpx;
                display: flex;
                justify-content: space-between;

                image {
                    width: 40rpx;
                    height: 32rpx;
                }
                .number,.cart {
                    display: flex;
                }
                .number {
                    position: relative;
                    .num {
                        position: absolute;
                        top: -5rpx;
                        left: 22rpx;
                        width: 28rpx;
                        height: 20rpx;
                        line-height: 20rpx;
                        font-size: 16rpx;
                        color: #ffffff;
                        text-align: center;
                        background-color: #f3824a;
                        border-radius: 10rpx;
                    }
                    .text {
                        margin-left: 18rpx;
                    }
                }
                .cart {
                    view {
                        margin-left: 20rpx;
                    }
                    .num {
                        color: #5e95f4;
                    }
                    .add,.red {
                        width: 40rpx;
                        height: 40rpx;
                        border-radius: 40rpx;
                        text-align: center;
                        line-height: 34rpx;
                        border: solid 2rpx #5e95f4;
                    }
                    .add {
                        background-color: #5e95f4;
                        color: #ffffff;
                        font-size: 40rpx;
                    }
                    .red {
                        color: #5e95f4;
                        font-size: 70rpx;
                        line-height: 28rpx;
                    }
                }
            }
            .btn {
                width: 702rpx;
                height: 74rpx;
                line-height: 74rpx;
                text-align: center;
                color: #ffffff;
                background-image: linear-gradient(-90deg, 
                    #5e95f4 0%, 
                    #3ba9f7 50%, 
                    #11c1fa 100%), 
                linear-gradient(
                    #f8f8f8, 
                    #f8f8f8);
                background-blend-mode: normal, 
                    normal;
                border-radius: 0rpx 0rpx 16rpx 16rpx;
            }
        }
        .weixin,.duanxin {
            width: 702rpx;
            height: 88rpx;
            margin: 16rpx auto;
            background-color: #ffffff;
            border-radius: 16rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 40rpx;
            padding-right: 40rpx;
            
            .left {
                display: flex;
                .text {
                    font-size: 26rpx;
                    margin-left: 20rpx;
                }
            }

            .weixin-img {
                width: 40rpx;
                height: 32rpx;
            }
            .right-img {
                width: 14rpx;
                height: 24rpx;
            }
            .duanxin-img {
                width: 36rpx;
                height: 28rpx;
            }
            .open-img {
                width: 54rpx;
                height: 30rpx;
            }
        }
        .tip {
            width: 702rpx;
            height: 202rpx;
            background-color: #ffffff;
            border-radius: 16rpx;
            margin: 0 auto;
            overflow: hidden;
            .title {
                display: flex;
                align-items: center;
                margin-top: 40rpx;
                margin-bottom: 30rpx;
                justify-content: center;

                .line {
                    width: 26rpx;
                    height: 1rpx;
                    background-color: #858585;
                }
                .text {
                    font-size: 24rpx;
                    margin-left: 20rpx;
                    margin-right: 20rpx;
                }
            }
            .text,.content {
                color: #858585;
            }
            .content {
                width: 575rpx;
                margin: 0 auto;
                font-size: 24rpx;
                line-height: 42rpx;
            }
        }
        .btns {
            height: 124rpx;
	        background-color: #ffffff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;

            view {
                width: 314rpx;
                height: 76rpx;
                line-height: 76rpx;
                text-align: center;
                border-radius: 38rpx;
                border: solid 2rpx #5e95f4;
            }

            .btn-details {
                color: #1bbbf9;
            }

            .btn-js {
                background-color: #1bbbf9;
                color: #ffffff;
                border: solid 2rpx #5e95f4;
            }
        }
    }
</style>