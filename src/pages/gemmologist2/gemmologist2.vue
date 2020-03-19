<template>
    <view class="container">
        <view class="jd">
            <view class="status-box" @tap="show">
                <view class="status" :class="{active: appraise.is_online}">
                    {{ appraise.is_online === 1 ? '在线' : '离线'}} <view class="triangle"></view>
                </view>
            </view>
            <view class="inner">
                <navigator class="box" url="/pages/means4/means4?type=djd&title=待鉴定">
                    <view class="title">
                        待鉴定
                    </view>
                    <view class="info">
                        <image :src="qiniuUrl + '组24@2x.png'" mode=""></image>
                        <text class="number">{{ djd }}</text>
                        <text class="text"></text>
                        <image
                            class="arrow"
                            :src="qiniuUrl+'矩形1187@2x.png'"
                        ></image>
                    </view>
                </navigator>
                <navigator class="box" url="/pages/means4/means4?type=dhf&title=待回复">
                    <view class="title">
                        待回复
                    </view>
                    <view class="info">
                        <image :src="qiniuUrl + '组25@2x.png'" mode=""></image>
                        <text class="number">{{ dhf }}</text>
                        <text class="text"></text>
                        <image
                            class="arrow"
                            :src="qiniuUrl+'矩形1187@2x.png'"
                        ></image>
                    </view>
                </navigator>
            </view>
            <view class="materialbank">
                <text @tap="goTo(5)">素材库</text>
                <text @tap="show">上传素材</text>
            </view>
        </view>
        <view class="modal">
            <view class="box" @tap="goTo(0)">
                <view class="left">
                    <image :src="qiniuUrl+'全部鉴定@2x.png'"></image>
                    <view class="text">全部鉴定</view>
                </view>
                <image
                    class="arrow"
                    :src="qiniuUrl+'矩形12@2x.png'"
                ></image>
                <view class="line"></view>
            </view>
            <view class="box" @tap="goTo(1)">
                <view class="left">
                    <image :src="qiniuUrl+'全部鉴定@2x.png'"></image>
                    <view class="text">失误记录</view>
                </view>
                <image
                    class="arrow"
                    :src="qiniuUrl+'矩形12@2x.png'"
                ></image>
            </view>
        </view>
        <view class="modal">
            <view class="box" @tap="goTo(2)">
                <view class="left">
                    <image :src="qiniuUrl + '/组26@2x.png'"></image>
                    <view class="text">学习资料</view>
                </view>
                <image
                    class="arrow"
                    :src="qiniuUrl+'矩形12@2x.png'"
                ></image>
                <view class="line"></view>
            </view>
            <view class="box" @tap="goTo(3)">
                <view class="left">
                    <image :src="qiniuUrl + '/组29@2x.png'"></image>
                    <view class="text">考核管理</view>
                </view>
                <image
                    class="arrow"
                    :src="qiniuUrl+'矩形12@2x.png'"
                ></image>
                <view class="line"></view>
            </view>
            <view class="box" @tap="goTo(4)">
                <view class="left">
                    <image :src="qiniuUrl + '/组28@2x.png'"></image>
                    <view class="text">提现管理</view>
                </view>
                <image
                    class="arrow"
                    :src="qiniuUrl+'矩形12@2x.png'"
                ></image>
            </view>
        </view>
        <view class="mask" v-show="isShow"></view>
        <view class="change-status-box" v-show="isShow">
            <view class="title">切换状态</view>
            <image class="close" @tap="close" :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"></image>
            <view class="status-list">
                <view class="item" @tap="changeStatus(0)">
                    <view class="circle active"></view>
                    <view class="text">在线</view>
                    <view class="checked" v-show="statusIndex === 0">
                        <image class="checked-img" src="../../static/images/对号@2x.png"></image>
                    </view>
                </view>
                <view class="item" @tap="changeStatus(1)">
                    <view class="circle"></view>
                    <view class="text">离线</view>
                    <view class="checked" v-show="statusIndex === 1">
                        <image class="checked-img" src="../../static/images/对号@2x.png"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="check-type" :class="{'active': isShow}">
            <view class="title">选择鉴定品类</view>
            <view class="close-box"
                @tap="close"
            >
                <image
                    :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"
                    class="close-img"
                ></image>
            </view>
            <view class="classList">
                <view class="list" @tap="goToPath(0)">
                    <image
                        class="shoes-img"
                        :src="qiniuUrl+'球鞋@2x.png'"
                    ></image>
                    <view class="text">球鞋</view>
                </view>
                <view class="list" @tap="goToPath(1)">
                    <image
                        class="clothing-img"
                        :src="qiniuUrl+'服饰@2x.png'"
                    ></image>
                    <view class="text">服饰</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { appraise, newAppraise, uploadMaterial } from "../../api/gemmologist";
import { banzhu_appraise_num, banzhu_appraise, changeOnline } from "../../api/moderator";
import { appraiserDetail } from "../../api/publicationappraisal";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
    data() {
        return {
            freeAdmission: {},
            major: {},
            major2: {},
            major3: {},
            work_order: 0,
            all: 0,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            all: 0,
            dhf: 0,
            djd: 0,
            jdz: 0,
            appraise: {},
            isShow: false,
            statusIndex: '',
            is_specialty: 1
        };
    },
    onLoad() {
        const userinfo = uni.getStorageSync("user_info");
        appraiserDetail({
            id: userinfo.id
        }).then(result => {
            const obj = {};
            const keys = Object.keys(result.data);
            keys.forEach(key => {
                if (/[0-9]/gi.test(key)) {
                    obj['is_online'] = result.data[key].is_online;
                }
            });
            if (obj.is_online === 1) {
                this.statusIndex = 0;
            } else {
                this.statusIndex = 1;
            }
            this.appraise = obj;
        })
        this.getData();
    },
    onPullDownRefresh() {
        this.getData();
    },
    methods: {
        uploadMaterial() {
            uploadMaterial({
                
            }).then(res => {
                console.log(res);
            });
        },
        goToPath(index) {
            // if (!this.isLoginFn()) {
            //     return;
            // }
            const that = this;
            if (index) {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=clothing&title=球鞋&material=true',
                    success() {
                        that.isShow = false;
                    }
                });
            } else {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=shoes&title=服装&material=true',
                    success() {
                        that.isShow = false;
                    }
                });
            }
        },
        show() {
            this.isShow = true;
        },
        close() {
            this.isShow = false;
        },
        changeStatus(index) {
            this.statusIndex = index;
            uni.showLoading({
                title: '加载中...',
                icon: 'none',
                mask: true
            });
            if (this.appraise.is_online === 1) {
                this.appraise.is_online = 0;
            } else {
                this.appraise.is_online = 1;
            }
            changeOnline({
                is_online: this.appraise.is_online
            }).then(result => {
                this.isShow = false;
                const {message} = result.data;
                uni.showToast({
                    title: message,
                    icon: 'none'
                });
                uni.hideLoading();
            });
        },
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        anError() {
            uni.navigateTo({
                url: "/pages/faultrecord/faultrecord"
            });
        },
        goTo(index) {
            if (index === 1) {
                uni.navigateTo({
                    url: "/pages/faultrecord/faultrecord?type=all"
                });
            } else if (index === 3) {
                uni.navigateTo({
                    url: '/pages/assessment/assessment'
                });
            } else if (index === 4) {
                uni.navigateTo({
                    url: "/pages/cashwithdrawal/cashwithdrawal?type=all"
                });
            } else if (index === 5) {
                uni.navigateTo({
                    url: '/pages/means6/means6?type=all'
                });
            } else {
                uni.navigateTo({
                    url: "/pages/means2/means2?type=all"
                });
            }
        },
        getData() {
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            newAppraise().then(result => {
                const { data } = result.data;
                const { all, dhf, djd } = data;
                this.all = all;
                this.dhf = dhf;
                this.djd = djd;
                uni.hideLoading();
                uni.stopPullDownRefresh();
            });
        }
    }
};
</script>

<style lang="scss">
.mask,.change-status-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
.mask {
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgba(0,0,0,.5);
}
.materialbank {
    margin-top: 20px;
}
.change-status-box {
    width: 750rpx;
    height: 358rpx;
    background-color: #ffffff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    z-index: 999;

    .title {
        padding-top: 40rpx;
        text-align: center;
    }

    .close {
        width: 24rpx;
        height: 23rpx;
        position: absolute;
        right: 46rpx;
        top: 44rpx;
    }

    .item {
        margin-top: 66rpx;
        display: flex;
        align-items: center;
        padding-left: 20rpx;
        padding-right: 20rpx;
        
        .circle {
            margin-right: 20rpx;
            &.active {
                background-color: #88ef39;
            }
            width: 32rpx;
            height: 32rpx;
            border-radius: 32rpx;
            background-color: #cdcdcd;
        }
    }

    .checked {
        flex: 1;
        text-align: right;
        .checked-img {
            width: 34rpx;
            height: 24rpx;
        }
    }
}
.check-type {
    position: fixed;
    bottom: -454rpx;
    right: 0;
    left: 0;
    z-index: 999;
    width: 750rpx;
    height: 454rpx;
    background-color: #ffffff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    transition: all .3s;
    overflow: hidden;

    &.active {
        bottom: 0;
    }

    .title {
        text-align: center;
        margin-top: 56rpx;
        margin-bottom: 94rpx;
    }

    .classList {
        display: flex;
        justify-content: space-between;
        padding-left: 36rpx;
        padding-right: 36rpx;
    }

    .list {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 314rpx;
        height: 160rpx;
        border: solid 2rpx #ededed;
        margin-bottom: 70rpx;

        image {
            margin-right: 36rpx;
        }
    }


    .shoes-img {
        width: 97rpx;
        height: 50rpx;
    }

    .clothing-img {
        width: 63rpx;
        height: 74rpx;
    }

    .close-img, .close-box {
        width: 24rpx;
        height: 23rpx;
        position: absolute;
        }

        .close-img {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        }

        .close-box {
        top: 60rpx;
        right: 50rpx;
        width: 48rpx;
        height: 48rpx;
        }
}
.jd {
    background-image: url("http://static-stg.tosneaker.com/image/appraisal/bg@2x.png");
    background-size: cover;
    padding: 40rpx 0;

    .status {
        width: 148rpx;
        height: 70rpx;
        border-radius: 35rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #7b7b7b;
        color: #343434;

        &.active {
            background-image: linear-gradient(-90deg, 
            #7ce2be 0%, 
            #4ec99a 100%);
            box-shadow: 0rpx 0rpx 6rpx 0rpx 
            rgba(11, 133, 164, 0.6);
            color: #000;
        }

        .triangle {
            width: 0;
            height: 0;
            border-left: 12rpx solid transparent;
            border-right: 12rpx solid transparent;
            border-top: 8rpx solid #000;
            margin-left: 16rpx;
        }
    }
    navigator {
        box-sizing: border-box;
    }
    .status-box {
        width: 690rpx;
        margin: 0 auto 20rpx;
    }
    .inner {
        display: flex;
        justify-content: space-between;
        width: 690rpx;
        margin: 0 auto;
    }

    .box {
        width: 330rpx;
        height: 176rpx;
        background-color: #ffffff;
        padding: 30rpx;
        border-radius: 16rpx;
    }

    .title {
        font-size: 28rpx;
        color: #898989;
        padding-bottom: 16rpx;
    }

    .info {
        position: relative;
        display: flex;
        align-items: center;

        image {
            width: 70rpx;
            height: 70rpx;
        }

        .arrow {
            width: 12rpx;
            height: 19rpx;
            position: absolute;
            right: 0;
            top: 0;
        }

        .number {
            font-family: PingFang-SC-Regular;
            font-size: 50rpx;
            color: #8b8b8b;
            margin-left: 18rpx;
        }

        .text {
            font-size: 50rpx;
            color: #000;
            margin-left: 16rpx;
        }
    }
}

.modal {
    width: 690rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
    border-radius: 16rpx;
    margin: 20rpx auto;

    image {
        margin-right: 20rpx;
    }

    .box {
        width: 630rpx;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 32rpx 0;
    }

    .line {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 1rpx;
        background-color: #f8f8f8;
        box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
        border-radius: 1rpx;
    }

    .left {
        display: flex;

        image {
            width: 40rpx;
            height: 40rpx;
        }
    }
    .arrow {
        width: 13rpx;
        height: 21rpx;
    }
}
</style>
