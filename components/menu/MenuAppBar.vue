<template>
  <v-app-bar id="navBar" color="secondary" app elevate-on-scroll>
    <v-container class="pa-0 px-md-4 fill-height">
      <!-- Title -->
      <v-toolbar-title class="px-0">
        <nuxt-link :to="localePath('/')">
          <v-avatar :size="$vuetify.breakpoint.smAndDown ? 30 : 40">
            <v-img src="/icon.png" :alt="$t('brand.title')" />
          </v-avatar>

          <span
            class="white--text text-subtitle-1 text-md-h6 font-weight-medium mr-2"
          >
            {{ $t('brand.title') }}
          </span>
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <!-- Mobile -->
      <template v-if="$vuetify.breakpoint.mobile">
        <!-- Drawer Icon -->
        <v-app-bar-nav-icon
          class="mr-n2 white--text"
          :aria-label="$t('drawer.open')"
          @click.stop="drawer = !drawer"
        />
      </template>

      <!-- Desktop -->
      <template v-else>
        <!-- Regular Routes -->
        <v-btn
          id="dashboard"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath(dashboardRoutes.path)"
        >
          <v-icon left v-text="dashboardRoutes.icon" />
          {{ dashboardRoutes.title }}
        </v-btn>
        <v-btn
          v-if="isSecretaire"
          id="factures"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath(facturesRoutes.path)"
        >
          <v-icon left v-text="facturesRoutes.icon" />
          {{ facturesRoutes.title }}
        </v-btn>
        <v-btn
          v-if="isSecretaire"
          id="patients"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath(patientsRoutes.path)"
        >
          <v-icon left v-text="patientsRoutes.icon" />
          {{ patientsRoutes.title }}
        </v-btn>
        <v-btn
          v-if="isCaisse"
          id="paiements"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath(paiementsRoutes.path)"
        >
          <v-icon left v-text="paiementsRoutes.icon" />
          {{ paiementsRoutes.title }}
        </v-btn>
        <!-- <v-btn
          v-if="isGestionnaire"
          id="rapport"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath('')"
        >
          <v-icon left v-text="gestionRoutes.icon" />
          {{ gestionRoutes.title }}
        </v-btn> -->
        <v-menu
          activator="#paiements"
          bottom
          attach="#navBar"
          right
          offset-y
          origin="top right"
          transition="slide-y-transition"
          active-class="primary--text"
        >
          <v-list>
            <v-list-item
              v-for="item in paiementsRoutes.paths"
              :key="`${item.title}-drawer-route`"
              :to="localePath(item.path)"
              link
              color="primary"
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="isGestionnaire"
          id="rapport"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath('')"
        >
          <v-icon left v-text="gestionRoutes.icon" />
          {{ gestionRoutes.title }}
        </v-btn>
        <v-menu
          activator="#rapport"
          bottom
          attach="#navBar"
          right
          offset-y
          origin="top right"
          transition="slide-y-transition"
          active-class="primary--text"
        >
          <v-list>
            <v-list-item
              v-for="item in gestionRoutes.paths"
              :key="`${item.title}-drawer-route`"
              :to="localePath(item.path)"
              link
              color="primary"
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="isDirecteur || isSys"
          id="setting"
          text
          nuxt
          class="white--text mr-1"
          active-class="yello"
          :to="localePath('')"
        >
          <v-icon left v-text="parameterRoutes.icon" />
          {{ parameterRoutes.title }}
        </v-btn>
        <v-menu
          activator="#setting"
          bottom
          attach="#navBar"
          right
          offset-y
          origin="top right"
          transition="slide-y-transition"
          active-class="primary--text"
        >
          <v-list>
            <v-list-item
              v-for="item in parameterRoutes.paths"
              :key="`${item.title}-drawer-route`"
              :to="localePath(item.path)"
              link
              color="primary"
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Avatar -->
        <v-btn
          id="avatar"
          height="35"
          width="35"
          icon
          :aria-label="$t('profil.title')"
        >
          <v-avatar size="35">
            <v-img
              :src="avatar"
              :alt="fullname"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </v-btn>

        <!-- Dropdown -->
        <v-menu
          content-class="mt-1"
          activator="#avatar"
          bottom
          attach="#navBar"
          left
          offset-y
          origin="top right"
          transition="slide-y-transition"
        >
          <v-card>
            <v-list width="320" nav>
              <v-list-item
                class="no-active"
                :to="localePath(profileRoute.path)"
                nuxt
              >
                <v-list-item-avatar size="70">
                  <v-img
                    :src="avatar"
                    :alt="fullname"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="text-subtitle-1 font-weight-medium my-1"
                    v-text="fullname"
                  />

                  <v-list-item-subtitle v-text="profileRoute.subtitle" />
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2" />

              <v-list-item @click="logoutUser">
                <v-list-item-icon class="mr-3">
                  <v-icon v-text="logout.icon" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="logout.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mixinMenu } from '~/mixins/mixinMenu.js'
import { mixinProfils } from '~/mixins/mixinProfils.js'

export default {
  mixins: [mixinMenu, mixinProfils],
}
</script>
