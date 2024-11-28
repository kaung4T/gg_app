import { t } from '@/plugins/i18n';

export const static_routers = [
  {
    path: '/game1',
    name: t('Game 1'),
    meta: {
      title: t('Game 1'),
      showLink: true
    },
    id: 0,
    parentId: 0,
    pathList: [0, 0]
  },
  {
    path: '/Vegas-Baccarat',
    name: t('Vegas Baccarat'),
    meta: {
      title: t('Vegas Baccarat'),
      showLink: true
    },
    id: 0,
    parentId: 0,
    pathList: [0, 0]
  },
  {
    path: '/7M-BACCARAT',
    name: t('7M BACCARAT'),
    meta: {
      title: t('7M BACCARAT'),
      showLink: true
    },
    id: 0,
    parentId: 0,
    pathList: [0, 0]
  },
  {
    path: '/members',
    meta: {
      title: t('Members'),
      showLink: true
    },
    name: t('Members')
  },
  {
    path: '/ipCrawlerManager',
    meta: {
      title: t('IP Crawler List'),
      showLink: true
    },
    name: t('IP Crawler List')
  },
  {
    path: '/memberIP',
    meta: {
      title: t('Members IP'),
      showLink: true
    },
    name: t('Members IP')
  }
];
