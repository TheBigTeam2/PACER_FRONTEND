import axios from 'axios'

axios.interceptors.request.use(config => {
  config.baseURL = 'http://localhost:5000/'
  return config
})

export default axios
