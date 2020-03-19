<template>
    <view class="select-type">
        <view class="title">
            已选鉴定师
        </view>
        <view class="info">
            <view class="left">
                <view class="img">
                    <image src="../../static/images/图层968@2x.png"></image>
                </view>
                <view class="left-right">
                    <view class="name">鉴定师名称</view>
                    <view class="level">
                        <image src="../../static/images/图层968@2x.png"></image>
                        <view class="level-name">版主</view>
                    </view>
                </view>
            </view>
            <view class="right" @tap="selectType">
                <view class="app-type">
                    鉴定类别：手表
                </view>
            </view>
        </view>
        <view class="check-type" :class="{active: isShow}">
            <view class="title">选择鉴定品类</view>
            <view class="close-box"
                @tap="close"
            >
                <image
                    :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"
                    class="close-img"
                ></image>
            </view>
            <view class="classList">
                <view class="list" @tap="selected(0)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'球鞋2@2x.png'"
                            ></image>
                        </view>
                        <view class="text">球鞋</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="selected(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'服饰2@2x.png'"
                            ></image>
                        </view>
                        <view class="text">服饰</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="selected(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'手表@2x.png'"
                            ></image>
                        </view>
                        <view class="text">手表</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="selected(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'奢侈品@2x.png'"
                            ></image>
                        </view>
                        <view class="text">奢侈品</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="selected(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'美妆@2x.png'"
                            ></image>
                        </view>
                        <view class="text">美妆</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="pay">
            <view class="left">
                <text class="text">费用共计: </text><text class="text text2">￥</text><text class="text2 text3">5</text>
                <view class="agree">
                    <image @tap="isAgreeFn" v-show="!isAgree" :src="qiniuUrl + '/未同意@2x.png'"></image>
                    <image @tap="isAgreeFn" v-show="isAgree" :src="qiniuUrl + '同意(1)@2x.png'"></image>
                    <text @tap="isAgreeFn">
                    我同意
                    </text>
                    《
                    <text @tap="qiyue">极速鉴定契约条款</text>
                    》
                </view>
            </view>
            <view class="pay-btn">
                微信支付
            </view>
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
            isShow: true,
            isAgree: true
        }
    },
    methods: {
        selected() {
            this.isShow = false;
        },
        selectType() {
            this.isShow = true;
        },
        close() {
            this.isShow = false;
        },
        isAgreeFn() {
            this.isAgree = !this.isAgree;
        }
    }
}
</script>

<style lang="scss" scoped>
    .select-type {
        background-color: #edf1f4;
        min-height: 100vh;
        overflow: hidden;
    }
    .title {
        font-size: 32rpx;
        color: #000;
        margin-top: 26rpx;
        margin-bottom: 18rpx;
        padding-left: 38rpx;
    }
    .info {
        width: 690rpx;
        height: 110rpx;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 20rpx;
        padding: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            display: flex;
            .img {
                image {
                    width: 80rpx;
                    height: 80rpx;
                    border-radius: 80rpx;
                }
            }
            .left-right {
                image {
                    width: 40rpx;
                    height: 28rpx;
                }
            }
        }
        .right, .level {
            display: flex;
        }
    }
    .check-type {
        position: fixed;
        bottom: -1801rpx;
        right: 0;
        left: 0;
        z-index: 999;
        width: 750rpx;
        height: 1081rpx;
        background-color: #ffffff;
        border-radius: 40rpx 40rpx 0rpx 0rpx;
        transition: all .2s;
        overflow: hidden;

        &.active {
            bottom: 0;
        }

        .title {
            text-align: center;
            margin-top: 56rpx;
            margin-bottom: 66rpx;
        }

        .classList {
            padding-left: 36rpx;
            padding-right: 36rpx;
        }

        .list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 670rpx;
            height: 160rpx;
            border: solid 2rpx rgba(237, 237, 237, 1);
            margin-bottom: 22rpx;
            
            .list-left {
                display: flex;
                align-items: center;
            }
            .img-box {
                width: 66rpx;
                margin-left: 36rpx;
                margin-right: 32rpx;
            }

            .more-icon {
                width: 14rpx;
                height: 20rpx;
                margin-right: 40px;
            }
        }


        .shoes-img {
            width: 68rpx;
            height: 68rpx;
        }
    }

    .close-img, .close-box {
        width: 24rpx;
        height: 23rpx;
        position: absolute;
    }

    .close-img {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .close-box {
        top: 60rpx;
        right: 50rpx;
        width: 48rpx;
        height: 48rpx;
    }
    .pay {
        width: 750rpx;
        height: 110rpx;
        padding: 12rpx 30rpx 10rpx 30rpx;
        background-color: #ffffff;
        box-shadow: 0rpx 2rpx 20rpx 0rpx 
            rgba(23, 37, 112, 0.1);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
            font-size: 24rpx;
        }
        .text2 {
            color: #7186f1;
        }
        .text3 {
            font-size: 32rpx;
        }
        .left {
            margin-top: 8rpx;
        }
        .agree {
            margin-top: 6rpx;
            font-size: 22rpx;

            text {
                color: #7186f1;
            }
            image {
                width: 22rpx;
                height: 22rpx;
                margin-right: 10rpx;
            }
        }
        .pay-btn {
            width: 240rpx;
            height: 86rpx;
            line-height: 86rpx;
            text-align: center;
            background-color: #7186f1;
            border-radius: 16rpx;
            color: #ffffff;
        }
    }
</style>