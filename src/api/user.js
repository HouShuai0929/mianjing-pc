import request from '@/utils/request'

// 登录
export const login = (obj) => {
  return request.post('/auth/login', {
    username: obj.username,
    password: obj.password
  })
}