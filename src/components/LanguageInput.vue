<template>
  <el-input
    v-model="renderStr"
    :placeholder="placeholder"
    clearable
    :maxlength="maxlength"
    v-enter="search"
    :class="className"
  />
</template>

<script setup lang="ts">
import { storageLocal } from '@pureadmin/utils';
import { computed } from 'vue';
interface ILocaleType {
  locale: 'ko' | 'en';
}
const props = withDefaults(
  defineProps<{
    koVal: string;
    enVal: string;
    maxlength?: string;
    className?: string;
    placeholder?: string;
    useSystem?: boolean;
    compnentLan?: string;
  }>(),
  {
    className: '',
    maxlength: '1000',
    placeholder: ''
  }
);

const emits = defineEmits(['update:koVal', 'update:enVal', 'searchClick']);
const lan =
  (storageLocal().getItem('responsive-locale') as ILocaleType)?.locale ?? 'ko';
const renderStr = computed({
  get() {
    return (props.compnentLan ?? lan) === 'ko' ? props.koVal : props.enVal;
  },
  set(val) {
    if ((props.compnentLan ?? lan) === 'ko') {
      emits('update:koVal', val);
    } else {
      emits('update:enVal', val);
    }
  }
});

const search = () => emits('searchClick');
</script>

<style scoped></style>
