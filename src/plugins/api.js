import axios from 'axios'

const baseAPI = axios.create()

const apiUrl = 'http://localhost:8085/'

baseAPI.interceptors.request.use(
  function handleRequest (config) {
    const token = sessionStorage.getItem('token')
    if (apiUrl) config.baseURL = apiUrl
    if (token !== 'null' && token !== undefined && token !== null) config.headers.token = token
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
