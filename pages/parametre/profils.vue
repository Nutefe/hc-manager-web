<template>
  <v-container class="pt-0" fluid>
    <v-card class="mt-5 mb-10 pb-3 pt-5 justify-space-around">
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
        <!-- <template #[`item.action`]="{ item }">

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
        </template> -->
      </v-data-table>

      <v-divider v-if="isDividerVisible" />
      <pagination
        v-if="query"
        :search="query"
        store="profil"
        collection="profils"
        action="searchProfils"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <pagination
        v-else
        store="profil"
        collection="profils"
        action="fetchProfils"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
    <!-- <ProfilCreate @refreshPage="refreshPage" />
    <ProfilEdite ref="profilFormDialog" @refreshPage="refreshPage" /> -->
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
// import ProfilCreate from '~/components/pages/profil/ProfilCreate.vue'
// import ProfilEdite from '~/components/pages/profil/ProfilEdite.vue'
import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'ProfilsPage',
  // components: { ProfilCreate, ProfilEdite },
  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('profils.table.num'),
          value: 'id',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('profils.table.libelle'),
          align: 'start',
          value: 'libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        // {
        //   text: this.$t('profils.table.action'),
        //   value: 'action',
        //   class: 'text-subtitle-2 text-uppercase font-weight-bold',
        //   cellClass: 'py-3',
        //   sortable: false,
        //   width: 150,
        // },
      ],
    }
  },

  async fetch() {
    this.loading = true
    // console.log(ids)
    try {
      await this.$store.dispatch('profil/fetchProfils', 1)
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
      if (this.profils && this.profils.data) {
        // console.log(this.profils)
        return this.profils.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.profils) {
        return this.profils.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.profils) {
        const total = this.profils.total || 0
        const perPage = this.profils.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      profils: (state) => state.profil.profils,
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
      this.$refs.profilFormDialog.openDialog(item)
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
    async fetchData(pages) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('profil/searchProfils', {
            page: pages,
            s: this.replace(this.query),
          })
        } else {
          await this.$store.dispatch('profil/fetchProfils', pages)
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
