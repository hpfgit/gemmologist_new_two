import request from '../utils/request';

export function banzhu_appraise_num(params) {
    return request('GET', '/api/appraisal/post/banzhu-appraise-num', params);
}

export function banzhu_appraise(params) {
    const {type} = params;
    return request('GET', '/api/appraisal/post/banzhu-appraise/'+type, params);
}

export function changeOnline(params) {
    return request('POST', '/api/appraisal/post/change-online', params);
}