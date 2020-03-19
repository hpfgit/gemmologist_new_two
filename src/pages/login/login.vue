<template>
    <view class="container">
        <image class="login-img" :src="qiniuUrl+'鉴定logo@2x.png'"></image>
        <view class="text">登录BAN鉴定服务</view>
        <view class="text2">只为提供最公正的鉴定结果</view>
        <button
            class="get_user_info"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
        >
            <image class="iphone" :src="qiniuUrl+'微信2@2x.png'"></image>使用微信账号登录
        </button>
        <view class="authorize" v-show="authorize">
            <view class="title">授权手机号码</view>
            <view class="info">为了提供更优质的服务，我们需要您的授权获取您在微信中绑定的手机号码</view>
            <button open-type='getPhoneNumber' @getphonenumber="bindgetphonenumber">
                同意授权
            </button>
        </view>
        <view class="mask" v-show="authorize"></view>
    </view>
</template>

<script>
import request from "../../utils/request.js";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
import { bindMobile } from '../../api/index';

export default {
    data() {
        return {
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            authorize: false,
            page: '',
            is_specialty : '',
            brand_id: '',
            type: ''
        };
    },
    onLoad(options) {
        const {page, is_specialty, brand_id, type} = options;
        this.is_specialty = is_specialty;
        this.brand_id = brand_id;
        this.type = type;
        this.page = page;
        this.checkLogin();
    },
    methods: {
        bindgetphonenumber(e) {
            uni.showLoading({
                title: "登录中...",
                icon: "none"
            });
            const that = this;
            const mobile_info = e.detail;
            uni.getProvider({
                service: "oauth",
                success(res) {
                    const { provider } = res;
                    uni.login({
                        provider: provider[0],
                        success(loginRes) {
                            uni.getUserInfo({
                                success(user_info) {
                                    const { code } = loginRes;
                                    const js_code = code;
                                    const miniapp_name = "appraisal";
                                    bindMobile({
                                        miniapp_name,
                                        js_code,
                                        user_info,
                                        mobile_info
                                    }).then(result => {
                                        const { data, openid } = result.data;
                                        const { token, user_info } = data;
                                        uni.setStorageSync(
                                            "token_start_time",
                                            new Date().getTime()
                                        );
                                        uni.setStorageSync('openid', openid);
                                        that.$store.dispatch("setToken", token);
                                        that.$store.dispatch(
                                            "setUserInfo",
                                            user_info
                                        );
                                        uni.hideLoading();
                                        setTimeout(() => {
                                            let url = "/pages/index3/index3";
                                            if (that.page) {
                                                url = `/${that.page}?is_specialty=${that.is_specialty}&brand_id=${that.brand_id}&type=${that.type}`;
                                            }
                                            uni.redirectTo({
                                                url
                                            });
                                        }, 200);
                                    });
                                },
                                fail() {
                                    uni.hideLoading();
                                }
                            })
                        },
                        fail() {
                            uni.hideLoading();
                        }
                    })
                }
            });
        },
        checkLogin() {
            if (uni.getStorageSync('openid') && uni.getStorageSync('token') && uni.getStorageSync('user_info')) {
                uni.redirectTo({
                    url: "/pages/index3/index3"
                });
            }
        },
        getUserInfo(e) {
            const that = this;
            uni.showLoading({
                title: "登录中...",
                icon: "none"
            });
            uni.getProvider({
                service: "oauth",
                success(res) {
                    const { provider } = res;
                    uni.login({
                        provider: provider[0],
                        success(loginRes) {
                            uni.getUserInfo({
                                success(user_info) {
                                    const { code } = loginRes;
                                    const js_code = code;
                                    const miniapp_name = "appraisal";
                                    request(
                                        "POST",
                                        "/api/wechat/ma/auth/login",
                                        {
                                            miniapp_name,
                                            js_code,
                                            user_info
                                        }
                                    ).then(result => {
                                        const { status } = result.data;
                                        if (status === 401) {
                                            uni.hideLoading();
                                            that.authorize = true;
                                            return;
                                        }
                                        const { data, openid } = result.data;
                                        const { token, user_info } = data;
                                        uni.setStorageSync(
                                            "token_start_time",
                                            new Date().getTime()
                                        );
                                        uni.setStorageSync('openid', openid);
                                        that.$store.dispatch("setToken", token);
                                        that.$store.dispatch(
                                            "setUserInfo",
                                            user_info
                                        );
                                        uni.hideLoading();
                                        setTimeout(() => {
                                            let url = "/pages/index3/index3";
                                            if (that.page) {
                                                url = `/${that.page}?is_specialty=${that.is_specialty}&brand_id=${that.brand_id}&type=${that.type}`;
                                            }
                                            uni.redirectTo({
                                                url
                                            });
                                        }, 200);
                                    });
                                }
                            });
                        },
                        fail(error) {
                            console.log(error);
                            uni.hideLoading();
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
.container {
    text-align: center;
    background-color: #fff;
}
.login-img {
    width: 140rpx;
    height: 140rpx;
    margin-top: 102rpx;
}
.text {
    font-size: 38rpx;
    color: #333333;
    margin-top: 50rpx;
}
.text2 { 
    color: #898989;
    margin-top: 12rpx;
}
.get_user_info {
    width: 630rpx;
	height: 96rpx;
    line-height: 96rpx;
    font-size: 32rpx;
    margin: 144rpx auto 0;
    color: #ffffff;
    text-align: center;
	background-color: #7186f1;
	border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.iphone {
    width: 48rpx;
    height: 37rpx;
    margin-right: 20rpx;
}
.mask,.authorize {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.authorize {
    width: 500rpx;
    height: 500rpx;
    margin: auto;
    background-color: #fff;
    border-radius: 12rpx;
    padding-top: 65rpx;
    z-index: 999;

    .title {
        color: #2c2c2c;
        font-size: 34rpx;
    }
    .info {
        width: 400rpx;
        margin: 60rpx auto;
        color: #666;
        font-size: 26rpx;
        text-align: left;
    }

    button {
        width: 400rpx;
        margin: 0 auto;
        background-color: #7186f1;
        color: #fff;
        border-radius: 60rpx;
    }
}
.mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 998;
}
</style>
