import config from '../config/index.js';
import store from "../store";

const NODE_ENV = process.env.NODE_ENV;

function request(method = 'GET', url, params, isToken = true) {
    const apiUrl = getUrl(url);
    const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60'
    };
    let token = uni.getStorageSync('token');
    if (token) {
        const now_time = new Date().getTime();
        const token_start_time = uni.getStorageSync('token_start_time');
        const token_expired_time = 60 * 60 * 1000;
        if (now_time - token_start_time > token_expired_time - (5 * 1000)) {
            return refreshToken(token).then(result => {
                const {data} = result.data;
                let {token} = data;
                uni.setStorageSync('token_start_time', new Date().getTime());
                store.dispatch('setToken', token);
                token = uni.getStorageSync('token');
                return commonRequest(isToken, apiUrl, method, params, token, headers);
            });
        } else {
            return commonRequest(isToken, apiUrl, method, params, token, headers);
        }
    } else {
        return commonRequest(isToken, apiUrl, method, params, token, headers);
    }
}

function isLoginFn() {
    if (uni.getStorageSync('openid') && uni.getStorageSync('token') && uni.getStorageSync('user_info')) {
        return true;
    } else {
        uni.showToast({
            title: '请先登录',
            icon: 'none'
        });
        return false;
    }
}

function commonRequest(isToken, apiUrl, method, params, token, headers) {
    return new Promise((resolve, reject) => {
        if (isToken) {
            params = Object.assign({}, {token}, params);
        }
        uni.request({
            url: apiUrl,
            method: method.toUpperCase(),
            data: params,
            header: headers,
            success(res) {
                resolve(res);
            },
            fail(error) {
                console.log(error);
                reject(error);
            }
        });
        if (!/login/ig.test(apiUrl) && !/bind-mobile/ig.test(apiUrl) && !/count/ig.test(apiUrl)) {
            if (!isLoginFn()) {
                const pages = getCurrentPages();
                const pagesData = pages[pages.length - 1];
                const {route, options} = pagesData;
                const {is_specialty, brand_id, type} = options;
                uni.redirectTo({
                    url: `/pages/login/login?page=${route}&is_specialty=${is_specialty}&brand_id=${brand_id}&type=${type}`
                });
            }
        }
    });
}

function refreshToken(token) {
    const url = '/api/auth/refresh-token';
    const refresh_url = getUrl(url);
    return new Promise((resolve, reject) => {
        uni.request({
            url: refresh_url,
            method: "POST",
            data: {
                token
            },
            success(res) {
                resolve(res);
            },
            fail(error) {
                reject(error);
                console.log(error);
            }
        });
    });
}

function getUrl(url) {
    let apiUrl;
    if (NODE_ENV === 'development') {
        apiUrl = `${config[NODE_ENV].host}${url}`;
    } else {
        apiUrl = `${config[NODE_ENV].host}${url}`;
    }
    return apiUrl;
}

export default request;
