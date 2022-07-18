const initialState = () => ({
    allFiches: [],
    fiches: {},
    fiche: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_SEARCHED_FICHES(state, fiches) {
        state.fiches = fiches;
    },
    SET_FICHES(state, fiches) {
        state.fiches = fiches;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.fiches.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.fiches.current_page = page;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },

    searchFiches({ commit }, { id, page, s }) {
        if (!s) {

            commit("SET_SEARCHED_FICHES", {});
            return;
        }
        return this.$api.searchAllFichePatientPage(id, page, s).then((data) => {
            commit("SET_SEARCHED_FICHES", data);
        });
    },
    fetchFiches({ commit }, { id, page }) {
        return this.$api.selectAllFichePatientPage(id, page).then((data) => {
            commit("SET_FICHES", data);
        });
    },
};

