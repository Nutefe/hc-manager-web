<template>
  <v-container fluid class="text-center">
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
            <v-col cols="12">
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
            <v-col cols="12">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.dateEnd"
                    :label="$t('paiement.form.date')"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    :maxlength="$v.form.dateEnd.$params.maxLength.max"
                    :error-messages="dateEndErrors"
                    @blur="
                      dateCalcul = parseDate(form.dateEnd)
                      $v.form.dateEnd.$touch()
                    "
                    @input="$v.form.dateEnd.$touch()"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateCalcul"
                  no-title
                  @input="menu2 = false"
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
import { startCase, numberFormat, capitalize } from '~/helpers/helpers.js'
import { isDate } from '~/helpers/customValidators.js'

export default {
  name: 'FacturesPage',

  layout: 'default',

  data() {
    return {
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
      menu2: false,
      form: {
        dateEtat: this.formatDate(
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        ),
        dateEnd: this.formatDate(
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
      await this.$store.dispatch('paiement/fetchEtatPaiements', {
        start: this.parseDate(this.form.dateEtat),
        end: this.parseDate(this.form.dateEnd),
      })
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
      dateEnd: {
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
        errors.push(this.$t('validations.date.required'))

      !this.$v.form.dateEtat.minLength &&
        errors.push(
          this.$t('validations.date.min', {
            length: this.$v.form.dateEtat.$params.minLength.min,
          })
        )

      !this.$v.form.dateEtat.maxLength &&
        errors.push(
          this.$t('validations.date.max', {
            length: this.$v.form.dateEtat.$params.maxLength.max,
          })
        )

      return errors
    },
    dateEndErrors() {
      const errors = []

      if (!this.$v.form.dateEnd.$dirty) return errors

      !this.$v.form.dateEnd.required &&
        errors.push(this.$t('validations.date.required'))

      !this.$v.form.dateEnd.minLength &&
        errors.push(
          this.$t('validations.date.min', {
            length: this.$v.form.dateEnd.$params.minLength.min,
          })
        )

      !this.$v.form.dateEnd.maxLength &&
        errors.push(
          this.$t('validations.date.max', {
            length: this.$v.form.dateEnd.$params.maxLength.max,
          })
        )

      return errors
    },
    stats() {
      const stats = {
        first: [
          {
            title: this.$t('dashboard.factures'),
            value: this.itemsEtat.montantRecette,
            color: 'blue lighten-1',
            icon: 'mdi-receipt-text-plus',
            to: '/dashboard/factures',
          },
          {
            title: this.$t('dashboard.encaissements'),
            value: this.itemsEtat.montantDecaissement,
            color: 'red lighten-2',
            icon: 'mdi-cash-fast',
            to: '/paiement/factures',
          },
        ],
        second: [
          {
            title: this.$t('dashboard.patients'),
            value: this.itemsEtat.montantReserve,
            color: 'orange lighten-2',
            icon: 'mdi-account-group',
            to: '/secretariat/patients',
          },
          {
            title: this.$t('dashboard.montantEncaisse'),
            value: this.itemsEtat.montantDepense,
            color: 'orange lighten-2',
            icon: 'mdi-cash-multiple',
            to: '/paiement/factures',
          },
        ],
      }

      return stats
    },

    itemsEtat() {
      if (this.etatRecette) {
        return this.etatRecette
      } else {
        return {}
      }
    },

    ...mapState({
      etatRecette: (state) => state.paiement.etatRecette,
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

      this.loading = false
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

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true
        try {
          await this.$store.dispatch('paiement/fetchEtatPaiements', {
            start: this.parseDate(this.form.dateEtat),
            end: this.parseDate(this.form.dateEnd),
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
