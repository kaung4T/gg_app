import type { Plugin } from 'vite';
import dayjs, { Dayjs } from 'dayjs';
import utils from '@pureadmin/utils';
import duration from 'dayjs/plugin/duration';
import { green, bold } from 'picocolors';
dayjs.extend(duration);

export function viteBuildInfo(): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  let outDir: string;
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? 'dist';
    },
    buildStart() {
      if (config.command === 'build') {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date());
        utils.getPackageSize({
          folder: outDir,
          callback: (size: string) => {
            console.log(
              bold(
                green(
                  `total time${dayjs
                    .duration(endTime.diff(startTime))
                    .format('mm : ss')}: the packaged size is${size}）`
                )
              )
            );
          }
        });
      }
    }
  };
}
