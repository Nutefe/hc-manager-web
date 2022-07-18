<template>
  <v-timeline>
    <v-timeline-item v-for="n in 3" :key="n" color="red lighten-2" small>
      <v-card class="elevation-2">
        <v-card-title class="text-h5"> Lorem ipsum </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, no nam oblique veritus.
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default {}
</script>
