<template>
  <v-container fluid class="ml-0 mr-0 mb-10">
    <v-card class="mt-5 mb-15 pb-3 pt-5 justify-space-around">
      <v-row class="mt-3 mb-7">
        <v-col cols="12" sm="3"></v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model.lazy.trim="query"
            append-icon="mdi-magnify"
            :placeholder="$t('user.search')"
            autocomplete="off"
            type="search"
            clearable
            single-line
            hide-details
            rounded
            outlined
            filled
            solo
            dense
            @input="filter"
            @click:append="filter"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3"></v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="itemsList"
        item-key="id"
        :loading="loading"
        :mobile-breakpoint="960"
        disable-filtering
        disable-pagination
        disable-sort
        hide-default-footer
        :items-per-page="-1"
        :footer-props="{
          itemsPerPageOptions: [],
          showCurrentPage: true,
          showFirstLastPage: true,
        }"
      >
        <template #[`item.num`]="{ item }">
          {{ itemPosition(item.id) }}
        </template>

        <template #[`item.profils`]="{ item }">
          <span v-for="p in item.profils" :key="p.id">
            | {{ startCase(`${p.libelle}`) }} </span
          >|
        </template>
        <template #[`item.action`]="{ item }">
          <!-- Edit -->
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('commoin.actions.edit')"
                v-on="on"
                @click.stop="editItem(item)"
              >
                <v-icon color="editIcone" small> mdi-pencil </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.edit') }}
            </span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('commoin.actions.editPass')"
                v-on="on"
                @click.stop="editPassItem(item)"
              >
                <v-icon small> mdi-lock-reset </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.editPass') }}
            </span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-divider v-if="isDividerVisible" />
      <Pagination
        v-if="query"
        :search="query"
        store="utilisateur"
        collection="utilisateurs"
        action="searchUtilisateurs"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <Pagination
        v-else
        store="utilisateur"
        collection="utilisateurs"
        action="fetchUtilisateurs"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
    <UserCreate @refreshPage="refreshPage" />
    <UserEdit ref="editFormDialog" @refreshPage="refreshPage" />
    <UserPasswordEdit ref="editPassFormDialog" @refreshPage="refreshPage" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, startCase } from '~/helpers/helpers.js'
import UserCreate from '~/components/pages/utilisateur/UserCreate.vue'
import UserEdit from '~/components/pages/utilisateur/UserEdit.vue'
import UserPasswordEdit from '~/components/pages/utilisateur/UserPasswordEdit.vue'

export default {
  name: 'UtilisateurPage',

  components: {
    UserCreate,
    UserEdit,
    UserPasswordEdit,
  },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('user.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('user.table.username'),
          align: 'start',
          value: 'username',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('user.table.nom'),
          value: 'nom',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('user.table.prenom'),
          value: 'prenom',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('user.table.email'),
          value: 'email',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('user.table.profil'),
          value: 'profils',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('user.table.action'),
          value: 'action',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          sortable: false,
          width: 150,
        },
      ],
    }
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('utilisateur/fetchUtilisateurs', 1)
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
    this.loading = false
  },

  computed: {
    itemsList() {
      if (this.users && this.users.data) {
        return this.users.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.users) {
        return this.users.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.users) {
        const total = this.users.total || 0
        const perPage = this.users.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      users: (state) => state.utilisateur.utilisateurs,
    }),
  },
  watch: {
    // query(newValue) {
    //   this.query = this.removeSpecialCharacters(newValue)
    // },
  },
  methods: {
    removeSpecialCharacters(charactersString) {
      return charactersString.replace(/[#$%^&*.?()\d[\]{}_]/gi, '')
      // return charactersString.replace(/[^\w\s]/gi, '')
    },
    toggleLoading(value) {
      this.loading = value
    },
    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.id === itemId) + 1
    },
    editItem(item) {
      this.$refs.editFormDialog.openDialog(item)
    },
    editPassItem(item) {
      this.$refs.editPassFormDialog.openDialog(item)
    },
    startCase(str) {
      if (str) {
        return startCase(str)
      } else {
        return 'n/a'
      }
    },

    replace(str) {
      if (str) {
        if (str.includes('/')) return str.replaceAll('/', '-')
        else if (str.includes('-')) return str.replaceAll('-', '&&')
        else return str
      } else {
        return 'n/a'
      }
    },
    async fetchData(page) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('utilisateur/searchUtilisateurs', {
            page,
            s: this.replace(this.query),
          })
        } else {
          await this.$store.dispatch('utilisateur/fetchUtilisateurs', page)
        }
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
      this.loading = false
    },

    refreshPage(payload) {
      let page = 1
      if (payload === 1) {
        page = this.currentPage
      }
      this.fetchData(page)
    },

    filter: debounce(function () {
      this.fetchData(1)
    }),
  },
}
</script>
