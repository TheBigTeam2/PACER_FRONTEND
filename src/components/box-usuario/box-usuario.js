export default {
    props: ['usuario'],
    methods: {
        clickBox () {
            this.$emit('clickBox', this.$props.usuario)
        }
    }
}