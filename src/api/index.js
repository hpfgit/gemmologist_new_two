import request from "../utils/request";

export function getCount(params) {
    return request("GET", "/api/appraisal/count", params, false);
}

export function getPost(params) {
    return request("GET", "/api/appraisal/post", params);
}

export function isAppraiser(params) {
    return request("GET", "/api/appraisal/is-appraiser", params);
}

export function bindMobile(params) {
    return request("POST", "/api/wechat/ma/auth/bind-mobile", params);
}

export function userPoint(params) {
    return request("GET", "/api/appraisal/user-point", params);
}

export function signIn(params) {
    return request("GET", "/api/appraisal/sign-in", params);
}
export function share(params) {
    return request("GET", "/api/appraisal/share", params);
}
