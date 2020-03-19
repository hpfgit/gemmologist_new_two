import request from "../utils/request";

export function getCount(params) {
    return request('GET', '/api/appraisal/count', params, false);
}

export function getPost(params) {
    return request('GET', '/api/appraisal/post', params);
}

export function isAppraiser(params) {
    return request('GET', '/api/appraisal/is-appraiser', params);
}

export function bindMobile(params) {
    return request('POST', '/api/wechat/ma/auth/bind-mobile', params);
}