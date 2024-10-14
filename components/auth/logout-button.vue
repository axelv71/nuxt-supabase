<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

async function logout() {
  await supabase.auth.signOut()
  await router.push('/login')
}
</script>

<template>
<UButton @click="logout">
  Logout
</UButton>
</template>