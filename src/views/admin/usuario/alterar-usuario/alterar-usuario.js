import AdminService from '../../../../services/admin.service'

export default {
  props: ['usuario'],
  data: () => ({
    form: {
      id: null,
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
    alterarUsuario (e) {
      e.preventDefault()

      this.$swal.fire({
        title: 'Alterando usuário, aguarde...'
      })
      this.$swal.showLoading()

      AdminService.alterarUsuario(this.form.id, {
        usu_cpf: this.form.cpf,
        usu_rg: this.form.rg,
        usu_nome: this.form.nome,
        usu_auth: this.form.auth
      }).then(() => {
          this.$swal.fire({
            title: 'Sucesso!',
            text: `O usuário ${this.form.nome} foi alterado com sucesso.`,
            icon: 'success'
          })
          this.$emit('usuarioAlterado')
        })
    },
    hidden () {
      this.$emit('removerSelecao')
    }
  },
  created () {
    this.form = {
      id: this.$props.usuario.usu_id,
      cpf: this.$props.usuario.usu_cpf,
      rg: this.$props.usuario.usu_rg,
      nome: this.$props.usuario.usu_nome,
      auth: this.$props.usuario.usu_auth
    }
  }
}
