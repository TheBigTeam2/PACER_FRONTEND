import { Chart, registerables } from 'chart.js'

export default {
    props: ['data', 'options', 'i'],
    data: () => ({
        chart: null
    }),
    watch: {
        data () {
            this.$data.chart.data = this.$props.dados
            this.$data.chart.update()
        }
    },
    created () {
        Chart.register(...registerables)
        setTimeout(() => {
            let ctx = document.querySelector('#myChart' + this.i).getContext('2d')
            if (ctx) {
                this.$data.chart = new Chart(ctx, {
                    type: 'radar',
                    data: this.$props.data,
                    options: this.$props.options
                })
            }
        }, 1)
    }
}