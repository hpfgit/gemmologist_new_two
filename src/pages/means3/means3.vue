<template>
  <scroll-view class="scroll-view" @scrolltolower="scrolltolower" scroll-y="true">
    <view class="container">
      <view class="lists" v-if="lists.length">
        <view
          class="item"
          v-for="(item, index) in lists"
          :key="index"
          @tap="gotoDetails(item)"
        >
          <!-- <image
            v-if="item.is_specialty"
            class="specialty-img"
            src="../../static/images/费用信息@2x.png"
            @tap="priceDetails(index)"
          ></image> -->
          <image
            v-show="item.final_result === 0"
            class="yinz"
            :src="qiniuUrl+'为假@2x.png'"
          ></image>
          <image
            v-show="item.final_result === 1"
            class="yinz"
            :src="qiniuUrl+'为真拷贝2@2x.png'"
          ></image>
          <image
            v-show="item.final_result === 2"
            class="yinz"
            :src="qiniuUrl+'无法鉴定拷贝@2x.png'"
          ></image>
          <image v-show="item.final_result === 3" class="yinz" :src="qiniuUrl+'建议退货@2x.png'"></image>
          <image v-show="item.is_quicken_pay === 1 && item.post_status !== 13" class="yinz jiasu" :src="qiniuUrl+'加速鉴定中@2x.png'"></image>
          <image class="left-image" :src="getPath(item.cover_image)"></image>
          <view class="item-right">
            <view class="top">
              <text>{{ item.brand_name }}</text>
            </view>
            <view class="center">
              <view class="jds"
                >鉴定师
                <text v-for="(ite, index) in item.user_name" :key="index">{{
                  ite
                }}</text></view
              >
              <view
                class="date"
                :class="{
                  hide: item.final_result === 10 || item.final_result === 12
                }"
                >{{ item.created_at }}</view
              >
              <view
                class="date"
                :class="{
                  block: item.final_result === 10 || item.final_result === 12,
                  hide: item.final_result !== 10 || item.final_result !== 12
                }"
                >{{ item.status }}</view
              >
            </view>
          </view>
        </view>
      </view>
      <nodata v-if="!lists.length"/>
    </view>
  </scroll-view>
</template>

<script>
import { banzhu_appraise_num, banzhu_appraise } from "../../api/moderator";
import { isAppraiser } from "../../api/index";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
import nodata from '../../component/nodata/nodata.vue';

export default {
  data() {
    return {
      lists: [],
      imgPath: config[NODE_ENV].imgUrl,
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      type: "",
      mold: "",
      is_appraisal_admin: "",
      page: 1,
      totalPage: '',
      istype: ''
    };
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getData();
  },
  onLoad(options) {
    const {istype, type, mold} = options;
    this.istype = istype;    
    this.type = type;
    this.mold = mold;
    this.getData();
  },
  methods: {
    scrolltolower() {
      this.page ++;
      if (this.page > this.totalPage) {
        uni.showToast({
          title: '已经加载全部的数据',
          icon: 'none'
        });
        uni.hideLoading();
        return;
      }
      this.getData();
    },
    getData() {
      uni.showLoading({
        title: '加载中...',
        icon: 'none'
      });
      isAppraiser().then(result => {
        const { is_appraisal_admin } = result.data;
        this.is_appraisal_admin = is_appraisal_admin;
      });
      banzhu_appraise({
        type: this.type,
        page: this.page
      }).then(result => {
        const { data, count } = result.data;
        if (this.page > 1) {
            data.forEach(element => {
                this.lists.push(element);
            });
        } else {
            this.lists = data;
        }
        this.totalPage = Math.ceil( count / 10 );
        uni.hideLoading();
      });
    },
    getPath(path) {
      return config[NODE_ENV].imgUrl + path;
    },
    gotoDetails(item) {
      if (this.is_appraisal_admin === 1) {
        uni.navigateTo({
          url:
            "../Identificationdetails4/Identificationdetails4?id=" +
            item.id +
            "&type=" +
            this.type +
            "&mold=" +
            this.mold +
            "&isJD=true&is_appraisal_admin=" +
            this.is_appraisal_admin +
            "&post_status=" +
            item.post_status +
            "&istype=" + this.istype
        });
      } else {
        uni.navigateTo({
          url:
            "../Identificationdetails2/Identificationdetails2?id=" +
            item.id +
            "&type=" +
            this.type +
            "&mold=" +
            this.mold +
            "&isJD=true" +
            "&post_status=" +
            item.post_status
        });
      }
    }
  },
  components: {
    nodata
  }
};
</script>

<style lang="scss">
.hide {
  display: none;
}

.block {
  display: block;
}

.scroll-view {
  height: 100vh;
}

.lists {
  padding-top: 24rpx;
  padding-bottom: 24rpx;

  .item {
    display: flex;
    width: 690rpx;
    height: 180rpx;
    border-radius: 10rpx;
    background-color: #ffffff;
    margin: 0 auto 20rpx;
    padding: 20rpx 16rpx;
    position: relative;

    .yinz {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 193rpx;
      height: 137rpx;

      &.jiasu {
          width: 68rpx;
          height: 68rpx;
          right: 40rpx;
      }
    }
  }

  .specialty-img {
    width: 44rpx;
    height: 74rpx;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 997;
    margin: auto;
  }

  .left-image {
    width: 144rpx;
    height: 144rpx;
    border-radius: 4rpx;
  }

  .item-right {
    margin-left: 24rpx;
    flex: 1;

    .top {
      display: flex;
      justify-content: space-between;
      margin-top: 22rpx;

      text {
        color: #000;
      }

      .date {
        color: #858585;
      }

      image {
        width: 22rpx;
        height: 22rpx;
        vertical-align: top;
        margin-top: 9rpx;
        margin-right: 10rpx;
      }
    }

    .center {
      margin-top: 6rpx;

      view,
      text {
        font-size: 22rpx;
        color: #898989;
      }

      text {
        margin-left: 6rpx;
      }

      .date {
        margin-top: 6rpx;
      }
    }

    .bottom {
      margin-top: 14rpx;

      text,
      view {
        font-size: 22rpx;
        color: #282828;
      }

      .zy {
        color: #5e95f4;
      }
    }
  }
}
</style>
