import { mapState } from 'vuex'
import professorService from '../../../services/professor.service'
import BoxEquipe from '@/components/box-equipe/box-equipe.vue'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  components: {
    'app-box-equipe': BoxEquipe
  },
  data: () => ({
    equipes: [],
    projeto: null
  }),
  methods: {
    buscarEquipes ({projeto}) {
      this.projeto = projeto
      professorService
        .buscarEquipesDoProjeto(projeto)
        .then(res => res.data)
        .then(equipes => this.equipes = equipes)
    },
    detalharEquipe({equ_id}) {
      this.$router.push(`/professor/avaliacoes/${this.projeto}/${equ_id}`)
    }
  },
  created () {
    this.buscarEquipes(this.$router.currentRoute.params)
  }
}
