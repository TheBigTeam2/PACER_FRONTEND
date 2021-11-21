import api from '../plugins/api'

class AlunoService {
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

  buscarAvaliacoes(idUsuario) {
    return api.get(`/avaliacao?avaliador=${idUsuario}`)
  }

  buscarCriterios() {
    return api.get('/criterios')
  }

  enviarNotas(dados) {
    return api.post('/nota', dados)
  }
}

export default new AlunoService()
