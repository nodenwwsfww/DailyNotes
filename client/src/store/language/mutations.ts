import { MutationTree } from 'vuex';
import {LanguageState} from './types';

import { Locales } from "@/i18n/locales";

export const mutations: MutationTree<LanguageState> = {
  SET_LANGUAGE(state, payload: Locales) {
    state.language = payload;
    localStorage.setItem("lang", payload);
  },
};
