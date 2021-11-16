import AbrirNovoPeriodoAvaliacao from './abrir-novo-periodo-avaliacao/abrir-novo-periodo-avaliacao.vue'
import CriterioAvaliacao from './criterio-avaliacao/criterio-avaliacao.vue'
import ProfessorService from '../../../services/professor.service'

export default {
  components: {
    'app-abrir-novo-periodo-avaliacao': AbrirNovoPeriodoAvaliacao,
    'app-criterio-avaliacao': CriterioAvaliacao
  },
  data: () => ({
    
  }),
  created () {
    this.buscarProjetos()
  },
  methods: {
    buscarProjetos () {
      
    }
  }
}
