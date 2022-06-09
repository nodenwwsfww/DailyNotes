import { MutationTree } from 'vuex';
import {LanguageState} from './types';

export const mutations: MutationTree<LanguageState> = {
  setLanguage(state, language: string) {
    state.language = language;
  },
};
