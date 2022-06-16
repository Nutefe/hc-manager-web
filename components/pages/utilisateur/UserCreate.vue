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
                  {{ $t('user.new') }}
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
                  v-model.trim="form.nom"
                  autofocus
                  :label="$t('user.form.nom')"
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
                  :label="$t('user.form.prenom')"
                  autocomplete="off"
                  :maxlength="$v.form.prenom.$params.maxLength.max"
                  :error-messages="prenomErrors"
                  @input="$v.form.prenom.$touch()"
                  @blur="$v.form.prenom.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim.lazy="form.username"
                  :label="$t('user.form.username')"
                  autocomplete="off"
                  :maxlength="$v.form.username.$params.maxLength.max"
                  :error-messages="usernameErrors"
                  @input="
                    $v.form.username.$touch()
                    checkUniqueUsername()
                  "
                  @blur="
                    $v.form.username.$touch()
                    checkUniqueUsername()
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.trim.lazy="form.email"
                  :label="$t('user.form.email')"
                  type="email"
                  autocomplete="off"
                  :maxlength="$v.form.email.$params.maxLength.max"
                  :error-messages="emailErrors"
                  @input="
                    $v.form.email.$touch()
                    checkUniqueEmail()
                  "
                  @blur="
                    $v.form.email.$touch()
                    checkUniqueEmail()
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <!-- <v-autocomplete
                  v-model.trim.lazy="form.profil"
                  :items="matchedProfils"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('user.form.profil')"
                  return-object
                  :error-messages="profilErrors"
                  @input="$v.form.profil.$touch()"
                  @blur="$v.form.profil.$touch()"
                ></v-autocomplete> -->
                <v-select
                  v-model="form.profil"
                  :items="matchedProfils"
                  item-text="libelle"
                  item-value="id"
                  autocomplete="off"
                  autofocus
                  :label="$t('user.form.profil')"
                  return-object
                  multiple
                  chips
                  deletable-chips
                  :error-messages="profilErrors"
                  @input="$v.form.profil.$touch()"
                  @blur="$v.form.profil.$touch()"
                >
                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
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

              <v-col cols="12" sm="6">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  email,
  maxLength,
  minLength,
  required,
  sameAs,
} from 'vuelidate/lib/validators'
import {
  hasLowercase,
  hasUppercase,
  hasNumber,
  usernameRegex,
} from '~/helpers/customValidators'
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
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        nom: '',
        prenom: '',
        profil: [],
      },
      isUnique: {
        username: false,
        email: false,
      },
      isPending: {
        username: false,
        email: false,
      },
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
        regex: usernameRegex,
      },
      email: {
        required,
        email,
        maxLength: maxLength(200),
      },
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
      profil: {
        required,
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('profil/fetchAllProfils')
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
        this.isUnique.username &&
        this.isUnique.email
      )
    },
    usernameErrors() {
      const errors = []

      if (!this.$v.form.username.$dirty) return errors

      !this.$v.form.username.required &&
        errors.push(this.$t('validations.username.required'))

      !this.$v.form.username.minLength &&
        errors.push(
          this.$t('validations.username.min', {
            length: this.$v.form.username.$params.minLength.min,
          })
        )

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$t('validations.username.max', {
            length: this.$v.form.username.$params.maxLength.max,
          })
        )

      !this.$v.form.username.regex &&
        errors.push(this.$t('validations.username.regex'))

      this.form.username &&
        !this.isPending.username &&
        !this.isUnique.username &&
        errors.push(this.$t('validations.username.unique'))

      return errors
    },
    emailErrors() {
      const errors = []

      if (!this.$v.form.email.$dirty) return errors

      !this.$v.form.email.required &&
        errors.push(this.$t('validations.email.required'))

      !this.$v.form.email.email &&
        errors.push(this.$t('validations.email.email'))

      !this.$v.form.email.maxLength &&
        errors.push(
          this.$t('validations.email.max', {
            length: this.$v.form.email.$params.maxLength.max,
          })
        )

      this.form.email &&
        !this.isPending.email &&
        !this.isUnique.email &&
        errors.push(this.$t('validations.email.unique'))

      return errors
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

    profilErrors() {
      const errors = []

      if (!this.$v.form.profil.$dirty) return errors

      !this.$v.form.profil.required &&
        errors.push(this.$t('validations.profil.required'))

      return errors
    },

    matchedProfils() {
      return this.profils.map((profil) => {
        const profils = profil.libelle
        return Object.assign({}, profil, { profils })
      })
    },

    likesAllFruit() {
      return this.form.profil.length === this.matchedProfils.length
    },

    icon() {
      if (this.likesAllFruit) return 'mdi-close-box'
      return 'mdi-checkbox-blank-outline'
    },

    ...mapState({
      profils: (state) => state.profil.allProfils,
    }),
  },
  watch: {
    'form.username'() {
      this.isPending.username = true
      this.isUnique.username = false
    },
    'form.email'() {
      this.isPending.email = true
      this.isUnique.email = false
    },
  },
  methods: {
    checkUniqueUsername: debounce(
      async function () {
        if (
          this.form.username === '' ||
          this.form.username === null ||
          this.$v.form.username.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUsername(this.form.username)
          this.isUnique.username = !result
        } catch (err) {
          this.isUnique.username = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.username = false
      },
      500,
      -1
    ),
    checkUniqueEmail: debounce(
      async function () {
        if (
          this.form.email === '' ||
          this.form.email === null ||
          this.$v.form.email.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkEmail(this.form.email)
          this.isUnique.email = !result
        } catch (err) {
          this.isUnique.email = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.email = false
      },
      500,
      -1
    ),

    closeDialog() {
      this.dialog = false
      this.isUnique = {
        username: false,
        email: false,
      }
      this.isPending = {
        username: false,
        email: false,
      }
      this.$v.form.$reset()

      this.form = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        nom: '',
        prenom: '',
        profil: [],
      }

      this.showPassword = false
      this.showConfirmPassword = false
      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.saveUser({
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            nom: this.form.nom,
            prenom: this.form.prenom,
            profils: this.form.profil,
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
