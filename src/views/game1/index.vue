<template>
  <div class="main">
    <!-- timer -->
    <div class="my-5">
      <div class="text-5xl text-center">00:{{ currentSecond }}</div>
    </div>
    <!-- Meals -->
    <div class="w-full overflow-x-auto" ref="scrollContainer">
      <transition-group
        name="fade"
        tag="div"
        class="flex space-x-4 p-4 justify-around"
      >
        <div
          v-for="(item, index) in nextDataList"
          :key="index"
          class="w-60 h-28 bg-white"
        >
          <div
            :class="[
              'flex items-center justify-center w-60 h-28 rounded-md border',
              currentItem?.id === item?.id
                ? 'border-blue-700 border-2 shadow-blue-400 shadow-md'
                : ''
            ]"
          >
            <img
              v-if="item.meal == 'Blue'"
              class="w-[100px]"
              src="/blue.png"
              alt=""
            />
            <img
              v-if="item.meal == 'Red'"
              class="w-[100px]"
              src="/red.png"
              alt=""
            />
            <img
              v-if="item.meal == 'Green'"
              class="w-[100px]"
              src="/green.png"
              alt=""
            />
            <div class="flex flex-col justify-start ml-3 font-bold text-[15px]">
              <span :class="!item.meal ? 'text-center mb-2' : ''">
                {{ item.serial_number }}
              </span>

              <span>{{ item.meal }}</span>
              <span>{{ item.meal_type }}</span>
              <span>{{ item.order_type }}</span>
              <el-button
                v-if="!item.meal"
                type="primary"
                @click="() => addMeal(item)"
              >
                {{ t('Add Meal') }}
              </el-button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- History -->
    <div>
      <PureTableBar
        :columns="columns"
        @refresh="onSearch('reload')"
        title="Order History"
      >
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            align-whole="center"
            table-layout="auto"
            :loading="loading"
            :size="size"
            adaptive
            :data="dataList"
            :columns="dynamicColumns"
            :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="tableHeaderStyle"
            @page-size-change="handleTableWidthChange"
            @page-current-change="handleCurrentChange"
          />
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { columns } from './component/TableColumnList';
import { Game1Hook } from './utils/hook';
import { usePublicHooks } from '@/hooks';
import { PureTableBar } from '@/components/RePureTableBar';

defineOptions({ name: 'Game1' });
const { tableHeaderStyle } = usePublicHooks();
const {
  onSearch,
  dataList,
  handleTableWidthChange,
  handleCurrentChange,
  pagination,
  loading,
  onSearchNextData,
  nextDataList,
  addMeal
} = Game1Hook();

const currentItem = ref(null);
watch(
  () => nextDataList,
  newVal => {
    if (newVal && newVal.length) {
      const idToFind = newVal
        .filter(item => !item.is_showed)
        .map(item => item.id)[0];

      if (idToFind) {
        currentItem.value = newVal.find(item => item.id === idToFind);
      } else {
        currentItem.value = null; // Handle case when no idToFind is found
      }
    } else {
      currentItem.value = null; // Handle empty or undefined nextDataList
    }
  },
  { deep: true }
);

// scroll
const scrollContainer = ref(null);

const scrollToEnd = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth;
  }
};

onMounted(scrollToEnd);

// timer
const currentSecond = ref(String(new Date().getSeconds()));

const timer = ref<NodeJS.Timeout>();

onMounted(() => {
  if (timer.value) clearInterval(timer.value);
  timer.value = setInterval(() => {
    currentSecond.value = String(new Date().getSeconds()).padStart(2, '0');
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});

// table

const intervalId = ref<NodeJS.Timeout>();

onMounted(async () => {
  await setIntervalForSearch();
});

const setIntervalForSearch = async () => {
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  const millisecondsUntilNextMinute = secondsUntilNextMinute * 1000;

  if (intervalId.value) clearInterval(intervalId.value);
  setTimeout(async () => {
    await onSearch();

    intervalId.value = setInterval(async () => {
      await onSearch();
    }, 60000);
  }, millisecondsUntilNextMinute);
};

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

// next data list

const intervalIdForNextOrder = ref<NodeJS.Timeout>();

onMounted(async () => {
  await setIntervalForNextOrderSearch();
});

const setIntervalForNextOrderSearch = async () => {
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  const millisecondsUntilNextMinute = secondsUntilNextMinute * 1000;

  if (intervalIdForNextOrder.value) clearInterval(intervalIdForNextOrder.value);
  setTimeout(async () => {
    await onSearchNextData();

    intervalIdForNextOrder.value = setInterval(async () => {
      await onSearchNextData();
    }, 60000);
  }, millisecondsUntilNextMinute);
};

onBeforeUnmount(() => {
  clearInterval(intervalIdForNextOrder.value);
});
</script>

<style scoped lang="scss"></style>
