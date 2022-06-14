const initialState = () => ({
    allProfils: [],
    profils: {},
    profil: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_PROFILS(state, allProfils) {
        state.allProfils = allProfils;
    },
    SET_SEARCHED_PROFILS(state, profils) {
        state.profils = profils;
    },
    SET_PROFILS(state, profils) {
        state.profils = profils;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.profils.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.profils.current_page = page;
    },
    SET_PROFIL(state, profil) {
        state.profil = profil;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllProfils({ commit }) {
        return this.$api.selectAllProfil().then((data) => {
            commit("SET_ALL_PROFILS", data);
        });
    },

    searchProfils({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_PROFILS", {});
            return;
        }

        return this.$api.searchAllProfilPage(page, s).then((data) => {

            commit("SET_SEARCHED_PROFILS", data);
        });
    },
    fetchProfils({ commit }, page) {
        return this.$api.selectAllProfilPage(page).then((data) => {
            commit("SET_PROFILS", data);
        });
    },
    fetchProfil({ commit, getters }, id) {
        const operation = getters.getProfilById(id);

        if (operation) {
            return commit("SET_PROFIL", operation);
        } else {
            return this.$api.selectOneProfil(id).then((data) => {
                commit("SET_PROFIL", data);
            });
        }
    },
};

export const getters = {
    profilsTotal: (state) => state.profils?.total || 0,
    getProfilById: (state) => (id) => {
        const profils = state.profils.data || [];

        return profils
            .find((art) => art.id === id);
    },
};
