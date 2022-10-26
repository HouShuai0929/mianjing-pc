const token = 'hm-element-pc-token'
export const getToken = () => {
  return localStorage.getItem(token)
}
export const setToken = (newToken) => {
  localStorage.setItem(token, newToken)
}
export const removeToken = () => {
  localStorage.removeItem(token)
}
