<template>
  <!-- User Authenticated -->
  <v-navigation-drawer v-model="drawer" app right temporary>
    <template #prepend>
      <!-- Close Drawer -->
      <v-toolbar flat>
        <v-toolbar-title class="px-0">
          <span
            class="black--text text-subtitle-1 text-md-h6 font-weight-medium mr-2"
          >
            {{ $t('brand.title') }}
          </span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          class="mr-n2"
          :aria-label="$t('drawer.close')"
          icon
          @click.stop="closeDrawer"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <v-divider />

    <!-- Routes -->
    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item :to="localePath(dashboardRoutes.path)" nuxt>
          <v-list-item-action class="mr-3">
            <v-icon left v-text="dashboardRoutes.icon" />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="dashboardRoutes.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="isSecretaire"
          :to="localePath(facturesRoutes.path)"
          nuxt
        >
          <v-list-item-action class="mr-3">
            <v-icon left v-text="facturesRoutes.icon" />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="facturesRoutes.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="isSecretaire"
          :to="localePath(patientsRoutes.path)"
          nuxt
        >
          <v-list-item-action class="mr-3">
            <v-icon left v-text="patientsRoutes.icon" />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="patientsRoutes.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="isCaisse"
          :to="localePath(paiementsRoutes.path)"
          nuxt
        >
          <v-list-item-action class="mr-3">
            <v-icon left v-text="paiementsRoutes.icon" />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="paiementsRoutes.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider />
    <v-list>
      <v-list-group
        v-if="isGestionnaire"
        v-model="gestionRoutes.active"
        :prepend-icon="gestionRoutes.icon"
        no-action
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title v-text="gestionRoutes.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in gestionRoutes.paths"
          :key="`${child.title}-drawer-route`"
          :to="localePath(child.path)"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group
        v-if="isDirecteur || isSys"
        v-model="parameterRoutes.active"
        :prepend-icon="parameterRoutes.icon"
        no-action
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title
              v-text="parameterRoutes.title"
            ></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in parameterRoutes.paths"
          :key="`${child.title}-drawer-route`"
          :to="localePath(child.path)"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider />

    <v-list shaped>
      <v-list-item @click.stop="logoutUser">
        <v-list-item-icon active-class="primary--text">
          <v-icon>{{ logout.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content active-class="primary--text">
          <v-list-item-title>{{ logout.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mixinMenu } from '~/mixins/mixinMenu.js'
import { mixinProfils } from '~/mixins/mixinProfils.js'

export default {
  mixins: [mixinMenu, mixinProfils],
  methods: {
    closeDrawer() {
      this.$store.dispatch('toggleDrawer', false)
    },
  },
}
</script>
