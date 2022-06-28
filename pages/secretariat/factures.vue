<template>
  <v-container fluid class="container ml-0 mr-0">
    <v-card class="mt-10 mb-10 pb-3 justify-space-around">
      <v-row class="mb-5 align-middle">
        <v-col class="col-4"> </v-col>
        <v-col class="col-8">
          <v-text-field
            v-model.lazy.trim="query"
            append-icon="mdi-magnify"
            :placeholder="$t('user.search')"
            autocomplete="off"
            type="search"
            clearable
            single-line
            hide-details
            @input="filter"
            @click:append="filter"
          ></v-text-field>
        </v-col>
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
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.edit') }}
            </span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-divider v-if="isDividerVisible" />
      <Pagination
        v-if="query"
        :by-id="query"
        store="facture"
        collection="factures"
        action="searchFactures"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <Pagination
        v-else
        store="facture"
        collection="factures"
        action="fetchFactures"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
    <div class="mb-10 mr-10">
      <div>
        <v-speed-dial
          v-model="fab"
          class="mb-15 mr-15"
          bottom
          right
          direction="top"
          open-on-hover
          :transition="transition"
        >
          <template #activator>
            <v-btn v-model="fab" color="secondary" dark fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-card-account-details </v-icon>
            </v-btn>
          </template>

          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                color="orange"
                elevation="10"
                small
                dark
                fab
                :aria-label="$t('facture.addAss')"
                @click.stop="createItemAssurer"
                v-on="on"
              >
                <v-icon>mdi-card-account-details-star-outline</v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('facture.addAss') }}
            </span>
          </v-tooltip>
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                color="green"
                elevation="10"
                small
                dark
                fab
                :aria-label="$t('facture.add')"
                @click.stop="createItem"
                v-on="on"
              >
                <v-icon>mdi-card-account-details-outline</v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('facture.add') }}
            </span>
          </v-tooltip>
        </v-speed-dial>
      </div>
    </div>
    <FactureCreate ref="createFormDialog" @refreshPage="refreshPage" />
    <FactureAssurerCreate
      ref="createAssurerFormDialog"
      @refreshPage="refreshPage"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import FactureAssurerCreate from '~/components/pages/facture/FactureAssurerCreate.vue'
import FactureCreate from '~/components/pages/facture/FactureCreate.vue'
import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'FacturesPage',

  components: { FactureCreate, FactureAssurerCreate },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: true,
      right: true,
      bottom: false,
      left: false,
      transition: 'slide-y-reverse-transition',
      headers: [
        {
          text: this.$t('facture.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('facture.table.patient'),
          align: 'start',
          value: 'patient',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.total'),
          value: 'total',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.acompte'),
          value: 'acompte',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.remise'),
          value: 'remise',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.typePatient'),
          value: 'typePatient',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.dateFacture'),
          value: 'dateFacture',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.action'),
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
      await this.$store.dispatch('facture/fetchFactures', 1)
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
      if (this.factures && this.factures.data) {
        return this.factures.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.factures) {
        return this.factures.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.factures) {
        const total = this.factures.total || 0
        const perPage = this.factures.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      factures: (state) => state.facture.factures,
    }),
  },

  methods: {
    toggleLoading(value) {
      this.loading = value
    },
    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.id === itemId) + 1
    },
    editItem(item) {
      this.$refs.editFormDialog.openDialog(item)
    },
    createItemAssurer() {
      this.$refs.createAssurerFormDialog.openDialog()
    },
    createItemAssurerAutre() {
      this.$refs.createAssurerAutreFormDialog.openDialog()
    },
    createItem() {
      this.$refs.createFormDialog.openDialog()
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

    async fetchData(page) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('facture/searchFactures', {
            page,
            s: this.query,
          })
        } else {
          await this.$store.dispatch('facture/fetchFactures', page)
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
