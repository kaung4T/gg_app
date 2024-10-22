<template>
  <div class="main">
    <EditForm
      :loading="loading"
      :form="form"
      @onSearch="onSearch"
      @addUser="handleAdd"
    />

    <PureTableBar
      :columns="columns"
      @refresh="onSearch('reload')"
      title="Member List"
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
import { membersHook } from './utils/hook';
import { usePublicHooks } from '@/hooks';
import { columns } from './component/TableColumnList';
import { PureTableBar } from '@/components/RePureTableBar';
import EditForm from './component/EditForm.vue';

defineOptions({ name: 'MEMBER' });
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
} = membersHook();
</script>
