import Vue from 'vue'
import VueRouter from 'vue-router'
import Professor from '../views/professor/professor.vue'
import Avaliacoes from '../views/professor/avaliacoes/avaliacoes.vue'
import Aluno from '../views/aluno/aluno.vue'
import AvaliacoesAluno from '../views/aluno/avaliacoes/avaliacoes.vue'
import Admin from '../views/admin/admin.vue'
import Usuario from '../views/admin/usuario/usuario.vue'
import Equipes from '../views/professor/equipes/equipes.vue'

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
        path: '/professor/equipes',
        name: 'Professor Equipes',
        component: Equipes
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
      }
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
