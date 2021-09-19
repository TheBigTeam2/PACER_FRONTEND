import axios from 'axios'
import api from '../../../../plugins/api'

export default {
    props: {
        projetos: {
            require: true
        }
    },
    data: () => ({
        form: {
            sprint: null,
            projeto: null,
            inicio: null,
            termino: null
        },
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
                this.$swal.fire({
                    title: 'Abrindo novo período de avaliação, aguarde...'
                })
                this.$swal.showLoading()
                api.professor.abrirAvaliacao(this.form)
                    .then(res => {
                        this.$swal.fire({
                            title: 'Sucesso!',
                            text: 'Novas avaliações foram enviadas às equipes. Você poderá acompanhar seu progresso na página de avaliações.',
                            icon: 'success'
                        })
                        this.$emit('avaliacoesEnviadas')
                        this.reiniciarFormulario()
                    })
            }
        },

        reiniciarFormulario() {
            this.form = {
                sprint: null,
                projeto: null,
                inicio: null,
                termino: null
            }
        }
    }
}