import request from "../utils/request";

export function getStudy(params) {
    const {brand_id, page, limit} = params;
    return request('GET', `/api/appraisal/study?page=${page}&brand_id=${brand_id}&limit=${limit}`, {});
}
