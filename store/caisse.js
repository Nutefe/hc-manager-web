const initialState = () => ({
    allCaisses: [],
    caisses: {},
    caisse: null,
    caisseUtilisateur: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_CAISSES(state, allCaisses) {
        state.allCaisses = allCaisses;
    },
    SET_CAISSE_UTILISATEUR(state, caisseUtilisateur) {
        state.caisseUtilisateur = caisseUtilisateur;
    },
    SET_SEARCHED_CAISSES(state, caisses) {
        state.caisses = caisses;
    },
    SET_CAISSES(state, caisses) {
        state.caisses = caisses;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.caisses.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.caisses.current_page = page;
    },
    SET_CAISSE(state, caisse) {
        state.caisse = caisse;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllCaisses({ commit }) {
        return this.$api.getAllCaisses().then((data) => {
            commit("SET_ALL_CAISSES", data);
        });
    },
    
    fetchCaisseUtilisateur({ commit }) {
        return this.$api.getCaisseUtilisateur().then((data) => {
            commit("SET_CAISSE_UTILISATEUR", data);
        });
    },
    
    searchCaisses({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_CAISSES", {});
            return;
        }

        return this.$api.searchAllCaissePage(page, s).then((data) => {
            commit("SET_SEARCHED_CAISSES", data);
        });
    },
    fetchCaisses({ commit }, page) {
        return this.$api.selectAllCaissePage(page).then((data) => {
            commit("SET_CAISSES", data);
        });
    },
    fetchCaisse({ commit, getters }, id) {
        const operation = getters.getCaisseById(id);

        if (operation) {
            return commit("SET_CAISSE", operation);
        } else {
            return this.$api.getCaisse(id).then((data) => {
                commit("SET_CAISSE", data);
            });
        }
    },
};

export const getters = {
    caissesTotal: (state) => state.caisses?.total || 0,
    getCaisseById: (state) => (id) => {
        const caisses = state.caisses.data || [];

        return caisses
            .find((art) => art.id === id);
    },
    
};
