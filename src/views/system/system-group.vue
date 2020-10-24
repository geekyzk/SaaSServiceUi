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
            <dxGroupPanel :visible="true"/>
            <DxEditing
                :allow-adding="true"
                :allow-updating="true"
                :allow-deleting="true"
                mode="popup"
            >
                <DxPopup

                    title="编辑"
                >
                    <DxPosition
                        my="center"
                        at="center"
                        of="window"
                    />
                </DxPopup>
                <DxForm>
                       <DxItem data-field='GroupName'  />
                       <DxItem data-field="SystemAccountIds" editor-type="dxTagBox" :editor-options="accountOptions"></DxItem>
                        
                </DxForm>

            </DxEditing>
                <DxColumn
                    :width="110"
                    :buttons="['edit', 'delete',]"
                    type="buttons"
                />
                <dx-column data-field="GroupName" > </dx-column>
                <dx-column data-field="SystemAccountIds" :visible="false">
                   
                </dx-column>

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
        DxGroupPanel
    } from "devextreme-vue/data-grid";
    import {DxItem} from 'devextreme-vue/form';
    import { CreateCustomStore } from "@/utils/CustomStoreUtil"
    import DxTagBox from 'devextreme-vue/tag-box';


    export default {
        data() {
            return {
                dataSourceConfig:{
                    store: CreateCustomStore("/api/SystemGroups/Get","/api/SystemGroups/Post","/api/SystemGroups/Put","/api/SystemGroups/Delete","/api/SystemGroups/Get"),
                },
                 accountOptions: {
                    dataSource: CreateCustomStore("/api/SystemGroups/AccountLookup"),
                    searchEnabled: false,
                    displayExpr: "Text",
                    valueExpr: "Value",
                },
            };
        },
        components: {
            DxForm,
            DxPopup,
            DxRequiredRule,
            DxPosition,
            DxDataGrid,
            DxColumn,
            DxTagBox,
            DxFilterRow,
            DxItem,
            DxPager,
            DxPaging,
            DxEditing,
            DxGroupPanel
        }
    };
</script>
