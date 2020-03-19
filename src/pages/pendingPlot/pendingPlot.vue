<template>
	<view class="container">
		<view class="box">
			<image :src="qiniuUrl+'/待补图@2x.png'" mode=""></image>
			<image :src="qiniuUrl+'/技术支持@2x.png'" mode=""></image>
		</view>
		<view class="box text">补图位置：鞋标 鞋撑 鞋垫反面</view>
		<view class="tip">
			微信小程序：BAN装备鉴定，输入
			<view class="number">756324</view>
			查询原帖
		</view>
		<view class="content">
			<view class="name">Air Jordan</view>
			<view class="mark-text">备注信息备注信息备注信息</view>
			<view class="imgs">
				<view class="img-box" @tap="upimg(index)" v-for="(item, index) in imgs" :key="index">
					<view class="img">
						<image :src="imgPath(item.imgPath)" mode=""></image>
						<text>{{item.text}}</text>
						<view class="mark"></view>
					</view>
				</view>
				<view class="img-box">
					<view class="img"><image :src="qiniuUrl+'/补图@2x.png'" mode=""></image></view>
				</view>
			</view>
			<image class="gd" :src="qiniuUrl+'/组5@2x.png'" mode=""></image>
			<view class="btn">提交补图</view>
		</view>
		<view class="mark-content" style="display: none;">
			<image class="close-img" :src="qiniuUrl+'/jianding_jiandingshi_jiandingxiangqing_del@2x.png'" mode=""></image>
			<view class="title"><text>鉴定备注</text></view>
			<view class="lists">
				<view class="list">
					<view class="head"><image :src="qiniuUrl+'/防伪@3x.png'" mode=""></image></view>
					<view class="detail">
						<view class="name">鉴定师-01</view>
						<view class="cont">在连续三个季度失守北美市场后，Nike最终还是靠持续创新产品扳回一局。Nike品牌鞋履产品第四季度销售额同比大涨12%至61.44亿美元。</view>
					</view>
				</view>
				<view class="list">
					<view class="head"><image :src="qiniuUrl+'/防伪@3x.png'" mode=""></image></view>
					<view class="detail">
						<view class="name">鉴定师-01</view>
						<view class="cont">在连续三个季度失守北美市场后，Nike最终还是靠持续创新产品扳回一局。Nike品牌鞋履产品第四季度销售额同比大涨12%至61.44亿美元。</view>
					</view>
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
				qiniuUrl: config[NODE_ENV].qiniuUrl,
				imgs: [
					{
						text: "外观",
						imgPath: ""
					},
					{
						text: "中底走线",
						imgPath: ""
					},
					{
						text: "鞋标",
						imgPath: ""
					},
					{
						text: "鞋盒侧标",
						imgPath: ""
					},
					{
						text: "鞋盒钢印",
						imgPath: ""
					},
					{
						text: "鞋底",
						imgPath: ""
					},
					{
						text: "鞋垫正面",
						imgPath: ""
					},
					{
						text: "鞋垫反面",
						imgPath: ""
					},
					{
						text: "后跟",
						imgPath: ""
					}
				],
				tmpImgs: []
			}
		},
		methods: {
			upimg(index) {
				const that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						const {tempFilePaths} = res;
						const imgPath = tempFilePaths[0];
						that.imgs[index].imgPath = imgPath;
						console.log(that.imgs);
					},
					fail(err) {
						console.log(err);
					}
				});
			},
			imgPath(path) {
				if (path === '') {
					return '../../static/images/pendingPlot/补图@2x.png';
				}
				return path;
			}
		}
	}
</script>

<style lang="scss">
.container {
	background-color: #ffffff;
}
.box {
	padding-left: 38rpx;
	padding-right: 30rpx;
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	image {
		&:nth-of-type(1) {
			width: 126rpx;
			height: 40rpx;
			margin-top: 36rpx;
		}
		&:nth-of-type(2) {
			width: 220rpx;
			height: 60rpx;
			margin-top: 24rpx;
		}
	}
	&.text {
		font-size: 24rpx;
		color: #5e95f4;
		padding-top: 26rpx;
		padding-bottom: 36rpx;
	}
}
.tip {
	background-color: #eef1f4;
	color: #989898;
	font-size: 22rpx;
	text-align: center;
	padding: 12rpx 0;
	.number {
		display: inline-block;
		padding: 1rpx 5rpx;
		background-color: #989898;
		color: #ffffff;
		border-radius: 10rpx;
		margin-left: 5rpx;
		margin-right: 5rpx;
	}
}
.content {
	padding-left: 38rpx;
	padding-right: 38rpx;
	font-size: 40rpx;
	color: #282828;
	background-color: #ffffff;

	.name {
		margin-top: 48rpx;
	}

	.mark-text {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
}
.imgs {
	display: flex;
	flex-wrap: wrap;
}
.img-box {
	width: 33.333333%;
	text-align: center;
	margin-bottom: 28rpx;
}
.img {
	display: inline-block;
	text-align: center;
	position: relative;
	width: 150rpx;
	image {
		width: 150rpx;
		height: 150rpx;
	}
	text {
		width: 100%;
		font-size: 22rpx;
		position: absolute;
		bottom: 20rpx;
		left: 0;
		color: #ffffff;
		z-index: 2;
	}
	.mark {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 40%;
		background-color: rgba($color: #000000, $alpha: 0.4);
		z-index: 1;
	}
}
.gd {
	width: 478rpx;
	height: 114rpx;
	margin: 30px auto 0;
	display: block;
}
.btn {
	background-color: #5e95f4;
	width: 240rpx;
	height: 72rpx;
	border-radius: 60rpx;
	color: #ffffff;
	line-height: 72rpx;
	text-align: center;
	margin: 40rpx auto 100rpx;
}
.close-img {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	top: 40rpx;
	right: 68rpx;
	z-index: 9;
}
.mark-content {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 700rpx;
	margin: 0 auto;
	background-color: #ffffff;
	z-index: 99;
	padding-left: 30rpx;
	padding-right: 30rpx;
	border-radius: 10rpx;
	.title {
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 38rpx;
		margin-bottom: 56rpx;
		text-align: center;
	}
}
.lists {
	image {
		width: 80rpx;
		height: 80rpx;
	}
	.list {
		display: flex;
		justify-content: space-between;
		margin-bottom: 36rpx;
		.detail {
			margin-left: 20rpx;
		}
		.name {
			color: #282828;
			font-size: 26rpx;
		}
		.cont {
			font-size: 22rpx;
			color: #4b525b;
			line-height: 42rpx;
			margin-top: 10rpx;
		}
	}
}
</style>
