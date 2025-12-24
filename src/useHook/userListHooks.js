import { useGeneralList } from '@/useHook/useGeneralList'
import { useUserListStore } from '@/stores/generalList'

export function useUserList(pageNumber = 1, pageSize = 10) {
  // 使用通用列表hook
  const generalList = useGeneralList(
    useUserListStore, // 获取store实例的函数
    '/mock/public/users', // API请求地址
    {
      pageNumber,
      pageSize,
      transformData: (data) => ({
        list: data.users, // 将响应中的users字段作为列表数据
        total: data.total, // 将响应中的total字段作为总数
      }),
    },
  )

  return {
    fetchUserList: generalList.fetchList,
    userList: generalList.list,
    total: generalList.total,
    loading: generalList.loading,
    error: generalList.error,
  }
}
