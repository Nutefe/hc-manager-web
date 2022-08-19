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
                  {{ $t('facture.new') }}
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
                <v-autocomplete
                  v-model.trim.lazy="form.patient"
                  :items="matchedPatients"
                  :label="$t('facture.form.patient')"
                  item-text="nom"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  return-object
                  :error-messages="patientErrors"
                  @input="$v.form.patient.$touch()"
                  @blur="$v.form.patient.$touch()"
                  @change="fetchTraitement()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.acompte"
                  :label="$t('facture.form.acompte')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form.acompte.$params.maxLength.max"
                  :error-messages="acompteErrors"
                  @input="$v.form.acompte.$touch()"
                  @blur="$v.form.acompte.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-autocomplete
                  v-model.trim.lazy="form.traitement"
                  :items="matchedTraitements"
                  :label="$t('facture.form.traitement')"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  multiple
                  autofocus
                  return-object
                  chips
                  deletable-chips
                ></v-autocomplete>
              </v-col>
              <template v-if="form.traitement.length > 0">
                <v-col cols="12" sm="12">
                  <v-expand-transition>
                    <v-simple-table
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
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="total"
                  autofocus
                  :label="$t('facture.form.total')"
                  autocomplete="off"
                  type="number"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim.lazy="form.remise"
                  autofocus
                  :label="$t('facture.form.remise')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form.remise.$params.maxLength.max"
                  :error-messages="remiseErrors"
                  @input="$v.form.remise.$touch()"
                  @blur="$v.form.remise.$touch()"
                ></v-text-field>
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
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
// import { debounce } from '~/helpers/helpers.js'
// import { isDate } from '~/helpers/customValidators.js'

export default {
  data() {
    return {
      dialog: false,
      dialogNo: false,
      loading: false,
      itemsList: [],
      form: {
        remise: 0,
        acompte: 0,
        patient: {},
        traitement: [],
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
      remise: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      acompte: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      patient: {
        required,
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
      const isFormTraitement = this.form.traitement.length > 0

      return isFormTraitement && !this.$v.form.$invalid
    },

    remiseErrors() {
      const errors = []

      if (!this.$v.form.remise.$dirty) return errors

      !this.$v.form.remise.required &&
        errors.push(this.$t('validations.remise.required'))

      !this.$v.form.remise.minLength &&
        errors.push(
          this.$t('validations.remise.min', {
            length: this.$v.form.remise.$params.minLength.min,
          })
        )

      !this.$v.form.remise.maxLength &&
        errors.push(
          this.$t('validations.remise.max', {
            length: this.$v.form.remise.$params.maxLength.max,
          })
        )

      return errors
    },
    acompteErrors() {
      const errors = []

      if (!this.$v.form.acompte.$dirty) return errors

      !this.$v.form.acompte.required &&
        errors.push(this.$t('validations.acompte.required'))

      !this.$v.form.acompte.minLength &&
        errors.push(
          this.$t('validations.acompte.min', {
            length: this.$v.form.acompte.$params.minLength.min,
          })
        )

      !this.$v.form.acompte.maxLength &&
        errors.push(
          this.$t('validations.acompte.max', {
            length: this.$v.form.acompte.$params.maxLength.max,
          })
        )

      return errors
    },

    patientErrors() {
      const errors = []

      if (!this.$v.form.patient.$dirty) return errors

      !this.$v.form.patient.required &&
        errors.push(this.$t('validations.patient.required'))

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
      let somme = 0
      this.form.traitement.forEach((traitement) => {
        somme += traitement.price
      })
      return somme - this.form.remise
    },

    ...mapState({
      patients: (state) => state.patient.allPatientsNonAssurer,
      traitements: (state) => state.traitement.allTraitementsType,
    }),
  },

  methods: {
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        remise: 0,
        acompte: 0,
        patient: {},
        traitement: [],
      }

      this.loading = false
    },

    openDialog() {
      this.dialog = true

      this.$v.form.$reset()

      this.form = {
        remise: 0,
        acompte: 0,
        patient: {},
        traitement: [],
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
        const listTraitement = []
        this.form.traitement.forEach((traitement) => {
          const item = {}
          item.traitement = traitement
          item.kota = ''
          item.baseRembour = 0
          item.netAssurance = 0
          listTraitement.push(item)
        })
        try {
          await this.$api.saveFacture1({
            patient: this.form.patient.id,
            traitements: listTraitement,
            // unite: this.form.,
            accompte: this.form.acompte,
            remise: this.form.remise,
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
