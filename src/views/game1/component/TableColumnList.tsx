import { t } from '@/plugins/i18n';
import dayjs from 'dayjs';

export const columns: TableColumnList = [
  {
    label: t('Serial Number'),
    prop: 'serial_number'
    // headerRenderer: d => handleTableWidth(d, t('Serial Number'), 'auto')
  },
  {
    label: t('Meal'),
    prop: 'meal'
    // headerRenderer: d => handleTableWidth(d, t('Meal'), 'auto')
  },
  {
    label: t('Meal Type'),
    prop: 'meal_type'
    // headerRenderer: d => handleTableWidth(d, t('Meal Type'), 'auto')
  },
  {
    label: t('Order Type'),
    prop: 'order_type'
    // headerRenderer: d => handleTableWidth(d, t('Order Type'), 'auto')
  },
  {
    label: t('Creator'),
    slot: 'member'
  },
  {
    label: t('Created At'),
    prop: 'createdAt',
    // headerRenderer: d => handleTableWidth(d, t('Created At'), 'auto'),
    formatter: ({ createdAt }) =>
      `${dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}`
  }
];
