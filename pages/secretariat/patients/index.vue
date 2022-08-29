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
                :aria-label="$t('commoin.actions.detail')"
                :to="localePath(`/secretariat/patients/${item.id}`)"
                v-on="on"
              >
                <v-icon color="editIcone" small> mdi-account-eye </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.detail') }}
            </span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-divider v-if="isDividerVisible" />
      <Pagination
        v-if="query"
        :by-id="query"
        store="patient"
        collection="patients"
        action="searchPatients"
        :disabled="loading"
        class="mb-2 mt-2"
        align="right"
        @loading="toggleLoading"
      />

      <Pagination
        v-else
        store="patient"
        collection="patients"
        action="fetchPatients"
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
                color="blue"
                elevation="10"
                small
                dark
                fab
                :aria-label="$t('patient.addAss')"
                @click.stop="createItemAssurer"
                v-on="on"
              >
                <v-icon>mdi-card-account-details-star</v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('patient.addAss') }}
            </span>
          </v-tooltip>
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                color="orange"
                elevation="10"
                small
                dark
                fab
                :aria-label="$t('patient.addAssAut')"
                @click.stop="createItemAssurerAutre"
                v-on="on"
              >
                <v-icon>mdi-card-account-details-star-outline</v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('patient.addAssAut') }}
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
                :aria-label="$t('patient.add')"
                @click.stop="createItem"
                v-on="on"
              >
                <v-icon>mdi-card-account-details-outline</v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('patient.add') }}
            </span>
          </v-tooltip>
        </v-speed-dial>
      </div>
    </div>
    <PatientCreate ref="createFormDialog" @refreshPage="refreshPage" />
    <PatientAssurerCreate
      ref="createAssurerFormDialog"
      @refreshPage="refreshPage"
    />
    <PatientAssurerAutreCreate
      ref="createAssurerAutreFormDialog"
      @refreshPage="refreshPage"
    />
    <PatientEdit ref="editFormDialog" @refreshPage="refreshPage" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, startCase } from '~/helpers/helpers.js'
import PatientCreate from '~/components/pages/patient/PatientCreate.vue'
import PatientAssurerCreate from '~/components/pages/patient/PatientAssurerCreate.vue'
import PatientAssurerAutreCreate from '~/components/pages/patient/PatientAssurerAutreCreate.vue'
import PatientEdit from '~/components/pages/patient/PatientEdit.vue'

export default {
  name: 'PatientsPage',

  components: {
    PatientCreate,
    PatientAssurerCreate,
    PatientAssurerAutreCreate,
    PatientEdit,
  },

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
          text: this.$t('patient.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('patient.table.codeDossier'),
          align: 'start',
          value: 'codeDossier',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.nom'),
          value: 'nom',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.prenom'),
          value: 'prenom',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.dateNaiss'),
          value: 'dateNaiss',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.sexe'),
          value: 'genre',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.telephone'),
          value: 'telephone',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.typePatient'),
          value: 'typePatient.libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('patient.table.assurance'),
          value: 'assurance.libelle',
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
      await this.$store.dispatch('patient/fetchPatients', 1)
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
      if (this.patients && this.patients.data) {
        return this.patients.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.patients) {
        return this.patients.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.patients) {
        const total = this.patients.total || 0
        const perPage = this.patients.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      patients: (state) => state.patient.patients,
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
          await this.$store.dispatch('patient/searchPatients', {
            page,
            s: this.replace(this.query),
          })
        } else {
          await this.$store.dispatch('patient/fetchPatients', page)
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
