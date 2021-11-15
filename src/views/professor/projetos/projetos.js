import professorService from '@/services/professor.service'
import adicionarProjeto from './adicionar-projeto/adicionar-projeto.vue'

export default {
    components: {
        'app-adicionar-projeto': adicionarProjeto
    },
    data: () => ({
        projetos: [],
        periodos: [
            'Manhã',
            'Noite'
        ]
    }),
    methods: {
        buscarProjetos() {            
            professorService
                .buscarProjetos()
                .then(res => res.data)
                .then(projetos => this.projetos = projetos.map(projeto => ({
                    pro_id: projeto.pro_id,
                    pro_tema: projeto.pro_tema,
                    pro_inicio: projeto.pro_inicio,
                    pro_termino: projeto.pro_termino,
                    pro_disciplinas: projeto.pro_disciplinas.map(disciplina => {
                        return `${disciplina.dis_nome} - ${disciplina.dis_curso} - ${this.periodos[disciplina.dis_periodo]}`
                    }).join('<br>')
                })))
        },
        removerProjeto(projeto) {
            this.$swal.fire({
                title: 'Atenção!',
                text: `Tem certeza que deseja remover o projeto ${projeto.pro_tema}?`,
                denyButtonText: 'Não',
                showDenyButton: true,
                confirmButtonText: 'Sim'
            }).then(e => {
                if(e.isConfirmed) {
                    this.$swal.fire({
                        title: 'Removendo projeto, aguarde'
                    })
                    this.$swal.showLoading()
                    professorService
                        .removerProjeto(projeto.pro_id)
                        .then(() => {
                            this.$swal.fire({
                                title: 'Sucesso!',
                                text: `O projeto ${projeto.pro_tema} foi removido com sucesso.`,
                                icon: 'success'
                            })
                            this.buscarProjetos()
                        })
                        .catch(err => {
                            console.log(err)
                            this.$swal.fire({
                                title: 'Erro!',
                                text: 'Ocorreu algum erro durante a remoção do projeto.',
                                icon: 'error'
                            })
                        })
                }
            })
        }
    },
    created() {
        this.buscarProjetos()
    }
}