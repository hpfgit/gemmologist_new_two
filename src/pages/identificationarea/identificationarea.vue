<template>
	<view class="container">
		<view class="tip">
			<image :src="qiniuUrl+'/“@2x.png'"></image>
			<view>BAN旨在为用户打造机制的装备鉴定体验，全球首创三人专业鉴定模式，同时也是首家对鉴定结论进行担保赔付的鉴定平台！让专业的人做专业的事！</view>
			<image :src="qiniuUrl+'/“拷贝@2x.png'"></image>
		</view>
		<view class="regulations">
			若您对鉴定有任何建议或意见可在<text @tap="gotoPage(0)">#装备鉴定#</text>话题下与我们进行沟通。
		</view>
		<view class="regulations">
			同时我们也在招募各品牌鉴定达人，通过<text @tap="gotoPage(1)">鉴定师入驻考核</text>后即可加入我们。
		</view>
		<view class="mark">
			BAN为了防止假货制作商获取数据，仅随机展示300条已鉴定记录
		</view>
		<view class="imgs">
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
			<image :src="qiniuUrl+'/IMG_8859@2x.png'"></image>
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
			gotoPage(index) {
			    if(index) {
              uni.showModal({
                  title: "提示",
                  "content": "您需要实人认证后方可入驻",
                  success(res) {
                      if (res.confirm) {
                          uni.navigateTo({
                              url: '/pages/realpersonauthentication/realpersonauthentication'
                          });
                      } else if (res.cancel) {
                          console.log('用户点击了取消按钮');
                      }
                  }
              });
          } else {
			        uni.showToast({
                  title: "请前往BAN APP",
                  icon: "none"
              });
          }
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #fff;
	}
	.tip {
		width: 670rpx;
		margin: 26rpx auto 40rpx;
		padding: 24rpx 18rpx;
		background-color: #f8f9fe;
		border-radius: 2rpx;
		position: relative;
		image {
			width: 31rpx;
			height: 24rpx;
			position: absolute;
			&:nth-of-type(1) {
				top: 24rpx;
				left: 18rpx;
			}
			&:nth-of-type(2) {
				right: 18rpx;
				bottom: 24rpx;
			}
		}
		view {
			width: 578rpx;
			padding-left: 56rpx;
		}
	}
	.regulations {
		padding-left: 34rpx;
		padding-right: 34rpx;
		font-size: 26rpx;
		line-height: 52rpx;
		margin-bottom: 40rpx;
		navigator,text {
			font-size: 26rpx;
			color: #5e95f4;
			display: inline-block;
		}
	}
	.mark {
		font-size: 22rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #eef1f4;
		color: #989898;
	}
	.imgs {
		padding-top: 40rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 100rpx;
		image {
			width: 216rpx;
			height: 216rpx;
			background-color: #436db6;
			border-radius: 8rpx;
			margin-left: 20rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			&:nth-of-type(3n+1) {
				margin-left: 0;
			}
		}
	}
</style>
