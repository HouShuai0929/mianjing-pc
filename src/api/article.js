import request from '@/utils/request'
export const getArticleList = (obj) => {
  return request.get('/admin/interview/query', {
    params: {
      current: obj.current,
      pageSize: obj.pageSize
    }
  })
}
export const addArticle = data => {
  return request.post('/admin/interview/create', data)
}
export const removeArticle = id => {
  return request.delete('/admin/interview/remove', {
    data: {
      id
    }
  })
}
export const getArticleDetail = id => {
  return request.get('/admin/interview/show', {
    params: {
      id
    }
  })
}
export const editArticle = data => {
  return request.put('/admin/interview/update', data)
}