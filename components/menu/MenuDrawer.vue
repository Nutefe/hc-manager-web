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
      </v-list-item-group>
      <v-list-group
        v-if="isCaisse"
        v-model="paiementsRoutes.active"
        :prepend-icon="paiementsRoutes.icon"
        no-action
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title
              v-text="paiementsRoutes.title"
            ></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in paiementsRoutes.paths"
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

        <template v-for="item in parameterRoutes.paths">
          <template v-if="!item.child">
            <v-list-item
              :key="`${item.title}-drawer-route`"
              :to="localePath(item.path)"
              nuxt
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-else>
            <v-menu
              ref="setting"
              :key="`${item.title}-drawer-route`"
              transition="slide-x-transition"
              open-on-click
              offset-x
              left
            >
              <template #activator="{ on, attrs }">
                <v-list-item v-bind="attrs" :title="item.title" v-on="on">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon small> mdi-chevron-right </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </template>

              <v-card>
                <v-list outlined nav dense>
                  <v-row dense no-gutters>
                    <v-col
                      v-for="n in item.child"
                      :key="`${n.title}-drawer-route`"
                      cols="12"
                    >
                      <v-list-item
                        color="primary"
                        :title="n.title"
                        link
                        :to="localePath(n.path)"
                        @click="$refs.setting.isActive = false"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ n.title }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-list>
              </v-card>
            </v-menu>
          </template>
        </template>
      </v-list-group>
    </v-list>
    <v-divider />

    <v-list shaped>
      <v-list-item :to="localePath(document.path)">
        <v-list-item-icon class="mr-3">
          <v-icon v-text="document.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="document.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="localePath(helpe.path)">
        <v-list-item-icon class="mr-3">
          <v-icon v-text="helpe.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="helpe.title" />
        </v-list-item-content>
      </v-list-item>
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
