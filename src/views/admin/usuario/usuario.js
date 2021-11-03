import AdminService from '../../../services/admin.service'
import AdicionarUsuario from './adicionar-usuario/adicionar-usuario.vue'
import BoxUsuario from '../../../components/box-usuario/box-usuario.vue'
import ImportUsuario from '../../../components/modal-import/modal-import.vue'

export default {
  components: {
    'app-adicionar-usuario': AdicionarUsuario,
    'app-box-usuario': BoxUsuario,
    'app-import-usuario': ImportUsuario
  },
  data: () => ({
    alunos: [],
    professores: [],
    titulos: ['usu_id', 'usu_rg', 'usu_cpf', 'usu_nome', 'usu_auth']
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
      console.log(usuarios)
    },
    removerUsuario (usuario) {
      this.$swal.fire({
        title: 'Atenção!',
        text: 'Deseja mesmo remover este usuário?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Manter',
        denyButtonText: 'Remover'
      }).then(res => {
        if (res.isDenied) {
          this.$swal.fire({
            title: 'Removendo usuário'
          })
          this.$swal.showLoading()
          AdminService.removerUsuario(usuario.usu_id)
            .then(res => console.log(res))
        }
      })
    }
  },
  created () {
    this.buscarUsuarios()
  }
}
