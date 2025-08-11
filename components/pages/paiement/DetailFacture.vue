<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        persistent
        scrollable
        max-width="900"
      >
        <v-card :disabled="loading" :loading="loading">
          <v-card-title class="px-3 px-md-5 py-2 py-md-3">
            <v-row align="center">
              <v-col cols="9">
                <span class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('facture.table.detail.titre') }}
                  <span :show="patient"
                    >de: {{ patient.nom }} {{ patient.prenom }}</span
                  >
                </span>
              </v-col>

              <v-spacer />

              <v-col cols="auto">
                <v-btn
                  icon
                  large
                  :aria-label="$t('commoin.actions.close')"
                  @click.stop="closeDialog"
                >
                  <v-icon large>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-divider />

          <template v-if="patient && patient.typePatient">
            <v-data-table
              v-if="patient.typePatient.id !== 3"
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
              <template #[`item.traitement`]="{ item }">
                {{ item.ficheTraitementPK.traitement.libelle }}
              </template>
              <template #[`item.prix`]="{ item }">
                {{ numberFormat(item.ficheTraitementPK.traitement.price) }}
              </template>
              <template #[`item.prix_paye_assurance`]="{ item }">
                {{ numberFormat(item.netPayAssu) }}
              </template>
              <template #[`item.prix_paye_beneficiaire`]="{ item }">
                {{ numberFormat(item.netPayBeneficiaire) }}
              </template>
            </v-data-table>
            <v-data-table
              v-else
              :headers="headers_non_assurer"
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
              <template #[`item.traitement`]="{ item }">
                {{ item.ficheTraitementPK.traitement.libelle }}
              </template>
              <template #[`item.prix`]="{ item }">
                {{ numberFormat(item.ficheTraitementPK.traitement.price) }}
              </template>
              <template #[`item.prix_paye_beneficiaire`]="{ item }">
                {{ numberFormat(item.netPayBeneficiaire) }}
              </template>
            </v-data-table>
          </template>

          <v-divider />

          <v-card-text class="px-3 px-md-5 py-2 py-md-3">
            <v-row justify="space-between" align="center">
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ $t('facture.table.detail.acompte') }}
              </v-col>
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ numberFormat(facture.acompte) }}
              </v-col>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="auto" class="text-h6 font-weight-regular"> </v-col>
              <v-col cols="3" class="text-h6 font-weight-regular">
                <v-list dense>
                  <v-subheader>{{
                    $t('facture.table.detail.paye')
                  }}</v-subheader>
                  <v-list-item v-for="(item, i) in paiements" :key="i">
                    <v-list-item-title>
                      {{ item.montant }} XOF
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.dateEncaissement }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ $t('facture.table.detail.totalFacture') }}
              </v-col>
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ numberFormat(facture.total) }} XOF
              </v-col>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ $t('facture.table.detail.remise') }}
              </v-col>
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ numberFormat(facture.remise) }} XOF
              </v-col>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ $t('facture.table.detail.total') }}
              </v-col>
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ numberFormat(totalFacture()) }} XOF
              </v-col>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ $t('facture.table.detail.reste') }}
              </v-col>
              <v-col cols="auto" class="text-h8 font-weight-regular">
                {{ numberFormat(facture.reste) }} XOF
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions class="py-4">
            <v-row
              align="center"
              justify="center"
              justify-sm="end"
              class="px-2 px-md-4 py-3"
            >
              <v-btn class="mr-3" text @click="closeDialog">
                {{ $t('commoin.actions.close') }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  startCase,
  capitalize,
  convertToDouble,
  numberFormat,
} from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      dialogNo: false,
      loading: false,
      id: null,
      show: false,
      isEqualAcompteRemise: false,
      isEqualAcomptePaye: false,
      isEqualRemisePaye: false,
      isEqualFacturePaye: false,
      encaisse: false,
      headers: [
        {
          text: this.$t('facture.table.detail.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('facture.table.detail.traitement'),
          align: 'start',
          value: 'traitement',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.detail.prix'),
          value: 'prix',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.detail.prix_paye_assurance'),
          value: 'prix_paye_assurance',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.detail.prix_paye_beneficiaire'),
          value: 'prix_paye_beneficiaire',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
      ],

      headers_non_assurer: [
        {
          text: this.$t('facture.table.detail.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('facture.table.detail.traitement'),
          align: 'start',
          value: 'traitement',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.detail.prix'),
          value: 'prix',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('facture.table.detail.prix_paye_beneficiaire'),
          value: 'prix_paye_beneficiaire',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
      ],
    }
  },

  computed: {
    itemsList() {
      if (this.traitements) {
        return this.traitements || []
      } else {
        return []
      }
    },

    bithday() {
      if (this.facture?.patient) {
        return parseInt(yaer(this.facture?.patient.dateNaiss))
      } else {
        return 0
      }
    },

    ...mapState({
      facture: (state) => state.facture?.facture || {},
      patient: (state) => state.facture?.facture?.fiche?.patient || {},
      traitements: (state) => state.traitement.allTraitementsFiche || {},
      paiements: (state) => state.paiement.allPaiementsFacture || [],
    }),
  },

  watch: {},

  methods: {
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

    convertToDouble(str) {
      if (str) {
        return convertToDouble(str)
      } else {
        return 0.0
      }
    },

    numberFormat(str) {
      if (str) {
        return numberFormat(str)
      } else {
        return numberFormat(0)
      }
    },

    openDialog(item) {
      this.id = item.id

      this.dialog = true
    },

    closeDialog() {
      this.dialog = false

      // this.$v.form.$reset()

      // this.form = {
      //   remise: 0,
      //   acompte: 0,
      //   patient: {},
      //   traitement: [],
      //   totalRemis: 0,
      //   montantPaye: '',
      //   numero: '',
      //   dateFacture: '',
      //   totalFacture: 0,
      //   reste: '',
      // }

      this.loading = false
    },

    itemPosition(itemId) {
      return this.traitements.findIndex((elm) => elm.id === itemId) + 1
    },

    totalFacture() {
      if (this.paiements) {
        return this.paiements.reduce((acc, item) => {
          return acc + parseFloat(item.montant)
        }, 0)
      } else {
        return 0
      }
    },
  },
}
</script>
