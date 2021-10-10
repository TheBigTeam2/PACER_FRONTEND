import api from '../plugins/api'

class AdminService {
  cadastrarUsuario (usuario) {
    return api.post('/usuario', usuario)
  }

  buscarAlunos () {
    return api.get('/alunos')
  }

  buscarProfessores () {
    return api.get('/professores')
  }
}

export default new AdminService()
