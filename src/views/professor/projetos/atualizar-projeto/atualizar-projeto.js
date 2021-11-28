import ProfessorService from '../../../../services/professor.service'

export default {
    props: ['projeto'],
    data: () => ({
        form: {
            pro_id: null,
            disciplinas: null,
            pro_inicio: null,
            pro_termino: null,
            pro_tema: null
        },
        periodos: [
            'Manhã',
            'Noite'
        ],
        disciplinas: []
    }),
    methods: {
        buscarDisciplinas() {
            ProfessorService
                .buscarDisciplinas()
                .then(res => res.data)
                .then(disciplinas => this.disciplinas = disciplinas.map(disciplina => this.formatarDisciplina(disciplina)))
        },
        atualizarProjeto (e) {
            e.preventDefault()
            this.$swal.fire({
                title: 'Atualizando dados da disciplina, aguarde...'
            })
            this.$swal.showLoading()
            console.log(this.form)
            ProfessorService
                .atualizarProjeto(this.form.pro_id, {
                    pro_tema: this.form.pro_tema,
                    pro_inicio: this.form.pro_inicio,
                    pro_termino: this.form.pro_termino,
                    disciplinas: this.form.disciplinas.map(disciplina => ({
                        dis_id: disciplina.cod
                    }))
                })
                .then(() => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: `O projeto foi atualizado.`,
                        icon: 'success'
                    })
                    this.$emit('projetoAtualizado')
                })
                .catch(err => {
                    console.log(err)
                    this.$swal.fire({
                        title: 'Erro!',
                        text: `Não foi possível atualizar o projeto`,
                        icon: 'error'
                    })
                })
        },
        formatarDisciplina(disciplina) {
            return ({
                label: `${disciplina.dis_nome} - ${disciplina.dis_curso} - ${this.periodos[disciplina.dis_periodo]}`,
                cod: disciplina.dis_id
            })
        }
    },
    created () {
        this.buscarDisciplinas()
        this.form = {
            pro_id: this.$props.projeto.pro_id,
            pro_tema: this.$props.projeto.pro_tema,
            pro_inicio: this.$moment(this.$props.projeto.pro_inicio).format('YYYY-MM-DD'),
            pro_termino: this.$moment(this.$props.projeto.pro_termino).format('YYYY-MM-DD'),
            disciplinas: this.$props.projeto.disciplinas.map(disciplina => this.formatarDisciplina(disciplina))
        }
    }
}