<template>
  <el-radio-group v-model="inputLanguageType" label="label position">
    <el-radio-button label="ko">{{ t('Kor') }}</el-radio-button>
    <el-radio-button label="en">{{ t('En') }}</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common';
import { t } from '@/plugins/i18n';
import { computed } from 'vue';

const commonStore = useCommonStore();

const inputLanguageType = computed({
  get() {
    return commonStore.inputLanType;
  },
  set(v) {
    commonStore.set_input_lan_type(v);
  }
});
</script>

<style scoped></style>
