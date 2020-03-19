<template>
  <view class="container">
    <view class="top-nav">
      <view class="top"></view>
      <view class="header-back" @tap="back">
        <image :src="qiniuUrl+'/向右@2x.png'"></image>
      </view>
      <view class="title">
        鉴定考试
      </view>
    </view>
    <view class="examination">
      <view class="name">{{ name }}</view>
      <view class="mark-text">{{ desc === null ? "暂无备注" : desc }}</view>
      <view class="imgs">
        <view
          class="img-box"
          v-for="(item, index) in brand_image_order"
          :key="index"
          @tap="previewImage(index)"
        >
          <view class="img">
            <image :src="getPath(item)" mode=""></image>
            <view class="mark">{{ item.position_name }}</view>
          </view>
        </view>
      </view>
      <view class="trueorfalse">
        <view class="box" @tap="isTrue" :class="{active: isTrueClick}">
          <image :src="trueImg" mode=""></image>
        </view>
        <view class="box" @tap="isFalse" :class="{active: isFalseClick}">
          <image :src="falseImg" mode=""></image>
        </view>
      </view>
      <view class="btn" @tap="nextQuestion">
        进度 ({{ progress }}/{{ count }})
        <image
                :src="qiniuUrl+'/jianding_jiandingshi_kaoshi_next@2x.png'"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getIds,
    achieve,
    examine,
    examine_save,
    examine_history,
    giveup,
    auditing
  } from "../../api/examination";

  const NODE_ENV = process.env.NODE_ENV;
  import config from "../../config";
  let previewImages = [];

  export default {
    data() {
      return {
        examination: [],
        imgPath: config[NODE_ENV].imgUrl,
        desc: "",
        name: "",
        currentIndex: 0,
        isTrueClick: false,
        isFalseClick: false,
        count: 0,
        answers: [],
        examination_current: [],
        brand_image_order: [],
        brand_id: "",
        exam_id: "",
        progress: 1,
        qiniuUrl: config[NODE_ENV].qiniuUrl
      };
    },
    onLoad(options) {
      uni.showLoading({
        title: '加载中...',
        icon: 'none',
        mask: true
      });
      const { brand_id } = options;
      this.brand_id = brand_id;
      examine_history({ brand_id }).then(result => {
        const { has_exam, data } = result;
        if (has_exam) {
          const exam_id = data.id;
          this.exam_id = exam_id;
          this.get_examine(exam_id).then(result => {
            const { data } = result.data;
            this.examination = data;
            this.examination_current = this.examination[this.currentIndex];
            this.brand_image_order = this.examination_current.brand_image_order;
            previewImages = [];
            this.brand_image_order.forEach(item => {
              if (item.path) {
                previewImages.push(this.getPath(item));
              } else {
                previewImages.push(this.getPath(item));
              }
            });
            this.name = this.examination_current.brand.name;
            this.desc = this.examination_current.description;
            this.isFalseClick = false;
            this.isTrueClick = false;
            uni.hideLoading();
          });
        } else {
          this.get_ids(this.brand_id);
        }
      });
    },
    computed: {
      trueImg() {
        if (this.isTrueClick) {
          return this.qiniuUrl+"/真1@2x.png";
        } else {
          return this.qiniuUrl+"/真2@2x.png";
        }
      },
      falseImg() {
        if (this.isFalseClick) {
          return this.qiniuUrl+"/假1@2x.png";
        } else {
          return this.qiniuUrl+"/假2@2x.png";
        }
      }
    },
    methods: {
      previewImage(index) {
        uni.previewImage({
          current: index,
          urls: previewImages
        });
      },
      get_ids(brand_id) {
        uni.showLoading({
          title: '加载中...',
          icon: 'none',
          mask: true
        });
        getIds({ brand_id }).then(result => {
          const { id, status, message } = result.data;
          this.exam_id = id;
          if (status === 403) {
            uni.hideLoading();
            uni.showModal({
              title: '提示',
              content: message,
              showCancel: false,
              success(result) {
                if (result.confirm) {
                  uni.navigateBack({
                    delta: 1
                  });
                }
              }
            });
          } else {
            this.get_examine(this.exam_id).then(result => {
              const { data } = result.data;
              this.examination = data;
              this.examination_current = this.examination[this.currentIndex];
              this.brand_image_order = this.examination_current.brand_image_order;
              previewImages = [];
              this.brand_image_order.forEach(item => {
                if (item.path) {
                  previewImages.push(this.getPath(item));
                } else {
                  previewImages.push(this.getPath(item));
                }
              });
              this.name = this.examination_current.brand.name;
              this.desc = this.examination_current.description;
              this.isFalseClick = false;
              this.isTrueClick = false;
              uni.hideLoading();
            });
          }
        });
      },
      get_examine(exam_id) {
        return new Promise(resolve => {
          achieve({ exam_id }).then(result2 => {
            const { data, count, current } = result2.data;
            this.count = count;
            if (current >= count) {
              this.progress = count;
            } else {
              this.progress = current;
            }
            if (data.length > 0) {
              let ids = "";
              data.forEach(id => {
                ids += `${id},`;
              });
              ids = ids.substring(0, ids.length - 1);
              examine({ ids }).then(result3 => {
                resolve(result3);
              });
            }
          });
        });
      },
      getInfo() {
        this.examination_current = this.examination[this.currentIndex];
        this.brand_image_order = this.examination_current.brand_image_order;
        previewImages = [];
        this.brand_image_order.forEach(item => {
          if (item.path) {
            previewImages.push(this.getPath(item));
          } else {
            previewImages.push(this.getPath(item));
          }
        });
        this.name = this.examination_current.brand.name;
        this.desc = this.examination_current.description;
        this.isFalseClick = false;
        this.isTrueClick = false;
      },
      getPath(item) {
        if (item.image) {
          return this.imgPath + item.image;
        } else {
          return this.imgPath + item.path;
        }
      },
      isTrue() {
        this.isTrueClick = !this.isTrueClick;
        if (this.isTrueClick) {
          this.isFalseClick = false;
        } else {
        }
      },
      isFalse() {
        this.isFalseClick = !this.isFalseClick;
        if (this.isFalseClick) {
          this.isTrueClick = false;
        } else {
        }
      },
      nextQuestion() {
        if (!this.isTrueClick && !this.isFalseClick) {
          uni.showToast({
            title: "请给出本题的答案",
            icon: "none"
          });
          return;
        }
        this.currentIndex++;
        let result = 0;
        if (this.isFalseClick) {
          result = 0;
        }
        if (this.isTrueClick) {
          result = 1;
        }
        this.answers.push({
          id: this.examination_current.id,
          result
        });
        if (this.currentIndex >= 10) {
          uni.showLoading({
            title: '加载中...',
            icon: 'none',
            mask: true
          });
          examine_save({ result: this.answers, exam_id: this.exam_id })
            .then(result => {
              this.answers = [];
              this.currentIndex = 0;
              if (this.progress < this.count) {
                this.get_examine(this.exam_id).then(result => {
                  const { data } = result.data;
                  this.examination = data;
                  this.examination_current = this.examination[this.currentIndex];
                  this.brand_image_order = this.examination_current.brand_image_order;
                  previewImages = [];
                  this.brand_image_order.forEach(item => {
                    if (item.path) {
                      previewImages.push(this.getPath(item));
                    } else {
                      previewImages.push(this.getPath(item));
                    }
                  });
                  this.name = this.examination_current.brand.name;
                  this.desc = this.examination_current.description;
                  this.isFalseClick = false;
                  this.isTrueClick = false;
                  uni.hideLoading();
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.getInfo();
        }
        if (this.progress >= this.count) {
          this.progress = this.count;
          auditing({ brand_id: this.brand_id, exam_id: this.exam_id })
            .then(result => {
              uni.navigateTo({
                url:
                        "/pages/examinationresults/examinationresults?id=" +
                        this.exam_id
              });
            })
            .catch(error => {
              console.log(error);
            });
          return;
        }
        this.progress++;
      },
      back() {
        const self = this;
        uni.showModal({
          title: "提示",
          content: "是否要退出考试",
          success(result) {
            if (result.confirm) {
              giveup({ exam_id: self.exam_id })
                      .then(result => {
                        uni.navigateBack({
                          delta: 1
                        });
                      })
                      .catch(error => {
                        console.log(error);
                      });
            } else if (result.cancel) {
              console.log("点击了取消按钮");
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .container {
    background-color: #fff;
  }

  .top-nav {
    position: relative;
    .top {
      width: 100%;
      height: 38rpx;
    }
    .header-back {
      position: absolute;
      width: 100rpx;
      left: 26rpx;
      top: 38rpx;
      image {
        width: 16rpx;
        height: 32rpx;
      }
    }
    .title {
      text-align: center;
    }
    .header-back,
    .title {
      height: 88rpx;
      line-height: 88rpx;
    }
  }

  .examination {
    .name {
      font-size: 40rpx;
      color: #282828;
      margin-top: 36rpx;
      margin-left: 36rpx;
    }

    .mark-text {
      font-size: 26rpx;
      color: #282828;
      margin-top: 20rpx;
      margin-left: 36rpx;
      margin-bottom: 40rpx;
    }
  }

  .imgs {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding-left: 28rpx;
    padding-right: 28rpx;
    margin-bottom: 400rpx;

    .img-box {
      font-size: 22rpx;
      color: #ffffff;
      width: 25%;
      display: inline-block;

      .img {
        position: relative;
        height: 150rpx;
        width: 150rpx;
        background-color: #f3f0ef;
        border-radius: 8rpx;
        overflow: hidden;
        margin-bottom: 30rpx;

        image {
          width: 150rpx;
          height: 150rpx;
          background-color: #f3f0ef;
          border-radius: 8rpx;
          position: absolute;
          left: 0;
          top: 0;
        }

        .mark {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 40%;
          background-color: rgba($color: #000000, $alpha: 0.5);
          z-index: 3;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 22rpx;
        }
      }
    }
  }

  .trueorfalse {
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 250rpx;
    left: 0;
    width: 100%;
    z-index: 999;

    .box {
      &.active {
        background-color: #f2f2f2;
        border-radius: 10rpx;
      }

      image {
        width: 140rpx;
        height: 110rpx;
      }
    }
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 750rpx;
    height: 97rpx;
    line-height: 97rpx;
    text-align: center;
    background-image: linear-gradient(
                    -90deg,
                    #5e95f4 0%,
                    #6990f7 39%,
                    #738af9 100%
    ),
    linear-gradient(#eef1f4, #eef1f4);
    background-blend-mode: normal, normal;
    font-size: 30rpx;
    color: #eef1f4;

    image {
      width: 28rpx;
      height: 18rpx;
      margin-left: 10rpx;
    }
  }
</style>
