<template>
    <div>
        <p>Loading.....</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApiFetch } from '~/composable/useApiFetch';
import type { VerificationResponse } from '~/data';
definePageMeta({
    layout: false
})
const route = useRoute()
const router = useRouter()
const { SaveCookies } = useAuth()

const validate_user = async () => {

    // http://127.0.0.1:8000/api/v1/auth/verify/NDQ/c01213-87cd68c5226af044b3ca4095b06f78ea

    const { data } = await useApiFetch<VerificationResponse>(`auth/verify/${route.params.uid}/${route.params.token}`);
    if (data.value) {
        SaveCookies(data.value.message.access_token, "token")
        router.push({ path: '/dashboard/subscription-page' })
        return null
    }

}
validate_user()
</script>