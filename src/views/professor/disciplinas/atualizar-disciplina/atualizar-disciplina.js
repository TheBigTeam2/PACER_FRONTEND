import ProfessorService from '../../../../services/professor.service'

export default {
    props: ['disciplina'],
    data: () => ({
        form: {
            dis_id: null,
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
        atualizarDisciplina (e) {
            e.preventDefault()
            this.$swal.fire({
                title: 'Atualizando dados da disciplina, aguarde...'
            })
            this.$swal.showLoading()
            ProfessorService
                .atualizarDisciplina(this.form.dis_id, {
                    dis_nome: this.form.dis_nome,
                    dis_periodo: this.form.dis_periodo,
                    dis_curso: this.form.dis_curso,
                    dis_professor: this.form.dis_professor
                })
                .then(() => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: `A disciplina foi atualizada.`,
                        icon: 'success'
                    })
                    this.$emit('disciplinaAtualizada')
                })
                .catch(err => {
                    console.log(err)
                    this.$swal.fire({
                        title: 'Erro!',
                        text: `Não foi possível atualizar a disciplina`,
                        icon: 'error'
                    })
                })
        }
    },
    created () {
        this.form = {
            dis_id: this.$props.disciplina.dis_id,
            dis_nome: this.$props.disciplina.dis_nome,
            dis_periodo: this.$props.disciplina.dis_periodo,
            dis_curso: this.$props.disciplina.dis_curso,
            dis_professor: this.$props.disciplina.dis_professor
        }
    }
}