const initialState = () => ({
    allAssurances: [],
    allAssuranceAutres: [],
    assurances: {},
    assurance: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_ASSURANCES(state, allAssurances) {
        state.allAssurances = allAssurances;
    },
    SET_ALL_ASSURANCES_AUTRE(state, allAssuranceAutres) {
        state.allAssuranceAutres = allAssuranceAutres;
    },
    SET_SEARCHED_ASSURANCES(state, assurances) {
        state.assurances = assurances;
    },
    SET_ASSURANCES(state, assurances) {
        state.assurances = assurances;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.assurances.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.assurances.current_page = page;
    },
    SET_ASSURANCE(state, assurance) {
        state.assurance = assurance;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllAssurances({ commit }) {
        return this.$api.getAllAssurance().then((data) => {
            commit("SET_ALL_ASSURANCES", data);
        });
    },
    fetchAllAssurancesAutre({ commit }) {
        return this.$api.getAllAssuranceAutre().then((data) => {
            commit("SET_ALL_ASSURANCES_AUTRE", data);
        });
    },
    searchAssurances({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_ASSURANCES", {});
            return;
        }

        return this.$api.searchAllAssurancePage(page, s).then((data) => {
            commit("SET_SEARCHED_ASSURANCES", data);
        });
    },
    fetchAssurances({ commit }, page) {
        return this.$api.selectAllAssurancePage(page).then((data) => {
            commit("SET_ASSURANCES", data);
        });
    },
    fetchAssurance({ commit, getters }, id) {
        const operation = getters.getAssuranceById(id);

        if (operation) {
            return commit("SET_ASSURANCE", operation);
        } else {
            return this.$api.getAssurance(id).then((data) => {
                commit("SET_ASSURANCE", data);
            });
        }
    },
};

export const getters = {
    assurancesTotal: (state) => state.assurances?.total || 0,
    getAssuranceById: (state) => (id) => {
        const assurances = state.assurances.data || [];

        return assurances
            .find((art) => art.id === id);
    },
};
