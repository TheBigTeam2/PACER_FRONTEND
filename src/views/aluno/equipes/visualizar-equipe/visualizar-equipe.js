import { mapState } from "vuex"
import alunoService from "../../../../services/aluno.service"

export default {
    computed: {
        ...mapState({
            usuario: state => state.usuario
        })
    },
    props: ['equipe'],
    data: () => ({
        periodos: [
            'Manhã',
            'Noite'
        ],
        projetos: []
    }),
    methods: {
        removerSelecao() {
            this.$emit('removerSelecao')
        },
        buscarTodosProjetos() {
            return new Promise(resolve => {
                alunoService
                    .buscarProjetos()
                    .then(res => res.data)
                    .then(projetos => resolve(projetos.filter(projeto => {
                        console.log(this.equipe)
                        return projeto.pro_disciplinas.filter(disciplina => {
                            return disciplina.dis_id === this.equipe.equ_disciplina.dis_id
                        }).length >= 1
                    })))
            })
        },
        buscarProjetosDaEquipe() {
            return new Promise(resolve => {
                alunoService
                    .buscarProjetosDaEquipe(this.equipe.equ_id)
                    .then(res => res.data)
                    .then(projetos => resolve(projetos))
            })
        },
        atualizarProjetosDaEquipe() {
            Promise.all([
                this.buscarTodosProjetos(),
                this.buscarProjetosDaEquipe()
            ]).then(([todos, inclusos]) => {
                this.projetos = todos.map(projetoT => ({
                    ...projetoT,
                    incluso: inclusos.filter(projetoI => projetoT.pro_id == projetoI.pro_id).length == 1
                }))
                console.log(this.projetos)
            })
        },
        adicionarEquipeProjeto(remover, idProjeto) {
            if (remover) {
                this.$swal.fire({
                    title: 'Removendo a equipe do projeto, aguarde...'
                })
                this.$swal.showLoading()
                alunoService
                    .removerEquipeProjeto(idProjeto, this.equipe.equ_id)
                    .then(res => res.data)
                    .then(data => {
                        this.$swal.fire({
                            title: 'Sucesso!',
                            text: 'Equipe foi removida com sucesso.',
                            icon: 'success'
                        })
                        this.atualizarProjetosDaEquipe()
                    })
            } else {
                this.$swal.fire({
                    title: 'Adicionando a equipe ao projeto, aguarde...'
                })
                this.$swal.showLoading()
                alunoService
                    .adicionarEquipeProjeto(idProjeto, this.equipe.equ_id)
                    .then(res => res.data)
                    .then(data => {
                        this.$swal.fire({
                            title: 'Sucesso!',
                            text: 'Equipe foi adicionada com sucesso.',
                            icon: 'success'
                        })
                        this.atualizarProjetosDaEquipe()
                    })
            }
        }
    },
    created() {
        this.atualizarProjetosDaEquipe()
    }
}