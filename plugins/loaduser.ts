import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";
export default defineNuxtPlugin(async (nuxtApp) => {
  const { authenticated } = storeToRefs(useAuth());

  const auth = useAuth();

  if (!authenticated.value) {
    await auth.fetchUser();
  }
});
