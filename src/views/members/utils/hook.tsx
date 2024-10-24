import type { PaginationProps } from '@pureadmin/table';
import { EditFormType } from './types';
import { message } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import { useUserStore } from '@/store/user';

export function membersHook() {
  const userStore = useUserStore();
  const dataList = reactive([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const form = reactive<EditFormType>({
    user_id: '',
    password: '',
    name: ''
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
      const res = await API.userList({
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

  const handleAdd = async (data: EditFormType) => {
    const res = await API.addUser({
      ...data
    });
    message(res.message, { type: res.status ? 'success' : 'error' });
    if (res.status) onSearch();
  };

  const handleDelete = (row: UserAPI.UserList) => {
    if (userStore.userInfo.user_id == row.user_id) {
      return message(t(`Can't delete your own account`), { type: 'error' });
    }

    ElMessageBox.confirm(
      `<div class="text-center">
       <p>${'are you sure you want to delete? '}${row.user_id}</p>
      </div>`,
      t('User Delete'),
      {
        confirmButtonText: t('Confirm'),
        cancelButtonText: t('Cancel'),
        center: true,
        dangerouslyUseHTMLString: true
      }
    ).then(async () => {
      const res = await API.deleteUser({ id: row.id });

      message(res.message, { type: res.status ? 'success' : 'error' });
      if (res.status) onSearch();
    });
  };

  onMounted(() => {
    onSearch();
  });

  return {
    onSearch,
    form,
    dataList,
    handleTableWidthChange,
    handleCurrentChange,
    handleDelete,
    handleAdd,
    pagination,
    loading
  };
}
