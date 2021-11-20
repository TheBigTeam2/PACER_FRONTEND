import AppHeader from '../../components/header/header.vue'

export default {
  components: {
    'app-header': AppHeader
  },
  data: () => ({
    actions: [{
      icon: 'nav-icon fas fa-user',
      text: 'Usuário',
      route: '/admin/usuario'
    }
    ]
  })
}
