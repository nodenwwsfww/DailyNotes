import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'

Vue.use(Vuex)
const store = new Vuex.Store<RootState>({
    state: {
        version: '1.0.0'
    },
    modules: {
    }
})

export default store