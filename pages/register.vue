<script setup lang="ts">
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import ConnectGoogle from "~/components/auth/connect-google.vue";

definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const supabase = useSupabaseClient()

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(255, { message: 'Name is too long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type RegisterForm = z.infer<typeof schema>

const state = reactive({
  name: '',
  email: '',
  password: '',
  error: '',
})

async function register (event: FormSubmitEvent<RegisterForm>){
  const { error } = await supabase.auth.signUp({
    email: event.data.email,
    password: event.data.password,
    options: {
      data: { name: event.data.name }
    }
  })

  if (error) {
    state.error = error.message
    console.error(error)
    return
  }

  await router.push(`/login?email=${event.data.email}`)
}
</script>

<template>
<UForm :schema="schema" :state="state" @submit="register">
  <UCard class="w-[450px]">
    <template #header>
      <div class="space-y-4">
        <h1 class="text-2xl font-aeonik font-normal leading-none tracking-tight">Register</h1>
        <p class="ext-sm font-light text-[#686868]">Create a new account</p>
      </div>
    </template>
    <UDivider />

    <div class="space-y-4" >
      <div class="space-y-4 mt-5">
        <UFormGroup label="Name" name="name">
          <UInput
              v-model="state.name"
              placeholder="John Doe"
              size="md"
          />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput
              v-model="state.email"
              type="email"
              size="md"
              placeholder="email@exemple.com"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
              v-model="state.password"
              type="password"
              size="md"
              placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
          />
        </UFormGroup>

        <UAlert
            v-if="state.error"
            icon="lucide:circle-alert"
            color="red"
            variant="solid"
            title="An error occurred"
            :description="state.error"

        />
      </div>

      <div class="space-y-2">
        <UButton
            type="submit"
            color="primary"
            class="w-full flex justify-center"
        >
          Register
        </UButton>

        <ConnectGoogle />
      </div>

      <UDivider class="mt-4" />
      <div class="flex flex-row justify-between text-sm py-2">
        <p class="text-sm font-normal text-[#686868]">
          Already have an account?
        </p>
        <NuxtLink to="/login" class="font-normal hover:underline">
          Login
        </NuxtLink>
      </div>
    </div>
  </UCard>
</UForm>
</template>
