import AppHeader from '../../components/header/header.vue'

export default {
  components: {
    'app-header': AppHeader
  },
  data: () => ({
    actions: [{
      icon: 'nav-icon fas fa-clipboard',
      text: 'Avaliações',
      route: '/aluno/avaliacoes'
    }]
  })
}
