import App from './App.vue';
import router from './router';
import { store } from '@/store';
import ElementPlus from 'element-plus';
import { useI18n } from '@/plugins/i18n';
import { getServerConfig } from './config';
import { createApp, Directive } from 'vue';
import { injectResponsiveStorage } from '@/utils/responsive';
import Table from '@pureadmin/table';
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from './components/ReIcon';
import { Auth } from '@/components/ReAuth';

import './style/index.scss';
import './style/reset.scss';
import './style/tailwind.css';
import 'element-plus/dist/index.css';
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';
// import 'plus-pro-components/es/components/search/style/css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import * as directives from '@/directives';

const app = createApp(App);

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.component('IconifyIconOffline', IconifyIconOffline);
app.component('IconifyIconOnline', IconifyIconOnline);
app.component('FontIcon', FontIcon);

app.component('Auth', Auth);

app.config.errorHandler = (err, vm, info) => {
  console.log('Global error============:', err, vm, info);
};

getServerConfig(app).then(async config => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  app.use(Table).use(store).use(useI18n).use(ElementPlus);
  app.mount('#app');
});
