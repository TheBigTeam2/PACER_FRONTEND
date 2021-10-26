import XLSX from 'xlsx'

export default {
  data: () => ({
    arquivo: null,
    usuarios: [],
    pagina: 1,
    qtdRegistros: 5
  }),
  computed: {
    rows () {
      return this.usuarios.length
    }
  },
  methods: {
    lerArquivo (event) {
      event.preventDefault()

      if (this.arquivo) {
        this.usuarios = []
        const reader = new FileReader()

        reader.onload = (e) => {
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

          if (data != null) {
            const chaves = data[0]

            for (let i = 1; i < data.length; i++) {
              const linha = data[i]
              const usuario = {}
              for (let j = 0; j < linha.length; j++) {
                const valor = linha[j]
                usuario[chaves[j]] = valor
              }
              this.usuarios.push(usuario)
            }
          }
        }

        reader.readAsBinaryString(this.arquivo)
      }
    },
    importarUsuarios () {
      if (this.usuarios != null && this.usuarios.length > 0) {
        alert('Import')
      }
    },
    limparArquivo () {
      this.usuarios = []
      this.arquivo = null
    }
  }
}
