import api from '../plugins/api'

class AdminService {
  cadastrarUsuario (usuario) {
    return api.post('/aluno', usuario)
  }
}

export default new AdminService()
