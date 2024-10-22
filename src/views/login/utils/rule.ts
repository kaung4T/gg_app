import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { t } from '@/plugins/i18n';

export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

export const REGEXP_EMAIL =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const loginRules = reactive(<FormRules>{
  username: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('Please enter username')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('Please enter password')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});

export { loginRules };
