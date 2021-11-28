import { mapState } from 'vuex'
import AppHeader from '../../components/header/header.vue'

export default {
  components: {
    'app-header': AppHeader
  },
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data: () => ({
    actions: [{
      icon: 'nav-icon fas fa-cubes',
      text: 'Disciplinas',
      route: '/professor/disciplinas'
    }, {
      icon: 'nav-icon fas fa-project-diagram',
      text: 'Projetos',
      route: '/professor/projetos'
    }, {
      icon: 'nav-icon fas fa-clipboard',
      text: 'Avaliações',
      route: '/professor/avaliacoes'
    }, {
      icon: 'nav-icon fas fa-users',
      text: 'Equipes',
      route: '/professor/equipes'
    }
    ]
  }),
  created () {
    if (this.usuario.usu_auth === 'Administrador') {
      this.actions.unshift({
        icon: 'nav-icon fas fa-user',
        text: 'Usuário',
        route: '/admin/usuario'
      })
    }
  }
}
