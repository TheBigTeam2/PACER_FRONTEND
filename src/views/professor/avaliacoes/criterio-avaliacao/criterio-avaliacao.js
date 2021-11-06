
import ProfessorService from '../../../../services/professor.service'

export default {
  props: {},
  data: () => ({
    name: null,
    criterios: [],
    pagina: 1,
    qtdRegistros: 5
  }),
  computed: {
    qtdCriterios () {
      return this.criterios.length
    }
  },
  created () {
    this.buscarCriterios()
  },
  methods: {
    buscarCriterios () {
      ProfessorService.buscarCriterios().then(r => {
        if (r.data) {
          this.criterios = r.data
        }
      }).catch(error => {
        console.error(error)
      })
    },
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

        if (this['ac-add'] && !this['ac-criterios']) {
          this.$root.$emit('bv::toggle::collapse', 'ac-add')
          this.$root.$emit('bv::toggle::collapse', 'ac-criterios')
        }
      } else {
        this.$swal.fire({
          title: 'Atenção!',
          text: 'É necessário preencher o nome do critério',
          icon: 'warning'
        })
      }
    }
  },
  mounted () {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      this[collapseId] = isJustShown
    })
  }
}
