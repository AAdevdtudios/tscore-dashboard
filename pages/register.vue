<template>
    <div class="section">
        <div class="heading">
            <h2>TScore</h2>
            <p>Create an account</p>
        </div>
        <div class="body">
            <form @submit.prevent="submit_form">
                <div class="row">
                    <div>
                        <label class="block mb-2" for="firstName">
                            First Name
                        </label>
                        <input name="first_name" type="name" placeholder="example" v-model="form_data.first_name" />
                        <span class="error" v-for="error in v.first_name.$errors" :key="error.$uid"> {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <label class="block mb-2" for="lastName">
                            Last Name
                        </label>
                        <input name="last_name" type="name" placeholder="example" v-model="form_data.last_name" />
                        <span class="error" v-for="error in v.last_name.$errors" :key="error.$uid"> {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div>
                    <label for="email" class="block mb-2">Email Address</label>
                    <input name="email" type="email" placeholder="example@example.com" v-model="form_data.email" />
                    <span class="error" v-for="error in v.email.$errors" :key="error.$uid"> {{ error.$message }}
                    </span>
                </div>
                <div class="row mt-5">
                    <div>
                        <label class="block mb-2 " for="password">
                            Password
                        </label>
                        <input name="password" type="password" placeholder="********" v-model="form_data.password" />
                        <span class="error" v-for="error in v.password.$errors" :key="error.$uid"> {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <label class="block mb-2 " for="confirm">
                            Confirm Password
                        </label>
                        <input name="password2" type="password" placeholder="********" v-model="form_data.password2" />
                        <span class="error" v-for="error in v.password2.$errors" :key="error.$uid"> {{ error.$message
                        }}
                        </span>
                    </div>
                </div>
                <div class="my-6">
                    <button>
                        Register Account
                    </button>
                </div>
                <hr />
                <div class="text-center">
                    <nuxt-link to="/reset-password" class="direct-link">
                        Forgot Password?
                    </nuxt-link>
                </div>
                <p>Already have an account? <nuxt-link to="/" class="direct-link">Login</nuxt-link>.</p>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import useValidate from '@vuelidate/core';
import { required, minLength, email, sameAs } from '@vuelidate/validators';
import { useApiFetch } from '~/composable/useApiFetch';
import type { RegisterResponse } from '~/data';

const router = useRouter()
const snack_bar = useSnackbar()


definePageMeta({
    layout: 'auth',
})


interface RegisterDto {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
}

const form_data = reactive<RegisterDto>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
});

const rules = computed(() => {
    return {
        email: { required, email },
        first_name: { required, minLength: minLength(3) },
        last_name: { required, minLength: minLength(3) },
        password: { required, minLength: minLength(6) },
        password2: { required, sameAs: sameAs(form_data.password) },
    }
})

const v = useValidate(rules, form_data)

const submit_form = async () => {
    const results = await v.value.$validate()
    if (!results) {
        return null
    }


    const { data, error } = await useApiFetch<RegisterResponse>('auth/register/', {
        method: 'POST',
        body: form_data,
    })
    if (data.value != null) {
        snack_bar.add({
            type: 'success',
            text: data.value.message,
        })
        useApiFetch("auth/verify/", {
            method: "POST",
            body: {
                "email": form_data.email,
            }
        })

        router.push('/auth/login')
        return null
    }
    snack_bar.add({
        type: 'error',
        text: "User already exist or credentials are invalid",
    })

    console.log(error.value?.data);

}
</script>