<template>
    <view class="query">
        <view class="search-container">
            <view class="search">
                <image class="search-img" src="../../static/images/搜索@2x.png"></image>
                <input class="search-input" placeholder="请输入鉴定ID搜索鉴定贴"/>
            </view>
        </view>
        <view class="lists" v-if="lists.length">
            <view class="item" v-for="(item, index) in lists" :key="index">
                <image v-show="item.final_result === 0" class="yinz" :src="qiniuUrl+'为假@2x.png'"></image>
                <image v-show="item.final_result === 1" class="yinz" :src="qiniuUrl+'为真拷贝2@2x.png'"></image>
                <image v-show="item.final_result === 2" class="yinz" :src="qiniuUrl+'无法鉴定拷贝@2x.png'"></image>
                <image v-show="item.final_result === 2" class="yinz" :src="qiniuUrl+'无法鉴定拷贝@2x.png'"></image>
                <image v-show="item.final_result === 3" class="yinz" :src="qiniuUrl+'建议退货@2x.png'"></image>
                <image v-show="item.is_quicken_pay === 1 && item.post_status !== 13" class="yinz jiasu" :src="qiniuUrl+'加速鉴定中@2x.png'"></image>
                <view class="img-box">
                    <image
                        class="left-image"
                        :src="getPath(item.cover_image)"
                        mode="widthFix"
                        @tap="goToDetail(item)"
                    ></image>
                </view>
                <view
                    class="item-right"
                >
                    <view class="top" @tap="goToDetail(item)">
                        <text>{{ item.brand_name }}</text>
                    </view>
                    <view class="center" @tap="goToDetail(item)">
                        <view class="jds" :class="{wait: item.post_status === 10}">鉴定师 <text v-for="(ite, index) in item.user_name" :key="index">{{ite}}</text></view>
                        <view class="date" :class="{hide: item.post_status === 10 || item.post_status === 12 || item.post_status === 11 || item.post_status === 14}">{{ item.publish_at }}</view>
                        <view class="date" :class="{block: item.post_status === 10 || item.post_status === 12 || item.post_status === 11 || item.post_status === 14, hide: item.post_status !== 10 || item.post_status !== 12 || item.post_status !== 11 || item.post_status !== 14}">{{item.status}}</view>
                    </view>
                    <view class="zhifu" v-show="!item.is_show" @tap="goToPay(item)">立即支付</view>
                </view>
            </view>
            <!-- 费用详情 -->
            <view class="price-detail" v-show="isCost">
                <view class="title">费用详情</view>
                <view class="price-box">
                    <image
                        class="close-img"
                        @tap="closeDetails"
                        :src="qiniuUrl+'关闭@2x.png'"
                    ></image>
                    <view class="price">
                        <image
                            :src="qiniuUrl+'01@2x.png'"
                        ></image>
                        <view class="img-number-container">
                            <view class="number">{{
                                details.appraisal_cost
                            }}</view>
                            <view class="yuan">元</view>
                        </view>
                    </view>
                    <view class="total">
                        <image
                            :src="qiniuUrl+'02@2x.png'"
                        ></image>
                        <view class="img-number-container">
                            <view class="number">{{ details.total }}</view>
                            <view class="yuan">元</view>
                        </view>
                    </view>
                    <view class="price">
                        <image
                            :src="qiniuUrl+'03@2x.png'"
                        ></image>
                        <view class="img-number-container">
                            <view class="number">{{ details.appr_cost }}</view>
                            <view class="yuan">元</view>
                        </view>
                    </view>
                </view>
                <view class="tip">*无法鉴定情况下费用会退还至账户余额，可随时提现。</view>
            </view>
        </view>
    </view>
</template>

<script>
import {isAppraiser, getPost} from '../../api';
import config from "../../config/index";
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            lists: [],
            isAppraiser: '',
            is_appraisal_admin: '',
            page: 1,
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl
        }
    },
    onLoad() {
        isAppraiser().then(result => {
            const { is_appraiser, is_appraisal_admin } = result.data;
            this.isAppraiser = is_appraiser;
            this.is_appraisal_admin = is_appraisal_admin;
        });
        getPost({
            page: this.page,
            limit: 10
        }).then(result => {
            const { status, message } = result.data;
            if (status !== 200) {
                uni.showToast({
                    title: message,
                    icon: 'none',
                    mask: true
                });
                return;
            }
            const { data } = result.data;
            data.forEach(item => {
                item.total = item.appr_cost + item.appraisal_cost;
                item.isShow = false;
            });
            this.lists = data;
            uni.hideLoading();
            uni.stopPullDownRefresh();
        });
    },
    methods: {
        getPath(path) {
            return this.imgUrl + path;
        }
    }
}
</script>

<style lang="scss" scoped>
    .query {
        background-color: #f8f8f8;
    }
    .search-container {
        overflow: hidden;
        background-color: #fff;
    }
    .search {
        display: flex;
        align-items: center;
        margin: 20rpx auto;
        position: relative;
    }
    .search, .search-input {
        width: 690rpx;
        height: 70rpx;
        background-color: #f6f6f6;
        border-radius: 35rpx;
        font-size: 26rpx;
    }
    .search-input {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        padding-left: 222rpx;
        box-sizing: border-box;
    }
    .search-img {
        flex: 0 0 23rpx;
        height: 25rpx;
        margin-right: 12rpx;
        margin-left: 186rpx;
        position: relative;
        z-index: 3;
    }
    .lists {
        // display: none;
        margin-top: 46rpx;
        padding-bottom: 24rpx;

        .item {
            display: flex;
            width: 690rpx;
            height: 180rpx;
            border-radius: 20rpx;
            background-color: #ffffff;
            margin: 0 auto 20rpx;
            padding: 20rpx 16rpx;
            position: relative;

            .yinz {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 193rpx;
                height: 137rpx;

                &.jiasu {
                    width: 68rpx;
                    height: 68rpx;
                    right: 40rpx;
                }
            }

            .zhifu {
                position: absolute;
                right: 27rpx;
                bottom: 27rpx;
                width: 158rpx;
                height: 54rpx;
                line-height: 54rpx;
                text-align: center;
                border-radius: 27rpx;
                border: solid 1rpx #898989;
                color: #000;
            }
        }

        .specialty-img {
            width: 44rpx;
            height: 74rpx;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 997;
            margin: auto;
        }

        .img-box {
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .left-image {
            width: 144rpx;
            height: 144rpx;
            border-radius: 4rpx;
        }

        .item-right {
            margin-left: 24rpx;
            flex: 1;

            .top {
                display: flex;
                justify-content: space-between;
                margin-top: 18rpx;

                text {
                    color: #000;
                }

                .date {
                    color: #858585;
                }

                image {
                    width: 22rpx;
                    height: 22rpx;
                    vertical-align: top;
                    margin-top: 9rpx;
                    margin-right: 10rpx;
                }
            }

            .center {
                margin-top: 12rpx;

                view, text {
                    font-size: 22rpx;
                    color: #898989;
                }

                text {
                    margin-left: 6rpx;
                }

                .date {
                    margin-top: 6rpx;
                }
            }

            .bottom {
                margin-top: 14rpx;

                text,
                view {
                    font-size: 22rpx;
                    color: #282828;
                }

                .zy {
                    color: #5e95f4;
                }
            }
        }
    }
    .hide {
        display: none;
    }

    .block {
        display: block;
    }
</style>