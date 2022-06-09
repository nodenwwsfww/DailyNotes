import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'
import language from "@/store/language";

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
    state: {
        version: '1.0.0'
    },
    modules: {
        language
    },
    mutations: {

    },
    actions: {

    },
})

export default store