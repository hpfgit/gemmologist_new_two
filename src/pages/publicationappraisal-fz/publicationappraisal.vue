<template>
  <view class="container">
    <view class="content">
      <view class="itemnumber">
        <view class="title">货号</view>
        <input
          type="text"
          name="bar_id"
          placeholder="例如：CP1964、314996-001"
          class="number"
        />
      </view>
      <view class="upploadImg">
        <view class="title">
          <view>上传照片</view>
          <view>图片要求 > </view>
        </view>
        <view class="imgs">
          <view
            class="img-box"
            @tap="upimg(index)"
            v-for="(item, index) in images"
            :key="index"
          >
            <view class="img">
              <image :src="item.imgPath"></image>
              <text>{{ item.text }}</text>
            </view>
          </view>
          <view class="img-box">
            <view class="img">
              <image
                :src="qiniuUrl+'/球鞋鉴定位置/更多@2x.png'"></image>
              <text>补充</text>
            </view>
          </view>
        </view>
      </view>
      <view class="itemnumber">
        <view class="title">备注</view>
        <input type="text" name="mark" placeholder="输入文字" class="number" />
      </view>
    </view>
    <view class="btn-info">
      <view class="btn-info-left">
        <view>鉴定结果仅供参考</view>
        <view
          ><image
            :src="qiniuUrl+'/未同意@2x.png'"
          ></image
          >我同意《<text>免费鉴定契约条款</text>》</view
        >
      </view>
      <view class="btn-info-right">
        提交
      </view>
    </view>
  </view>
</template>

<script>
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
  
export default {
  data() {
    return {
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      images: [
        {
          code: "out",
          name: "鞋子外观",
          image: "/uploads/appraisal/post/icon/out.png"
        },
        {
          code: "mb_line",
          name: "中底走线",
          image: "/uploads/appraisal/post/icon/mb_line.png"
        },
        {
          code: "mark",
          name: "鞋标",
          image: "/uploads/appraisal/post/icon/mark.png"
        },
        {
          code: "box_stamp",
          name: "鞋盒钢印",
          image: "/uploads/appraisal/post/icon/box_stamp.png"
        },
        {
          code: "filler",
          name: "鞋撑",
          image: "/uploads/appraisal/post/icon/filler.png"
        },
        {
          code: "insole_mark",
          name: "鞋垫正面",
          image: "/uploads/appraisal/post/icon/insole_mark.png"
        },
        {
          code: "insole_glue",
          name: "鞋垫反面",
          image: "/uploads/appraisal/post/icon/insole_glue.png"
        },
        {
          code: "outsoles",
          name: "鞋底",
          image: "/uploads/appraisal/post/icon/outsoles.png"
        },
        {
          code: "box_mark",
          name: "鞋盒侧标",
          image: "/uploads/appraisal/post/icon/box_mark.png"
        },
        {
          code: "toe_cap",
          name: "鞋子头部",
          image: "/uploads/appraisal/post/icon/toe_cap.png"
        },
        {
          code: "heelpiece",
          name: "鞋子后跟",
          image: "/uploads/appraisal/post/icon/heelpiece.png"
        },
        {
          code: "0",
          name: "补图",
          image:
            "../../static/images/publicationappraisal/球鞋鉴定位置/更多@2x.png"
        }
      ]
    };
  },
  methods: {
    upimg(index) {
      const that = this;
      uni.chooseImage({
        count: 1,
        success(res) {
          const { tempFilePaths } = res;
          const imgPath = tempFilePaths[0];
          that.imgs[index].imgPath = imgPath;
          console.log(that.imgs);
        },
        fail(err) {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;
  .content {
    width: 690rpx;
    margin: 0 auto;
  }
}
.itemnumber {
  margin-bottom: 42rpx;
  .title {
    margin-top: 32rpx;
    margin-bottom: 24rpx;
  }
  .number {
    width: 690rpx;
    height: 88rpx;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 8rpx;
    padding-left: 32rpx;
    color: #989898;
    box-sizing: border-box;
  }
}
.upploadImg {
  .title {
    display: flex;
    justify-content: space-between;
    view {
      &:nth-of-type(2) {
        font-size: 26rpx;
        color: #5e95f4;
      }
    }
  }
  .imgs {
    display: flex;
    flex-wrap: wrap;
    margin-top: 38rpx;
    .img-box {
      width: 25%;
      text-align: center;
      margin-bottom: 28rpx;
    }
    .img {
      background-color: #ffffff;
      box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
      border-radius: 8rpx;
      display: inline-block;
      text-align: center;
      position: relative;
      width: 150rpx;
      image {
        width: 150rpx;
        height: 150rpx;
      }
      text {
        width: 100%;
        font-size: 22rpx;
        position: absolute;
        bottom: 20rpx;
        left: 0;
        z-index: 2;
      }
      .mark {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 40%;
        background-color: rgba($color: #000000, $alpha: 0.4);
        z-index: 1;
      }
    }
  }
}
.btn-info {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  .btn-info-left {
    width: 462rpx;
    height: 97rpx;
    padding-left: 48rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
    font-size: 24rpx;
    image {
      width: 22rpx;
      height: 22rpx;
    }
    view {
      &:nth-of-type(1) {
        padding-top: 10rpx;
      }
      &:nth-of-type(2) {
        color: #588ae2;
        padding-top: 6rpx;
        image {
          margin-right: 10rpx;
        }
        text {
          text-decoration: underline;
          color: #588ae2;
        }
      }
    }
  }
  .btn-info-right {
    width: 290rpx;
    height: 97rpx;
    background-image: linear-gradient(
        -90deg,
        #5e95f4 0%,
        #6990f7 39%,
        #738af9 100%
      ),
      linear-gradient(#fafafa, #fafafa);
    background-blend-mode: normal, normal;
    color: #fff;
    text-align: center;
    line-height: 97rpx;
  }
}
</style>
