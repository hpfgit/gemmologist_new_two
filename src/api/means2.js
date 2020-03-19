import request from "../utils/request";

export function appraise(params) {
    const {type} = params;
    return request('GET', '/api/appraisal/post/my/appraise/' + type, params);
}

export function work_order(params) {
    return request('GET', '/api/appraisal/post/my/appraise/work_order', params);
}

export function all(params) {
    return request('GET', '/api/appraisal/post/my/appraise/all', params);
}

export function newAppraiseDetails(params) {
    const {type} = params;
    return request('GET', '/api/appraisal/post/my/new-appraise/'+type, params);
}
