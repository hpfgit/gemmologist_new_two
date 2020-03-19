<template>
    <view class="container">
        <image class="con-bg-img" src="../../static/images/整个页面渐变背景白@2x.png"></image>
        <view class="navs">
            <view class="nav" @tap="goNav(0)">
                <image :src="qiniuUrl+'考核@2x.png'"></image>
                <view class="text">试题测试</view>
            </view>
            <view class="nav" @tap="goNav(1)">
                <image :src="qiniuUrl+'极速@2x.png'"></image>
                <view class="text">极速鉴定声明</view>
            </view>
            <view class="nav" @tap="goNav(2)">
                <image :src="qiniuUrl+'￥@2x.png'"></image>
                <view class="text">保价鉴定声明</view>
            </view>
        </view>
        <view class="infos" @tap="goTeam">
            <view class="left">
                <image :src="qiniuUrl+'首页logo@2x.png'"></image>
                <view class="user-info">
                    <view class="username">BAN鉴定服务</view>
                    <view class="userinfo">高端鉴定服务开创者</view>
                </view>
            </view>
            <view class="right">
                <div class="text">鉴定团队</div>
                <image :src="qiniuUrl+'向右2@2x.png'"></image>
            </view>
        </view>
        <view class="box">
            <image class="bg-img" src="../../static/images/鉴定背景带阴影@2x.png"></image>
            <view class="inner">
                <view class="data-display">
                    <view class="data-display-two" @tap="goToQuestion">
                        <view>鉴定流程及常见问题</view>
                        <image
                            class="icon"
                            :src="qiniuUrl+'-@2x.png'"
                        ></image>
                    </view>
                    <view @tap="goToRZ">
                        <view class="data-display-one">
                            <text class="text">
                                已鉴定
                                <text class="number">{{ count }}</text>
                                次
                            </text>
                        </view>
                        <view class="data-display-one">
                            <text class="text">
                                假货市场占有率
                                <text class="number">{{ fail }}</text>
                                %
                            </text>
                        </view>
                    </view>
                </view>
                <view class="zm">
                    <view class="gn">
                        <view class="js" @tap="goTo(1)"></view>
                        <view class="bj" @tap="goToPath(6)"></view>
                    </view>
                    <view class="gn">
                        <view class="bj bj2" @tap="goTo(2)"></view>
                    </view>
                    <view class="search">
                        <input
                            type="text"
                            :value="jdID"
                            placeholder="请输入您的鉴定ID"
                            @input="changeId($event)"
                        />
                        <view @tap="searchTo" class="search-btn">
                            查询鉴定
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="search-mask" v-show="is_bar_mask">
            <view class="title">提示</view>
            <!-- <image class="close-img" @tap="closeBarMask" :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"></image> -->
            <view class="cont">鉴定贴不存在，请检查鉴定ID是否正确</view>
            <view class="btn-yes" @tap="closeBarMask">确定</view>
        </view>
        <view class="subscribe">
            <view class="inner">
                <view class="title">微信消息订阅</view>
                <view class="right" @tap="subscribe">
                    <view class="text">开启</view>
                    <image :src="qiniuUrl+'向右2@2x.png'"></image>
                </view>
            </view>
        </view>
        <view class="gemmologist-container">
            <view class="gemmologist-inner">
                <view class="gemmologist">
                    <view class="left">
                        <image class="head-img" src="../../static/images/图层968@2x.png"></image>
                        <view class="info">
                            <view class="name">名字名字</view>
                            <view class="level-explain"></view>
                        </view>
                    </view>
                    <view class="right">
                        <view class="signin">
                            <image class="signin-icon" src="../../static/images/经验icon@2x.png"></image>
                            签到+10
                        </view>
                    </view>
                </view>
                <view class="level-progress">
                    <view class="level-item">
                        <view class="num">0</view>
                        <view class="font">普卡</view>
                        <view class="line"></view>
                        <view class="line2"></view>
                    </view>
                    <view class="level-item">
                        <view class="num">1000</view>
                        <view class="font">金卡</view>
                        <view class="line"></view>
                        <view class="line2"></view>
                    </view>
                    <view class="level-item">
                        <view class="num">2000</view>
                        <view class="font">钻卡</view>
                        <view class="line"></view>
                        <view class="line2"></view>
                    </view>
                    <view class="level-item">
                        <view class="num">3000</view>
                        <view class="font">黑卡</view>
                        <view class="line"></view>
                        <view class="line2"></view>
                    </view>
                </view>
            </view>
        </view>
        <!-- <view class="selector-end" :class="{hide: !isAppraiser && !is_appraisal_admin, block: isAppraiser || is_appraisal_admin}"> -->
            <!-- <view class="inner">
                <view class="left" @tap="goToData(0)" :class="{hide: !isAppraiser, block: isAppraiser}">
                    <image :src="qiniuUrl+'鉴定师端拷贝@2x.png'"></image>
                </view>
                <view class="right" @tap="goToData(1)" :class="{hide: !is_appraisal_admin, block: is_appraisal_admin}">
                    <image :src="qiniuUrl+'版主端拷贝@2x.png'"></image>
                </view>
            </view> -->
        <!-- </view> -->
        <view class="login" @tap="goToLogin" :class="{hide: isLogin, block: !isLogin}">
            <view class="login-btn">
                登录查看我的鉴定
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
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'球鞋2@2x.png'"
                            ></image>
                        </view>
                        <view class="text">球鞋</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="goToPath(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'服饰2@2x.png'"
                            ></image>
                        </view>
                        <view class="text">服饰</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="goToPath(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'手表@2x.png'"
                            ></image>
                        </view>
                        <view class="text">手表</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="goToPath(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'奢侈品@2x.png'"
                            ></image>
                        </view>
                        <view class="text">奢侈品</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
                <view class="list" @tap="goToPath(1)">
                    <view class="list-left">
                        <view class="img-box">
                            <image
                                class="shoes-img"
                                :src="qiniuUrl+'美妆@2x.png'"
                            ></image>
                        </view>
                        <view class="text">美妆</view>
                    </view>
                    <view class="list-right">
                        <image class="more-icon" :src="qiniuUrl+'更多@2x.png'"></image>
                    </view>
                </view>
            </view>
        </view>
<!--        <form @submit="handlePush" report-submit='true'>-->
<!--            <button formType="submit">推送消息</button>-->
<!--        </form>-->
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
        <view class="mask" v-show="isShow || is_bar_mask" @tap="mask"></view>
    </view>
</template>

<script>
import { getCount, getPost, isAppraiser } from "../../api";
import { post } from "../../api/Identificationdetails";
import config from "../../config/index";
const NODE_ENV = process.env.NODE_ENV;
const app = getApp();

export default {
    data() {
        return {
            jdID: '',
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
    onLoad() {
        this.getData();
    },
    onShareAppMessage(result) {
        if (result.from === "button") {
            console.log(result.target);
        }
        return {
            title: "BAN鉴定服务小程序",
            path: "/pages/index3/index3",
            imageUrl: "",
            desc: "",
            success() {
                uni.showToast({
                    title: "分享成功",
                    icon: "none"
                });
            }
        };
    },
    onPullDownRefresh() {
        this.getData();
    },
    methods: {
        mask() {
            this.isShow = !this.isShow;
        },
        subscribe() {
            uni.requestSubscribeMessage({
                tmplIds: ['KVMsZ3xeGVkxz4DLw4poSX77Zy0SCFoKOFuP91NY9q0'],
                success() {
                    console.log('订阅消息');
                },
                fail() {
                    console.log('订阅失败');
                }
            });
        },
        handlePush(e) {
            const openid = uni.getStorageSync('openid');
            const formid = [];
            formid.push({formid: e.detail.formId, ts: 5});
            app.globalData.templateMessage({formid, openid}).then(res => {
                console.log(res);
            });
        },
        isLoginFn() {
            if (uni.getStorageSync('openid') && uni.getStorageSync('token') && uni.getStorageSync('user_info')) {
                return true;
            } else {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });
                return false;
            }
        },
        goToPay(item) {
            if (!this.isLoginFn()) {
                return;
            }
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
        getData() {
            this.isLogin = !!uni.getStorageSync('token');
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            getCount().then(result => {
                const { count, fail } = result.data;
                this.count = count;
                this.fail = fail.substring(0, fail.length - 1);
                uni.hideLoading();
                uni.stopPullDownRefresh();
            });
            if (this.isLogin) {
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
            }
        },
        goToLogin() {
            uni.redirectTo({
                url: '/pages/login/login'
            });
        },
        goToData(index) {
            if (!this.isLoginFn()) {
                return;
            }
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
            if (!this.isLoginFn()) {
                return;
            }
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
            if (!this.isLoginFn()) {
                return;
            }
            const that = this;
            if (!this.jdID || !/\d/.test(this.jdID)) {
                uni.showToast({
                    title: '请输入鉴定贴id',
                    icon: 'none'
                });
                return;
            }
            post({
                id: that.jdID
            }).then(result => {
                const {message, status} = result.data;
                if (status === 404) {
                    this.is_bar_mask = true;
                } else {
                    uni.navigateTo({
                        url:
                            "/pages/Identificationdetails3/Identificationdetails3?id=" + that.jdID
                    });
                }
            });
        },
        closeBarMask() {
            this.is_bar_mask = false;
        },
        goTo(index) {
            if (!this.isLoginFn()) {
                return;
            }
            this.isShow = true;
            this.is_specialty = index;
        },
        goToPath(index) {
            if (!this.isLoginFn()) {
                return;
            }
            const that = this;
            if (index === 1) {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=clothing&title=球鞋',
                    success() {
                        that.isShow = false;
                    }
                });
            } else if (index === 0) {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=shoes&title=服装',
                    success() {
                        that.isShow = false;
                    }
                });
            } else if (index === 6) {
                uni.navigateTo({
                    url: '/pages/onlineidentification/onlineidentification'
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
                if (!this.isLoginFn()) {
                    return;
                }
                uni.navigateTo({
                    url: '/pages/assessment/assessment'
                });
            }
        },
        close() {
            this.isShow = false;
        },
        goToDetail(item) {
            if (!this.isLoginFn()) {
                return;
            }
            let type = '';
            if (item.brand_type === 0) {
                type = 'shoes';
            } else if (item.brand_type === 1) {
                type = 'clothing';
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
        },
        onShow() {
            this.jdID = "";
        }
    }
};
</script>

<style lang="scss">
.container {
    background-color: #f8f8f8;
    position: relative;

    .con-bg-img {
        width: 750rpx;
        height: 1426rpx;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }
}
.gemmologist-container {
    background-color: #fff;
    position: relative;
    z-index: 10;

    .gemmologist-inner {
        width: 690rpx;
        height: 218rpx;
        margin: 0 auto;
        background-image: url('../../static/images/会员信息bg@2x.png');
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 16px;
        padding: 30rpx;
    }
}
.gemmologist {
    display: flex;
    justify-content: space-between;

    .head-img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
        margin-right: 18rpx;
    }
    .left {
        display: flex;
    }
    .name {
        font-size: 26rpx;
        color: #000;
    }
    .level-explain {
        width: 128rpx;
        height: 32rpx;
        background-image: url('../../static/images/等级说明@2x.png');
        background-size: cover;
        background-repeat: no-repeat;
        margin-top: 8rpx;
    }
    .explain-img {
        width: 10rpx;
        height: 16rpx;
        margin-left: 6rpx;
    }
    .signin {
        width: 160rpx;
        height: 52rpx;
        background-color: rgba(243, 182, 95, 0.3);
        border-radius: 26rpx;
        font-size: 22rpx;
        color: #160b1b;
        display: flex;
        align-items: center;
        justify-content: center;

        .signin-icon {
            width: 34rpx;
            height: 34rpx;
            margin-right: 8rpx;
            vertical-align: middle;
        }
    }
}
.level-progress {
    display: flex;
    justify-content: space-between;
    margin-top: 24rpx;

    .level-item {
        position: relative;
        text-align: center;
        
        .font {
            font-size: 20rpx;
            color: rgba(228, 185, 124, 1);
            margin-top: 8rpx;
        }

        &:nth-of-type(1) {
            .num {
                width: 24rpx;
            }
            .line {
                left: 24rpx;
                width: 172rpx;
            }
        }
        &:nth-of-type(4) {
            .line,.line2 {
                width: 0;
            }
        }
        .num {
            font-size: 14rpx;
            color: #fff;
            text-align: center;
            width: 40rpx;
            height: 24rpx;
            line-height: 26rpx;
            background-color: rgba(228, 185, 124, 1);
            border-radius: 12rpx;
            position: relative;
            z-index: 10;
        }
        .line {
            width: 170rpx;
            height: 6rpx;
            background-color: rgba(196, 194, 213, 1);
            border-radius: 3rpx;
            position: absolute;
            top: 10rpx;
            left: 40rpx;
            z-index: 8;
        }
        .line2 {
            width: 62rpx;
            height: 6rpx;
            background-color: rgba(228, 185, 124, 1);
            border-radius: 3rpx;
            position: absolute;
            top: 10rpx;
            left: 0;
            z-index: 9;
        }
    }
}
.hide {
    display: none;
}

.block {
    display: block;
}

.search-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    width: 670rpx;
	height: 342rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
    overflow: hidden;

    .title {
        margin-top: 38rpx;
        margin-bottom: 56rpx;
        text-align: center;
        font-size: 32rpx;
    }

    .cont {
        padding-bottom: 56rpx;
        text-align: center;
        border-bottom: 1rpx solid #fafafa;
        color: #666;
        font-size: 30rpx;
    }

    .btn-yes {
        height: 108rpx;
        line-height: 108rpx;
        text-align: center;
        font-size: 32rpx;
        color: #fc5662;
    }
}

.bg {
    overflow: hidden;
    background-color: #fff;
}

.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.navs {
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 620rpx;
    margin: 48rpx auto 58rpx;

    .nav {
        .text {
            font-size: 24rpx;
            color: #0b0e1b;
        }

        image {
            width: 50rpx;
            height: 56rpx;
            margin-bottom: 24rpx;
        }
    }
}

.subscribe {
    background-color: #fff;
    padding-bottom: 20rpx;
    position: relative;
    z-index: 10;

    .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 690rpx;
        height: 70rpx;
        margin: 0 auto;
        background-color: #f4f3f9;
        border-radius: 16rpx;
        padding-left: 40rpx;
        padding-right: 40rpx;
    }

    .title {
        color: #000;
        font-size: 26rpx;
    }
    .right {
        display: flex;
        align-items: center;
        .text {
            width: 84rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            background-color: rgba($color: #160b1b, $alpha: .5);
            border-radius: 16rpx;
            font-size: 22rpx;
            color: #fff;
        }
    }
    image {
        width: 14rpx;
        height: 24rpx;
        margin-left: 16rpx;
    }
}

.infos {
    display: flex;
    justify-content: space-between;
    width: 690rpx;
    margin: 0 auto;
    padding: 30rpx;
    background-color: #f4f3f9;
    border-radius: 16rpx;
    align-items: center;

    .username {
        font-size: 32rpx;
    }

    .userinfo {
        font-size: 22rpx;
        color: #898989;
    }

    .left {
        image {
            width: 90rpx;
            height: 90rpx;
            margin-right: 18rpx;
        }
    }
    .left,
    .right {
        display: flex;
        align-items: center;
    }
    .right {
        .text {
            background-image: url("../../static/images/圆角矩形7@2x.png");
            background-size: cover;
            width: 124rpx;
            height: 37rpx;
            line-height: 37rpx;
            font-size: 24rpx;
            color: #ffffff;
            text-align: center;
        }
        image {
            width: 14rpx;
            height: 24rpx;
            margin-left: 16rpx;
        }
    }
}

.navs, .infos, .login {
    position: relative;
    z-index: 9;
}

.box {
    position: relative;
    z-index: 9;
    background-color: #fff;

    .bg-img {
        padding: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 742rpx;
        height: 656rpx;
        display: block;
    }

    .inner {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        width: 690rpx;
        margin: 0 auto;
        border-radius: 16rpx;
        padding-top: 24rpx;
    }
}

.data-display {
    overflow: hidden;
    .data-bg {
        width: 726rpx;
        height: 264rpx;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
    }

    .data-display-one {
        position: relative;
        margin-left: 36rpx;
        margin-top: 4rpx;

        .text {
            color: #1f1d29;
            font-size: 28rpx;
            font-weight: bold;
        }

        .number {
            font-size: 48rpx;
            color: #1f1d29;
            margin-right: 6rpx;
            margin-left: 4rpx;
        }
    }

    .data-display-two {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        z-index: 1;
        font-size: 24rpx;
        color: #5e95f4;
        margin-top: 28rpx;
        text-align: right;

        image {
            width: 42rpx;
            height: 26rpx;
            margin-left: 6rpx;
        }
    }
}

.zm {
    .gn {
        margin-top: 36rpx;
        padding-left: 36rpx;
        padding-right: 36rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:nth-of-type(2) {
            margin-top: 10rpx;
        }

        .js,
        .bj {
            width: 292rpx;
            height: 104rpx;
            line-height: 110rpx;
            padding-left: 28rpx;
            background-size: contain;
            background-repeat: no-repeat;
            border-radius: 8rpx;
        }

        .js {
            background-image: url("../../static/images/极速鉴定@2x.png");
        }

        .bj {
            width: 294rpx;
            height: 102rpx;
            background-image: url("../../static/images/在线鉴定@2x.png");
        }

        .bj2 {
            width: 610rpx;
            height: 102rpx;
            background-image: url('../../static/images/保价鉴定@2x.png');
        }
    }

    .search {
        display: flex;
        padding-left: 36rpx;
        padding-right: 36rpx;
        margin-top: 20rpx;

        input {
            width: 610rpx;
            height: 90rpx;
            line-height: 90rpx;
            padding-left: 15rpx;
            background-color: #f4f3f9;
            border-radius: 8rpx;
        }

        .search-btn {
            width: 186rpx;
            height: 90rpx;
            line-height: 90rpx;
            text-align: center;
            background-color: #160b1b;
            border-radius: 8rpx;
            color: #ffffff;
        }
    }

}

.jds {
    &.wait {
        opacity: 0;
    }
}

.selector-end {
    .inner {
        width: 610rpx;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    padding: 30rpx 0 50rpx 0;
    background-color: #fff;

    .left,
    .right {
        text-align: center;
    }

    image {
        width: 290rpx;
        height: 86rpx;
    }
}

.login {
    background-color: #f8f8f8;

    .login-btn {
        width: 340rpx;
        height: 88rpx;
        margin: 88rpx auto;
        line-height: 88rpx;
        background-color: #0b0e1b;
        color: #ffffff;
        opacity: 0.7;
        border-radius: 8rpx;
        text-align: center;
    }
}

.check-type {
    position: fixed;
    bottom: -1081rpx;
    right: 0;
    left: 0;
    z-index: 999;
    width: 750rpx;
    height: 1081rpx;
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
        margin-bottom: 66rpx;
    }

    .classList {
        padding-left: 36rpx;
        padding-right: 36rpx;
    }

    .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 670rpx;
        height: 160rpx;
        border: solid 2rpx rgba(237, 237, 237, 1);
        margin-bottom: 22rpx;
        
        .list-left {
            display: flex;
            align-items: center;
        }
        .img-box {
            width: 66rpx;
            margin-left: 36rpx;
            margin-right: 32rpx;
        }

        .more-icon {
            width: 14rpx;
            height: 20rpx;
            margin-right: 40px;
        }
    }


    .shoes-img {
        width: 68rpx;
        height: 68rpx;
    }
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

.price-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 650rpx;
    height: 510rpx;
    background-color: #ffffff;
    border-radius: 12rpx;
    z-index: 999;
    margin: auto;
    overflow: hidden;

    .close-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 70rpx;
        height: 70rpx;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 70rpx;
    }

    .title {
        position: absolute;
        top: 30rpx;
        width: 100%;
        text-align: center;
    }

    .price-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        display: flex;

        .total {
            margin-top: 40rpx;
            image {
                width: 206rpx;
                height: 386rpx;
            }

            .img-number-container {
                position: absolute;
                top: 198rpx;
                display: flex;
                justify-content: center;
                width: 100%;
            }

            .number {
                font-size: 60rpx;
            }

            .yuan {
                font-size: 24rpx;
                padding-top: 36rpx;
                margin-left: 10rpx;
            }

            .yuan,
            .number {
                color: #ffffff;
            }
        }

        .price,
        .total {
            position: relative;

            .img-0,
            .img-2,
            .img-4,
            .img-8 {
                width: 34rpx;
                height: 40rpx;
            }
            .img-1 {
                width: 24rpx;
                height: 40rpx;
            }
            .img-3 {
                width: 41rpx;
                height: 40rpx;
            }
            .img-5 {
                width: 35rpx;
                height: 40rpx;
            }
            .img-6 {
                width: 32rpx;
                height: 40rpx;
            }
            .img-7 {
                width: 30rpx;
                height: 40rpx;
            }
            .img-9 {
                width: 30rpx;
                height: 40rpx;
            }
        }

        .price {
            margin-top: 108rpx;
            image {
                width: 206rpx;
                height: 238rpx;
            }

            .img-number-container {
                position: absolute;
                top: 128rpx;
                display: flex;
                justify-content: center;
                width: 100%;
            }

            .number {
                font-size: 60rpx;
            }

            .yuan {
                font-size: 24rpx;
                padding-top: 36rpx;
                margin-left: 10rpx;
            }

            .yuan,
            .number {
                color: #30c8ff;
            }
        }
    }
    .tip {
        position: absolute;
        bottom: 40rpx;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        font-size: 22rpx;
        color: #4d4d4d;
    }
}
</style>
