import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated, user } = storeToRefs(useAuth());
  if (to.path == "/dashboard/subscription-page" && authenticated.value) {
    return true;
  }
  if (
    to.path == "/dashboard" &&
    authenticated.value &&
    user.value?.is_subscribed
  ) {
    return navigateTo("/dashboard");
  }
  return navigateTo("/");
});
