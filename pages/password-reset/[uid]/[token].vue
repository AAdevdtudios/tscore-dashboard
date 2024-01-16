<script setup lang="ts">
import useValidate from '@vuelidate/core';
import { required, sameAs, minLength } from '@vuelidate/validators';
import { useApiFetch } from '~/composable/useApiFetch';
definePageMeta({
    layout: 'auth'
})
const route = useRoute()
const router = useRouter()
const snack_bar = useSnackbar()

const form_data = reactive({
    password: '',
    password2: '',
});

const rules = computed(() => {
    return {
        password: { required, minLength: minLength(6) },
        password2: { required, sameAs: sameAs(form_data.password) }
    }
})

const v = useValidate(rules, form_data)

const submit_form = async () => {
    const results = await v.value.$validate()
    if (!results) {
        return null
    }
    const { data } = await useApiFetch('auth/set-new-password/', {
        method: 'PATCH',
        body: {
            ...form_data,
            uidb64: route.params.uid,
            token: route.params.token,
        }
    })
    //http://127.0.0.1:8000/api/v1/auth/password-reset-confirm/NDQ/c0123b-dcc2cb0bdb5b23ef81fc6aa04834b0b1
    //http://127.0.0.1:8000/api/v1/auth/password-reset-confirm/NDQ/c03stu-8102e29d708f49b8a02f8dc60771e113
    if (data.value) {
        router.push({ path: '/auth/login' })
        console.log(form_data);

        return null
    }
    snack_bar.add({
        type: 'error',
        text: 'Token is no longer valid'
    })

}
</script>
<template>
    <div class="section">
        <div class="heading">
            <h2>TScore</h2>
            <p>Reset password</p>
            <span class="text-gray-800 dark:text-white">Please enter your new password</span>
        </div>
        <div class="body">
            <form @submit.prevent="submit_form">
                <div>
                    <label for="password" class="block mb-2">Password</label>
                    <input name="password" type="password" placeholder="********" v-model="form_data.password" />
                    <span class="error" v-for="error in v.password.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2">Confirm Password</label>
                    <input name="confirm-password" type="password" placeholder="********" v-model="form_data.password2" />
                    <span class="error" v-for="error in v.password2.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                </div>
                <div class="my-6">
                    <button>
                        Reset password
                    </button>
                </div>
            </form>
            <hr />
            <div class="text-center">
                <p>Already have an account <nuxt-link to="/auth/login" class="direct-link">Login</nuxt-link>.</p>
            </div>
        </div>
    </div>
</template>