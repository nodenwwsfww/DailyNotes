import { MutationTree } from 'vuex';
import {LanguageState} from './types';

import { Locales } from "@/i18n/locales";
import {RootState} from "@/store/types";

export const mutations: MutationTree<LanguageState> = {
  SET_LANGUAGE(state, payload: Locales) {
    state.language = payload;
  },
};
