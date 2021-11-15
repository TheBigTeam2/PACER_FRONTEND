import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {
      usu_id: 1,
      usu_nome: 'Walmir'
    }
  },
  mutations: {
    atualizarUsuario (state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    atualizarUsuario ({ commit }, usuario) {
      commit('atualizarUsuario', usuario)
    }
  },
  modules: {
  }
})
