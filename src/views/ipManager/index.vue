<template>
  <div class="main">
    <EditForm
      :loading="loading"
      :form="form"
      :ipRateLimit="ipRateLimit"
      @onSearch="onSearch"
      @addUser="handleAdd"
      @handleUpdateRateLimit="handleUpdateRateLimit"
    />

    <PureTableBar
      :columns="columns"
      @refresh="onSearch('reload')"
      title="IP Crawler List"
    >
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="tableHeaderStyle"
          @page-size-change="handleTableWidthChange"
          @page-current-change="handleCurrentChange"
        >
          <template #status="{ row }">
            <el-switch
              v-model="row.is_block"
              size="large"
              active-text="Open"
              inactive-text="Block"
              @change="handleUpdate(row)"
            />
          </template>
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="danger"
              :size="size"
              @click="handleDelete(row)"
            >
              {{ t('Delete') }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { columns } from './component/TableColumnList';
import { PureTableBar } from '@/components/RePureTableBar';
import { IPHook } from './utils/hook';
import EditForm from './component/EditForm.vue';

defineOptions({ name: 'IP Crawler' });
const { tableHeaderStyle } = usePublicHooks();

const {
  onSearch,
  form,
  dataList,
  handleTableWidthChange,
  handleCurrentChange,
  handleDelete,
  handleAdd,
  pagination,
  loading,
  handleUpdate,
  ipRateLimit,
  handleUpdateRateLimit
} = IPHook();
</script>
