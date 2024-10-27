import { message } from '@/utils/message';
import { PaginationProps } from '@pureadmin/table';
import { EditFormType } from './types';
import { ElMessageBox } from 'element-plus';

export function MemberIPHook() {
  const dataList = reactive([]);
  const loading = ref(true);
  const ipRateLimit = ref(null);
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
      const res = await API.memberIpList({
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
    const res = await API.addMemberIp({
      ...data
    });
    message(res.message, { type: res.status ? 'success' : 'error' });
    if (res.status) onSearch();
  };

  // const handleUpdate = (row: IPAPI.IP) => {
  //   ElMessageBox.confirm(
  //     `<div class="text-center">
  //      <p>${'are you sure you want to update? '}${row.ip}</p>
  //     </div>`,
  //     t('IP Update'),
  //     {
  //       confirmButtonText: t('Confirm'),
  //       cancelButtonText: t('Cancel'),
  //       center: true,
  //       dangerouslyUseHTMLString: true
  //     }
  //   )
  //     .then(async () => {
  //       const res = await API.updateIp({ ...row });

  //       message(res.message, { type: res.status ? 'success' : 'error' });
  //     })
  //     .finally(() => onSearch());
  // };

  const handleDelete = (row: MemberIPAPI.IP) => {
    ElMessageBox.confirm(
      `<div class="text-center">
       <p>${'are you sure you want to delete? '}${row.ip}</p>
      </div>`,
      t('IP Delete'),
      {
        confirmButtonText: t('Confirm'),
        cancelButtonText: t('Cancel'),
        center: true,
        dangerouslyUseHTMLString: true
      }
    ).then(async () => {
      const res = await API.deleteMemberIP({ id: row.id });

      message(res.message, { type: res.status ? 'success' : 'error' });
      if (res.status) onSearch();
    });
  };

  onMounted(() => {
    onSearch();
  });

  return {
    onSearch,
    dataList,
    handleTableWidthChange,
    handleCurrentChange,
    handleDelete,
    handleAdd,
    pagination,
    loading,
    ipRateLimit
  };
}
