import Vuex from "vuex";

const store = new Vuex.Store({
    state: {
        form: {},
        prePage: "",
    },
    getters: {
        getEditFormData: (state) => {
            return state.form;
        },
        getPrePage: (state) => {
            return state.prePage;
        },
    },
    mutations: {
        setEditFormData: (state, form) => {
            state.form = form;
        },
        setPrePage: (state, prePage) => {
            state.prePage = prePage;
        },
    },
});

export default store;
