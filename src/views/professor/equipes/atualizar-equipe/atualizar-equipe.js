import ProfessorService from '../../../../services/professor.service'

export default {
    props: ['equipe'],
    data: () => ({
        form: {
            id: null,
            nome: null,
            disciplina: null
        },
        disciplinas: [
            { text: '-- Selecione uma disciplina --', value: null },
            { text: 'Algoritmos', value: 1 }
        ]
    }),
    methods: {
        atualizarEquipe (e) {
            e.preventDefault()
            this.$swal.fire({
                title: 'Atualizando dados da equipe, aguarde...'
            })
            this.$swal.showLoading()
            ProfessorService.atualizarEquipe(this.form.id, {
                nome: this.form.nome,
                disciplina: this.form.disciplina
            })
                .then((res) => res.data)
                .then((data) => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: `A equipe foi atualizada.`,
                        icon: 'success'
                    })
                    this.$emit('equipeAtualizada')
                })
        }
    },
    created () {
        this.form = {
            id: this.$props.equipe.equ_id,
            nome: this.$props.equipe.equ_nome,
            disciplina: this.$props.equipe.equ_disciplina
        }
    }
}