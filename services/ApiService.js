
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
    selectAllUserCaisse() {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/utilisateurs/caisse`, {
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
        return $axios.$post(`/check/code`, codeDossier, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkCodeDossierUpdate(codeDossier, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/code/update/${id}`, codeDossier, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    countPatient() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/patient/count`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    countPatientDay() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/patient/count/day`, {
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

    countTraitement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/traitement/count`, {
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
    selectAllFactureDayPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/day/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllFactureDayPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/factures/day/search/page/${page}/${s}`, {
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

    async saveFactureProforma(facture) {

        await $axios.$post(`/facture/proforma`, facture, {
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

    async loardFacture(filename) {

        await $axios.$get(`/downloadFile/facture/${filename}`, {
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

    countFactureDay() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/facture/count/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    countFacture() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/facture/count`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },// 
    acompteFacture() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/facture/acompte/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    montantFacture() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/facture/montant/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
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

    selectAllDayFacturePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissements/facture/day/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDayFacturePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissement/facture/day/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    savePaiement(paiement) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/encaissement`, paiement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    async savePaiement1(paiement) {

        await $axios.$post(`/encaissement`, paiement, {
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

    countPaiementDay() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/encaissement/count/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    countPatientEncDay() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/encaissement/patient/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantPaiementDay() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/encaissement/montant/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    montantPaiement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/encaissement/montant`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllPaiementDatePage(page, date) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissements/etat/date/page/${page}/${date}/`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllPaiementDatePage(page, date, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/encaissement/etat/date/search/page/${page}/${date}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectEtatRecette(start, end) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/recette/etat/date/${start}/${end}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    async getEtatCaisse() {

        await $axios.$get(`/etat/caisse`, {
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

    /**
     * start etat axios api
     */

    getEtat(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/etat/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllEtat() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/etats`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllEtatsPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/etats/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllEtatsPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/etats/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    async saveEtatPatient(etat) {

        await $axios.$post(`/etat/patient`, etat, {
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

    async saveEtatEntreprise(etat) {

        await $axios.$post(`/etat/entreprise`, etat, {
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
     * end etat axios api
     */

    /**
     * start fiche axios api
     */

    selectAllFichePatientPage(id, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/fiches/page/${id}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllFichePatientPage(id, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/fiches/search/page/${id}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    /**
     * end fiche axios api
     */


    /**
     * start caisse axios api
     */

    getCaisse(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/caisse/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getCaisseUtilisateur() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/caisse/utilisateur`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllCaisses() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/caisses`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    selectAllCaissePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/caisses/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllCaissePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/caisses/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveCaisse(caisse) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/caisse`, caisse, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },


    saveCaisseLigne(caisse) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/ligne/caisse`, caisse, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateCaisse(caisse, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/ligne/caisse/${id}`, caisse, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end caisse axios api
     */

    /**
     * start reserve axios api
     */

    getReserve(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/reserve/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllReserves() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/reserves`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    selectAllReservePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/reserves/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllReservePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/reserves/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },


    makeReserve(reserve) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/reserve/journaliere`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    saveReserve(reserve) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/reserve`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateReserve(reserve, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/reserve/${id}`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantReserve() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/reserve/montant`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantTodayReserve() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/reserve/day`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    montantDateReserve(date) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/reserve/date/${date}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end reserve axios api
     */

    /**
     * start depense reserve axios api
     */

    getDepenseReserve(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/depense/reserve/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllDepenseReserves() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/depense/reserves`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    selectAllDepenseReservePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/depense/reserves/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDepenseReservePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/depense/reserves/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveDepenseReserve(reserve) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/depense/reserve`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveReserveJour(reserve) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/reserve/jours`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateDepenseReserve(reserve, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/depense/reserve/${id}`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantDepenseReserve() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/depense/reserve/montant`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantTodayDepenseReserve() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/depense/reserve/montant/today`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    montantDateDepenseReserve(date) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/depense/reserve/montant/date/${date}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    async getEtatReserve() {

        await $axios.$get(`/etat/reserve`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
            responseType: 'arraybuffer'
        }).then(function (response) {
            const blob = new Blob([response], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }).catch({
            // console.log(err)
        });
    },

    /**
     * end depense reserve axios api
     */

    /**
     * start decaissement axios api
     */

    getDecaissement(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllDecaissements() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissements`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    selectAllDecaissementPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDecaissementPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDecaissementTodayPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/today/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDecaissementTodayPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/today/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDecaissementDatePage(date, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/date/page/${date}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDecaissementDatePage(date, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/date/search/page/${date}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDecaissementCaissePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/caisse/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDecaissementCaissePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/caisse/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDecaissementCaisseTodayPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/caisse/today/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDecaissementCaisseTodayPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/caisse/today/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    selectAllDecaissementCaisseDatePage(date, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/caisse/date/page/${date}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    searchAllDecaissementCaisseDatePage(date, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/decaissements/caisse/date/search/page/${date}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveDecaissement(reserve) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/decaissement`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateDecaissement(reserve, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/decaissement/${id}`, reserve, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantDecaissement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/montant`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantTodayDecaissement() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/montant/today`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    montantDateDecaissement(date) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/montant/date/${date}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantDecaissementCaisse() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/caisse/montant`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    montantTodayDecaissementCaisse() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/caisse/montant/today`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    montantDateDecaissementCaisse(date) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/decaissement/caisse/montant/date/${date}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end decaissement axios api
     */

    /**
     * start document axios api
     */

    getDocument(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/assurance/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllDocument() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/documents`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllDocumentPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/documents/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllDocumentPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/documents/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveDocument(document) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/document`, document, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateDocument(document, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/document/${id}`, document, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    async loardDocument(filename) {

        await $axios.$get(`/downloadFile/${filename}`, {
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

    async loardDocumentAtt(filename) {

        await $axios.$get(`/downloadFile/attachment/${filename}`, {
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
     * end document axios api
     */

});
