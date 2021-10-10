import axios from 'axios'

const baseAPI = axios.create()

const token = null
const apiUrl = 'http://localhost:8085/'

baseAPI.interceptors.request.use(
  function handleRequest (config) {
    if (apiUrl) config.baseURL = apiUrl
    if (token) config.headers.Authorization = 'Bearer ' + token
    return config
  },
  function handleError (error) {
    return Promise.reject(error)
  }
)

baseAPI.interceptors.response.use(
  function handleResponse (response) {
    return response
  },
  function handleError (error) {
    if (error && error?.response?.data?.detail) {
      console.error('❌ ' + error.response.data.detail)
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Você não possui permissão para acessar.')
          break
        default:
          console.error(error.response.data.Message)
          break
      }
    } else {
      console.error(error)
    }

    return Promise.reject(error)
  }
)

export default baseAPI
