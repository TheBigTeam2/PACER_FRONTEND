import axios from 'axios'

const baseAPI = axios.create()

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzdV9pZCI6IjEiLCJ1c3VfcmciOiIzNTQxMDAyMDIiLCJ1c3VfY3BmIjoiMjkzNDYzOTA1ODUiLCJ1c3Vfbm9tZSI6IldhbG1pciBEdXF1ZSIsInVzdV9hdXRoIjoiUHJvZmVzc29yIiwidXN1X3NlbmhhIjoibXVkYXIhQCMifSwicm9sZSI6IlByb2Zlc3NvciIsImV4cCI6MTYzNzAxOTA1N30.Ywu-OJSQSI7nN3ARJC6rMzf4LOaFoD4ojLmIfZly6JU'
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
