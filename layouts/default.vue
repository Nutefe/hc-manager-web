<template>
  <v-app>
    <MenuDrawer
      v-if="$vuetify.breakpoint.mobile"
      :profile-route="profileRoute"
      :logout="logout"
      :dashboard-routes="dashboardRoutes"
      :factures-routes="facturesRoutes"
      :patients-routes="patientsRoutes"
      :paiements-routes="paiementsRoutes"
      :gestion-routes="gestionRoute"
      :parameter-routes="parameterRoute"
    />
    <MenuAppBar
      :profile-route="profileRoute"
      :logout="logout"
      :dashboard-routes="dashboardRoutes"
      :factures-routes="facturesRoutes"
      :patients-routes="patientsRoutes"
      :paiements-routes="paiementsRoutes"
      :gestion-routes="gestionRoute"
      :parameter-routes="parameterRoute"
    />
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import MenuAppBar from '~/components/menu/MenuAppBar.vue'
import MenuDrawer from '~/components/menu/MenuDrawer.vue'
import FooterBar from '~/components/menu/FooterBar.vue'

export default {
  name: 'DefaultLayout',

  components: {
    MenuAppBar,
    MenuDrawer,
    FooterBar,
  },

  data() {
    return {
      profileRoute: {
        title: this.$t('profil.title'),
        subtitle: this.$t('profil.subtitle'),
        path: '/users/profil',
      },
      logout: {
        title: this.$t('logout.action'),
        icon: 'mdi-logout',
      },
      dashboardRoutes: {
        title: this.$t('navigation.dashboard'),
        path: '/',
        icon: 'mdi-view-dashboard',
      },
      facturesRoutes: {
        title: this.$t('navigation.facture'),
        path: '/secretariat/factures',
        icon: 'mdi-receipt-text-check',
      },
      patientsRoutes: {
        title: this.$t('navigation.patient'),
        path: '/secretariat/patients',
        icon: 'mdi-account-group',
      },
      paiementsRoutes: {
        title: this.$t('navigation.paiement'),
        path: '/paiement/paiements',
        icon: 'mdi-cash',
        paths: [
          {
            title: this.$t('navigation.paiement'),
            path: '/paiement/paiements',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.decaissements'),
            path: '/paiement/decaissements',
            icon: 'mdi-account-multiple',
          },
          {
            title: this.$t('navigation.depense'),
            path: '/paiement/depenses',
            icon: 'mdi-file-chart-outline',
          },
        ],
      },

      gestionRoute: {
        title: this.$t('navigation.gestion'),
        icon: 'mdi-filter',
        paths: [
          {
            title: this.$t('navigation.traitement'),
            path: '/gestion/traitements',
            icon: 'mdi-account-multiple',
          },
          {
            title: this.$t('navigation.assurance'),
            path: '/gestion/assurances',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.entreprise'),
            path: '/gestion/entreprises',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.etatRecap'),
            path: '/gestion/etat',
            icon: 'mdi-cart-arrow-down',
          },
        ],
      },

      parameterRoute: {
        title: this.$t('navigation.setting'),
        icon: 'mdi-tune',
        paths: [
          {
            title: this.$t('navigation.users'),
            path: '/parametre/utilisateurs',
            icon: 'mdi-account',
          },
          {
            title: this.$t('navigation.profil'),
            path: '/parametre/profils',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.caisses'),
            path: '/parametre/caisses',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.typePatient'),
            path: '/parametre/type/patients',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.typeTraitement'),
            path: '/parametre/type/traitements',
            icon: 'mdi-file-chart-outline',
          },
          {
            title: this.$t('navigation.etatEnc'),
            path: '/parametre/etat-encaissements',
            icon: 'mdi-state-machine',
          },
          {
            title: this.$t('navigation.reserves'),
            path: '/parametre/reserves',
            icon: 'mdi-file-chart-outline',
          },
        ],
      },
    }
  },
}
</script>
