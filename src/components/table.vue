<template>
    <div class="container">
        <div class="card_header" v-if="slots.tableHeader">
            <slot name="tableHeader" :onSearch="emitSearch" />
        </div>
        <div class="card_header" v-if="slots.dataStatistics">
            <slot name="dataStatistics" />
        </div>
        <el-table :data="data" border style="width: 100%" max-height="550" :header-cell-style="headerCellStyle"
            :cell-style="cellStyle" v-loading="loading">
            <!-- 展开列 -->
            <el-table-column v-if="expandConfig?.show" type="expand">
                <template #default="{ row }">
                    <el-table :data="row[expandConfig.prop]" border style="width: 100%"
                        v-if="row[expandConfig.prop]?.length" :key="row.roundNo">
                        <el-table-column v-for="col in expandConfig.columns" :key="col.prop" :label="col.label"
                            :prop="col.prop" :align="col.align">
                            <template v-if="col.isTime" #default="{ row }">
                                {{ dayjs(row[col.prop]).format('YYYY-MM-DD HH:mm:ss') }}
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :align="item.align"
                :label="item.label" :width="item.width" :fixed="item.fixed">
                <template v-if="slots[item.prop]" #default="scope">
                    <slot :name="item.prop" :row="scope.row" />
                </template>
            </el-table-column>
        </el-table>

        <div class="dfcR mt20">
            <el-pagination :hide-on-single-page="true" v-model:current-page="page" v-model:page-size="size"
                :page-sizes="[10, 20, 30, 50, 100]" :background="true" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, watch, reactive, useSlots, toRefs } from "vue";
import { dayjs } from "element-plus";

const props = defineProps({
    data: Array,
    columns: Array,
    page: Number,
    size: Number,
    total: Number,
    loading: Boolean,
    expandConfig: {
        type: Object,
        default: () => ({ show: false, prop: '', columns: [] })
    }
});

const { loading, data, columns, page, size, total, expandConfig } = toRefs(props);
const emit = defineEmits(['pagination'])
const slots = useSlots();

const state = reactive({
    tableData: [],
    pageData: {
        page: 1,
        size: 10,
        total: 0,
    },
});


const emitSearch = (data) => {
    emit("search", data);
};

// 页数
const handleSizeChange = (val) => {
    state.pageData.size = val;
    emit('pagination', { page: state.pageData.page, size: val });
}

// 条数
const handleCurrentChange = (val) => {
    state.pageData.page = val;
    emit('pagination', { page: val, size: state.pageData.size });
}
const headerCellStyle = (e) => {
    const column = props.columns?.[e.columnIndex];
    if (column?.headerStyle) {
        return { ...column.headerStyle };
    }
    return {};
};

const cellStyle = (e) => {
    const column = props.columns?.[e.columnIndex];
    if (column?.cellStyle) {
        return { ...column.cellStyle };
    }
    return {};
};

watch(() => [page, size, total], (newVal) => {
    state.pageData = {
        page: newVal[0],
        size: newVal[1],
        total: newVal[2],
    }
});

</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;

    .card_header {
        box-sizing: border-box;
        border-bottom: 1px solid var(--border);
        margin-bottom: 20px;
    }
}
</style>