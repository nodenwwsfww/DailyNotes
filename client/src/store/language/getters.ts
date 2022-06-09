import { GetterTree } from 'vuex';
import { LanguageState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<LanguageState, RootState> = {
  getLanguage(state) {
    return state.language;
  },
};
