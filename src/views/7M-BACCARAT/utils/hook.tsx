import { message } from '@/utils/message';
import { PaginationProps } from '@pureadmin/table';
import { addDialog, closeDialog } from '@/components/ReDialog';
import AddMealDialog from '../component/AddMealDialog.vue';
import EditMealsDialog from '../component/EditMealsDialog.vue';

export function Baccarat7MHook() {
  const dataList = reactive([]);
  const nextDataList = reactive([]);
  const nextRoundDataList = reactive([]);
  const mealList = reactive([]);
  const loading = ref(true);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const handleTableWidthChange = (val: number) => {
    pagination.pageSize = val;
    onSearch();
  };

  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val;
    onSearch();
  };

  const onSearch = async (type?: string, searchForm?: any) => {
    try {
      if (type === 'reload') pagination.currentPage = 1;
      loading.value = true;

      const res = await API.gameBaccarat7MOrderList({
        order_type: searchForm?.orderType,
        date_from: searchForm?.dateFrom,
        date_to: searchForm?.dateTo,
        pageSize: pagination.pageSize + 5,
        page: pagination.currentPage
      });

      loading.value = false;

      if (!res.status) return message(res.message, { type: 'error' });

      dataList.length = 0;

      res.data.data.map((d, i)=>{
        if (d.banker !== null && d.player !== null) {
          dataList.push(d);
        }
      })
      // dataList.push(...res.data.data);
      pagination.total = res.data.total;
    } catch (error) {
      loading.value = false;
    }
  };

  const onSearchMealList = async () => {
    try {
      const res = await API.mealList();

      if (!res.status) return message(res.message, { type: 'error' });

      mealList.length = 0;

      mealList.push(...res.data.data);
    } catch (error) {
      loading.value = false;
    }
  };

  const onSearchNextData = async () => {
    try {
      loading.value = true;

      const res = await API.addGameBaccarat7M({
        pageSize: 5,
        page: 1
      });

      const res2 = await API.addGameBaccarat7M({
        pageSize: 8,
        page: 1
      });

      loading.value = false;

      if (!res.status) return message(res.message, { type: 'error' });

      nextDataList.length = 0;
      nextRoundDataList.length = 0;

      // nextDataList.push(...res.data.data.reverse());
      nextDataList.push(...res.data.data.reverse());
      nextRoundDataList.push(...res2.data.data.reverse());
    } catch (error) {
      loading.value = false;
    }
  };

  const addGameBaccarat7M = (row: Baccarat7MAPI.ORDER) => {
    addDialog({
      title: t('Add Manual Meal'),
      width: '50%',
      closeOnClickModal: false,
      hideFooter: true,
      center: true,
      contentRenderer: ({ options, index }) =>
        h(AddMealDialog, {
          row,
          mealList,
          onCloseDialog: _ => {
            onSearchNextData();
            closeDialog(options, index);
          }
        })
    });
  };

  const updateGameBaccarat7MList = () => {
    addDialog({
      title: t('Update Meal'),
      width: '50%',
      closeOnClickModal: false,
      hideFooter: true,
      center: true,
      contentRenderer: ({ options, index }) =>
        h(EditMealsDialog, {
          mealList,
          onCloseDialog: _ => {
            onSearch();
            onSearchNextData();
            onSearchMealList();
            closeDialog(options, index);
          }
        })
    });
  };

  const updateGameBaccarat7M = (row: Baccarat7MAPI.ORDER) => {
    addDialog({
      title: t('Add Manual Meal'),
      width: '50%',
      closeOnClickModal: false,
      hideFooter: true,
      center: true,
      contentRenderer: ({ options, index }) =>
        h(AddMealDialog, {
          row,
          mealList,
          onCloseDialog: _ => {
            onSearchNextData();
            closeDialog(options, index);
          }
        })
    });
  };

  onMounted(() => {
    onSearch('reload');
    onSearchNextData();
    onSearchMealList();
  });

  return {
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
    onSearchMealList,
    updateGameBaccarat7MList,
    updateGameBaccarat7M
  };
}
