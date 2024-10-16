<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single()

if (error) {
  throw error
}
</script>

<template>
  <UPopover
      mode="hover"
      :popper="{ placement: 'right' }"
  >
    <div class="flex items-center space-x-3 pb-2 pt-5 border-t border-[#24252A] w-full">
      <UAvatar
          :src="profile.picture_url || ''"
          :alt:="profile.username"
      />
      <span class="text-white font-semibold">{{profile.username}}</span>
    </div>

    <template #panel>
      <h1>Test</h1>
    </template>
  </UPopover>
</template>