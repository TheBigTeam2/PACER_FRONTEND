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
    }, {
      icon: 'nav-icon fas fa-cubes',
      text: 'Disciplinas',
      route: '/admin/disciplinas'
    }, {
      icon: 'nav-icon fas fa-project-diagram',
      text: 'Projetos',
      route: '/admin/projetos'
    }, {
      icon: 'nav-icon fas fa-clipboard',
      text: 'Avaliações',
      route: '/admin/avaliacoes'
    }, {
      icon: 'nav-icon fas fa-users',
      text: 'Equipes',
      route: '/admin/equipes'
    }
    ]
  })
}
