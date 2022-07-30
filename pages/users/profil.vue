<template>
  <v-container
    :class="{
      'container pa-4 my-12': $vuetify.breakpoint.smAndDown,
      'container pa-10 my-12': $vuetify.breakpoint.mdAndUp,
    }"
  >
    <!-- alert -->
    <!-- avatar -->
    <v-card class="mx-auto text-center pb-5 pl-10 pr-10 pt-10 mb-4" width="700">
      <v-row class="justify-center">
        <v-avatar size="130">
          <img :src="avatar" :alt="fullname" />
        </v-avatar>
      </v-row>
      <!-- name -->
      <v-row class="justify-center pb-2">
        <span class="title text-secondary py-2 font-weight-bold">{{
          fullname
        }}</span>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.trim="form.nom"
            :label="$t('user.form.nom')"
            autocomplete="off"
            :maxlength="$v.form.nom.$params.maxLength.max"
            :error-messages="nomErrors"
            @input="$v.form.nom.$touch()"
            @blur="$v.form.nom.$touch()"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
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

        <v-col cols="12">
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

        <v-col cols="12">
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
        <v-col cols="12">
          <v-text-field
            v-model.trim.lazy="form.password"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('user.form.password')"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            autocomplete="off"
            outlined
            clearable
            :error-messages="passwordErrors"
            @click:append="showPassword = !showPassword"
            @input="$v.form.password.$touch()"
            @blur="$v.form.password.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model.trim.lazy="form.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('user.form.confirmPassword')"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            autocomplete="off"
            outlined
            clearable
            :error-messages="confirmPasswordErrors"
            @click:append="showPassword = !showPassword"
            @input="$v.form.confirmPassword.$touch()"
            @blur="$v.form.confirmPassword.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-btn
            color="secondary"
            text
            block
            tile
            elevation="0"
            @click="backToPreviousPage()"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn color="primary" depressed>
            {{ $t('commoin.actions.save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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
import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'ProfilPage',
  layout: 'default',

  data() {
    return {
      form: {
        id: 0,
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        nom: this.$auth.user.nom,
        prenom: this.$auth.user.prenom,
        password: '',
        confirmPassword: '',
        profils: this.$auth.user.profils,
      },
      isUnique: {
        username: false,
        email: false,
      },
      isPending: {
        username: false,
        email: false,
      },
      isLoaded: {
        username: false,
        email: false,
      },
      showPassword: false,
      loading: false,
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

      password: {
        minLength: minLength(8),
        hasLowercase,
        hasUppercase,
        hasNumber,
      },

      confirmPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch(
        'utilisateur/fetchUtilisateur',
        this.$auth.user.id
      )
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
    this.loading = false
  },

  computed: {
    avatar() {
      if (this.$auth.user) {
        return '/img/avatar.png'
      } else {
        return ''
      }
    },
    fullname() {
      if (this.$auth.user) {
        const title = `${this.$auth.user.nom} ${this.$auth.user.prenom}`
        return startCase(title)
      } else {
        return ''
      }
    },

    itemObject() {
      if (this.user) {
        return this.user
      } else {
        return {}
      }
    },

    ...mapState({
      user: (state) => state.utilisateur.utilisateur,
    }),

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
          const result = await this.$api.checkUserCennectUsernameUpdate(
            this.form.username
          )
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
          const result = await this.$api.checkUserCennectEmailUpdate(
            this.form.email
          )
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
  },
}
</script>
