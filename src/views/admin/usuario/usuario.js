import AdminService from '../../../services/admin.service'
import AdicionarUsuario from './adicionar-usuario/adicionar-usuario.vue'
import BoxUsuario from '../../../components/box-usuario/box-usuario.vue'
import ImportUsuario from '../../../components/modal-import/modal-import.vue'
import adminService from '../../../services/admin.service'
import alterarUsuario from './alterar-usuario/alterar-usuario.vue'

export default {
  components: {
    'app-adicionar-usuario': AdicionarUsuario,
    'app-box-usuario': BoxUsuario,
    'app-import-usuario': ImportUsuario,
    'app-alterar-usuario': alterarUsuario
  },
  data: () => ({
    alunos: [],
    professores: [],
    titulos: ['usu_id', 'usu_rg', 'usu_cpf', 'usu_nome', 'usu_auth'],
    usuario: null
  }),
  methods: {
    buscarUsuarios () {
      AdminService.buscarAlunos()
        .then(res => res.data)
        .then(data => {
          this.alunos = data
        })
      AdminService.buscarProfessores()
        .then(res => res.data)
        .then(data => {
          this.professores = data
        })
    },
    importarUsuarios (usuarios) {
      if (usuarios !== null && usuarios?.length > 0) {
        usuarios = usuarios.map(usuario => {
          usuario.usu_rg = usuario.usu_rg.toString()
          usuario.usu_cpf = usuario.usu_cpf.toString()
          return usuario
        })
        this.$swal.fire({
          title: 'Importando usuários, aguarde...'
        })
        this.$swal.showLoading()
        AdminService.importarUsuarios(usuarios).then(response => {
          if (response.status === 200 || response.status === 201) {
            this.$swal.fire({
              title: 'Sucesso!',
              text: 'Usuários importados com sucesso!',
              icon: 'success'
            })
            this.buscarUsuarios()
          } else {
            this.$swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro ao importar os usuários',
              icon: 'error'
            })
          }
        }).catch(error => {
          console.error(error)
          this.$swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao importar os usuários',
            icon: 'error'
          })
        })
      } else {
        this.$swal.fire({
          title: 'Erro!',
          text: 'Nenhum usuário importado',
          icon: 'error'
        })
      }
    },
    opcoesUsuario (usuario) {
      this.$swal.fire({
        title: 'Atenção!',
        text: `Deseja alterar ou remover o usuário ${usuario.usu_nome}?`,
        confirmButtonText: 'Alterar',
        denyButtonText: 'Remover',
        showDenyButton: true
      }).then(res => {
          if (res.isDenied) {
              this.$swal.fire({
                  title: 'Removendo equipe, aguarde...'
              })
              this.$swal.showLoading()
              adminService.removerUsuario(usuario.usu_id)
                  .then(() => {
                    this.$swal.fire({
                      title: 'Sucesso!',
                      text: 'Usuário removido com sucesso.',
                      icon: 'success'
                    })
                    this.buscarUsuarios()
                  })
          }
          else if (res.isConfirmed) {
              this.usuario = usuario
          }
      })
    },
    removerSelecao() {
      this.usuario = null
    }
  },
  created () {
    this.buscarUsuarios()
  }
}
