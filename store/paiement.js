const initialState = () => ({
    allPaiements: [],
    paiements: {},
    factures: {},
    paiementDates: {},
    paiementDate: {},
    paiement: null,
    countPaiementDay: 0,
    montantPaiementDay: 0,
    countFactureDay: 0,
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
    SET_SEARCHED_DAY_FACTURES(state, factures) {
        state.factures = factures;
    },
    SET_DAY_FACTURES(state, factures) {
        state.factures = factures;
    },

    SET_SEARCHED_DATE_PAIEMENTS(state, paiementDates) {
        state.paiementDates = paiementDates;
    },
    SET_DATE_PAIEMENTS(state, paiementDates) {
        state.paiementDates = paiementDates;
    },
    SET_DATE_PAIEMENTS_NO(state, paiementDate) {
        state.paiementDate = paiementDate;
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
    SET_COUNT_PAIEMENT_DAY(state, countPaiementDay) {
        state.countPaiementDay = countPaiementDay;
    },
    SET_MONTANT_PAIEMENT_DAY(state, montantPaiementDay) {
        state.montantPaiementDay = montantPaiementDay;
    },
    SET_COUNT_FACTURE_DAY(state, countFactureDay) {
        state.countFactureDay = countFactureDay;
    },
    SET_COUNT_DATE_PAIEMENTS(state, page) {
        state.paiementDates.current_page = page;
    },
    
    SET_CURRENT_DAY_PAGE(state, page) {
        state.factures.current_page = page;
    },
    SET_CURRENT_SEARCH_DAY_PAGE(state, page) {
        state.factures.current_page = page;
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
    searchDayFactures({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DAY_FACTURES", {});
            return;
        }

        return this.$api.searchAllDayFacturePage(page, s).then((data) => {

            commit("SET_SEARCHED_DAY_FACTURES", data);
        });
    },
    fetchDayFactures({ commit }, page) {
        return this.$api.selectAllDayFacturePage(page).then((data) => {
            commit("SET_DAY_FACTURES", data);
        });
    },

    searchDatePaiement({ commit }, { date, page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DATE_PAIEMENTS", {});
            commit("SET_DATE_PAIEMENTS_NO", {});

            return;
        }

        return this.$api.searchAllPaiementDatePage(page, date, s).then((data) => {

            commit("SET_SEARCHED_DATE_PAIEMENTS", data.page);

            commit("SET_DATE_PAIEMENTS_NO", data);

        });
    },
    fetchDatePaiement({ commit }, { date, page }) {
        // console.log("test")
        return this.$api.selectAllPaiementDatePage(page, date).then((data) => {
            // console.log(data)

            commit("SET_DATE_PAIEMENTS", data.page);
            commit("SET_DATE_PAIEMENTS_NO", data);
        });
    },
    //  SET_SEARCHED_DATE_PAIEMENTS(state, paiementDate) {
    //     state.paiementDate = paiementDate;
    // },
    // SET_DATE_PAIEMENTS(state, paiementDate) {
    //     state.paiementDate = paiementDate;
    // },
    // SET_DATE_PAIEMENTS_NO(state, paiementDate) {
    //     state.paiementDate = paiementDate;
    // },

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
    fetchCountPaiementDay({ commit }) {
        return this.$api.countPaiementDay().then((data) => {
            commit("SET_COUNT_PAIEMENT_DAY", data);
        });
    },
    fetchMontantPaiementDay({ commit }) {
        return this.$api.montantPaiementDay().then((data) => {
            commit("SET_MONTANT_PAIEMENT_DAY", data);
        });
    },
    fetchCountFactureDay({ commit }) {
        return this.$api.countFactureDay().then((data) => {
            commit("SET_COUNT_FACTURE_DAY", data);
        });
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
