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
            :placeholder="$t('profils.search')"
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
        store="assurance"
        collection="assurances"
        action="searchAssurances"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <pagination
        v-else
        store="assurance"
        collection="assurances"
        action="fetchAssurances"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
    <AssuranceCreate @refreshPage="refreshPage" />
    <AssuranceEdite ref="editFormDialog" @refreshPage="refreshPage" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import AssuranceCreate from '~/components/pages/assurance/AssuranceCreate.vue'
import AssuranceEdite from '~/components/pages/assurance/AssuranceEdite.vue'

import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'AssurancePage',
  components: { AssuranceCreate, AssuranceEdite },
  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('assurance.table.num'),
          value: 'id',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('assurance.table.libelle'),
          align: 'start',
          value: 'libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('assurance.table.action'),
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
    // console.log(ids)
    try {
      await this.$store.dispatch('assurance/fetchAssurances', 1)
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
      if (this.assurances && this.assurances.data) {
        // console.log(this.profils)
        return this.assurances.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.assurances) {
        return this.assurances.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.assurances) {
        const total = this.assurances.total || 0
        const perPage = this.assurances.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      assurances: (state) => state.assurance.assurances,
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
          await this.$store.dispatch('assurance/searchAssurances', {
            page: pages,
            s: this.query,
          })
        } else {
          await this.$store.dispatch('assurance/fetchAssurances', 1)
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
