<template>
  <v-container class="text-center">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="stat in stats.first"
            :key="`first-${stat.title}`"
            cols="12"
            sm="6"
            md="4"
          >
            <StatCard :stat="stat" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',

  computed: {
    stats() {
      const stats = {
        first: [
          {
            title: this.$t('dashboard.recette'),
            value: '',
            color: 'blue lighten-1',
            icon: 'mdi-page-layout-footer',
            to: '/operations/recettes',
          },
          {
            title: this.$t('dashboard.depense'),
            value: '',
            color: 'orange lighten-2',
            icon: 'mdi-progress-pencil',
            to: '/operations/depenses',
          },
          {
            title: this.$t('dashboard.banque'),
            value: '',
            color: 'red lighten-2',
            icon: 'mdi-bank',
            to: '/finances/banques',
          },
          {
            title: this.$t('dashboard.caisse'),
            value: '',
            color: 'primary lighten-2',
            icon: 'mdi-cash-100',
            to: '/finances/caisses',
          },
        ],
      }

      return stats
    },
  },
}
</script>
