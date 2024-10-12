// https://nuxt.com/docs/api/configuration/nuxt-config
import {isBrowser} from "@supabase/ssr";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      include: undefined,
      exclude: ['/register', '/'],
      cookieRedirect: false,
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: isBrowser(),
        detectSessionInUrl: isBrowser(),
        persistSession: true,
      },
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
})