<script setup lang="ts">
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

const supabase = useSupabaseClient()
const profile = await useUserProfile()
const toast = useToast()

const schema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
})

type Form = z.infer<typeof schema>

const state = reactive({
  username: profile.username,
  error: '',
  pending: false,
})

async function updateProfile(event: FormSubmitEvent<Form>) {
  state.pending = true
  const { error } = await supabase.from('profiles').update({
    username: event.data.username,
  }).eq('id', profile.id)

  if (error) {
    state.error = error.message
    console.error(error)
  }

  toast.add({
    title: 'Profile updated',
    description: 'Your profile has been updated successfully.',
  })
  state.pending = false
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="updateProfile">
    <UCard>
      <template #header>
        <div class="space-y-4">
          <h2 class="text-2xl font-aeonik font-normal leading-none tracking-tight">Profile</h2>
          <p class="text-sm font-light text-[#686868]">
            Manage your user profile.
          </p>
        </div>
      </template>
      <UDivider />
      <div class="space-y-4">
        <div class="space-y-4 mt-5">
          <UFormGroup label="Username" name="username">
            <UInput
                v-model="state.username"
                size="md"
                type="text"
                placeholder="John Doe"
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

          <div class="flex justify-end">
            <UButton leading-icon="lucide:save" type="submit" :disabled="state.pending">
              {{ state.pending ? 'Saving...' : 'Save' }}
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </UForm>
</template>