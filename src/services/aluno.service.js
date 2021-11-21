import api from '../plugins/api'

class AlunoService {
  enviarAvaliacao (dados, id) {
    return api.post(`/aluno/${id}/nota`, dados)
  }

  buscarEquipes (id) {
    return api.get('/equipe_aluno?aluno=' + id)
  }

  buscarDisciplinas () {
    return api.get('/disciplinas')
  }

  buscarProjetos () {
    return api.get('/projetos')
  }

  buscarProjetosDaEquipe(idEquipe) {
    return api.get('/projeto_equipe?equipe=' + idEquipe)
  }

  adicionarEquipeProjeto(idProjeto, idEquipe) {
    return api.post('/projeto_equipe', {
      projeto: idProjeto,
      equipe: idEquipe
    })
  }

  removerEquipeProjeto(idProjeto, idEquipe) {
    return api.delete(`/projeto_equipe?projeto=${idProjeto}&equipe=${idEquipe}`)
  }
}

export default new AlunoService()
