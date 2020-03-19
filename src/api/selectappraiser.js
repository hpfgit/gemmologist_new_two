import request from '../utils/request';

export function appraiserList(params) {
    return request('GET', '/api/appraisal/appraiser-list', params);
}