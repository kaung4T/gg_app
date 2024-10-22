import { App } from 'vue';
import axios from 'axios';

let config: object = {};

const setConfig = (cfg?: unknown) => {
  config = Object.assign(config, cfg);
};

const getConfig = (key?: string): ServerConfigs => {
  if (typeof key === 'string') {
    const arr = key.split('.');
    if (arr && arr.length) {
      let data = config;
      arr.forEach(v => {
        if (data && typeof data[v] !== 'undefined') {
          data = data[v];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return config;
};

export const getServerConfig = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$config = getConfig();
  return axios({
    method: 'get',
    url: `/serverConfig.json`
  })
    .then(({ data: config }) => {
      let $config = app.config.globalProperties.$config;

      if (app && $config && typeof config === 'object') {
        $config = Object.assign($config, config);
        app.config.globalProperties.$config = $config;
        setConfig($config);
      }
      return $config;
    })
    .catch(_e => {
      throw 'please add the server config json configuration file in the public folder';
    });
};

const responsiveStorageNameSpace = () => getConfig().ResponsiveStorageNameSpace;

export { getConfig, setConfig, responsiveStorageNameSpace };
