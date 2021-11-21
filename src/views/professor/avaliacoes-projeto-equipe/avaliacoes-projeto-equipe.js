import { mapState } from 'vuex'
import professorService from '../../../services/professor.service'
import BoxUsuario from '@/components/box-usuario/box-usuario.vue'
import relatorioAluno from './relatorio-aluno/relatorio-aluno.vue'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  components: {
    'app-box-usuario': BoxUsuario,
    'app-relatorio-usuario': relatorioAluno
  },
  data: () => ({
    alunos: [],
    avaliacoes: [],
    projeto_id: null,
    equipe_id: null,
    aluno: null
  }),
  methods: {
    buscarAlunos ({projeto, equipe}) {
      this.equipe_id = equipe
      this.projeto_id = projeto

      professorService
        .buscarEquipes()
        .then(res => res.data)
        .then(equipes => this.alunos = equipes.filter(equipe => equipe.equ_id == this.equipe_id)[0].equ_alunos)
    },
    buscarAvaliacoes ({projeto, equipe}) {
      return new Promise(resolve => {
        professorService
          .buscarAvaliacoes(projeto)
          .then(res => res.data)
          .then(avaliacoes => {
            resolve(avaliacoes.filter(avaliacao => avaliacao.equ_id == equipe)[0].equ_alunos)
          })
      })
    },
    buscarCriterios () {
      return new Promise(resolve => {
        professorService
          .buscarCriterios()
          .then(res => res.data)
          .then(criterios => resolve(criterios))
      })
    },
    calcularDados () {
      Promise.all([
        this.buscarAvaliacoes(this.$router.currentRoute.params),
        this.buscarCriterios()
      ]).then(([alunosAvaliacoes, criterios]) => {
        this.avaliacoes = []
        console.log(alunosAvaliacoes)
      })
    },
    relatorioAluno(aluno) {
      this.aluno = aluno
    },
    removerSelecao() {
      this.aluno = null
    }
  },
  created () {
    this.buscarAlunos(this.$router.currentRoute.params)
    this.calcularDados()
  }
}
