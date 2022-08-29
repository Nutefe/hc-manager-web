const initialState = () => ({
    allDecaissements: [],
    decaissements: {},
    decaissementsToday: {},
    decaissementsDate: {},
    decaissementsCaisse: {},
    decaissementsCaisseToday: {},
    decaissementsCaisseDate: {},
    decaissement: null,
    montantDecaissement: 0,
    montantTodayDecaissement: 0,
    montantDateDecaissement: 0,
    montantDecaissementCaisse: 0,
    montantTodayDecaissementCaisse: 0,
    montantDateDecaissementCaisse: 0,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_DECAISSEMENTS(state, allDecaissements) {
        state.allDecaissements = allDecaissements;
    },
    SET_SEARCHED_DECAISSEMENTS(state, decaissements) {
        state.decaissements = decaissements;
    },
    SET_DECAISSEMENTS(state, decaissements) {
        state.decaissements = decaissements;
    },
    SET_SEARCHED_DECAISSEMENTS_TODAY(state, decaissementsToday) {
        state.decaissementsToday = decaissementsToday;
    },
    SET_DECAISSEMENTS_TODAY(state, decaissementsToday) {
        state.decaissementsToday = decaissementsToday;
    },
    SET_SEARCHED_DECAISSEMENTS_DATE(state, decaissementsDate) {
        state.decaissementsDate = decaissementsDate;
    },
    SET_DECAISSEMENTS_DATE(state, decaissementsDate) {
        state.decaissementsDate = decaissementsDate;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.decaissements.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.decaissements.current_page = page;
    },
    SET_SEARCH_TODAY_CURRENT_PAGE(state, page) {
        state.decaissementsToday.current_page = page;
    },
    SET_TODAY_CURRENT_PAGE(state, page) {
        state.decaissementsToday.current_page = page;
    },
    SET_SEARCH_DATE_CURRENT_PAGE(state, page) {
        state.decaissementsDate.current_page = page;
    },
    SET_DATE_CURRENT_PAGE(state, page) {
        state.decaissementsDate.current_page = page;
    },

    // ------------------------

    SET_SEARCHED_DECAISSEMENTS_CAISSE(state, decaissementsCaisse) {
        state.decaissementsCaisse = decaissementsCaisse;
    },
    SET_DECAISSEMENTS_CAISSE(state, decaissementsCaisse) {
        state.decaissementsCaisse = decaissementsCaisse;
    },
    SET_SEARCHED_DECAISSEMENTS_CAISSE_TODAY(state, decaissementsCaisseToday) {
        state.decaissementsCaisseToday = decaissementsCaisseToday;
    },
    SET_DECAISSEMENTS_CAISSE_TODAY(state, decaissementsCaisseToday) {
        state.decaissementsCaisseToday = decaissementsCaisseToday;
    },
    SET_SEARCHED_DECAISSEMENTS_CAISSE_DATE(state, decaissementsCaisseDate) {
        state.decaissementsCaisseDate = decaissementsCaisseDate;
    },
    SET_DECAISSEMENTS_CAISSE_DATE(state, decaissementsCaisseDate) {
        state.decaissementsCaisseDate = decaissementsCaisseDate;
    },
    SET_SEARCH_CAISSE_CURRENT_PAGE(state, page) {
        state.decaissementsCaisse.current_page = page;
    },
    SET_CAISSE_CURRENT_PAGE(state, page) {
    state.decaissementsCaisse.current_page = page;
    },
    SET_SEARCH_CAISSE_TODAY_CURRENT_PAGE(state, page) {
        state.decaissementsCaisseToday.current_page = page;
    },
    SET_CAISSE_TODAY_CURRENT_PAGE(state, page) {
        state.decaissementsCaisseToday.current_page = page;
    },
    SET_SEARCH_CAISSE_DATE_CURRENT_PAGE(state, page) {
        state.decaissementsCaisseDate.current_page = page;
    },
    SET_CAISSE_DATE_CURRENT_PAGE(state, page) {
        state.decaissementsCaisseDate.current_page = page;
    },
    // ------------------------
    SET_DECAISSEMENT(state, decaissement) {
        state.decaissement = decaissement;
    },
    SET_MONTANT_DECAISSEMENT(state, montantDecaissement) {
        state.montantDecaissement = montantDecaissement;
    },
    SET_MONTANT_DECAISSEMENT_TODAY(state, montantTodayDecaissement) {
        state.montantTodayDecaissement = montantTodayDecaissement;
    },
    SET_MONTANT_DECAISSEMENT_DATE(state, montantDateDecaissement) {
        state.montantDateDecaissement = montantDateDecaissement;
    },
    SET_MONTANT_DECAISSEMENT_CAISSE(state, montantDecaissementCaisse) {
        state.montantDecaissementCaisse = montantDecaissementCaisse;
    },
    SET_MONTANT_DECAISSEMENT_CAISSE_TODAY(state, montantTodayDecaissementCaisse) {
        state.montantTodayDecaissementCaisse = montantTodayDecaissementCaisse;
    },
    SET_MONTANT_DECAISSEMENT_CAISSE_DATE(state, montantDateDecaissementCaisse) {
        state.montantDateDecaissementCaisse = montantDateDecaissementCaisse;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllDecaissements({ commit }) {
        return this.$api.getAllDecaissements().then((data) => {
            commit("SET_ALL_DECAISSEMENTS", data);
        });
    },
    searchDecaissements({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DECAISSEMENTS", {});
            return;
        }

        return this.$api.searchAllDecaissementPage(page, s).then((data) => {
            commit("SET_SEARCHED_DECAISSEMENTS", data);
        });
    },
    fetchDecaissements({ commit }, page) {
        return this.$api.selectAllDecaissementPage(page).then((data) => {
            commit("SET_DECAISSEMENTS", data);
        });
    },
    searchDecaissementsToday({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DECAISSEMENTS_TODAY", {});
            return;
        }

        return this.$api.searchAllDecaissementTodayPage(page, s).then((data) => {
            commit("SET_SEARCHED_DECAISSEMENTS_TODAY", data);
        });
    },
    fetchDecaissementsToday({ commit }, page) {
        return this.$api.selectAllDecaissementTodayPage(page).then((data) => {
            commit("SET_DECAISSEMENTS_TODAY", data);
        });
    },
    searchDecaissementsDate({ commit }, { date, page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DECAISSEMENTS_DATE", {});
            return;
        }

        return this.$api.searchAllDecaissementDatePage(date, page, s).then((data) => {
            commit("SET_SEARCHED_DECAISSEMENTS_DATE", data);
        });
    },
    fetchDecaissementsDate({ commit }, {date, page}) {
        return this.$api.selectAllDecaissementDatePage(date, page).then((data) => {
            commit("SET_DECAISSEMENTS_DATE", data);
        });
    },
    searchDecaissementsCaisse({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DECAISSEMENTS_CAISSE", {});
            return;
        }

        return this.$api.searchAllDecaissementCaissePage(page, s).then((data) => {
            commit("SET_SEARCHED_DECAISSEMENTS_CAISSE", data);
        });
    },
    fetchDecaissementsCaisse({ commit }, page) {
        return this.$api.selectAllDecaissementCaissePage(page).then((data) => {
            commit("SET_DECAISSEMENTS_CAISSE", data);
        });
    },
    searchDecaissementsCaisseToday({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DECAISSEMENTS_CAISSE_TODAY", {});
            return;
        }

        return this.$api.searchAllDecaissementCaisseTodayPage(page, s).then((data) => {
            commit("SET_SEARCHED_DECAISSEMENTS_CAISSE_TODAY", data);
        });
    },
    fetchDecaissementsCaisseToday({ commit }, page) {
        return this.$api.selectAllDecaissementCaisseTodayPage(page).then((data) => {
            commit("SET_DECAISSEMENTS_CAISSE_TODAY", data);
        });
    },
    searchDecaissementsCaisseDate({ commit }, { date, page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DECAISSEMENTS_CAISSE_DATE", {});
            return;
        }

        return this.$api.searchAllDecaissementCaisseDatePage(date, page, s).then((data) => {
            commit("SET_SEARCHED_DECAISSEMENTS_CAISSE_DATE", data);
        });
    },
    fetchDecaissementsCaisseDate({ commit }, {date, page}) {
        return this.$api.selectAllDecaissementCaisseDatePage(date, page).then((data) => {
            commit("SET_DECAISSEMENTS_CAISSE_DATE", data);
        });
    },
    fetchDecaissement({ commit, getters }, id) {
        const operation = getters.getDecaissementById(id);

        if (operation) {
            return commit("SET_DECAISSEMENT", operation);
        } else {
            return this.$api.getDecaissement(id).then((data) => {
                commit("SET_DECAISSEMENT", data);
            });
        }
    },
    fetchMontantDecaissement({ commit }) {
        return this.$api.montantDecaissement().then((data) => {
            commit("SET_MONTANT_DECAISSEMENT", data);
        });
    },
    fetchMontantDecaissementToday({ commit }) {
        return this.$api.montantTodayDecaissement().then((data) => {
            commit("SET_MONTANT_DECAISSEMENT_TODAY", data);
        });
    },
    fetchMontantDecaissementDate({ commit }, date) {
        return this.$api.montantDateDecaissement(date).then((data) => {
            commit("SET_MONTANT_DECAISSEMENT_DATE", data);
        });
    },
    fetchMontantDecaissementCaisse({ commit }) {
        return this.$api.montantDecaissementCaisse().then((data) => {
            commit("SET_MONTANT_DECAISSEMENT_CAISSE", data);
        });
    },
    fetchMontantDecaissementCaisseToday({ commit }) {
        return this.$api.montantTodayDecaissementCaisse().then((data) => {
            commit("SET_MONTANT_DECAISSEMENT_CAISSE_TODAY", data);
        });
    },
    fetchMontantDecaissementCaisseDate({ commit }, date) {
        return this.$api.montantDateDecaissementCaisse(date).then((data) => {
            commit("SET_MONTANT_DECAISSEMENT_CAISSE_DATE", data);
        });
    },
};

export const getters = {
    decaissementsTotal: (state) => state.decaissements?.total || 0,
    getDecaissementById: (state) => (id) => {
        const decaissements = state.decaissements.data || [];

        return decaissements
            .find((art) => art.id === id);
    },
};
