<template>
  <view class="container">
    <div class="info-container">
      <view class="info" :class="{active: isOpen}">
        <view class="top" @tap="open">
          <view class="title">服务项目 <image class="arrow" :src="qiniuUrl+'鉴定贴详情-展开@2x.png'"></image></view>
          <view class="img">
            <image
              v-if="mold === '1'"
              :src="qiniuUrl+'/免费鉴定@2x.png'"
            ></image>
            <image
              v-if="mold === '2'"
              :src="qiniuUrl+'/专业鉴定@2x.png'"
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
          <view class="tab" @tap="goto(0)">
            <image
              :src="qiniuUrl+'/个人主页2@2x.png'"
            ></image>
            <text>查看主页</text>
          </view>
          <view class="tab" @tap="goto(1)">
            <image
              :src="qiniuUrl+'/记录@2x.png'"
            ></image>
            <text>查看记录</text>
          </view>
          <view class="tab" @tap="goto(2)">
            <image
              :src="qiniuUrl+'/备注@2x.png'"
            ></image>
            <text>备注标签</text>
          </view>
        </view>
        <view class="retract" @tap="open">收起 <image class="arrow" :src="qiniuUrl+'鉴定贴详情-展开@2x - 副本.png'"></image></view>
      </view>
    </div>
    <view class="djd">
      <view class="top">
        <view class="title">
          {{JDstatus}}
        </view>
        <image
          class="bjd-img"
          :src="qiniuUrl+'/技术支持2@2x.png'"
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
      <view class="title">
        {{data.brand_name}}
      </view>
      <view class="beizhu">
        {{ data.description ? data.description : '暂无备注' }}
      </view>
      <view class="imgs">
        <view class="img-box" v-for="(item, index) in images" :key="index" @tap="previewImage(index)">
          <view class="inner">
            <view class="img">
              <image :src="getPath(item.path, item.image)" mode="widthFix"></image>
            </view>
          </view>
          <view class="mark">
            {{ item.name }}
          </view>
        </view>
      </view>
      <view v-if="isJD === 'false'" class="gdjl">
        <image :src="qiniuUrl+'Workorderrecord@2x.png'"></image>
      </view>
    </view>
    <view class="record">
      <view class="en">Work order record</view>
      <view class="line"></view>
      <view class="title">工单记录</view>
      <view class="text">鉴定结论得出后30天内可提交工单</view>
      <view class="text">超出时间后无法创建</view>
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
    <view class="mask" v-show="is_start"></view>
    <view class="mask" v-show="isHandOver"></view>
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
      <form @submit="submit" report-submit='true'>
        <button class="button" formType="submit">确认提交</button>
      </form>
    </view>
    <view class="handover" v-show="isHandOver">
      <view class="title">转交他人</view>
      <view class="close" @tap="zj_close">关闭</view>
      <view class="lists-box">
        <scroll-view class="lists" scroll-x="true">
          <view class="list" v-for="(item, index) in appraisers" :key="index" @tap="check_appr(index)">
            <image v-show="!item.checked" class="icon" :src="qiniuUrl+'对号-加粗@2x.png'"></image>
            <image v-show="item.checked" class="icon" :src="qiniuUrl+'对号-加粗2@2x.png'"></image>
            <view class="left">
              <image class="avatar" :src="item.avatar"></image>
              <image class="level-img" :src="qiniuUrl+'矢量智能对象@2x.png'"></image>
            </view>
            <view class="right">
              <view class="nickname">{{item.name}}</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="buttons">
        <view class="cancel-btn" @tap="zj_close">
          取消
        </view>
        <form @submit="sub_zj" report-submit='true'>
          <button class="yes-btn" formType="submit">确认转交</button>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
import { appraise, post, changeAppraiser } from "../../api/Identificationdetails";
import {appraiserList} from '../../api/selectappraiser';
import config from "../../config";
const NODE_ENV = process.env.NODE_ENV;
let result = 1;
let previewImages = [];

export default {
  data() {
    return {
      share: {
        title: '鉴定贴详情',
        path: '/pages/Identificationdetails2/Identificationdetails2?id='+this.id+'&type='+this.type+'&isJD=true&post_status='+this.post_status,
      },
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      details: {},
      markContent: "",
      checks: [
        {
          text: "真",
          checked: true,
          number: 1
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
        },
        {
          text: "建议退货",
          checked: false,
          number: 3
        },
        {
          text: "假",
          checked: false,
          number: 0
        }
      ],
      images: [],
      user_info: {},
      work_order: [],
      data: {},
      hint_top: "",
      appraiser: [],
      operation_name: "",
      is_start: false,
      avatar: "",
      type: "",
      markPlace: "可添加备注以便以后查看（仅鉴定师可见）",
      bzFw: false,
      mold: '',
      JDstatus: '',
      isJD: '',
      isOpen: false,
      appraisers: [],
      isHandOver: false,
      post_status: ''
    };
  },
  onLoad(options) {
    result = 1;
    uni.showLoading({
      title: '加载中...',
      icon: 'none',
      mask: true
    });
    const { id, type, mold, isJD, post_status } = options;
    this.post_status = post_status;
    this.type = type;
    this.mold = mold;
    this.isJD = isJD;
    post({ id }).then(result => {
      const {
        images,
        user_info,
        work_order,
        data,
        hint_top,
        appraiser,
        operation_name
      } = result.data;
      this.images = images;
      previewImages = [];
      images.forEach(image => {
        if (image.path) {
          previewImages.push(this.getPath(image.path));
        } else {
          previewImages.push(config[NODE_ENV].qiniuUrl+image.image);
        }
      });
      this.user_info = user_info;
      this.work_order = work_order;
      this.data = data;
      this.hint_top = hint_top;
      this.appraiser = appraiser;
      this.operation_name = operation_name;
      if (/avatar_/ig.test(user_info.avatar)) {
        this.avatar = config[NODE_ENV].imgUrl + user_info.avatar;
      }
      this.JDstatus = data.result;
      appraiserList({
          brand_id: data.brand_id
      }).then(result => {
        result.data.cover_image = config[NODE_ENV].imgUrl + result.data.cover_image;
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
              avatar = config[NODE_ENV].imgUrl + result.data[key].avatar;
            }
            arr.push({
              appr_ask: result.data[key].appr_ask,
              level_name: result.data[key].level_name,
              name: result.data[key].name,
              bio: result.data[key].bio,
              avatar: avatar,
              apprs: result.data[key].data,
              id: result.data[key].user_id,
              appr_id: result.data[key].appr_id
            });
          }
        });
        arr.forEach((item, index) => {
          item.checked = false;
          item.index = index;
        });
        this.appraisers = arr;
        uni.hideLoading();
      });
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
    }
  },
  methods: {
    previewImage(index) {
          uni.previewImage({
              current: index,
              urls: previewImages
          });
      },
    goto(index) {
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
    zj_tr() {
      this.isHandOver = true;
    },
    zj_close() {
      this.isHandOver = false;
    },
    sub_zj(e) {
      if (this.checkedNumber <= 0) {
        uni.showToast({
          title: '请选择鉴定师',
          icon: "none"
        });
        return;
      }
      let new_appraiser_id = '';
      let type = '';
      if (this.data.brand_type === 0) {
        type = 'shoes';
      } else if (this.data.brand_type === 1) {
        type = 'clothimg';
      }
      let path = '';
      if (this.data.post_status === 11) {
        path = '/pages/zy-publicationappraisal3/zy-publicationappraisal3?brand_id='+this.data.brand_id+'&is_specialty='+this.data.is_specialty+'&appraiser_id='+this.user_info.user_id+'&type='+type+'&id='+this.data.id
      } else {
        path= "/pages/Identificationdetails3/Identificationdetails3?id=" +
                this.data.id +
                "&type=" +
                this.data.is_specialty +
                '&is_appraiser=0'
      }
      this.appraisers.forEach(appraiser => {
        if (appraiser.checked) {
          new_appraiser_id = appraiser.appr_id;
        }
      });
      const openid = uni.getStorageSync('openid');
      const formid = [];
      formid.push({formid: e.detail.formId, ts: new Date().getTime()});
      let app = getApp();
      app.globalData.templateMessage({formid, openid}).then(res => {
        changeAppraiser({
          post_id: this.data.id,
          new_appraiser_id,
          path
        }).then(result => {
          const that = this;
          const {message, status} = result.data;
          if (status === 401) {
            uni.showToast({
              title: message,
              icon: "none"
            });
            return;
          }
          uni.showToast({
            title: message,
            icon: "none",
            duration: 1500,
            success() {
              uni.redirectTo({
                url: '/pages/means4/means4?type=' + that.type
              });
            }
          });
        });
      });
    },
    check_appr(index) {
      this.appraisers.forEach(item => {
        item.checked = false;
      });
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
      result = this.checks[index].number;
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
    submit(e) {
      if (this.markContent === '') {
        uni.showToast({
          title: '请输入备注',
          icon: 'none'
        });
        return;
      }
      uni.showLoading({
        title: '加载中...',
        icon: 'none',
        mask: true
      });
      let type = '';
      if (this.data.brand_type === 0) {
        type = 'shoes';
      } else if (this.data.brand_type === 1) {
        type = 'clothimg';
      }
      let path = '';
      // brand_id=2&is_specialty=1&appraiser_id=111628&type=shoes&id=12012
      if (result === 10) {
          path = '/pages/zy-publicationappraisal3/zy-publicationappraisal3?brand_id='+this.data.brand_id+'&is_specialty='+this.data.is_specialty+'&appraiser_id='+this.user_info.user_id+'&type='+type+'&id='+this.data.id
      } else {
          path= "/pages/Identificationdetails3/Identificationdetails3?id=" +
                  this.data.id +
                  "&type=" +
                  this.data.is_specialty +
                  '&is_appraiser=0'
      }
      console.log(path, result);
      const that = this;
      const params = {
        result: result,
        brand_id: this.data.brand_id,
        id: this.data.id,
        add_status: result === 10 ? 1 : 0,
        //id=11996&type=1&is_appraiser=0
        path
      };
      if (result === 10) {
        params.need_image = this.markContent;
      } else {
        params.result_reason = this.markContent;
      }
      const openid = uni.getStorageSync('openid');
      const formid = [];
      formid.push({formid: e.detail.formId, ts: new Date().getTime()});
      let app = getApp();
      app.globalData.templateMessage({formid, openid}).then(res => {
        console.log(res);
        appraise(params).then(result => {
          uni.hideLoading();
          uni.showToast({
            title: "提交成功",
            success() {
              uni.redirectTo({
                url: '/pages/means4/means4?type='+that.type
              });
            }
          });
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
    box-shadow: 0rpx 0rpx 20rpx 0rpx 
        rgba(0, 0, 0, 0.04);
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
      color: #666;
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

    .cancel-btn,.yes-btn {
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

.desc {
    view {
        &:nth-of-type(2) {
            margin-top: 5rpx;
        }
    }
}

.info-container {
  background-color: #eef1f4;
  overflow: hidden;
}
.arrow {
  width: 18rpx;
  height: 16rpx;
}

.info {
  width: 690rpx;
  height: 90rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 22rpx 28rpx 28rpx 38rpx;
  margin: 15rpx auto;
  overflow: hidden;


  &.active {
    height: 280rpx;
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

.top,
.center,
.bottom {
  display: flex;
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

  margin-bottom: 30rpx;
  display: flex;
  justify-content: space-between;

  .price {
    margin-left: 10rpx;
  }

  image {
    margin-left: 28rpx;
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

.retract {
  font-size: 24rpx;
  color: #898989;
  text-align: center;
  height: 70rpx;
  line-height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .arrow {
    margin-left: 10rpx;
  }
}

.djd {
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

.imgs {
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  .img-box {
    font-size: 22rpx;
    color: #ffffff;
    width: 25%;
    display: inline-block;
    position: relative;
    border-radius: 8rpx;
    overflow: hidden;
    margin-bottom: 28rpx;

    .inner {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .img {
      position: relative;
      width: 150rpx;
      height: 154rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border: dashed 2rpx #e5e5e6;
      border-radius: 8rpx;

      image {
        width: 150rpx;
        // height: 150rpx;
        background-color: #ffffff;
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
      height: 40%;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 3;
      width: 150rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 22rpx;
      border-bottom-right-radius: 8rpx;
      border-bottom-left-radius: 8rpx;
    }
  }
}

.content {
  padding-left: 28rpx;
  padding-right: 28rpx;
  margin-bottom: 30rpx;
  overflow: hidden;

  .title {
    font-size: 40rpx;
    margin-top: 32rpx;
  }

  .beizhu {
    font-size: 26rpx;
    margin-top: 22rpx;
    margin-bottom: 36rpx;
  }
}

.btns {
  width: 680rpx;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 998;
  bottom: 50rpx;
  display: flex;
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

.record {
  margin-bottom: 180rpx;
  
  .en {
    font-size: 30rpx;
  }
  .line {
    width: 300rpx;
    height: 1rpx;
    background: #8a8589;
    margin: 6rpx auto;
  }
  .title {
    color: #000000;
    margin-bottom: 24rpx;
  }
  .text {
    color: #4b525b;
    font-size: 24rpx;
    line-height: 42rpx;
  }
  .en,.title,.text {
    text-align: center;
  }
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
