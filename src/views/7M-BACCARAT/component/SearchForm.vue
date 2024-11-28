<template>
  <el-form
    ref="formRef"
    :model="searhFormInline"
    :inline="true"
    class="search-form bg-bg_color w-[99/100] pl-8"
  >
    <el-form-item :label="t('Order Type')" prop="meal_type" class="w-[200px]">
      <el-select v-model="searhFormInline.orderType" clearable>
        <el-option
          v-for="item in orderTypes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="t('')" prop="meal">
      <CustomDate
        className="!w-full !ml-0"
        v-model:val="selectDate"
        format="YYYY-MM-DD HH:mm:ss"
        @changeDate="changeDate"
        :start-placeholder="
          searhFormInline.dateFrom
            ? dayjs(searhFormInline.dateFrom).format('YYYY-MM-DD HH:mm:ss')
            : t('Start date')
        "
        :end-placeholder="
          searhFormInline.dateTo
            ? dayjs(searhFormInline.dateTo).format('YYYY-MM-DD HH:mm:ss')
            : t('End date')
        "
        :isDateTime="true"
      />
    </el-form-item>

    <div class="flex justify-end">
      <el-button type="primary" @click="onSearch">{{ t('Search') }}</el-button>
      <el-button :icon="useRenderIcon(RefreshIcon)" @click="resetForm(formRef)">
        {{ t('Reset') }}
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { orderTypes } from '../utils/types';
import { t } from '@/plugins/i18n';
import CustomDate from '@/components/Form/CustomDate.vue';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import RefreshIcon from '@iconify-icons/ep/refresh';
import { FormInstance } from 'element-plus';

const emits = defineEmits(['onSearch']);
const selectDate = ref('');
const formRef = ref();

const resetForm = (formEl: FormInstance | undefined) => {
  searhFormInline.orderType = '';
  searhFormInline.dateFrom = '';
  searhFormInline.dateTo = '';
  formEl.resetFields();
  selectDate.value = '';
  onSearch();
};

const searhFormInline = reactive({
  orderType: '',
  dateFrom: '',
  dateTo: ''
});

const changeDate = (t: any) => {
  if (!t) {
    searhFormInline.dateFrom = '';
    searhFormInline.dateTo = '';
  } else {
    searhFormInline.dateFrom = dayjs(t[0]).format('YYYY-MM-DD HH:mm:ss');
    searhFormInline.dateTo = dayjs(t[1]).format('YYYY-MM-DD HH:mm:ss');
  }
};

const onSearch = async () => {
  emits('onSearch', null, searhFormInline);
};
</script>
