<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    class="pr-10"
    label-width="100px"
  >
    <el-form-item :label="t('Serial')" prop="serial number">
      <span class="font-bold"> {{ row.serial_number }}</span>
    </el-form-item>

    <el-form-item :label="t('Meal')" prop="meal" required>
      <el-select v-model="newFormInline.meal" clearable>
        <el-option
          v-for="item in mealList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="t('Meal type')" prop="meal_type" required>
      <el-select v-model="newFormInline.meal_type" clearable>
        <el-option
          v-for="item in mealTypeList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('Close') }}</el-button>
      <el-button type="primary" @click="confirmClick">{{
        t('Save')
      }}</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { mealList, mealTypeList } from '../utils/types';
import { message } from '@/utils/message';
const emits = defineEmits(['closeDialog']);
const props = defineProps<{
  row: GAME1API.ORDER;
}>();

const newFormInline = reactive({
  meal: '',
  meal_type: ''
});

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = async () => {
  const res = await API.updateOrder({
    id: props.row.id,
    meal: newFormInline.meal,
    meal_type: newFormInline.meal_type
  });

  message(res.message, { type: res.status ? 'success' : 'error' });
  emits('closeDialog');
};
</script>
