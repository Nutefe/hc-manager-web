<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        persistent
        scrollable
        max-width="800"
      >
        <v-card :disabled="loading" :loading="loading">
          <v-card-title class="px-3 px-md-5 py-2 py-md-3">
            <v-row align="center">
              <v-col cols="9">
                <span class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('facture.newPro') }}
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

          <v-card-text class="px-3 px-md-5 pt-2">
            <v-row align="center">
              <v-col cols="12" sm="5" class="pb-0">
                <v-text-field
                  v-model.trim.lazy="form.nom"
                  :label="$t('patient.form.nom')"
                  autocomplete="off"
                  :maxlength="$v.form.nom.$params.maxLength.max"
                  :error-messages="nomErrors"
                  @input="$v.form.nom.$touch()"
                  @blur="$v.form.nom.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="5" class="pb-0">
                <v-text-field
                  v-model.trim.lazy="form.prenom"
                  :label="$t('patient.form.prenom')"
                  autocomplete="off"
                  :maxlength="$v.form.prenom.$params.maxLength.max"
                  :error-messages="prenomErrors"
                  @input="$v.form.prenom.$touch()"
                  @blur="$v.form.prenom.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" class="pb-0">
                <v-text-field
                  v-model.trim.lazy="form.age"
                  :label="$t('patient.form.age')"
                  type="number"
                  autocomplete="off"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5" class="pb-0">
                <v-text-field
                  v-model.trim.lazy="form.traitement"
                  :label="$t('traitement.form.libelle')"
                  autocomplete="off"
                  :maxlength="$v.form.traitement.$params.maxLength.max"
                  :error-messages="traitementErrors"
                  @input="$v.form.traitement.$touch()"
                  @blur="$v.form.traitement.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="5" class="pb-0">
                <v-text-field
                  v-model.trim.lazy="form.price"
                  :label="$t('traitement.form.price')"
                  type="number"
                  autocomplete="off"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" class="pb-0 pt-1 d-flex justify-center">
                <v-tooltip v-if="isFormTraitemment" left>
                  <template #activator="{ on, attrs }">
                    <v-avatar
                      v-if="isFormTraitemment"
                      color="primary"
                      size="40"
                      dark
                      v-bind="attrs"
                      class="d-flex elevation-10 mt-2"
                      :aria-label="$t('facture.adds.a1')"
                      @click.stop="addItem"
                      v-on="on"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-avatar>
                  </template>
                  <span>{{ $t('facture.adds.a1') }}</span>
                </v-tooltip>
                <v-tooltip v-else left>
                  <template #activator="{ on, attrs }">
                    <v-avatar
                      color="red"
                      size="40"
                      dark
                      v-bind="attrs"
                      class="d-flex elevation-10 mt-2"
                      :aria-label="$t('facture.adds.a2')"
                      v-on="on"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-avatar>
                  </template>
                  <span>{{ $t('facture.adds.a2') }}</span>
                </v-tooltip>
              </v-col>

              <template v-if="itemsList.length > 0">
                <v-col cols="12" sm="12" class="pb-0">
                  <v-expand-transition>
                    <v-simple-table
                      fixed-header
                      height="200px"
                      color="grey darken-1"
                      class="px-3 px-md-5 pt-2"
                      dark
                    >
                      <thead>
                        <tr>
                          <th
                            v-for="header in headers"
                            :key="header.text"
                            class="text-left"
                          >
                            {{ header.text }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in itemsList" :key="index + 1">
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.traitement }}</td>
                          <td>{{ item.price }}</td>
                          <td>
                            <v-icon small @click="itemDelete(index)"
                              >mdi-close</v-icon
                            >
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-expand-transition>
                </v-col>
              </template>
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
import { isEqual, numberFormat } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      disable: false,
      itemsList: [],
      form: {
        nom: '',
        prenom: '',
        traitement: '',
        age: 0,
        price: 0,
      },
      headers: [
        {
          text: this.$t('facture.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('facture.table.traitement'),
          align: 'start',
          value: 'traitement',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.prix'),
          value: 'price',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.action'),
          value: 'action',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
      ],
    }
  },
  validations: {
    form: {
      nom: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      prenom: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
      traitement: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(100),
      },
    },
  },

  computed: {
    isFormValid() {
      const isFormItem = this.itemsList.length > 0

      return isFormItem && !this.$v.form.$invalid
    },

    isFormTraitemment() {
      if (this.form.traitement) {
        return true
      } else {
        return false
      }
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
    traitementErrors() {
      const errors = []

      if (!this.$v.form.traitement.$dirty) return errors

      !this.$v.form.traitement.required &&
        errors.push(this.$t('validations.traitement.required'))

      !this.$v.form.traitement.minLength &&
        errors.push(
          this.$t('validations.traitement.min', {
            length: this.$v.form.traitement.$params.minLength.min,
          })
        )

      !this.$v.form.traitement.maxLength &&
        errors.push(
          this.$t('validations.traitement.max', {
            length: this.$v.form.traitement.$params.maxLength.max,
          })
        )

      return errors
    },
  },
  watch: {},

  methods: {
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        nom: '',
        prenom: '',
        age: 0,
        traitement: '',
        price: 0,
      }

      this.loading = false
    },

    openDialog() {
      this.dialog = true

      this.$v.form.$reset()

      this.form = {
        nom: '',
        prenom: '',
        age: 0,
        traitement: '',
        price: 0,
      }

      this.itemsList = []

      this.loading = false
    },

    numberFormat(str) {
      if (str) {
        return numberFormat(str)
      } else {
        return numberFormat(0)
      }
    },

    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.traitement === itemId) + 1
    },

    itemDelete(index) {
      this.itemsList.splice(index, 1)
    },

    addItem() {
      const isPresent = this.itemsList.find((o) =>
        isEqual(o.traitement, this.form.traitement)
      )
      if (!isPresent) {
        const item = {}

        item.traitement = this.form.traitement
        item.price = this.form.price
        this.itemsList.push(item)
      }
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true
        try {
          await this.$api.saveFactureProforma({
            nom: this.form.nom,
            prenom: this.form.prenom,
            age: this.form.age,
            traitements: this.itemsList,
          })
          this.$emit('refreshPage')

          // this.closeDialog()
          this.loading = false
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
