<template>
    <view class="container">
        <scroll-view class="scroll-view" scroll-y="true" @scrolltolower="scrolltolower">
            <view class="lists" v-if="lists.length">
                <view
                    class="item"
                    v-for="(item, index) in lists"
                    :key="index"
                    @tap="gotoDetails(item)"
                >
                    <!-- <image
                        v-if="item.is_specialty"
                        class="specialty-img"
                        src="../../static/images/费用信息@2x.png"
                        @tap="priceDetails(index)"
                    ></image> -->
                    <image
                        v-show="item.final_result === 0"
                        class="yinz"
                        src="../../static/images/为假@2x.png"
                    ></image>
                    <image
                        v-show="item.final_result === 1"
                        class="yinz"
                        src="../../static/images/为真拷贝2@2x.png"
                    ></image>
                    <image
                        v-show="item.final_result === 2"
                        class="yinz"
                        src="../../static/images/无法鉴定拷贝@2x.png"
                    ></image>
                    <image v-show="item.final_result === 3" class="yinz" :src="qiniuUrl+'建议退货@2x.png'"></image>
                    <image v-show="item.is_quicken_pay === 1 && item.post_status !== 13" class="yinz jiasu" :src="qiniuUrl+'加速鉴定中@2x.png'"></image>
                    <image
                        class="left-image"
                        :src="getPath(item.cover_image)"
                    ></image>
                    <view
                        class="item-right"
                    >
                        <view class="top">
                            <text>{{ item.brand_name }}</text>
                        </view>
                        <view class="center">
                            <view style="display: none;" class="jds"
                                >鉴定师
                                <text
                                    v-for="(ite, index) in item.user_name"
                                    :key="index"
                                    >{{ ite }}</text
                                ></view
                            >
                            <view
                                class="date"
                                :class="{
                                    hide:
                                        item.final_result === 10 ||
                                        item.final_result === 12
                                }"
                                >{{ item.created_at }}</view
                            >
                            <view
                                class="date"
                                :class="{
                                    block:
                                        item.final_result === 10 ||
                                        item.final_result === 12,
                                    hide:
                                        item.final_result !== 10 ||
                                        item.final_result !== 12
                                }"
                                >{{ item.created_at }} 发布</view
                            >
                        </view>
                    </view>
                </view>
            </view>
            <nodata v-if="!lists.length" />
        </scroll-view>
    </view>
</template>

<script>
import { work_order, all, newAppraiseDetails } from "../../api/means2";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
import nodata from '../../component/nodata/nodata.vue';
let totalPage = '';


export default {
    data() {
        return {
            lists: [],
            imgPath: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            type: "",
            mold: "",
            page: 1
        };
    },
    onLoad(options) {
        const { type, title } = options;
        uni.setNavigationBarTitle({
            title
        });
        this.type = type;
        this.getData();
    },
    onPullDownRefresh() {
        this.page = 1;
        this.getData();
    },
    methods: {
        scrolltolower() {
            this.page ++;
            if (this.page > totalPage) {
                uni.showToast({
                    title: '已经加载全部的数据',
                    icon: 'none',
                });
                return;
            }
            this.getData();
        },
        getData() {
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            newAppraiseDetails({
                page: this.page,
                type: this.type
            }).then(result => {
                const { data, count } = result.data;
                if (this.page > 1) {
                    data.forEach(element => {
                        this.lists.push(element);
                    });
                } else {
                    this.lists = data;
                }
                totalPage = Math.ceil(count / 10);
                uni.hideLoading();
                uni.stopPullDownRefresh();
            });
        },
        getPath(path) {
            if (/avatar_/gi.test(path)) {
                return config[NODE_ENV].imgUrl + path;
            } else {
                return config[NODE_ENV].imgUrl + path;
            }
        },
        gotoDetails(item) {
            const that = this;
            if (this.type === 'djd') {
                uni.navigateTo({
                    url:
                        "../Identificationdetails2/Identificationdetails2?id=" +
                        item.id +
                        "&type=" +
                        this.type +
                        "&mold=" +
                        item.is_specialty +
                        "&isJD=true&is_appraiser=1"
                });
                return;
            }
            uni.navigateTo({
                url:
                    "../Identificationdetails3/Identificationdetails3?id=" +
                    item.id +
                    "&type=" +
                    this.type +
                    "&mold=" +
                    item.is_specialty +
                    "&isJD=true&is_appraiser=1"
            });
        }
    },
    components: {
        nodata
    }
};
</script>

<style lang="scss">
.scroll-view {
    height: 100vh;
}
.hide {
    display: none;
}

.block {
    display: block;
}
.lists {
    padding-top: 24rpx;
    padding-bottom: 24rpx;

    .item {
        display: flex;
        width: 690rpx;
        height: 180rpx;
        border-radius: 10rpx;
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
            margin-top: 22rpx;

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
            margin-top: 6rpx;

            view,
            text {
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
