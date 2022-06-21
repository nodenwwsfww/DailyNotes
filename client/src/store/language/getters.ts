import { GetterTree } from 'vuex';
import { LanguageState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<LanguageState, RootState> = {
  getLanguage(state) {
    let lang = localStorage.getItem("lang");
    if (!lang) lang = state.language
    return lang;
  },
};
