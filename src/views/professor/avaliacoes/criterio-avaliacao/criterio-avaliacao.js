
import ProfessorService from '../../../../services/professor.service'

export default {
  props: {},
  data: () => ({
    name: null,
    criterios: [{ nome: 'teste', b: '2' }, { nome: 'teste', b: '2' }],
    pagina: 1,
    qtdRegistros: 5
  }),
  computed: {
    qtdCriterios () {
      return this.criterios.length
    }
  },
  methods: {
    adicionarCriterio (e) {
      e.preventDefault()
      if (this.name != null && this.name.length > 0) {
        this.$swal.showLoading()
        ProfessorService.adicionarCriterioAvaliacao(this.name).then(response => {
          if (response.status === 200 || response.status === 201) {
            this.$swal.fire({
              title: 'Sucesso!',
              text: 'Critério de avaliação cadastrado com sucesso',
              icon: 'success'
            })
          }
        }).catch(error => {
          console.error(error)
          this.$swal.fire({
            title: 'Erro!',
            text: 'Aconteceu algum erro na requisição!',
            icon: 'error'
          })
        })
      } else {
        this.$swal.fire({
          title: 'Atenção!',
          text: 'É necessário preencher o nome do critério',
          icon: 'warning'
        })
      }
    }
  }
}
