import AdminService from '../../../../services/admin.service'

export default {
  data: () => ({
    form: {
      cpf: null,
      rg: null,
      nome: null,
      auth: null
    }
  }),
  methods: {
    formatarRG () {
      this.form.rg = this.form.rg.toUpperCase()
    },
    adicionarUsuario (e) {
      e.preventDefault()

      this.$swal.fire({
        title: 'Adicionando usuário, aguarde...'
      })
      this.$swal.showLoading()

      AdminService.cadastrarUsuario(this.form)
        .then(res => res.data)
        .then(data => {
          this.$swal.fire({
            title: 'Sucesso!',
            text: `O usuário ${data.inserted_content.nome} foi adicionado com sucesso.`,
            icon: 'success'
          })
          this.reiniciarFormulario()
          this.$emit('usuarioAdicionado')
        })
    },
    reiniciarFormulario () {
      this.form.cpf = null
      this.form.rg = null
      this.form.nome = null
      this.form.auth = null
    }
  }
}
