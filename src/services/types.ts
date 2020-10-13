import request from '@/utils/request';

export async function queryAllTypes(params: any) {
    return request('/app/type/queryAllTypes', {
        method: 'Get',
        data: {
            ...params
        }
    });

}
export async function addType(params: any) {
    debugger
    return request('/app/type/addType', {
        method: 'Post',
        data: {
            ...params
        }
    });

}
export async function deleteTypeByTypeId(params: any) {
    debugger
    return request('/app/type/deleteTypeByTypeId', {
        method: 'Get',
        params
    });

}