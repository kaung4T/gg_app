<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="ruleForm"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
      :rules="createMemberRules"
    >
      <el-form-item :label="`${t('Name')}:`" prop="name">
        <el-input
          v-model="ruleForm.name"
          :placeholder="t('Enter name')"
          clearable
          maxlength="20"
          v-enter="search"
          class="!w-[300px]"
        />
      </el-form-item>
      <el-form-item :label="`${t('User Id')}:`" prop="user_id">
        <el-input
          v-model="ruleForm.user_id"
          :placeholder="t('Enter user id')"
          clearable
          maxlength="20"
          v-enter="search"
          class="!w-[300px]"
        />
      </el-form-item>
      <el-form-item :label="`${t('Password')}:`" prop="password">
        <el-input
          v-model="ruleForm.password"
          :placeholder="t('Enter password')"
          clearable
          maxlength="20"
          v-enter="search"
          class="!w-[300px]"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onCreate(formRef)" :loading="loading">
          {{ t('Add Member') }}
        </el-button>
        <!-- <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="search()"
        >
          {{ t('Search') }}
        </el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { createMemberRules } from '../utils/rules';
import { t } from '@/plugins/i18n';

const loading = ref(false);
const formRef = ref<FormInstance>();

const emits = defineEmits(['onSearch', 'addUser']);

const ruleForm = reactive({
  name: '',
  password: '',
  user_id: ''
});

const onCreate = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    loading.value = false;
    if (valid) {
      addUser();
    } else {
      return fields;
    }
  });
};

const search = () => {
  emits('onSearch', ...['reload']);
};

const addUser = () => {
  emits('addUser', ruleForm);
  ruleForm.name = '';
  ruleForm.password = '';
  ruleForm.user_id = '';
};
</script>

<style scoped></style>
