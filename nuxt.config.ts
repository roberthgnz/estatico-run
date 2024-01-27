// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    public: {
      rootDomains: [process.env.ROOT_DOMAIN || 'localhost'],
    },
  },
  googleFonts:{
    families: {
      Inter: true,
    }
  }
})
