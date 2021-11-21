import { mapState } from "vuex";
import alunoService from "../../../services/aluno.service";
import BoxEquipeDisciplina from '@/components/box-equipe-disciplina/box-equipe-disciplina.vue'
import visualizarEquipe from './visualizar-equipe/visualizar-equipe.vue'

export default {
    computed: {
        ...mapState({
            usuario: state => state.usuario
        })
    },
    components: {
        'app-box-equipe-disciplina': BoxEquipeDisciplina,
        'app-visualizar-equipe': visualizarEquipe
    },
    data: () => ({
        equipes: [],
        equipe: null
    }),
    methods: {
        buscarEquipes() {
            return new Promise(resolve => {
                alunoService
                    .buscarEquipes(this.usuario.usu_id)
                    .then(res => res.data)
                    .then(equipes => resolve(equipes))
            })
        },
        buscarDisciplinas() {
            return new Promise(resolve => {
                alunoService
                    .buscarDisciplinas()
                    .then(res => res.data)
                    .then(disciplinas => resolve(disciplinas))
            })
        },
        atualizarEquipes() {
            Promise.all([
                this.buscarEquipes(), 
                this.buscarDisciplinas()
            ]).then(([equipes, disciplinas]) => {
                this.equipes = equipes.map(equipe => ({
                    ...equipe,
                    equ_disciplina: disciplinas.filter(disciplina => disciplina.dis_id === equipe.equ_disciplina)[0]
                }))
            })
        },
        visualizarEquipe(equipe) {
            this.equipe = equipe
        },
        removerSelecao() {
            this.equipe = null
        }
    },
    created() {
        this.atualizarEquipes()
    }
}