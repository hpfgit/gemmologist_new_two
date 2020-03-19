import request from "../utils/request";

export function detail(params) {
    return request('GET', '/api/appraisal/examine/detail', params);
}
