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
          :value="bar_id"
          @change="getBarId($event)"
        />
      </view>
      <view class="upploadImg">
        <view class="title">
          <view>上传照片</view>
          <navigator url="/pages/picturerequest/picturerequest"
            >图片要求 ></navigator
          >
        </view>
        <view class="imgs">
          <view
            class="img-box"
            @tap="upImg(index)"
            v-for="(item, index) in images"
            :key="index"
          >
            <view class="img">
              <image :src="getPath(item.image)"></image>
              <text>{{ item.name ? item.name : "" }}</text>
              <view class="mark"></view>
            </view>
          </view>
        </view>
      </view>
      <view class="itemnumber">
        <view class="title">备注</view>
        <input
          type="text"
          name=""
          placeholder="输入文字"
          class="number"
          @change="mark($event)"
        />
      </view>
    </view>
    <view class="btn-info">
      <view class="btn-info-left">
        <view>鉴定结果仅供参考</view>
        <view class="agree" @tap="isAgreeFn">
          <image
            v-show="!isAgree"
            :src="qiniuUrl+'/未同意@2x.png'"
          ></image>
          <image
            v-show="isAgree"
            src="../../static/images/同意(1)@2x.png"
          ></image>
          我同意《
          <text>免费鉴定契约条款</text>
          》
        </view>
      </view>
      <view class="btn-info-right" @tap="submission">
        提交
      </view>
    </view>
  </view>
</template>

<script>
import {
  release,
  complementGraph,
  appraisal,
  qiniuToken
} from "../../api/publicationappraisal";
import { upload, init } from "../../utils/qiniuUploader";
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
      ],
      description: "",
      others: [],
      is_specialty: "",
      price: 0,
      brand_id: "",
      bar_id: "",
      markContent: "",
      uploadPicture: {},
      isAgree: false,
      bar_id: ''
    };
  },
  onLoad(options) {
    const { brand_id, is_specialty } = options;
    this.brand_id = brand_id;
    this.is_specialty = is_specialty;
    console.log(brand_id, is_specialty);
  },
  methods: {
    getBarId(e) {
      this.bar_id = e.target.value;
    },
    isAgreeFn() {
      this.isAgree = !this.isAgree;
    },
    getPath(path) {
      if (/\.\./gi.test(path)) {
        return path;
      }
      if (/tmp/gi.test(path)) {
        return path;
      }
      return config[NODE_ENV].imgUrl + path;
    },
    getData() {
      release({
        description: this.description,
        images: this.images,
        others: this.others,
        is_specialty: this.is_specialty,
        price: this.price,
        brand_id: this.brand_id
      })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRandomStr(randomFlag, min, max) {
      let str = "",
        range = min,
        pos = "",
        arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    upImg(index) {
      const that = this;
      uni.chooseImage({
        count: 1,
        success(res) {
          const { tempFilePaths } = res;
          const imgPath = tempFilePaths[0];
          that.images[index].image = imgPath;
          if (index >= that.images.length - 1) {
            that.images[index].code = index - 11;
            that.images[index].image = imgPath;
            that.images[index].name = "补充";
            const obj = {
              code: index - 10,
              image:
                "../../static/images/publicationappraisal/球鞋鉴定位置/更多@2x.png",
              name: "补充"
            };
            that.images.push(obj);
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    mark(e) {
      const description = e.target.value;
      this.description = description;
    },
    uploadImgQiniu(images) {
      let that = this;
      const res_img = [];
      images.forEach(image => {
        if (/tmp/gi.test(image.image)) {
          res_img.push(image);
        }
      });
      console.log(images);
      return new Promise((resolve, reject) => {
        images.map((r, i) => {
          const path = r.image;
          let ext = path.split(".")[path.split(".").length - 1];
          if (/tmp/gi.test(path)) {
            qiniuToken().then(res => {
              let { upload_token } = res.data.data;
              upload(
                path,
                res => {
                  console.log(res);
                  that.uploadPicture[r.code] = res.imageURL;
                  i === res_img.length - 1 && resolve(that.uploadPicture);
                },
                error => {
                  reject(error);
                },
                {
                  region: "NCN",
                  uptoken: upload_token,
                  uploadURL: "https://upload-z1.qiniup.com",
                  domain: config[NODE_ENV].domain,
                  key:
                    "uploads/appraiser/" +
                    that.getRandomStr(false, 32) +
                    "." +
                    ext
                }
              );
            });
          }
        });
      });
    },
    appraisal() {
      this.uploadImgQiniu(this.images).then(result => {
        console.log(result);
        release({
          description: this.description,
          images: result,
          others: this.others,
          is_specialty: this.is_specialty,
          price: this.price,
          brand_id: this.brand_id
        })
          .then(result => {
            const { message, status } = result.data;
            if (status === 201) {
              uni.showToast({
                title: message,
                icon: "none",
                success() {
                  uni.navigateTo({
                    url: "/pages/releasedsuccessfully/releasedsuccessfully"
                  });
                }
              });
            } else {
              uni.showToast({
                title: message,
                icon: "none"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    submission() {
      if (this.bar_id === '') {
        uni.showToast({
          title: '请输入货号',
          icon: 'none'
        });
        return;
      }
      let number = 0;
      this.images.forEach(img => {
        if (/tmp/ig.test(img.image)) {
          number ++;
        }
      });
      if (number >= 3) {
        if (!this.isAgree) {
          uni.showToast({
            title: '请勾选同意条款',
            icon:'none'
          });
          return;
        }
        this.appraisal();
      } else {
        uni.showToast({
          title: '请上传三张主图',
          icon: "none"
        });
      }
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

    navigator {
      font-size: 26rpx;
      color: #5e95f4;
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

      &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3) {
        .img {
          border: solid 4rpx #5e95f4;
        }
      }
    }

    .img {
      background-color: #ffffff;
      box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
      border-radius: 8rpx;
      display: inline-block;
      text-align: center;
      position: relative;
      width: 158rpx;

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
        color: #ffffff;
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
        position: relative;

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
