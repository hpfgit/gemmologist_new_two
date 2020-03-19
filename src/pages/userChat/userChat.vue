<template>
    <view class="user-chat">
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
        <view class="waiting">
            等待鉴定师应答
        </view>
        <chat></chat>
    </view>
</template>

<script>
import chat from '../../component/chat/chat.vue';

export default {
    data() {
        return {

        }
    },
    components: {
        chat
    }
}
</script>

<style lang="scss" scoped>
    .user-chat {
        background-color: #edf1f4;
        min-height: 100vh;
        overflow: hidden;
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
    .waiting {
        width: 274rpx;
        height: 90rpx;
        line-height: 90rpx;
        margin: 30rpx auto;
        text-align: center;
        background-color: #ffffff;
        border-radius: 20rpx;
        color: #000000;
    }
</style>