<template>
  <div>
    <dx-data-grid
      class="dx-card wide-card"
      :data-source="dataSourceConfig"
      :focused-row-index="0"
      :show-borders="false"
      :remote-operations="true"
      :focused-row-enabled="true"
      :column-auto-width="true"
      :column-hiding-enabled="true"
    >
      <dx-paging :page-size="20" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-filter-row :visible="true" />
      <dxGroupPanel :visible="true" />
      <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        mode="popup"
      >
        <DxPopup title="编辑">
          <DxPosition my="center" at="center" of="window" />
        </DxPopup>
        <DxForm>
          <DxItem data-field="Name" />
          <DxItem data-field="ShowImage" />
          <DxItem data-field="ShortDesc" />
          <DxItem data-field="IsActivated" />
          <DxItem data-field="OrganizationId" />
          <DxItem data-field="Description" />
        </DxForm>
      </DxEditing>
      <DxColumn :width="110" :buttons="['edit', 'delete']" type="buttons" />
      <dx-column data-field="Name" caption="名称"> </dx-column>
      <dx-column
        data-field="ShowImage"
        caption="展示图"
        edit-cell-template="upload-template"
      >
      </dx-column>
      <dx-column data-field="ShortDesc" caption="简介"> </dx-column>
      <dx-column data-field="Description" caption="详情描述"> </dx-column>
      <dx-column data-field="IsActivated" data-type="boolean" caption="上架">
      </dx-column>
      <dx-column data-field="OrganizationId" caption="店铺">
        <dx-lookup
          display-expr="Name"
          value-expr="Id"
          :data-source="OrganizationStoreConfig"
        />
      </dx-column>
      <dx-column data-field="CreateAt" data-type="date" caption="创建时间">
      </dx-column>
      <dx-column data-field="UpdateAt" data-type="date" caption="更新时间">
      </dx-column>
      <template #upload-template="{ data }">
        <div class="fileuploader-container">
          <CustomFileUpload
            :on-value-changed="data.setValue"
            :value="data.data.ShowImage"
          />
        </div>
      </template>
    </dx-data-grid>
  </div>
</template>

<script>
import DxDataGrid, {
  DxRequiredRule,
  DxPopup,
  DxPosition,
  DxColumn,
  DxFilterRow,
  DxPager,
  DxPaging,
  DxEditing,
  DxForm,
  DxGroupPanel,
  DxLookup,
} from "devextreme-vue/data-grid";
import CustomStore from 'devextreme/data/custom_store';

import { DxItem } from "devextreme-vue/form";
import { parseParams } from "@/utils";
import { CreateCustomStore } from "@/utils/CustomStoreUtil";
import CustomFileUpload from "@/components/common/CustomFileUpload";
import request from '@/utils/request'
const byKeyUrl = "/api/Products/ByKey"
const loadUrl = "/api/Products/Get"
const insertUrl = "/api/Products/Create"
const updateUrl = "/api/Products/Put"
const deleteUrl = "/api/Products/Delete"


export default {
  data() {
    return {
      dataSourceConfig: {
        store: new CustomStore({
          key: "Id",
          byKey: function (value) {
            return request({
              url: `${byKeyUrl}?id=${value}`,
              method: "get",
            }).then((resp) => {
              return resp;
            });
          },
          load: function (loadOptions) {
            return request({
              url: `${loadUrl}?${parseParams(loadOptions)}`,
              method: "get",
            }).then((resp) => {
              return resp;
            });
          },
          insert: function (values) {
            let formData = new FormData();
            for (var key in values) {
                if (key === 'ShowImage') {
                    if (values[key] != null) {
                        formData.append("ShowImageFile",values[key])
                    }
                } else {
                    formData.append(key, values[key]);

                }
            }

            return request({
              url: `${insertUrl}`,
              method: "post",
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((resp) => {
              return resp;
            });
          },

          update: (key, values) => {
            let formData = new FormData();
            for (var key in values) {
                if (key === 'ShowImage') {
                    if (values[key] != null) {
                    values[key].forEach(item => {
                        formData.append("ShowImageFile",item)
                    })
                    }
                } else {
                    formData.append(key, values[key]);

                }
            }
            return request({
              url: `${updateUrl}?key=${key}`,
              method: "put",
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((resp) => {
              notify("修改成功", "success", 2000);
              return resp;
            });
          },
          remove: (key) => {
            return request({
              url: `${deleteUrl}?key=${key}`,
              method: "delete",
            }).then((resp) => {
              notify("删除成功", "success", 2000);
              return resp;
            });
          },
        }),
      },
      OrganizationStoreConfig: {
        store: CreateCustomStore(
          "/api/Organizations/Get",
          "/api/Organizations/Post",
          "/api/Organizations/Put",
          "/api/Organizations/Delete",
          "/api/Organizations/ByKey"
        ),
      },
    };
  },
  components: {
    DxForm,
    DxPopup,
    CustomFileUpload,
    DxRequiredRule,
    DxPosition,
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxItem,
    DxPager,
    DxPaging,
    DxEditing,
    DxLookup,
    DxGroupPanel,
  },
};
</script>
