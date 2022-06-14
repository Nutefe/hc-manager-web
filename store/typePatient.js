const initialState = () => ({
    allTypes: [],
    types: {},
    type: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_TYPES(state, allTypes) {
        state.allTypes = allTypes;
    },
    SET_SEARCHED_TYPES(state, types) {
        state.types = types;
    },
    SET_TYPES(state, types) {
        state.types = types;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.types.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.types.current_page = page;
    },
    SET_TYPE(state, type) {
        state.type = type;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllTypes({ commit }) {
        return this.$api.getAllTypePatient().then((data) => {
            commit("SET_ALL_TYPES", data);
        });
    },

    searchTypes({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_TYPES", {});
            return;
        }

        return this.$api.searchAllTypePatientPage(page, s).then((data) => {

            commit("SET_SEARCHED_TYPES", data);
        });
    },
    fetchTypes({ commit }, page) {
        return this.$api.selectAllTypePatientPage(page).then((data) => {
            commit("SET_TYPES", data);
        });
    },
    fetchType({ commit, getters }, id) {
        const operation = getters.getTypeById(id);

        if (operation) {
            return commit("SET_TYPE", operation);
        } else {
            return this.$api.getTypePatient(id).then((data) => {
                commit("SET_TYPE", data);
            });
        }
    },
};

export const getters = {
    typesTotal: (state) => state.types?.total || 0,
    getTypeById: (state) => (id) => {
        const types = state.types.data || [];

        return types
            .find((art) => art.id === id);
    },
};
