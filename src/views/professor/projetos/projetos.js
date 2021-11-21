import professorService from '@/services/professor.service'
import { mapState } from 'vuex'
import adicionarProjeto from './adicionar-projeto/adicionar-projeto.vue'
import atualizarProjeto from './atualizar-projeto/atualizar-projeto.vue'

export default {
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  components: {
    'app-adicionar-projeto': adicionarProjeto,
    'app-atualizar-projeto': atualizarProjeto
  },
  data: () => ({
    projetos: [],
    periodos: [
      'Manhã',
      'Noite'
    ],
    projeto: null
  }),
  methods: {
    buscarProjetos () {
      professorService
        .buscarProjetos()
        .then(res => res.data)
        .then(projetos => { 
          this.projetos = projetos.filter(projeto => projeto.pro_disciplinas.filter(disciplina => disciplina.dis_professor === this.usuario.usu_id).length >= 1)
        })
    },
    removerProjeto (projeto) {
      this.$swal.fire({
        title: 'Atenção!',
        text: `Tem certeza que deseja remover o projeto ${projeto.pro_tema}?`,
        denyButtonText: 'Não',
        showDenyButton: true,
        confirmButtonText: 'Sim'
      }).then(e => {
        if (e.isConfirmed) {
          this.$swal.fire({
            title: 'Removendo projeto, aguarde'
          })
          this.$swal.showLoading()
          professorService
            .removerProjeto(projeto.pro_id)
            .then(() => {
              this.$swal.fire({
                title: 'Sucesso!',
                text: `O projeto ${projeto.pro_tema} foi removido com sucesso.`,
                icon: 'success'
              })
              this.buscarProjetos()
            })
            .catch(err => {
              console.log(err)
              this.$swal.fire({
                title: 'Erro!',
                text: 'Ocorreu algum erro durante a remoção do projeto.',
                icon: 'error'
              })
            })
        }
      })
    },
    atualizarProjeto (projeto) {
      this.projeto = projeto
    },
    removerSelecao () {
      this.projeto = null
    }
  },
  created () {
    this.buscarProjetos()
  }
}
