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
                       <!-- <DxItem data-field='age'  /> -->

                </DxForm>

            </DxEditing>
                <DxColumn
                    :width="110"
                    :buttons="['edit', 'delete',]"
                    type="buttons"
                />
                <dx-column data-field="Username"  > </dx-column>
                <dx-column data-field="UserNo"  > </dx-column>
                <dx-column data-field="Email"  > </dx-column>
                <dx-column data-field="Phone"  > </dx-column>
                <dx-column data-field="Address"  > </dx-column>
                <dx-column data-field="Birthday" data-type="date" > </dx-column>
                <dx-column data-field="IsActivated" data-type="boolean" > </dx-column>
                <dx-column data-field="IsSupAdmin" data-type="boolean" > </dx-column>
                <dx-column data-field="Password"  > </dx-column>
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
    import { parseOptions } from "@/utils";
    import { CreateCustomStore } from "@/utils/CustomStoreUtil"
    export default {
        data() {
            return {
                dataSourceConfig:{
                    store: CreateCustomStore("/api/SystemAccounts/Get","/api/SystemAccounts/Post","/api/SystemAccounts/Put","/api/SystemAccounts/Delete","/api/SystemAccounts/Get"),
                }
            };
        },
        components: {
            DxForm,
            DxPopup,
            DxRequiredRule,
            DxPosition,
            DxDataGrid,
            DxColumn,
            DxFilterRow,
            DxItem,
            DxPager,
            DxPaging,
            DxEditing,
            DxGroupPanel
        }
    };
</script>
