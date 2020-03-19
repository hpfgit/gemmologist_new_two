import request from "../utils/request";

export function examine(params) {
    return request('GET', '/api/appraisal/examine', params);
}

export function achieve(params) {
    return request('GET', '/api/appraisal/examine/achieve', params);
}

export function getIds(params) {
    return request('GET', '/api/appraisal/examine/ids', params);
}

export function examine_save(params) {
    return request('PUT', '/api/appraisal/examine/edit', params);
}

export function examine_history(params) {
    return request('GET', '/api/appraisal/examine/history', params);
}

export function giveup(params) {
    return request('PUT', '/api/appraisal/examine/giveup', params);
}

export function auditing(params) {
    return request('PUT', '/api/appraisal/examine/Auditing', params);
}

export function errorRate(params) {
    return request('GET', '/api/appraisal/post/errorRate', params);
}
