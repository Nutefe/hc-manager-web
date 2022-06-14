import { startCase } from "~/helpers/helpers.js";

export const mixinCcom = {
    props: {
        profileRoute: {
            type: Object,
            default: null,
            required: true,
        },
        dashboardRoutes: {
            type: Object,
            default: null,
            required: true,
        },
        facturesRoutes: {
            type: Object,
            default: null,
            required: true,
        },
        patientsRoutes: {
            type: Object,
            default: null,
            required: true,
        },
        paiementsRoutes: {
            type: Object,
            default: null,
            required: true,
        },
        gestionRoutes: {
            type: Object,
            default: null,
            required: true,
        },
        parameterRoutes: {
            type: Object,
            default: null,
            required: true,
        },
        logout: {
            type: Object,
            default: null,
            required: true,
        },
    },

    computed: {
        drawer: {
            get() {
                return this.$store.getters.drawer;
            },
            set(newValue) {
                this.$store.dispatch("toggleDrawer", newValue);
            },
        },

        avatar() {
            if (this.$auth.user) {
                return this.$auth.user.avatar || "/img/avatar.png";
            } else {
                return "";
            }
        },
        fullname() {
            if (this.$auth.user) {
                const title = `${this.$auth.user.nom} ${this.$auth.user.prenom}`;
                return startCase(title);
            } else {
                return "";
            }
        },
    },
    methods: {
        async logoutUser() {
            if (this.$vuetify.breakpoint.mobile) {
                this.$store.dispatch("toggleDrawer", false);
            }

            const result = await this.$swal({
                icon: "question",
                titleText: this.$t("logout.message"),
                confirmButtonText: this.$t("commoin.actions.yes"),
                cancelButtonText: this.$t("commoin.actions.no"),
                confirmButtonAriaLabel: this.$t("commoin.actions.yes"),
                cancelButtonAriaLabel: this.$t("commoin.actions.no"),
                showCancelButton: true,
                allowOutsideClick: () => {
                    const popup = this.$swal.getPopup();
                    popup.classList.remove("swal2-show");
                    setTimeout(() => {
                        popup.classList.add(
                            "animate__animated",
                            "animate__headShake"
                        );
                    });
                    setTimeout(() => {
                        popup.classList.remove(
                            "animate__animated",
                            "animate__headShake"
                        );
                    }, 500);
                    return false;
                },
            });

            if (result.isConfirmed) {
                await this.$auth.logout();
                this.$store.dispatch("resetState");
                this.$toast.success(this.$t("logout.loggedOut"));
            } else if (this.$vuetify.breakpoint.smAndDown) {
                this.$store.dispatch("toggleDrawer", true);
            }
        },
    },
};
