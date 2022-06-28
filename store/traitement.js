const initialState = () => ({
    allTraitements: [],
    allTraitementsType: [],
    allTraitementsTypeAssurer: [],
    traitements: {},
    traitement: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_TRAITEMENTS(state, allTraitements) {
        state.allTraitements = allTraitements;
    },
    SET_ALL_TRAITEMENTS_TYPE(state, allTraitementsType) {
        state.allTraitementsType = allTraitementsType;
    },
    SET_ALL_TRAITEMENTS_TYPE_ASSURER(state, allTraitementsTypeAssurer) {
        state.allTraitementsTypeAssurer = allTraitementsTypeAssurer;
    },
    SET_SEARCHED_TRAITEMENTS(state, traitements) {
        state.traitements = traitements;
    },
    SET_TRAITEMENTS(state, traitements) {
        state.traitements = traitements;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.traitements.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.traitements.current_page = page;
    },
    SET_TRAITEMENT(state, traitement) {
        state.traitement = traitement;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllTraitements({ commit }) {
        return this.$api.getAllTraitement().then((data) => {
            commit("SET_ALL_TRAITEMENTS", data);
        });
    },
    fetchAllTraitementType({ commit }, id) {
        return this.$api.getAllTraitementTypePatient(id).then((data) => {
            commit("SET_ALL_TRAITEMENTS_TYPE", data);
        });
    },
    fetchAllTraitementTypeAssurer({ commit }, id) {
        return this.$api.getAllTraitementTypePatient(id).then((data) => {
            commit("SET_ALL_TRAITEMENTS_TYPE_ASSURER", data);
        });
    },

    searchTraitements({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_TRAITEMENTS", {});
            return;
        }

        return this.$api.searchAllTraitementPage(page, s).then((data) => {

            commit("SET_SEARCHED_TRAITEMENTS", data);
        });
    },
    fetchTraitements({ commit }, page) {
        return this.$api.selectAllTraitementPage(page).then((data) => {
            commit("SET_TRAITEMENTS", data);
        });
    },
    fetchTraitement({ commit, getters }, id) {
        const operation = getters.getTraitementById(id);

        if (operation) {
            return commit("SET_TRAITEMENT", operation);
        } else {
            return this.$api.getTraitement(id).then((data) => {
                commit("SET_TRAITEMENT", data);
            });
        }
    },
};

export const getters = {
    traitementsTotal: (state) => state.traitements?.total || 0,
    getTraitementById: (state) => (id) => {
        const traitements = state.traitements.data || [];

        return traitements
            .find((art) => art.id === id);
    },
};
