import request from "../utils/request";

export function templateMessage(params) {
    params = Object.assign({}, {'miniapp_name': 'appraisal'}, params);
    return request('POST', '/api/wechat/ma/formid/collect', params);
}