import { getPluginsList } from './build/plugins';
import dayjs from 'dayjs';
import { resolve } from 'path';
import { wrapperEnv } from './build';
import { include, exclude } from './build/optimize';
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import pkg from './package.json';

const root: string = process.cwd();

const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@build': pathResolve('build')
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
};

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const {
    VITE_CDN,
    VITE_PORT,
    VITE_COMPRESSION,
    VITE_PUBLIC_PATH,
    VITE_API_BASE_URL,
    VITE_BUILD_TYPE
  } = wrapperEnv(loadEnv(mode, root));

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias },
    server: {
      https: false,
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          configure: (proxy, _) => {
            proxy.on('proxyRes', (_, req, _r) => {
              console.log(req.url);
            });
          },
          headers: {
            Origin: VITE_API_BASE_URL,
            Referer: VITE_API_BASE_URL
          }
        }
      }
    },
    plugins: getPluginsList(command, VITE_CDN, VITE_COMPRESSION),
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('index.html')
        },

        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      outDir: `dist${VITE_BUILD_TYPE === 'production' ? '/gg_slot' : ''}`
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          ...silenceSomeSassDeprecationWarnings
        },
        sass: {
          ...silenceSomeSassDeprecationWarnings
        }
      }
    }
  };
};

const silenceSomeSassDeprecationWarnings = {
  verbose: true,
  logger: {
    warn(message, options) {
      // const { stderr } = process;
      // const span = options.span ?? undefined;
      // const stack =
      //   (options.stack === 'null' ? undefined : options.stack) ?? undefined;
      // if (options.deprecation) {
      //   if (
      //     message.startsWith(
      //       'Using / for division outside of calc() is deprecated'
      //     )
      //   ) {
      //     // silences above deprecation warning
      //     return;
      //   }
      //   stderr.write('DEPRECATION ');
      // }
      // stderr.write(`WARNING: ${message}\n`);
      // if (span !== undefined) {
      //   // output the snippet that is causing this warning
      //   stderr.write(`\n"${span.text}"\n`);
      // }
      // if (stack !== undefined) {
      //   // indent each line of the stack
      //   stderr.write(
      //     `    ${stack.toString().trimEnd().replace(/\n/gm, '\n    ')}\n`
      //   );
      // }
      // stderr.write('\n');
    }
  }
};
