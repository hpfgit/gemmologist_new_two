<template>
    <view class="container">
        <view class="nodata">
            <image :src="qiniuUrl+'暂无数据@2x.png'"></image>
            <view class="text">暂无数据</view>
        </view>
    </view>
</template>

<script>
import config from '../../config/index';
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            qiniuUrl: config[NODE_ENV].qiniuUrl
        }
    }    
}
</script>

<style lang="scss">
    .nodata {
        text-align: center;
        padding-top: 260rpx;
        height: 100vh;
        background-color: #eef1f4;

        image {
            width: 268rpx;
            height: 175rpx;
        }
        .text {
            margin-top: 36rpx;
            color: #898989;
        }
    }
</style>