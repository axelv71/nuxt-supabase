<script setup lang="ts">
import LogoutButton from "~/components/auth/logout-button.vue";

definePageMeta({
  layout: 'dashboard',
})

const user = useSupabaseUser()
</script>

<template>
  <div>
    <h1>Hello {{ user?.email }}</h1>
    <LogoutButton />
  </div>
</template>