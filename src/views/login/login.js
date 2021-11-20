import LoginService from '../../services/login.service'
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    user: '',
    password: ''
  }),
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  created () {
    if (this.usuario != null && this.usuario.token != null) {
      let route = this.usuario.usu_auth.toLowerCase()
      if (route === 'administrador') { route = 'admin' }
      sessionStorage.setItem('token', this.usuario.token)
      this.$router.push('/' + route)
    } else {
      sessionStorage.setItem('token', null)
    }
  },
  methods: {
    ...mapActions(['atualizarUsuario']),
    login (e) {
      e.preventDefault()
      if (this.user && this.password) {
        this.$swal.showLoading()
        LoginService.login(this.user, this.password)
          .then(response => {
            const data = response?.data
            if (data && data?.authenticated) {
              this.user = null
              this.password = null
              if (data.authentication.token) { sessionStorage.setItem('token', data.authentication.token) }
              if (data.authentication) {
                this.atualizarUsuario(data.authentication)
                let route = data.authentication.usu_auth.toLowerCase()
                if (route === 'administrador') { route = 'admin' }
                this.$router.push('/' + route)
              }
              this.$swal.fire({
                title: 'Sucesso!',
                text: 'Autenticado com sucesso!',
                icon: 'success'
              })
            } else {
              this.$swal.fire({
                title: 'Erro!',
                text: 'Dados incorretos!',
                icon: 'error'
              })
            }
          }).catch(error => {
            console.error(error)
            this.$swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro ao autenticar!',
              icon: 'error'
            })
          })
      }
    }
  }
}
