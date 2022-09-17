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
                  {{ $t('decaissement.new') }}
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
                <v-text-field
                  v-model.trim="form.motif"
                  autofocus
                  :label="$t('decaissement.form.motif')"
                  autocomplete="off"
                  :maxlength="$v.form.motif.$params.maxLength.max"
                  :error-messages="motifErrors"
                  @input="$v.form.motif.$touch()"
                  @blur="$v.form.motif.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.trim="form.montant"
                  autofocus
                  :label="$t('decaissement.form.montant')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form.montant.$params.maxLength.max"
                  :error-messages="montantErrors"
                  @input="$v.form.montant.$touch()"
                  @blur="$v.form.montant.$touch()"
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

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      phoneMask: '## ## ## ##',
      isVisible: false,
      form: {
        motif: '',
        montant: '',
      },
    }
  },
  validations: {
    form: {
      motif: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      montant: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
    },
  },
  // async fetch() {
  //   this.loading = true
  //   try {
  //     await this.$store.dispatch('utilisateur/fetchAllUtilisateursCaisse')
  //   } catch (err) {
  //     this.$nuxt.error({
  //       statusCode: 503,
  //       message: 'Unable to fetch data.',
  //     })
  //   }
  //   this.loading = false
  // },
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid
    },
    motifErrors() {
      const errors = []

      if (!this.$v.form.motif.$dirty) return errors

      !this.$v.form.motif.required &&
        errors.push(this.$t('validations.motif.required'))

      !this.$v.form.motif.minLength &&
        errors.push(
          this.$t('validations.motif.min', {
            length: this.$v.form.motif.$params.minLength.min,
          })
        )

      !this.$v.form.motif.maxLength &&
        errors.push(
          this.$t('validations.motif.max', {
            length: this.$v.form.motif.$params.maxLength.max,
          })
        )

      return errors
    },
    montantErrors() {
      const errors = []

      if (!this.$v.form.montant.$dirty) return errors

      !this.$v.form.montant.required &&
        errors.push(this.$t('validations.montant.required'))

      !this.$v.form.montant.minLength &&
        errors.push(
          this.$t('validations.montant.min', {
            length: this.$v.form.montant.$params.minLength.min,
          })
        )

      !this.$v.form.montant.maxLength &&
        errors.push(
          this.$t('validations.montant.max', {
            length: this.$v.form.montant.$params.maxLength.max,
          })
        )

      return errors
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        motif: '',
        montant: '',
      }

      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.saveDecaissement({
            motif: this.form.motif,
            montant: this.form.montant,
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
