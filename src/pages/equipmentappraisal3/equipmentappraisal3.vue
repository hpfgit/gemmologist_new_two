<template>
    <view class="container">
        <view class="brands" v-show="type === 'shoes'">
            <view class="tabs">
                <view class="active"><text>运动品牌</text></view>
            </view>
            <view class="brand-box">
                <view
                    class="box"
                    v-for="(item, index) in xie"
                    :key="index"
                    @tap="goTo(item.id)"
                >
                    <view class="left">
                        <image
                            class="cover_image"
                            :src="getPath(item.cover_image)"
                        ></image>
                        <view class="name">{{ item.name }}</view>
                    </view>
                    <image
                        class="arrow"
                        :src="qiniuUrl+'矩形12@2x.png'"
                    ></image>
                </view>
            </view>
        </view>
        <view class="brands clothing" v-show="type === 'clothing'">
            <view class="tabs">
                <view @tap="tabs(0)" :class="{ active: tabIndex === 0 }"
                    ><text>运动品牌</text></view
                >
                <view @tap="tabs(1)" :class="{ active: tabIndex === 1 }"
                    ><text>潮流品牌</text></view
                >
            </view>
            <view class="brand-box">
                <view
                    class="box"
                    v-show="tabIndex === 0"
                    v-for="(item, index) in clothing"
                    :key="index"
                    @tap="goTo(item.id)"
                >
                    <view class="left">
                        <image
                            class="cover_image"
                            :src="getPath(item.cover_image)"
                        ></image>
                        <view class="name">{{ item.name }}</view>
                    </view>
                    <image
                        class="arrow"
                        :src="qiniuUrl+'矩形12@2x.png'"
                    ></image>
                </view>
            </view>
        </view>
        <!--		<view class="btn">-->
        <!--			下一步 (1/2)-->
        <!--		</view>-->
    </view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import { brand, clothing } from "../../api/equipmentappraisal";
import config from "../../config";

export default {
    data() {
        return {
            currentIndex: 0,
            xie: [],
            clothing: [],
            imgPath: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            is_specialty: "",
            tabIndex: 0,
            type: ""
        };
    },
    onLoad(options) {
        uni.showLoading({
            title: '加载中...',
            icon: 'none'
        });
        const { is_specialty, type } = options;
        this.is_specialty = is_specialty;
        this.type = type;
        let title = "";
        if (type === "shoes") {
            title = "BAN鉴定 - 球鞋";
        } else if (type === "clothing") {
            title = "BAN鉴定 - 服装";
        }
        uni.setNavigationBarTitle({
            title
        });
        brand({ page: 1, type: 0, limit: 1000 }).then(result => {
            const { data } = result.data;
            this.xie = data;
            uni.hideLoading();
        });
        clothing({ page: 1, type: 1, limit: 1000 }).then(result => {
            const { data } = result.data;
            this.clothing = data;
            uni.hideLoading();
        });
    },
    methods: {
        tabs(index) {
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            this.tabIndex = index;
            if (index) {
                clothing({ page: 1, type: 1, limit: 1000, is_sport: 0 }).then(
                    result => {
                        const { data } = result.data;
                        this.clothing = data;
                        uni.hideLoading();
                    }
                );
            } else {
                clothing({ page: 1, type: 1, limit: 1000 }).then(result => {
                    const { data } = result.data;
                    this.clothing = data;
                    uni.hideLoading();
                });
            }
        },
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        tabNav(index) {
            this.currentIndex = index;
        },
        getPath(path) {
            return this.imgPath + path;
        },
        goTo(id) {
            const that = this;
            if (this.is_specialty === '2') {
                uni.navigateTo({
                    url:
                        "/pages/examination/examination?is_specialty=" +
                        that.is_specialty +
                        "&brand_id=" +
                        id
                });
            } else {
                uni.navigateTo({
                    url:
                        "/pages/examination/examination?is_specialty=" +
                        that.is_specialty +
                        "&brand_id=" +
                        id
                });
            }
        }
    }
};
</script>

<style lang="scss">
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

.navs-box {
    background-color: #fff;
    padding-top: 28rpx;
    display: none;
    .navs {
        width: 690rpx;
        height: 86rpx;
        background-color: #fafafa;
        border-radius: 10rpx;
        border: solid 4rpx #eef1f4;
        margin: 0 auto;
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

            image {
                width: 44rpx;
                height: 23rpx;
                margin-right: 22rpx;
            }

            &:nth-of-type(2) {
                image {
                    width: 40rpx;
                    height: 35rpx;
                }
            }
        }
    }
}

.title {
    padding-left: 36rpx;
}

.brands {
    .brand-box {
        width: 678rpx;
        margin: 20rpx auto 0;
        background-color: #ffffff;
        box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
        border-radius: 16rpx 16rpx 0rpx 0rpx;
        height: 100%;
    }

    .tabs {
        display: flex;
        height: 82rpx;
        padding: 20rpx 40rpx;
        background-color: #ffffff;

        view {
            text {
                font-size: 30rpx;
                color: #cccccb;
            }

            &:nth-of-type(2) {
                margin-left: 66rpx;
            }

            &.active {
                position: relative;
                text {
                    font-size: 34rpx;
                    color: #000000;
                    position: relative;
                    z-index: 3;
                    font-weight: bold;
                }

                &::after {
                    content: "";
                    position: absolute;
                    left: -5%;
                    bottom: 0;
                    margin: auto;
                    z-index: 2;
                    width: 110%;
                    height: 12rpx;
                    background-color: #7089f5;
                }
            }
        }
    }

    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 40rpx;
        padding-right: 40rpx;
        margin-top: 33rpx;
        margin-bottom: 35rpx;

        .left {
            display: flex;
            align-items: center;
        }

        .name {
            margin-left: 40rpx;
            font-size: 30rpx;
        }

        .cover_image {
            width: 90rpx;
            height: 90rpx;
        }

        .arrow {
            width: 13rpx;
            height: 21rpx;
        }
    }
}

.btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 97rpx;
    line-height: 97rpx;
    text-align: center;
    background-image: linear-gradient(
            -90deg,
            #5e95f4 0%,
            #6990f7 39%,
            #738af9 100%
        ),
        linear-gradient(#eef1f4, #eef1f4);
    background-blend-mode: normal, normal;
    font-size: 30rpx;
    color: #eef1f4;
}
</style>
