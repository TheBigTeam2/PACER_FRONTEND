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

      AdminService.cadastrarUsuario({
        usu_cpf: this.form.cpf,
        usu_rg: this.form.rg,
        usu_nome: this.form.nome,
        usu_auth: this.form.auth
      })
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
        .catch((err) => {
          console.log(err)
          this.$swal.fire({
            title: 'Erro!',
            text: `Ocorreu um erro durante a adição do usuário`,
            icon: 'error'
          })
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
