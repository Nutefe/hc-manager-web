<template>
  <v-container class="fill-height py-6 py-sm-10 py-md-12">
    <!-- Page Not Found -->
    <v-row v-if="error.statusCode === 404" align="center" justify="center">
      <v-col cols="10" sm="6">
        <v-img src="/img/bg-page-not-found.svg"></v-img>
      </v-col>

      <v-col cols="12" sm="10" lg="8">
        <v-card outlined class="text-center" color="transparent">
          <v-card-text
            class="text-subtitle-2 text-md-subtitle-1 text-uppercase font-weight-medium"
          >
            {{ pageNotFound.message }}
          </v-card-text>

          <v-btn
            color="primary"
            outlined
            rounded
            nuxt
            :to="localePath(homepageRoute.path)"
          >
            {{ homepageRoute.label }}
            <v-icon right>{{ homepageRoute.icon }}</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Other Error -->
    <v-row v-else align="center" justify="center">
      <v-col cols="10" sm="6">
        <v-img src="/img/bg-empty2.svg"></v-img>
      </v-col>

      <v-col cols="12" sm="10" lg="8">
        <v-card outlined class="text-center" color="transparent">
          <v-card-text
            class="text-subtitle-2 text-md-subtitle-1 text-uppercase font-weight-medium"
          >
            {{ otherError.message }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'auth',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      homepageRoute: {
        label: this.$t('navigation.dashboard'),
        icon: 'mdi-earth-arrow-right',
        path: '/',
      },
      pageNotFound: {
        title: this.$t('error.pageNotFound'),
        message: this.$t('error.pageNotFoundMessage'),
      },
      otherError: {
        title: this.$t('error.otherError'),
        message: this.$t('error.otherErrorMessage'),
      },
    }
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? this.pageNotFound.title
        : this.otherError.title
    return {
      title,
    }
  },
}
</script>
