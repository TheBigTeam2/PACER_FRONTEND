import ProfessorService from '../../../../services/professor.service'

export default {
    data: () => ({
        form: {
            nome: null,
            disciplina: null
        },
        disciplinas: [
            { text: '-- Selecione uma disciplina --', value: null },
            { text: 'Algoritmos', value: 1 }
        ]
    }),
    methods: {
        adicionarEquipe (e) {
            e.preventDefault()
            this.$swal.fire({
                title: 'Enviando dados da nova equipe, aguarde...'
            })
            this.$swal.showLoading()
            ProfessorService.adicionarEquipe(this.form)
                .then((res) => res.data)
                .then((data) => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: `A equipe "${ data.inserted_content.nome }" foi adicionada`,
                        icon: 'success'
                    })
                    this.reiniciarForm()
                })
        },
        reiniciarForm () {
            this.form.nome = null
            this.form.disciplina = null
        }
    }
}