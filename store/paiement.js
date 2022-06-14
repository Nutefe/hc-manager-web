const initialState = () => ({
    allPaiements: [],
    paiements: {},
    paiement: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_PAIEMENTS(state, allPaiements) {
        state.allPaiements = allPaiements;
    },
    SET_SEARCHED_PAIEMENTS(state, paiements) {
        state.paiements = paiements;
    },
    SET_PAIEMENTS(state, paiements) {
        state.paiements = paiements;
    },
    SET_SEARCHED_DAY_PAIEMENTS(state, paiements) {
        state.paiements = paiements;
    },
    SET_DAY_PAIEMENTS(state, paiements) {
        state.paiements = paiements;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.paiements.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.paiements.current_page = page;
    },
    SET_PAIEMENT(state, paiement) {
        state.paiement = paiement;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllPaiements({ commit }) {
        return this.$api.getAllPaiement().then((data) => {
            commit("SET_ALL_PAIEMENTS", data);
        });
    },

    searchPaiements({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_PAIEMENTS", {});
            return;
        }

        return this.$api.searchAllPaiementPage(page, s).then((data) => {

            commit("SET_SEARCHED_PAIEMENTS", data);
        });
    },
    fetchPaiements({ commit }, { page }) {
        return this.$api.selectAllPaiementPage(page).then((data) => {
            commit("SET_PAIEMENTS", data);
        });
    },
    searchDayPaiements({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DAY_PAIEMENTS", {});
            return;
        }

        return this.$api.searchAllDayPaiementPage(page, s).then((data) => {

            commit("SET_SEARCHED_DAY_PAIEMENTS", data);
        });
    },
    fetchDayPaiements({ commit }, { page }) {
        return this.$api.selectAllDayPaiementPage(page).then((data) => {
            commit("SET_DAY_PAIEMENTS", data);
        });
    },
    fetchPaiement({ commit, getters }, id) {
        const operation = getters.getPaiementById(id);

        if (operation) {
            return commit("SET_PAIEMENT", operation);
        } else {
            return this.$api.getPaiement(id).then((data) => {
                commit("SET_PAIEMENT", data);
            });
        }
    },
};

export const getters = {
    paiementsTotal: (state) => state.paiements?.total || 0,
    getPaiementById: (state) => (id) => {
        const paiements = state.paiements.data || [];

        return paiements
            .find((art) => art.id === id);
    },
};
