import professorService from '../../../../services/professor.service'
import ProfessorService from '../../../../services/professor.service'

export default {
    data: () => ({
        form: {
            pro_tema: null,
            pro_inicio: null,
            pro_termino: null,
            pro_disciplinas: []
        },
        periodos: [
            {text: '-- Selecione um período --', value: null, disabled: true, selected: true},
            {text: 'Manhã', value: 0},
            {text: 'Noite', value: 1}
        ],
        disciplinas: [],
        periodos: [
            'Manhã',
            'Noite'
        ]
    }),
    methods: {
        adicionarProjeto (e) {
            e.preventDefault()

            this.$swal.fire({
                title: 'Enviando dados do novo projeto, aguarde...'
            })
            this.$swal.showLoading()
            ProfessorService.adicionarProjeto({
                pro_tema: this.form.pro_tema,
                pro_inicio: this.form.pro_inicio,
                pro_termino: this.form.pro_termino,
                disciplinas: Object.assign([], this.form.pro_disciplinas).map(disciplina => ({
                    dis_id: disciplina.cod
                }))
            })
                .then((res) => res.data)
                .then((data) => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: `O projeto "${ data.inserted_content.pro_tema }" foi adicionado.`,
                        icon: 'success'
                    })
                    this.reiniciarForm()
                    this.$emit('projetoAdicionado')
                })
        },
        reiniciarForm () {
            this.form = {
                pro_tema: null,
                pro_inicio: null,
                pro_termino: null,
                pro_disciplinas: []
            }
        }
    },
    created () {
        professorService
            .buscarDisciplinas()
            .then(res => res.data)
            .then(disciplinas => {
                this.disciplinas = []
                disciplinas.forEach(disciplina => {
                    this.disciplinas.push({
                        cod: disciplina.dis_id,
                        label: `${disciplina.dis_nome} - ${disciplina.dis_curso} - ${this.periodos[disciplina.dis_periodo]}`
                    })
                })
            })
    }
}