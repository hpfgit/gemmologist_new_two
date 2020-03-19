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

            <view class="btn">
                立即加速
            </view>
        </view>
        <view class="pic">
            <view class="inner"></view>
        </view>
        <view class="progress-img">
            <view class="title">如何使用BAN鉴定服务小程序？</view>
            <view class="speed"><view class="spot"></view>首页下拉可以看到最近使用的小程序</view>
            <image class="speed-img-1" :src="qiniuUrl+'/01@2x.png'"></image>
            <view class="speed"><view class="spot"></view>发现入口-小程序列表可直接搜索 [BAN鉴定服务] 小程序</view>
            <image class="speed-img-2" :src="qiniuUrl+'/02@2x.png'"></image>
            <view class="speed"><view class="spot"></view>点击右上角<image :src="qiniuUrl+'/组23@2x.png'"></image>添加小程序到桌面</view>
            <image class="speed-img-3" :src="qiniuUrl+'/03@2x.png'"></image>
        </view>
        <view class="mask"></view>
        <view class="extract extract2">
            <image class="top-img" :src="qiniuUrl+'/组36@2x.png'"></image>
            <view class="tip title" style="display: none;">- 帮好友获得2个加速包 -</view>
            <view class="tip title">- 分享成功 加速包数量已翻倍 -</view>
            <!-- <view class="title">正在帮您的好友抽取加速包...</view> -->
            <view class="title title2">好友回赠2个加速包</view>
            <view class="box" style="display: none;">
                <view class="item">
                    <view class="inner">
                        <view>
                            <view class="top"><text>5</text>个</view>
                            <view class="bottom">加速包</view>
                        </view>
                    </view>
                </view>
                <view class="item">
                    <view class="inner">
                        <view>
                            <view class="top"><text>5</text>个</view>
                            <view class="bottom">加速包</view>
                        </view>
                    </view>
                </view>
                <view class="item">
                    <view class="inner">
                        <view>
                            <view class="top"><text>5</text>个</view>
                            <view class="bottom">加速包</view>
                        </view>
                    </view>
                </view>
                <view class="item">
                    <view class="inner">
                        <view>
                            <view class="top"><text>5</text>个</view>
                            <view class="bottom">加速包</view>
                        </view>
                    </view>
                </view>
                <view class="item">
                    <view class="inner">
                        <view>
                            <view class="top"><text>5</text>个</view>
                            <view class="bottom">加速包</view>
                        </view>
                    </view>
                </view>
                <view class="item active">
                    <view class="inner">
                        <view>
                            <view class="top"><text>5</text>个</view>
                            <view class="bottom">加速包</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="info">
                加速包
            </view>
            <view class="btns">
                <view class="btn">
                    分享翻倍
                </view>
                <view class="btn">
                    下次再说
                </view>
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

            .btn {
                width: 584rpx;
                height: 82rpx;
                line-height: 82rpx;
                text-align: center;
                color: #ffffff;
                margin: 0 auto;
                background-image: linear-gradient(0deg,
                    #5e95f4 0%,
                    #3ba9f7 50%,
                    #11c1fa 100%),
                linear-gradient(
                    #f8f8f8,
                    #f8f8f8);
                background-blend-mode: normal,
                    normal;
                border-radius: 16rpx;
                margin-bottom: 40rpx;
            }
        }
        .pic {
            width: 750rpx;
            height: 240rpx;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 18rpx;
            margin-bottom: 18rpx;

            .inner {
                width: 710rpx;
                height: 200rpx;
                background-color: #dcdfe2;
                border-radius: 100rpx;
            }
        }
        .progress-img {
            width: 702rpx;
            background-color: #ffffff;
        	border-radius: 16rpx;
            margin: 18rpx auto 80rpx;
            padding-left: 36rpx;
            padding-right: 36rpx;
            overflow: hidden;

            .title,.speed {
                font-size: 24rpx;
            }
            .title {
                margin-top: 36rpx;
            }
            .speed {
                margin-top: 36rpx;
                margin-bottom: 46rpx;
                display: flex;
                align-items: center;
                .spot {
                    width: 12rpx;
                    height: 12rpx;
                    background-color: #5e95f4;
                    border-radius: 4rpx;
                    margin-right: 20rpx;
                }
                image {
                    width: 32rpx;
                    height: 30rpx;
                }
            }
            .speed-img-1 {
                width: 602rpx;
                height: 320rpx;
            }
            .speed-img-2 {
                width: 602rpx;
                height: 350rpx;
            }
            .speed-img-3 {
                width: 618rpx;
                height: 350rpx;
                margin-bottom: 96rpx;
            }
        }
        .mask {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            z-index: 998;
        }
        .extract {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 999;
            margin: auto;
            width: 570rpx;
            height: 588rpx;
            background-color: #ffffff;
            border-radius: 16rpx;
            overflow: hidden;

            &.extract2 {
                height: 666rpx;

                .info {
                    height: 130rpx;
                    line-height: 130rpx;
                    text-align: center;
                }
            }

            .top-img {
                width: 570rpx;
                height: 204rpx;
                position: absolute;
                left: 0;
                top: -63rpx;
            }

            .title,.tip {
                margin-top: 190rpx;
                text-align: center;
                &.title2 {
                    margin-top: 20rpx;
                }
            }
            .tip {
                color: #858585;
            }

            .box {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                padding-left: 60rpx;
                padding-right: 60rpx;
                margin-top: 24rpx;


                .item {
                    width: 138rpx;
                    height: 138rpx;
                    background-color: #efdafd;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 18rpx;

                    &.active {
                        background-color: #9ec0ff;
                        .inner {
                            background-color: #fff;
                            .top,.bottom {
                                font-size: 26rpx;
                                color: #282828;
                                text-align: center;
                                text {
                                    font-size: 40rpx;
                                    color: #5e95f4;
                                }
                            }
                        }
                    }

                    .inner {
                        width: 120rpx;
                        height: 120rpx;
                        background-color: #5e95f4;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .top,.bottom {
                            font-size: 26rpx;
                            color: #fff;
                            text-align: center;
                            text {
                                font-size: 40rpx;
                                color: #ffffff;
                            }
                        }
                    }
                }
            }

            .btns {
                .btn {
                    width: 492rpx;
	                height: 78rpx;
                    line-height: 78rpx;
                    text-align: center;
                    margin: 0 auto;
                    background-color: #509df5;
                    border-radius: 39rpx;

                    &:nth-of-type(1) {
                        color: #fff;
                    }
                    &:nth-of-type(2) {
                        color: #509df5;;
                        border: 1rpx solid #509df5;
                        background-color: #fff;
                        margin-top: 20rpx;
                    }
                }
            }
        }
    }
</style>
