import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { t } from '@/plugins/i18n';

const createIPRules = reactive(<FormRules>{
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
  ip: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('Enter ip')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});

export { createIPRules };
