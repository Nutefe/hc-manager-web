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
                <v-select
                  v-model.trim.lazy="form.type"
                  :items="types"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('etat.form.type')"
                  return-object
                  :error-messages="typeErrors"
                  @input="$v.form.type.$touch()"
                  @blur="$v.form.type.$touch()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model.trim.lazy="form.assurance"
                  :items="matchedAssurances"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('etat.form.assurance')"
                  return-object
                  :error-messages="assuranceErrors"
                  @input="$v.form.assurance.$touch()"
                  @blur="$v.form.assurance.$touch()"
                ></v-autocomplete>
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
                      v-model="form.startDate"
                      :label="$t('etat.form.startDate')"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      :maxlength="$v.form.startDate.$params.maxLength.max"
                      :error-messages="startDateErrors"
                      @blur="
                        startDate = parseDate(form.startDate)
                        $v.form.startDate.$touch()
                      "
                      @input="$v.form.startDate.$touch()"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
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
                      v-model="form.endDate"
                      :label="$t('etat.form.endDate')"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="endDate = parseDate(form.endDate)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
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
import { isDate } from '~/helpers/customValidators.js'

export default {
  data() {
    return {
      dialog: false,
      dialogNo: false,
      loading: false,
      startDate: new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .substr(0, 10),
      endDate: new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      types: [
        {
          id: 1,
          libelle: this.$t('etat.type.patient'),
        },
        {
          id: 2,
          libelle: this.$t('etat.type.entreprise'),
        },
      ],
      form: {
        startDate: this.formatDate(
          new Date(new Date().getFullYear(), 0, 1).toISOString().substr(0, 10)
        ),
        type: {},
        endDate: this.formatDate(
          new Date(new Date().getFullYear(), 0, 1).toISOString().substr(0, 10)
        ),
        assurance: {},
        entreprise: {},
      },
    }
  },
  validations: {
    form: {
      startDate: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
      endDate: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
      assurance: {
        required,
      },
      type: {
        required,
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('assurance/fetchAllAssurances')
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
      return !this.$v.form.$invalid
    },

    computedDateFormatted() {
      return this.formatDate(this.dateFin)
    },

    startDateErrors() {
      const errors = []

      if (!this.$v.form.startDate.$dirty) return errors

      !this.$v.form.startDate.required &&
        errors.push(this.$t('validations.startDate.required'))

      !this.$v.form.startDate.minLength &&
        errors.push(
          this.$t('validations.startDate.min', {
            length: this.$v.form.startDate.$params.minLength.min,
          })
        )

      !this.$v.form.startDate.maxLength &&
        errors.push(
          this.$t('validations.startDate.max', {
            length: this.$v.form.startDate.$params.maxLength.max,
          })
        )

      return errors
    },
    endDateErrors() {
      const errors = []

      if (!this.$v.form.endDate.$dirty) return errors

      !this.$v.form.endDate.required &&
        errors.push(this.$t('validations.endDate.required'))

      !this.$v.form.endDate.minLength &&
        errors.push(
          this.$t('validations.endDate.min', {
            length: this.$v.form.endDate.$params.minLength.min,
          })
        )

      !this.$v.form.endDate.maxLength &&
        errors.push(
          this.$t('validations.endDate.max', {
            length: this.$v.form.endDate.$params.maxLength.max,
          })
        )

      return errors
    },

    typeErrors() {
      const errors = []

      if (!this.$v.form.type.$dirty) return errors

      !this.$v.form.type.required &&
        errors.push(this.$t('validations.type.required'))

      return errors
    },
    assuranceErrors() {
      const errors = []

      if (!this.$v.form.assurance.$dirty) return errors

      !this.$v.form.assurance.required &&
        errors.push(this.$t('validations.assurance.required'))

      return errors
    },

    matchedAssurances() {
      return this.assurances.map((assurance) => {
        const assurances = assurance.libelle
        return Object.assign({}, assurance, { assurances })
      })
    },

    ...mapState({
      assurances: (state) => state.assurance.allAssurances,
    }),
  },
  watch: {
    startDate() {
      this.form.startDate = this.formatDate(this.startDate)
    },
    endDate() {
      this.form.endDate = this.formatDate(this.endDate)
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        startDate: '',
        type: {},
        endDate: '',
        assurance: {},
      }

      this.loading = false
    },

    openDialog() {
      this.dialog = true

      this.$v.form.$reset()

      this.form = {
        startDate: '',
        type: {},
        endDate: '',
        assurance: {},
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
          if (this.form.type.id === 1) {
            await this.$api.saveEtatPatient({
              start: this.parseDate(this.form.startDate),
              end: this.parseDate(this.form.endDate),
              type: this.form.type.libelle,
              assurance: this.form.assurance,
            })
          } else {
            await this.$api.saveEtatEntreprise({
              start: this.parseDate(this.form.startDate),
              end: this.parseDate(this.form.endDate),
              type: this.form.type.libelle,
              assurance: this.form.assurance,
            })
          }

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
