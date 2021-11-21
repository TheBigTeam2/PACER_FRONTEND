import { mapState } from 'vuex'
import alunoService from '../../../services/aluno.service'
import BoxProjeto from '@/components/box-projetos/box-projetos.vue'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  components: {
    'app-box-projeto': BoxProjeto
  },
  data: () => ({
    equipes: []
  }),
  methods: {
    buscarProjetosDaEquipe(idEquipe) {
      return new Promise(resolve => {
        alunoService
          .buscarProjetosDaEquipe(idEquipe)
          .then(res => res.data)
          .then(projetos => resolve(projetos))
      })
    },
    buscarEquipes() {
      return new Promise(resolve => {
        alunoService
          .buscarEquipes(this.usuario.usu_id)
          .then(res => res.data)
          .then(equipes => resolve(equipes))
      })
    },
    buscarDisciplinas() {
      return new Promise(resolve => {
        alunoService
          .buscarDisciplinas()
          .then(res => res.data)
          .then(disciplinas => resolve(disciplinas))
      })
    },
    organizarEquipes() {
      Promise.all([
        this.buscarEquipes(),
        this.buscarDisciplinas()
      ]).then(([equipes, disciplinas]) => {
          this.equipes = []
          equipes.forEach(equipe => {
            this.buscarProjetosDaEquipe(equipe.equ_id)
              .then(projetos => {
                this.equipes.push({
                  ...equipe,
                  equ_disciplina: disciplinas.filter(disciplina => disciplina.dis_id === equipe.equ_disciplina)[0],
                  projetos: projetos
                })
              })
          })
        })
    },
    visualizarProjeto(projeto, equipe) {
      this.$router.push(`/aluno/avaliacoes/${equipe.equ_id}/${projeto.pro_id}`)
    }
  },
  created () {
    this.organizarEquipes()
  }
}
