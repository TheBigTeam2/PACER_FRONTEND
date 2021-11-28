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
import avaliacoesProjetoEquipe from '../views/professor/avaliacoes-projeto-equipe/avaliacoes-projeto-equipe.vue'

import store from '../store/index'

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
        component: Avaliacoes,
        meta: {
          auth: 'Professor'
        }
      },
      {
        path: '/professor/avaliacoes/:projeto',
        name: 'Professor Avaliacoes Projeto',
        component: avaliacoesProjeto,
        meta: {
          auth: 'Professor'
        }
      },
      {
        path: '/professor/avaliacoes/:projeto/:equipe',
        name: 'Professor Avaliacoes Projeto Equipe',
        component: avaliacoesProjetoEquipe,
        meta: {
          auth: 'Professor'
        }
      },
      {
        path: '/professor/equipes',
        name: 'Professor Equipes',
        component: Equipes,
        meta: {
          auth: 'Professor'
        }
      },
      {
        path: '/professor/equipe/:disciplina',
        name: 'Professor Equipes',
        component: adicionarAlunosAsEquipes,
        meta: {
          auth: 'Professor'
        }
      },
      {
        path: '/professor/projetos',
        name: 'Professor Projetos',
        component: Projetos,
        meta: {
          auth: 'Professor'
        }
      },
      {
        path: '/professor/disciplinas',
        name: 'Professor Disciplinas',
        component: Disciplinas,
        meta: {
          auth: 'Professor'
        }
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
        component: AvaliacoesAluno,
        meta: {
          auth: 'Aluno'
        }
      },
      {
        path: '/aluno/equipes',
        name: 'Aluno Equipes',
        component: EquipesAluno,
        meta: {
          auth: 'Aluno'
        }
      },
      {
        path: '/aluno/avaliacoes/:equipe/:projeto',
        name: 'Aluno Equipe Projeto Avaliacoes',
        component: EquipeProjetoAvaliacoes,
        meta: {
          auth: 'Aluno'
        }
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
        component: Usuario,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/avaliacoes',
        name: 'Administrador Avaliacoes',
        component: Avaliacoes,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/avaliacoes/:projeto',
        name: 'Administrador Avaliacoes Projeto',
        component: avaliacoesProjeto,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/avaliacoes/:projeto/:equipe',
        name: 'Administrador Avaliacoes Projeto Equipe',
        component: avaliacoesProjetoEquipe,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/equipes',
        name: 'Administrador Equipes',
        component: Equipes,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/equipe/:disciplina',
        name: 'Administrador Equipes',
        component: adicionarAlunosAsEquipes,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/projetos',
        name: 'Administrador Projetos',
        component: Projetos,
        meta: {
          auth: 'Administrador'
        }
      },
      {
        path: '/admin/disciplinas',
        name: 'Administrador Disciplinas',
        component: Disciplinas,
        meta: {
          auth: 'Administrador'
        }
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

router.beforeEach(async (to, _from, next) => {
  if (to.meta.auth == null || to.meta.auth === store.state.usuario?.usu_auth || store.state.usuario?.usu_auth === 'Administrador') {
    next()
  } else {
    next({ path: '/' })
  }
})

export default router
