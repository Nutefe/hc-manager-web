<template>
  <v-container fluid class="container ml-0 mr-0 mb-10">
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
        <template #[`item.fiche.patient.nom`]="{ item }">
          <span>
            {{ item.fiche.patient.nom }}
            {{ startCase(item.fiche.patient.prenom) }}</span
          >
        </template>
        <template #[`item.total`]="{ item }">
          <span> {{ numberFormat(item.total) }} </span>
        </template>
        <template #[`item.acompte`]="{ item }">
          <span> {{ numberFormat(item.acompte) }} </span>
        </template>
        <template #[`item.remise`]="{ item }">
          <span> {{ numberFormat(item.remise) }} </span>
        </template>
        <template #[`item.reste`]="{ item }">
          <span> {{ numberFormat(item.reste) }} </span>
        </template>
        <template #[`item.solde`]="{ item }">
          <v-chip v-if="item.solde" color="blue" text-color="white"
            >{{ $t('facture.solde.yes') }}
          </v-chip>
          <v-chip v-else color="red" text-color="white">
            {{ $t('facture.solde.no') }}
          </v-chip>
        </template>
        <template #[`item.encaisse`]="{ item }">
          <v-chip v-if="item" color="primary"> {{ isEncaisser(item) }} </v-chip>
        </template>
        <template #[`item.action`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('commoin.actions.show')"
                v-on="on"
                @click.stop="loardFacture(item.fileName)"
              >
                <v-icon color="editIcone" small> mdi-eye </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.show') }}
            </span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-divider v-if="isDividerVisible" />
      <Pagination
        v-if="query"
        :search="query"
        store="paiement"
        collection="factures"
        action="searchDayFactures"
        page-mutation="SET_CURRENT_SEARCH_DAY_PAGE"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <Pagination
        v-else
        store="paiement"
        collection="factures"
        action="fetchDayFactures"
        page-mutation="SET_CURRENT_DAY_PAGE"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import {
  debounce,
  startCase,
  numberFormat,
  capitalize,
} from '~/helpers/helpers.js'

export default {
  name: 'FacturesPage',

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
          value: 'fiche.patient.nom',
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
          text: this.$t('facture.table.reste'),
          value: 'reste',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.typePatient'),
          value: 'fiche.patient.typePatient.libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.solde'),
          value: 'solde',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.encaisse'),
          value: 'encaisse',
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
      await this.$store.dispatch('paiement/fetchDayFactures', 1)
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
      factures: (state) => state.paiement.factures,
    }),
  },

  watch: {
    query(newValue) {
      this.query = this.removeSpecialCharacters(newValue)
    },
  },

  methods: {
    removeSpecialCharacters(charactersString) {
      return charactersString.replace(/[#$%^&*.?()\d[\]{}_]/gi, '')
      // return charactersString.replace(/[^\w\s]/gi, '')
    },
    toggleLoading(value) {
      this.loading = value
    },
    isEncaisser(item) {
      if (item.solde && item.encaisse) {
        return this.$t('facture.encaisse.total')
      } else if (!item.solde && item.encaisse) {
        return this.$t('facture.encaisse.partially')
      } else {
        return this.$t('facture.encaisse.no')
      }
    },
    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.id === itemId) + 1
    },
    startCase(str) {
      if (str) {
        return startCase(str)
      } else {
        return 'n/a'
      }
    },
    capitalize(str) {
      if (str) {
        return capitalize(str)
      } else {
        return 'n/a'
      }
    },

    numberFormat(str) {
      if (str) {
        return numberFormat(str)
      } else {
        return numberFormat(0)
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
    async loardFacture(filename) {
      try {
        await this.$api.loardFacture(filename)
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
    },

    async fetchData(page) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('paiement/searchDayFactures', {
            page,
            s: this.replace(this.query),
          })
        } else {
          await this.$store.dispatch('paiement/fetchDayFactures', page)
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
