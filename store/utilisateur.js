const initialState = () => ({
    allUtilisateurs: [],
    utilisateurs: {},
    utilisateur: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_UTILISATEURS(state, allUtilisateurs) {
        state.allUtilisateurs = allUtilisateurs;
    },
    SET_SEARCHED_UTILISATEURS(state, utilisateurs) {
        state.utilisateurs = utilisateurs;
    },
    SET_UTILISATEURS(state, utilisateurs) {
        state.utilisateurs = utilisateurs;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.utilisateurs.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.utilisateurs.current_page = page;
    },
    SET_UTILISATEUR(state, utilisateur) {
        state.utilisateur = utilisateur;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllUtilisateurs({ commit }) {
        return this.$api.selectAllUser().then((data) => {
            commit("SET_ALL_UTILISATEURS", data);
        });
    },

    searchUtilisateurs({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_UTILISATEURS", {});
            return;
        }

        return this.$api.searchAllUserPage(page, s).then((data) => {

            commit("SET_SEARCHED_UTILISATEURS", data);
        });
    },
    fetchUtilisateurs({ commit }, { page }) {
        return this.$api.selectAllUserPage(page).then((data) => {
            commit("SET_UTILISATEURS", data);
        });
    },
    fetchUtilisateur({ commit, getters }, id) {
        const operation = getters.getUtilisateurById(id);

        if (operation) {
            return commit("SET_UTILISATEUR", operation);
        } else {
            return this.$api.selectOneUser(id).then((data) => {
                commit("SET_UTILISATEUR", data);
            });
        }
    },
};

export const getters = {
    utilisateursTotal: (state) => state.utilisateurs?.total || 0,
    getUtilisateurById: (state) => (id) => {
        const utilisateurs = state.utilisateurs.data || [];

        return utilisateurs
            .find((art) => art.id === id);
    },
};
