<template>
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
                {{ $t('traitement.edit') }}
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
                v-model.trim="form.libelle"
                autofocus
                :label="$t('traitement.form.libelle')"
                autocomplete="off"
                :maxlength="$v.form.libelle.$params.maxLength.max"
                :error-messages="libelleErrors"
                @input="$v.form.libelle.$touch()"
                @blur="$v.form.libelle.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model.trim.lazy="form.typeTraitement"
                :items="matchedTypeTraitements"
                item-text="libelle"
                item-value="id"
                autocomplete="off"
                autofocus
                :label="$t('traitement.form.typeTraitement')"
                return-object
                :error-messages="typeTraitementErrors"
                @input="$v.form.typeTraitement.$touch()"
                @blur="$v.form.typeTraitement.$touch()"
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
                :label="$t('traitement.form.typePatient')"
                return-object
                :error-messages="typePatientErrors"
                @input="$v.form.typePatient.$touch()"
                @blur="$v.form.typePatient.$touch()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.price"
                :label="$t('traitement.form.price')"
                type="number"
                autocomplete="off"
                :maxlength="$v.form.price.$params.maxLength.max"
                :error-messages="priceErrors"
                @input="$v.form.price.$touch()"
                @blur="$v.form.price.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model.trim="form.description"
                :label="$t('traitement.form.description')"
                autocomplete="off"
                maxlength="100"
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
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { isEqual } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      id: null,
      selectedItem: {
        libelle: '',
        description: '',
        typeTraitement: {},
        typePatient: {},
        price: '',
      },
      form: {
        libelle: '',
        description: '',
        typeTraitement: {},
        typePatient: {},
        price: '',
      },
    }
  },
  validations: {
    form: {
      libelle: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      price: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      typeTraitement: {
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
        this.$store.dispatch('typeTraitement/fetchAllTypes'),
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
      const isFormEdited = !isEqual(this.selectedItem, this.form)

      return isFormEdited && !this.$v.form.$invalid
    },
    libelleErrors() {
      const errors = []

      if (!this.$v.form.libelle.$dirty) return errors

      !this.$v.form.libelle.required &&
        errors.push(this.$t('validations.libelle.required'))

      !this.$v.form.libelle.minLength &&
        errors.push(
          this.$t('validations.libelle.min', {
            length: this.$v.form.libelle.$params.minLength.min,
          })
        )

      !this.$v.form.libelle.maxLength &&
        errors.push(
          this.$t('validations.libelle.max', {
            length: this.$v.form.libelle.$params.maxLength.max,
          })
        )

      return errors
    },
    priceErrors() {
      const errors = []

      if (!this.$v.form.price.$dirty) return errors

      !this.$v.form.price.required &&
        errors.push(this.$t('validations.price.required'))

      !this.$v.form.price.minLength &&
        errors.push(
          this.$t('validations.price.min', {
            length: this.$v.form.price.$params.minLength.min,
          })
        )

      !this.$v.form.price.maxLength &&
        errors.push(
          this.$t('validations.price.max', {
            length: this.$v.form.price.$params.maxLength.max,
          })
        )

      return errors
    },

    typePatientErrors() {
      const errors = []

      if (!this.$v.form.typePatient.$dirty) return errors

      !this.$v.form.typePatient.required &&
        errors.push(this.$t('validations.typePatient.required'))

      return errors
    },

    typeTraitementErrors() {
      const errors = []

      if (!this.$v.form.typeTraitement.$dirty) return errors

      !this.$v.form.typeTraitement.required &&
        errors.push(this.$t('validations.typeTraitement.required'))

      return errors
    },

    matchedTypePatients() {
      return this.typePatients.map((typePatient) => {
        const typePatients = typePatient.libelle
        return Object.assign({}, typePatient, { typePatients })
      })
    },

    matchedTypeTraitements() {
      return this.typeTraitements.map((typeTraitement) => {
        const typeTraitements = typeTraitement.libelle
        return Object.assign({}, typeTraitement, { typeTraitements })
      })
    },

    ...mapState({
      typeTraitements: (state) => state.typeTraitement.allTypes,
      typePatients: (state) => state.typePatient.allTypes,
    }),
  },
  methods: {
    openDialog(item) {
      this.id = item.id
      this.form = {
        libelle: item.libelle || '',
        description: item.description || '',
        typeTraitement: item.typeTraitement || {},
        typePatient: item.typePatient || {},
        price: item.price || '',
      }
      this.selectedItem = Object.assign({}, this.form)

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.id = null
      this.form = {
        libelle: '',
        description: '',
        typeTraitement: {},
        typePatient: {},
        price: '',
      }
      this.selectedItem = {
        libelle: '',
        description: '',
        typeTraitement: {},
        typePatient: {},
        price: '',
      }

      this.loading = false
    },
    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.updateTraitement(
            {
              libelle: this.form.libelle,
              description: this.form.description,
              typeTraitement: this.form.typeTraitement,
              typePatient: this.form.typePatient,
              price: this.form.price,
            },
            this.id
          )
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
