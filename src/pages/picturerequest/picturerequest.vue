<template>
	<view class="container">
		<image :src="qiniuUrl+'/1.jpg'"></image>
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
	image {
		width: 750rpx;
		height: 11130rpx;
	}
</style>