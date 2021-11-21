export default {
    props: ['projeto'],
    methods: {
        clickBox () {
            this.$emit('clickBox', this.$props.projeto)
        }
    }
}