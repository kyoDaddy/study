import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/* vuex로 유저 정보를 저장할 저장소 생성 */
export const store = new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        user: (state) => { return state.user; }
    },
    mutations: {
        setUser(state, user) { state.user = user; }
    },
});