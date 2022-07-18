<template>
  <div>
    <v-row justify="center">
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
                  {{ $t('paiement.new') }}
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
              <template v-if="form.patient">
                <v-col cols="12" sm="12">
                  <v-card class="pl-1 pr-1" elevation="0">
                    <v-row>
                      <v-col style="font-size: 16px"
                        >{{ $t('paiement.form.facture') }}
                        <v-chip>{{ form.numero }}</v-chip></v-col
                      >
                      <v-col class="text-right" style="font-size: 16px">
                        <v-chip color="primary">{{ form.dateFacture }}</v-chip>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col style="font-size: 16px">
                        {{ form.patient.nom }}
                        {{ startCase(form.patient.prenom) }}
                      </v-col>
                      <v-col class="text-right" style="font-size: 16px">
                        <v-chip class="mr-3">
                          {{ form.patient.telephone }}</v-chip
                        >
                        <v-chip
                          v-if="form.patient.typePatient"
                          color="green"
                          text-color="white"
                        >
                          {{ form.patient.typePatient.libelle }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-divider />
                </v-col>
              </template>
              <v-col cols="12" sm="6" class="pr-15">
                <v-row>
                  <v-col style="font-size: 16px">{{
                    $t('paiement.form.total')
                  }}</v-col>
                  <v-col class="text-right" style="font-size: 16px">
                    <b>{{ total }}</b></v-col
                  >
                </v-row>
                <v-row>
                  <v-col style="font-size: 16px">{{
                    $t('paiement.form.acompte')
                  }}</v-col>
                  <v-col class="text-right" style="font-size: 16px">
                    <b>{{ form.acompte }}</b></v-col
                  >
                </v-row>
                <v-row>
                  <v-col style="font-size: 16px">{{
                    $t('paiement.form.remise')
                  }}</v-col>
                  <v-col class="text-right" style="font-size: 16px">
                    <b>{{ form.remise }}</b></v-col
                  >
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      v-model.trim="form.totalRemis"
                      autofocus
                      outlined
                      dense
                      :label="$t('paiement.form.somme')"
                      autocomplete="off"
                      type="number"
                      :maxlength="$v.form.totalRemis.$params.maxLength.max"
                      :error-messages="totalRemisErrors"
                      @input="$v.form.totalRemis.$touch()"
                      @blur="$v.form.totalRemis.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-0 pt-0">
                    <v-text-field
                      v-model.trim.lazy="form.montantPaye"
                      autofocus
                      outlined
                      dense
                      :label="$t('paiement.form.montant')"
                      autocomplete="off"
                      type="number"
                      :maxlength="$v.form.montantPaye.$params.maxLength.max"
                      :error-messages="montantPayeErrors"
                      @input="$v.form.montantPaye.$touch()"
                      @blur="$v.form.montantPaye.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row @click="show = !show">
                  <v-chip style="font-size: 16px">
                    {{ $t('paiement.form.traitement') }}
                  </v-chip>

                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon>{{
                      show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    }}</v-icon>
                  </v-btn>
                </v-row>
              </v-col>
              <template v-if="form.traitement.length > 0">
                <v-col cols="12" sm="12">
                  <v-expand-transition>
                    <v-simple-table
                      v-show="show"
                      fixed-header
                      height="200px"
                      color="grey darken-1"
                      class="px-3 px-md-5 pt-3"
                      dark
                    >
                      <thead>
                        <tr>
                          <th
                            v-for="header in headers"
                            :key="header.text"
                            class="text-left"
                          >
                            {{ header.text }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in form.traitement" :key="item.id">
                          <td>{{ itemPosition(item.id) }}</td>
                          <td>{{ item.libelle }}</td>
                          <td>{{ item.price }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-expand-transition>
                </v-col>
              </template>
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
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { startCase, capitalize } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      dialogNo: false,
      loading: false,
      itemsList: [],
      id: null,
      show: false,
      form: {
        remise: 0,
        acompte: 0,
        patient: {},
        traitement: [],
        montantPaye: 0,
        totalRemis: 0,
        totalFacture: 0,
        numero: '',
        dateFacture: '',
        reste: '',
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
          text: this.$t('facture.table.traitement'),
          align: 'start',
          value: 'libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.prix'),
          value: 'prix',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
      ],
    }
  },
  validations: {
    form: {
      montantPaye: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      totalRemis: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('patient/fetchAllPatientsNonAssurer')
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
    this.loading = false
  },

  computed: {
    isFormValid() {
      return (
        this.isPaye &&
        this.isTotal &&
        this.isAcompte1 &&
        this.isAcompte &&
        !this.$v.form.$invalid
      )
    },

    isAcompte() {
      if (this.form.acompte) {
        const ac = this.form.acompte

        if (ac + '' === this.form.montantPaye) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },

    isAcompte1() {
      if (this.form.acompte) {
        const ac = this.form.acompte

        if (ac <= this.form.totalRemis) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    isPaye() {
      if (this.form.montantPaye) {
        const ac = this.form.montantPaye

        if (ac <= this.form.totalRemis) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    isTotal() {
      if (this.form.totalFacture) {
        const ac = this.form.totalFacture

        if (ac >= this.form.montantPaye) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    montantPayeErrors() {
      const errors = []

      if (!this.$v.form.montantPaye.$dirty) return errors

      !this.$v.form.montantPaye.required &&
        errors.push(this.$t('validations.montant.required'))

      !this.$v.form.montantPaye.minLength &&
        errors.push(
          this.$t('validations.montant.min', {
            length: this.$v.form.montantPaye.$params.minLength.min,
          })
        )

      !this.$v.form.montantPaye.maxLength &&
        errors.push(
          this.$t('validations.montant.max', {
            length: this.$v.form.montantPaye.$params.maxLength.max,
          })
        )

      !this.isAcompte && errors.push(this.$t('validations.montant.equal'))
      !this.isTotal && errors.push(this.$t('validations.montant.equalmore'))
      !this.isPaye && errors.push(this.$t('validations.totalRemis.equal'))
      return errors
    },

    totalRemisErrors() {
      const errors = []

      if (!this.$v.form.totalRemis.$dirty) return errors

      !this.$v.form.totalRemis.required &&
        errors.push(this.$t('validations.totalRemis.required'))

      !this.$v.form.totalRemis.minLength &&
        errors.push(
          this.$t('validations.totalRemis.min', {
            length: this.$v.form.totalRemis.$params.minLength.min,
          })
        )

      !this.$v.form.totalRemis.maxLength &&
        errors.push(
          this.$t('validations.totalRemis.max', {
            length: this.$v.form.totalRemis.$params.maxLength.max,
          })
        )

      !this.isAcompte1 &&
        errors.push(this.$t('validations.totalRemis.equalmore'))

      return errors
    },

    matchedPatients() {
      return this.patients.map((patient) => {
        const patients = patient.nom
        return Object.assign({}, patient, { patients })
      })
    },

    matchedTraitements() {
      return this.traitements.map((traitement) => {
        const traitements = traitement.libelle
        return Object.assign({}, traitement, { traitements })
      })
    },

    total() {
      if (this.form.reste > 0) {
        return this.form.reste
      } else {
        return this.form.totalFacture
      }
    },

    ...mapState({
      patients: (state) => state.patient.allPatientsNonAssurer,
      traitements: (state) => state.traitement.allTraitementsType,
      fiches: (state) => state.facture.fiches,
    }),
  },

  methods: {
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

    openDialog(item) {
      this.id = item.id

      const ficheTraitement = []
      this.fiches.forEach((fiche) => {
        ficheTraitement.push(fiche.ficheTraitementPK.traitement)
      })

      this.form = {
        remise: item.remise || 0,
        acompte: item.acompte || 0,
        patient: item.fiche.patient || {},
        traitement: ficheTraitement || [],
        numero: item.numero || '',
        dateFacture: item.dateFacture || '',
        totalFacture: item.total || '',
        reste: item.reste || '',
        totalRemis: '',
        montantPaye: '',
      }

      this.fetchTraitement()

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        remise: 0,
        acompte: 0,
        patient: {},
        traitement: [],
        totalRemis: '',
        montantPaye: '',
        numero: '',
        dateFacture: '',
        totalFacture: '',
        reste: '',
      }

      this.loading = false
    },

    async fetchFiche(id) {
      this.loading = true
      try {
        await this.$store.dispatch('facture/fetchAllFiches', id)
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
      this.loading = false
    },

    async fetchTraitement() {
      this.loading = true

      if (this.form.patient) {
        try {
          await this.$store.dispatch(
            'traitement/fetchAllTraitementType',
            this.form.patient.typePatient.id
          )
        } catch (err) {
          this.$nuxt.error({
            statusCode: 503,
            message: 'Unable to fetch data.',
          })
        }
      }

      this.loading = false
    },

    itemPosition(itemId) {
      return this.form.traitement.findIndex((elm) => elm.id === itemId) + 1
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.savePaiement1({
            total: this.form.totalRemis,
            montant: this.form.montantPaye,
            facture: this.id,
          })
          this.$emit('refreshPage')

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
