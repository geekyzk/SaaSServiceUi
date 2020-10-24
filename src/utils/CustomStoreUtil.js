import { parseParams} from './index'
import request from '@/utils/request'
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';

export function CreateCustomStore(loadUrl,insertUrl,updateUrl,deleteUrl,byKeyUrl) {
    const store = new CustomStore({
        key: 'Id',
        byKey: function(value){
            return request({
                url: `${byKeyUrl}?id=${value}`,
                method: 'get',
            })
            .then(resp => {
               return resp
            })
        },
        load: function(loadOptions) {
            return request({
                url: `${loadUrl}?${parseParams(loadOptions)}`,
                method: 'get',
            })
            .then(resp => {
               return resp
            })
        },
        insert: function(values) {
            let formData = new FormData()
            formData.append("values",JSON.stringify(values))
            return request({
                url: `${insertUrl}`,
                method: 'post',
                data: formData,
                headers: {
                    "Content-Type": "form-data"
                }
            })
            .then(resp => {
               return resp
            })
        },

        update: (key, values) => {
            let formData = new FormData()
            formData.append("values",JSON.stringify(values))
            return request({
                url: `${updateUrl}?key=${key}`,
                method: 'put',
                data: formData,
                headers: {
                    "Content-Type": "form-data"
                }
            })
            .then(resp => {
                notify('修改成功','success',2000)
               return resp
            })
        },
        remove: (key) => {
            return request({
                url: `${deleteUrl}?key=${key}`,
                method: 'delete'
            })
            .then(resp => {
                notify('删除成功','success',2000)
               return resp
            })
        }
    });
    return store;
}