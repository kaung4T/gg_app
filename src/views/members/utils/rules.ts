import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { t } from '@/plugins/i18n';

export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

export const REGEXP_EMAIL =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const createMemberRules = reactive(<FormRules>{
  name: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('Enter name')));
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
          callback(new Error(t('Enter password')));
        } else if (!REGEXP_PWD.test(value)) {
          callback(
            new Error(
              t('Password must be at least 8 charactors(letters and numbers)')
            )
          );
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  user_id: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('Enter user id')));
        } else if (value.length < 6) {
          callback(new Error(t('user id must be at least 6 letters')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});

export { createMemberRules };
