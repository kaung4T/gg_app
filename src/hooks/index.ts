import { computed } from 'vue';
import { useDark } from '@pureadmin/utils';

export function usePublicHooks() {
  const { isDark } = useDark();

  const switchStyle = computed(() => {
    return {
      '--el-switch-on-color': '#6abe39',
      '--el-switch-off-color': '#e84749'
    };
  });

  const tagStyle = computed(() => {
    return (status: number) => {
      return status === 1
        ? {
            '--el-tag-text-color': isDark.value ? '#6abe39' : '#389e0d',
            '--el-tag-bg-color': isDark.value ? '#172412' : '#f6ffed',
            '--el-tag-border-color': isDark.value ? '#274a17' : '#b7eb8f'
          }
        : {
            '--el-tag-text-color': isDark.value ? '#e84749' : '#cf1322',
            '--el-tag-bg-color': isDark.value ? '#2b1316' : '#fff1f0',
            '--el-tag-border-color': isDark.value ? '#58191c' : '#ffa39e'
          };
    };
  });

  const tableHeaderStyle = computed(() => {
    return {
      background: 'var(--el-fill-color-light)',
      color: 'var(--el-text-color-primary)'
    };
  });

  const tableHeaderStyleBlue = computed(() => {
    return {
      background: 'var(--el-color-primary)',
      color: 'white'
    };
  });

  return {
    isDark,
    switchStyle,
    tagStyle,
    tableHeaderStyle,
    tableHeaderStyleBlue
  };
}
