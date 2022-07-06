
export default ($axios, $auth) => ({

    /**
     * start users axios api
     */

    getUserConnect() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/utilisateur/me`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveUser(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/utilisateur`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUser(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/utilisateur/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUserConnect(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/utilisateur/connect`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePasswordUserConnect(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/utilisateur/password`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePasswordUser(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/utilisateur/password/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUsername(username) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/username/${username}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserUsernameUpdate(username, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/username/update/${id}/${username}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserCennectUsernameUpdate(username) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/username/update/${username}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkEmail(email) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/email/${email}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserEmailUpdate(email, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/email/update/${id}/${email}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserCennectEmailUpdate(email) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/email/update/${email}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectOneUser(id) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/utilisateur/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllUser() {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/utilisateurs`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllUserPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/utilisateurs/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllUserPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/utilisateurs/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    deleteAccount(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$delete(`/utilisateur/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end users axios api
     */

    /**
     * start profil axios api
     */
    selectOneProfil(id) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/profil/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllProfil() {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/profils`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllProfilPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/profils/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllProfilPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/profils/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveProfil(profil) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/profil`, profil, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateProfil(profil, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/profil/${id}`, profil, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end profil axios api
     */

    /**
     * start type patient axios api
     */

    getTypePatient(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/type/patient/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllTypePatient() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/type/patients`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllTypePatientPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/type/patients/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllTypePatientPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/type/patients/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveTypePatient(type) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/type/patient`, type, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateTypePatient(type, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/type/patient/${id}`, type, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end type patient axios api
     */

    /**
     * start type traitement axios api
     */

    getTypeTraitement(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/type/traitement/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllTypeTraitement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/type/traitements`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllTypeTraitementPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/type/traitements/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllTypeTraitementPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/type/traitements/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveTypeTraitement(type) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/type/traitement`, type, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateTypeTraitement(type, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/type/traitement/${id}`, type, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end type traitement axios api
     */

    /**
     * start assurance axios api
     */

    getAssurance(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/assurance/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllAssurance() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/assurances`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllAssuranceAutre() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/assurances/autre`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllAssurancePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/assurances/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllAssurancePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/assurances/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveAssurance(assurance) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/assurance`, assurance, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateAssurance(assurance, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/assurance/${id}`, assurance, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end assurance axios api
     */

    /**
     * start entreprise axios api
     */

    getEntreprise(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/entreprise/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllEntreprise() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/entreprises`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllEntreprisePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/entreprises/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllEntreprisePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/entreprises/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveEntreprise(entreprise) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/entreprise`, entreprise, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateEntreprise(entreprise, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/entreprise/${id}`, entreprise, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkRaisonSocial(nom) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/raison/social/${nom}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkRaisonSocialUpdate(nom, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/raison/social/update/${id}/${nom}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },


    checkTelephone(telephone) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/email/${telephone}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkTelephoneUpdate(telephone, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/telephone/update/${id}/${telephone}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end entreprise axios api
     */

    /**
     * start kota axios api
     */

    getKota(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/kota/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllKota() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/kotas`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllKotaPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/kotas/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllKotaPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/kotas/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveKota(kota) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/kota`, kota, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateKota(kota, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/kota/${id}`, kota, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end kota axios api
     */

    /**
     * start patient axios api
     */

    getPatient(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/patient/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllPatient() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/patients`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllPatientNonAssurer() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/patients/non/assurer`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllPatientAssurer() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/patients/assurer`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllPatientPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/patients/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllPatientPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/patients/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    savePatient(patient) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/patient`, patient, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    savePatientInam(patient) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/patient/assurer/inam`, patient, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    savePatientAutre(patient) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/patient/assurer/autre`, patient, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePatient(patient, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/patient/${id}`, patient, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkCodeDossier(codeDossier) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/code/${codeDossier}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkCodeDossierUpdate(codeDossier, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/code/update/${id}/${codeDossier}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end patient axios api
     */

    /**
     * start traitement axios api
     */

    getTraitement(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/traitement/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllTraitement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/traitements`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllTraitementTypePatient(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/traitements/type/patient/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllTraitementPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/traitements/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllTraitementPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/traitements/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveTraitement(traitement) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/traitement`, traitement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateTraitement(traitement, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/traitement/${id}`, traitement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end traitement axios api
     */

    /**
     * start facture axios api
     */

    getFacture(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/facture/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllFacture() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/factures`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    selectAllFacturePage(page) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/factures/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllFacturePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    selectAllFactureSoldePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/solde/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllFactureSoldePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/solde/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    selectAllFactureNotSoldePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/not/solde/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllFactureNotSoldePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/not/solde/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    selectAllFactureEncPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/enc/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllFactureEncPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/enc/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveFacture(facture) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/facture`, facture, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    async saveFacture1(facture) {

        await $axios.$post(`/facture`, facture, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
            responseType: 'arraybuffer'
        }).then(function (response) {
            const blob = new Blob([response], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        })
            .catch({
                // console.log(err)
            });
    },


    updateFacture(facture, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/facture/${id}`, facture, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    async updateFacture1(facture, id) {

        await $axios.$put(`/facture/${id}`, facture, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
            responseType: 'arraybuffer'
        }).then(function (response) {
            const blob = new Blob([response], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        })
            .catch({
                // console.log(err)
            });
    },

    /**
     * end facture axios api
     */

    /**
     * start paiement axios api
     */
    getPaiement(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/encaissement/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllPaiement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/encaissements`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    selectAllPaiementPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissements/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllPaiementPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissements/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    selectAllDayPaiementPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissements/day/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDayPaiementPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissements/day/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    savePaiement(paiement) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/paiement`, paiement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePaiement(paiement, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/paiement/${id}`, paiement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end paiement axios api
     */

    /**
     * start fiche axios api
     */
    getFicheTraitement(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/fiche/traitement/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end fiche axios api
     */

});
