import { mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  methods: {
    esconderSidebar: () => {
      const body = document.querySelector('body')
      body.classList.remove('sidebar-open')
      body.classList.add('sidebar-closed', 'sidebar-collapse')
    }
  }
}
