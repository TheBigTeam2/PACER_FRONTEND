import Vue from 'vue'
import VueRouter from 'vue-router'
import Professor from '../views/professor/professor.vue'
import Avaliacoes from '../views/professor/avaliacoes/avaliacoes.vue'

import Aluno from '../views/aluno/aluno.vue'
import AvaliacoesAluno from '../views/aluno/avaliacoes/avaliacoes.vue'
import EquipesAluno from '../views/aluno/equipes/equipes.vue'
import EquipeProjetoAvaliacoes from '../views/aluno/equipe-projeto-avaliacoes/equipe-projeto-avaliacoes.vue'

import Admin from '../views/admin/admin.vue'
import Usuario from '../views/admin/usuario/usuario.vue'
import Disciplina from '../views/admin/disciplina/disciplina.vue'
import Equipe from '../views/admin/equipe/equipe.vue'
import Equipes from '../views/professor/equipes/equipes.vue'
import Projetos from '../views/professor/projetos/projetos.vue'
import Disciplinas from '../views/professor/disciplinas/disciplinas.vue'
import Login from '../views/login/login.vue'
import adicionarAlunosAsEquipes from '../views/professor/adicionar-alunos-as-equipes/adicionar-alunos-as-equipes.vue'
import avaliacoesProjeto from '../views/professor/avaliacoes-projeto/avaliacoes-projeto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/professor',
    name: 'Professor',
    component: Professor,
    children: [
      {
        path: '/',
        redirect: './avaliacoes'
      },
      {
        path: '/professor/avaliacoes',
        name: 'Professor Avaliacoes',
        component: Avaliacoes
      },
      {
        path: '/professor/avaliacoes/:projeto',
        name: 'Professor Avaliacoes Projeto',
        component: avaliacoesProjeto
      },
      {
        path: '/professor/equipes',
        name: 'Professor Equipes',
        component: Equipes
      },
      {
        path: '/professor/equipe/:disciplina',
        name: 'Professor Equipes',
        component: adicionarAlunosAsEquipes
      },
      {
        path: '/professor/projetos',
        name: 'Professor Projetos',
        component: Projetos
      },
      {
        path: '/professor/disciplinas',
        name: 'Professor Disciplinas',
        component: Disciplinas
      }
    ]
  },
  {
    path: '/aluno',
    name: 'Aluno',
    component: Aluno,
    children: [
      {
        path: '/',
        redirect: './avaliacoes'
      },
      {
        path: '/aluno/avaliacoes',
        name: 'Aluno Avaliacoes',
        component: AvaliacoesAluno
      },
      {
        path: '/aluno/equipes',
        name: 'Aluno Equipes',
        component: EquipesAluno
      },
      {
        path: '/aluno/avaliacoes/:equipe/:projeto',
        name: 'Aluno Equipe Projeto Avaliacoes',
        component: EquipeProjetoAvaliacoes
      }
    ]
  },
  {
    path: '/admin',
    name: 'Administrador',
    component: Admin,
    children: [
      {
        path: '/admin/usuario',
        name: 'Administrador Usuários',
        component: Usuario
      },
      {
        path: '/admin/equipe',
        name: 'Administrador Equipes',
        component: Equipe
      },
      {
        path: '/admin/disciplina',
        name: 'Administrador Disciplinas',
        component: Disciplina
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    children: []
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
