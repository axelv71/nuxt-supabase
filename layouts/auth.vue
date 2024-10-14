<script setup lang="ts">

import Logo from "~/components/logo.vue";
</script>

<template>
  <div class="bg-primary h-screen flex flex-row p-3 gap-3">
    <div class="min-w-[550px] w-[550px] rounded-xl relative">
      <div class="absolute w-full h-full p-10 text-white flex flex-col justify-between">
        <div class="space-y-24">
          <Logo />
          <div class="space-y-5">
            <div class="border rounded-full w-fit px-3 py-1 text-sm">
              Get Started
            </div>
            <h3 class="text-3xl font-aeonik font-light tracking-wide">Welcome!</h3>
            <p class="text-[#C6C6C6] font-light">
              Create professional, high converting, and time efficient
              proposals in seconds.
            </p>
          </div>
        </div>

        <div class="space-y-10">
          <div class="space-y-6">
            <blockquote class="text-[#C6C6C6] font-light">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation”
            </blockquote>
            <div class="flex items-center space-x-3">
              <div class="p-1 border border-[#2F2F2F] rounded-full w-fit">
                <NuxtImg
                    src="/img/axel.jpg"
                    alt="https://x.com/axelvdev"
                    width="40"
                    height="40"
                    class="rounded-full"
                />
              </div>
              <div class="flex flex-col space-y-0.5 text-sm">
                <span>Axel</span>
                <span class="text-[#C6C6C6]">Entrepreneur</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <ul class="flex space-x-12">
              <li class="text-[#C6C6C680] hover:underline font-thin text-sm">
                <RouterLink to="/terms">Terms</RouterLink>
              </li>
              <li class="text-[#C6C6C680] hover:underline font-thin text-sm">
                <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
              </li>
            </ul>

            <p class="text-[#C6C6C680] text-sm">
              &copy; 2024 Usersquared LLC
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#FAFAFA] flex items-center justify-center rounded-xl w-full">
      <slot />
    </div>
  </div>
</template>
