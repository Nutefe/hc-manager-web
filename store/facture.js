const initialState = () => ({
    allFactures: [],
    factures: {},
    facture: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_FACTURES(state, allFactures) {
        state.allFactures = allFactures;
    },
    SET_SEARCHED_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_SEARCHED_SOLDE_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_SOLDE_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_SEARCHED_ENC_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_ENC_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.factures.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.factures.current_page = page;
    },
    SET_FACTURE(state, facture) {
        state.facture = facture;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllFactures({ commit }) {
        return this.$api.getAllFacture().then((data) => {
            commit("SET_ALL_FACTURES", data);
        });
    },

    searchFactures({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_FACTURES", {});
            return;
        }

        return this.$api.searchAllFacturePage(page, s).then((data) => {

            commit("SET_SEARCHED_FACTURES", data);
        });
    },
    fetchFactures({ commit }, page) {
        return this.$api.selectAllFacturePage(page).then((data) => {
            commit("SET_FACTURES", data);
        });
    },
    searchSoldeFactures({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_SOLDE_FACTURES", {});
            return;
        }

        return this.$api.searchAllFactureSoldePage(page, s).then((data) => {

            commit("SET_SEARCHED_SOLDE_FACTURES", data);
        });
    },
    fetchSoldeFactures({ commit }, { page }) {
        return this.$api.selectAllFactureSoldePage(page).then((data) => {
            commit("SET_SOLDE_FACTURES", data);
        });
    },
    searchEncFactures({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_ENC_FACTURES", {});
            return;
        }

        return this.$api.searchAllFactureEncPage(page, s).then((data) => {

            commit("SET_SEARCHED_ENC_FACTURES", data);
        });
    },
    fetchEncFactures({ commit }, { page }) {
        return this.$api.selectAllFactureEncPage(page).then((data) => {
            commit("SET_ENC_FACTURES", data);
        });
    },
    fetchFacture({ commit, getters }, id) {
        const operation = getters.getTypeById(id);

        if (operation) {
            return commit("SET_FACTURE", operation);
        } else {
            return this.$api.getFacture(id).then((data) => {
                commit("SET_FACTURE", data);
            });
        }
    },
};

export const getters = {
    facturesTotal: (state) => state.factures?.total || 0,
    getFactureById: (state) => (id) => {
        const factures = state.factures.data || [];

        return factures
            .find((art) => art.id === id);
    },
};
