import { getToken, setToken } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    }
  }
}
