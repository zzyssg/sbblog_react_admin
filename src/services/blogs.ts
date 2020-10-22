import request from '@/utils/request';

export async function queryAllBlogVOs(params: any) {
    return request('/app/blogs/getAllBlogVOs', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function queryBlogList(params: any) {
    return request('/app/blogs/getBlogList', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function addBlog(params: any) {
    return request('/app/blogs/addBlog', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function queryBlogVOsByCondition(params: any) {
    return request('/app/blogs/queryBlogVOsByCondition', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function deleteBlogById(params: any) {
    return request('/app/blogs/deleteBlogById', {
        method: 'GET',
        params
    });
}

export async function queryBlogsByYear(params: any) {
    return request('/app/blogs/findAllBlogsByYear', {
        method: 'GET',
        params
    });
}

export async function queryTypesAndTags(params: any) {
    return request('/app/blogs/findAllTypesAndTags', {
        method: 'GET',
        params
    });
}