export default {
  data: () => ({
    nome: '',
    cpf: '',
    rg: ''
  }),
  created () {
    this.limparCampos()
  },
  methods: {
    limparCampos () {
      this.nome = ''
      this.cpf = ''
      this.rg = ''
    }
  }
}
