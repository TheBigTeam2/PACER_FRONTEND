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

  removerUsuario (id) {
    return api.delete('/usuario?id=' + id)
  }

  alterarUsuario (id, dados) {
    return api.put('/usuario?id=' + id, dados)
  }

  importarUsuarios (usuarios) {
    return api.post('/usuarios', usuarios)
  }
}

export default new AdminService()
