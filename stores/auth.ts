import { defineStore } from "pinia";
import { useApiFetch } from "@/composable/useApiFetch";
import type { VerificationResponse } from "~/data";

interface UserPayload {
  email: string;
  password: string;
}

export type UserResponse = {
  email: string;
  full_name: string;
  subscriber_number: string;
  access_token: string;
  refresh_token: string;
  is_subscribed: boolean;
  is_verified: boolean;
};

export type User = {
  email: string;
  full_name: string;
  subscriber_number: string;
  is_subscribed: boolean;
  is_verified: boolean;
};

export const useAuth = defineStore("auth", () => {
  const token = useCookie("token");
  const user = ref<User>();
  const loading = ref<boolean>();
  const error_message = ref<string>();
  const error_status = ref<boolean>();
  const authenticated = ref<boolean>();
  const is_loggedIn = computed(() => !!user.value);

  async function authenticateUser({ email, password }: UserPayload) {
    loading.value = true;
    token.value = null;
    const { data, error } = await useApiFetch<UserResponse>("auth/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: {
        email,
        password,
      },
    });
    if (error.value) {
      loading.value = false;
      error_message.value = error.value.data.detail;
      error_status.value = true;
      return null;
    }

    if (data.value) {
      console.log("200");
      token.value = data.value.access_token;
      authenticated.value = true;
      user.value = data.value;
      loading.value = false;
      return null;
    }
  }

  async function fetchUser() {
    loading.value = true;
    const data = await useApiFetch<User>("auth/data/", {
      method: "GET",
    });
    // const token = useCookie("token");

    if (data.data.value) {
      authenticated.value = true;
      user.value = data.data.value;
      loading.value = false;
      return null;
    } else {
      token.value = null;
      authenticated.value = false;
      loading.value = false;
      error_status.value = true;
      return null;
    }
  }

  async function VerifyUser(uid: string, reset_token: string) {
    const { data } = await useApiFetch<VerificationResponse>(
      `auth/verify/${uid}/${reset_token}`,
      {
        method: "GET",
      }
    );
    loading.value = true;

    if (data.value) {
      token.value = data.value.message.access_token;
      loading.value = false;
      await fetchUser();
      return data;
    }

    loading.value = false;
    return null;
  }
  function SaveCookies(data: any, key: string) {
    const cookie = useCookie(key);
    cookie.value = data;
    return;
  }

  return {
    user,
    loading,
    authenticated,
    authenticateUser,
    error_message,
    error_status,
    fetchUser,
    is_loggedIn,
    VerifyUser,
    SaveCookies,
  };
});
