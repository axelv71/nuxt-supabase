<script setup lang="ts">
const supabase = useSupabaseClient()

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth(
      {
        provider: 'google',
        options: {
          redirectTo: '/dashboard',
        }
      }
  )

  if (error) {
    console.error(error)
    return
  }
}
</script>

<template>
<UButton
    variant="outline"
    class="w-full flex justify-center"
    @click="loginWithGoogle"
>
  <NuxtImg
    src="/img/google.png"
    width="20"
    height="20"
  />
  Login with Google
</UButton>
</template>
