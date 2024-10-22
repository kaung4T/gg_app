<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import ko from 'element-plus/dist/locale/ko.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { ReDialog } from '@/components/ReDialog';

export default defineComponent({
  name: 'app',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale === 'ko' ? ko : en;
    }
  }
});
</script>
