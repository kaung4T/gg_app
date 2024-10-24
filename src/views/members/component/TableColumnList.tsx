import { t } from '@/plugins/i18n';
import dayjs from 'dayjs';

export const columns: TableColumnList = [
  {
    label: t('No'),
    type: 'index',
    minWidth: 100
    // headerRenderer: d => handleTableWidth(d, t('Name'), 'auto')
  },
  {
    label: t('Name'),
    prop: 'name'
    // headerRenderer: d => handleTableWidth(d, t('Name'), 'auto')
  },
  {
    label: t('User Id'),
    prop: 'user_id'
    // headerRenderer: d => handleTableWidth(d, t('User Id'), 'auto')
  },
  {
    label: t('Created At'),
    prop: 'created_at',
    // headerRenderer: d => handleTableWidth(d, t('Created At'), 'auto'),
    formatter: ({ createdAt }) =>
      `${dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}`
  },
  {
    label: t('Operation'),
    slot: 'operation'
    // headerRenderer: d => handleTableWidth(d, t('Operation'), 'auto')
  }
];
