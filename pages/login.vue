<script setup lang="ts">
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import ConnectGoogle from "~/components/auth/connect-google.vue";

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

definePageMeta({
  layout: 'auth',
})

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type LoginForm = z.infer<typeof schema>

const state = reactive({
  email: '',
  password: '',
  error: '',
})

async function login (event: FormSubmitEvent<LoginForm>){
  const { error } = await supabase.auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password,
  })

  if (error) {
    state.error = error.message
    console.error(error)
    return
  }

  await router.push('/dashboard')
}
</script>

<template>
<UForm :schema="schema" :state="state" @submit="login">
  <UCard class="w-[450px]">
    <template #header>
      <div class="space-y-4">
        <h1 class="text-2xl font-aeonik font-normal leading-none tracking-tight">Login</h1>
        <p class="text-sm font-light text-[#686868]">Welcome back!</p>
      </div>
    </template>
    <UDivider />
    <div class="space-y-4">
      <div class="space-y-4 mt-5">
        <UAlert
            v-if="route.query.email"
            title="Verify your email!"
            v-bind:description="`We've sent a verification email to ${route.query.email}. Please verify your email address to continue.`"
        />
        <UFormGroup label="Email" name="email">
          <UInput
              v-model="state.email"
              size="md"
              type="email"
              placeholder="email@exemple.com"
          />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput
              v-model="state.password"
              size="md"
              type="password"
              placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
          />
        </UFormGroup>
      </div>
      <UAlert
          v-if="state.error"
          icon="lucide:circle-alert"
          color="red"
          variant="solid"
          title="An error occurred"
          :description="state.error"
      />
      <div class="space-y-2">
        <UButton
            type="submit"
            size="md"
            class="w-full flex justify-center"
        >
          Login
        </UButton>

        <ConnectGoogle />
      </div>
      <UDivider class="mt-4" />
      <div class="flex flex-row justify-between text-sm py-2">
        <p class="text-sm font-normal text-[#686868]">Don’t have an account?</p>
        <NuxtLink to="/register" class="font-normal hover:underline">
          Create an account
        </NuxtLink>
      </div>
    </div>
  </UCard>
</UForm>
</template>