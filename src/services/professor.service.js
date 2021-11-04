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

  buscarAlunos () {
    return api.get('/alunos')
  }

  enviarSelecao (dados) {
    return api.post('/adicionar-alunos-as-equipes', dados)
  }
}

export default new ProfessorService()
