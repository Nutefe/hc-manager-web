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
                  {{ $t('patient.new') }}
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
                <v-text-field
                  v-model.trim.lazy="form.codeDossier"
                  :label="$t('patient.form.codeDossier')"
                  autocomplete="off"
                  :maxlength="$v.form.codeDossier.$params.maxLength.max"
                  :error-messages="codeDossierErrors"
                  @input="
                    $v.form.codeDossier.$touch()
                    checkUniqueCodeDossier()
                  "
                  @blur="
                    $v.form.codeDossier.$touch()
                    checkUniqueCodeDossier()
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.nom"
                  autofocus
                  :label="$t('patient.form.nom')"
                  autocomplete="off"
                  :maxlength="$v.form.nom.$params.maxLength.max"
                  :error-messages="nomErrors"
                  @input="$v.form.nom.$touch()"
                  @blur="$v.form.nom.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.prenom"
                  :label="$t('patient.form.prenom')"
                  autocomplete="off"
                  :maxlength="$v.form.prenom.$params.maxLength.max"
                  :error-messages="prenomErrors"
                  @input="$v.form.prenom.$touch()"
                  @blur="$v.form.prenom.$touch()"
                ></v-text-field>
              </v-col>
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
                      v-model="form.dateNaiss"
                      :label="$t('patient.form.dateNaiss')"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      :maxlength="$v.form.dateNaiss.$params.maxLength.max"
                      :error-messages="dateNaissErrors"
                      @blur="
                        dateNais = parseDate(form.dateNaiss)
                        $v.form.dateNaiss.$touch()
                      "
                      @input="$v.form.dateNaiss.$touch()"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateNais"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.telephone"
                  :label="$t('patient.form.telephone')"
                  type="number"
                  autocomplete="off"
                  :maxlength="$v.form.telephone.$params.maxLength.max"
                  :error-messages="telephoneErrors"
                  @input="$v.form.telephone.$touch()"
                  @blur="$v.form.telephone.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.adresse"
                  :label="$t('patient.form.adresse')"
                  autocomplete="off"
                  :maxlength="$v.form.adresse.$params.maxLength.max"
                  :error-messages="adresseErrors"
                  @input="$v.form.adresse.$touch()"
                  @blur="$v.form.adresse.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model.trim.lazy="form.sexe"
                  :items="sexe"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('patient.form.sexe')"
                  return-object
                  :error-messages="sexeErrors"
                  @input="$v.form.sexe.$touch()"
                  @blur="$v.form.sexe.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.numeroPiece"
                  :label="$t('patient.form.numeroPiece')"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
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
                      v-model="form.pieceExp"
                      :label="$t('patient.form.pieceExp')"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="datePiece = parseDate(form.pieceExp)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="datePiece"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model.trim.lazy="form.entreprise"
                  :items="matchedEntreprises"
                  item-text="raisonSocial"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('patient.form.entreprise')"
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col class="mt-3" cols="12" sm="6" align="left" justify="left">
                <v-row align-sm="center" justify-sm="center">
                  <v-col cols="12" sm="2">
                    <v-btn
                      color="primary"
                      dark
                      fab
                      small
                      :aria-label="$t('patient.addEntreprise')"
                      @click.stop="createItemEntreprise"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <span> {{ $t('patient.addEntreprise') }} </span>
                  </v-col>
                </v-row>
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
      <entreprise-create ref="createEntepriseForm" />
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import EntrepriseCreate from './EntrepriseCreate.vue'
import { debounce } from '~/helpers/helpers.js'
import { isDate } from '~/helpers/customValidators.js'

export default {
  components: { EntrepriseCreate },
  data() {
    return {
      dialog: false,
      dialogNo: false,
      loading: false,
      dateNais: new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .substr(0, 10),
      datePiece: new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      sexe: [
        {
          id: 1,
          libelle: 'MASCULIN',
        },
        {
          id: 2,
          libelle: 'FEMININ',
        },
        {
          id: 3,
          libelle: 'AUTRE',
        },
      ],
      form: {
        codeDossier: '',
        nom: '',
        prenom: '',
        dateNaiss: this.formatDate(
          new Date(new Date().getFullYear(), 0, 1).toISOString().substr(0, 10)
        ),
        sexe: {},
        telephone: '',
        adresse: '',
        numeroPiece: '',
        pieceExp: this.formatDate(
          new Date(new Date().getFullYear(), 0, 1).toISOString().substr(0, 10)
        ),
        typePatient: {},
        assurance: {},
        entreprise: {},
      },
      isUnique: {
        codeDossier: false,
      },
      isPending: {
        codeDossier: false,
      },
    }
  },
  validations: {
    form: {
      codeDossier: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
      },
      nom: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      prenom: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      dateNaiss: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
      telephone: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
      adresse: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
      sexe: {
        required,
      },
      // typePatient: {
      //   required,
      // },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        // this.$store.dispatch('typePatient/fetchAllTypes'),
        // this.$store.dispatch('assurance/fetchAllAssurances'),
        this.$store.dispatch('entreprise/fetchAllEntreprises'),
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
      return (
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        this.isUnique.codeDossier
      )
    },
    codeDossierErrors() {
      const errors = []

      if (!this.$v.form.codeDossier.$dirty) return errors

      !this.$v.form.codeDossier.required &&
        errors.push(this.$t('validations.codeDossier.required'))

      !this.$v.form.codeDossier.minLength &&
        errors.push(
          this.$t('validations.codeDossier.min', {
            length: this.$v.form.codeDossier.$params.minLength.min,
          })
        )

      !this.$v.form.codeDossier.maxLength &&
        errors.push(
          this.$t('validations.codeDossier.max', {
            length: this.$v.form.codeDossier.$params.maxLength.max,
          })
        )

      this.form.codeDossier &&
        !this.isPending.codeDossier &&
        !this.isUnique.codeDossier &&
        errors.push(this.$t('validations.codeDossier.unique'))

      return errors
    },

    nomErrors() {
      const errors = []

      if (!this.$v.form.nom.$dirty) return errors

      !this.$v.form.nom.required &&
        errors.push(this.$t('validations.nom.required'))

      !this.$v.form.nom.minLength &&
        errors.push(
          this.$t('validations.nom.min', {
            length: this.$v.form.nom.$params.minLength.min,
          })
        )

      !this.$v.form.nom.maxLength &&
        errors.push(
          this.$t('validations.nom.max', {
            length: this.$v.form.nom.$params.maxLength.max,
          })
        )

      return errors
    },
    prenomErrors() {
      const errors = []

      if (!this.$v.form.prenom.$dirty) return errors

      !this.$v.form.prenom.required &&
        errors.push(this.$t('validations.prenom.required'))

      !this.$v.form.prenom.minLength &&
        errors.push(
          this.$t('validations.prenom.min', {
            length: this.$v.form.prenom.$params.minLength.min,
          })
        )

      !this.$v.form.prenom.maxLength &&
        errors.push(
          this.$t('validations.prenom.max', {
            length: this.$v.form.prenom.$params.maxLength.max,
          })
        )

      return errors
    },
    dateNaissErrors() {
      const errors = []

      if (!this.$v.form.dateNaiss.$dirty) return errors

      !this.$v.form.dateNaiss.required &&
        errors.push(this.$t('validations.dateNaiss.required'))

      !this.$v.form.dateNaiss.minLength &&
        errors.push(
          this.$t('validations.dateNaiss.min', {
            length: this.$v.form.dateNaiss.$params.minLength.min,
          })
        )

      !this.$v.form.dateNaiss.maxLength &&
        errors.push(
          this.$t('validations.dateNaiss.max', {
            length: this.$v.form.dateNaiss.$params.maxLength.max,
          })
        )

      return errors
    },
    telephoneErrors() {
      const errors = []

      if (!this.$v.form.telephone.$dirty) return errors

      !this.$v.form.telephone.required &&
        errors.push(this.$t('validations.telephone.required'))

      !this.$v.form.telephone.minLength &&
        errors.push(
          this.$t('validations.telephone.min', {
            length: this.$v.form.telephone.$params.minLength.min,
          })
        )

      !this.$v.form.telephone.maxLength &&
        errors.push(
          this.$t('validations.telephone.max', {
            length: this.$v.form.telephone.$params.maxLength.max,
          })
        )

      return errors
    },
    adresseErrors() {
      const errors = []

      if (!this.$v.form.adresse.$dirty) return errors

      !this.$v.form.adresse.required &&
        errors.push(this.$t('validations.adresse.required'))

      !this.$v.form.adresse.minLength &&
        errors.push(
          this.$t('validations.adresse.min', {
            length: this.$v.form.adresse.$params.minLength.min,
          })
        )

      !this.$v.form.adresse.maxLength &&
        errors.push(
          this.$t('validations.adresse.max', {
            length: this.$v.form.adresse.$params.maxLength.max,
          })
        )

      return errors
    },

    sexeErrors() {
      const errors = []

      if (!this.$v.form.sexe.$dirty) return errors

      !this.$v.form.sexe.required &&
        errors.push(this.$t('validations.sexe.required'))

      return errors
    },
    typePatientErrors() {
      const errors = []

      if (!this.$v.form.typePatient.$dirty) return errors

      !this.$v.form.typePatient.required &&
        errors.push(this.$t('validations.typePatient.required'))

      return errors
    },

    matchedEntreprises() {
      return this.entreprises.map((entreprise) => {
        const entreprises = entreprise.libelle
        return Object.assign({}, entreprise, { entreprises })
      })
    },

    ...mapState({
      entreprises: (state) => state.entreprise.allEntreprises,
    }),
  },
  watch: {
    'form.codeDossier'() {
      this.isPending.codeDossier = true
      this.isUnique.codeDossier = false
    },
    dateNais() {
      this.form.dateNaiss = this.formatDate(this.dateNais)
    },
    datePiece() {
      this.form.pieceExp = this.formatDate(this.datePiece)
    },
  },
  methods: {
    checkUniqueCodeDossier: debounce(
      async function () {
        if (
          this.form.codeDossier === '' ||
          this.form.codeDossier === null ||
          this.$v.form.codeDossier.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkCodeDossier(this.form.codeDossier)
          this.isUnique.codeDossier = !result
        } catch (err) {
          this.isUnique.codeDossier = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.codeDossier = false
      },
      500,
      -1
    ),

    createItemEntreprise() {
      this.$refs.createEntepriseForm.openDialog()
    },
    closeDialog() {
      this.dialog = false
      this.isUnique = {
        codeDossier: false,
      }
      this.isPending = {
        codeDossier: false,
      }
      this.$v.form.$reset()

      this.form = {
        codeDossier: '',
        nom: '',
        prenom: '',
        dateNaiss: '',
        sexe: {},
        telephone: '',
        adresse: '',
        numeroPiece: '',
        pieceExp: '',
        typePatient: {},
        assurance: {},
        entreprise: {},
      }

      this.loading = false
    },

    openDialog() {
      this.dialog = true

      this.$v.form.$reset()

      this.form = {
        codeDossier: '',
        nom: '',
        prenom: '',
        dateNaiss: '',
        sexe: {},
        telephone: '',
        adresse: '',
        numeroPiece: '',
        pieceExp: '',
        typePatient: {},
        assurance: {},
        entreprise: {},
      }

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

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.savePatientInam({
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
