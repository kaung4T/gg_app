import { HOME } from '../const_rank';
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import('@/layout/index.vue');

export default {
  path: '/',
  name: 'Home',
  component: Layout,
  redirect: '/game1',
  meta: {
    icon: 'homeFilled',
    title: 'Home',
    rank: HOME
  },
  children: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('@/views/welcome/index.vue'),
      meta: {
        title: 'Welcome',
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/game1',
      name: 'Welcome',
      component: () => import('@/views/game1/index.vue'),
      meta: {
        title: 'Game1',
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/ipManager',
      name: 'IP Manager',
      component: () => import('@/views/ipManager/index.vue'),
      meta: {
        title: 'IP Manager',
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('@/views/members/index.vue'),
      meta: {
        title: 'Members',
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    }
  ]
} as RouteConfigsTable;
