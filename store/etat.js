const initialState = () => ({
    allEtats: [],
    etats: {},
    etat: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_ETATS(state, allEtats) {
        state.allEtats = allEtats;
    },
    SET_SEARCHED_ETATS(state, etats) {
        state.etats = etats;
    },
    SET_ETATS(state, etats) {
        state.etats = etats;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.etats.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.etats.current_page = page;
    },
    SET_ETAT(state, etat) {
        state.etat = etat;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllEtats({ commit }) {
        return this.$api.getAllEtat().then((data) => {
            commit("SET_ALL_ETATS", data);
        });
    },
    searchEtats({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_ETATS", {});
            return;
        }

        return this.$api.searchAllEtatsPage(page, s).then((data) => {

            commit("SET_SEARCHED_ETATS", data);
        });
    },
    fetchEtats({ commit }, page) {
        return this.$api.selectAllEtatsPage(page).then((data) => {
            commit("SET_ETATS", data);
        });
    },
    fetchEtat({ commit, getters }, id) {
        const operation = getters.getEtatById(id);

        if (operation) {
            return commit("SET_ETAT", operation);
        } else {
            return this.$api.getEtat(id).then((data) => {
                commit("SET_ETAT", data);
            });
        }
    },
};

export const getters = {
    etatsTotal: (state) => state.etats?.total || 0,
    getEtatById: (state) => (id) => {
        const etats = state.etats.data || [];

        return etats
            .find((art) => art.id === id);
    },
};
