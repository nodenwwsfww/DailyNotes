import {LanguageState} from "@/store/language/types";
import { Module } from 'vuex';
import { RootState } from '../types';
import {actions} from "@/store/language/actions";
import {getters} from "@/store/language/getters";
import {mutations} from "@/store/language/mutations";
import {defaultLocale} from "@/i18n";

export const state: LanguageState = {
    language: defaultLocale
};
const namespaced: boolean = true;

export const language: Module<LanguageState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};