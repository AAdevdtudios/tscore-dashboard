<template>
    <div class="auth_body">
        <div class="auth_section">
            <div class="side_left" style="background-image: url('/1.png');">

                <div class="body">
                    <div>
                        <h2 class="brand">TScore</h2>

                        <p class="content">Get ready for thrilling moments! Explore our upcoming league games and mark your
                            calendar for the most anticipated matchups. Don't miss the action as your favorite teams battle
                            it out on the field. It's game time excitement like never before!</p>
                    </div>
                </div>
            </div>
            <!-- All the form -->
            <div class="side_right">
                <slot />
                <NuxtSnackbar />
            </div>
        </div>
        <NuxtSnackbar />
    </div>
</template>

<style>
@import url('~/assets/css/auth.css');
</style>