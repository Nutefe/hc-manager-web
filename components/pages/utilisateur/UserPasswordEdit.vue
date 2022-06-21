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
                {{ $t('user.edit') }}
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
            <v-col cols="12" sm="12">
              <v-text-field
                v-model.trim="form.password"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('user.form.password')"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                autocomplete="off"
                :error-messages="passwordErrors"
                @click:append="showPassword = !showPassword"
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12">
              <v-text-field
                v-model.trim="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :label="$t('user.form.confirmPassword')"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                autocomplete="off"
                :error-messages="confirmPasswordErrors"
                @click:append="showConfirmPassword = !showConfirmPassword"
                @input="$v.form.confirmPassword.$touch()"
                @blur="$v.form.confirmPassword.$touch()"
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
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import {
  hasLowercase,
  hasUppercase,
  hasNumber,
} from '~/helpers/customValidators'
import { isEqual } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      id: null,
      form: {
        password: '',
        confirmPassword: '',
      },
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
        hasLowercase,
        hasUppercase,
        hasNumber,
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },

  computed: {
    isFormValid() {
      const isFormEdited = !isEqual(this.selectedItem, this.form)

      return isFormEdited && !this.$v.form.$invalid
    },

    passwordErrors() {
      const errors = []

      if (!this.$v.form.password.$dirty) return errors

      !this.$v.form.password.required &&
        errors.push(this.$t('validations.password.required'))

      !this.$v.form.password.minLength &&
        errors.push(
          this.$t('validations.password.min', {
            length: this.$v.form.password.$params.minLength.min,
          })
        )

      !this.$v.form.password.hasLowercase &&
        errors.push(this.$t('validations.password.lowercase'))

      !this.$v.form.password.hasUppercase &&
        errors.push(this.$t('validations.password.uppercase'))

      !this.$v.form.password.hasNumber &&
        errors.push(this.$t('validations.password.number'))

      return errors
    },
    confirmPasswordErrors() {
      const errors = []

      if (!this.$v.form.confirmPassword.$dirty) return errors

      !this.$v.form.confirmPassword.required &&
        errors.push(this.$t('validations.confirmPassword.required'))

      !this.$v.form.confirmPassword.sameAsPassword &&
        errors.push(this.$t('validations.confirmPassword.confirmed'))

      return errors
    },
  },
  methods: {
    openDialog(item) {
      this.id = item.id
      this.form = {
        password: '',
        confirmPassword: '',
      }

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.id = null
      this.form = {
        password: '',
        confirmPassword: '',
      }

      this.loading = false
    },
    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.updatePasswordUser(
            {
              nouveau: this.form.password,
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
