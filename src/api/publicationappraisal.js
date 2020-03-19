import request from "../utils/request";

export function release(params) {
    return request('POST', '/api/appraisal/post', params);
}

export function complementGraph(params) {
    const {id} = params;
    return request('PUT', `/api/appraisal/post/${id}`, params);
}

export function appraisal(params) {
    const {id} = params;
    return request('POST', `/api/appraisal/post/${id}/appraise`, params);
}

export function qiniuToken(params) {
    return request('GET', '/api/appraisal/qiniu/token', params);
}

export function cash(params) {
    return request('GET', '/api/wallet/cash', params);
}

export function cost(params) {
    return  request('POST', '/api/appraisal/post/cost', params);
}

export function blpay(params) {
    return request('POST', '/api/pay/blpay', params);
}

export function appraiserDetail(params) {
    return request('GET', '/api/appraisal/appraiser-detail', params);
}

export function placeOrder(params) {
    return request('POST', '/api/appraisal/place-order', params);
}

export function pay(params) {
    return request('POST', '/api/payment/pay', params);
}

export function postPay(params) {
    return request('GET', '/api/appraisal/post/post-pay', params);
}