import request from '@/utils/request'

export function listSystemAccount(params) {
    return request({
        url: `/api/SystemAccounts/Get?values=${params}`,
        method: 'get',
    })
}


export function createSystemAccount(data) {
    return request({
        url: '/api/SystemAccounts/Post',
        method: 'post',
        data: data
    })
}

export function updateSystemAccount(id, data) {
    data['id'] = id
    return request({
        url: '/api/SystemAccounts/Put',
        method: 'put',
        data: data
    })
}

export function deleteSystemAccount(id) {
    return request({
        url: `/api/SystemAccounts/Delete?id=${id}`,
        method: 'delete'
    })
}
