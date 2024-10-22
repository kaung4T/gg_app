<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="ruleForm"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
      :rules="createIPRules"
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
      <el-form-item :label="`${t('IP')}:`" prop="ip">
        <el-input
          v-model="ruleForm.ip"
          :placeholder="t('Enter IP')"
          clearable
          maxlength="20"
          v-enter="search"
          class="!w-[300px]"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onCreate(formRef)" :loading="loading">
          {{ t('Add IP') }}
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
      <el-form-item
        class="float-right"
        :label="`${t('IP rate limit')}`"
        prop="name"
      >
        <el-switch
          v-model="localIpRateLimit"
          style="margin-left: 24px"
          inline-prompt
          @click="handleUpdateRateLimit"
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox, type FormInstance } from 'element-plus';
import { t } from '@/plugins/i18n';
import { createIPRules } from '../utils/rules';
import { Check, Close } from '@element-plus/icons-vue';
import { message } from '@/utils/message';

const loading = ref(false);
const formRef = ref<FormInstance>();

const { ipRateLimit } = defineProps<{
  ipRateLimit: boolean;
}>();

const localIpRateLimit = ref(ipRateLimit);

watchEffect(() => {
  localIpRateLimit.value = ipRateLimit;
});

const emits = defineEmits(['onSearch', 'addUser', 'handleUpdateRateLimit']);

const ruleForm = reactive({
  name: '',
  ip: ''
});

const onCreate = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    loading.value = false;
    if (valid) {
      addIp();
    } else {
      return fields;
    }
  });
};

const search = () => {
  emits('onSearch', ...['reload']);
};

const addIp = () => {
  emits('addUser', ruleForm);
  ruleForm.name = '';
  ruleForm.ip = '';
};

const handleUpdateRateLimit = () => {
  emits('handleUpdateRateLimit', localIpRateLimit.value);
};
</script>

<style scoped></style>
