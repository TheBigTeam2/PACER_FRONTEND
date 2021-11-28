import { mapState } from "vuex"
import professorService from "../../../../services/professor.service"


export default {
    props: ['alunos'],
    computed: {
        ...mapState({
            usuario: state => state.usuario
        })
    },
    data: () => ({
        form: {
            projeto: null,
            sprint: null,
            aluno: null,
            professor: null,
            notas: []
        },
        criterios: {},
        sprints: [
            { text: '-- Selecione uma Sprint --', value: null, disabled: true }
        ],
        alunosOptions: [
            { text: '-- Selecione um Aluno --', value: null, disabled: true }
        ]
    }),
    methods: {
        lancarNota (e) {
            e.preventDefault()

            this.$swal.fire({
                title: 'Lançando nota, aguarde...'
            })
            this.$swal.showLoading()
            professorService
                .lancarNota(this.form)
                .then(() => {
                    this.$swal.fire({
                        title: 'Sucesso!',
                        text: 'Nota foi lançada com sucesso.',
                        icon: 'success'
                    })
                    this.reiniciarForm()
                })
        },
        reiniciarForm() {
            form.sprint = null
            form.aluno = null
            form.notas = form.notas.map(nota => {
                nota.nota = null
                return nota
            })
        }
    },
    created() {
        this.form.projeto = this.$router.currentRoute.params.projeto
        this.form.professor = this.usuario.usu_id

        professorService
            .buscarSprints(this.$router.currentRoute.params.projeto)
            .then(res => res.data)
            .then(sprints => {
                this.sprints = this.sprints.concat(sprints.map(sprint => ({
                    text: 'Sprint ' + sprint,
                    value: sprint
                })))
                console.log(this.sprints)
            })
        
        professorService
            .buscarCriterios()
            .then(res => res.data)
            .then(criterios => {
                this.form.notas = criterios.map(criterio => ({
                    criterio: criterio.cri_id,
                    nota: null
                }))

                this.criterios = {}
                criterios.forEach(criterio => {
                    this.criterios[criterio.cri_id] = criterio.cri_nome
                })
            })

        this.alunosOptions = this.alunosOptions.concat(this.alunos.map(aluno => ({
            text: aluno.usu_nome,
            value: aluno.usu_id
        })))
    }
}