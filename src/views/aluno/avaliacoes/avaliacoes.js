import ProfessorService from '../../../services/professor.service'
import AtribuirNota from './atribuir-nota/atribuir-nota.vue'

export default {
  components: {
    'app-atribuir-nota': AtribuirNota
  },
  data: () => ({
    projetos: [],
    avaliacaoSelecionada: null,
    idAluno: 1
  }),
  created () {
    this.buscarProjetos()
  },
  methods: {
    buscarProjetos () {
      ProfessorService.buscarProjetos()
        .then(res => res.data)
        .then(data => {
          this.projetos = []
          data.forEach(projeto => {
            projeto.avaliacoes = projeto.avaliacoes.filter(avaliacao => avaliacao.avaliador === this.idAluno && avaliacao.notas.length === 0)
            projeto.avaliacoes = this.groupBy(projeto.avaliacoes, 'sprint')
            this.projetos.push(projeto)
          })
        })
    },
    groupBy (arr, key) {
      return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
      }, {})
    },
    avaliar (avaliacao) {
      this.avaliacaoSelecionada = avaliacao
    },
    removerSelecao () {
      this.avaliacaoSelecionada = null
    },
    avaliacaoEnviada () {
      this.buscarProjetos()
      this.avaliacaoSelecionada = null
    }
  }
}
