import { getToken, removeToken, setToken } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    deleteToken(state) {
      state.token = ''
      removeToken()
    }
  }
}
