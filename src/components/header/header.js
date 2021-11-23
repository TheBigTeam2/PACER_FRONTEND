import { mapState, mapActions } from 'vuex'

export default {
  props: ['actions', 'title', 'mainRoute'],
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  methods: {
    ...mapActions(['atualizarUsuario']),
    esconderSidebar: () => {
      const body = document.querySelector('body')
      body.classList.remove('sidebar-open')
      body.classList.add('sidebar-closed', 'sidebar-collapse')
    },
    logout () {
      this.$swal.fire({
        title: 'Atenção!',
        text: 'Deseja realmente sair?',
        denyButtonText: 'Não',
        showDenyButton: true,
        confirmButtonText: 'Sim'
      }).then(e => {
        if (e.isConfirmed) {
          this.atualizarUsuario({ usu_nome: 'a' })
          this.$router.push('/')
        }
      })
    }
  }
}
