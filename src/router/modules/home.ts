import { GAME1 } from '../const_rank';
import { t } from '@/plugins/i18n';

const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import('@/layout/index.vue');

export default {
  path: '/',
  name: t('Game 1'),
  component: Layout,
  redirect: '/game1',
  meta: {
    icon: 'homeFilled',
    title: t('Game 1'),
    rank: GAME1
  },
  children: [
    {
      path: '/game1',
      name: t('Game 1'),
      component: () => import('@/views/game1/index.vue'),
      meta: {
        title: t('Game 1'),
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/game7',
      name: t('Game 7'),
      component: () => import('@/views/game7/index.vue'),
      meta: {
        title: t('Game 7'),
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/ipCrawlerManager',
      name: t('IP Crawler List'),
      component: () => import('@/views/ipManager/index.vue'),
      meta: {
        title: t('IP Crawler List'),
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/memberIP',
      name: t('Members IP'),
      component: () => import('@/views/membersIP/index.vue'),
      meta: {
        title: t('Members IP'),
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/members',
      name: t('Members'),
      component: () => import('@/views/members/index.vue'),
      meta: {
        title: t('Members'),
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    }
  ]
} as RouteConfigsTable;
