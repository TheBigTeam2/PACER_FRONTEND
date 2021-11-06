
import ProfessorService from '../../../../services/professor.service'

export default {
  props: {},
  data: () => ({
    name: null,
    criterios: [],
    campos: [
      { key: 'cri_id', label: 'Id' },
      { key: 'cri_nome', label: 'Nome' },
      { key: 'actions', label: 'Ações' }
    ],
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
      this.$swal.showLoading()
      ProfessorService.buscarCriterios().then(r => {
        if (r.data) {
          this.criterios = r.data
        }
        this.$swal.fire({
          title: 'Sucesso!',
          text: 'Critérios atualizados!',
          icon: 'success'
        })
      }).catch(error => {
        console.error(error)
        this.$swal.fire({
          title: 'Erro!',
          text: 'Erro ao buscar critérios!',
          icon: 'error'
        })
      })
    },
    adicionarCriterio (e) {
      e.preventDefault()
      if (this.name != null && this.name.length > 0) {
        this.$swal.showLoading()
        if (this.id) {
          ProfessorService.atualizarCriterioAvaliacao(this.id, this.name).then(response => {
            if (response.status === 200 || response.status === 201) {
              this.$swal.fire({
                title: 'Sucesso!',
                text: 'Critério de avaliação atualizado com sucesso',
                icon: 'success'
              })
              this.name = ''
              this.id = null
              this.buscarCriterios()
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
          ProfessorService.adicionarCriterioAvaliacao(this.name).then(response => {
            if (response.status === 200 || response.status === 201) {
              this.$swal.fire({
                title: 'Sucesso!',
                text: 'Critério de avaliação cadastrado com sucesso',
                icon: 'success'
              })
              this.name = ''
              this.buscarCriterios()
            }
          }).catch(error => {
            console.error(error)
            this.$swal.fire({
              title: 'Erro!',
              text: 'Aconteceu algum erro na requisição!',
              icon: 'error'
            })
          })
          this.id = null
          this.name = ''
        }

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
    },
    excluir (linha) {
      this.id = linha.item.cri_id
      this.$swal.fire({
        title: 'Atenção!',
        text: 'Deseja mesmo remover este critério?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Manter',
        denyButtonText: 'Remover'
      }).then(res => {
        if (res.isDenied) {
          this.name = ''
          this.$swal.showLoading()
          ProfessorService.excluirCriterioAvaliacao(this.id)
            .then(() => {
              this.id = null
              this.$swal.fire({
                title: 'Sucesso!',
                text: 'O critério foi removido com sucesso.',
                icon: 'success'
              })
              setTimeout(() => {
                this.buscarCriterios()
              }, 1000)
            }).catch(error => {
              console.error(error)
              this.id = null
              this.$swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao remover o critério',
                icon: 'error'
              })
            })
        } else {
          this.name = ''
          this.id = null
        }
      })
    },
    alterar (linha) {
      this.name = linha.item.cri_nome
      this.id = linha.item.cri_id
      if (!this['ac-add'] && this['ac-criterios']) {
        this.$root.$emit('bv::toggle::collapse', 'ac-add')
        this.$root.$emit('bv::toggle::collapse', 'ac-criterios')
      }
    }
  },
  mounted () {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      this[collapseId] = isJustShown
    })
  }
}
