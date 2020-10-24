<template>
     <div>
         <DxFileUploader
                select-button-text="上传"
                label-text
                name="files"
                :disabled="disabled"
                accept="image/*"
                :multiple="true"
                ref="uploadForm"
                upload-mode="useForm"
                :onValueChanged="newFileChange" 
        />
         <div v-if="value.length > 0">
             <div style="margin-bottom: 30px;">已上传附件(只以最后一次上传附件为准)</div>
             <!-- <div v-for="item in value" :key="item.AttachmentId" >
                 <a :href="getDownLoadUrl(item.AttachmentId)" target="_blank">{{item.Name}}</a>
             </div> -->
             <a href="http://213.com">{{value}}</a>
         </div>
        
     </div>
     
</template>

<script>
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { getToken } from '../../utils/auth';

export default {
    name: 't-file-upload',
    data() {
        return {
            baseUrl: process.env.VUE_APP_CREDIT_SERVICE_API
        }
    },
    props: {
         onValueChanged: {
            type: Function,
            default: () => function() {}
        },
        value: {
            type: String,
            default: ()=> ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        newFileChange(event) {
            console.log(event)
            this.onValueChanged(event.value);
        },
        getDownLoadUrl(key) {
            return process.env.VUE_APP_CREDIT_SERVICE_API + "/api/Attachments/Download?key=" + key + "&token=" + getToken()
        }
  },
  components: {
        DxFileUploader,
    },  
}
</script>
