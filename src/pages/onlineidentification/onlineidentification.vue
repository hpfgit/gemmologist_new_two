<template>
    <view class="online">
        <view class="wechat">
            <view class="wechat-left">
                <image class="wechat-img" src="../../static/images/二维码@2x.png"></image>
                <view class="wechat-info>">
                    <view class="title">[BAN官方]公众号</view>
                    <view class="desc">预约在线鉴定需关注公众号</view>
                </view>
            </view>
            <view class="wechat-right">
                <image class="wechat-icon" src="../../static/images/关注公众号@2x.png"></image>
            </view>
        </view>
        <view class="lists">
            <view class="list" v-for="(item, index) in lists" :key="index" @tap="goTo(item.id)" :class="{active: !isRequest}">
                <view class="flicker"></view>
                <view class="flicker flicker2"></view>
                <view class="flicker flicker3"></view>
                <view class="flicker flicker4"></view>
                <div class="list-inner">
                    <view class="list-left">
                        <image class="head-img" :src="item.avatar"></image>
                        <view class="list-center">
                            <view class="user-info">
                                <view class="name">{{item.name}}</view>
                                <view class="type">球鞋</view>
                            </view>
                            <view class="types">
                                <view class="item" v-for="(ite, ind) in item.apprs" :key="ind">{{ite.name}}</view>
                            </view>
                        </view>
                    </view>
                    <view class="list-right sjx"></view>
                </div>
            </view>
        </view>
    </view>
</template>

<script>
    import { appraiserList } from "../../api/team";
    const NODE_ENV = process.env.NODE_ENV;
    import config from "../../config";

    export default {
        name: "onlineidentification",
        data() {
            return {
                lists: [
                    {
                        apprs: [
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'}
                        ],
                        avatar: '',
                        name: '鉴定师',
                        id: 0
                    },
                    {
                        apprs: [
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'}
                        ],
                        avatar: '',
                        name: '鉴定师',
                        id: 0
                    },
                    {
                        apprs: [
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'}
                        ],
                        avatar: '',
                        name: '鉴定师',
                        id: 0
                    },
                    {
                        apprs: [
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'}
                        ],
                        avatar: '',
                        name: '鉴定师',
                        id: 0
                    },
                    {
                        apprs: [
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'},
                            {name: '测试'}
                        ],
                        avatar: '',
                        name: '鉴定师',
                        id: 0
                    }
                ],
                isRequest: false
            }
        },
        onLoad() {
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            appraiserList({is_list: 1}).then(result => {
                const arr = [];
                const keys = Object.keys(result.data);
                keys.forEach(key => {
                    if (/[0-9]/gi.test(key)) {
                        let avatar = "";
                        if (/avatar_/gi.test(result.data[key].avatar)) {
                            avatar =
                                config[NODE_ENV].imgUrl +
                                result.data[key].avatar;
                        } else {
                            avatar = this.imgUrl + result.data[key].avatar;
                        }
                        arr.push({
                            appr_ask: result.data[key].appr_ask,
                            level_name: result.data[key].level_name,
                            name: result.data[key].name,
                            bio: result.data[key].bio,
                            avatar: avatar,
                            apprs: result.data[key].data.splice(0,4),
                            id: result.data[key].user_id,
                            level: result.data[key].level,
                            imgs: result.data[key].data,
                            level: result.data[key].level
                        });
                    }
                });
                this.lists = arr;
                uni.hideLoading();
                this.isRequest = true;
                console.log(this.lists);
            });
        },
        methods: {
            goTo(id) {
                uni.navigateTo({
                    url: `/pages/appointment/appointment?id=${id}`
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wechat {
        width: 690rpx;
        height: 136rpx;
        margin: 28rpx auto;
        background-color: #f4f3f9;
        border-radius: 16rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 28rpx;

        .wechat-left {
            display: flex;
        }
        .wechat-img {
            width: 86rpx;
            height: 86rpx;
            margin-right: 24rpx;
        }
        .wechat-icon {
            width: 148rpx;
            height: 40rpx;
        }
        .title {
            font-size: 32rpx;
            color: #000000;
        }
        .desc {
            font-size: 22rpx;
            color: #898989;
            margin-top: 10rpx;
        }
    }
    .list {
        width: 724rpx;
        height: 262rpx;
        margin: 0 auto;
        background-image: url('../../static/images/鉴定师背景@2x.png');
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        overflow: hidden;

        &.active {
            view {
                color: transparent;
            }
            .name, .type {
                background-color: #f4f3f9;
            }
            .flicker {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 99;
                width: 30rpx;
                height: 200%;
                background: linear-gradient(left,transparent,rgba(255,255,255,0.9),transparent);
                animation: flicker 2s infinite;
                transform: translate(-100rpx, -30rpx) rotate(45deg);

                &.flicker2 {
                    animation: flicker 2s infinite 0.5s;
                }
                &.flicker3 {
                    animation: flicker 2s infinite 1s;
                }
                &.flicker4 {
                    animation: flicker 2s infinite 1.5s;
                }
            }

            @keyframes flicker {
                0% {
                    transform: translate(-100rpx, -30rpx) rotate(45deg);
                }
                100% {
                    transform: translate(1000rpx, -30rpx) rotate(45deg);
                }
            }
        }

        .list-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 690rpx;
            margin: 0 auto;
            padding-top: 40rpx;
        }
        .list-left, .user-info {
            display: flex;
        }
        .head-img {
            width: 80rpx;
            height: 80rpx;
            background-color: #000000;
            border-radius: 40rpx;
            margin-left: 28rpx;
            margin-right: 22rpx;
        }
        .name {
            color: #000000;
        }
        .types {
            width: 446rpx;
        }
        .type {
            font-size: 24rpx;
            margin-top: 6rpx;
            margin-left: 10rpx;
            margin-bottom: 22rpx;
        }
        .item, .type {
            color: #37384c;
        }
        .item {
            display: inline-block;
            font-size: 26rpx;
            padding: 10rpx 20rpx;
            background-color: #f4f3f9;
            border-radius: 24rpx;
            margin-bottom: 14rpx;
            margin-right: 10rpx;
        }
        .sjx {
            width: 0;
            height: 0;
            border-left: 20rpx solid #c9c9cd;
            border-top: 12rpx solid transparent;
            border-bottom: 12rpx solid transparent;
            margin-right: 30rpx;
        }
    }
</style>