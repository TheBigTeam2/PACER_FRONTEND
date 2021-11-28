import AbrirNovoPeriodoAvaliacao from './abrir-novo-periodo-avaliacao/abrir-novo-periodo-avaliacao.vue'
import CriterioAvaliacao from './criterio-avaliacao/criterio-avaliacao.vue'
import { mapState } from 'vuex'
import professorService from '../../../services/professor.service'
import BoxProjetos from '@/components/box-projetos/box-projetos.vue'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  components: {
    'app-abrir-novo-periodo-avaliacao': AbrirNovoPeriodoAvaliacao,
    'app-criterio-avaliacao': CriterioAvaliacao,
    'app-box-projeto': BoxProjetos
  },
  data: () => ({
    projetos: []
  }),
  methods: {
    buscarProjetos () {
      professorService
        .buscarProjetos()
        .then(res => res.data)
        .then(projetos => this.projetos = projetos.filter(projeto => projeto.disciplinas.filter(disciplina => disciplina.dis_professor === this.usuario.usu_id).length >= 1))
    },
    abrirProjeto (projeto) {
      this.$router.push('/professor/avaliacoes/' + projeto.pro_id)
    }
  },
  created () {
    this.buscarProjetos()
  }
}
