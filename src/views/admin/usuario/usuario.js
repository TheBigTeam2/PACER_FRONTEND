import AdminService from '../../../services/admin.service'
import AdicionarUsuario from './adicionar-usuario/adicionar-usuario.vue'
import BoxUsuario from '../../../components/box-usuario/box-usuario.vue'

export default {
    components: {
        'app-adicionar-usuario': AdicionarUsuario,
        'app-box-usuario': BoxUsuario
    },
    data: () => ({
        alunos: [],
        professores: []
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
        }
    },
    created () {
        this.buscarUsuarios()
    }
}
