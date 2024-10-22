import { t } from '@/plugins/i18n';
import { GAME1 } from '../const_rank';

export default {
  path: '/game1',
  meta: {
    title: t('账户中心'),
    icon: 'home_8Fill',
    rank: GAME1
  },
  children: [
    {
      path: '/game1',
      name: 'Game 1',
      component: () => import('@/views/game1/index.vue'),
      meta: {
        title: t('商户信息管理'),
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
