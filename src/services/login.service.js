import api from '../plugins/api'

class LoginService {
  login (user, password) {
    return api.post('/login', { user, password })
  }

  logout () {
    sessionStorage.setItem('token', undefined)
  }
}

export default new LoginService()
