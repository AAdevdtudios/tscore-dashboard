<script setup lang="ts">
import useValidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useApiFetch } from '~/composable/useApiFetch';
definePageMeta({
    layout: 'auth',
})
const email_data = useCookie('email')
const router = useRouter()
const snack_bar = useSnackbar()

const form_data = ref({
    email: email_data.value as string,
    otp: ''
});

const rules = computed(() => {
    return {
        otp: { required, minLength: minLength(6) }
    }
})

const v = useValidate(rules, form_data)

const submit_form = async () => {
    const results = await v.value.$validate()
    if (!results) {
        return null
    }
    const { data, error } = await useApiFetch('auth/validateOtp/', {
        method: 'POST',
        body: form_data,
    })
    if (data.value) {
        router.push('/login')
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
            <p>OTP</p>
            <span class="text-gray-800 dark:text-white">Please check your email: {{ form_data.email }} for your OTP</span>
        </div>
        <div class="body">
            <form @submit.prevent="submit_form">
                <div>
                    <label for="otp" class="block mb-2">OTP</label>
                    <input name="otp" type="text" placeholder="xxxxxxxx" v-model="form_data.otp" />
                    <span class="error" v-for="error in v.otp.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                </div>
                <div class="my-6">
                    <button>
                        Enter OTP
                    </button>
                </div>
            </form>
            <hr />
            <div class="text-center">
                <nuxt-link to="/resend-otp" class="direct-link">
                    Resend OTP
                </nuxt-link>
            </div>
        </div>
    </div>
</template>