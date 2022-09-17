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
                  {{ $t('reserve.edit') }}
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
                <v-autocomplete
                  v-model.trim.lazy="form.caisse"
                  :items="matchedCaisses"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('reserve.form.caisse')"
                  return-object
                  :error-messages="caisseErrors"
                  @input="$v.form.caisse.$touch()"
                  @blur="$v.form.caisse.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.trim="form.libelle"
                  autofocus
                  :label="$t('reserve.form.libelle')"
                  autocomplete="off"
                  :maxlength="$v.form.libelle.$params.maxLength.max"
                  :error-messages="libelleErrors"
                  @input="$v.form.libelle.$touch()"
                  @blur="$v.form.libelle.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.trim="form.montantDefini"
                  autofocus
                  :label="$t('reserve.form.montantDefini')"
                  autocomplete="off"
                  type="number"
                  :maxlength="$v.form.montantDefini.$params.maxLength.max"
                  :error-messages="montantDefiniErrors"
                  @input="$v.form.montantDefini.$touch()"
                  @blur="$v.form.montantDefini.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.time"
                      :label="$t('reserve.form.time')"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      :maxlength="$v.form.time.$params.maxLength.max"
                      :error-messages="timeErrors"
                      @input="$v.form.time.$touch()"
                      @blur="$v.form.time.$touch()"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="form.time"
                    full-width
                    @click:minute="$refs.menu.save(form.time)"
                  ></v-time-picker>
                </v-menu>
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

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      phoneMask: '## ## ## ##',
      isVisible: false,
      menu2: false,
      id: null,
      selectedItem: {
        libelle: '',
        montantDefini: '',
        time: null,
        caisse: null,
      },
      form: {
        libelle: '',
        montantDefini: '',
        time: null,
        caisse: null,
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
      montantDefini: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      time: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(6),
      },
      caisse: {
        required,
      },
    },
  },
  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('caisse/fetchAllCaisses')
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
    montantDefiniErrors() {
      const errors = []

      if (!this.$v.form.montantDefini.$dirty) return errors

      !this.$v.form.montantDefini.required &&
        errors.push(this.$t('validations.montant.required'))

      !this.$v.form.montantDefini.minLength &&
        errors.push(
          this.$t('validations.montant.min', {
            length: this.$v.form.montantDefini.$params.minLength.min,
          })
        )

      !this.$v.form.montantDefini.maxLength &&
        errors.push(
          this.$t('validations.montant.max', {
            length: this.$v.form.montantDefini.$params.maxLength.max,
          })
        )

      return errors
    },
    timeErrors() {
      const errors = []

      if (!this.$v.form.time.$dirty) return errors

      !this.$v.form.time.required &&
        errors.push(this.$t('validations.time.required'))

      !this.$v.form.time.minLength &&
        errors.push(
          this.$t('validations.time.min', {
            length: this.$v.form.time.$params.minLength.min,
          })
        )

      !this.$v.form.time.maxLength &&
        errors.push(
          this.$t('validations.time.max', {
            length: this.$v.form.time.$params.maxLength.max,
          })
        )

      return errors
    },
    caisseErrors() {
      const errors = []

      if (!this.$v.form.caisse.$dirty) return errors

      !this.$v.form.caisse.required &&
        errors.push(this.$t('validations.caisse.required'))

      return errors
    },
    matchedCaisses() {
      return this.caisses.map((caisse) => {
        const caisses = caisse.libelle
        return Object.assign({}, caisse, { caisses })
      })
    },
    ...mapState({
      caisses: (state) => state.caisse.allCaisses,
    }),
  },
  methods: {
    openDialog(item) {
      this.id = item.id

      this.form = {
        caisse: item.caisse || null,
        libelle: item.libelle || '',
        montantDefini: item.montantDefini || '',
        time: item.heure || null,
      }

      this.selectedItem = Object.assign({}, this.form)

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()
      this.id = null
      this.form = {
        caisse: null,
        libelle: '',
        montantDefini: '',
        time: null,
      }
      this.selectedItem = {
        caisse: null,
        libelle: '',
        montantDefini: '',
        time: null,
      }

      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true
        try {
          await this.$api.updateReserve(
            {
              caisse: this.form.caisse,
              libelle: this.form.libelle,
              montantDefini: this.form.montantDefini,
              heure: this.form.time,
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
