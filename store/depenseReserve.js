const initialState = () => ({
    allDepenseReserves: [],
    depenseReserves: {},
    depenseReserve: null,
    montantDepense: 0,
    montantDepenseToday: 0,
    montantDepenseDate: 0,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_DEPENSE_RESERVES(state, allDepenseReserves) {
        state.allDepenseReserves = allDepenseReserves;
    },
    SET_SEARCHED_DEPENSE_RESERVES(state, depenseReserves) {
        state.depenseReserves = depenseReserves;
    },
    SET_DEPENSE_RESERVES(state, depenseReserves) {
        state.depenseReserves = depenseReserves;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.depenseReserves.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.depenseReserves.current_page = page;
    },
    SET_DEPENSE_RESERVE(state, depenseReserve) {
        state.depenseReserve = depenseReserve;
    },
    SET_MONTANT_DEPENSE(state, montantDepense) {
        state.montantDepense = montantDepense;
    },
    SET_MONTANT_DEPENSE_TODAY(state, montantDepenseToday) {
        state.montantDepenseToday = montantDepenseToday;
    },
    SET_MONTANT_DEPENSE_DATE(state, montantDepenseDate) {
        state.montantDepenseDate = montantDepenseDate;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllDepenseReserves({ commit }) {
        return this.$api.getAllDepenseReserves().then((data) => {
            commit("SET_ALL_DEPENSE_RESERVES", data);
        });
    },
    searchDepenseReserves({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DEPENSE_RESERVES", {});
            return;
        }

        return this.$api.searchAllDepenseReservePage(page, s).then((data) => {
            commit("SET_SEARCHED_DEPENSE_RESERVES", data);
        });
    },
    fetchDepenseReserves({ commit }, page) {
        return this.$api.selectAllDepenseReservePage(page).then((data) => {
            commit("SET_DEPENSE_RESERVES", data);
        });
    },
    fetchDepenseReserve({ commit, getters }, id) {
        const operation = getters.getDepenseReserveById(id);

        if (operation) {
            return commit("SET_DEPENSE_RESERVE", operation);
        } else {
            return this.$api.getDepenseReserve(id).then((data) => {
                commit("SET_DEPENSE_RESERVE", data);
            });
        }
    },
    fetchMontantDepense({ commit }) {
        return this.$api.montantDepenseReserve().then((data) => {
            commit("SET_MONTANT_DEPENSE", data);
        });
    },
    fetchMontantDepenseToday({ commit }) {
        return this.$api.montantTodayDepenseReserve().then((data) => {
            commit("SET_MONTANT_DEPENSE_TODAY", data);
        });
    },
    fetchMontantDepenseDate({ commit }, date) {
        return this.$api.montantDateDepenseReserve(date).then((data) => {
            commit("SET_MONTANT_DEPENSE_DATE", data);
        });
    },
};

export const getters = {
    depenseReservesTotal: (state) => state.depenseReserves?.total || 0,
    getDepenseReserveById: (state) => (id) => {
        const depenseReserves = state.depenseReserves.data || [];

        return depenseReserves
            .find((art) => art.id === id);
    },
};
