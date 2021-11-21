export default {
    props: ['equipe'],
    methods: {
        clickBox () {
            this.$emit('clickBox', this.$props.equipe)
        }
    }
}