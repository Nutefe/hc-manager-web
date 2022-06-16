<template>
  <v-container class="pt-0" fluid>
    <!-- <PageTitle :title="$t('transfert.title')" /> -->
    <v-card class="mt-10 mb-10 pb-3 justify-space-around">
      <v-row class="mb-5 align-middle">
        <v-col class="col-4"> </v-col>
        <v-col class="col-8">
          <v-text-field
            v-model.lazy.trim="query"
            append-icon="mdi-magnify"
            :placeholder="$t('kota.search')"
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
      <pagination
        v-if="query"
        :by-id="query"
        store="kota"
        collection="kotas"
        action="searchKotas"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <pagination
        v-else
        store="kota"
        collection="kotas"
        action="fetchKotas"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
    <KotaCreate @refreshPage="refreshPage" />
    <KotaEdite ref="kotaFormDialog" @refreshPage="refreshPage" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import KotaCreate from '~/components/pages/kota/KotaCreate.vue'
import KotaEdite from '~/components/pages/kota/KotaEdite.vue'
import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'KotasPage',
  components: { KotaCreate, KotaEdite },
  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('kota.table.num'),
          value: 'id',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('kota.table.libelle'),
          align: 'start',
          value: 'libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('kota.table.action'),
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
      await this.$store.dispatch('kota/fetchKotas', 1)
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
      if (this.kotas && this.kotas.data) {
        // console.log(this.profils)
        return this.kotas.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.kotas) {
        return this.kotas.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.kotas) {
        const total = this.kotas.total || 0
        const perPage = this.kotas.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      kotas: (state) => state.kota.kotas,
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
      this.$refs.kotaFormDialog.openDialog(item)
    },
    startCase(str) {
      if (str) {
        return startCase(str)
      } else {
        return 'n/a'
      }
    },
    async fetchData(pages) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('kota/searchKotas', {
            page: pages,
            s: this.query,
          })
        } else {
          await this.$store.dispatch('kota/fetchKotas', 1)
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
