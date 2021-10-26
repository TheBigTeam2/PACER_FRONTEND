
import XLSX from 'xlsx'

export default {
  props: ['titulo'],
  data: () => ({
    arquivo: null,
    linhas: [],
    pagina: 1,
    qtdRegistros: 5
  }),
  computed: {
    rows () {
      return this.linhas.length
    }
  },
  methods: {
    lerArquivo (event) {
      event.preventDefault()

      if (this.arquivo) {
        this.linhas = []
        const reader = new FileReader()

        this.$swal.fire({
          title: 'Lendo o arquivo, aguarde...'
        })
        this.$swal.showLoading()

        reader.onload = (e) => {
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          const linhas = []
          if (data != null && data.length > 0) {
            const titulos = data[0]
            for (let i = 1; i < data.length; i++) {
              const linha = data[i]
              const registro = {}
              for (let j = 0; j < linha.length; j++) {
                const valor = linha[j]
                registro[titulos[j]] = valor
              }
              linhas.push(registro)
            }
            setTimeout(() => {
              this.linhas = linhas
              this.$swal.fire({
                title: 'Sucesso!',
                text: 'Arquivo lido com sucesso.',
                icon: 'success'
              })
            }, 1000)
          }
        }

        reader.readAsBinaryString(this.arquivo)
      }
    },
    importar (event) {
      event.preventDefault()
      if (this.linhas != null && this.linhas.length > 0) {
        this.$emit('onImport', this.linhas)
        this.$bvModal.hide('modal-import-modal')
      }
    },
    limparArquivo () {
      this.linhas = []
      this.arquivo = null
    }
  }
}
