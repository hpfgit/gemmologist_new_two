<template>
    <view class="container">
        <div class="info-container">
            <view class="info" :class="{ active: isOpen }">
                <view class="top">
                    <view class="title" @tap="open"
                        >服务项目
                        <image
                            class="arrow"
                            v-show="!isOpen"
                            :src="qiniuUrl+'矩形1@2x - 副本.png'"
                        ></image>
                        <image
                            class="arrow"
                            v-show="isOpen"
                            :src="qiniuUrl+'矩形1@2x - 副本 - 副本.png'"
                        ></image
                    ></view>
                    <view class="img">
                        <image
                            v-if="mold === '0'"
                            :src="qiniuUrl + '/极速鉴定@2x.png'"
                        ></image>
                        <image
                            v-if="mold === '1'"
                            :src="qiniuUrl + '/保价鉴定@2x.png'"
                        ></image>
                    </view>
                    <view class="bj">
                        保价
                    </view>
                    <view class="price"> ￥{{ user_info.price }} </view>
                </view>
                <view class="center">
                    <view class="head">
                        <image :src="avatar"></image>
                    </view>
                    <view class="userinfo">
                        <view class="name">
                            {{ user_info.name }}
                        </view>
                        <view class="bq">
                            {{ user_info.note ? user_info.note : "暂无标签" }}
                        </view>
                    </view>
                    <view class="jd"> 已鉴定 {{ user_info.count }} 双 </view>
                </view>
                <view class="bottom">
                    <view class="tab">
                        <image :src="qiniuUrl + '/个人主页2@2x.png'" @tap="goto(0)"></image>
                        <text>查看主页</text>
                    </view>
                    <view class="tab">
                        <image :src="qiniuUrl + '/记录@2x.png'" @tap="goto(2)"></image>
                        <text>查看记录</text>
                    </view>
                    <view class="tab">
                        <image :src="qiniuUrl + '/备注@2x.png'" @tap="goto(2)"></image>
                        <text>备注标签</text>
                    </view>
                </view>
            </view>
            <view class="info_new">
                <view class="top">
                    <view class="title">{{ data.result }}</view>
                    <image
                        v-show="data.final_result === 1"
                        class="yinz"
                        :src="qiniuUrl+'为真拷贝2@2x.png'"
                    ></image>
                    <image
                        v-show="data.final_result === 0"
                        class="yinz"
                        :src="qiniuUrl+'为假@2x.png'"
                    ></image>
                    <image
                        v-show="data.final_result === 2"
                        class="yinz"
                        :src="qiniuUrl+'无法鉴定拷贝@2x.png'"
                    ></image>
                    <view class="cont"
                        ><image :src="qiniuUrl+'鉴定贴详情底部BANlogo@2x.png'"></image
                        >BAN鉴定合作鉴定师</view
                    >
                </view>
                <view class="bottom" v-for="(item, index) in appraiser" :key="index">
                    <view class="left">
                        <image class="head-img" :src="item.avatar"></image>
                        <view class="right2">
                            <view class="nickname">{{ item.name }}</view>
                            <view class="right">
                                <!-- <image
                                    class="level-img"
                                    :src="qiniuUrl+'矢量智能对象拷贝2@2x.png'"
                                ></image> -->
                                <image v-show="item.level === 4" class="level-img" :class="'cir-'+item.level" :src="qiniuUrl+'鉴定顾问icon@2x.png'"></image>
                                <image v-show="item.level === 3" class="level-img" :class="'cir-'+item.level" :src="qiniuUrl+'高级鉴定师icon@2x.png'"></image>
                                <image v-show="item.level === 2" class="level-img" :class="'cir-'+item.level" :src="qiniuUrl+'鉴定师icon@2x.png'"></image>
                                <view class="level-name">{{ item.level_name }}</view>
                            </view>
                        </view>
                    </view>
                    <view class="right">
                        <view class="text">鉴定提示：{{ item.result_reason ? item.result_reason : '暂无留言' }}</view>
                    </view>
                </view>
            </view>
            <view class="ewm">
                <view class="left">
                    <image :src="qr_code"></image>
                    <view class="desc">
                        <view>识别二维码或微信搜索小程序: BAN鉴定服务</view>
                        <view
                            >输入<text class="number">{{ data.id }}</text
                            >查询此鉴定贴</view
                        >
                    </view>
                </view>
                <view class="right-text" @click="copy">
                    <text class="copy-id">复制ID</text>
                </view>
            </view>
        </div>
        <view class="djd">
            <view class="top">
                <view class="title">
                    {{ JDstatus }}
                </view>
                <image
                    class="bjd-img"
                    :src="qiniuUrl + '/技术支持2@2x.png'"
                ></image>
            </view>
            <view class="bottom">
                {{ hint_top }}
            </view>
        </view>
        <view class="tip">
            微信小程序：BAN装备鉴定，输入
            <text class="text">{{data.id}}</text>
            查询原帖
        </view>
        <view class="content">
            <view class="top">
                <div class="left">
                    <view class="title">
                        {{ data.brand_name }}
                    </view>
                    <view class="beizhu">
                        {{ data.description ? data.description : "暂无备注" }}
                    </view>
                </div>
                <image v-if="data.is_quicken_pay === 0 && data.post_status === 10 && data.is_show === 1 && is_my_post === 1" @tap="accelerate" :src="qiniuUrl+'加速鉴定@2x.png'"></image>
                <view class="accelerate_yes" v-if="data.is_quicken_pay === 1 && data.post_status !== 13 && is_my_post === 1">
                    <image class="accelerate_icon" :src="qiniuUrl+'加速鉴定中@2x.png'"></image>
                    <view class="accelerate_text">加速鉴定中</view>
                </view>
            </view>
            <view class="accelerate" v-show="is_accelerate">
                <view class="title">加速鉴定</view>
                <image class="close" :src="qiniuUrl+'圆角矩形607拷贝@2x.png'" @tap="accelerate"></image>
                <view class="text">加速鉴定需要额外收费3元</view>
                <view class="text">同时您的鉴定工单将会在30分钟内受理</view>
                <view class="btn" @tap="accelerate_yes">￥3  确认支付</view>
            </view>
            <view class="imgs">
                <view
                    class="img-box"
                    v-for="(item, index) in images"
                    :key="index"
                    @tap="previewImage(index)"
                >
                    <view class="img">
                        <image :src="getPath(item.path, item.image)" mode="widthFix"></image>
                    </view>
                    <view class="mark">
                        {{ item.name }}
                    </view>
                </view>
            </view>
            <view class="info_new">
                <view class="bottom">
                    <view class="left">
                        <image class="head-img" :src="avatar"></image>
                        <view class="right2">
                            <view class="nickname">{{ user_info.name }}</view>
                            <view class="right">
                                <view class="level-name"
                                    >{{ user_info.created_at }} 发布</view
                                >
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="work-order">
                <view class="title2">工单记录</view>
                <div class="conte" v-show="order_show">
                    鉴定结论得出后30天内可提交工单，超出时间后无法创建
                </div>
            </view>
            <view class="work-orker-list">
                <view class="order-list" v-for="(item, index) in work_order" :key="index">
                    <view class="left">
                        <image :src="item.avatar"></image>
                    </view>
                    <view class="right">
                        <view class="top">
                            <view class="username">{{item.name}}</view>
                            <view class="date">{{item.created_at}}</view>
                        </view>
                        <view class="contents">{{item.content}}</view>
                    </view>
                </view>
            </view>
            <view class="make-up" @tap="make_up_order" v-if="data.post_status === 13">
                {{is_appraiser === '1' ? '回复工单' : '补充工单'}}
            </view>
            <view v-if="isJD === 'false'" class="gdjl">
                <image :src="qiniuUrl+'Workorderrecord@2x.png'"></image>
            </view>
        </view>
        <view class="fixed-bottom">
            <image :src="qiniuUrl+'底部logo说明@2x.png'"></image>
            <!-- <view class="text">BAN永远不会涉及销售</view>
            <view class="text2">只为提供最公正的鉴定结果</view> -->
            <view class="text3">
                <view class="left">
                    <view class="cir"></view>已鉴定{{count}}次
                </view>
                <view class="right">
                    <view class="cir"></view>假货市场占有率{{fail}}%
                </view>
            </view>
        </view>
        <view class="btns">
            <view
                class="button"
                v-show="!is_start"
                @tap="startJD"
                v-if="isJD !== 'false'"
            >
                开始鉴定
            </view>
            <view
                class="button"
                v-show="!is_start"
                @tap="zj_tr"
                v-if="isJD !== 'false'"
            >
                转交他人
            </view>
        </view>
        <view class="mask" v-show="is_start || is_accelerate || isHandOver"></view>
        <view class="start-jd" v-show="is_start">
            <div class="title">开始鉴定</div>
            <view class="close" @tap="close">
                <image :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"></image>
            </view>
            <view class="progress">
                <view
                    v-for="(item, index) in checks"
                    :key="index"
                    class="status"
                    :class="{ checked: item.checked, check: !item.checked }"
                    @tap="check(index)"
                    >{{ item.text }}
                </view>
            </view>
            <view class="mark" :class="{ bz_fw_mark: checks[2].checked }">
                <view
                    class="bz-fw"
                    v-show="checks[2].checked"
                    :class="{ active: bzFw }"
                    @tap="bz_fw"
                    >不在鉴定范围</view
                >
                <input
                    type="text"
                    :class="{ bz_fw: checks[2].checked }"
                    :placeholder="markPlace"
                    :value="markContent"
                    @change="markText($event)"
                />
            </view>
            <view class="button" @tap="submit">
                确认提交
            </view>
        </view>
        <view class="handover" v-show="isHandOver">
            <view class="title">转交他人</view>
            <view class="close" @tap="zj_close">关闭</view>
            <view class="lists-box">
                <scroll-view class="lists" scroll-x="true">
                    <view
                        class="list"
                        v-for="(item, index) in appraisers"
                        :key="index"
                        @tap="check_appr(index)"
                    >
                        <image
                            v-show="!item.checked"
                            class="icon"
                            :src="qiniuUrl+'对号-加粗@2x.png'"
                        ></image>
                        <image
                            v-show="item.checked"
                            class="icon"
                            :src="qiniuUrl+'对号-加粗2@2x.png'"
                        ></image>
                        <view class="left">
                            <image class="avatar" :src="item.avatar"></image>
                            <image
                                class="level-img"
                                :src="qiniuUrl+'矢量智能对象@2x.png'"
                            ></image>
                        </view>
                        <view class="right">
                            <view class="nickname">{{ item.name }}</view>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="buttons">
                <view class="cancel-btn" @tap="zj_close">
                    取消
                </view>
                <view class="yes-btn" @tap="sub_zj">
                    确认转交
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {
    appraise,
    post,
    changeAppraiser,
    get_wx_code,
    pay_appraisal_quicken,
} from "../../api/Identificationdetails";
import { appraiserList } from "../../api/selectappraiser";
import { pay, postPay } from '../../api/publicationappraisal';
import { getCount } from "../../api";
import config from "../../config";
const NODE_ENV = process.env.NODE_ENV;
let previewImages = [];

export default {
    data() {
        return {
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            imgUrl: config[NODE_ENV].imgUrl,
            details: {},
            markContent: "",
            is_my_post: 0,
            checks: [
                {
                    text: "真",
                    checked: true,
                    number: 1
                },
                {
                    text: "假",
                    checked: false,
                    number: 0
                },
                {
                    text: "需要补图",
                    checked: false,
                    number: 10
                },
                {
                    text: "无法鉴定",
                    checked: false,
                    number: 2
                }
            ],
            images: [],
            user_info: {},
            work_order: [],
            data: {},
            hint_bottom: "",
            hint_top: "",
            appraiser: [],
            operation_name: "",
            is_start: false,
            result: "",
            avatar: "",
            avatar_img: "",
            type: "",
            markPlace: "可添加备注以便以后查看（仅鉴定师可见）",
            bzFw: false,
            mold: "",
            JDstatus: "",
            isJD: "",
            isOpen: false,
            appraisers: [],
            isHandOver: false,
            me: {},
            count: '',
            fail: '',
            id: '',
            is_appraiser: '',
            order_show: false,
            qr_code: '',
            is_accelerate: false
        };
    },
    onLoad(options) {
        uni.showLoading({
            title: '加载中...',
            icon: 'none'
        });
        const { id, type, mold, isJD, is_appraiser } = options;
        this.is_appraiser = is_appraiser;
        this.type = type;
        this.mold = mold;
        this.isJD = isJD;
        this.id = id;
        this.result = 1;
        get_wx_code({
            id,type,is_appraiser
        }).then(result => {
            const {path} = result.data;
            this.qr_code = this.imgUrl + '/' + path;
        });
        getCount().then(result => {
            const { count, fail } = result.data;
            this.count = count;
            this.fail = fail.substring(0, fail.length - 1);
        });
        post({ id }).then(result2 => {
            const {
                images,
                user_info,
                work_order,
                data,
                hint_bottom,
                hint_top,
                operation_name,
                is_my_post
            } = result2.data;
            this.order_show = work_order.length <= 0;
            this.images = images;
            this.is_my_post = is_my_post;
            previewImages = [];
            images.forEach(image => {
                if (image.path) {
                    previewImages.push(this.getPath(image.path));
                } else {
                    previewImages.push(config[NODE_ENV].imgUrl+image.image);
                }
            });
            this.user_info = user_info;
            work_order.forEach(item => {
                if (/avatar_/ig.test(item.avatar)) {
                    item.avatar = config[NODE_ENV].imgUrl + item.avatar;
                } else {
                    item.avatar = config[NODE_ENV].imgUrl + item.avatar;
                }
            });
            this.work_order = work_order;
            this.data = data;
            this.hint_bottom = hint_bottom;
            this.hint_top = hint_top;
            this.operation_name = operation_name;
            this.avatar = config[NODE_ENV].imgUrl + user_info.avatar;
            const keys = Object.keys(data.appraiser);
            const arr = [];
            keys.forEach(key => {
                if (/[0-9]/g.test(key)) {
                    if (/avatar_/ig.test(data.appraiser[key].avatar)) {
                        data.appraiser[key].avatar = config[NODE_ENV].imgUrl + data.appraiser[key].avatar;
                    } else {
                        data.appraiser[key].avatar = config[NODE_ENV].imgUrl + data.appraiser[key].avatar;
                    }
                    arr.push(data.appraiser[key]);
                }
            });
            this.appraiser = arr;
            uni.hideLoading();
        });
    },
    onShareAppMessage(result) {
        if (result.from === "button") {
            console.log(result.target);
        }
        return {
            title: "鉴定贴详情",
            path: "/pages/Identificationdetails3/Identificationdetails3?id="+this.id+"&type="+this.type+"&is_appraiser="+this.is_appraiser,
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
    computed: {
        checkedNumber() {
            const arr = [];
            this.appraisers.forEach(appraiser => {
                if (appraiser.checked) {
                    arr.push(appraiser);
                }
            });
            return arr.length;
        },
        checkedArr() {
            const arr = [];
            this.appraisers.forEach(appraiser => {
                if (appraiser.checked) {
                    arr.push(appraiser);
                }
            });
            return arr;
        }
    },
    methods: {
        goto() {
            if (index === 0) {
                uni.navigateTo({
                url: ''
                });
            } else if (index === 1) {
                uni.navigateTo({
                url: '/pages/means5/means5?user_id='+ this.user_info.user_id
                });
            } else if (index === 2) {
                uni.navigateTo({
                url: ''
                });
            }
        },
        previewImage(index) {
            uni.previewImage({
                current: index,
                urls: previewImages
            });
        },
        accelerate() {
            this.is_accelerate = !this.is_accelerate;
        },
        accelerate_yes() {
            const that = this;
            uni.showLoading({
                title: '加载中...',
                icon: 'none',
                mask: true
            });
            pay_appraisal_quicken({
                post_id: this.data.id,
                amount: 3,
                method: "miniapp",
                driver: "wechat",
                openid: uni.getStorageSync("openid"),
                miniapp_name: "appraisal"
            }).then(result => {
                const { status, message, data } = result.data;
                const pay_no = data.pay_no;
                this.is_accelerate = false;
                if (message === 'Get Wechat API Error:OK该订单已支付') {
                    postPay({
                        pay_no: pay_no,
                        pay_type: 0
                    }).then(result => {
                        const { message, status } = result.data;
                        uni.hideLoading();
                        if (status === 201) {
                            uni.showToast({
                                title: "支付成功",
                                icon: "none",
                                mask: true,
                                success() {
                                uni.redirectTo({
                                    url: "/pages/index3/index3"
                                });
                                }
                            });
                            return;
                        }
                        uni.showToast({
                        title: "支付失败",
                        icon: "none",
                        mask: true,
                        success() {
                            uni.redirectTo({
                            url: "/pages/index3/index3"
                            });
                        }
                        });
                    });
                    return;
                }
                const { pay_info } = result.data.data;
                uni.requestPayment({
                    timeStamp: pay_info.timeStamp,
                    nonceStr: pay_info.nonceStr,
                    package: pay_info.package,
                    signType: pay_info.signType,
                    paySign: pay_info.paySign,
                    success(result) {
                        // if (result.errMsg == "requestPayment:ok") {
                        uni.showLoading({
                            title: "支付中...",
                            icon: "none",
                            mask: true
                        });
                        postPay({
                            pay_no: pay_no,
                            pay_type: 0
                        }).then(result => {
                            const { message, status } = result.data;
                            uni.hideLoading();
                            if (status === 201) {
                                uni.showToast({
                                    title: "支付成功",
                                    icon: "none",
                                    mask: true,
                                    success() {
                                    uni.redirectTo({
                                        url: "/pages/index3/index3"
                                    });
                                    }
                                });
                                return;
                            }
                            uni.showToast({
                                title: "支付失败",
                                icon: "none",
                                mask: true,
                                success() {
                                    uni.redirectTo({
                                        url: "/pages/index3/index3"
                                    });
                                }
                            });
                        });
                        // } else {
                        // uni.showLoading({
                        //     title: "支付失败",
                        //     icon: "none",
                        //     mask: true,
                        //     success() {
                        //     uni.redirectTo({
                        //         url: "/pages/index3/index3"
                        //     });
                        //     }
                        // });
                        // }
                    },
                    fail(e) {
                        if (e.errMsg === "requestPayment:fail cancel") {
                            uni.showToast({
                                title: "支付失败",
                                icon: "none",
                                mask: true,
                                success() {
                                    uni.redirectTo({
                                        url: "/pages/index3/index3"
                                    });
                                }
                            });
                        }
                    }
                });
            });
        },
        copy() {
            uni.setClipboardData({
                data: this.id,
                success() {
                    console.log('设置成功');
                }
            });
        },
        make_up_order() {
            uni.navigateTo({
                url: '/pages/workOrder/workOrder?id='+this.id+'&is_appraiser='+this.is_appraiser
            });
        },
        zj_tr() {
            this.isHandOver = true;
        },
        zj_close() {
            this.isHandOver = false;
        },
        sub_zj() {
            if (this.checkedNumber <= 0) {
                uni.showToast({
                    title: "请选择鉴定师",
                    icon: "none"
                });
                return;
            }
            changeAppraiser({
                post_id: this.data.id,
                new_appraiser_id: this.checkedArr[0].appr_id
            }).then(result => {
                const that = this;
                const { message, status } = result.data;
                uni.showToast({
                    title: message,
                    icon: "none",
                    duration: 1500,
                    success() {
                        uni.navigateBack({
                            delta: 1
                        });
                    }
                });
            });
        },
        check_appr(index) {
            if (this.checkedNumber >= 1) {
                this.checkedArr.forEach(item => {
                    if (index === item.index) {
                        this.appraisers[index].checked = !this.appraisers[index]
                            .checked;
                    }
                });
                return;
            }
            this.appraisers[index].checked = !this.appraisers[index].checked;
        },
        open() {
            this.isOpen = !this.isOpen;
        },
        getPath(path, image) {
            if (path) {
                return config[NODE_ENV].imgUrl + path;
            } else {
                return config[NODE_ENV].imgUrl + image;
            }
        },
        check(index) {
            this.checks.forEach(check => {
                check.checked = false;
            });
            this.markPlace = "可添加备注以便以后查看（仅鉴定师可见）";
            if (index === 1) {
                this.markPlace = "请输入补图位置";
            }
            this.checks[index].checked = true;
            this.result = this.checks[index].number;
        },
        markText(e) {
            this.markContent = e.target.value;
        },
        startJD() {
            this.is_start = true;
        },
        close() {
            this.is_start = false;
            this.markContent = "";
        },
        bz_fw() {
            this.bzFw = !this.bzFw;
        },
        submit() {
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            const that = this;
            const params = {
                result: this.result,
                brand_id: this.data.brand_id,
                id: this.data.id,
                add_status: this.result === 10 ? 1 : 0
            };
            if (this.result === 10) {
                params.need_image = this.markContent;
            } else {
                params.result_reason = this.markContent;
            }
            appraise(params).then(result => {
                uni.hideLoading();
                uni.showToast({
                    title: "提交成功",
                    success() {
                        uni.navigateBack({
                            delta: 1
                        });
                    }
                });
            });
        }
    }
};
</script>

<style lang="scss">
.container {
    background-color: #fff;
}

.handover {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
    margin: auto;
    width: 670rpx;
    height: 418rpx;
    background-color: #ffffff;
    border-radius: 16rpx;

    .title {
        font-size: 32rpx;
        text-align: center;
        padding-top: 42rpx;
        padding-bottom: 32rpx;
    }

    .close {
        position: absolute;
        right: 50rpx;
        top: 50rpx;
    }

    .lists-box {
        width: 590rpx;
        margin: 0 auto;
        margin-bottom: 60rpx;
        overflow: hidden;
    }

    .lists {
        width: 100%;
        height: 141rpx;
        white-space: nowrap;
    }

    .list {
        position: relative;
        width: 180rpx;
        height: 141rpx;
        background-color: #f4f3f9;
        border-radius: 16rpx;
        box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
        display: inline-block;
        margin-right: 24rpx;

        .left {
            position: relative;
            width: 70rpx;
            height: 70rpx;
            margin: 16rpx auto 0;
            overflow: hidden;

            .level-img {
                width: 26rpx;
                height: 26rpx;
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }

        .icon {
            width: 32rpx;
            height: 30rpx;
            position: absolute;
            left: 0;
            top: 0;
        }

        .avatar {
            width: 70rpx;
            border-radius: 70rpx;
            height: 70rpx;
        }

        .nickname {
            font-size: 24rpx;
            color: #000000;
            margin-top: 5rpx;
            text-align: center;
        }

        .level {
            display: flex;
            align-items: center;
            margin-top: 6rpx;

            image {
                width: 26rpx;
                height: 26rpx;
            }
            .level-name {
                font-size: 24rpx;
                color: #898989;
                margin-left: 6rpx;
            }
        }
    }
    .buttons {
        display: flex;
        justify-content: space-between;
        width: 590rpx;
        margin: 0 auto;

        .cancel-btn,
        .yes-btn {
            width: 252rpx;
            height: 70rpx;
            line-height: 70rpx;
            border-radius: 12rpx;
            text-align: center;
            font-size: 32rpx;
        }
        .cancel-btn {
            background-color: #e8e8e8;
            color: #898989;
        }
        .yes-btn {
            background-color: #7186f1;
            color: #fff;
        }
    }
}

.info {
    width: 690rpx;
    height: 90rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
    padding: 22rpx 28rpx 28rpx 38rpx;
    margin: 15rpx auto;
    overflow: hidden;
    display: none;

    .arrow {
        width: 21rpx;
        height: 13rpx;
    }

    &.active {
        height: 246rpx;
    }

    .title {
        flex: 1;
        height: 25rpx;
        font-size: 26rpx;
        color: #393939;
        white-space: nowrap;
    }

    .img {
        image {
            width: 122rpx;
            height: 28rpx;
        }
    }
}

.info_new {
    padding: 26rpx 0 0 0;

    .top {
        position: relative;

        .title,
        .text,
        .cont {
            text-align: center;
            color: #2c2c2c;
        }

        .title {
            font-size: 58rpx;
            font-weight: bold;
            padding-top: 30rpx;
        }

        .text {
            font-size: 24rpx;
        }

        .cont {
            font-size: 22rpx;
            padding-top: 12rpx;
            color: #666666;

            image {
                width: 32rpx;
                height: 32rpx;
                border-radius: 8rpx;
                margin-right: 10rpx;
            }
        }

        .yinz {
            position: absolute;
            right: 0;
            top: 0;
            width: 193rpx;
            height: 137rpx;
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        width: 670rpx;
        margin: 0 auto;
        padding-top: 46rpx;
        overflow: hidden;

        &:nth-of-type(3) {
            padding-top: 26rpx;
        }

        .left {
            display: flex;
            align-items: center;

            .head-img {
                width: 70rpx;
                height: 70rpx;
                border-radius: 70rpx;
                margin-right: 8rpx;
            }
        }

        .right {
            display: flex;
            align-items: center;
            font-size: 24rpx;
            color: #000;
        }

        .right2 {
            .right {
                display: flex;
                align-items: center;
                margin-top: 4rpx;
            }
        }

        .level-img {
            width: 28rpx;
            height: 28rpx;
            margin-right: 8rpx;
        }

        .level-name {
            font-size: 22rpx;
            color: #898989;
        }

        .arrow {
            width: 10rpx;
            height: 18rpx;
        }

        .text {
            color: #000000;
            font-size: 24rpx;
        }
    }
}

.ewm {
    width: 670rpx;
    margin: 20rpx auto 0;
    background-color: #f4f3f9;
    border-radius: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .left {
        display: flex;
        align-items: center;
    }

    .desc {
        view {
            font-size: 20rpx;
            color: #666666;

            .number {
                font-size: 20rpx;
                color: #000000;
            }
        }
    }

    image {
        width: 104rpx;
        height: 104rpx;
        border-radius: 6rpx;
        margin: 5px;
        margin-right: 28rpx;
    }

    .right-text {
        width: 46rpx;
        height: 124rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e9e8f3;
        border-radius: 0rpx 10rpx 10rpx 0rpx;

        .copy-id {
            font-size: 20rpx;
            width: 20rpx;
            color: #898989;
        }
    }
}

.fixed-bottom {
    text-align: center;
    overflow: hidden;
    width: 750rpx;
    height: 410rpx;
    position: relative;

    image {
        width: 750rpx;
        height: 410rpx;
        position: absolute;
        left: 0;
        top: 0;
    }

    .text {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 12rpx;
    }

    .text,
    .text2 {
        text-align: center;
        color: #000000;
    }

    .text3 {
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
        bottom: 58rpx;
        left: 0;
        right: 0;

        .cir {
            width: 10rpx;
            height: 10rpx;
            background-color: #cdcdcd;
            border-radius: 3rpx;
            margin-right: 12rpx;
        }
        .right {
            margin-left: 24rpx;
        }
        .right,
        .left {
            display: flex;
            align-items: center;
            color: #666666;
            font-size: 22rpx;
        }
    }
}

.work-order {
    width: 630rpx;
    margin: 0 auto;
    padding-left: 10rpx;
    padding-right: 10rpx;

    .title2 {
        font-size: 34rpx;
        color: #000;
        padding-top: 60rpx;
    }

    .conte {
        font-size: 24rpx;
        color: #898989;
        margin-top: 16rpx;
    }
}

.work-orker-list {
    width: 630rpx;
    margin: 30rpx auto;
    padding-left: 10rpx;
    padding-right: 10rpx;

    .order-list {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rpx;

        &:last-child {
            margin-bottom: 0;
        }

        .left {
            margin-right: 20rpx;
        }

        .right {
            flex: 1;
        }

        image {
            width: 72rpx;
            height: 72rpx;
            border-radius: 72rpx;
        }

        .top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10rpx;

            .username,.date {
                font-size: 26rpx;
            }
        }

        .contents {
            font-size: 22rpx;
            color: #4b525b;
            line-height: 36rpx;
        }
    }
}

.accelerate {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 750rpx;
	height: 423rpx;
	background-color: #ffffff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    margin: auto;
    overflow: hidden;

    .title {
        font-size: 32rpx;
        text-align: center;
        margin-top: 40rpx;
        margin-bottom: 50rpx;
    }

    .close {
        width: 24rpx;
        height: 23rpx;
        position: absolute;
        right: 46rpx;
        top: 46rpx;
    }

    .text {
        font-size: 30rpx;
        color: #000;
        line-height: 44rpx;
        text-align: center;
    }

    .btn {
        width: 670rpx;
        height: 86rpx;
        line-height: 86rpx;
        background-color: #7186f1;
        border-radius: 16rpx;
        margin: 70rpx auto 0;
        text-align: center;
        color: #fff;
        font-size: 32rpx;
    }

}

.accelerate_yes {
    display: flex;
    align-items: center;

    image.accelerate_icon {
        width: 68rpx !important;
        height: 68rpx !important;
        margin-right: 20rpx;
    }

    .accelerate_text {
        color: #666;
    }
}

.make-up {
    width: 240rpx;
	height: 70rpx;
    margin: 0 auto 30rpx;
	background-color: #5e95f4;
	border-radius: 35rpx;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top {
    .bj {
        width: 70rpx;
        height: 32rpx;
        text-align: center;
        line-height: 30rpx;
        background-color: #ff2929;
        border-radius: 16rpx;
        border: solid 1rpx #f32828;
        font-size: 24rpx;
        color: #ffffff;
        margin-left: 26rpx;
    }

    .price {
        margin-left: 10rpx;
    }

    .bjd-img {
        margin-right: 28rpx;
    }
}

.center {
    margin-bottom: 22rpx;

    .head {
        image {
            width: 68rpx;
            height: 68rpx;
            border-radius: 68rpx;
        }
    }

    .userinfo {
        margin-left: 22rpx;

        .name {
            font-size: 26rpx;
            color: #282828;
        }

        .bq {
            margin-top: 10rpx;
            color: #858585;
            font-size: 20rpx;
        }
    }

    .jd {
        flex: 1;
        text-align: right;
        margin-right: 10rpx;
    }
}

.bottom {
    .tab {
        display: flex;
        align-items: center;
        margin-left: 99rpx;

        image {
            margin-right: 14rpx;
        }

        text {
            font-size: 24rpx;
            color: #858585;
        }

        &:nth-of-type(1) {
            margin-left: 0;

            image {
                width: 38rpx;
                height: 31rpx;
            }
        }

        &:nth-of-type(2) {
            image {
                width: 32rpx;
                height: 34rpx;
            }
        }

        &:nth-of-type(3) {
            image {
                width: 28rpx;
                height: 32rpx;
            }
        }
    }
}

.djd {
    display: none;
    background-color: #ffffff;
    padding-top: 24rpx;
    padding-bottom: 36rpx;

    .title {
        font-weight: bold;
        font-size: 40rpx;
        color: #5e95f4;
        margin-left: 38rpx;
        image {
            width: 125rpx;
            height: 40rpx;
        }
    }

    .bjd-img {
        width: 172rpx;
        height: 60rpx;
    }

    .bottom {
        font-size: 24rpx;
        color: #282828;
        margin-left: 28rpx;
    }
}

.tip {
    display: none;
    font-size: 22rpx;
    color: #989898;
    height: 50rpx;
    line-height: 50rpx;
    background-color: #eef1f4;
    text-align: center;

    text {
        display: inline-block;
        width: 90rpx;
        height: 26rpx;
        line-height: 26rpx;
        text-align: center;
        background-color: #989898;
        border-radius: 8rpx;
        font-size: 22rpx;
        color: #ffffff;
    }
}

.desc {
    view {
        &:nth-of-type(2) {
            margin-top: 5rpx;
        }
    }
}

.imgs {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-between;

    .img-box {
        font-size: 22rpx;
        color: #ffffff;
        width: 314rpx;
        height: 314rpx;
        background-color: #ffffff;
        display: inline-block;
        position: relative;
        margin-bottom: 28rpx;
        border-radius: 16rpx;
        overflow: hidden;
        border: dashed 2rpx #e5e5e6;

        .img {
            position: relative;
            width: 314rpx;
            height: 314rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;

            image {
                width: 314rpx;
                // height: 314rpx;
                background-color: #ffffff;
                border-radius: 16rpx;
                // position: absolute;
                // left: 0;
                // top: 0;
            }
        }

        .mark {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 60rpx;
            line-height: 60rpx;
            background-color: rgba($color: #000000, $alpha: 0.3);
            z-index: 3;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 26rpx;
            border-bottom-right-radius: 16rpx;
            border-bottom-left-radius: 16rpx;
        }
    }
}

.content {
    padding-bottom: 60rpx;
    overflow: hidden;
    width: 690rpx;
    margin: 52rpx auto 0;
    background-color: #ffffff;
    border-radius: 8rpx;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        image {
            width: 187rpx;
            height: 68rpx;
        }
    }

    .title {
        font-size: 40rpx;
    }

    .beizhu {
        font-size: 26rpx;
        margin-top: 12rpx;
        margin-bottom: 36rpx;
        color: #898989;
    }
}

.btns {
    width: 670rpx;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 998;
    bottom: 50rpx;
    display: none;
    justify-content: space-around;
}

.button {
    width: 250rpx;
    height: 80rpx;
    margin: 0 auto;
    line-height: 80rpx;
    text-align: center;
    background-image: linear-gradient(
            -90deg,
            #738af9 0%,
            #799bf5 45%,
            #7eabf1 100%
        ),
        linear-gradient(#5e95f4, #5e95f4);
    background-blend-mode: normal, normal;
    box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
    border-radius: 40rpx;
    opacity: 0.9;
    font-size: 28rpx;
    color: #ffffff;
}

.start-jd {
    width: 100%;
    height: 555rpx;
    background-color: #ffffff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;

    .title {
        text-align: center;
        padding-top: 42rpx;
        padding-bottom: 44rpx;
    }

    .close {
        position: absolute;
        right: 34rpx;
        top: 34rpx;
        width: 40rpx;
        height: 40rpx;
        border-radius: 40rpx;
        border: 1rpx solid #666;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
        width: 24rpx;
        height: 23rpx;
        }
    }

    .progress {
        width: 678rpx;
        height: 80rpx;
        background-color: #eef1f4;
        border-radius: 40rpx;
        display: flex;
        margin: 0 auto;

        .status {
            width: 170rpx;
            height: 78rpx;
            line-height: 78rpx;
            text-align: center;
            background-blend-mode: normal, normal;
            border-radius: 39rpx;
            margin-top: 1rpx;

            &.check {
                background-image: none;
                color: #666666;
            }

            &.checked {
                background-image: linear-gradient(
                        -45deg,
                        #5e95f4 0%,
                        #3ba9f7 50%,
                        #11c1fa 100%
                    ),
                    linear-gradient(#5e95f4, #5e95f4);
                color: #ffffff;
            }
        }
    }

    .mark {
        margin: 40rpx auto;
        width: 678rpx;

        &.bz_fw_mark {
            display: flex;
            justify-content: space-between;
        }

        input {
            width: 678rpx;
            height: 90rpx;
            background-color: #f9f9f9;
            border-radius: 10rpx;
            border: solid 1rpx #e7e5e5;
            margin: 0 auto;
            padding-left: 30rpx;
            box-sizing: border-box;
            font-size: 22rpx;

            &.bz_fw {
                width: 466rpx;
                border: solid 1rpx #e7e5e5;
                margin-left: 26rpx;
            }
        }
    }

    .bz-fw {
        width: 186rpx;
        height: 90rpx;
        line-height: 90rpx;
        background-color: #f9f9f9;
        border-radius: 10rpx;
        border: solid 1rpx #e7e5e5;
        font-size: 22rpx;
        text-align: center;
        &.active {
            border: solid 2rpx #5e95f4;
            color: #5e95f4;
        }
    }
}

.mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
}

.gdjl {
    margin-top: 40rpx;
    text-align: center;

    image {
        width: 478rpx;
        height: 114rpx;
    }
}
</style>
