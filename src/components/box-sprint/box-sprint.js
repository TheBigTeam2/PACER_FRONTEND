export default {
    props: ['sprint'],
    methods: {
        clickBox () {
            this.$emit('click', this.$props.sprint)
        }
    }
}