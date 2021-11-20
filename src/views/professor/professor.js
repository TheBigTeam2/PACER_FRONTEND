import AppHeader from '../../components/header/header.vue'

export default {
  components: {
    'app-header': AppHeader
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
  })
}
