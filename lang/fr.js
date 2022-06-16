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
        recette: "Recettes",
        depense: "Depenses",
        banque: "Banques",
        caisse: "Caisses",
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
    patient: {
        title: "Paients",
        new: "Nouveau patient",
        edit: "Modifier un patient",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre patient",
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
        },
        saved: "Enregistré avec succès.",
        noData: "Aucune donnée disponible",
        errorOccured: "Une erreur est survenue. Veuillez réessayer.",
        copyright: "Blue`Rizon tous droits réservés",

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
        sexe: {
            required: "Le genre est obligatoire.",
        },
    },
}