<template>
  <v-main>
    <v-container class="fill-height py-8 py-sm-10">
      <v-row align="center" justify="space-around">
        <v-col cols="12" sm="8" md="5">
          <!-- Header -->

          <!-- Form -->
          <v-card
            :disabled="loading"
            :loading="loading"
            outlined
            max-width="500"
            class="mx-auto mb-4"
          >
            <v-card
              outlined
              max-width="500"
              class="text-center mx-auto mt-5"
              color="transparent"
            >
              <nuxt-link :to="localePath('/')">
                <v-avatar size="80">
                  <v-img src="/icon.png"></v-img>
                </v-avatar>
              </nuxt-link>

              <v-card-text>
                <h1 class="text-h6 text-md-h5">
                  {{ $t('brand.title') }}
                </h1>
              </v-card-text>
            </v-card>
            <v-form @submit.prevent="loginUser">
              <v-card-text>
                <v-text-field
                  v-model.trim="form.username"
                  :label="$t('connexion.username')"
                  prepend-icon="mdi-account-circle"
                  class="mb-2"
                  autocomplete="username"
                  required
                  :error-messages="usernameErrors"
                  @input="$v.form.username.$touch()"
                  @blur="$v.form.username.$touch()"
                ></v-text-field>

                <v-text-field
                  v-model.trim="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :label="$t('connexion.password')"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  autocomplete="current-password"
                  required
                  :error-messages="passwordErrors"
                  @click:append="showPassword = !showPassword"
                  @input="$v.form.password.$touch()"
                  @blur="$v.form.password.$touch()"
                ></v-text-field>
              </v-card-text>

              <v-card-text>
                <v-btn
                  block
                  color="primary"
                  class="subtitle-1 font-weight-medium mb-2"
                  large
                  depressed
                  type="submit"
                >
                  {{ $t('connexion.login') }}
                </v-btn>
              </v-card-text>
            </v-form>
          </v-card>

          <!-- Help block -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ConnexionPage',
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      step: 1,
      showPassword: false,
      loading: false,
    }
  },

  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },

  computed: {
    usernameErrors() {
      const errors = []

      if (!this.$v.form.username.$dirty) return errors

      !this.$v.form.username.required &&
        errors.push(this.$t('validations.username.required'))

      return errors
    },

    passwordErrors() {
      const errors = []

      if (!this.$v.form.password.$dirty) return errors

      !this.$v.form.password.required &&
        errors.push(this.$t('validations.password.required'))

      return errors
    },
  },

  methods: {
    resetForm() {
      this.$v.form.$reset()
      this.form = {
        username: '',
        password: '',
      }
      this.showPassword = false
      this.loading = false
    },

    async loginUser() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.loading = true

        try {
          const { data } = await this.$auth.loginWith('local', {
            data: this.form,
          })

          if (data.user.profils.length === 0) {
            await this.$auth.logout()
            this.loading = false
            this.$toast.error(this.$t('logins.accessDenied'))
          } else {
            this.$auth.setUser(data.user)

            this.resetForm()
            this.$toast.success(this.$t('logins.success'))
          }
        } catch (err) {
          this.loading = false

          if (err.response) {
            if (err.response.status === 401) {
              this.$toast.error(this.$t('logins.loginFailed'))
            } else {
              this.$toast.error(this.$t('logins.errorOccured'))
            }
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
<style scoped></style>
