const initialState = () => ({
    allReserves: [],
    reserves: {},
    reserve: null,
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
};

export const getters = {
    reservesTotal: (state) => state.reserves?.total || 0,
    getReserveById: (state) => (id) => {
        const reserves = state.reserves.data || [];

        return reserves
            .find((art) => art.id === id);
    },
};
