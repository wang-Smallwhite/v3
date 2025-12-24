import { useGeneralList } from '@/useHook/useGeneralList'
import { useProductListStore } from '@/stores/generalList'

export function useProductList(pageNumber = 1, pageSize = 10) {
  // 使用通用列表hook获取产品列表
  const generalList = useGeneralList(
    useProductListStore, // 获取store实例的函数
    '/api/products', // API请求地址
    {
      pageNumber,
      pageSize,
      transformData: (data) => ({
        list: data.products || data, // 将响应中的products字段或整个响应作为列表数据
        total: data.total || data.length || 0, // 将响应中的total字段或数据长度作为总数
      }),
    },
  )

  return {
    fetchProductList: generalList.fetchList,
    productList: generalList.list,
    total: generalList.total,
    loading: generalList.loading,
    error: generalList.error,
  }
}

// 如果需要使用axios而不是fetch
export async function useProductListWithAxios(pageNumber = 1, pageSize = 10) {
  const { useGeneralListWithAxios } = await import('@/useHook/useGeneralList')

  const generalList = await useGeneralListWithAxios(useProductListStore, '/api/products', {
    pageNumber,
    pageSize,
    transformData: (data) => ({
      list: data.products || data,
      total: data.total || data.length || 0,
    }),
  })

  return {
    fetchProductList: generalList.fetchList,
    productList: generalList.list,
    total: generalList.total,
    loading: generalList.loading,
    error: generalList.error,
  }
}
