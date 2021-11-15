import ProfessorService from '../../../../services/professor.service'

export default {
    data: () => ({
        form: {
            dis_nome: null,
            dis_periodo: null,
            dis_curso: null,
            dis_professor: 1
        },
        periodos: [
            {text: '-- Selecione um período --', value: null, disabled: true, selected: true},
            {text: 'Manhã', value: 0},
            {text: 'Noite', value: 1}
        ]
    }),
    methods: {
        adicionarDisciplina (e) {
            e.preventDefault()
            this.$swal.fire({
                title: 'Enviando dados da nova disciplina, aguarde...'
            })
            this.$swal.showLoading()
            ProfessorService.adicionarDisciplina(this.form)
                .then((res) => res.data)
                .then((data) => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: `A disciplina "${ data.inserted_content.dis_nome }" foi adicionada.`,
                        icon: 'success'
                    })
                    this.reiniciarForm()
                    this.$emit('disciplinaAdicionada')
                })
        },
        reiniciarForm () {
            this.form.dis_nome = null
            this.form.dis_periodo = null
            this.form.dis_curso = null
        }
    }
}