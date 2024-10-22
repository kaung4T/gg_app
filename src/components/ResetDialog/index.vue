<template>
  <div class="pr-4">
    <el-form
      ref="resetFormRef"
      :model="resetForm"
      :rules="resetPasswordRules"
      size="large"
      @validate="validate"
    >
      <el-form-item
        prop="oldPassword"
        :label="`${t('Old Password')}:`"
        label-width="100"
      >
        <el-input
          clearable
          show-password
          v-model="resetForm.oldPassword"
          :placeholder="t('Old Password')"
        />
      </el-form-item>

      <el-form-item
        prop="newPassword"
        :label="`${t('New Password')}:`"
        label-width="100"
      >
        <el-input
          clearable
          show-password
          v-model="resetForm.newPassword"
          :placeholder="t('New Password')"
        />
      </el-form-item>

      <el-form-item
        prop="confirmPassword"
        :label="`${t('Confirm Password')}:`"
        label-width="100"
      >
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
        if (value === 'The old password cannot be empty') {
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
            new Error(
              t('The passwords entered twice are inconsistent, please re-enter')
            )
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
  // const res = await API.updatePwd({
  //   id: userStore.userInfo.id,
  //   pwd: getMD5(resetForm.oldPassword),
  //   newPwd: getMD5(resetForm.newPassword)
  // });
  // if (res.code) return message(res.msg, { type: 'error' });
  // else
  //   message(t('Modification successful, please log in again'), {
  //     type: 'success',
  //     duration: 1000,
  //     onClose: () => {
  //       closeDialog();
  //       userStore.logOut();
  //     }
  //   });
};

const closeDialog = () => {
  emits('closeDialog');
};
</script>

<style scoped></style>
