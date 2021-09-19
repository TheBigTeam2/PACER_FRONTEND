import axios from 'axios'

axios.interceptors.request.use(config => {
    config.baseURL = 'http://localhost:5000/'
    return config
})

const idProfessor = 1

export default {
    professor: {
        buscarProjetos () {
            return axios.get(`/professor/${idProfessor}/avaliacao`)
        },
        abrirAvaliacao (dados) {
            return axios.post(`/professor/${idProfessor}/avaliacao`, dados)
        }
    },
    aluno: {
        enviarAvaliacao(dados, id) {
            return axios.post(`/aluno/${id}/nota`, dados)
        }
    }
}