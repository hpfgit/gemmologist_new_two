<template>
	<view class="container">
		<view class="jb">
			<view class="title">关于鉴定级别</view>
			<view class="content">鉴定师等级分为两个，鉴定师，鉴定顾问，采取考核制度升级。</view>
		</view>
		<view class="qx">
			<view class="title">
				<image :src="qiniuUrl+'/权限2@2x.png'"></image><text>关于鉴定权限</text>
			</view>
			<view class="table">
				<view class="thead">
					<view class="tr">
						<view class="td">
							<view>级别</view>
							<view>鉴定内容</view>
						</view>
						<view class="td">鉴定师</view>
						<view class="td">鉴定顾问</view>
					</view>
				</view>
				<view class="tbody">
					<view class="tr">
						<view class="td">极速鉴定</view>
						<view class="td"><image :src="qiniuUrl+'/对号(7)@2x.png'"></image></view>
						<view class="td"><image :src="qiniuUrl+'/对号(7)@2x.png'"></image></view>
					</view>
					<view class="tr">
						<view class="td">保价鉴定</view>
						<view class="td"><image :src="qiniuUrl+'/对号(7)@2x.png'"></image></view>
						<view class="td"><image :src="qiniuUrl+'/对号(7)@2x.png'"></image></view>
					</view>
				</view>
			</view>
		</view>
		<view class="qx">
			<view class="title">
				<image :src="qiniuUrl+'/费用(1)@2x.png'"></image><text>关于鉴定费用（能者多劳）</text>
			</view>
			<view class="content">
				<view>1. 每次同级别有效鉴定获得鉴定费用的20%作为酬劳。例如专业鉴定10元，保价费用100元，则本次你将获得22元鉴定酬劳用。</view>
				<view>2. 每次跨级别有效鉴定获得鉴定费用的20%~60%作为酬劳。例如你是鉴定顾问，鉴定高级鉴定师及以下权限的内容，例如鉴定费用100元，若此时有一位当前本级别鉴定师正在鉴定，进行有效鉴定则获得40元（即40%）酬劳，若此时无人鉴定，进行有效鉴定则获得60元（即60%）酬劳，以此类推。</view>
			</view>
		</view>
		<view class="qx">
			<view class="title">
				<image :src="qiniuUrl+'/处理中@2x.png'"></image><text>关于鉴定失误处理办法</text>
			</view>
			<view class="content">
				<view>平台采取保赔机制，所以劳请各位鉴定师保持十足的精神去对待每一次鉴定，拿不准的商品可以大家讨论共同商定结果。</view>
				<view>鉴定错误产生的赔偿金将从鉴定佣金中扣除例如赔偿100元，则从鉴定佣金中扣除40元（即40%）。高等级鉴定低等级若鉴定失误，则扣除鉴定佣金100元（即100%），额外扣除20元（即20%）用于鉴定失误后赔偿沟通、用户安抚、公关费用等。鉴定错误次数大于3次将自动降级，需要进行重新考核。</view>
				<view style="margin-top: 30rpx; margin-bottom: 20rpx;">级别不同惩罚措施不同(降级)</view>
				<view style="margin-top: 24rpx;">鉴定师 <image :src="qiniuUrl+'/降级@2x.png'"></image> 实习鉴定师 <text>(7天后可重新升级考试)</text></view>
				<view style="margin-top: 24rpx;">鉴定顾问 <image :src="qiniuUrl+'/降级@2x.png'"></image> 高级鉴定师 <text>(30天后可重新升级考试)</text></view>
			</view>
		</view>
		<view class="qx">
			<view class="title">
				<image :src="qiniuUrl+'/考试@3x.png'"></image><text>关于模拟考试及升级考试</text>
			</view>
			<view class="content">
				<view>模拟考试每天不限制次数，升级考试每天仅限一次。</view>
			</view>
		</view>
		<view class="qx">
			<view class="title">
				<image :src="qiniuUrl+'/审核@2x_看图王.png'"></image><text>关于审核标准</text>
			</view>
			<view class="content">
				<view>联系版主均可开通权限，进行品牌测试</view>
				<view style="margin-top: 0;">鉴定师：195/200普通考试 通过后需经过版主确认，需要时再上岗</view>
				<view>鉴定顾问：需向版主申请品牌专业高级考试</view>
				<view>每个品牌50题，48/50即可通过，需要时上岗</view>
				<view>更多详情请关注公众号联系版主咨询</view>
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
				qiniuUrl: config[NODE_ENV].qiniuUrl
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #fff;
	}
	.jb {
		width: 670rpx;
		position: relative;
		margin: 50rpx auto 0;
		overflow: hidden;
		background-color: #f2f2f2;
		padding-top: 30rpx;
		image {
			width: 670rpx;
			height: 198rpx;
			position: absolute;
		}
		.title,.content {
			position: relative;
			z-index: 2;
		}
		.title {
			text-align: center;
			font-size: 26rpx;
			line-height: 42rpx;
			color: #000000;
			padding-top: 26rpx;
			padding-bottom: 20rpx;
		}
		.content {
			width: 570rpx;
			margin: 0 auto;
			padding-bottom: 40rpx;
			font-size: 26rpx;
			line-height: 42rpx;
			color: #000000;
		}
	}
	.qx {
		&:nth-of-type(6) {
			margin-bottom: 112rpx;
		}
		.title {
			width: 710rpx;
			margin: 50rpx auto 30rpx;
			image {
				width: 24rpx;
				height: 28rpx;
				margin-right: 14rpx;
			}
		}
		.content {
			width: 710rpx;
			margin: 0 auto;
			view {
				font-size: 26rpx;
				color: #858585;
				&:nth-of-type(2) {
					margin-top: 24rpx;
				}
			}

			text {
				font-size: 22rpx;
				color: #858585;
			}

			image {
				width: 24rpx;
				height: 20rpx;
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
	.table {
		width: 710rpx;
		margin: 0 auto;
		.thead {
			.tr {
				display: flex;
				justify-content: space-around;
				align-items: center;
				.td {
					border: 1rpx solid #e0e0e0;
					background-color: #e6e6e6;
					border-collapse: collapse;
					font-size: 22rpx;
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					&:nth-of-type(1) {
						width: 160rpx;
						line-height: normal;
						display: inline-block;
						padding-top: 14rpx;
						view {
							color: #858585;
							font-size: 20rpx;
							padding-left: 16rpx;
							padding-right: 16rpx;
							&:nth-of-type(1) {
								text-align: right;
							}
							&:nth-of-type(2) {
								text-align: left;
							}
						}
					}
				}
			}
		}
		.tbody {
			.tr {
				display: flex;
				justify-content: space-around;
				align-items: center;
				&:nth-of-type(1),&:nth-of-type(2) {
					.td {
						padding-top: 0;
						line-height: 80rpx;
					}
				}
				&:nth-of-type(3),&:nth-of-type(4),&:nth-of-type(5),&:nth-of-type(6) {
					.td {
						&:nth-of-type(1) {
							line-height: normal;
						}
					}
				}
				&:nth-of-type(5) {
					.td {
						height: 106rpx;
					}
				}
				.td {
					border: 1rpx solid #e0e0e0;
					background-color: #ffffff;
					border-collapse: collapse;
					font-size: 22rpx;
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					&:nth-of-type(1) {
						padding-top: 10rpx;
					}
					view {
						font-size: 22rpx;
					}
				}
				image {
					width: 30rpx;
					height: 24rpx;
				}
			}
		}
	}
</style>