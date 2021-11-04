import api from '../plugins/api'

const idProfessor = 1

class ProfessorService {
  buscarProjetos () {
    return api.get(`/professor/${idProfessor}/avaliacao`)
  }

  abrirAvaliacao (dados) {
    return api.post(`/professor/${idProfessor}/avaliacao`, dados)
  }

  adicionarEquipe (dados) {
    return api.post('/equipe', dados)
  }

  buscarEquipes () {
    return api.get('/equipes')
  }

  adicionarCriterioAvaliacao (nome) {
    return api.post('/criterio', { nome })
  }

  atualizarCriterioAvaliacao (id, nome) {
    return api.put(`/criterio?id=${id}`, { nome })
  }

  excluirCriterioAvaliacao (id, nome) {
    return api.delete(`/criterio?id=${id}`)
  }
}

export default new ProfessorService()
