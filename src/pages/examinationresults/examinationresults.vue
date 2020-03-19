<template>
  <view class="container">
    <view class="freeAdmission">
      <view class="custom-title"></view>
      <view class="goback" @tap="goBack">
        <image :src="qiniuUrl+'/返回@2x.png'"></image>
      </view>
      <view class="bg">
        <image class="bg-img" :src="qiniuUrl+'/bg@2x.png'"></image>
        <view class="title">{{message}}</view>
        <view class="box">
          <view class="top">
            <image :src="qiniuUrl+'/成绩@2x.png'"></image>
            <text class="text1">成绩记录</text>
          </view>
          <view class="t1">
            <image :src="qiniuUrl+'/类别@2x.png'"></image>
            <text class="text1">鉴定类别</text>
            <text class="text2">{{getType(brand.type)}}</text>
          </view>
          <view class="t2">
            <image :src="qiniuUrl+'/品牌2拷贝@2x.png'"></image>
            <text class="text1">鉴定品牌</text>
            <text class="text2">{{brand.alias}}</text>
          </view>
          <view class="t3">
            <image :src="qiniuUrl+'/组12@2x.png'"></image>
            <text class="text1">考核成绩</text>
            <text class="text2">共{{count}}题，答对{{correct_count}}题，答错{{wrong_count}}题</text>
          </view>
        </view>
        <view class="box2">
          <view class="left">
            <image :src="qiniuUrl+'/正确@2x.png'"></image>
          </view>
          <view class="right">
            <view>以下为答错题目的正确答案</view>
            <view>若您对答错题目答案有疑问，可通过鉴定群参与讨论，若答案确认出错，则可申请修改成绩。</view>
          </view>
        </view>
        <view class="lists">
          <view class="item" v-for="(item, index) in wrong_list" :key="index" @tap="goTo(item)">
            <image class="left-image" :src="getPath(item.cover_image)"></image>
            <view class="item-right">
              <view class="top">
                <text>{{item.brand_name}}</text>
                <view class="time">
                  <image src="../../static/images/examinationresults/时间(3)@2x.png"></image>
                  <text>{{item.publish_at}}</text>
                </view>
              </view>
              <view class="center">
                <view class="info">{{item.appr_sn}}</view>
                <view class="status" :class="{'true': item.status === '鉴定为真', 'false': item.status ===  '鉴定为假'}">
                  <text>{{item.status}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {detail} from "../../api/examinationresults";
  const NODE_ENV = process.env.NODE_ENV;
  import config from "../../config";

  export default {
        data() {
            return {
                wrong_list: [],
                brand: {},
                message: '',
                correct_count: '',
                count: '',
                wrong_count: '',
                imgPath: config[NODE_ENV].imgUrl,
                qiniuUrl: config[NODE_ENV].qiniuUrl
            }
        },
        onLoad(options) {
            const {id} = options;
            detail({id}).then(result => {
                const {brand,message,correct_count,count,wrong_count,wrong_list} = result.data;
                this.wrong_list = wrong_list;
                this.brand = brand;
                this.message = message;
                this.correct_count = correct_count;
                this.count = count;
                this.wrong_count = wrong_count;
                console.log(result);
            });
            console.log(options);
        },
        methods: {
            getType(type) {
                const obj = ['普通鉴定', '专业鉴定'];
                return obj[type];
            },
            goBack() {
                uni.navigateBack({
                    delta: 2
                });
            },
            getPath(path) {
                return this.imgPath + path;
            },
            goTo(item) {
              uni.navigateTo({
                url: '/pages/Identificationdetails/Identificationdetails?id='+item.id
              });
            }
        }
    };
</script>

<style lang="scss">
  .container {
    overflow: auto;
  }
  .freeAdmission {
    position: relative;

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

    .goback {
      position: absolute;
      top: 50rpx;
      left: 26rpx;
      z-index: 9;

      image {
        width: 66rpx;
        height: 66rpx;
      }
    }
  }

  .bg {
    position: relative;

    .bg-img {
      width: 750rpx;
      height: 306rpx;
      position: absolute;
      left: 0;
      top: 0;
    }

    .title {
      position: absolute;
      left: 0;
      top: 148rpx;
      z-index: 3;
      font-family: FZZDHJW--GB1-0;
      font-size: 32rpx;
      font-weight: normal;
      font-stretch: normal;
      line-height: 70rpx;
      letter-spacing: 0rpx;
      color: #ffffff;
      width: 100%;
      text-align: center;
    }

    .box {
      width: 710rpx;
      height: 356rpx;
      background-color: #ffffff;
      border-radius: 10rpx;
      position: absolute;
      left: 0;
      right: 0;
      top: 240rpx;
      margin: 20rpx auto 0;
      z-index: 9;
      padding-left: 30rpx;
      padding-top: 34rpx;
      padding-right: 78rpx;
      padding-bottom: 78rpx;

      .top {
        image {
          width: 50rpx;
          height: 50rpx;
        }

        text {
          font-size: 28rpx;
          color: #282828;
        }
      }

      .text1 {
        font-size: 26rpx;
        color: #282828;
        margin-left: 38rpx;
      }

      .text2 {
        font-size: 26rpx;
        color: #9ba8bf !important;
        margin-left: 76rpx;
      }

      .t1 {
        margin-top: 44rpx;
        margin-bottom: 22rpx;

        image {
          width: 34rpx;
          height: 36rpx;
        }
      }

      .t2 {
        margin-bottom: 22rpx;

        image {
          width: 34rpx;
          height: 34rpx;
        }
      }

      .t3 {
        image {
          width: 30rpx;
          height: 30rpx;
        }
      }

      .t1,
      .t2,
      .t3 {
        text {
          font-size: 26rpx;
          color: #282828;
        }
      }
    }

    .box2 {
      background-color: #ffffff;
      border-radius: 10rpx;
      position: absolute;
      left: 0;
      right: 0;
      top: 618rpx;
      margin: 0 auto;
      z-index: 9;
      width: 710rpx;
      height: 190rpx;
      background-color: #ffffff;
      border-radius: 10rpx;
      display: flex;
      padding-top: 34rpx;
      padding-left: 28rpx;

      image {
        width: 50rpx;
        height: 50rpx;
      }

      .right {
        margin-left: 22rpx;

        view {
          &:nth-of-type(1) {
            font-size: 28rpx;
            color: #282828;
          }

          &:nth-of-type(2) {
            font-size: 22rpx;
            color: #9ba8bf;
            margin-top: 28rpx;
          }
        }
      }
    }

    .lists {
      position: absolute;
      left: 0;
      right: 0;
      top: 802rpx;
      padding-top: 24rpx;
      width: 710rpx;
      margin: 0 auto;

      .item {
        display: flex;
        width: 710rpx;
        height: 180rpx;
        border-radius: 20rpx;
        background-color: #ffffff;
        margin: 0 auto 24rpx;
        padding: 24rpx;
      }

      .left-image {
        width: 132rpx;
        height: 132rpx;
        border-radius: 10rpx;
      }

      .item-right {
        margin-left: 24rpx;
        flex: 1;

        .top {
          display: flex;
          justify-content: space-between;

          text {
            &:nth-of-type(1) {
              font-size: 28rpx;
            }

            &:nth-of-type(2) {
              font-size: 24rpx;
              color: #858585;
            }
          }

          image {
            width: 22rpx;
            height: 22rpx;
            vertical-align: top;
            margin-top: 9rpx;
            margin-right: 10rpx;
          }

          .time {
            text {
              font-size: 24rpx;
              color: #858585;
            }
          }
        }

        .center {
          margin-top: 44rpx;
          display: flex;
          justify-content: space-between;

          .time {
            width: 26rpx;
            height: 28rpx;
          }

          .info {
            width: 110rpx;
            height: 30rpx;
            line-height: 30rpx;
            text-align: center;
            font-size: 26rpx;
            background-image: url('../../static/images/组10@2x.png');
            background-size: cover;
          }

          .status {
            &.true {
              background-image: linear-gradient(135deg, rgba(28, 211, 249, 0.5) 0%, rgba(61, 180, 247, 0.5) 39%, rgba(94, 149, 244, 0.5) 100%),
              linear-gradient(#5e95f4, #5e95f4);
              border: solid 2rpx #50b8f7;
            }

            &.false {
              background-color: #dd3133;
              border: solid 2rpx #dd3133;
            }

            background-blend-mode: normal, normal;
            border-radius: 14rpx 14rpx 14rpx 0rpx;
            padding-left: 10rpx;
            padding-right: 10rpx;
            line-height: 30rpx;

            text {
              font-size: 20rpx;
              font-weight: bold;
              color: #fefefe;
            }
          }
        }

        .bottom {
          margin-top: 14rpx;

          text {
            font-size: 22rpx;
            color: #282828;
          }

          .zy {
            color: #5e95f4;
          }
        }
      }
    }
  }
</style>
