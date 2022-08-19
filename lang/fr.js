export default {
    // Project
    brand: {
        title: "E2V MANAGER",
        description: "Mini projet de gestion"
    },

    // Navigation Drawer
    navigation: {
        dashboard: "Dashboard",
        facture: "Factures",
        patient: "Patients",
        entreprise: "Entreprises",
        paiement: "Paiements",
        traitement: "Traitement",
        typePatient: "Types patients",
        typeTraitement: "Types traitements",
        etatEnc: "Etat encaissement",
        profil: "Profils",
        kota: "Kotas",
        assurance: "Assurances",
        users: "Utilisateurs",
        gestion: "Gestion",
        rapport: "Rapports",
        etatRecap: "Etat recapitulatif",
        setting: "Parametre",
    },

    // Connexion
    logins: {
        login: "Connexion",
        logout: "Deconnexion",
        accessDenied: "Accès refusé vous n'avez pas l'autorisation pour accéder à cette application",
        success: "Connexion effectuer avec succès.",
        loginFailed: "Nom d'utilisateur ou mot de passe incorrect.",
        loggedOut: "Déconnexion effectuer avec succès.",
        errorOccured: "Une erreur est survenue lors de la connexion.",
    },

    // Déconnexion
    logout: {
        action: "Déconnexion",
        message: "Prêt à quitter ?",
        loggedOut: "Déconnexion effectuer avec succès.",
    },

    drawer: {
        open: "Ouvrir le tiroir de navigation",
        close: "Fermer le tiroir de navigation",
    },

    // Navigation Bar
    navbar: {
        home: "Accueil",
        login: "Se Connecter",
        register: "S'Inscrire",
        search: "Recherche",
    },

    search: {
        title: "Recherche",
        placeholder: "Rechercher des artisans...",
        emptyQuery: "En attente de votre recherche !",
        results: "0 résultat | {count} résultat | {count} résultats",
    },

    // Profil
    profil: {
        title: "Mon profil",
        subtitle: "Voir votre profil",
        accountDisabledMessage: `
            <p style="margin-bottom: 10px;">Votre compte étant désactivé, vous ne pouvez pas faire de publications.</p>
            <p>Veuillez contacter la CRM-LOMÉ afin de procéder à l'activation de votre compte.</p>
        `,
        edit: {
            title: "Éditer le profil",
            sections: {
                one: {
                    title: "Éditer vos infos de compte",
                    label: "Infos du compte",
                },
                two: {
                    title: "Changer votre mot de passe",
                    label: "Mot de passe",
                },
                three: {
                    title: "Éditer vos infos personnelles",
                    label: "Infos personnelles",
                },
                four: {
                    title: "Éditer vos infos professionnelles",
                    label: "Infos professionnelles",
                },
                five: {
                    title: "Éditer vos profils sociaux",
                    label: "Profils sociaux",
                },
            },
        },
        photo: {
            update: "Mettre à jour la photo de profil",
            saved: "Photo de profil mis à jour avec succès.",
        },
    },

    connexion: {
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        login: "Connexion",
        newAccount: "Vous n'avez pas de compte ?",
        signUp: "S'inscrire",
        forgetPassword: "Mot de passe oublié?"
    },

    siginup: {
        username: "Nom d'utilisateur",
        email: "Email",
        surname: "Nom",
        password: "Mot de passe",
        save: "Valider",
        account: "Vous avez un compte ?",
        sigin: "Se connecter",
        forgetPassword: "Mot de passe oublié?"
    },

    password: {
        back: "Retour",
        send: "Envoyer",
        message: "Entrez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe",
        newPassword: "Nouveu mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        email: "Votre email",
    },

    dashboard: {
        factures: "Factures/Jrs",
        encaissements: "Encaissements/Jrs",
        patients: "Patients",
        totalFactures: "Factures Au Total",
        montantEncaisse: "Encaisser Aujourd'hui",
        totalPatients: "Patients au total",
        totalTraitements: "Traitements",
    },


    user: {
        title: "Utilisateurs",
        new: "Nouveau utilisateur crm",
        edit: "Modifier un utilisateur",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            username: "Nom d'utilisateur",
            email: "Email",
            nom: "Nom",
            prenom: "Prenom",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            profil: "Profil",
        },
        table: {
            num: "N°",
            username: "Nom d'utilisateur",
            email: "Email",
            nom: "Nom",
            prenom: "Prenom",
            profil: "Profil",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    profils: {
        title: "Profils",
        new: "Nouveau profil",
        edit: "Modifier un profil",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            libelle: "libelle",
        },
        table: {
            num: "N°",
            libelle: "libelle",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    types: {
        title: "Types",
        new: "Nouveau type",
        edit: "Modifier un type",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre type",
        form: {
            libelle: "libelle",
        },
        table: {
            num: "N°",
            libelle: "libelle",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    assurance: {
        title: "Assurances",
        new: "Nouveau assurance",
        edit: "Modifier une assuraance",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre assurance",
        form: {
            libelle: "libelle",
        },
        table: {
            num: "N°",
            libelle: "libelle",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    kota: {
        title: "Kotas",
        new: "Nouveau kota",
        edit: "Modifier un kota",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre kota",
        form: {
            libelle: "libelle",
        },
        table: {
            num: "N°",
            libelle: "libelle",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    entreprise: {
        title: "Entreprises",
        new: "Nouveau entreprise",
        edit: "Modifier un entreprise",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre entreprise",
        form: {
            raisonSocial: "Nom entreprise",
            nif: "Numéro d'identification fiscale",
            telephone: "Telephone",
            adresse: "Adresse",
        },
        table: {
            num: "N°",
            raisonSocial: "Nom entreprise",
            nif: "Numéro d'identification fiscale",
            telephone: "Telephone",
            adresse: "Adresse",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    traitement: {
        title: "Traitements",
        new: "Nouveau traitement",
        edit: "Modifier un traitement",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre traitement",
        form: {
            libelle: "Libelle",
            description: "Description",
            typeTraitement: "Type traitement",
            typePatient: "Type patient",
            price: "Prix"
        },
        table: {
            num: "N°",
            libelle: "Libelle",
            description: "Description",
            typeTraitement: "Type traitement",
            typePatient: "Type patient",
            price: "Prix",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },
    etat: {
        title: "Etats",
        new: "Nouveau etat",
        edit: "Modifier un etat",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre etat",
        type: {
            patient: "Grouper par patient",
            entreprise: "Grouper par entreprise",
        },
        form: {
            type: "Type",
            assurance: "Assurance",
            startDate: "Date debut",
            endDate: "Date Fin",
        },
        table: {
            num: "N°",
            type: "Type",
            assurance: "Assurance",
            startDate: "Date debut",
            endDate: "Date Fin",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },
    patient: {
        title: "Paients",
        new: "Nouveau patient non assurer",
        newInam: "Nouveau patient INAM",
        newAutre: "Nouveau patient assurer autre",
        edit: "Modifier un patient",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre patient",
        add: "Ajouter un patient non assurer",
        addAss: "Ajouter un patient assurer INAM",
        addAssAut: "Ajouter un patient assurer autre",
        addEntreprise: "Ajouter une entreprise s'il n'existe pas",
        year: "ans",
        age: "Age: ",
        numDossier: "N°: ",
        tel: "Tel: ",
        sexe: {
            feminin: "FEMININ",
            masculin: "MASCULIN",
            autre: "AUTRE",
        },
        form: {
            codeDossier: "Numero de dossier",
            typePatient: "Type de patient",
            assurance: "Assurace",
            entreprise: "Entreprise de travail",
            nom: "Nom du patient",
            prenom: "Prenom du patient",
            dateNaiss: "Date de naissance",
            sexe: "Genre",
            telephone: "Numero de telephone",
            adresse: "Adresse",
            numeroPiece: "Numero CNI",
            pieceExp: "Date d'expiration CNI"
        },
        table: {
            num: "N°",
            codeDossier: "Numero",
            typePatient: "Type de patient",
            assurance: "Assurace",
            entreprise: "Entreprise",
            nom: "Nom",
            prenom: "Prenom",
            dateNaiss: "Date de naissance",
            sexe: "Sexe",
            telephone: "Telephone",
            adresse: "Adresse",
            numeroPiece: "Numero CNI",
            pieceExp: "Date d'expiration CNI",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    facture: {
        title: "Factures",
        new: "Nouveau facture",
        newAss: "Nouveau facture assurer",
        edit: "Modifier un facture",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre facture",
        add: "Facture non assurer",
        addAss: "Facture assurer",
        addAssInam: "Facture assurer inam",
        montant: "Montant Facture",
        adds: {
            a1: "Ajouter les traitements au tableau",
            a2: "Veuillez renseigner les champs oblgatoire pour ajouter le traitement au taleau",
        },
        unite: {
            montant: "MONTANT",
            pourcentage: "POURCENTAGE",
        },
        form: {
            acompte: "Acompte",
            patient: "Patient",
            traitement: "Traitement",
            remise: "Remise",
            unite: "Unite",
            kota: "Kota",
            baseRembour: "Base de remboursement",
            baseRembourInam: "Base de remboursement inam",
            netAssurance: "Net paye par l'assurance",
            total: "Total",
        },
        table: {
            num: "N°",
            numero: "Numero facture",
            total: "Montant facture",
            acompte: "Acompte",
            remise: "Remise",
            reste: "Reste",
            patient: "Patient",
            typePatient: "Type patient",
            dateFacture: "Date",
            traitement: "Traitement",
            prix: "Prix",
            kota: "Kota",
            baseRembour: "Base remboursemnt",
            netAssurance: "Net assurance",
            encaisse: "Encaisse",
            solde: "Solde",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
        solde: {
            yes: "Oui",
            no: "Non",
        },
        encaisse: {
            total: "Total",
            partially: "Partiel",
            no: "Non",
        }
    },

    paiement: {
        title: "Paiement",
        new: "Nouveau paiement",
        edit: "Modifier un paiement",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre facture",
        add: "Payer une facture",
        etat: "Etats d'encaissements",
        calcul: "Calculer les etats d'encaissements",
        form: {
            facture: "FACTURE NUMERO:",
            nom: "Nom",
            acompte: "Acompte",
            patient: "Patient",
            traitement: "Traitement",
            remise: "Remise",
            total: "Total",
            montant: "Montant à payer",
            somme: "Somme reçu",
            date: "Date calcul",
        },
        table: {
            num: "N°",
            numero: "Numero facture",
            total: "Montant facture",
            acompte: "Acompte",
            remise: "Remise",
            reste: "Reste",
            patient: "Patient",
            typePatient: "Type patient",
            dateFacture: "Date de facturation",
            traitement: "Traitement",
            prix: "Prix",
            kota: "Kota",
            baseRembour: "Base remboursemnt",
            netAssurance: "Net assurance",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    // Error Page
    error: {
        pageNotFound: "Page introuvable",
        pageNotFoundMessage:
            "La page que vous recherchez est temporairement indisponible.",
        otherError: "Erreur inattendue",
        otherErrorMessage: "Une erreur inattendue s'est produite.",
    },

    commoin: {
        title: "Commoins",
        search: "Recherche...",
        add: "Ajouter",
        actions: {
            yes: "Oui",
            no: "Non",
            cancel: "Annuler",
            close: "Fermer",
            delete: "Supprimer",
            disable: "Désactiver",
            enable: "Activer",
            edit: "Éditer",
            editPass: "Éditer le mot de passe",
            finish: "Terminer",
            save: "Enregistrer",
            submit: "Valider",
            downloadAttachment: "Telecharger",
            detail: "Detail",
            show: "Voir",
            paid: "Payer",
        },
        saved: "Enregistré avec succès.",
        noData: "Aucune donnée disponible",
        errorOccured: "Une erreur est survenue. Veuillez réessayer.",
        copyright: "InnoS`Digital tous droits réservés",

    },

    validations: {
        username: {
            required: "Le nom d'utilisateur est obligatoire.",
            min: "Le nom d'utilisateur doit contenir au moins {length} caractères.",
            max: "Le nom d'utilisateur doit contenir au plus {length} caractères.",
            regex: "Ce nom d'utilisateur n'est pas valide.",
            unique: "Ce nom d'utilisateur n'est pas disponible.",
        },
        nom: {
            required: "Le nom est obligatoire.",
            min: "Le nom doit contenir au moins {length} caractères.",
            max: "Le nom doit contenir au plus {length} caractères.",
            regex: "Ce nom n'est pas valide.",
            unique: "Ce nom n'est pas disponible.",
        },
        prenom: {
            required: "Le prenom est obligatoire.",
            min: "Le prenom doit contenir au moins {length} caractères.",
            max: "Le prenom doit contenir au plus {length} caractères.",
            regex: "Ce prenom n'est pas valide.",
            unique: "Ce prenom n'est pas disponible.",
        },
        email: {
            required: "L'adresse email est obligatoire.",
            email: "Cette adresse email n'est pas valide.",
            max: "L'adresse email doit contenir au plus {length} caractères.",
            unique: "Cette adresse email est déjà utilisée.",
        },
        password: {
            required: "Le mot de passe est obligatoire.",
            correct: "Le mot de passe n'est pas correct.",
            min: "Le mot de passe doit comporter au moins {length} caractères.",
            lowercase:
                "Le mot de passe doit contenir au moins une lettre minuscule.",
            uppercase:
                "Le mot de passe doit contenir au moins une lettre majuscule.",
            number: "Le mot de passe doit contenir au moins un chiffre.",
            special:
                "Le mot de passe doit contenir au moins un caractère spécial.",
        },
        confirmPassword: {
            required: "Veuillez confirmer le mot de passe.",
            confirmed: "Le mot de passe ne correspond pas.",
        },

        profil: {
            required: "Le profil est obligatoire.",
        },

        numero: {
            required: "Le numero est obligatoire.",
            unique: "Ce numero n'est pas disponible.",
            min: "Le numero doit contenir au moins {length} caractères.",
            max: "Le numero doit contenir au plus {length} caractères.",
            exist: "Ce numero decodeur n'existe pas",
        },

        telephone: {
            required: "Le telephone est obligatoire.",
            min: "Le telephone doit contenir au moins {length} caractères.",
            max: "Le telephone doit contenir au plus {length} caractères.",
            regex: "Ce numéro de téléphone n'est pas valide.",
        },

        adresse: {
            required: "Le adresse est obligatoire.",
            min: "Le adresse doit contenir au moins {length} caractères.",
            max: "Le adresse doit contenir au plus {length} caractères.",
        },

        code: {
            required: "Le code est obligatoire.",
            unique: "Ce code n'est pas disponible.",
            min: "Le code doit contenir au moins {length} caractères.",
            max: "Le code doit contenir au plus {length} caractères.",
        },

        libelle: {
            required: "Le libelle est obligatoire.",
            min: "Le libelle doit contenir au moins {length} caractères.",
            max: "Le libelle doit contenir au plus {length} caractères.",
        },
        price: {
            required: "Le prix est obligatoire.",
            min: "Le prix doit contenir au moins {length} caractères.",
            max: "Le prix doit contenir au plus {length} caractères.",
        },
        montantInit: {
            required: "Le montant initial est obligatoire.",
            min: "Le montant initial  doit contenir au moins {length} caractères.",
            max: "Le montant initial  doit contenir au plus {length} caractères.",
        },
        montant: {
            required: "Le montant est obligatoire.",
            min: "Le montant  doit contenir au moins {length} caractères.",
            max: "Le montant  doit contenir au plus {length} caractères.",
            equal: "La somme remi doit etre  egale a l'acompte",
            equalmore: "La somme a paye doit etre inferieur ou egale au montant de la facture",
        },
        description: {
            required: "La description est obligatoire.",
            min: "Le description  doit contenir au moins {length} caractères.",
            max: "Le description doit contenir au plus {length} caractères.",
        },
        fichier: {
            required: "Le fichier est obligatoire.",
            type: "Veuillez choisir un fichier au format .pdf.",
        },
        raisonSocial: {
            required: "Le nom est obligatoire.",
            unique: "Ce nom n'est pas disponible.",
            min: "Le nom doit contenir au moins {length} caractères.",
            max: "Le nom doit contenir au plus {length} caractères.",
        },
        nif: {
            required: "Le nif est obligatoire.",
            min: "Le nif  doit contenir au moins {length} caractères.",
            max: "Le nif doit contenir au plus {length} caractères.",
        },

        typeTraitement: {
            required: "Le type de traitement est obligatoire.",
        },

        typePatient: {
            required: "Le type de patient est obligatoire.",
        },

        codeDossier: {
            required: "Le code dossier est obligatoire.",
            unique: "Ce code dossier n'est pas disponible.",
            min: "Le code dossier doit contenir au moins {length} caractères.",
            max: "Le code dossier doit contenir au plus {length} caractères.",
        },
        assurance: {
            required: "L'assurance est obligatoire.",
        },
        entreprise: {
            required: "L'entreprise est obligatoire.",
        },
        dateNaiss: {
            required: "La date de naissance est obligatoire.",
            min: "La date de naissance  doit contenir au moins {length} caractères.",
            max: "La date de naissance doit contenir au plus {length} caractères.",
        },
        dateEtat: {
            required: "La date de l'etat est obligatoire.",
            min: "La date de de l'etat  doit contenir au moins {length} caractères.",
            max: "La date de de l'etat doit contenir au plus {length} caractères.",
        },
        sexe: {
            required: "Le genre est obligatoire.",
        },
        acompte: {
            required: "L'acompte est obligatoire.",
            min: "L'acompte  doit contenir au moins {length} caractères.",
            max: "L'acompte doit contenir au plus {length} caractères.",
        },
        patient: {
            required: "Le patient est obligatoire.",
        },
        traitement: {
            required: "Le traitement est obligatoire.",
        },
        remise: {
            required: "La remise est obligatoire.",
            min: "La remise  doit contenir au moins {length} caractères.",
            max: "La remise doit contenir au plus {length} caractères.",
        },
        unite: {
            required: "L'unite est obligatoire.",
        },
        kota: {
            required: "Le kota est obligatoire.",
            min: "Le kota  doit contenir au moins {length} caractères.",
            max: "Le kota doit contenir au plus {length} caractères.",
        },
        baseRembour: {
            required: "La base de remboursement est obligatoire.",
            min: "La base de remboursement  doit contenir au moins {length} caractères.",
            max: "La base de remboursement doit contenir au plus {length} caractères.",
        },
        netAssurance: {
            required: "Le montant payer par l'assurance est obligatoire.",
            min: "Le montant payer par l'assurance  doit contenir au moins {length} caractères.",
            max: "Le montant payer par l'assurance doit contenir au plus {length} caractères.",
        },
        type: {
            required: "Le type est obligatoire.",
        },

        startDate: {
            required: "La date de debut est obligatoire.",
            min: "La date de debut  doit contenir au moins {length} caractères.",
            max: "La date de debut doit contenir au plus {length} caractères.",
        },
        endDate: {
            required: "La date de fin est obligatoire.",
            min: "La date de fin  doit contenir au moins {length} caractères.",
            max: "La date de fin doit contenir au plus {length} caractères.",
        },
        totalRemis: {
            required: "La somme remi est obligatoire.",
            min: "La somme remi  doit contenir au moins {length} caractères.",
            max: "La somme remi doit contenir au plus {length} caractères.",
            equalmore: "La somme remi doit etre  superieur ou egale a l'acompte",
            equal: "La somme remi doit etre  superieur ou egale a l'acompte",
        },

    },
}