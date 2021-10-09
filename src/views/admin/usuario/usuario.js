import AdminService from '../../../services/admin.service';

export default {
  data: () => ({
    nome: '',
    cpf: '',
    rg: '',
    auth: 'professor',
    options: [
      { text: 'Professor', value: 'professor' },
      { text: 'Aluno', value: 'aluno' }
    ]
  }),
  created () {
    this.limparCampos()
  },
  methods: {
    cadastrarUsuario (e) {
      e.preventDefault()
      if (!this.nome || !this.cpf || !this.rg || this.auth) return
      AdminService.cadastrarUsuario({
        nome: this.nome,
        cpf: this.cpf,
        rg: this.rg,
        auth: this.auth
      }).then(response => {
        if (response.status === 200 || response.status === 201) {
          alert('Cadastrado com sucesso!')
          this.limparCampos()
        } else {
          alert('Ocorreu um erro ao cadastrar o usuário!')
        }
      }).catch(error => {
        alert('Ocorreu um erro ao cadastrar o usuário!')
        console.error(error)
      })
    },
    limparCampos () {
      this.nome = ''
      this.cpf = ''
      this.rg = ''
    }
  }
}
