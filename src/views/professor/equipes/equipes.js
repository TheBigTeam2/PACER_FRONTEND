import AdicionarEquipe from './adicionar-equipe/adicionar-equipe.vue'
import BoxEquipe from '../../../components/boxEquipe/boxEquipe.vue'
import ProfessorService from '../../../services/professor.service'

export default {
    components: {
        'app-adicionar-equipe': AdicionarEquipe,
        'app-box-equipe': BoxEquipe
    },
    data: () => ({
        equipes: []
    }),
    methods: {
        buscarEquipes () {
            ProfessorService.buscarEquipes()
                .then(res => res.data)
                .then(data => this.equipes = data)
        }
    },
    created () {
        this.buscarEquipes()
    }
}