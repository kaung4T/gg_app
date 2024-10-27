<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    class="pr-10"
    label-width="100px"
  >
    <el-form-item :label="t('Meal 1')" prop="meal" required>
      <el-input v-model="newFormInline.meal1" clearable />
    </el-form-item>
    <el-form-item :label="t('Meal2')" prop="meal" required>
      <el-input v-model="newFormInline.meal2" clearable />
    </el-form-item>
    <el-form-item :label="t('Meal3')" prop="meal" required>
      <el-input v-model="newFormInline.meal3" clearable />
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
import { message } from '@/utils/message';
const emits = defineEmits(['closeDialog']);
const props = defineProps<{
  mealList: any;
}>();

const newFormInline = reactive({
  meal1: props.mealList[0]?.meal,
  meal2: props.mealList[1]?.meal,
  meal3: props.mealList[2]?.meal
});

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = async () => {
  const res = await API.updateMealList([
    {
      type: 1,
      meal: newFormInline.meal1
    },
    {
      type: 2,
      meal: newFormInline.meal2
    },
    {
      type: 3,
      meal: newFormInline.meal3
    }
  ]);

  message(res.message, { type: res.status ? 'success' : 'error' });
  emits('closeDialog');
};
</script>
