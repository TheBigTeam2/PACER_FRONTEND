import professorService from "../../../../services/professor.service"
import radar from "./radar/radar.vue"

export default {
    props: ['aluno', 'projeto'],
    components: {
        'app-radar': radar
    },
    data: () => ({
        relatorios: null
    }),
    methods: {
        buscarRelatorio () {
            professorService
                .buscarRelatorio(this.projeto, this.aluno.usu_id)
                .then(res => res.data)
                .then(relatorios => {
                    this.relatorios = relatorios.map(relatorio => ({
                        data: {
                            labels: relatorio.radar_1.map(e => e.criterio),
                            datasets: [
                                {
                                    label: 'Autoavaliação',
                                    data: relatorio.radar_1.map(e => e.nota),
                                    borderColor: '#2196f3FF',
                                    backgroundColor: '#2196f366',
                                    fill: true
                                },
                                {
                                    label: 'Avaliação dos outros alunos e professores',
                                    data: relatorio.radar_2.map(e => e.nota),
                                    borderColor: '#f44336FF',
                                    backgroundColor: '#f4433666',
                                    fill: true
                                },
                                {
                                    label: 'Other',
                                    data: relatorio.radar_2.map(() => 0),
                                    borderColor: 'transparent',
                                    backgroundColor: 'transparent',
                                    fill: true
                                },
                                {
                                    label: 'Other',
                                    data: relatorio.radar_2.map(() => 3),
                                    borderColor: 'transparent',
                                    backgroundColor: 'transparent',
                                    fill: true
                                }
                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: relatorio.nome
                                },
                                legend: {
                                    labels: {
                                        filter: (item) => {
                                            return !item.text.includes('Other')
                                        }
                                    }
                                },
                                tooltip: {
                                    filter: (item) => {
                                        return !item.dataset.label.includes('Other')
                                    }
                                }
                            },
                            interaction: {
                                mode: 'index',
                                intersect: false
                            },
                            scale: {
                                ticks: {
                                    beginAtZero: true,
                                    max: 3
                                }
                            }
                        }
                    }))
                })
        }
    },
    created() {
        this.buscarRelatorio()
    }
}