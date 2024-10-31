<template>
  <div class="main">
    <el-button type="primary" class="float-right" @click="updateMealList">
      {{ t('Meal') }}
    </el-button>

    <!-- timer -->
    <div class="my-5">
      <div class="text-5xl text-center">00:{{ currentSecond }}</div>
    </div>
    <!-- Meals -->
    <div class="w-full overflow-x-auto" ref="scrollContainer">
      <transition-group
        name="fade"
        tag="div"
        class="flex flex-wrap space-x-4 p-4 justify-around"
      >
        <div
          v-for="(item, index) in nextDataList"
          :key="index"
          :class="['w-48 h-24 my-2', isDark ? 'bg-slate-800' : 'bg-white']"
        >
          <div
            :class="[
              'flex items-center justify-center w-48 h-24 rounded-md border',
              currentItem?.id === item?.id
                ? 'border-blue-700 border-2 shadow-blue-400 shadow-md'
                : ''
            ]"
          >
            <img
              v-if="item.meal?.type == 1"
              class="w-[80px]"
              src="/blue.png"
              alt=""
            />
            <img
              v-if="item.meal?.type == 2"
              class="w-[80px]"
              src="/red.png"
              alt=""
            />
            <img
              v-if="item.meal?.type == 3"
              class="w-[80px]"
              src="/green.png"
              alt=""
            />
            <div class="flex flex-col justify-start ml-2 font-bold text-[13px]">
              <span :class="!item.meal ? 'text-center mb-1' : ''">
                {{ item.serial_number }}
              </span>

              <span>{{ item.meal?.meal }}</span>
              <span>{{ item.meal_type }}</span>
              <span>{{ item.order_type }}</span>
              <el-button
                v-if="!item.meal"
                type="primary"
                size="small"
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
      <PureTableBar :columns="columns" @refresh="onSearch('reload')" title="">
        <template v-slot="{ size, dynamicColumns }">
          <SearchForm class="mb-5" @onSearch="onSearch" />
          <pure-table
            :style="{ height: 'calc(100vh - 600px)' }"
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
          >
            <template #meal="{ row }">
              {{ row?.meal?.meal ?? '-' }}
            </template>
            <template #member="{ row }">
              {{ row?.member?.name ?? '-' }}
            </template>
          </pure-table>
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
import { useDark } from '@pureadmin/utils';
import SearchForm from './component/SearchForm.vue';

const { isDark } = useDark();

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
  addMeal,
  mealList,
  updateMealList
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
onUpdated(scrollToEnd);

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
