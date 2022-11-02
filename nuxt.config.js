// import colors from 'vuetify/es5/util/colors'
const BASE_URL = "http://localhost:8687/api";
// const BASE_URL = "http://192.168.1.153:8080/hc-manager/api";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - hc-manager-web',
    title: 'hc-manager-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link:
      [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
  },

  loading: {
    color: "#0b7557",
    failedColor: "#FF5252",
    height: "3px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/styles.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate.js",
    "~/plugins/vmask.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    "@nuxtjs/moment",
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt",
    "vue-sweetalert2/nuxt",
  ],

  // Nuxt-i18n module
  i18n: {
    baseUrl: "/",
    locales: [{ code: "fr", iso: "fr", name: "Français", file: "fr.js" }],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "fr",
    vueI18n: {
      fallbackLocale: "fr",
    },
    detectBrowserLanguage: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: BASE_URL,
    timeout: 10000,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    defaultAssets: false,
    optionsPath: "~/vuetify/options.js",
    treeShake: true,
    // theme: {
    //   light: true,
    //   themes: {
    //     light: {
    //       primary: '#00a8a0',
    //       secondary: '#137b76',
    //       accent: '#82B1FF',
    //       error: '#FF5252',
    //       info: '#2196F3',
    //       success: '#4CAF50',
    //       warning: '#FFC107',
    //       editIcone: '#0082ff',
    //       cashIcone: '#8d00ff',
    //     },
    //     dark: {
    //       primary: '#00a8a0',
    //       secondary: '#137b76',
    //       accent: '#82B1FF',
    //       error: '#FF5252',
    //       info: '#2196F3',
    //       success: '#4CAF50',
    //       warning: '#FFC107',
    //       editIcone: '#0082ff',
    //       cashIcone: '#8d00ff',
    //     },
    //   },
    // },
  },

  // Auth module
  auth: {
    plugins: ["~/plugins/api.js", "~/plugins/auth.js"],
    redirect: {
      login: "/connexion",
      logout: "/connexion",
      callback: "/connexion",
      home: "/",
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "accessToken",
          maxAge: 900,
          type: "Bearer",
        },
        refreshToken: {
          property: "refreshToken",
          data: "refreshToken",
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/auth/signin", method: "post" },
          refresh: { url: "/auth/refreshtoken", method: "post" },
          user: { url: "/utilisateur/me", method: "get" },
          logout: false,
        },
        autoLogout: false,
      },
    },
    localStorage: false,
  },

  // Google Fonts module
  googleFonts: {
    families: {
      Poppins: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    subsets: ['greek'],
    display: 'swap',
  },

  // Vue Toastification
  toast: {
    maxToasts: 5,
    transition: "Vue-Toastification__fade",
    timeout: 3000,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
  },

  // SweetAlert
  sweetalert: {
    confirmButtonColor: "#0fa379",
    denyButtonColor: "#FF5252",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ["auth"],
  },

  server: {
    port: 3009,
  },
}
