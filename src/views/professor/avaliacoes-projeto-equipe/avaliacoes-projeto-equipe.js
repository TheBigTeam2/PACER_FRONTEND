import { mapState } from 'vuex'
import professorService from '../../../services/professor.service'
import BoxUsuario from '@/components/box-usuario/box-usuario.vue'
import relatorioAluno from './relatorio-aluno/relatorio-aluno.vue'
import lancarNota from './lancar-nota/lancar-nota.vue'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  components: {
    'app-box-usuario': BoxUsuario,
    'app-relatorio-usuario': relatorioAluno,
    'app-lancar-nota': lancarNota
  },
  data: () => ({
    alunos: [],
    avaliacoes: [],
    projeto_id: null,
    equipe_id: null,
    aluno: null,
    lancarNota: false
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
    relatorioAluno(aluno) {
      this.aluno = aluno
    },
    removerSelecao() {
      this.aluno = null
    }
  },
  created () {
    this.buscarAlunos(this.$router.currentRoute.params)
    this.projeto_id = this.$router.currentRoute.params.projeto
  }
}
