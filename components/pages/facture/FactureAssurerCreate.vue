<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        persistent
        scrollable
        max-width="900"
      >
        <v-card :disabled="loading" :loading="loading">
          <v-card-title class="px-3 px-md-5 py-2 py-md-3">
            <v-row align="center">
              <v-col cols="9">
                <span class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('facture.newAss') }}
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
            <v-row align="center">
              <v-col cols="12" sm="4">
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
              <v-col cols="12" sm="4">
                <v-autocomplete
                  v-model.trim.lazy="form.unite"
                  :items="unites"
                  :label="$t('facture.form.unite')"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  return-object
                  :error-messages="uniteErrors"
                  @input="$v.form.unite.$touch()"
                  @blur="$v.form.unite.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.trim.lazy="form.acompte"
                  :label="$t('facture.form.acompte')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form.acompte.$params.maxLength.max"
                  :error-messages="acompteErrors"
                  @input="$v.form.acompte.$touch()"
                  @blur="$v.form.acompte.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.trim.lazy="form1.kota"
                  :label="$t('facture.form.kota')"
                  autocomplete="off"
                  :maxlength="$v.form1.kota.$params.maxLength.max"
                  :error-messages="kotaErrors"
                  @input="$v.form1.kota.$touch()"
                  @blur="$v.form1.kota.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.trim.lazy="form1.baseRembour"
                  :label="$t('facture.form.baseRembour')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form1.baseRembour.$params.maxLength.max"
                  :error-messages="baseRembourErrors"
                  @input="$v.form1.baseRembour.$touch()"
                  @blur="$v.form1.baseRembour.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.trim.lazy="form1.netAssurance"
                  :label="$t('facture.form.netAssurance')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form1.netAssurance.$params.maxLength.max"
                  :error-messages="netAssuranceErrors"
                  @input="$v.form1.netAssurance.$touch()"
                  @blur="$v.form1.netAssurance.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="11">
                <v-autocomplete
                  v-model.trim.lazy="form1.traitement"
                  :items="matchedTraitements"
                  :label="$t('facture.form.traitement')"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  return-object
                  chips
                  deletable-chips
                  :error-messages="traitementErrors"
                  @input="$v.form1.traitement.$touch()"
                  @blur="$v.form1.traitement.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="1" class="d-flex justify-center">
                <v-tooltip v-if="isFormValid1" left>
                  <template #activator="{ on, attrs }">
                    <v-avatar
                      v-if="isFormValid1"
                      color="primary"
                      size="40"
                      dark
                      v-bind="attrs"
                      class="d-flex elevation-10 mt-2"
                      :aria-label="$t('facture.adds.a1')"
                      @click.stop="addItem"
                      v-on="on"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-avatar>
                  </template>
                  <span>{{ $t('facture.adds.a1') }}</span>
                </v-tooltip>
                <v-tooltip v-else left>
                  <template #activator="{ on, attrs }">
                    <v-avatar
                      color="red"
                      size="40"
                      dark
                      v-bind="attrs"
                      class="d-flex elevation-10 mt-2"
                      :aria-label="$t('facture.adds.a2')"
                      v-on="on"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-avatar>
                  </template>
                  <span>{{ $t('facture.adds.a2') }}</span>
                </v-tooltip>
              </v-col>
              <template v-if="itemsList.length > 0">
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
                        <tr
                          v-for="(item, index) in itemsList"
                          :key="item.traitement.id"
                        >
                          <td>{{ itemPosition(item.traitement.id) }}</td>
                          <td>{{ item.traitement.libelle }}</td>
                          <td>{{ item.traitement.price }}</td>
                          <td>{{ item.kota }}</td>
                          <td>{{ item.baseRembour }}</td>
                          <td>{{ item.netAssurance }}</td>
                          <td>
                            <v-icon small @click="itemDelete(index)"
                              >mdi-close</v-icon
                            >
                          </td>
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
import { isEqual } from '~/helpers/helpers.js'
// import { isDate } from '~/helpers/customValidators.js'

export default {
  data() {
    return {
      dialog: false,
      dialogNo: false,
      loading: false,
      itemsList: [],
      unites: [
        {
          id: 1,
          libelle: this.$t('facture.unite.montant'),
          value: false,
        },
        {
          id: 2,
          libelle: this.$t('facture.unite.pourcentage'),
          value: true,
        },
      ],
      form: {
        remise: 0,
        acompte: 0,
        unite: {},
        patient: {},
      },
      form1: {
        kota: '',
        baseRembour: 0,
        netAssurance: 0,
        traitement: {},
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
        {
          text: this.$t('facture.table.kota'),
          value: 'kota',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.baseRembour'),
          value: 'baseRembour',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.netAssurance'),
          value: 'netAssurance',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.action'),
          value: 'action',
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

      unite: {
        required,
      },

      patient: {
        required,
      },
    },
    form1: {
      kota: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      baseRembour: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      netAssurance: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      traitement: {
        required,
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        this.$store.dispatch('patient/fetchAllPatientsAssurer'),
      ])
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
      const isFormItem = this.itemsList.length > 0

      return isFormItem && !this.$v.form.$invalid
    },
    isFormValid1() {
      return !this.$v.form1.$invalid
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
    kotaErrors() {
      const errors = []

      if (!this.$v.form1.kota.$dirty) return errors

      !this.$v.form1.kota.required &&
        errors.push(this.$t('validations.kota.required'))

      !this.$v.form1.kota.minLength &&
        errors.push(
          this.$t('validations.kota.min', {
            length: this.$v.form1.kota.$params.minLength.min,
          })
        )

      !this.$v.form1.kota.maxLength &&
        errors.push(
          this.$t('validations.kota.max', {
            length: this.$v.form1.kota.$params.maxLength.max,
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
    uniteErrors() {
      const errors = []

      if (!this.$v.form.unite.$dirty) return errors

      !this.$v.form.unite.required &&
        errors.push(this.$t('validations.unite.required'))

      return errors
    },
    traitementErrors() {
      const errors = []

      if (!this.$v.form1.traitement.$dirty) return errors

      !this.$v.form1.traitement.required &&
        errors.push(this.$t('validations.traitement.required'))

      return errors
    },
    baseRembourErrors() {
      const errors = []

      if (!this.$v.form1.baseRembour.$dirty) return errors

      !this.$v.form1.baseRembour.required &&
        errors.push(this.$t('validations.baseRembour.required'))

      !this.$v.form1.baseRembour.minLength &&
        errors.push(
          this.$t('validations.baseRembour.min', {
            length: this.$v.form1.baseRembour.$params.minLength.min,
          })
        )

      !this.$v.form1.baseRembour.maxLength &&
        errors.push(
          this.$t('validations.baseRembour.max', {
            length: this.$v.form1.baseRembour.$params.maxLength.max,
          })
        )

      return errors
    },
    netAssuranceErrors() {
      const errors = []

      if (!this.$v.form1.netAssurance.$dirty) return errors

      !this.$v.form1.netAssurance.required &&
        errors.push(this.$t('validations.netAssurance.required'))

      !this.$v.form1.netAssurance.minLength &&
        errors.push(
          this.$t('validations.netAssurance.min', {
            length: this.$v.form1.netAssurance.$params.minLength.min,
          })
        )

      !this.$v.form1.netAssurance.maxLength &&
        errors.push(
          this.$t('validations.netAssurance.max', {
            length: this.$v.form1.netAssurance.$params.maxLength.max,
          })
        )

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
      this.itemsList.forEach((traitement) => {
        somme += traitement.price
      })
      return somme - this.form.remise
    },

    ...mapState({
      patients: (state) => state.patient.allPatientsAssurer,
      traitements: (state) => state.traitement.allTraitementsTypeAssurer,
    }),
  },

  methods: {
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        remise: 0,
        acompte: 0,
        unite: {},
        patient: {},
      }

      this.form1 = {
        kota: '',
        baseRembour: 0,
        netAssurance: 0,
        traitement: {},
      }

      this.loading = false
    },

    openDialog() {
      this.dialog = true

      this.$v.form.$reset()

      this.form = {
        remise: 0,
        acompte: 0,
        unite: {},
        patient: {},
      }

      this.form1 = {
        kota: '',
        baseRembour: 0,
        netAssurance: 0,
        traitement: {},
      }

      this.loading = false
    },

    async fetchTraitement() {
      this.loading = true
      if (this.form.patient) {
        try {
          await this.$store.dispatch(
            'traitement/fetchAllTraitementTypeAssurer',
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
      return this.itemsList.findIndex((elm) => elm.traitement.id === itemId) + 1
    },

    itemDelete(index) {
      this.itemsList.splice(index, 1)
    },

    addItem() {
      const isPresent = this.itemsList.find((o) =>
        isEqual(o.traitement, this.form1.traitement)
      )
      if (!isPresent) {
        const item = {}

        item.traitement = this.form1.traitement
        item.kota = this.form1.kota
        item.baseRembour = this.form1.baseRembour
        item.netAssurance = this.form1.netAssurance
        this.itemsList.push(item)
      }
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.savePatient({
            codeDossier: this.form.codeDossier,
            nom: this.form.nom,
            prenom: this.form.prenom,
            dateNaiss: this.parseDate(this.form.dateNaiss),
            genre: this.form.sexe.libelle,
            telephone: this.form.telephone,
            adresse: this.form.adresse,
            numeroPiece: this.form.numeroPiece,
            pieceExp: this.parseDate(this.form.pieceExp),
            typePatient: this.form.typePatient,
            assurance: this.form.assurance,
            entreprise: this.form.entreprise,
            // this.parseDate(this.dateFormatted)
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
