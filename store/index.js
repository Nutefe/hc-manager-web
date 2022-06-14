const initialState = () => ({
    drawer: false,
    drawerDefault: false,
    drawerDefaultNav: false,
});

export const state = initialState;

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState());
    },
    SET_DRAWER(state, drawer) {
        state.drawer = drawer;
    },

    SET_DRAWER_DEFAULT(state, drawerDefault) {
        state.drawerDefault = drawerDefault;
    },

    SET_DRAWER_DEFAULT_NAV(state, drawerDefaultNav) {
        state.drawerDefaultNav = drawerDefaultNav;
    },
};

export const actions = {

    resetState({ commit }) {
        dispatch("profil/resetState");
        commit("RESET_STATE");
    },

    toggleDrawer({ commit }, drawer) {
        commit("SET_DRAWER", drawer);
    },

    toggleDrawerDefault({ commit }, drawerDefault) {
        commit("SET_DRAWER_DEFAULT", drawerDefault);
    },

    toggleDrawerDefaultNav({ commit }, drawerDefaultNav) {
        commit("SET_DRAWER_DEFAULT_NAV", drawerDefaultNav);
    },
};

export const getters = {
    drawer: (state) => state.drawer,
    drawerDefault: (state) => state.drawerDefault,
    drawerDefaultNav: (state) => state.drawerDefaultNav,
};
