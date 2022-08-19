<template>
  <v-container class="text-center">
    <v-row justify="center" align="center">
      <v-col cols="10">
        <v-row>
          <v-col
            v-for="stat in stats.first"
            :key="`first-${stat.title}`"
            cols="12"
            sm="6"
            md="6"
          >
            <StatCard :stat="stat" />
          </v-col>
        </v-row>
        <v-row v-if="isDirecteur || isSys">
          <v-col
            v-for="stat in stats.second"
            :key="`first-${stat.title}`"
            cols="12"
            sm="6"
            md="6"
          >
            <StatCard :stat="stat" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mixinProfils } from '~/mixins/mixinProfils.js'

export default {
  name: 'IndexPage',

  mixins: [mixinProfils],

  layout: 'default',

  async fetch() {
    try {
      await Promise.all([
        this.$store.dispatch('paiement/fetchCountPaiementDay'),
        this.$store.dispatch('paiement/fetchMontantPaiementDay'),
        this.$store.dispatch('patient/fetchCountPatient'),
        this.$store.dispatch('patient/fetchCountPatientDay'),
        this.$store.dispatch('facture/fetchCountFacture'),
        this.$store.dispatch('facture/fetchCountFactureDay'),
        this.$store.dispatch('traitement/fetchCountTraitement'),
      ])
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
  },

  computed: {
    stats() {
      const stats = {
        first: [
          {
            title: this.$t('dashboard.factures'),
            value: this.countFactureDay,
            color: 'blue lighten-1',
            icon: 'mdi-receipt-text-plus',
            to: '/dashboard/factures',
          },
          {
            title: this.$t('dashboard.encaissements'),
            value: this.countPaiementDay,
            color: 'red lighten-2',
            icon: 'mdi-cash-fast',
            to: '/paiement/factures',
          },
        ],
        second: [
          {
            title: this.$t('dashboard.patients'),
            value: this.countPatientDay,
            color: 'orange lighten-2',
            icon: 'mdi-account-group',
            to: '/secretariat/patients',
          },
          // {
          //   title: this.$t('dashboard.totalFactures'),
          //   value: this.countFacture,
          //   color: 'blue lighten-1',
          //   icon: 'mdi-receipt-text-check',
          //   to: '/secretariat/factures',
          // },
          {
            title: this.$t('dashboard.montantEncaisse'),
            value: this.montantPaiementDay,
            color: 'orange lighten-2',
            icon: 'mdi-cash-multiple',
            to: '/paiement/factures',
          },
          // {
          //   title: this.$t('dashboard.totalTraitements'),
          //   value: this.countTraitement,
          //   color: 'red lighten-2',
          //   icon: 'mdi-apps-box',
          //   to: '/gestion/traitements',
          // },
        ],
      }

      return stats
    },

    ...mapState({
      countPaiementDay: (state) => state.paiement.countPaiementDay,
      montantPaiementDay: (state) => state.paiement.montantPaiementDay,
      countFactureDay: (state) => state.facture.countFactureDay,
      countTraitement: (state) => state.traitement.countTraitement,
      countPatient: (state) => state.patient.countPatient,
      countPatientDay: (state) => state.patient.countPatientDay,
      countFacture: (state) => state.facture.countFacture,
    }),
  },
}
</script>
