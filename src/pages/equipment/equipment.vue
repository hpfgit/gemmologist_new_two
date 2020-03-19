<template>
	<view class="container">
		<view class="bg">
			<image class="bg-img" :src="qiniuUrl+'bg@2x.png'"></image>
			<view class="custom-title"><navigator url="../allAppraisal/allAppraisal">学习资料</navigator></view>
			<view class="back" @click="goBack"><image :src="qiniuUrl+'返回@2x.png'"></image></view>
		</view>
		<view class="navs">
			<view class="nav active"><text>球鞋</text></view>
			<view class="nav"><text>服装</text></view>
		</view>
		<view class="title">品牌选择</view>
		<view class="barnds">
			<view class="box"><navigator url="../identificationList/identificationList">球鞋品牌</navigator></view>
			<view class="box"></view>
			<view class="box"></view>
			<view class="box"></view>
			<view class="box"></view>
			<view class="box"></view>
		</view>
	</view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
	data() {
		return {
			qiniuUrl: config[NODE_ENV].qiniuUrl
		}
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	background-color: #ffffff;
}
.bg {
	position: relative;
	height: 144rpx;
	.bg-img {
		width: 750rpx;
		height: 144rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	.custom-title {
		position: absolute;
		width: 100%;
		top: 66rpx;
		left: 0;
		z-index: 3;
		text-align: center;
		font-size: 34rpx;
		color: #ffffff;
	}
	.back {
		position: absolute;
		left: 24rpx;
		top: 66rpx;
		z-index: 4;
		image {
			width: 66rpx;
			height: 66rpx;
		}
	}
}
.navs {
	width: 690rpx;
	height: 86rpx;
	background-color: #fafafa;
	border-radius: 10rpx;
	border: solid 4rpx #eef1f4;
	margin: 28rpx auto 50rpx;
	display: flex;
	justify-content: space-between;
	.nav {
		width: 340rpx;
		height: 80rpx;
		line-height: 80rpx;
		box-shadow: 2rpx 0rpx 6rpx 0rpx rgba(43, 43, 43, 0.14);
		border-radius: 10rpx;
		text-align: center;
		text {
			font-size: 26rpx;
			color: #282828;
		}
		&.active {
			background-color: #ffffff;
		}
	}
}
.title {
	padding-left: 36rpx;
}
.barnds {
	padding-left: 28rpx;
	padding-right: 28rpx;
	display: flex;
	flex-wrap: wrap;
	.box {
		width: 200rpx;
		height: 200rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin-left: 47rpx;
		margin-top: 24rpx;

		&:nth-of-type(3n + 1) {
			margin-left: 0;
		}
	}
}
</style>
