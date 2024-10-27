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
    label: t('IP'),
    prop: 'ip'
    // headerRenderer: d => handleTableWidth(d, t('IP'), 'auto')
  },
  // {
  //   label: t('Status'),
  //   slot: 'status'
  //   // headerRenderer: d => handleTableWidth(d, t('Status'), 'auto')
  // },
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
