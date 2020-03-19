<template>
	<view class="container">
		<view class="tip">
			<image :src="qiniuUrl+'/“@2x.png'"></image>
			<view>本服务依据鉴定商品的数量(而非价值)收取基本鉴定费用，赔偿标准也以用户支付的鉴定费用为基础，为平衡风险，本服务对单个鉴定商品的价值限定为2万元，如鉴定商品价值超过2万元，用户可采取实物鉴定，保价鉴定等方式进行鉴定，不可使用在线鉴定服务; BAN无审核鉴定商品价值的义务。</view>
			<image :src="qiniuUrl+'/“拷贝@2x.png'"></image>
		</view>
		<view class="regulations">
			一、极速鉴定是针对于鉴定产生的服务升级项目，将收取一定的费用， 但与此同时BAN将对鉴定结果负责,鉴定结果出现错误，BAN在未保价情况下将向用户支付最高不超过鉴定费用10倍的赔偿，保价情况下将按照商品价值全额赔付。
		</view>
		<view class="regulations">
			<view>二、官方的权利及责任</view>
			<view>1. BAN委托鉴定师/鉴定顾问跟踪整个鉴定过程。</view>
			<view>2. 极速鉴定完成时间保证在两小时内，加速保证在30分钟内，如果超过规定时间但未超过6小时，鉴定费用将退回一半，如果工单超过6小时未处理，完成时将退回全部鉴定费用。期间委托鉴定师/鉴定顾问未及时处理的工单，版主有权代替进行处理。在确定鉴定的期限内，及时将结果通知用户。</view>
			<view>3. BAN只对图片中商品的真假问题进行鉴定,不延伸其它内容。</view>
			<view>4. BAN对极速鉴定的结果真实性负责。</view>
		</view>
		<view class="regulations">
			<view>三、关于鉴定结论</view>
			<view>1.鉴定结论为4种情况，分别为真、假、无法鉴定(无法鉴定会退还其全部费用)、建议退货</view>
			<view>2.无法鉴定情况大致如下:</view>
			<view>(1)拼图、故意捣乱找茬者</view>
			<view>(2) 不在鉴定范围内</view>
			<view>(3) 未发售产品</view>
			<view>(4) 图片不完整或超过24小时未按规定补图等</view>
			<view>3. 建议退货情况大致如下:</view>
			<view>(1) 鞋盒不匹配</view>
			<view>(2) 商品本身存在潜在问题</view>
			<view>4. 对于鉴定结论有任何疑义可进行专业鉴定或者实物鉴定。</view>
		</view>
		<view class="regulations">
			<view>四、用户的权利和责任</view>
			<view>1. 用户认同BAN的装备鉴定机构，并承认鉴定结论的真实性</view>
			<view>2. 用户在鉴定机构鉴定过程中，在规定时间内按鉴定师要求提供鉴定必要的相关材料。</view>
		</view>
		<view class="regulations">
			<view>五、责任声明</view>
			<view>1. 如果BAN鉴定失误，未保价情况下将向用户支付最高不超过鉴定费用10倍的赔偿，若用户已选择增值保价赔付服务，则按照鉴定物品的声明价值进行赔偿，鉴定物品声明价值高于实际价值的，按实际价值赔偿。</view>
			<view>2. 已按实际价值或声明价值获得赔偿的鉴定物品，其所有权及其相关的索赔权利在完全理赔后归本公司所有。</view>
			<view>3. 本契约所称鉴定物品的“实际价值”，指鉴定物品本身的价值，不包括其可能获得的收益、利润、实际用途，或在市场上任何直接，间接损失，或特殊行业价值损失。</view>
			<view>4. BAN对于故意诋毁BAN鉴定服务的用户有权停止其使用BAN任何服务，采取封禁账号或设备处理;恶意诽谤、情节严重导致BAN声誉受损者, BAN有权保留证据用于损害赔偿诉状。</view>
		</view>
		<view class="regulations">
			<view>六、商品照片及描述规范</view>
			<view>1. 请用数码相机或其他高清设备在自然光下拍摄（照片不低于800W像素），尽量用背景纸或使用纯色背景拍摄，保证物品在镜头中心位置；</view>
			<view>2. 务必按要求提供整体图、局部细节图等照片。必须保证商品照片未经任何图形图像软件做过处理；</view>
			<view>3. 商品描述必须保证与物品完全一致，把重要细节描述清楚；</view>
			<view>4. 由于照片鉴定的局限性，您拍摄的照片越清晰、色差越小，都会提高鉴定结论的准确性。</view>
		</view>
		<view class="regulations">
			<view>七、部分情况免责声明</view>
			<view>BAN装备鉴定提醒您:在您选择BAN装备鉴定的照片鉴定服务前，请您务必仔细阅读并透彻理解本声明。如果您选择BAN装备鉴定，发生的照片鉴定行为将被视为对本声明全部内容的认可。</view>
			<view>1. 照片不能很好的反应商品本身的重量、手感、密度、光泽、内部结构等物理信息，由此对商品品鉴定结论产生的误差，BAN装备鉴定对此鉴定结论概不负责,亦不承担任何法律责任。</view>
			<view>2. 请务必提供商品的清晰照片，建议采用数码相机或高清手机在自然光线下拍摄(关闭所有滤镜)。如果商品照片因清晰度、角度、色差与实物有较大误差或商品描述与实物不符，BAN装备鉴定对此鉴定结论概不负责,亦不承担任何法律责任。</view>
			<view>3. BAN装备鉴定只对用户提供的商品照片所做鉴定结论负责，关于商品的所有权、商品产生的交易行为, BAN装备鉴定对此不承担任何法律责任。</view>
			<view>4. 对于拼凑图片，假货商家故意使用真假混合图片等扰乱影响鉴定师正常鉴定行为导致的鉴定结论出错，BAN装备鉴定对此概不负责，亦不承担任何法律责任。将无效结论到处宣扬导致BAN声誉受损，情节严重者, BAN有权整理其资料用于扰乱鉴定秩序进行诉讼。</view>
			<view>5. 如果用户对鉴定结论产生疑问，可通过提交工单的方式，或将该商品通过实物鉴定(公测) 鉴定技术开发中心做现场鉴定或科技鉴定。</view>
		</view>
		<view class="regulations">
			<view>八、申请赔付流程</view>
			<view>1. 在鉴定结果公布日起30天内通过该条鉴定贴，点击提交工单，内容为“鉴定失误，申请赔付”并提交相应辅助证明材料及商品实际价值证明材料，BAN会进行相关审核进行二次判断，如确认鉴定结论失误，则会按照赔付标准将赔付金汇入“我的钱包”。</view>
			<view>2. 辅助证明材料仅支持以下几种类型:实物鉴定(公测)鉴定证书、司法鉴定机构鉴定报告、工商局出具商品质量检测报告、正规鉴定机构出具鉴定证书。(鉴定机构出具证书/报告需与该鉴定贴内商品为同一个商品，实物照片需与鉴定贴内照片细节保持一致。)</view>
			<view>3. 实际价值证明材料仅支持以下几种类型:正规交易平台交易订单截图、正规商场购物小票、增值税发票(货号及尺码需与鉴定商品一致)</view>
		</view>
		<view class="regulations">
			<view>九、针对于鉴定失误处理方案</view>
			<view>1. 用户可将问题商品邮寄至平台进行实物鉴定,实物鉴定由业内最顶尖的人士进行鉴定，如实物鉴定与专业鉴定结果不一致， 则实物鉴定费用由平台承担并赔偿相应鉴定失误费用，如实物鉴定与专业鉴定结果一致, 则需用户承担相应费用，并需删除诋毁BAN鉴定的相关内容。</view>
			<view>2. 针对于鉴定失误的商品，BAN会组织相关工作人员通过直播的方式进行讲解鉴定失误原因以推动鉴定行业的发展,进行相关赔付(赔付方案详见第五条)，赔付后会将其商品永久放入BAN鉴定失误馆进行展览。</view>
		</view>
		<view class="regulations">
			<view>十、在鉴定结论公布日起30天内如有疑问可提交工单,超过30天则关闭提交工单权限。</view>
		</view>
		<view class="regulations">
			<view>十一、本契约条款未规定的， 或者本契约条款的规定与国家鉴定服务行业标准政策相冲突的,按照国家相关鉴定服务行业标准政策执行。</view>
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

		view {
			font-size: 26rpx;
		}

		view:nth-of-type(1) {
			font-size: 28rpx;
		}
	}
</style>