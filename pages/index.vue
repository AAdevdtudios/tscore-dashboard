<template>
    <div class="section">
        <div class="heading">
            <h2>TScore</h2>
            <p>Sign in to access your account</p>
        </div>
        <div class="body">
            <form @submit.prevent="on_submit">
                <div>
                    <label for="email" class="block mb-2">Email address</label>
                    <input type="email" name="email" v-model="form_data.email" placeholder="example@example.com" />
                    <span class="error" v-for="error in v.email.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                </div>
                <div class="mt-6">
                    <div class="flex justify-between mb-2">
                        <label for="password">Password</label>
                        <nuxt-link to="/reset-password"
                            class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                            password?</nuxt-link>
                    </div>
                    <input name="password" type="password" v-model="form_data.password" placeholder="Password" />
                    <span class="error" v-for="error in v.password.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                    <!-- <ErrorMessage name="password" as="span" class="error" /> -->
                </div>
                <div class="mt-6">
                    <button :disabled="loading">
                        <span v-if="loading">
                            <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
                            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        </span>
                        <span v-else>Sign in
                            <!-- <Icon name="material-symbols-light:arrow-right-alt" /> -->
                        </span>
                    </button>
                </div>
                <!-- <span class="error">{{ error_message }}</span> -->
            </form>
            <hr />
            <p>Don&#x27;t have an account yet?
                <nuxt-link to="/register" class="direct-link">Sign up</nuxt-link>.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import useValidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import { useAuth } from '@/stores/auth'
import { storeToRefs } from 'pinia'
const route = useRouter()
const snack_bar = useSnackbar()

const { authenticateUser, fetchUser } = useAuth()
const { authenticated, error_message, loading, user } = storeToRefs(useAuth())


interface LoginDto {
    email: string
    password: string
}

const form_data = reactive<LoginDto>({
    email: "",
    password: "",
})
const rules = computed(() => {
    return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
    }
})

const v = useValidate(rules, form_data)
const on_submit = async function () {
    const results = await v.value.$validate()

    if (!results) {
        return null
    }
    await authenticateUser(form_data)
    if (!authenticated.value) {
        snack_bar.add({
            type: 'error',
            text: error_message.value,
        })
        return null
    }

    await fetchUser()

    if (user.value?.is_subscribed) {
        route.push('/dashboard')
        return null
    }

    route.push({ path: '/dashboard/subscription-page' })
    return null
}

definePageMeta({
    layout: "auth"
})
</script>