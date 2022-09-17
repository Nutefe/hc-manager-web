const initialState = () => ({
    allDocuments: [],
    documents: {},
    document: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_DOCUMENTS(state, allDocuments) {
        state.allDocuments = allDocuments;
    },
    SET_SEARCHED_DOCUMENTS(state, documents) {
        state.documents = documents;
    },
    SET_DOCUMENTS(state, documents) {
        state.documents = documents;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.documents.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.documents.current_page = page;
    },
    SET_DOCUMENT(state, document) {
        state.document = document;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllDocuments({ commit }) {
        return this.$api.getAllDocument().then((data) => {
            commit("SET_ALL_DOCUMENTS", data);
        });
    },

    searchDocuments({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_DOCUMENTS", {});
            return;
        }

        return this.$api.searchAllDocumentPage(page, s).then((data) => {

            commit("SET_SEARCHED_DOCUMENTS", data);
        });
    },
    fetchDocuments({ commit }, page) {
        return this.$api.selectAllDocumentPage(page).then((data) => {
            commit("SET_DOCUMENTS", data);
        });
    },
    fetchDocument({ commit, getters }, id) {
        const operation = getters.getDocumentById(id);

        if (operation) {
            return commit("SET_DOCUMENT", operation);
        } else {
            return this.$api.getDocument(id).then((data) => {
                commit("SET_DOCUMENT", data);
            });
        }
    },
};

export const getters = {
    documentsTotal: (state) => state.documents?.total || 0,
    getDocumentById: (state) => (id) => {
        const documents = state.documents.data || [];

        return documents
            .find((art) => art.id === id);
    },
};
