<template>
    <div class="main">
      <!-- <el-button type="primary" class="float-right" @click="updateGameBaccarat7MList">
        {{ t('Meal') }}
      </el-button> -->
  
      <!-- timer -->
      <div class="my-5">
        <div class="text-5xl text-center">00:{{ currentSecond }}</div>
      </div>
      <!-- Meals -->
      <div class="w-full overflow-x-auto" ref="scrollContainer">
        <transition-group name="fade" tag="div" class="flex flex-wrap space-x-4 p-4 justify-around">
          <div v-for="(item, index) in nextRoundDataList" :key="index"
            :class="['w-48 h-24 my-2 rounded-md', isDark ? 'bg-slate-800' : 'bg-white']">

          <div v-if="item.order_type !== 'AUTO'" @click="() => updateGameBaccarat7M(item)">
            <div :class="[
              'flex items-center justify-center w-48 h-24 rounded-md border',
              currentItem?.id === item?.id
                ? 'border-blue-700 border-2 shadow-blue-400 shadow-md'
                : ''
            ]">
              <div class="flex flex-col justify-start ml-2 font-bold text-[13px]">
                <span :class="!item.meal ? 'text-center mb-1' : ''">
                  {{ item.round_id }}
                </span>
  
                <span>{{ item.meal?.meal }}</span>
                <span>{{ item.meal_type }}</span>
                <span>{{ item.order_type }}</span>
                <el-button v-if="!item.meal" type="primary" size="small" @click="() => addGameBaccarat7M(item)">
                  {{ t('Add Round') }}
                </el-button>
              </div>
            </div>
          </div>

          <div v-if="item.order_type === 'AUTO'">
            <div :class="[
              'flex items-center justify-center w-48 h-24 rounded-md border border-slate-400',
              currentItem?.id === item?.id
                ? 'border-blue-700 border-2 shadow-blue-400 shadow-md'
                : ''
            ]">
              <div class="flex flex-col justify-start ml-2 font-bold text-[13px] text-slate-400">
                <span :class="!item.meal ? 'text-center mb-1' : ''">
                  {{ item.round_id }}
                </span>
                <span>{{ item.order_type }}</span>
                <el-button v-if="!item.meal" type="primary" size="small" disabled>
                  {{ t('Add Round') }}
                </el-button>
              </div>
            </div>
          </div>

          </div>
        </transition-group>
      </div>
  
      <el-tabs v-model="activeName" class="demo-tabs " type="border-card">
  
        <!-- Meals -->
        <el-tab-pane label="Meals" name="meals">
  
          <div>
            <PureTableBar :columns="columns" @refresh="onSearch('reload')" title="">
              <template v-slot="{ size, dynamicColumns }">
                <pure-table :style="{ height: '100vh' }" align-whole="center" table-layout="auto"
                  :loading="loading" :size="size" adaptive :data="sortedDataList.reverse()" :columns="dynamicColumns"
                  :paginationSmall="size === 'small' ? true : false" :header-cell-style="tableHeaderStyle"
                  @page-size-change="handleTableWidthChange" @page-current-change="handleCurrentChange">
                  <template #winner="{ row }">
                    <div v-if="row.banker && row.player">
                      <div v-if="row.banker.num > row.player.num">
                        0
                      </div>
                      <div v-if="row.player.num > row.banker.num">
                        1
                      </div>
                      <div v-if="row.banker.num === row.player.num">
                        2
                      </div>
                    </div>
                    <div v-if="row.banker == null && row.player == null">
                        -
                    </div>
                  </template>
                  <template #total_banker="{ row }">
                    {{ row?.banker?.num ?? '-' }}
                  </template>
                  <template #banker="{ row }">
                    <div v-if="row.banker">
                      <div class="inline" v-for="(item, index) in row.banker.poker" :key="index">
                        <span v-if="index !== 0"> , </span>
                        {{ item?.str ?? '-' }}
                      </div>
                    </div>
                    <div v-if="row.banker === null">
                      <span>-</span>
                    </div>
                  </template>
                  <template #total_player="{ row }">
                    {{ row?.player?.num ?? '-' }}
                  </template>
                  <template #player="{ row }">
                    <div v-if="row.banker">
                      <div class="inline" v-for="(item, index) in row.player.poker" :key="index" >
                        <span v-if="index !== 0"> , </span>
                        {{ item?.str ?? '-' }}
                      </div>
                    </div>
                    <div v-if="row.player === null">
                      <span>-</span>
                    </div>
                  </template>
                  <template #member="{ row }">
                    {{ row?.member?.name ?? '-' }}
                  </template>
                </pure-table>
              </template>
            </PureTableBar>
          </div>
        </el-tab-pane>
        <!-- History -->
        <el-tab-pane label="History" name="history">
          <div>
            <PureTableBar :columns="columns" @refresh="onSearch('reload')" title="">
              <template v-slot="{ size, dynamicColumns }">
                <SearchForm class="mb-5" @onSearch="onSearch" />
                <pure-table :style="{ height: '100vh' }" align-whole="center" table-layout="auto"
                  :loading="loading" :size="size" adaptive :data="dataList" :columns="dynamicColumns"
                  :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
                  :paginationSmall="size === 'small' ? true : false" :header-cell-style="tableHeaderStyle"
                  @page-size-change="handleTableWidthChange" @page-current-change="handleCurrentChange">
                  <template #winner="{ row }">
                      <div v-if="row.banker.num > row.player.num">
                        0
                      </div>
                      <div v-if="row.player.num > row.banker.num">
                        1
                      </div>
                      <div v-if="row.banker.num === row.player.num">
                        2
                      </div>
                  </template>
                  <template #total_banker="{ row }">
                    {{ row?.banker?.num ?? '-' }}
                  </template>
                  <template #banker="{ row }">
                    <div v-if="row.banker">
                      <div class="inline" v-for="(item, index) in row.banker.poker" :key="index">
                        <span v-if="index !== 0"> , </span>
                        {{ item?.str ?? '-' }}
                      </div>
                    </div>
                    <div v-if="row.banker === null">
                      <span>-</span>
                    </div>
                  </template>
                  <template #total_player="{ row }">
                    {{ row?.player?.num ?? '-' }}
                  </template>
                  <template #player="{ row }">
                    <div v-if="row.banker">
                      <div class="inline" v-for="(item, index) in row.player.poker" :key="index" >
                        <span v-if="index !== 0"> , </span>
                        {{ item?.str ?? '-' }}
                      </div>
                    </div>
                    <div v-if="row.player === null">
                      <span>-</span>
                    </div>
                  </template>
                  <template #member="{ row }">
                    {{ row?.member?.name ?? '-' }}
                  </template>
                </pure-table>
              </template>
            </PureTableBar>
          </div>
        </el-tab-pane>
      </el-tabs>
  
      <!-- <form @submit.prevent="createPost">
        <button type="submit">Creat ITEM ITEM ITEM</button>
      </form> -->

    </div>
  </template>
  
  <script setup lang="ts">
  import { t } from '@/plugins/i18n';
  import { columns } from './component/TableColumnList';
  import { Baccarat7MHook } from './utils/hook';
  import { usePublicHooks } from '@/hooks';
  import { PureTableBar } from '@/components/RePureTableBar';
  import { useDark } from '@pureadmin/utils';
  import SearchForm from './component/SearchForm.vue';
  import { http } from '@/utils/http';
  
  const { isDark } = useDark();
  
  const activeName = ref('meals')
  
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
    nextRoundDataList,
    addGameBaccarat7M,
    mealList,
    updateGameBaccarat7MList,
    updateGameBaccarat7M
  } = Baccarat7MHook();
  
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

  watch(
    () => nextRoundDataList,
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
  
  const sortedDataList = computed(() => {
    return [...nextDataList].sort((a, b) => {
      if (a.banker === null && b.banker !== null) return -1; // a first
      if (a.banker !== null && b.banker === null) return 1;  // b first
      return 0; // Preserve existing order for other rows
    });
  });
  
  
  // scroll
  const scrollContainer = ref(null);
  
  const scrollToEnd = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth;
    }
  };
  
  onMounted(scrollToEnd);
  onUpdated(scrollToEnd);
  
  const currentSecond = ref(60);
  let timer;
  
  const syncTimer = () => {
    const now = Date.now(); // Current timestamp in milliseconds
    const elapsedSeconds = Math.floor((now / 1000) % 60); // Seconds elapsed in the current minute
    currentSecond.value = 60 - elapsedSeconds; // Countdown from 60
  };
  
  onMounted(() => {
    syncTimer(); // Initialize the timer
    timer = setInterval(syncTimer, 1000); // Update every second
  });
  
  onBeforeUnmount(() => {
    clearInterval(timer); // Clean up interval
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
  