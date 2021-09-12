export default {
    data: () => ({
        form: {
            sprint: null,
            projeto: null,
            inicio: null,
            termino: null
        },
        projetos: [
            { text: '-- Selecione a qual projeto este perído será destinado --', value: null, disabled: true },
            { text: 'Projeto 1', value: '123' },
            { text: 'Projeto 2', value: '456' }
        ],
        mostrarAlerta: false,
        mensagemAlerta: ''
    }),
    methods: {
        abrirPeriodoAvaliacao(e) {
            e.preventDefault()

            let campoVazio = false
            Object.keys(this.form).forEach(key => {
                if (!this.form[key])
                    campoVazio = true
            })

            if (campoVazio) {
                this.mostrarAlerta = true
                this.mensagemAlerta = 'Todos os campos devem ser preenchidos!'
            } else {
                this.mostrarAlerta = false
            }
        }
    }
}