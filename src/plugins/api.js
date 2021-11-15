import axios from 'axios'

const baseAPI = axios.create()

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJyb2xlIjoiUHJvZmVzc29yIiwiZXhwIjoxNjM3MDAxMDYwfQ.15ZQ8YDFr27pZM-Zl1Ja1RWJNmFmvZnhmc0leAqvvME'
const apiUrl = 'http://localhost:8085/'

baseAPI.interceptors.request.use(
  function handleRequest (config) {
    if (apiUrl) config.baseURL = apiUrl
    if (token) config.headers.token = token
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
