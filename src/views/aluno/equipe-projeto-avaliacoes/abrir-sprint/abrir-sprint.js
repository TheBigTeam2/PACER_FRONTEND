import alunoService from '@/services/aluno.service'

export default {
    props: ['sprint', 'alunos'],
    data: () => ({
        criterios: [],
        forms: []
    }),
    methods: {
        removerSelecao() {
            this.$emit('removerSelecao')
        },
        buscarAluno(id) {
            return this.alunos.filter(aluno => aluno.usu_id == id)[0].usu_nome
        },
        buscarCriterios() {
            alunoService
                .buscarCriterios()
                .then(res => res.data)
                .then(criterios => {
                    this.criterios = criterios
                    this.forms = this.sprint.map(avaliacao => ({
                        avaliacao: avaliacao.ava_id,
                        notas: criterios.map(criterio => ({
                            criterio: criterio,
                            nota: 0
                        }))
                    }))
                })
        },
        enviarNotas(e, i) {
            e.preventDefault()
            this.$swal.fire({
                title: 'Enviando notas...'
            })
            this.$swal.showLoading()
            alunoService
                .enviarNotas(this.forms[i].notas.map(nota => ({
                    avaliacao: this.forms[i].avaliacao,
                    criterio: nota.criterio.cri_id,
                    nota: nota.nota
                })))
                .then(() => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: 'Avaliação enviada com sucesso.',
                        icon: 'success'
                    })
                    this.$emit('notasEnviadas')
                })
        }
    },
    created() {
        this.buscarCriterios()
    }
}