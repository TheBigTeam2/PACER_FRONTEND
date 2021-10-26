import ImportEquipe from '../../../components/modal-import/modal-import.vue'

export default {
  components: {
    'app-import-equipe': ImportEquipe
  },
  data: () => ({
    equipes: [],
    titulos: ['equ_nome', 'equ_disciplina']
  }),
  methods: {
    importarEquipes (equipes) {
      console.log(equipes)
    }
  }
}
