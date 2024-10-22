import { message } from '@/utils/message';
import { PaginationProps } from '@pureadmin/table';
import { addDialog, closeDialog } from '@/components/ReDialog';
import AddMealDialog from '../component/AddMealDialog.vue';

export function Game1Hook() {
  const dataList = reactive([]);
  const nextDataList = reactive([]);
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

  const onSearch = async (type?: string) => {
    try {
      if (type === 'reload') pagination.currentPage = 1;
      loading.value = true;

      const res = await API.game1ShowedOrderList({
        pageSize: pagination.pageSize,
        page: pagination.currentPage
      });

      loading.value = false;

      if (!res.status) return message(res.message, { type: 'error' });

      dataList.length = 0;

      dataList.push(...res.data.data);
      pagination.total = res.data.total;
    } catch (error) {
      loading.value = false;
    }
  };

  const onSearchNextData = async () => {
    try {
      loading.value = true;

      const res = await API.game1OrderList({
        pageSize: 8,
        page: 1
      });

      loading.value = false;

      if (!res.status) return message(res.message, { type: 'error' });

      nextDataList.length = 0;

      nextDataList.push(...res.data.data.reverse());
    } catch (error) {
      loading.value = false;
    }
  };

  const addMeal = (row: GAME1API.ORDER) => {
    console.log({ row });
    addDialog({
      title: t('Add Manual Meal'),
      width: '20%',
      closeOnClickModal: false,
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(AddMealDialog, {
          row,
          onCloseDialog: _ => {
            onSearchNextData();
            closeDialog(options, index);
          }
        })
    });
  };

  onMounted(() => {
    onSearch();
    onSearchNextData();
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
    addMeal
  };
}
