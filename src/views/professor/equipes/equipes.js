import AdicionarEquipe from './adicionar-equipe/adicionar-equipe.vue'
import AtualizarEquipe from './atualizar-equipe/atualizar-equipe.vue'
import BoxEquipe from '../../../components/box-equipe/box-equipe.vue'
import ProfessorService from '../../../services/professor.service'
import professorService from '../../../services/professor.service'

export default {
    components: {
        'app-adicionar-equipe': AdicionarEquipe,
        'app-atualizar-equipe': AtualizarEquipe,
        'app-box-equipe': BoxEquipe
    },
    data: () => ({
        equipes: [],
        disciplinas: [
            {
                id: 1,
                nome: 'Algoritmos'
            }
        ],
        equipe: null
    }),
    methods: {
        buscarEquipes () {
            ProfessorService.buscarEquipes()
                .then(res => res.data)
                .then(data => this.equipes = data)
        },
        opcoesEquipe (equipe) {
            this.$swal.fire({
                title: 'Atenção!',
                text: `Deseja alterar ou remover a equipe '${equipe.equ_nome}'?`,
                confirmButtonText: 'Alterar',
                denyButtonText: 'Remover',
                showDenyButton: true
            }).then(res => {
                if (res.isDenied) {
                    this.$swal.fire({
                        title: 'Removendo equipe, aguarde...'
                    })
                    this.$swal.showLoading()
                    professorService.removerEquipe(equipe.equ_id)
                        .then(() => {
                            this.$swal.fire({
                                title: 'Sucesso!',
                                text: 'Equipe removida com sucesso.',
                                icon: 'success'
                            })
                            this.buscarEquipes()
                        })
                }
                else if (res.isConfirmed) {
                    this.equipe = equipe
                }
            })
        },
        removerSelecao () {
            this.equipe = null
        }
    },
    created () {
        this.buscarEquipes()
    }
}