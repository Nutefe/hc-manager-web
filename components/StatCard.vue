<template>
  <v-card hover outlined>
    <v-list-item two-line>
      <v-list-item-avatar :color="stat.color" size="55">
        <v-icon dark size="25" v-text="stat.icon" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          class="text-h5 font-weight-medium text--primary"
          v-text="stat.value"
        />

        <v-list-item-subtitle
          class="text-subtitle-1 text-uppercase text--secondary font-weight-medium"
          v-text="stat.title"
        />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon nuxt :aria-label="stat.title" :to="localePath(stat.to)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object,
      default: null,
      required: true,
    },
  },
}
</script>
