import api from '../plugins/api'

const idProfessor = 1

class ProfessorService {
  abrirAvaliacao (dados) {
    return api.post('/avaliacao', dados)
  }

  adicionarEquipe (dados) {
    return api.post('/equipe', dados)
  }

  removerEquipe (id) {
    return api.delete('/equipe?id=' + id)
  }

  atualizarEquipe (id, dados) {
    return api.put('/equipe?id=' + id, dados)
  }

  buscarEquipes () {
    return api.get('/equipes')
  }

  buscarAlunos () {
    return api.get('/alunos')
  }

  enviarSelecao (dados) {
    return Promise.all(dados.map(atribuicao => api.put('/atribuir', atribuicao)))
  }

  adicionarCriterioAvaliacao (nome) {
    return api.post('/criterio', { nome })
  }

  atualizarCriterioAvaliacao (id, nome) {
    return api.put(`/criterio?id=${id}`, { nome })
  }

  excluirCriterioAvaliacao (id) {
    return api.delete(`/criterio?id=${id}`)
  }

  buscarCriterios () {
    return api.get('/criterios')
  }

  buscarDisciplinas () {
    // api.post('/login', {
    //   user: '29346390585',
    //   password: 'mudar!@#'
    // }).then(res => console.log(res.data))
    return api.get('/disciplinas')
  }

  adicionarDisciplina (dados) {
    return api.post('/disciplina', dados)
  }

  atualizarDisciplina (id, dados) {
    return api.put('/disciplina?id=' + id, dados)
  }

  removerDisciplina (id) {
    return api.delete('/disciplina?id=' + id)
  }

  buscarProjetos () {
    return api.get('/projetos')
  }

  adicionarProjeto (dados) {
    return api.post('/projeto', dados)
  }

  removerProjeto (id) {
    return api.delete('/projeto?id=' + id)
  }

  atualizarProjeto (id, dados) {
    return api.put('/projeto?id=' + id, dados)
  }
}

export default new ProfessorService()
