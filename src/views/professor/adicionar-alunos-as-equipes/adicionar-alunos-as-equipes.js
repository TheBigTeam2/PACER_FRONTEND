import professorService from "../../../services/professor.service"
import { Container, Draggable } from 'vue-dndrop'
import BoxUsuario from '@/components/box-usuario/box-usuario.vue'

export default {
    components: {
        'drag-container': Container,
        'drag-draggable': Draggable,
        'app-box-usuario': BoxUsuario
    },
    data: () => ({
        disciplina: null,
        equipes: [],
        alunos: []
    }),
    methods: {
        buscarEquipes () {
            professorService.buscarEquipes()
                .then(res => res.data)
                .then(equipes => {
                    this.equipes = equipes.filter(equipe => equipe.equ_disciplina == this.disciplina)
                })
        },
        buscarAlunos () {
            professorService.buscarAlunos()
                .then(res => res.data)
                .then(alunos => {
                    this.alunos = alunos
                })
        },
        onDrop (idEquipe, dropResult) {
            if (idEquipe === null) {
                this.alunos = this.applyDrag(this.alunos, dropResult)
            } else {
                let equipe = this.equipes.filter(equipe => equipe.equ_id === idEquipe)[0]
                equipe.equ_alunos = this.applyDrag(equipe.equ_alunos, dropResult)
            }
        },
        getChild (idEquipe, index) {
            return idEquipe == null ? this.alunos[index] : this.equipes.filter(equipe => equipe.equ_id == idEquipe)[0].equ_alunos[index]
        },
        applyDrag (arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;

            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }

            return result;
        },
        enviarSelecao () {
            this.$swal.fire({
                title: 'Enviando seleção'
            })
            this.$swal.showLoading()

            professorService.enviarSelecao(this.equipes.map(equipe => ({
                equipe: equipe.equ_id,
                alunos: equipe.equ_alunos.map(aluno => aluno.usu_id)
            }))).then(() => {
                this.$swal.fire({
                    title: 'Sucesso!',
                    text: 'Seleção foi enviada com sucesso.',
                    icon: 'success'
                })
            })
        }
    },
    created () {
        this.disciplina = this.$route.params.disciplina
        this.buscarEquipes()
        this.buscarAlunos()
    }
}