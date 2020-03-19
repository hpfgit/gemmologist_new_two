<template>
    <view class="container">
        <scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrolltolower">
            <view class="lists" v-if="lists.length">
                <view class="item" v-for="(item, index) in lists" :key="index">
                    <!-- <image
                        v-if="item.is_specialty"
                        class="specialty-img"
                        :src="qiniuUrl+'费用信息@2x.png'"
                        @tap="priceDetails(index)"
                    ></image> -->
                    <image v-show="item.final_result === 0" class="yinz" :src="qiniuUrl+'为假@2x.png'"></image>
                    <image v-show="item.final_result === 1" class="yinz" :src="qiniuUrl+'为真拷贝2@2x.png'"></image>
                    <image v-show="item.final_result === 2" class="yinz" :src="qiniuUrl+'无法鉴定拷贝@2x.png'"></image>
                    <image v-show="item.final_result === 2" class="yinz" :src="qiniuUrl+'无法鉴定拷贝@2x.png'"></image>
                    <image v-show="item.final_result === 3" class="yinz" :src="qiniuUrl+'建议退货@2x.png'"></image>
                    <image v-show="item.is_quicken_pay === 1 && item.post_status !== 13" class="yinz jiasu" :src="qiniuUrl+'加速鉴定中@2x.png'"></image>
                    <image
                        class="left-image"
                        :src="getPath(item.cover_image)"
                        @tap="goToDetail(item)"
                    ></image>
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
            <nodata v-if="!lists.length" />
        </scroll-view>
    </view>
</template>

<script>
import { getCount, getPost, isAppraiser } from "../../api";
import { post, user_post_list } from "../../api/Identificationdetails";
import nodata from '../../component/nodata/nodata.vue';
import config from "../../config/index";
const NODE_ENV = process.env.NODE_ENV;
let user_id = '';

export default {
    data() {
        return {
            count: "",
            fail: "",
            lists: [],
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            isAppraiser: "",
            is_appraisal_admin: "",
            isShow: false,
            isCost: false,
            isLogin: false,
            details: {},
            is_specialty: '',
            is_bar_mask: false,
            page: 1,
            totalPage: ''
        };
    },
    onLoad(options) {
        user_id = options.user_id;
        this.getData(user_id);
    },
    onPullDownRefresh() {
        this.getData(user_id);
    },
    methods: {
        scrolltolower() {
            if (this.page > this.totalPage) {
                uni.showToast({
                    title: '已经加载全部的数据',
                    icon: 'none'
                });
                return;
            }
            this.page ++;
            this.getData(user_id);
        },
        goToPay(item) {
            let type = '';
            if (item.brand_type === 1) {
                type = 'clothing';
            } else {
                type = 'shoes';
            }
            const {is_specialty,brand_id,user_id, id} = item;
            uni.navigateTo({
                url: '/pages/zy-publicationappraisal4/zy-publicationappraisal4?is_specialty='+is_specialty+'&brand_id='+brand_id+'&appraiser_id='+user_id+'&id='+id+'&type='+type
            });
        },
        getData(user_id) {
            uni.showLoading({
                title: '加载中...',
                icon: 'none',
                mask: true
            });
            user_post_list({
                user_id,
                page: this.page
            }).then(result => {
                const {data, count} = result.data;
                if (this.page > 1) {
                    data.forEach(item => {
                        this.lists.push(item);
                    });
                } else {
                    this.lists = data;
                }
                this.totalPage = Math.ceil(count / 10);
                uni.hideLoading();
            });
        },
        goToLogin() {
            uni.navigateTo({
                url: '/pages/login/login'
            });
        },
        goToData(index) {
            if (index) {
                uni.navigateTo({
                    url: '/pages/moderator/moderator?istype=banzhu'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/gemmologist2/gemmologist2'
                });
            }
        },
        goTeam() {
            uni.navigateTo({
                url: '/pages/team/team'
            });
        },
        priceDetails(index) {
            this.isCost = !this.isCost;
            this.details = this.lists[index];
        },
        closeDetails() {
            this.isCost = !this.isCost;
        },
        goToQuestion() {
            uni.navigateTo({
                url: "/pages/questions/questions"
            });
        },
        goToRZ() {
            // uni.navigateTo({
            //   url: '/pages/identificationarea/identificationarea'
            // });
        },
        getPath(path) {
            return this.imgUrl + path;
        },
        changeId(e) {
            this.jdID = e.target.value;
        },
        searchTo() {
            const that = this;
            const id = that.jdID;
            if (!this.jdID || !/\d/.test(this.jdID)) {
                uni.showToast({
                    title: '请输入鉴定贴id',
                    icon: 'none'
                });
                return;
            }
            that.jdID = '';
            post({
                id
            }).then(result => {
                const {message, status} = result.data;
                if (status === 404) {
                    this.is_bar_mask = true;
                } else {
                    uni.navigateTo({
                        url:
                            "/pages/Identificationdetails3/Identificationdetails3?id=" + id
                    });
                }
            });
        },
        closeBarMask() {
            this.is_bar_mask = false;
        },
        goTo(index) {
            this.isShow = true;
            this.is_specialty = index;
        },
        goToPath(index) {
            const that = this;
            if (index) {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=clothing&title=球鞋',
                    success() {
                        that.isShow = false;
                    }
                });
            } else {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=shoes&title=服装',
                    success() {
                        that.isShow = false;
                    }
                });
            }
        },
        goNav(index) {
            if (index === 1) {
                uni.navigateTo({
                    url: '/pages/freeauthenticationagreement/freeauthenticationagreement'
                });
            } else if (index === 2) {
                uni.navigateTo({
                    url: '/pages/professionalidentificationagreement/professionalidentificationagreement'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/assessment/assessment'
                });
            }
        },
        close() {
            this.isShow = false;
        },
        goToDetail(item) {
            let type = '';
            if (item.brand_type === 0) {
                type = 'shoes';
            } else if (item.brand_type === 1) {
                type = 'clothimg';
            }
            if (item.post_status === 11) {
                uni.navigateTo({
                    url: '/pages/zy-publicationappraisal3/zy-publicationappraisal3?brand_id='+item.brand_id+'&is_specialty='+item.is_specialty+'&appraiser_id='+item.user_id+'&type='+type+'&id='+item.id
                });
            } else {
                uni.navigateTo({
                    url:
                        "/pages/Identificationdetails3/Identificationdetails3?id=" +
                        item.id +
                        "&type=" +
                        item.is_specialty +
                        '&is_appraiser=0'
                });
            }
        }
    },
    components: {
        nodata
    }
};
</script>

<style lang="scss">
.container {
    background-color: #f8f8f8;
}

.scroll-view {
    height: 100vh;
    overflow: hidden;
}

.hide {
    display: none;
}

.block {
    display: block;
}

.lists {
    // display: none;
    margin-top: 24rpx;
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
</style>
