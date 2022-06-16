const initialState = () => ({
    allPatients: [],
    patients: {},
    patient: null,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_ALL_PATIENTS(state, allPatients) {
        state.allPatients = allPatients;
    },
    SET_SEARCHED_PATIENTS(state, patients) {
        state.patients = patients;
    },
    SET_PATIENTS(state, patients) {
        state.patients = patients;
    },
    SET_SEARCH_CURRENT_PAGE(state, page) {
        state.patients.current_page = page;
    },
    SET_CURRENT_PAGE(state, page) {
        state.patients.current_page = page;
    },
    SET_PATIENT(state, patient) {
        state.patient = patient;
    },
};

export const actions = {
    resetState({ commit }) {
        commit("RESET_STATE");
    },
    fetchAllPatients({ commit }) {
        return this.$api.getAllPatient().then((data) => {
            commit("SET_ALL_PATIENTS", data);
        });
    },

    searchPatients({ commit }, { page, s }) {
        if (!s) {

            commit("SET_SEARCHED_PATIENTS", {});
            return;
        }

        return this.$api.searchAllPatientPage(page, s).then((data) => {

            commit("SET_SEARCHED_PATIENTS", data);
        });
    },
    fetchPatients({ commit }, page) {
        return this.$api.selectAllPatientPage(page).then((data) => {
            commit("SET_PATIENTS", data);
        });
    },
    fetchPatient({ commit, getters }, id) {
        const operation = getters.getPatientById(id);

        if (operation) {
            return commit("SET_PATIENT", operation);
        } else {
            return this.$api.getPatient(id).then((data) => {
                commit("SET_PATIENT", data);
            });
        }
    },
};

export const getters = {
    patientsTotal: (state) => state.patients?.total || 0,
    getPatientById: (state) => (id) => {
        const patients = state.patients.data || [];

        return patients
            .find((art) => art.id === id);
    },
};
