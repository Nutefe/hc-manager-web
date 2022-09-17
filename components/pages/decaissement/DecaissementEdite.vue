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
                  {{ $t('decaissement.edit') }}
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
// import { mapState } from 'vuex'
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
        motif: '',
        montant: '',
      },
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
      // utilisateur: {
      //   required,
      // },
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
      const isFormEdited = !isEqual(this.selectedItem, this.form)

      return isFormEdited && !this.$v.form.$invalid
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
    // utilisateurErrors() {
    //   const errors = []

    //   if (!this.$v.form.utilisateur.$dirty) return errors

    //   !this.$v.form.utilisateur.required &&
    //     errors.push(this.$t('validations.utilisateur.required'))

    //   return errors
    // },

    // matchedUtilisateurs() {
    //   return this.utilisateurs.map((utilisateur) => {
    //     const utilisateurs = utilisateur.nom
    //     return Object.assign({}, utilisateur, { utilisateurs })
    //   })
    // },
    // ...mapState({
    //   utilisateurs: (state) => state.utilisateur.allUtilisateursCaisse,
    // }),
  },
  methods: {
    openDialog(item) {
      this.id = item.id

      this.form = {
        motif: item.motif || '',
        montant: item.montant || '',
        // utilisateur: {},
      }

      this.selectedItem = Object.assign({}, this.form)

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()
      this.id = null
      this.form = {
        motif: '',
        montant: '',
        // utilisateur: {},
      }
      this.selectedItem = {
        motif: '',
        montant: '',
        // utilisateur: {},
      }

      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true
        try {
          await this.$api.updateDecaissement(
            {
              motif: this.form.motif,
              montant: this.form.montant,
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
