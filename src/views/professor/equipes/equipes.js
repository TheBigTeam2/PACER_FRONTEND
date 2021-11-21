import AdicionarEquipe from './adicionar-equipe/adicionar-equipe.vue'
import AtualizarEquipe from './atualizar-equipe/atualizar-equipe.vue'
import BoxEquipe from '../../../components/box-equipe/box-equipe.vue'
import ProfessorService from '../../../services/professor.service'
import professorService from '../../../services/professor.service'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            usuario: state => state.usuario
        })
    },
    components: {
        'app-adicionar-equipe': AdicionarEquipe,
        'app-atualizar-equipe': AtualizarEquipe,
        'app-box-equipe': BoxEquipe
    },
    data: () => ({
        disciplinas: [],
        equipe: null
    }),
    methods: {
        buscarEquipes () {
            return new Promise(resolve => {
                ProfessorService.buscarEquipes()
                    .then(res => res.data)
                    .then(data => resolve(data))
            })
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
                            this.organizarEquipes()
                        })
                }
                else if (res.isConfirmed) {
                    this.equipe = equipe
                }
            })
        },
        removerSelecao () {
            this.equipe = null
        },
        buscarDisciplinas() {
            return new Promise(resolve => {
                professorService
                    .buscarDisciplinas()
                    .then(res => res.data)
                    .then(disciplinas => resolve(disciplinas.filter(disciplina => disciplina.dis_professor === this.usuario.usu_id).map(disciplina => ({
                        id: disciplina.dis_id,
                        nome: disciplina.dis_nome
                    }))))
            })
        },
        organizarEquipes() {
            Promise.all([
                this.buscarEquipes(),
                this.buscarDisciplinas()
            ]).then(res => {
                let equipes = res[0]
                let disciplinas = res[1]
                disciplinas.map(disciplina => {
                    disciplina.equipes = equipes.filter(equipe => equipe.equ_disciplina === disciplina.id)
                })
                this.disciplinas = disciplinas
            })
        }
    },
    created () {
        this.organizarEquipes()
    }
}