<script setup lang="ts">
import useValidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useApiFetch } from '~/composable/useApiFetch';
definePageMeta({
    layout: 'auth',
})
const router = useRouter()
const snack_bar = useSnackbar()

const form_data = ref({
    email: ''
});

const rules = computed(() => {
    return {
        email: { required, email }
    }
})

const v = useValidate(rules, form_data)

const submit_form = async () => {
    const results = await v.value.$validate()
    if (!results) {
        return null
    }
    const { data, error } = await useApiFetch('auth/resendOtp/', {
        method: 'POST',
        body: form_data,
    })
    if (data.value) {
        router.push('/auth/otp/')
        return null
    }
    console.log(error);

    snack_bar.add({
        type: 'error',
        text: error.value?.data.message,
    })
}
</script>
<template>
    <div class="section">
        <div class="heading">
            <h2>TScore</h2>
            <p>Resend OTP</p>
            <span class="text-gray-800 dark:text-white">Please check your email for your OTP</span>
        </div>
        <div class="body">
            <form @submit.prevent="submit_form">
                <div>
                    <label for="email" class="block mb-2">Email Address</label>
                    <input name="email" type="email" placeholder="example@example.com" v-model="form_data.email" />
                    <span class="error" v-for="error in v.email.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                </div>
                <div class="my-6">
                    <button>
                        Resend OTP
                    </button>
                </div>
            </form>
            <hr />
            <div class="text-center">
                <p>Already Received? <nuxt-link to="/auth/otp" class="direct-link">OTP</nuxt-link>.</p>
            </div>
        </div>
    </div>
</template>