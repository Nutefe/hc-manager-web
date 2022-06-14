import { startCase } from "~/helpers/helpers.js";

export const mixinProfils = {

    computed: {

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

        isSys() {
            if (this.$auth.user) {
                const isPresent = this.$auth.user.profils.find((o) => o.id === 1);
                return isPresent;
            } else {
                return false
            }
        },
        isDirecteur() {
            if (this.$auth.user) {
                const isPresent = this.$auth.user.profils.find((o) => o.id === 2);
                return isPresent;
            } else {
                return false
            }
        },
        isSecretaire() {
            if (this.$auth.user) {
                const isPresent = this.$auth.user.profils.find((o) => o.id === 3);
                return isPresent;
            } else {
                return false
            }
        },
        isCaisse() {
            if (this.$auth.user) {
                const isPresent = this.$auth.user.profils.find((o) => o.id === 4);
                return isPresent;
            } else {
                return false
            }
        },
        isGestionnaire() {
            if (this.$auth.user) {
                const isPresent = this.$auth.user.profils.find((o) => o.id === 5);
                return isPresent;
            } else {
                return false
            }
        },
    },
};
