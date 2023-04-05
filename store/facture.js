const initialState = () => ({
    allFactures: [],
    factures: {},
    facturesDay: {},
    facture: null,
    fiches: [],
    countFacture: 0,
    countFactureDay: 0,
    montantFacture: 0,
    acompteFacture: 0,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_FACTURES(state, allFactures) {
        state.allFactures = allFactures;
    },
    
    SET_ALL_FICHES(state, fiches) {
        state.fiches = fiches;
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
    SET_SEARCHED_NOT_SOLDE_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_NOT_SOLDE_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_SEARCHED_ENC_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_ENC_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_SEARCHED_FACTURES_DAY(state, facturesDay) {
        state.facturesDay = facturesDay;
    },
    SET_FACTURES_DAY(state, facturesDay) {
        state.facturesDay = facturesDay;
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
    SET_COUNT_FACTURE(state, countFacture) {
        state.countFacture = countFacture;
    },
    SET_COUNT_FACTURE_DAY(state, countFactureDay) {
        state.countFactureDay = countFactureDay;
    },
    SET_MONTANT_FACTURE_DAY(state, montantFacture) {
        state.montantFacture = montantFacture;
    },
    SET_ACOMPTE_FACTURE_DAY(state, acompteFacture) {
        state.acompteFacture = acompteFacture;
    },

    SET_CURRENT_DAY_PAGE(state, page) {
        state.facturesDay.current_page = page;
    },
    SET_CURRENT_SEARCH_DAY_PAGE(state, page) {
        state.facturesDay.current_page = page;
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

    fetchAllFiches({ commit }, id) {
        return this.$api.getFicheTraitement(id).then((data) => {
            commit("SET_ALL_FICHES", data);
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
    fetchSoldeFactures({ commit }, page) {
        return this.$api.selectAllFactureSoldePage(page).then((data) => {
            commit("SET_SOLDE_FACTURES", data);
        });
    },
    searchNotSoldeFactures({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_NOT_SOLDE_FACTURES", {});
            return;
        }

        return this.$api.searchAllFactureNotSoldePage(page, s).then((data) => {

            commit("SET_SEARCHED_NOT_SOLDE_FACTURES", data);
        });
    },
    fetchNotSoldeFactures({ commit }, page) {
        return this.$api.selectAllFactureNotSoldePage(page).then((data) => {
            commit("SET_NOT_SOLDE_FACTURES", data);
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
    fetchEncFactures({ commit }, page) {
        return this.$api.selectAllFactureEncPage(page).then((data) => {
            commit("SET_ENC_FACTURES", data);
        });
    },
    searchFacturesDay({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_FACTURES_DAY", {});
            return;
        }

        return this.$api.searchAllFactureDayPage(page, s).then((data) => {

            commit("SET_SEARCHED_FACTURES_DAY", data);
        });
    },
    fetchFacturesDay({ commit }, page) {
        return this.$api.selectAllFactureDayPage(page).then((data) => {
            commit("SET_FACTURES_DAY", data);
        });
    },
    fetchFacture({ commit, getters }, id) {
        const operation = getters.getFactureById(id);

        if (operation) {
            return commit("SET_FACTURE", operation);
        } else {
            return this.$api.getFacture(id).then((data) => {
                commit("SET_FACTURE", data);
            });
        }
    },
    fetchCountFacture({ commit }) {
        return this.$api.countFacture().then((data) => {
            commit("SET_COUNT_FACTURE", data);
        });
    },
    fetchCountFactureDay({ commit }) {
        return this.$api.countFactureDay().then((data) => {
            commit("SET_COUNT_FACTURE_DAY", data);
        });
    },
    fetchMontantFactureDay({ commit }) {
        return this.$api.montantFacture().then((data) => {
            commit("SET_MONTANT_FACTURE_DAY", data);
        });
    },
    fetchAcompteFactureDay({ commit }) {
        return this.$api.acompteFacture().then((data) => {
            commit("SET_ACOMPTE_FACTURE_DAY", data);
        });
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
