<template>
    <view class="container">
        <textarea class="content" placeholder="请输入您的问题..." @input="getContent($event)"></textarea>
        <view class="up-img">
            <view class="box" v-for="(item, index) in images" :key="index">
                <image class="img" :src="item.path"></image>
                <image class="close" @tap="close(index)" :src="qiniuUrl+'删除拷贝@2x.png'"></image>
            </view>
            <image class="img" @tap="upImg(index)" :src="qiniuUrl+'圆角矩形1拷贝@2x.png'"></image>
        </view>
        <view class="btn" @tap="submit">
            确认提交
        </view>
    </view>
</template>

<script>
import {workOrder} from '../../api/gemmologist';
import {qiniuToken} from "../../api/publicationappraisal";
import { upload, init } from "../../utils/qiniuUploader";
import config from '../../config/index';
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            images: [],
            uploadPicture: [],
            content: '',
            id: '',
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            is_appraiser: ''
        }
    },
    onLoad(options) {
        const {id, is_appraiser} = options;
        this.id = id;
        this.is_appraiser = is_appraiser;
    },
    methods: {
        upImg() {
            const that = this;
            uni.chooseImage({
                count: 1,
                success(res) {
                    const { tempFilePaths } = res;
                    const imgPath = tempFilePaths[0];
                    that.images.push({
                        path: imgPath
                    });
                },
                fail(err) {
                    console.log(err);
                }
            });
        },
        close(index) {
            this.images.splice(index, 1);
        },
        uploadImgQiniu(images) {
            let that = this;
            const res_img = [];
            images.forEach(image => {
                if (/tmp/gi.test(image.path)) {
                    res_img.push(image);
                }
            });
            return new Promise((resolve, reject) => {
                images.map((r, i) => {
                    const path = r.path;
                    let ext = path.split(".")[path.split(".").length - 1];
                    if (/tmp/gi.test(path)) {
                        qiniuToken().then(res => {
                            let { upload_token } = res.data.data;
                            upload(
                                path,
                                res => {
                                    console.log(res);
                                    that.uploadPicture.push(res.imageURL);
                                    // const keys = Object.keys(that.uploadPicture);
                                    console.log(that.uploadPicture.length, res_img.length);
                                    that.uploadPicture.length === res_img.length &&
                                        resolve(that.uploadPicture);
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
        getContent(event) {
            console.log(event.target.value);
            this.content = event.target.value;
        },
        submit() {
            const that = this;
            if (this.content === '') {
                uni.showToast({
                    title: '请输入内容',
                    icon: 'none'
                });
                return;
            }
            uni.showLoading({
                title: '加载中...',
                icon: 'none'
            });
            console.log(this.images.length);
            if (this.images.length > 0) {
                this.uploadImgQiniu(this.images).then(result => {
                    console.log(result);
                    workOrder({
                        post_id: this.id,
                        content: this.content,
                        images: result,
                        is_appraiser: this.is_appraiser
                    }).then(result => {
                        console.log(result);
                        uni.hideLoading();
                        const {message, status} = result.data;
                        if (status === 403) {
                            uni.showToast({
                                title: message,
                                icon: 'none'
                            });
                            return;
                        } else {
                            uni.showToast({
                                title: message,
                                icon: 'none',
                                success() {
                                    uni.navigateTo({
                                        url: '/pages/index3/index3'
                                    });
                                }
                            });
                        }
                    });
                });
            } else {
                workOrder({
                    post_id: this.id,
                    content: this.content,
                    is_appraiser: this.is_appraiser
                }).then(result => {
                    console.log(result);
                    uni.hideLoading();
                    const {message, status} = result.data;
                    if (status === 403) {
                        uni.showToast({
                            title: message,
                            icon: 'none'
                        });
                        return;
                    } else {
                        uni.showToast({
                            title: message,
                            icon: 'none',
                            success() {
                                uni.navigateTo({
                                    url: '/pages/index3/index3'
                                });
                            }
                        });
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss">
    .container {
        background-color: #fff;
    }
    .content {
        width: 690rpx;
        height: 180rpx;
        margin: 30rpx auto;
        font-size: 26rpx;
        color: #c6c6c8;
        line-height: 36rpx;
    }
    .up-img {
        width: 690rpx;
        margin: 0 auto;
        display: flex;

        image {
            width: 160rpx;
            height: 160rpx;
        }

        .box {
            position: relative;
            .close {
                width: 36rpx;
                height: 36rpx;
                border-radius: 36rpx;
                background-color: #000000;
                position: absolute;
                right: 15rpx;
                top: 15rpx;
                z-index: 999;
            }
        }
    }
    .btn {
        width: 710rpx;
        height: 72rpx;
        line-height: 72rpx;
        text-align: center;
        color: #ffffff;
        position: fixed;
        bottom: 36rpx;
        left: 0;
        right: 0;
        margin: 0 auto;
        background-color: #5e95f4;
    }
</style>