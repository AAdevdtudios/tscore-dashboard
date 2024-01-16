import { useFetch, useRuntimeConfig, type UseFetchOptions } from "nuxt/app";
export function useApiFetch<T>(
  paths: string,
  options: UseFetchOptions<T> = {}
) {
  const token = useCookie("token");
  let header: any = {};
  if (token.value) {
    header["Authorization"] = ("Bearer " + token.value) as string;
  } else {
    token.value = null;
  }

  const config = useRuntimeConfig();
  return useFetch(config.public.api + paths, {
    watch: false,
    ...options,
    headers: {
      ...header,
      ...options.headers,
    },
  });
}
