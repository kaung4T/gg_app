import { cdn } from './cdn';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { viteBuildInfo } from './info';
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configCompressPlugin } from './compress';
import { visualizer } from 'rollup-plugin-visualizer';
import removeConsole from 'vite-plugin-remove-console';
import { themePreprocessorPlugin } from '@pureadmin/theme';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { genScssMultipleScopeVars } from '../src/layout/theme';
import AutoImport from 'unplugin-auto-import/vite';

export const getPluginsList = (
  _command: string,
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
) => {
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    vue(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve('locales/**')]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/api', 'src/plugins'],
      dts: 'src/auto-imports.d.ts'
    }),
    vueJsx(),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),

    removeConsole({ external: ['src/assets/iconfont/iconfont.js'] }),
    viteBuildInfo(),

    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        extract: true
      }
    }),
    svgLoader(),

    lifecycle === 'report'
      ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
      : null
  ];
};
