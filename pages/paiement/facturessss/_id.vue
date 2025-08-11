<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="300" src="/img/doctors.svg" contain></v-img>

          <v-card-title> {{ patient.nom }} {{ patient.prenom }} </v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="text-left">
                <v-chip
                  >{{ $t('patient.numDossier') }}
                  {{ patient.codeDossier }}</v-chip
                >
              </div>

              <v-spacer></v-spacer>
              <div class="grey--text my-4 ms-4 text-right">
                <v-chip>
                  {{ $t('patient.age') }} {{ bithday }} {{ $t('patient.year') }}
                </v-chip>
              </div>
            </v-row>

            <v-row align="center" class="mx-0">
              <div class="my-4 text-subtitle-1">
                {{ $t('patient.form.sexe') }}: {{ patient.genre }}
              </div>
              <v-spacer />
              <div class="my-4 text-subtitle-1">
                {{ $t('patient.tel') }} {{ patient.telephone }}
              </div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              {{ patient.typePatient.libelle }}
            </div>

            <div>
              {{ patient.adresse }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <div v-if="patient.assurance">
            <v-card-title>{{ patient.assurance.libelle }}</v-card-title>

            <v-card-title v-if="patient.entreprise">{{
              patient.entreprise.raisonSocial
            }}</v-card-title>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" class="mb-10">
        <v-row class="mt-2 mb-2">
          <v-col cols="12" sm="3"></v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.lazy.trim="query"
              append-icon="mdi-magnify"
              :placeholder="$t('user.search')"
              autocomplete="off"
              type="search"
              clearable
              single-line
              hide-details
              rounded
              outlined
              filled
              solo
              dense
              @input="filter"
              @click:append="filter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3"></v-col>
        </v-row>
        <v-timeline dense>
          <v-timeline-item
            v-for="item in itemsList"
            :key="item.id"
            color="cyan"
            small
            right
          >
            <template #opposite>
              <span
                class="font-weight-bold cyan--text"
                v-text="item.dateFiche"
              ></span>
            </template>
            <div class="py-4">
              <h2 class="headline font-weight-light mb-4 cyan--text">
                {{ item.dateFiche }}
              </h2>
              <v-expansion-panels v-if="item.traitements" accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <h3>{{ $t('traitement.title') }}</h3>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="pa-3">
                    <v-row
                      v-for="t in item.traitements"
                      :key="t.traitement.id"
                      justify="center"
                    >
                      <div>{{ t.traitement.libelle }}</div>
                      <v-spacer></v-spacer>
                      <div>{{ t.traitement.typeTraitement.libelle }}</div>
                      <v-spacer></v-spacer>
                      <div class="py-1">
                        <v-chip color="primary"
                          >XOF {{ t.traitement.price }}</v-chip
                        >
                      </div>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { startCase } from '~/helpers/helpers.js'
import { yaer } from '~/helpers/customValidators.js'

export default {
  name: 'DetailPatient',

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      show: false,
      years: [
        {
          color: 'cyan',
          year: '1960',
        },
      ],
      id: 0,
      id_fiche: 0,
    }
  },

  async fetch({ store, error, params }) {
    try {
      //   this.id = params.id
      await Promise.all([
        await store.dispatch('facture/fetchFacture', params.id),
        await store.dispatch('traitement/fetchAllTraitementFiche', params.id),
      ])
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
  },

  computed: {
    itemsList() {
      if (this.traitements && this.traitements.data) {
        return this.traitements.data
      } else {
        return []
      }
    },

    patientId() {
      if (this.facture?.patient && this.facture?.patient.id) {
        return this.facture?.patient.id
      } else {
        return 0
      }
    },

    // currentPage() {
    //   if (this.fiches) {
    //     return this.fiches.current_page || 1
    //   } else {
    //     return 1
    //   }
    // },

    // isDividerVisible() {
    //   if (this.fiches) {
    //     const total = this.fiches.total || 0
    //     const perPage = this.fiches.per_page || 0
    //     return total > perPage
    //   } else {
    //     return false
    //   }
    // },

    bithday() {
      if (this.facture?.patient) {
        return parseInt(yaer(this.facture?.patient.dateNaiss))
      } else {
        return 0
      }
    },

    ...mapState({
      facture: (state) => state.facture || {},
      patient: (state) => state.facture?.patient || {},
      traitements: (state) => state.traitement.allTraitementsFiche || {},
    }),
  },
  watch: {
    // query(newValue) {
    //   this.query = this.removeSpecialCharacters(newValue)
    // },
  },
  methods: {
    removeSpecialCharacters(charactersString) {
      return charactersString.replace(/[#$%^&*.?()\d[\]{}_]/gi, '')
      // return charactersString.replace(/[^\w\s]/gi, '')
    },
    toggleLoading(value) {
      this.loading = value
    },
    startCase(str) {
      if (str) {
        return startCase(str)
      } else {
        return 'n/a'
      }
    },

    replace(str) {
      if (str) {
        if (str.includes('/')) return str.replaceAll('/', '-')
        else if (str.includes('-')) return str.replaceAll('-', '&&')
        else return str
      } else {
        return 'n/a'
      }
    },
    // async fetchData(page) {
    //   this.loading = true

    //   try {
    //     if (this.query) {
    //       await this.$store.dispatch('fiche/searchFiches', {
    //         id: this.patientId,
    //         page,
    //         s: this.replace(this.query),
    //       })
    //     } else {
    //       await this.$store.dispatch('fiche/fetchFiches', {
    //         id: this.patientId,
    //         page,
    //       })
    //     }
    //   } catch (err) {
    //     this.$nuxt.error({
    //       statusCode: 503,
    //       message: 'Unable to fetch data.',
    //     })
    //   }
    //   this.loading = false
    // },

    // refreshPage(payload) {
    //   let page = 1
    //   if (payload === 1) {
    //     page = this.currentPage
    //   }
    //   this.fetchData(page)
    // },

    // filter: debounce(function () {
    //   this.fetchData(1)
    // }),
  },
}
</script>
<style scoped>
.v-timeline::before {
  top: 55px;
  height: calc(100% - 110px);
}
</style>
