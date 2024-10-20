<script setup lang="ts">
</script>

<template>
  <div>
    <aside class="h-screen bg-[#0F1012] fixed text-primary-foreground w-80 transition-transform -translate-x-full sm:translate-x-0">
      <div class="flex flex-col h-full justify-between px-6 pt-7 pb-4">
        <div class="space-y-12">
          <div class="flex items-center justify-between">
            <NuxtLink href="/dashboard" class="text-white">
              <Logo />
            </NuxtLink>
          </div>

          <div class="space-y-5">

          </div>
        </div>

        <div>
          <UserProfile />
        </div>
      </div>
    </aside>

    <main class="sm:ml-80 min-h-screen bg-[#FAFAFA]">
      <slot />
    </main>
  </div>
</template>