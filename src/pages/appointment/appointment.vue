<template>
    <view class="appointment">
        <view class="gemmologist" v-for="(item, index) in appraisals" :key="index">
            <view class="left">
                <view class="head">
                    <image class="head-img" :src="item.avatar"></image>
                </view>
                <view class="name">{{item.name}}</view>
            </view>
            <view class="right">
                <view class="circle"></view>
                <view class="level-name">{{item.last_level_name}}</view>
            </view>
        </view>
        <view class="lists">
            <view class="list" v-for="(item, index) in appraisals" :key="index">
                <view class="sjx"></view>
                <view class="introduce">
                    <text class="text">个人介绍：</text>
                    <text class="text2">{{item.bio}}</text>
                </view>
                <view class="requirement">
                    <text class="text">鉴定要求：</text>
                    <text class="text2">{{item.appr_ask}}</text>
                </view>
                <view class="range">
                    <view class="text">鉴定范围：</view>
                    <view class="imgs">
                        <scroll-view scroll-x="true">
                            <image
                                v-for="(ite, ind) in item.imgs"
                                :key="ind"
                                class="img"
                                :src="ite.cover_image"
                            ></image>
                        </scroll-view>
                    </view>
                </view>
                <view class="range-time" v-show="!showtime" @click="onShowDatePicker">
                    选择时间
                </view>
                <view class="check-type" :class="{'active': isShow}">
                    <view class="title">选择时间</view>
                    <view class="line"></view>
                    <view class="close-box"
                        @tap="close"
                    >
                        <image
                            :src="qiniuUrl+'圆角矩形607拷贝@2x.png'"
                            class="close-img"
                        ></image>
                    </view>
                    <view class="classList">
                        <view class="list-left">
                            <view class="select-nav" v-for="(item, index) in selectNav" :key="index" :class="{active: currNavInd === index}" @tap="selectNavFn(index)">{{item.name}}</view>
                        </view>
                        <view class="list-right">
                            <view class="select-time" v-for="(item, index) in selectTime" :key="index" :class="{active: currTimeInd === index}" @tap="selectTimeFn(index)">{{item.time}}<image class="checked-img" :src="qiniuUrl+'对号@2x.png'"></image></view>
                        </view>
                    </view>
                </view>
                <view class="range-time range-time-checked" :style="{display: showtime ? 'flex' : 'none'}" @click="onShowDatePicker">
                    <view class="datetime">{{datetime}}</view> <view class="sjx2"></view>
                </view>
            </view>
        </view>
        <view class="submit-container">
            <view class="submit">
                预约在线鉴定（付费）
            </view>
        </view>
        <view class="mask" v-show="isShow || is_bar_mask" @tap="mask"></view>
    </view>
</template>

<script>
import {appraiserDetail} from "../../api/publicationappraisal";
import MxDatePicker from '../../component/mx-datepicker/mx-datepicker.vue';
import config from "../../config";
import {formate} from '../../utils/formate';
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            value: '',
            showtime: false,
            appraisals: [],
            isShow: false,
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            selectNav: [
                { name: '今天' },
                { name: '明天' },
                { name: '后天' }
            ],
            selectTime: [
                { time: '09:00-10:00' },
                { time: '10:00-11:00' },
                { time: '11:00-12:00' },
                { time: '12:00-13:00' },
                { time: '13:00-14:00' },
                { time: '14:00-15:00' },
                { time: '15:00-16:00' }
            ],
            currNavInd: 0,
            currTimeInd: '',
            datetime: ''
        }
    },
    onLoad(options) {
        const {id} = options;
        appraiserDetail({id: 175}).then(result => {
            console.log(result);
            const data = result.data;
            const keys = Object.keys(data);
            keys.forEach(key => {
                if (/[0-9]/gi.test(key)) {
                    this.appraisals.push({
                        avatar: /avatar_/gi.test(data[key].avatar)
                            ? config[NODE_ENV].host + data[key].avatar
                            : config[NODE_ENV].imgUrl + data[key].avatar,
                        bio: data[key].bio,
                        appr_ask: data[key].appr_ask,
                        last_level_name: data[key].last_level_name,
                        name: data[key].name,
                        imgs: data[key].data
                    });
                }
            });
        });
    },
    methods: {
        selectNavFn(index) {
            this.currNavInd = index;
        },
        selectTimeFn(index) {
            this.currTimeInd = index;
            this.datetime = formate(new Date(), this.selectTime[index].time, this.currNavInd);
            console.log(this.datetime);
            this.showtime = true;
            this.isShow = false;
        },
        onShowDatePicker(){
            this.isShow = true;
            this.showtime = false;
        },
        close() {
            this.isShow = false;
        },
        mask() {
            this.isShow = !this.isShow;
        },
        onSelected(e) {//选择
            this.showPicker = false;
            this.showtime = true;
            if(e) {
                this[this.type] = e.value; 
                //选择的值
                console.log('value => '+ e.value);
                //原始的Date对象
                console.log('date => ' + e.date);
            }
        }
    },
    components: {
        MxDatePicker
    }
}
</script>

<style lang="scss" scoped>
    .test{
		text-align: center;
		padding: 10px 0;
	}
	button{
		margin: 20upx;
		font-size: 28upx;
	}
    .appointment {
        background-color: #edf1f4;
        min-height: 100vh;
        overflow: hidden;
    }
    .gemmologist {
        width: 690rpx;
        margin: 20rpx auto 30rpx;
        background-color: #ffffff;
        border-radius: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10rpx 32rpx 10rpx 16rpx;
        .left,.right {
            display: flex;
            align-items: center;
        }
        .circle {
            width: 32rpx;
            height: 32rpx;
            border-radius: 32rpx;
            background-color: #37384c;
            opacity: 0.5;
            margin-right: 18rpx;
        }
    }
    .submit-container {
        width: 750rpx;
	    height: 120rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .submit {
        width: 670rpx;
        height: 88rpx;
        margin: 0 auto;
        line-height: 88rpx;
        background-color: #37384c;
        border-radius: 10rpx;
        color: #ffffff !important;
        font-size: 30rpx;
        text-align: center;
    }
    .range-time {
        width: 480rpx;
        height: 88rpx;
        line-height: 88rpx;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0rpx 1rpx 20rpx 0rpx 
            rgba(0, 0, 0, 0.14);
        border-radius: 44rpx;
        font-size: 30rpx;
        text-align: center;
        color: #000;
    }
    .range-time-checked {
        width: 448rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .sjx2 {
            width: 0;
            height: 0;
            border-top: 12rpx solid transparent;
            border-bottom: 12rpx solid transparent;
            border-left: 12rpx solid #000;
            margin-left: 26rpx;
        }
    }
    .left-img,.right-img,.bg-img,.ban {
        position: absolute;
    }

    .bg-img {
        width: 160rpx;
        height: 59rpx;
    }

    .bg-img,.ban {
        left: 0;
        right: 0;
        top: 0;
        margin: 0 auto;
    }

    .left-img,.right-img {
        top: 4rpx;
        width: 30rpx;
        height: 30rpx;
    }

    .left-img {
        left: 4rpx;
    }

    .right-img {
        right: 4rpx;
    }

    .ban {
        width: 313rpx;
        height: 89rpx;
    }

    .head-img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
        margin-right: 18rpx;
        // position: absolute;
        // top: -42rpx;
        // left: 0;
        // right: 0;
        // margin: auto;
    }
    .img {
        width: 90rpx;
        height: 90rpx;
    }
    .nickname {
        font-size: 26rpx;
        color: #ffffff;
        text-align: center;
        padding-top: 68rpx;
    }
    .level-info {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 12rpx;

        .cir {
            width: 40rpx;
            height: 28rpx;
            margin-right: 8rpx;

            &.cir-4,&.cir-3,&.cir-2 {
                width: 28rpx;
                height: 28rpx;
            }
        }
        text {
            color: #ebeaea;
            font-size: 24rpx;
        }
    }
    // .introduce {
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     white-space: nowrap;
    // }
    .box {
        .introduce {
            margin-top: 40rpx;
        }
        .introduce,
        .requirement,
        .range {
            color: #fff;

            text,
            view {
                color: #ffffff;
            }
        }
        .range {
            margin-bottom: 0;
        }
    }

    .range {
        padding-bottom: 36rpx;
    }

    .nickname,.introduce,.requirement,.range,.level-info {
        position: relative;
        z-index: 2;
    }

    .introduce,
    .requirement,
    .range {
        margin-bottom: 20rpx;
        margin-left: 38rpx;
        margin-right: 38rpx;

        // .bold-font {
        //     font-weight: bold;
        // }

        .text {
            color: #000;
            font-size: 28rpx;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
            font-weight: bold;
        }
    }
    .introduce {
        margin-top: 36rpx;
    }

    .level-img {
        width: 26rpx;
        height: 26rpx;
    }
    .imgs {
        margin-top: 20rpx;
        // padding-bottom: 36rpx;
        white-space: nowrap;

        .img {
            width: 60rpx;
            height: 60rpx;
            border-radius: 60rpx;
            background-color: #52535d;
            box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
            margin-right: 16rpx;
        }
    }

    .lists {
        .list {
            width: 690rpx;
            margin: 22rpx auto 62rpx;
            padding-top: 42rpx;
            padding-bottom: 66rpx;
            background-color: #ffffff;
            background-blend-mode: normal, 
                normal;
            border-radius: 16rpx;
            position: relative;

            .sjx {
                position: absolute;
                top: -19rpx;
                left: 42rpx;
                border-right: 20rpx transparent solid;
                border-bottom: 20rpx #ffffff solid;
                border-left: 10px transparent solid;
                width: 0;
                height: 0;
            }
            text,view {
                color: #252320;
            }

            &.level-2 {
                background-color: #ffffff;
                box-shadow: 0rpx 2rpx 24rpx 0rpx 
                    rgba(7, 24, 53, 0.12);
                background-image: none;
            }

            &.level-3 {
                background-image: linear-gradient(120deg, 
                #eaedef 0%, 
                    #d8d5d5 100%), 
                linear-gradient(
                    #ffffff, 
                    #ffffff);
            }

            // &:last-child {
            //     margin-bottom: 20rpx;
            // }
        }
    }
    .top,
    .level {
        display: flex;
        align-items: center;
    }
    .top {
        .img {
            margin-right: 16rpx;
        }
    }
    .level {
        margin-top: 5rpx;
    }
    .level-img {
        margin-right: 5rpx;
    }
    .level-name {
        color: #898989;
        font-size: 24rpx;
    }
    .check-type {
        position: fixed;
        bottom: -753rpx;
        right: 0;
        left: 0;
        z-index: 999;
        width: 750rpx;
        height: 550rpx;
        background-color: #ffffff;
        border-radius: 40rpx 40rpx 0rpx 0rpx;
        transition: all .3s;
        overflow: hidden;

        &.active {
            bottom: 0;
        }

        .title {
            font-size: 32rpx;
            text-align: center;
            margin-top: 36rpx;
            margin-bottom: 48rpx;
        }

        .line {
            width: 750rpx;
            height: 2rpx;
            background-color: #efefef;
        }

        .classList {
            display: flex;
        }

        .list-left {
            width: 375rpx;
            height: 630rpx;
            background-color: #efefef;
        }

        .list-left, .list-right {
            flex: 1;
        }

        .list-right {
            height: 428rpx;
            overflow-y: scroll;
        }

        .select-nav {
            height: 90rpx;
            line-height: 90rpx;
            color: #000;
            text-align: center;

            &.active {
                color: #ec525a;    
                background-color: #ffffff;
            }
        }

        .select-time {
            text-align: center;
            color: #000;
            margin-bottom: 56rpx;
            position: relative;
            
            .checked-img {
                display: none;
                width: 32rpx;
                height: 23rpx;
            }

            &.active {
                color: #ec525a;

                .checked-img {
                    display: block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 56rpx;
                    margin: auto;
                }
            }

            &:first-child, &:last-child {
                margin-top: 28rpx;
            }

            &:last-child {
                margin-bottom: 28rpx;
            }
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
        top: 50rpx;
        right: 50rpx;
        width: 48rpx;
        height: 48rpx;
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
</style>
