import request from "../utils/request";

export function brand(params) {
    return request('GET', `/api/appraisal/brand`, params);
}

export function clothing(params) {
    return request('GET', `/api/appraisal/brand`, params);
}
