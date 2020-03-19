import request from '../utils/request';

export function drawCashDetail(params) {
    return request('GET', '/api/appraisal/drawCash/detail', params);
}

export function transfer(params) {
    return request('POST', '/api/payment/transfer', params);
}

export function transferLog(params) {
    return request('GET', '/api/appraisal/post/transfer-log', params);
}