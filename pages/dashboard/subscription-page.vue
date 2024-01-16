<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { storeToRefs } from 'pinia'
const { fetchUser } = useAuth()

type Subs = {
    name: string,
    value: string
}

const selected_sub = ref('Silver')

const subscriptions = reactive<Subs[]>([
    {
        name: '1 month - Silver package',
        value: 'Silver',
    },
    {
        name: '3 months - Gold package',
        value: 'Gold',
    },
    {
        name: '6 months - premium package',
        value: 'Premium',
    },
    {
        name: '1 year - Diamond package',
        value: 'Diamond',
    },
])
const check_val = () => {
    console.log(selected_sub);

}
const fetchUserData = async () => {
    await fetchUser()
}
fetchUserData()

const { user } = storeToRefs(useAuth())



definePageMeta({
    layout: false,
    middleware: 'auth'
})
</script>
<template>
    <div class="subscription_body">
        <div class="section_body">
            <div class="subscription_head">
                <h2>TScore Subscription</h2>
                <p>Unlock the Action: Your All-Access Pass to Thrilling Live
                    Sports with Our Exclusive Single Subscription Plan!</p>
            </div>
            <div class="subscription_content">
                <div class="content_left">
                    <h3>Unlimited Access</h3>
                    <p>Get ready for an unparalleled sports streaming
                        experience. You can subscribe using your subscription number {{ user?.subscriber_number }}</p>
                    <div class="heading">
                        <h4>What’s included</h4>
                        <div class="hrz"></div>
                    </div>
                    <ul role="list" class="list">
                        <li class="flex gap-x-3">
                            <Icon name="formkit:check" />
                            Exclusive Game Access
                        </li>
                        <li class="flex gap-x-3">
                            <Icon name="formkit:check" />
                            On-Demand Replays
                        </li>
                        <li class="flex gap-x-3">
                            <Icon name="formkit:check" />
                            HD Quality Streaming
                        </li>
                        <li class="flex gap-x-3">
                            <Icon name="formkit:check" />
                            Ad-Free Experience
                        </li>
                    </ul>
                </div>
                <div class="content_right">
                    <div class="right_body">
                        <div class="content">
                            <select id="countries" v-model="selected_sub">
                                <!-- <option selected>Choose a country</option> -->
                                <option v-for="subscription in subscriptions" :value="subscription.value"
                                    :key="subscription.name">{{ subscription.name }}</option>
                                <!-- <option value="Gold" selected></option>
                                <option value="Premium" selected> </option>
                                <option value="Diamond" selected> </option> -->
                            </select>

                            <!-- <p class="head">Experience it all with TScore Premium</p> -->

                            <p class="price_content">
                                <span class="price">₦1,500</span>
                                <span class="duration">per month</span>
                            </p>
                            <button class="btn" @click="check_val">Get
                                Started</button>
                            <p class="sub">Cancel anytime. No hidden fees.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url('~/assets/css/subscription-page.css');
</style>