import { mapState } from "vuex"
import alunoService from "../../../services/aluno.service"
import boxSprint from "../../../components/box-sprint/box-sprint.vue"
import abrirSprint from "./abrir-sprint/abrir-sprint.vue"

export default {
    computed: {
        ...mapState({
            usuario: state => state.usuario
        })
    },
    components: {
        'app-box-sprint': boxSprint,
        'app-abrir-sprint': abrirSprint
    },
    data: () => ({
        equipe: null,
        projeto: null,
        sprints: {},
        sprint: null,
        iSprint: null
    }),
    methods: {
        buscarEquipe(idEquipe) {
            return new Promise(resolve => {
                alunoService
                    .buscarEquipes(this.usuario.usu_id)
                    .then(res => res.data)
                    .then(equipes => resolve(equipes.filter(equipe => equipe.equ_id == idEquipe)[0]))
            })
        },
        buscarProjeto(idProjeto) {
            return new Promise(resolve => {
                alunoService
                    .buscarProjetos()
                    .then(res => res.data)
                    .then(projetos => resolve(projetos.filter(projeto => projeto.pro_id == idProjeto)[0]))
            })
        },
        buscarSprints(idUsuario) {
            return new Promise(resolve => {
                alunoService
                    .buscarAvaliacoes(idUsuario)
                    .then(res => res.data)
                    .then(avaliacoes => resolve(this.groupBy(avaliacoes, 'ava_sprint')))
            })
        },
        buscarDados({ equipe, projeto }) {
            return new Promise(resolve => {
                Promise.all([
                    this.buscarEquipe(equipe),
                    this.buscarProjeto(projeto),
                    this.buscarSprints(this.usuario.usu_id)
                ]).then(([equipe, projeto, sprints]) => {
                    this.equipe = equipe
                    this.projeto = projeto
                    this.sprints = sprints
                    resolve(true)
                })
            })
        },
        groupBy(xs, key) {
            return xs.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        },
        abrirSprint(i) {
            this.sprint = this.sprints[i]
            this.iSprint = i
        },
        removerSelecao() {
            this.sprint = null
        },
        atualizarDados() {
            this.buscarDados(this.$router.currentRoute.params)
                .then(() => this.abrirSprint(this.iSprint))
        }
    },
    created() {
        this.buscarDados(this.$router.currentRoute.params)
    }
}