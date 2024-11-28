import { t } from '@/plugins/i18n';
import dayjs from 'dayjs';

export const columns: TableColumnList = [
  {
    label: t('Round Number'),
    prop: 'round_id'
  },
  {
    label: t('Winner'),
    slot: 'winner'
  },
  {
    label: t('Total Banker'),
    slot: 'total_banker'
  },
  {
    label: t('Banker'),
    slot: 'banker'
  },
  {
    label: t('Total Player'),
    slot: 'total_player'
  },
  {
    label: t('Player'),
    slot: 'player'
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
