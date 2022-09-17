<template>
  <v-container class="pt-0 mb-10">
    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="10">
        <v-row>
          <v-col
            v-for="item in itemsList"
            :key="item.id"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card>
              <v-img
                src="/img/document.svg"
                contain
                class="pt-3 pl-3 pr-3"
              ></v-img>

              <v-card-title class="center"> {{ item.libelle }} </v-card-title>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>
                  {{ $t('document.explore') }}
                </v-btn>

                <v-spacer></v-spacer>

                <!-- <v-btn
                  v-show="`http://localhost:8687/api/downloadFile/` + item.url"
                  icon
                  target="_blank"
                  :href="`http://localhost:8687/api/downloadFile/` + item.url"
                >
                  <v-icon color="primary">{{ 'mdi-download-box' }}</v-icon>
                </v-btn> -->
                <v-btn icon @click="loardDocument(item.url)">
                  <v-icon color="blue">{{ 'mdi-eye' }}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import { startCase } from '~/helpers/helpers.js'

export default {
  name: 'DocumentPage',
  layout: 'default',

  data() {
    return {
      loading: false,
    }
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('document/fetchAllDocuments')
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
      if (this.documents) {
        return this.documents
      } else {
        return []
      }
    },

    // currentPage() {
    //   if (this.traitements) {
    //     return this.traitements.current_page || 1
    //   } else {
    //     return 1
    //   }
    // },

    // isDividerVisible() {
    //   if (this.traitements) {
    //     const total = this.traitements.total || 0
    //     const perPage = this.traitements.per_page || 0
    //     return total > perPage
    //   } else {
    //     return false
    //   }
    // },

    ...mapState({
      documents: (state) => state.document.allDocuments,
    }),
  },

  // mounted: {
  //   async fetch()
  // },

  methods: {
    toggleLoading(value) {
      this.loading = value
    },

    async loardDocument(filename) {
      try {
        await this.$api.loardDocument(filename)
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
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
  },
}
</script>
