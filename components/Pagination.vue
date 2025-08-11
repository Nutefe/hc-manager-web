<template>
  <v-row>
    <v-col v-if="isVisible" cols="12" class="pb-0">
      <v-pagination
        v-model="currentPage"
        :length="lastPage"
        :total-visible="totalVisible"
        :disabled="disabled"
        color="secondary"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    search: {
      type: [String, Number],
      default: null,
    },
    store: {
      type: String,
      default: null,
    },
    collection: {
      type: String,
      default: null,
      required: true,
    },
    action: {
      type: String,
      default: null,
      required: true,
    },
    pageMutation: {
      type: String,
      default: 'SET_CURRENT_PAGE',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isVisible() {
      let total, perPage

      if (this.store) {
        total = this.$store.state[this.store][this.collection].total || 0
        perPage = this.$store.state[this.store][this.collection].per_page || 0
      } else {
        total = this.$store.state[this.collection].total || 0
        perPage = this.$store.state[this.collection].per_page || 0
      }

      return total > perPage
    },
    currentPage: {
      get() {
        if (this.store) {
          return (
            this.$store.state[this.store][this.collection].current_page || 1
          )
        } else {
          return this.$store.state[this.collection].current_page || 1
        }
      },
      set(value) {
        if (this.store) {
          this.$store.commit(`${this.store}/${this.pageMutation}`, value)
        } else {
          this.$store.commit(`${this.pageMutation}`, value)
        }
      },
    },
    lastPage() {
      if (this.store) {
        return this.$store.state[this.store][this.collection].last_page || 0
      } else {
        return this.$store.state[this.collection].last_page || 0
      }
    },
    totalVisible() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 5
        case 'md':
          return 7
        default:
          return 10
      }
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      if (oldValue !== undefined) this.navigateTopage(newValue)
    },
  },
  methods: {
    async navigateTopage(page) {
      this.$emit('loading', true)
      try {
        this.$vuetify.goTo(0, {
          duration: 700,
          easing: 'easeInOutQuad',
        })

        console.log('search', this.search)

        if (this.search) {
          if (this.store) {
            await this.$store.dispatch(`${this.store}/${this.action}`, {
              page,
              s: this.search,
            })
          } else {
            await this.$store.dispatch(this.action, {
              page,
              s: this.search,
            })
          }
        } else if (this.store) {
          await this.$store.dispatch(`${this.store}/${this.action}`, page)
        } else {
          await this.$store.dispatch(this.action, page)
        }
        this.$emit('loading', false)
      } catch (err) {
        this.$emit('loading', false)
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
    },
  },
}
</script>
