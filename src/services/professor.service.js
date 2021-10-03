import api from '../plugins/api'

const idProfessor = 1

class ProfessorService {
  buscarProjetos () {
    return api.get(`/professor/${idProfessor}/avaliacao`)
  }

  abrirAvaliacao (dados) {
    return api.post(`/professor/${idProfessor}/avaliacao`, dados)
  }
}

export default new ProfessorService()
