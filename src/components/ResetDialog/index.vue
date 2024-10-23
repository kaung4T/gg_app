<template>
  <div class="pr-4">
    <el-form
      ref="resetFormRef"
      :model="resetForm"
      :rules="resetPasswordRules"
      size="large"
      @validate="validate"
      label-width="auto"
    >
      <el-form-item prop="oldPassword" :label="`${t('Old Password')}:`">
        <el-input
          clearable
          show-password
          v-model="resetForm.oldPassword"
          :placeholder="t('Old Password')"
        />
      </el-form-item>

      <el-form-item prop="newPassword" :label="`${t('New Password')}:`">
        <el-input
          clearable
          show-password
          v-model="resetForm.newPassword"
          :placeholder="t('New Password')"
          class="w-[200px!]"
        />
      </el-form-item>

      <el-form-item prop="confirmPassword" :label="`${t('Confirm Password')}:`">
        <el-input
          clearable
          show-password
          v-model="resetForm.confirmPassword"
          :placeholder="t('Confirm Password')"
        />
      </el-form-item>
    </el-form>
    <div class="flex items-center justify-center">
      <el-button @click="closeDialog">{{ t('Close') }}</el-button>
      <el-button :disabled="isDisabled" type="primary" @click="resetPassword">{{
        t('OK')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { useUserStore } from '@/store/user';
import { IResetForm } from '@/views/login/utils/type';

import { FormInstance } from 'element-plus/es/components/form';
import { reactive, ref } from 'vue';
import { REGEXP_PWD } from './rules';
import { message } from '@/utils/message';

const resetFormRef = ref<FormInstance>();
const isDisabled = ref(true);
const userStore = useUserStore();

const resetForm = reactive<IResetForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const emits = defineEmits(['changeDisabledStatus', 'closeDialog']);
const validateList = {
  oldPassword: false,
  newPassword: false,
  confirmPassword: false
};

const validate = (formItemProp, isValid) => {
  validateList[formItemProp] = isValid;
  isDisabled.value = !Object.values(validateList).every(item => item);
};

const resetPasswordRules = reactive({
  oldPassword: [
    {
      validator: (_, value, callback) => {
        if (!value) {
          callback(new Error(t('The old password cannot be empty')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('New password cannot be empty')));
        } else if (!REGEXP_PWD.test(value)) {
          callback(
            new Error(
              t(
                'Password must be at least 8 characters, including letters and numbers'
              )
            )
          );
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('Confirm password cannot be empty')));
        } else if (resetForm.newPassword !== value) {
          callback(
            new Error(t('The passwords are inconsistent, please re-enter'))
          );
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
});

const resetPassword = async () => {
  const res = await API.updatePassword({
    id: userStore.userInfo.id,
    user_id: userStore.userInfo.user_id,
    current_password: resetForm.oldPassword,
    new_password: resetForm.newPassword
  });
  if (!res.status) return message(res.message, { type: 'error' });
  else
    message(t('Modification successful, please log in again'), {
      type: 'success',
      duration: 1000,
      onClose: () => {
        closeDialog();
        useUserStore().logOut();
      }
    });
};

const closeDialog = () => {
  emits('closeDialog');
};
</script>

<style scoped></style>
