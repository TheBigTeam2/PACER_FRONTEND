import professorService from '@/services/professor.service'
import { mapState } from 'vuex'
import adicionarDisciplina from './adicionar-disciplina/adicionar-disciplina.vue'
import atualizarDisciplina from './atualizar-disciplina/atualizar-disciplina.vue'

export default {
    computed: {
        ...mapState({
            usuario: state => state.usuario
        })
    },
    components: {
        'app-adicionar-disciplina': adicionarDisciplina,
        'app-atualizar-disciplina': atualizarDisciplina
    },
    data: () => ({
        disciplinas: [],
        periodos: [
            'Manhã',
            'Noite'
        ],
        atualizar_disciplina: null
    }),
    methods: {
        buscarDisciplinas() {
            professorService
                .buscarDisciplinas()
                .then(res => res.data)
                .then(disciplinas => this.disciplinas = disciplinas.filter(disciplina => disciplina.dis_professor === this.usuario.usu_id))
        },
        atualizarDisciplina(disciplina) {
            this.atualizar_disciplina = disciplina
        },
        removerSelecao() {
            this.atualizar_disciplina = null
        },
        removerDisciplina(disciplina) {
            this.$swal.fire({
                title: 'Atenção!',
                text: `Tem certeza que deseja remover a disciplina ${disciplina.dis_nome}?`,
                denyButtonText: 'Não',
                showDenyButton: true,
                confirmButtonText: 'Sim'
            }).then(e => {
                if(e.isConfirmed) {
                    this.$swal.fire({
                        title: 'Removendo disciplina, aguarde'
                    })
                    this.$swal.showLoading()
                    professorService
                        .removerDisciplina(disciplina.dis_id)
                        .then(() => {
                            this.$swal.fire({
                                title: 'Sucesso!',
                                text: `A disciplina ${disciplina.dis_nome} foi removida com sucesso.`,
                                icon: 'success'
                            })
                            this.buscarDisciplinas()
                        })
                        .catch(err => {
                            console.log(err)
                            this.$swal.fire({
                                title: 'Erro!',
                                text: 'Ocorreu algum erro durante a remoção da disciplina.',
                                icon: 'error'
                            })
                        })
                }
            })
        }
    },
    created() {
        this.buscarDisciplinas()
    }
}