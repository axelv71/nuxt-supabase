<script setup lang="ts">
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

const supabase = useSupabaseClient()
const profile = await useUserProfile()
const router = useRouter()
const toast = useToast()

const schema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type Form = z.infer<typeof schema>

const state = reactive({
  username: profile.email,
  password: '',
  error: '',
  pending: false,
})

async function updateAccount(event: FormSubmitEvent<Form>) {
  state.pending = true

  const { error } = await supabase.auth.updateUser({
    password: event.data.password,
  })

  if (error) {
    state.error = error.message
    console.error(error)
  }

  toast.add({
    title: 'Account updated',
    description: 'Your account has been updated successfully.',
  })
  state.pending = false
}

async function signOut() {
  await supabase.auth.signOut()
  await router.push('/login')
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="updateAccount">
    <UCard>
      <template #header>
        <div class="space-y-4">
          <h2 class="text-2xl font-aeonik font-normal leading-none tracking-tight">Account</h2>
          <p class="text-sm font-light text-[#686868]">
            Manage your account settings.
          </p>
        </div>
      </template>
      <UDivider />
      <div class="space-y-4">
        <div class="space-y-4 mt-5">
          <UFormGroup label="Email" name="email">
            <UInput
                v-model="state.username"
                size="md"
                type="text"
                disabled
            />
          </UFormGroup>

          <UFormGroup label="New password" name="password">
            <UInput
                v-model="state.password"
                size="md"
                type="password"
                placeholder="********"
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

          <div class="flex justify-end space-x-3">
            <UButton
                leading-icon="lucide:log-out"
                @click="signOut"
                variant="outline"
            >
              Logout
            </UButton>
            <UButton leading-icon="lucide:save" type="submit" :disabled="state.pending">
              {{ state.pending ? 'Saving...' : 'Save' }}
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </UForm>
</template>