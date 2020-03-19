<template>
  <view class="container">
    <scroll-view>
      <view class="check">
        <view class="title">
          <view class="left">已选鉴定师</view>
          <view class="right" @tap="resetCheck"
            >重新选择
            <image class="arrow" :src="qiniuUrl + '矩形1@2x.png'"></image
          ></view>
        </view>
        <view class="lists">
          <view
            class="list"
            v-for="(item, index) in appraisals"
            :key="index"
            @tap="resetCheck"
          >
            <view class="left">
              <image class="avatar" :src="item.avatar"></image>
              <view class="right">
                <view class="top">
                  <view class="nickname">{{ item.name }}</view>
                  <image
                    class="level"
                    :src="qiniuUrl + '矢量智能对象@2x.png'"
                  ></image>
                  <view class="level-name">{{ item.last_level_name }}</view>
                </view>
                <view class="desc">
                  鉴定要求:
                  {{ item.appr_ask ? item.appr_ask : "暂无要求" }}
                </view>
              </view>
            </view>
            <image class="arrow2" :src="qiniuUrl + '矩形1187@2x.png'"></image>
          </view>
        </view>
      </view>
      <view class="content">
        <view class="upploadImg">
          <view class="title">
            <view>上传照片</view>
            <!-- <view>图片要求 ></view> -->
          </view>
          <view class="imgs" v-if="type === 'shoes'">
            <view
              class="img-box"
              @tap="upImg(index)"
              v-for="(item, index) in images"
              :key="index"
            >
              <view class="img">
                <image :src="getPath(item.image)" mode="widthFix"></image>
                <text v-show="item.isShow">{{
                  item.name ? item.name : ""
                }}</text>
                <view class="mark2" v-show="item.isShow"></view>
              </view>
            </view>
          </view>
          <view class="imgs" v-if="type === 'clothing'">
            <view
              class="img-box"
              @tap="upImg(index)"
              v-for="(item, index) in clothingImages"
              :key="index"
            >
              <view class="img">
                <image :src="getPath(item.image)" mode="widthFix"></image>
                <text v-show="item.isShow">{{
                  item.name ? item.name : ""
                }}</text>
                <view class="mark2" v-show="item.isShow"></view>
              </view>
            </view>
          </view>
        </view>
        <view class="itemnumber" @tap="popup" v-show="is_specialty === '2'">
          <view class="title">保价服务</view>
          <input
            type="text"
            name="price"
            :value="price"
            class="number"
            :disabled="true"
          />
        </view>
        <view class="itemnumber itemnumber2">
          <view class="title">备注</view>
          <input
            type="text"
            name="mark"
            placeholder="输入文字"
            class="number"
            @tap="mark($event)"
          />
        </view>
      </view>
      <view class="btn-info">
        <view class="btn-info-left">
          <view
            >费用计算
            <text>
              <text class="icon">￥</text>
              {{ cost }}
              <text class="bj-price" v-show="is_specialty === '2'"
                >(当前保价￥{{ bjPrice }})</text
              >
            </text>
          </view>
          <view>
            <image @tap="isAgreeFn" v-show="!isAgree" :src="qiniuUrl + '/未同意@2x.png'"></image>
            <image @tap="isAgreeFn" v-show="isAgree" :src="qiniuUrl + '同意(1)@2x.png'"></image>
            <text @tap="isAgreeFn">我同意</text>
              《
            <text @tap="baojia">保价鉴定契约条款</text>
            》
          </view>
        </view>
        <view class="btn-info-right" @tap="submission">
          微信支付
        </view>
      </view>
      <view class="mark" v-if="isPay"></view>
      <view class="mark" v-if="isPopup"></view>
      <view class="Popup" v-if="isPopup">
        <view class="title">保价</view>
        <view class="form">
          <input
            type="text"
            name="insuredPrice"
            :placeholder="insuredPriceNumber"
            @input="insuredPrice($event)"
          />
          <view>元</view>
        </view>
        <view class="price"
          >预计收取费用
          <text>{{ jdPrice }}</text>
          元
        </view>
        <view class="tip">
          <view class="tip-title">
            <image :src="qiniuUrl + '/灯泡@2x.png'"></image>
            温馨提示
          </view>
          <view class="p">1.鉴定结论出错，按商品价值全额赔付！</view>
          <view class="p">2.商品价值超过2000元将为您提供鉴定专家1对1服务</view>
          <view class="p"
            >3.商品价值不能大于20万元，如需鉴定2万元以上商品，请联系客服进行实物鉴定</view
          >
          <view class="p">具体内容请查看《专业鉴定协议》</view>
        </view>
        <view class="btn">
          <view @tap="cancel">取消</view>
          <view @tap="confirm">确认</view>
        </view>
      </view>
      <view class="pay" v-show="isPayShow">
        <view class="title">
          <view class="text">请选择支付方式</view>
          <image
            :src="qiniuUrl + '/叉@2x.png'"
            class="close"
            @tap="closePay"
          ></image>
        </view>
        <view class="price"> ￥{{ cost }} </view>
        <view class="type yuee" @tap="checkPay(0)">
          <view class="left">
            <image :src="qiniuUrl + '/余额@2x.png'"></image>
            <view class="yue">余额支付(剩余￥{{ userCash.money }})</view>
          </view>
          <image
            v-show="isPayTypeIndex !== 0"
            :src="qiniuUrl + '未选中拷贝2@2x.png'"
          ></image>
          <image
            v-show="isPayTypeIndex === 0"
            :src="qiniuUrl + '选中@2x.png'"
          ></image>
        </view>
        <view class="type weixin" @tap="checkPay(1)">
          <view class="left">
            <image :src="qiniuUrl + '/支付宝@2x.png'"></image>
            <view class="yue">微信支付</view>
          </view>
          <image
            v-show="isPayTypeIndex !== 1"
            :src="qiniuUrl + '未选中拷贝2@2x.png'"
          ></image>
          <image
            v-show="isPayType === 'pay' && isPayTypeIndex === 1"
            :src="qiniuUrl + '选中@2x.png'"
          ></image>
        </view>
        <view class="type zhifubao" @tap="checkPay(2)">
          <view class="left">
            <image :src="qiniuUrl + '/微信支付@2x.png'"></image>
            <view class="yue">支付宝支付</view>
          </view>
          <image
            v-show="isPayTypeIndex !== 2"
            :src="qiniuUrl + '未选中拷贝2@2x.png'"
          ></image>
          <image
            v-show="isPayType === 'pay' && isPayTypeIndex === 2"
            :src="qiniuUrl + '选中@2x.png'"
          ></image>
        </view>
        <view class="imm-pay" @tap="ImmediatePayment">
          立即支付
        </view>
      </view>
      <view class="password" v-show="isPay">
        <view class="title">请输入支付密码</view>
        <view class="password-box">
          <view class="numeric" v-for="(item, index) in password" :key="index">
            <view :class="{ active: item.number }"></view>
          </view>
        </view>
        <view class="reset">重置密码</view>
        <view class="input">
          <input
            type="password"
            name="password"
            :value="password"
            @change="inputPass($event)"
          />
        </view>
        <view class="keyboard">
          <view
            class="numeric"
            v-for="(item, index) in keyboard"
            :key="index"
            @tap="keyboradFn(index)"
            >{{ item.key }}</view
          >
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import {
  release,
  qiniuToken,
  cash,
  cost,
  blpay,
  appraiserDetail,
  placeOrder,
  pay,
  postPay
} from "../../api/publicationappraisal";
import { upload, init } from "../../utils/qiniuUploader";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
let appraiser_id = '';

export default {
  data() {
    return {
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      images: [
        {
          code: "out",
          name: "鞋子外观",
          image: "/uploads/appraisal/post/icon/out.png",
          isShow: false
        },
        {
          code: "mb_line",
          name: "中底走线",
          image: "/uploads/appraisal/post/icon/mb_line.png",
          isShow: false
        },
        {
          code: "mark",
          name: "鞋标",
          image: "/uploads/appraisal/post/icon/mark.png",
          isShow: false
        },
        {
          code: "box_stamp",
          name: "鞋盒钢印",
          image: "/uploads/appraisal/post/icon/box_stamp.png",
          isShow: false
        },
        {
          code: "filler",
          name: "鞋撑",
          image: "/uploads/appraisal/post/icon/filler.png",
          isShow: false
        },
        {
          code: "insole_mark",
          name: "鞋垫正面",
          image: "/uploads/appraisal/post/icon/insole_mark.png",
          isShow: false
        },
        {
          code: "insole_glue",
          name: "鞋垫反面",
          image: "/uploads/appraisal/post/icon/insole_glue.png",
          isShow: false
        },
        {
          code: "outsoles",
          name: "鞋底",
          image: "/uploads/appraisal/post/icon/outsoles.png",
          isShow: false
        },
        {
          code: "box_mark",
          name: "鞋盒侧标",
          image: "/uploads/appraisal/post/icon/box_mark.png",
          isShow: false
        },
        {
          code: "toe_cap",
          name: "鞋子头部",
          image: "/uploads/appraisal/post/icon/toe_cap.png",
          isShow: false
        },
        {
          code: "heelpiece",
          name: "鞋子后跟",
          image: "/uploads/appraisal/post/icon/heelpiece.png",
          isShow: false
        },
        {
          code: "0",
          name: "补图",
          image:
            config[NODE_ENV].qiniuUrl + "圆角矩形1拷贝@2x.png",
          isShow: false
        }
      ],
      clothingImages: [
        {
          code: "facade",
          name: "外观",
          image: "/uploads/appraisal/post/icon/facade.png",
          isShow: false
        },
        {
          code: "neck",
          name: "衣领标识",
          image: "/uploads/appraisal/post/icon/neck.png",
          isShow: false
        },
        {
          code: "trademark",
          name: "商标",
          image: "/uploads/appraisal/post/icon/trademark.png",
          isShow: false
        },
        {
          code: "trademark_chain",
          name: "吊牌",
          image: "/uploads/appraisal/post/icon/trademark_chain.png",
          isShow: false
        },
        {
          code: "bag",
          name: "外包装袋",
          image: "/uploads/appraisal/post/icon/bag.png",
          isShow: false
        },
        {
          code: "qr_code",
          name: "二维码",
          image: "/uploads/appraisal/post/icon/qr_code.png",
          isShow: false
        },
        {
          code: "zipper",
          name: "拉链接缝",
          image: "/uploads/appraisal/post/icon/zipper.png",
          isShow: false
        },
        {
          code: "receipt",
          name: "交易单据",
          image: "/uploads/appraisal/post/icon/receipt.png",
          isShow: false
        },
        {
          code: "washing_mark_1",
          name: "水洗标1",
          image: "/uploads/appraisal/post/icon/washing_mark_1.png",
          isShow: false
        },
        {
          code: "washing_mark_2",
          name: "水洗标2",
          image: "/uploads/appraisal/post/icon/washing_mark_2.png",
          isShow: false
        },
        {
          code: "washing_mark_3",
          name: "水洗标3",
          image: "/uploads/appraisal/post/icon/washing_mark_3.png",
          isShow: false
        },
        {
          code: "0",
          image:
            config[NODE_ENV].qiniuUrl + "圆角矩形1拷贝@2x.png",
          name: "补图"
        }
      ],
      price: "请输入保价金额，默认1000元...",
      insuredPriceNumber: "请输入商品实际价值",
      isPopup: false,
      markText: "",
      description: "",
      others: [],
      is_specialty: "",
      brand_id: "",
      upload_token: "",
      uploadPicture: {},
      isPay: false,
      cost: "",
      jdPrice: "",
      isPayShow: false,
      isPayType: "",
      isPayTypeIndex: -1,
      password: [{}, {}, {}, {}, {}, {}],
      keyIndex: 0,
      keyboard: [
        {
          key: 1,
          isClick: false
        },
        {
          key: 2,
          isClick: false
        },
        {
          key: 3,
          isClick: false
        },
        {
          key: 4,
          isClick: false
        },
        {
          key: 5,
          isClick: false
        },
        {
          key: 6,
          isClick: false
        },
        {
          key: 7,
          isClick: false
        },
        {
          key: 8,
          isClick: false
        },
        {
          key: 9,
          isClick: false
        },
        {
          key: "取消",
          isClick: false
        },
        {
          key: 0,
          isClick: false
        },
        {
          key: "删除",
          isClick: false
        }
      ],
      userCash: "",
      pay_no: "",
      isAgree: true,
      appraisals: [],
      bjPrice: 1000,
      type: "",
      flag: true
    };
  },
  onLoad(options) {
    uni.showLoading({
      title: "加载中...",
      icon: "none",
      mask: true
    });
    const { brand_id, is_specialty, type } = options;
    this.brand_id = brand_id;
    this.is_specialty = is_specialty;
    appraiser_id = options.appraiser_id;
    this.type = type;
    let price = "";
    if (is_specialty === "1") {
      price = 0;
    } else if (is_specialty === "2") {
      price =
        this.price === "请输入保价金额，默认1000元..." ? 1000 : this.price;
    }
    let appr_cost = 5;
    if (type === 'clothing') {
      appr_cost = 8;
    }
    cost({ appr_cost, appr_goods_scale: 0.03, price }).then(result => {
      const { cost } = result.data;
      this.cost = cost;
      uni.hideLoading();
    });
    appraiserDetail({
      id: appraiser_id
    }).then(result => {
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
            name: data[key].name
          });
        }
      });
    });
  },
  methods: {
    baojia() {
      uni.navigateTo({
        url: '/pages/professionalidentificationagreement/professionalidentificationagreement'
      })
    },
    resetCheck() {
      uni.navigateBack({
        delta: 1
      });
    },
    inputPass(e) {
      const pass = e.target.value;
      this.password = pass;
    },
    checkPay(index) {
      const obj = [{ type: "blpay" }, { type: "pay" }, { type: "pay" }];
      this.isPayType = obj[index].type;
      this.isPayTypeIndex = index;
    },
    ImmediatePayment() {
      if (this.isPayType === "blpay") {
        this.isPay = true;
      } else {
      }
    },
    isAgreeFn() {
      this.isAgree = !this.isAgree;
    },
    keyboradFn(index) {
      if (index === 9) {
        this.isPay = false;
        return;
      }
      if (index === 11) {
        if (this.keyIndex <= 0) {
          return;
        }
        this.keyIndex--;
        this.password[this.keyIndex].number = null;
        return;
      }
      if (this.keyIndex >= 5) {
        uni.showLoading({
          title: "加载中...",
          icon: "none",
          mask: true
        });
        this.keyIndex = 5;
        this.password[this.keyIndex].number = this.keyboard[index].key;
        let password = "";
        this.password.forEach(item => {
          password += item.number;
        });
        blpay({
          password,
          pay_no: this.pay_no,
          driver: "wallet",
          method: "miniapp"
        }).then(result => {
          const { status, message } = result.data;
          uni.showToast({
            title: message,
            icon: "none",
            success() {
              uni.reLaunch({
                url: "/pages/releasedsuccessfully/releasedsuccessfully"
              });
            }
          });
          uni.hideLoading();
        });
      }
      this.password[this.keyIndex].number = this.keyboard[index].key;
      this.keyIndex++;
    },
    closePay() {
      this.isPayShow = false;
    },
    getPath(path) {
		if (/圆角矩形1拷贝@2x/.test(path)) {
			return path;
		}
      if (/\.\./gi.test(path)) {
        return path;
      }
      if (/tmp/gi.test(path)) {
        return path;
      }
      return config[NODE_ENV].imgUrl + path;
    },
    upImg(index) {
      const that = this;
      uni.chooseImage({
        count: 1,
        success(res) {
          const { tempFilePaths } = res;
          const imgPath = tempFilePaths[0];
          if (that.type === "clothing") {
            that.clothingImages[index].image = imgPath;
            that.clothingImages[index].isShow = true;
            if (index >= that.clothingImages.length - 1) {
              that.clothingImages[index].code = index - 11;
              that.clothingImages[index].image = imgPath;
              that.clothingImages[index].name = "补充";
              const obj = {
                code: index - 10,
                image:
                  this.qiniuUrl + "圆角矩形1拷贝@2x.png",
                name: "补充"
              };
              that.clothingImages.push(obj);
            }
          } else {
            that.images[index].image = imgPath;
            that.images[index].isShow = true;
            if (index >= that.images.length - 1) {
              that.images[index].code = index - 11;
              that.images[index].image = imgPath;
              that.images[index].name = "补充";
              const obj = {
                code: index - 10,
                image:
                  this.qiniuUrl + "圆角矩形1拷贝@2x.png",
                name: "补充"
              };
              that.images.push(obj);
            }
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    uploadImgQiniu(images) {
      let that = this;
      const res_img = [];
      images.forEach(image => {
        if (/tmp/gi.test(image.image) && !/appraiser/gi.test(image.image)) {
          res_img.push(image);
        }
      });
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
                  that.uploadPicture[r.code] = res.imageURL;
                  const keys = Object.keys(that.uploadPicture);
                  keys.length === res_img.length && resolve(that.uploadPicture);
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
    mark(e) {
      this.markText = e.target.value;
      this.description = e.target.value;
    },
    insuredPrice(e) {
      const number = e.target.value;
      if (number === "") {
        this.insuredPriceNumber = "请输入商品实际价值";
      } else {
        this.insuredPriceNumber = number;
        this.bjPrice = number;
        let price = number * 0.03;
        if (price <= 1) {
          price = 1;
        } else {
          price = Math.floor(price);
        }
        this.jdPrice = price;
      }
    },
    popup() {
      this.isPopup = true;
      this.insuredPriceNumber = "请输入商品实际价值";
    },
    cancel() {
      this.isPopup = false;
      this.insuredPriceNumber = "请输入商品实际价值";
    },
    confirm() {
      if (this.insuredPriceNumber === "请输入商品实际价值") {
        uni.showToast({
          title: "请输入保价金额",
          icon: "none"
        });
        return;
      }
      if (this.insuredPriceNumber > 20000) {
        uni.showToast({
          title: "商品保价不能超过两万元",
          icon: "none"
        });
        return;
      }
      this.price = this.insuredPriceNumber;
      cost({
        appr_cost: 5,
        appr_goods_scale: 0.03,
        price: this.price
      }).then(result => {
        const { cost } = result.data;
        this.cost = cost;
      });
      this.isPopup = false;
    },
    appraisal() {
      uni.showLoading({
        title: "加载中...",
        icon: "none"
      });
      const that = this;
      let images = [];
      if (this.type === "clothing") {
        images = this.clothingImages;
      } else {
        images = this.images;
      }
      const res_img = [];
      images.forEach(image => {
        if (/tmp/gi.test(image.image) && !/appraiser/gi.test(image.image)) {
          res_img.push(image);
        }
      });
      if (res_img.length <= 2) {
        this.flag = true;
        uni.showToast({
          title: "至少上传3张图片",
          icon: "none"
        });
        return;
      }
      this.uploadImgQiniu(images).then(result => {
        placeOrder({
          description: this.description,
          images: result,
          others: this.others,
          is_specialty: this.is_specialty,
          price: this.bjPrice,
          brand_id: this.brand_id,
          appraiser_list: appraiser_id,
          openid: uni.getStorageSync('openid')
        })
          .then(result => {
            const { message, status, pay_no } = result.data;
            this.pay_no = pay_no;
            // uni.showLoading({
            //   title: message,
            //   icon: "none",
            //   success() {
                if (status === 201) {
                  uni.showLoading({
                    title: '加载中...',
                    icon: "none",
                    mask: true
                  });
                  // cash().then(result => {
                  //   const { userCash } = result.data.data;
                  //   that.userCash = userCash;
                    // that.isPayShow = true;
                    pay({
                      pay_no,
                      method: "miniapp",
                      driver: "wechat",
                      openid: uni.getStorageSync("openid"),
                      miniapp_name: "appraisal"
                    }).then(result => {
                      const { status, message } = result.data;
                      // if (status !== 200) {
                      //   uni.showToast({
                      //     title: message,
                      //     icon: "none",
                      //     mask: true
                      //   });
                      //   return;
                      // }
                      uni.showLoading({
                        title: '加载中...',
                        icon: "none",
                        mask: true
                      });
                      if (message === 'Get Wechat API Error:OK该订单已支付') {
                        postPay({
                          pay_no
                        }).then(result => {
                          const { message, status } = result.data;
                          // uni.hideLoading();
                          if (status === 201) {
                            uni.showToast({
                              title: "支付成功",
                              icon: "none",
                              mask: true,
                              success() {
                                uni.reLaunch({
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
                              uni.reLaunch({
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
                          that.flag = true;
                            uni.showLoading({
                              title: "支付中...",
                              icon: "none",
                              mask: true
                            });
                            postPay({
                              pay_no
                            }).then(result => {
                              const { message, status } = result.data;
                              // uni.hideLoading();
                              if (status === 201) {
                                uni.showToast({
                                  title: "支付成功",
                                  icon: "none",
                                  mask: true,
                                  success() {
                                    uni.reLaunch({
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
                                  uni.reLaunch({
                                    url: "/pages/index3/index3"
                                  });
                                }
                              });
                            });
                          // } else {
                            // uni.showLoading({
                            //   title: "支付失败",
                            //   icon: "none",
                            //   mask: true,
                            //   success() {
                            //     uni.redirectTo({
                            //       url: "/pages/index3/index3"
                            //     });
                            //   }
                            // });
                          // }
                        },
                        fail(e) {
                          that.flag = true;
                          if (e.errMsg === "requestPayment:fail cancel") {
                            uni.showToast({
                              title: "支付失败",
                              icon: "none",
                              mask: true,
                              success() {
                                uni.reLaunch({
                                  url: "/pages/index3/index3"
                                });
                              }
                            });
                          }
                        }
                      });
                    });
                    // uni.hideLoading();
                  // });
                  // uni.navigateTo({
                  //   url: "/pages/releasedsuccessfully/releasedsuccessfully"
                  // });
                } else {
                  that.flag = true;
                  uni.showToast({
                    title: message,
                    icon: "none"
                  });
                }
            //   }
            // });
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    submission() {
      if (!this.isAgree) {
        uni.showToast({
          title: "请勾选同意条款",
          icon: "none"
        });
        return;
      }
      // let number = 0;
      // this.images.forEach(img => {
      //     if (/tmp/gi.test(img.image)) {
      //         number++;
      //     }
      // });
      // if (number >= 1) {
      if (this.flag) {
        this.flag = false;
        this.appraisal();
      }
      // } else {
      //     uni.showToast({
      //         title: '前三张主图必传',
      //         icon: "none"
      //     });
      // }
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;

  .check {
    width: 680rpx;
    margin: 0 auto;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 86rpx;
    }

    .left {
      font-size: 34rpx;
      color: #000000;
    }
    .right {
      color: #898989;
      font-size: 26rpx;
    }
    .arrow {
      width: 13rpx;
      height: 21rpx;
      margin-left: 10rpx;
    }

    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f4f3f9;
      border-radius: 16rpx;
      padding: 26rpx;
      margin-bottom: 20rpx;

      .avatar {
        width: 70rpx;
        height: 70rpx;
        margin-right: 18rpx;
      }

      .level {
        width: 26rpx;
        height: 26rpx;
        margin-left: 8rpx;
        margin-right: 2rpx;
      }

      .nickname {
        font-size: 24rpx;
        color: #000;
      }

      .level-name {
        font-size: 22rpx;
        color: #898989;
      }

      .arrow2 {
        width: 12rpx;
        height: 19rpx;
      }
      .desc {
        font-size: 24rpx;
        color: #666666;
        margin-top: 10rpx;
        line-height: 36rpx;
        width: 468rpx;
      }
    }
    .left {
      display: flex;
      align-items: center;

      .top {
        display: flex;
        align-items: center;
      }
    }
  }

  .content {
    width: 690rpx;
    margin: 0 auto;
  }
}

.itemnumber {
  margin-bottom: 44rpx;

  &.itemnumber2 {
    margin-bottom: 144rpx;
  }

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
      position: relative;
    }

    .img {
      background-color: #ffffff;
      border-radius: 8rpx;
      border: dashed 2rpx #e5e5e6;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 146rpx;
      height: 146rpx;
      margin: 0 auto;
      overflow: hidden;

      image {
        width: 146rpx;
        // height: 146rpx;
      }
    }

    text {
      width: 100%;
      font-size: 22rpx;
      position: absolute;
      bottom: 20rpx;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 2;
      color: #fff;
    }

    .mark2 {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      width: 146rpx;
      height: 40%;
      background-color: rgba($color: #000000, $alpha: 0.4);
      z-index: 1;
    }
  }
}

.btn-info {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  height: 110rpx;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(23, 37, 112, 0.1);

  .btn-info-left {
    width: 462rpx;
    height: 97rpx;
    padding-left: 48rpx;
    background-color: #ffffff;
    font-size: 24rpx;

    image {
      width: 22rpx;
      height: 22rpx;
    }

    view {
      &:nth-of-type(1) {
        padding-top: 3rpx;

        text {
          font-size: 34rpx;
          color: #5e95f4;

          .icon,
          .bj-price {
            font-size: 24rpx;
          }
          .bj-price {
            color: #282828;
            margin-left: 10rpx;
          }
        }
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
    width: 240rpx;
    height: 86rpx;
    margin-right: 30rpx;
    margin-top: 10rpx;
    background-color: #7186f1;
    border-radius: 16rpx;
    color: #fff;
    text-align: center;
    line-height: 86rpx;
  }
}

.mark {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.Popup {
  width: 650rpx;
  height: 704rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;

  .title {
    font-size: 26rpx;
    padding-top: 40rpx;
    padding-left: 38rpx;
  }

  .form {
    width: 570rpx;
    height: 88rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    position: relative;
    margin-left: 36rpx;
    margin-top: 20rpx;

    input {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      padding-left: 34rpx;
      font-size: 26rpx;
      color: #989898;
    }

    view {
      position: absolute;
      right: 18rpx;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
  }

  .price {
    font-size: 22rpx;
    margin-top: 18rpx;
    margin-left: 68rpx;

    text {
      font-size: 26rpx;
    }
  }

  .tip {
    margin-left: 38rpx;
    margin-top: 42rpx;
    margin-bottom: 52rpx;

    .tip-title {
      font-size: 24rpx;
      color: #5e95f4;
      margin-bottom: 26rpx;

      image {
        width: 24rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
    }

    .p {
      margin-bottom: 22rpx;
      font-size: 22rpx;
    }
  }

  .btn {
    display: flex;
    border-top: 1rpx solid #f7f7f7;
    height: 100rpx;

    view {
      flex: 1;
      text-align: center;
      line-height: 100rpx;
      height: 100rpx;

      &:nth-of-type(1) {
        border-right: 1rpx solid #f7f7f7;
      }

      &:nth-of-type(2) {
        color: #5e95f4;
      }
    }
  }
}

.pay,
.password {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #fff;

  .price,
  .title,
  .type {
    padding-left: 20rpx;
    padding-right: 20rpx;
    border-bottom: 1rpx solid #f2f2f2;
  }

  .price {
    height: 125rpx;
    line-height: 125rpx;
  }

  .title {
    height: 92rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1rpx solid #f2f2f2;

    image {
      width: 26rpx;
      height: 26rpx;
    }
  }

  .type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 104rpx;

    image {
      margin-right: 20rpx;
    }

    .left {
      display: flex;
    }

    &.weixin {
      image {
        width: 40rpx;
        height: 36rpx;
      }
    }
    &.yuee,
    &.zhifubao {
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  .imm-pay {
    height: 110rpx;
    line-height: 110rpx;
    text-align: center;
    color: #fff;
    background-color: #5e95f4;
  }
}
.password {
  .title {
    text-align: center;
  }
  .password-box,
  .reset {
    padding-left: 20rpx;
    padding-right: 20rpx;
  }
  .input {
    height: 0;
    overflow: hidden;
  }
  .password-box {
    height: 90rpx;
    border-radius: 6rpx;
    margin-top: 40rpx;
    display: flex;

    .numeric {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90rpx;
      border: 1rpx solid #c9c9c9;
      border-right: none;

      &:nth-of-type(1) {
        border-top-left-radius: 6rpx;
        border-bottom-left-radius: 6rpx;
      }
      &:nth-of-type(6) {
        border-right: 1rpx solid #c9c9c9;
        border-top-right-radius: 6rpx;
        border-bottom-right-radius: 6rpx;
      }

      .active {
        width: 16rpx;
        height: 16rpx;
        border-radius: 16rpx;
        background-color: #282828;
        opacity: 0.87;
      }
    }
  }

  .reset {
    font-size: 26rpx;
    color: #5e95f4;
    margin-top: 28rpx;
    margin-bottom: 120rpx;
    text-align: right;
  }

  .keyboard {
    display: flex;
    flex-wrap: wrap;
    .numeric {
      width: 250rpx;
      height: 110rpx;
      border-radius: 1rpx;
      border: solid 1rpx #eef0f4;
      border-collapse: collapse;
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-of-type(10) {
        background-color: #eef0f4;
      }
      &:nth-of-type(12) {
        background-color: #eef0f4;
      }
    }
  }
}
</style>
