import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  strictMode: true,
  storage: localStorage,
  reducer: (state) => ({ usuario: state.usuario })
})

export default new Vuex.Store({
  strict: true, // This makes the Vuex store strict
  state: {
    usuario: {
      usu_id: 1,
      usu_nome: 'Walmir'
    }
  },
  mutations: {
    atualizarUsuario (state, usuario) {
      state.usuario = usuario
    },
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"

  },
  actions: {
    atualizarUsuario ({ commit }, usuario) {
      commit('atualizarUsuario', usuario)
    }
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
