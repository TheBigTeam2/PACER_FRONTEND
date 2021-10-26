import ImportDisciplina from '../../../components/modal-import/modal-import.vue'

export default {
  components: {
    'app-import-disciplina': ImportDisciplina
  },
  data: () => ({
    disciplinas: [],
    titulos: ['dis_id', 'dis_nome', 'dis_curso', 'dis_periodo', 'dis_professor']
  }),
  methods: {
    importarDisciplinas (disciplinas) {
      console.log(disciplinas)
    }
  }
}
