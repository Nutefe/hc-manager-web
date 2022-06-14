const initialState = () => ({
    allEntreprises: [],
    entreprises: {},
    entreprise: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_ENTREPRISES(state, allEntreprises) {
        state.allEntreprises = allEntreprises;
    },
    SET_SEARCHED_ENTREPRISES(state, entreprises) {
        state.entreprises = entreprises;
    },
    SET_ENTREPRISES(state, entreprises) {
        state.entreprises = entreprises;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.entreprises.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.entreprises.current_page = page;
    },
    SET_ENTREPRISE(state, entreprise) {
        state.entreprise = entreprise;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllEntreprises({ commit }) {
        return this.$api.getAllEntreprise().then((data) => {
            commit("SET_ALL_ENTREPRISES", data);
        });
    },

    searchEntreprises({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_ENTREPRISES", {});
            return;
        }

        return this.$api.searchAllEntreprisePage(page, s).then((data) => {

            commit("SET_SEARCHED_ENTREPRISES", data);
        });
    },
    fetchEntreprises({ commit }, page) {
        return this.$api.selectAllEntreprisePage(page).then((data) => {
            commit("SET_ENTREPRISES", data);
        });
    },
    fetchEntreprise({ commit, getters }, id) {
        const operation = getters.getEntrepriseById(id);

        if (operation) {
            return commit("SET_ENTREPRISE", operation);
        } else {
            return this.$api.getEntreprise(id).then((data) => {
                commit("SET_ENTREPRISE", data);
            });
        }
    },
};

export const getters = {
    entreprisesTotal: (state) => state.entreprises?.total || 0,
    getEntrepriseById: (state) => (id) => {
        const entreprises = state.entreprises.data || [];

        return entreprises
            .find((art) => art.id === id);
    },
};
