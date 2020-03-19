<template>
    <view class="container">
        <view class="head">
            <view class="left">
                <image class="icon" :src="cover_image"></image>
                <view class="name">{{info}}</view>
            </view>
            <view class="see" @tap="see">
                查看团队 <image class="arrow" :src="qiniuUrl+'矩形1@2x.png'"></image>
            </view>
        </view>
        <view class="lists">
            <view class="list" v-for="(item, index) in appraisers" :key="index" @tap="check(index)">
                <image v-show="!item.checked" class="icon" :src="qiniuUrl+'对号-加粗@2x.png'"></image>
                <image v-show="item.checked" class="icon" :src="qiniuUrl+'对号-加粗2@2x.png'"></image>
                <view class="left">
                    <image class="avatar" :src="item.avatar"></image>
                </view>
                <view class="right">
                    <view class="nickname">{{item.name}}</view>
                    <view class="level">
                        <image :src="qiniuUrl+'矢量智能对象@2x.png'"></image>
                        <view class="level-name">{{item.level_name}}</view>
                    </view>
                </view>
            </view>
        </view>
        <nodata v-if="!appraisers.length" />
        <view  class="btns">
            <view class="btn-box">
                <!-- <view class="btn" :class="{active: checkedNumber === 1}"  @tap="goTo(1)">
                    <view class="inner">
                        <view class="text">保价鉴定</view>
                        <view class="text2">请选择 {{checkedNumber}}/1 名鉴定师</view>
                    </view>
                </view> -->
                <view class="btn" :class="{active: checkedNumber === 2}"  @tap="goTo(2)">
                    <view class="inner" v-show="checkedNumber < 2">
                        <view class="text">保价鉴定</view>
                        <view class="text2">请选择 {{checkedNumber}}/2 名鉴定师</view>
                    </view>
                    <view class="inner" v-show="checkedNumber === 2">
                        <view class="text">下一步</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {appraiserList} from '../../api/selectappraiser';
import nodata from '../../component/nodata/nodata.vue';
import config from '../../config/index';
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            appraisers: [],
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            info: '',
            cover_image: '',
            brand_id: '',
            type: ''
        }
    },
    onLoad(options) {
        const {brand_id, type} = options;
        this.brand_id = brand_id;
        this.type = type;
        uni.showLoading({
            title: '加载中...',
            icon: 'none',
            mask: true
        });
        appraiserList({
            brand_id
        }).then(result => {
            result.data.cover_image = this.imgUrl + result.data.cover_image;
            const {cover_image, info} = result.data;
            this.cover_image = cover_image;
            this.info = info;
            const arr = [];
            const keys = Object.keys(result.data);
            keys.forEach(key => {
                if (/[0-9]/ig.test(key)) {
                    let avatar = '';
                    if (/avatar_/ig.test(result.data[key].avatar)) {
                        avatar = config[NODE_ENV].imgUrl + result.data[key].avatar;
                    } else {
                        avatar = this.imgUrl + result.data[key].avatar;
                    }
                    arr.push({
                        appr_ask: result.data[key].appr_ask,
                        level_name: result.data[key].level_name,
                        name: result.data[key].name,
                        bio: result.data[key].bio,
                        avatar: avatar,
                        apprs: result.data[key].data,
                        id: result.data[key].user_id,
                        level: result.data[key].level
                    });
                }
            });
            const sortArr = arr.sort((a, b) => {
                return b.level - a.level;
            });
            sortArr.forEach((item, index) => {
                item.checked = false;
                item.index = index;
            });
            this.appraisers = sortArr;
            uni.hideLoading();
        });
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
        see() {
            uni.navigateTo({
                url: '/pages/team/team?brand_id='+this.brand_id
            });
        },
        check(index) {
            if (this.checkedNumber >= 2) {
                this.checkedArr.forEach(item => {
                    if (index === item.index) {
                        this.appraisers[index].checked = !this.appraisers[index].checked;
                    }
                });
                return;
            }
            this.appraisers[index].checked = !this.appraisers[index].checked;
        },
        goTo(index) {
            let appraiser_id = '';
            this.checkedArr.forEach(item => {
                appraiser_id += item.id + ',';
            });
            appraiser_id = appraiser_id.substring(0, appraiser_id.length - 1);
            if (index !== this.checkedNumber) return;
            // if (this.checkedNumber === 1) {
            //     uni.navigateTo({
            //         url: '/pages/zy-publicationappraisal/zy-publicationappraisal?is_specialty=1&brand_id='+this.brand_id + '&appraiser_id=' + appraiser_id
            //     });
            // } else if (this.checkedNumber === 2) {
                uni.navigateTo({
                    url: '/pages/zy-publicationappraisal/zy-publicationappraisal?is_specialty=2&brand_id='+this.brand_id + '&appraiser_id=' + appraiser_id + "&type=" + this.type
                });
            // }
        }
    },
    components: {
        nodata
    }
}
</script>

<style lang="scss">
    .head {
        width: 678rpx;
        height: 100rpx;
        background-color: #ffffff;
        box-shadow: 0rpx 0rpx 20rpx 0rpx 
            rgba(0, 0, 0, 0.04);
        border-radius: 16rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 24rpx auto;
        
        .left {
            display: flex;
            align-items: center;
        }

        .icon {
            width: 90rpx;
	        height: 90rpx;
            margin-left: 19rpx;
            margin-right: 24rpx;
        }
        .arrow {
            width: 13rpx;
            height: 21rpx;
            margin-right: 30rpx;
            margin-left: 10rpx;
        }
    }

    .lists {
        width: 678rpx;
        margin: 0 auto 400rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .list {
        position: relative;
        width: 326rpx;
        height: 130rpx;
        margin-bottom: 24rpx;
        background-color: #ffffff;
        box-shadow: 0rpx 0rpx 20rpx 0rpx 
            rgba(0, 0, 0, 0.04);
        border-radius: 16rpx;
        display: flex;
        padding: 30rpx;

        .icon {
            width: 32rpx;
            height: 30rpx;
            position: absolute;
            left: 0;
            top: 0;
        }

        .avatar {
            width: 70rpx;
            height: 70rpx;
            border-radius: 70rpx;
            margin-right: 16rpx;
        }

        .nickname {
            font-size: 24rpx;
            color: #000000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

    .btns {
        width: 678rpx;
        margin: 0 auto;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 30rpx;
        display: flex;
        justify-content: center;

        .btn {
            width: 326rpx;
            height: 124rpx;
            background-color: #ffffff;
            box-shadow: 0rpx 0rpx 20rpx 0rpx 
                rgba(0, 0, 0, 0.04);
            border-radius: 16rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30rpx;
            transition: all .5s;
            
            .inner {
                text-align: center;
            }

            .text {
                font-size: 30rpx;
            }

            .text2 {
                font-size: 24rpx;
                margin-top: 10rpx;
            }

            .text,.text2 {
                color: #000000;
            }

            &.active {
                background-color: #7186f1;
                height: 80rpx;
                transition: all .5s;
                .text,.text2 {
                    color: #ffffff;
                }
            }
        }
    }
</style>