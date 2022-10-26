import request from '@/utils/request'
export const getArticleList = (obj) => {
  return request.get('/admin/interview/query', {
    params: {
      current: obj.current,
      pageSize: obj.pageSize
    }
  })
}
