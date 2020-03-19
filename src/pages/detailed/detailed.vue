<template>
    <view class="container">
        <scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrolltolower">
            <view class="lists">
                <view class="list" v-for="(item, index) in detailed" :key="index">
                    <view class="left">
                        <view class="title">{{item.name}}</view>
                        <view class="date">{{item.payment_time}}</view>
                    </view>
                    <view class="right">
                        <view class="price">{{item.amount >= 0 ? '+' : '-'}} {{item.amount}}</view>
                    </view>
                </view>
            </view>
            <nodata v-if="!detailed.length" />
        </scroll-view>
    </view>
</template>

<script>
import { transferLog } from '../../api/cashwithdrawal';
import nodata from '../../component/nodata/nodata.vue';

export default {
    data() {
        return {
            detailed: [],
            page: '',
            totalPage: ''
        }
    },
    onLoad() {
        this.getData();
    },
    onPullDownRefresh() {
        this.page = 1;
        this.getData();
    },
    methods: {
        getData() {
            uni.showLoading({
                title: '加载中...',
                icon: 'none',
                mask: true
            });
            transferLog({
                page: this.page
            }).then(result => {
                const {data, count} = result.data;
                if (this.page > 1) {
                    data.forEach(element => {
                        this.detailed.push(element);
                    });
                } else {
                    this.detailed = data;
                }
                this.totalPage = Math.ceil(count / 10);
                uni.hideLoading();
            });
        },
        scrolltolower() {
            this.page ++;
            if (this.page > this.totalPage) {
                uni.showToast({
                    title: '已经加载全部的数据',
                    icon: 'none',
                    mask: true
                });
                uni.hideLoading();
                return;
            }
            this.getData();
        }
    },
    components: {
        nodata
    }
}
</script>

<style lang="scss">
    .container {
        background-color: #fff;
    }

    .scroll-view {
        height: 100vh;
    }

    .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        padding: 22rpx 26rpx;
        border-bottom: 1rpx solid rgb(221, 221, 221);

        .title {
            color: #333;
        }
        .date {
            font-size: 24rpx;
            margin-top: 10rpx;
            color: #898989;
        }
        .price {
            font-size: 36rpx;
            color: #7283ed;
        }
    }
</style>