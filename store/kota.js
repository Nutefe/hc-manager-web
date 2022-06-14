const initialState = () => ({
    allKotas: [],
    kotas: {},
    kota: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_KOTAS(state, allKotas) {
        state.allKotas = allKotas;
    },
    SET_SEARCHED_KOTAS(state, kotas) {
        state.kotas = kotas;
    },
    SET_KOTAS(state, kotas) {
        state.kotas = kotas;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.kotas.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.kotas.current_page = page;
    },
    SET_KOTA(state, kota) {
        state.kota = kota;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllKotas({ commit }) {
        return this.$api.getAllKota().then((data) => {
            commit("SET_ALL_KOTAS", data);
        });
    },

    searchKotas({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_KOTAS", {});
            return;
        }

        return this.$api.searchAllKotaPage(page, s).then((data) => {

            commit("SET_SEARCHED_KOTAS", data);
        });
    },
    fetchKotas({ commit }, page) {
        return this.$api.selectAllKotaPage(page).then((data) => {
            commit("SET_KOTAS", data);
        });
    },
    fetchKota({ commit, getters }, id) {
        const operation = getters.getKotaById(id);

        if (operation) {
            return commit("SET_KOTA", operation);
        } else {
            return this.$api.getKota(id).then((data) => {
                commit("SET_KOTA", data);
            });
        }
    },
};

export const getters = {
    kotasTotal: (state) => state.kotas?.total || 0,
    getKotaById: (state) => (id) => {
        const kotas = state.kotas.data || [];

        return kotas
            .find((art) => art.id === id);
    },
};
