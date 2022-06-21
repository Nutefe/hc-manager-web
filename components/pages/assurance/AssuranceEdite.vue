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
                  {{ $t('assurance.edit') }}
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
                  v-model.trim="form.libelle"
                  autofocus
                  :label="$t('assurance.form.libelle')"
                  autocomplete="off"
                  :maxlength="$v.form.libelle.$params.maxLength.max"
                  :error-messages="libelleErrors"
                  @input="$v.form.libelle.$touch()"
                  @blur="$v.form.libelle.$touch()"
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
import { isEqual } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      phoneMask: '## ## ## ##',
      isVisible: false,
      id: null,
      selectedItem: {
        libelle: '',
      },
      form: {
        libelle: '',
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
    },
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
  },
  methods: {
    openDialog(item) {
      this.id = item.id

      this.form = {
        libelle: item.libelle || '',
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
      }
      this.selectedItem = {
        libelle: '',
      }

      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true
        try {
          await this.$api.updateAssurance(
            {
              libelle: this.form.libelle,
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
