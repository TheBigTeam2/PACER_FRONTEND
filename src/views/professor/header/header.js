export default {
    methods: {
        esconderSidebar: () => {
            let body = document.querySelector('body')
            body.classList.remove('sidebar-open')
            body.classList.add('sidebar-closed', 'sidebar-collapse')
        }
    }
}