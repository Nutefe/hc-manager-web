<template>
  <div>
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
          :aria-label="$t('commoin.add')"
          @click.stop="dialog = true"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <span>
        {{ $t('commoin.add') }}
      </span>
    </v-tooltip>

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
                <v-text-field
                  v-model.trim="form.dateNaiss"
                  :label="$t('patient.form.dateNaiss')"
                  autocomplete="off"
                  :maxlength="$v.form.dateNaiss.$params.maxLength.max"
                  :error-messages="dateNaissErrors"
                  @input="$v.form.dateNaiss.$touch()"
                  @blur="$v.form.dateNaiss.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.telephone"
                  :label="$t('patient.form.telephone')"
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
                <v-autocomplete
                  v-model.trim.lazy="form.typePatient"
                  :items="matchedTypePatients"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('patient.form.typePatient')"
                  return-object
                  :error-messages="typePatientErrors"
                  @input="$v.form.typePatient.$touch()"
                  @blur="$v.form.typePatient.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.numeroPiece"
                  :label="$t('patient.form.numeroPiece')"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.pieceExp"
                  :label="$t('patient.form.pieceExp')"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model.trim.lazy="form.assurance"
                  :items="matchedAssurances"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('patient.form.assurance')"
                  return-object
                ></v-autocomplete>
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
import { debounce } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      menuOptions: {
        transition: 'slide-y-transition',
      },
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
        dateNaiss: '',
        sexe: {},
        telephone: '',
        adresse: '',
        numeroPiece: '',
        pieceExp: '',
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
      typePatient: {
        required,
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        this.$store.dispatch('typePatient/fetchAllTypes'),
        this.$store.dispatch('assurance/fetchAllAssurances'),
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

    matchedTypePatients() {
      return this.typePatients.map((typePatient) => {
        const typePatients = typePatient.libelle
        return Object.assign({}, typePatient, { typePatients })
      })
    },
    matchedAssurances() {
      return this.assurances.map((assurance) => {
        const assurances = assurance.libelle
        return Object.assign({}, assurance, { assurances })
      })
    },
    matchedEntreprises() {
      return this.entreprises.map((entreprise) => {
        const entreprises = entreprise.libelle
        return Object.assign({}, entreprise, { entreprises })
      })
    },

    ...mapState({
      typePatients: (state) => state.typePatient.allTypes,
      assurances: (state) => state.assurance.allAssurances,
      entreprises: (state) => state.entreprise.allEntreprises,
    }),
  },
  watch: {
    'form.codeDossier'() {
      this.isPending.codeDossier = true
      this.isUnique.codeDossier = false
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

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.savePatient({
            codeDossier: this.form.codeDossier,
            nom: this.form.nom,
            prenom: this.form.prenom,
            dateNaiss: this.form.dateNaiss,
            genre: this.form.sexe.libelle,
            telephone: this.form.telephone,
            adresse: this.form.adresse,
            numeroPiece: this.form.numeroPiece,
            pieceExp: this.form.pieceExp,
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
