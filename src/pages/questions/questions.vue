<template>
	<view class="container">
		<view class="column"><image :src="qiniuUrl+'/常见问题@2x.png'" mode=""></image></view>
		<view class="questions">
			<view class="question">
				<view class="title">1.面对假货横行的市场BAN装备鉴定在做什么？</view>
				<view class="content">答：BAN装备鉴定旨在为用户提供最准确的鉴定结论，具有严格的鉴定与审核程序，秉承“真实、客观、公正、严谨、严格”的原则为用户提供鉴定结论。</view>
			</view>
			<view class="question">
				<view class="title title2">2.BAN装备鉴定主要包括哪些内容？</view>
				<view class="content">
					答：BAN装备鉴定包括鞋子鉴定、服装鉴定等多品牌限量商品的鉴定，涉及到鉴定方式、鉴定流程、鉴定协议、收费标准、证书样本、鉴定答疑、实物鉴定、科技检测等多个内容的结合。
				</view>
			</view>
			<view class="question">
				<view class="title title3">3.BAN鉴定师整体水平如何？</view>
				<view class="content">
					答：BAN对于各品牌鉴定师有非常严格的审核机制，每一位能够进行专业鉴定的鉴定师都是经过层层审核筛选出来的，为了保证鉴定师水平实时跟进，我们每隔一段时间都会让鉴定师重新考核(考核标准，成为一名某品牌单品类鉴定顾问需要经过四次考核，BAN会随机抽取该品牌总共500题做成考卷，鉴定顾问并且必须保证规定时间内全部答对。如果同时担任俩品牌就是1000题，以此类推）
				</view>
			</view>
			<!-- <view class="question">
				<view class="title">4.BAN为什么不公开鉴定师名称及数量？</view>
				<view class="content">
					答：BAN为保护鉴定师隐私不受侵害，同时为保证鉴定师可以安静的去做鉴定不被他人打扰，故隐藏信息。同时BAN也会严格保护用户隐私，所有鉴定贴非本人查询不会透露任何与个人信息相关的内容。
					<br />
					BAN拥有各品牌各品类数十名鉴定师、高级鉴定师、鉴定顾问，同时也拥有各个品牌大量鉴定数据供鉴定师学习参考，我们保证未来将整个鉴定过程控制在10分钟以内。鉴定师入驻
					快速通道
				</view>
			</view>
			<view class="question">
				<view class="title">5.BAN对于装备鉴定做了哪些前所未有的改变？</view>
				<view class="content">
					通过BAN进行专业鉴定，鉴定贴发布成功后系统会自动随机分配给三位拥有该品牌该类目鉴定能力水平的鉴定师，鉴定师通过用户提供的信息进行判断给出结论（鉴定过程中系统会利用鉴定大数据辅助鉴定师完成判断），系统会自动比对鉴定结论，如结论一致，则将结论发送至用户如结论不一致，将组织数位鉴定顾问召开专题鉴定会为您鉴定商品，经过合议，最终给出一个准确严谨的鉴定结论。
					<br />
					业内第一个鉴定结论错误保赔的平台
					<br />
					BAN装备鉴定作为第一个鉴定保赔的机构，BAN对专业鉴定结论负责，专业鉴定结论假如失误，我们愿意赔付鉴定费用最高30倍的赔偿金额，对于保价商品，我们将按照商品价值全额赔付！同时我们也严厉打击骗保行为，详情可见《专业鉴定契约条款》。
				</view>
			</view>
			<view class="question">
				<view class="title">6.关于免费鉴定和专业鉴定的区别？</view>
				<view class="content">
					答：免费鉴定是为了服务用户提供的一项免费服务，BAN保持中立的态度不参与任何斗争，所有免费鉴定产生的鉴定结果仅提供参考，BAN对其不承担任何责任，但是BAN也会秉承对用户负责的角度保证鉴定结果的准确性达到95%以上。详情可见《免费鉴定契约条款》。
					<br />
					专业鉴定是BAN独家推出的一项针对于限量商品及高危款项目前来说最严格最严谨一套鉴定方案，尽最大能力保证鉴定结论的准确性。专业鉴定是针对于鉴定产生的服务升级项目，将收取一定的费用，但与此同时BAN将对鉴定结果负责，鉴定结果出现错误，BAN将按照商品价值等额赔偿。详情可见《专业鉴定契约条款》。
				</view>
			</view> -->
			<view class="question">
				<view class="title">4.对于鉴定结论有疑问如何处理？</view>
				<view class="content">答：对于鉴定结论有疑问可通过鉴定结论页下方提交工单处理，BAN将派专员1对1跟踪服务。</view>
			</view>
			<view class="question">
				<view class="title">5.实物鉴定（公测）</view>
				<view class="content">
					答：照片不能很好的反应限量商品本身的重量、手感、材质、光泽、内部结构等物理信息对于价值极高、超限量、高危款等类商品，BAN提供实物鉴定的服务项目，并提供相应的实物鉴定证书(证书运用区块链技术保证其不会被仿造)。可通过邮寄或本人送至BAN各城市鉴定工作室，详情可点击
					实物鉴定 (公测）。
				</view>
			</view>
		</view>
		<view class="tip">-以上为常见问题，如果有其他特殊问题请联系客服即可-</view>
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

.column {
	display: none;
	text-align: center;
	height: 120rpx;
	line-height: 120rpx;
	background-color: #ffffff;
	image {
		width: 161rpx;
		height: 44rpx;
	}
}
.questions {
	padding-left: 24rpx;
	padding-right: 24rpx;
	.question {
		padding-top: 36rpx;
	}
	.title {
		display: inline-block;
		height: 50rpx;
		line-height: 50rpx;
		padding-left: 18rpx;
		padding-right: 18rpx;
		background-size: cover;
		background-color: #666666;
		border-radius: 20rpx;
		color: #ffffff;
		font-size: 24rpx;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			top: 50rpx;
			left: 16rpx;
			width: 8rpx;
			height: 6rpx;
			background-image: url('../../static/images/questions/图层1@2x.png');
			background-size: cover;
		}
	}
	.content {
		font-size: 24rpx;
		color: #858585;
		line-height: 42rpx;
		margin-top: 10rpx;
	}
}
.tip {
	height: 130rpx;
	text-align: center;
	line-height: 130rpx;
	padding-bottom: 50rpx;
	font-size: 22rpx;
}
</style>
