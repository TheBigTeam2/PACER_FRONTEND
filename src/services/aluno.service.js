import api from '../plugins/api'

class AlunoService {
  enviarAvaliacao (dados, id) {
    return api.post(`/aluno/${id}/nota`, dados)
  }
}

export default new AlunoService()
