import request from "../utils/request";

export function appraise(params) {
    const {id} = params;
    return request('PUT', `/api/appraisal/post/${id}/new-appraise`, params);
}

export function post(params) {
    const {id} = params;
    return request('GET', '/api/appraisal/post/' + id, params);
}

export function supplement(params) {
    const {id} = params;
    return request('PUT', `/api/appraisal/post/${id}`, params);
}

export function changeAppraiser(params) {
    return request('POST', '/api/appraisal/change-appraiser', params);
}

export function workOrder(params) {
    return request('POST', '/api/appraisal/post/work-order', params);
}

export function banzhuAppraise(params) {
    const {id} = params;
    return request('PUT', `/api/appraisal/post/${id}/banzhu-appraise`, params);
}

export function get_wx_code(params) {
    return request('GET', '/api/appraisal/post/get_wx_code', params);
}

export function pay_appraisal_quicken(params) {
    return request('POST', '/api/payment/pay-appraisal-quicken', params);
}

export function user_post_list(params) {
    return request('GET', '/api/appraisal/post/user-post-list', params);
}