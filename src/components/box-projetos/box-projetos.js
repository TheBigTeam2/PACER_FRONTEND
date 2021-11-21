export default {
    props: ['projeto', 'mostrarDisciplina'],
    methods: {
        clickBox () {
            this.$emit('clickBox', this.$props.projeto)
        }
    }
}