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
                  {{ $t('entreprise.edit') }}
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
                  v-model.trim.lazy="form.raisonSocial"
                  :label="$t('entreprise.form.raisonSocial')"
                  autocomplete="off"
                  :maxlength="$v.form.raisonSocial.$params.maxLength.max"
                  :error-messages="raisonSocialErrors"
                  @input="
                    $v.form.raisonSocial.$touch()
                    checkUniqueRaisonSocial()
                  "
                  @blur="
                    $v.form.raisonSocial.$touch()
                    checkUniqueRaisonSocial()
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim.lazy="form.telephone"
                  :label="$t('entreprise.form.telephone')"
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
                  v-model.trim="form.nif"
                  :label="$t('entreprise.form.nif')"
                  autocomplete="off"
                  :maxlength="$v.form.nif.$params.maxLength.max"
                  :error-messages="nifErrors"
                  @input="$v.form.nif.$touch()"
                  @blur="$v.form.nif.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim="form.adresse"
                  :label="$t('entreprise.form.adresse')"
                  autocomplete="off"
                  :maxlength="$v.form.adresse.$params.maxLength.max"
                  :error-messages="adresseErrors"
                  @input="$v.form.adresse.$touch()"
                  @blur="$v.form.adresse.$touch()"
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
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { debounce } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      menuOptions: {
        transition: 'slide-y-transition',
      },
      isVisible: false,
      id: null,
      selectedItem: {
        raisonSocial: '',
        nif: '',
        telephone: '',
        adresse: '',
      },
      form: {
        raisonSocial: '',
        nif: '',
        telephone: '',
        adresse: '',
      },
      isUnique: {
        raisonSocial: false,
      },
      isPending: {
        raisonSocial: false,
      },
    }
  },
  validations: {
    form: {
      raisonSocial: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(200),
      },
      telephone: {
        maxLength: maxLength(50),
      },
      adresse: {
        maxLength: maxLength(200),
      },
      nif: {
        maxLength: maxLength(200),
      },
    },
  },

  computed: {
    isFormValid() {
      return (
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        this.isUnique.raisonSocial
      )
    },
    raisonSocialErrors() {
      const errors = []

      if (!this.$v.form.raisonSocial.$dirty) return errors

      !this.$v.form.raisonSocial.required &&
        errors.push(this.$t('validations.raisonSocial.required'))

      !this.$v.form.raisonSocial.minLength &&
        errors.push(
          this.$t('validations.raisonSocial.min', {
            length: this.$v.form.raisonSocial.$params.minLength.min,
          })
        )

      !this.$v.form.raisonSocial.maxLength &&
        errors.push(
          this.$t('validations.raisonSocial.max', {
            length: this.$v.form.raisonSocial.$params.maxLength.max,
          })
        )

      this.form.raisonSocial &&
        !this.isPending.raisonSocial &&
        !this.isUnique.raisonSocial &&
        errors.push(this.$t('validations.raisonSocial.unique'))

      return errors
    },
    telephoneErrors() {
      const errors = []

      if (!this.$v.form.telephone.$dirty) return errors

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

      !this.$v.form.adresse.maxLength &&
        errors.push(
          this.$t('validations.adresse.max', {
            length: this.$v.form.adresse.$params.maxLength.max,
          })
        )

      return errors
    },
    nifErrors() {
      const errors = []

      if (!this.$v.form.nif.$dirty) return errors

      !this.$v.form.nif.maxLength &&
        errors.push(
          this.$t('validations.nif.max', {
            length: this.$v.form.nif.$params.maxLength.max,
          })
        )

      return errors
    },
  },
  watch: {
    'form.raisonSocial'() {
      this.isPending.raisonSocial = true
      this.isUnique.raisonSocial = false
    },
  },
  methods: {
    checkUniqueRaisonSocial: debounce(
      async function () {
        if (
          this.form.raisonSocial === '' ||
          this.form.raisonSocial === null ||
          this.$v.form.raisonSocial.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkRaisonSocial(
            this.form.raisonSocial
          )
          this.isUnique.raisonSocial = !result
        } catch (err) {
          this.isUnique.raisonSocial = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.raisonSocial = false
      },
      500,
      -1
    ),
   
    openDialog(item) {
      this.id = item.id

      this.form = {
        raisonSocial: item.raisonSocial || '',
        nif: item.nif || '',
        telephone: item.telephone || '',
        adresse: item.adresse || '',
      }

      this.selectedItem = Object.assign({}, this.form)

      this.dialog = true
    },

    closeDialog() {
      this.dialog = false

      this.isUnique = {
        raisonSocial: false,
        telephone: false,
      }
      this.isPending = {
        raisonSocial: false,
        telephone: false,
      }
      this.$v.form.$reset()

      this.form = {
        raisonSocial: '',
        nif: '',
        telephone: '',
        adresse: '',
      }
      this.selectedItem = {
        raisonSocial: '',
        nif: '',
        telephone: '',
        adresse: '',
      }

      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.updateEntreprise(
            {
              raisonSocial: this.form.raisonSocial,
              nif: this.form.nif,
              telephone: this.form.telephone,
              adresse: this.form.adresse,
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
