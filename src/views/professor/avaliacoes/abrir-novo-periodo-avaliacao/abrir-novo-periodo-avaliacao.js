import { mapState } from 'vuex'
import ProfessorService from '../../../../services/professor.service'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data: () => ({
    form: {
      sprint: null,
      projeto: null,
      inicio: null,
      termino: null
    },
    mostrarAlerta: false,
    mensagemAlerta: '',
    projetos: []
  }),
  methods: {
    abrirPeriodoAvaliacao (e) {
      e.preventDefault()

      let campoVazio = false
      Object.keys(this.form).forEach(key => {
        if (!this.form[key]) { campoVazio = true }
      })

      if (campoVazio) {
        this.mostrarAlerta = true
        this.mensagemAlerta = 'Todos os campos devem ser preenchidos!'
      } else {
        this.mostrarAlerta = false
        this.$swal.fire({
          title: 'Abrindo novo período de avaliação, aguarde...'
        })
        this.$swal.showLoading()
        ProfessorService.abrirAvaliacao({
          ava_sprint: parseInt(this.form.sprint),
          ava_projeto: this.form.projeto,
          ava_inicio: this.form.inicio,
          ava_termino: this.form.termino
        })
          .then(res => {
            this.$swal.fire({
              title: 'Sucesso!',
              text: 'Novas avaliações foram enviadas às equipes. Você poderá acompanhar seu progresso na página de avaliações.',
              icon: 'success'
            })
            this.$emit('avaliacoesEnviadas')
            this.reiniciarFormulario()
          })
      }
    },
    reiniciarFormulario () {
      this.form = {
        sprint: null,
        projeto: null,
        inicio: null,
        termino: null
      }
    },
    buscarProjetos() {
      return new Promise(resolve => {
        ProfessorService
          .buscarProjetos()
          .then(res => res.data)
          .then(projetos => resolve(projetos.filter(projeto => projeto.pro_disciplinas.filter(disciplina => disciplina.dis_professor === this.usuario.usu_id).length >= 1)))
      })
    },
    buscarDisciplinas() {
      return new Promise(resolve => {
        ProfessorService
          .buscarDisciplinas()
          .then(res => res.data)
          .then(disciplinas => resolve(disciplinas))
      })
    },
    filtrarProjetos() {
      Promise.all([
        this.buscarDisciplinas(),
        this.buscarProjetos()
      ]).then(res => {
          let disciplinas = res[0]
          let projetos = res[1]
          this.projetos = projetos.filter(projeto => {
            return disciplinas.filter(disciplina => {
              return projeto.pro_disciplinas.filter(pd => pd.dis_id === disciplina.dis_id).length !== 0
            }).length !== 0
          }).map(projeto => ({
            text: projeto.pro_tema,
            value: projeto.pro_id
          }))
        })
    }
  },
  created() {
    this.filtrarProjetos()
  }
}
