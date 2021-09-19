import AbrirNovoPeriodoAvaliacao from "./abrir-novo-periodo-avaliacao/abrir-novo-periodo-avaliacao.vue"
import api from '../../../plugins/api'

export default {
    components: {
        'app-abrir-novo-periodo-avaliacao': AbrirNovoPeriodoAvaliacao
    },
    data: () => ({
        projetos: [
            {
                text: '-- Selecione a qual projeto este perído será destinado --', value: null, disabled: true
            }
        ],
        projetosAvaliacao: []
    }),
    created () {
        this.buscarProjetos()
    },
    methods: {
        buscarProjetos () {
            this.projetos = [
                {
                    text: '-- Selecione a qual projeto este perído será destinado --', value: null, disabled: true
                }
            ]
            api.professor.buscarProjetos()
                .then(res => res.data)
                .then(data => {
                    console.log(data)
                    data.forEach(projeto => {
                        // Adicionando o projeto na listagem para abertura de avaliações
                        this.projetos.push({
                            text: `Projeto ${projeto.id}`,
                            value: projeto.id
                        })

                        // Organizando os projetos para apresentação das avaliações existentes.
                        this.organizarAvaliacoes(projeto)
                    })
                })
        },
        organizarAvaliacoes (projeto) {
            const that = this
            this.projetosAvaliacao.push((function () {
                projeto.avaliacoes = that.groupBy(projeto.avaliacoes, 'equipe')
                
                return projeto
            }()))
        },
        groupBy(arr, key) {
            return arr.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        }
    }
}