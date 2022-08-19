<template>
  <v-container fluid class=" text-center">
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
        <v-row>
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
    <v-card class="mt-5 mb-15 pb-3 pt-5 justify-space-around">
      <v-row class="mt-3 mb-7">
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
      <v-data-table
        :headers="headers"
        :items="itemsList"
        item-key="id"
        :loading="loading"
        :mobile-breakpoint="960"
        disable-filtering
        disable-pagination
        disable-sort
        hide-default-footer
        :items-per-page="-1"
        :footer-props="{
          itemsPerPageOptions: [],
          showCurrentPage: true,
          showFirstLastPage: true,
        }"
      >
        <template #[`item.num`]="{ item }">
          {{ itemPosition(item.id) }}
        </template>

        <template #[`item.fiche.patient.nom`]="{ item }">
          <span>
            {{ item.fiche.patient.nom }}
            {{ startCase(item.fiche.patient.prenom) }}</span
          >
        </template>
        <template #[`item.total`]="{ item }">
          <span> {{ numberFormat(item.total) }} </span>
        </template>
        <template #[`item.acompte`]="{ item }">
          <span> {{ numberFormat(item.acompte) }} </span>
        </template>
        <template #[`item.remise`]="{ item }">
          <span> {{ numberFormat(item.remise) }} </span>
        </template>
        <template #[`item.reste`]="{ item }">
          <span> {{ numberFormat(item.reste) }} </span>
        </template>
        <template #[`item.solde`]="{ item }">
          <v-chip v-if="item.solde" color="blue" text-color="white"
            >{{ $t('facture.solde.yes') }}
          </v-chip>
          <v-chip v-else color="red" text-color="white">
            {{ $t('facture.solde.no') }}
          </v-chip>
        </template>
        <template #[`item.encaisse`]="{ item }">
          <v-chip v-if="item" color="primary"> {{ isEncaisser(item) }} </v-chip>
        </template>
        <template #[`item.action`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('commoin.actions.show')"
                v-on="on"
                @click.stop="loardFacture(item.fileName)"
              >
                <v-icon color="editIcone" small> mdi-eye </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.show') }}
            </span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-divider v-if="isDividerVisible" />
      <PaginationEtat
        v-if="query"
        :id="parseDate(form.dateEtat)"
        :search="query"
        store="paiement"
        collection="paiementDates"
        action="searchDatePaiement"
        page-mutation="SET_COUNT_DATE_PAIEMENTS"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <PaginationEtat
        v-else
        :id="parseDate(form.dateEtat)"
        store="paiement"
        collection="paiementDates"
        action="fetchDatePaiement"
        page-mutation="SET_COUNT_DATE_PAIEMENTS"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
    <v-tooltip left>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          class="mr-15 mb-10"
          color="secondary"
          elevation="10"
          dark
          fixed
          bottom
          right
          fab
          :aria-label="$t('paiement.etat')"
          @click.stop="dialog = true"
          v-on="on"
        >
          <v-icon>mdi-text-box-edit-outline</v-icon>
        </v-btn>
      </template>

      <span>
        {{ $t('paiement.etat') }}
      </span>
    </v-tooltip>
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      persistent
      scrollable
      max-width="700"
    >
      <v-card :disabled="loading" :loading="loading">
        <v-card-title class="px-3 px-md-5 py-2 py-md-3">
          <v-row align="center">
            <v-col cols="9">
              <span class="text-h6 text-md-h5 font-weight-regular">
                {{ $t('paiement.calcul') }}
              </span>
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-btn
                icon
                large
                :aria-label="$t('commoin.actions.close')"
                @click.stop="closeDialog"
              >
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-divider />

        <v-card-text class="px-3 px-md-5 pt-3">
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.dateEtat"
                    :label="$t('paiement.form.date')"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    :maxlength="$v.form.dateEtat.$params.maxLength.max"
                    :error-messages="dateEtatErrors"
                    @blur="
                      dateCalcul = parseDate(form.dateEtat)
                      $v.form.dateEtat.$touch()
                    "
                    @input="$v.form.dateEtat.$touch()"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateCalcul"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="py-4">
          <v-row
            align="center"
            justify="center"
            justify-sm="end"
            class="px-2 px-md-4 py-3"
          >
            <v-btn class="mr-3" text @click="closeDialog">
              {{ $t('commoin.actions.cancel') }}
            </v-btn>

            <v-btn
              :disabled="!isFormValid"
              color="primary"
              depressed
              @click="submitForm"
            >
              {{ $t('commoin.actions.save') }}
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import {
  debounce,
  startCase,
  numberFormat,
  capitalize,
} from '~/helpers/helpers.js'
import { isDate } from '~/helpers/customValidators.js'

export default {
  name: 'FacturesPage',

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      dialog: false,
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: true,
      right: true,
      bottom: false,
      left: false,
      transition: 'slide-y-reverse-transition',
      dateCalcul: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      form: {
        dateEtat: this.formatDate(
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        ),
      },
      headers: [
        {
          text: this.$t('facture.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('facture.table.patient'),
          align: 'start',
          value: 'fiche.patient.nom',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.total'),
          value: 'total',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.acompte'),
          value: 'acompte',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.remise'),
          value: 'remise',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.reste'),
          value: 'reste',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.typePatient'),
          value: 'fiche.patient.typePatient.libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.solde'),
          value: 'solde',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.encaisse'),
          value: 'encaisse',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.dateFacture'),
          value: 'dateFacture',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.action'),
          value: 'action',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          sortable: false,
          width: 150,
        },
      ],
    }
  },

  async fetch() {
    try {
      await Promise.all([
        // this.$store.dispatch('paiement/fetchCountPaiementDay'),
        // this.$store.dispatch('paiement/fetchMontantPaiementDay'),
        // this.$store.dispatch('patient/fetchCountPatient'),
        // this.$store.dispatch('patient/fetchCountPatientDay'),
        // this.$store.dispatch('facture/fetchCountFacture'),
        // this.$store.dispatch('facture/fetchCountFactureDay'),
        // this.$store.dispatch('traitement/fetchCountTraitement'),
        await this.$store.dispatch('paiement/fetchDatePaiement', {
          page: 1,
          date: this.parseDate(this.form.dateEtat),
        }),
      ])
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
  },

  validations: {
    form: {
      dateEtat: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
    },
  },

  computed: {
    isFormValid() {
      return !this.$v.form.$invalid
    },

    dateEtatErrors() {
      const errors = []

      if (!this.$v.form.dateEtat.$dirty) return errors

      !this.$v.form.dateEtat.required &&
        errors.push(this.$t('validations.dateEtat.required'))

      !this.$v.form.dateEtat.minLength &&
        errors.push(
          this.$t('validations.dateEtat.min', {
            length: this.$v.form.dateEtat.$params.minLength.min,
          })
        )

      !this.$v.form.dateEtat.maxLength &&
        errors.push(
          this.$t('validations.dateEtat.max', {
            length: this.$v.form.dateEtat.$params.maxLength.max,
          })
        )

      return errors
    },
    stats() {
      const stats = {
        first: [
          {
            title: this.$t('dashboard.factures'),
            value: this.itemsEtat.facture,
            color: 'blue lighten-1',
            icon: 'mdi-receipt-text-plus',
            to: '/dashboard/factures',
          },
          {
            title: this.$t('dashboard.encaissements'),
            value: this.itemsEtat.encaisse,
            color: 'red lighten-2',
            icon: 'mdi-cash-fast',
            to: '/paiement/factures',
          },
        ],
        second: [
          {
            title: this.$t('dashboard.patients'),
            value: this.itemsEtat.patient,
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
            value: this.itemsEtat.montant,
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
    itemsList() {
      if (this.paiementDates && this.paiementDates.data) {
        return this.paiementDates.data
      } else {
        return []
      }
    },
    itemsEtat() {
      if (this.paiementDate) {
        return this.paiementDate
      } else {
        return []
      }
    },

    currentPage() {
      if (this.paiementDates) {
        return this.paiementDates.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.paiementDates) {
        const total = this.paiementDates.total || 0
        const perPage = this.paiementDates.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      paiementDates: (state) => state.paiement.paiementDates,
      paiementDate: (state) => state.paiement.paiementDate,

      // countPaiementDay: (state) => state.paiement.countPaiementDay,
      // montantPaiementDay: (state) => state.paiement.montantPaiementDay,
      // countFactureDay: (state) => state.facture.countFactureDay,
      // countTraitement: (state) => state.traitement.countTraitement,
      // countPatient: (state) => state.patient.countPatient,
      // countPatientDay: (state) => state.patient.countPatientDay,
      // countFacture: (state) => state.facture.countFacture,
    }),
  },

  watch: {
    dateCalcul() {
      this.form.dateEtat = this.formatDate(this.dateCalcul)
    },
  },

  methods: {
    toggleLoading(value) {
      this.loading = value
    },
    closeDialog() {
      this.dialog = false
      this.$v.form.$reset()

      // this.form = {
      //   dateEtat: this.formatDate(
      //     new Date(new Date().getFullYear(), 0, 1).toISOString().substr(0, 10)
      //   ),
      // }

      this.loading = false
    },
    isEncaisser(item) {
      if (item.solde && item.encaisse) {
        return this.$t('facture.encaisse.total')
      } else if (!item.solde && item.encaisse) {
        return this.$t('facture.encaisse.partially')
      } else {
        return this.$t('facture.encaisse.no')
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      if (!isDate(date)) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.id === itemId) + 1
    },
    startCase(str) {
      if (str) {
        return startCase(str)
      } else {
        return 'n/a'
      }
    },
    capitalize(str) {
      if (str) {
        return capitalize(str)
      } else {
        return 'n/a'
      }
    },

    numberFormat(str) {
      if (str) {
        return numberFormat(str)
      } else {
        return numberFormat(0)
      }
    },
    async loardFacture(filename) {
      try {
        await this.$api.loardFacture(filename)
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
    },

    async fetchData(page) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('paiement/searchDatePaiement', {
            page,
            date: this.parseDate(this.form.dateEtat),
            s: this.query,
          })
        } else {
          await this.$store.dispatch('paiement/fetchDatePaiement', {
            page,
            date: this.parseDate(this.form.dateEtat),
          })
        }
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
      this.loading = false
    },

    refreshPage(payload) {
      let page = 1
      if (payload === 1) {
        page = this.currentPage
      }
      this.fetchData(page)
    },

    filter: debounce(function () {
      this.fetchData(1)
    }),

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true
        try {
          await this.$store.dispatch('paiement/fetchDatePaiement', {
            page: 1,
            date: this.parseDate(this.form.dateEtat),
          })

          this.closeDialog()
          this.$toast.success(this.$t('commoin.saved'))
        } catch (err) {
          this.loading = false

          if (err.response) {
            this.$toast.error(this.$t('commoin.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
      }
    },
  },
}
</script>
