<script setup lang="ts">
import ManageProfile from "~/components/settings/manage-profile.vue";
import ManageAccount from "~/components/settings/manage-account.vue";

definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <div class="p-8">
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-aeonik font-semibold">Settings</h1>
        <p class="font-light text-[#686868]">Manage your account settings and set e-mail preferences.</p>
      </div>
      <UDivider />
      <ManageProfile />
      <ManageAccount />
    </div>
  </div>
</template>