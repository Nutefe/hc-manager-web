const initialState = () => ({
    allReserves: [],
    reserves: {},
    reserve: null,
    montantReserve: 0,
    montantReserveToday: 0,
    montantReserveDate: 0,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_RESERVES(state, allReserves) {
        state.allReserves = allReserves;
    },
    SET_SEARCHED_RESERVES(state, reserves) {
        state.reserves = reserves;
    },
    SET_RESERVES(state, reserves) {
        state.reserves = reserves;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.reserves.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.reserves.current_page = page;
    },
    SET_RESERVE(state, reserve) {
        state.reserve = reserve;
    },
    SET_MONTANT_RESERVE(state, montantReserve) {
        state.montantReserve = montantReserve;
    },
    SET_MONTANT_RESERVE_TODAY(state, montantReserveToday) {
        state.montantReserveToday = montantReserveToday;
    },
    SET_MONTANT_RESERVE_DATE(state, montantReserveDate) {
        state.montantReserveDate = montantReserveDate;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllReserves({ commit }) {
        return this.$api.getAllReserves().then((data) => {
            commit("SET_ALL_RESERVES", data);
        });
    },
    searchReserves({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_RESERVES", {});
            return;
        }

        return this.$api.searchAllReservePage(page, s).then((data) => {
            commit("SET_SEARCHED_RESERVES", data);
        });
    },
    fetchReserves({ commit }, page) {
        return this.$api.selectAllReservePage(page).then((data) => {
            commit("SET_RESERVES", data);
        });
    },
    fetchReserve({ commit, getters }, id) {
        const operation = getters.getReserveById(id);

        if (operation) {
            return commit("SET_RESERVE", operation);
        } else {
            return this.$api.getReserve(id).then((data) => {
                commit("SET_RESERVE", data);
            });
        }
    },
    fetchMontantReserve({ commit }) {
        return this.$api.montantReserve().then((data) => {
            commit("SET_MONTANT_RESERVE", data);
        });
    },
    fetchMontantReserveToday({ commit }) {
        return this.$api.montantTodayReserve().then((data) => {
            commit("SET_MONTANT_RESERVE_TODAY", data);
        });
    },
    fetchMontantReserveDate({ commit }, date) {
        return this.$api.montantDateReserve(date).then((data) => {
            commit("SET_MONTANT_RESERVE_DATE", data);
        });
    },
};

export const getters = {
    reservesTotal: (state) => state.reserves?.total || 0,
    getReserveById: (state) => (id) => {
        const reserves = state.reserves.data || [];

        return reserves
            .find((art) => art.id === id);
    },
};
