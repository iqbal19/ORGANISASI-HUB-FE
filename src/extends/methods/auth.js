import { differenceOfTwoDate, sleep } from "@/extends/helpers/util.timer";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import axios from "axios";

/**
 * Decode Jwt Token with Window atob
 * @param jwtToken | @returns a object
 */
export const getDecodeToken = (jwtToken) => {
  if (
    !jwtToken ||
    (typeof jwtToken === "string" && jwtToken?.trim()?.length === 0) ||
    typeof window === "undefined"
  )
    return null;
  const jwtArrays = jwtToken.split(".");
  const jwtPayloads = jwtArrays.length > 1 ? jwtArrays[1] : null;
  try {
    const parsedToken = JSON.parse(window.atob(jwtPayloads));
    return parsedToken;
  } catch (_error) {
    return null;
  }
};

/**
 * Calculate Jwt Token Expired time
 * @param jwtToken | @returns a object
 */
export const getExpiredToken = (parsedToken) => {
  if (!parsedToken) return null;
  const iatTime = (parsedToken?.iat || 0) * 1000;
  const expTime = (parsedToken?.exp || 0) * 1000;
  const resultDuration = differenceOfTwoDate(iatTime, expTime, "minute");
  const resultCurrent = differenceOfTwoDate(
    new Date().getTime(),
    expTime,
    "minute"
  );

  if (resultCurrent > 0 && resultCurrent <= resultDuration) {
    return { expired: false, ...parsedToken };
  } else {
    return { expired: true };
  }
};

// Doing Refresh
export const doRefresh = async (error) => {
  await sleep(50);
  const authStore = useAuthStore();
  let response = await axios.post("/api/refresh", {}, {
    headers: {
      Authorization: `Bearer ${authStore.authUser?.refresh_token}`
    }
  });
  if (response.status === 200 || response.status === 201 || response.data?.success) {
    const responseData = response.data.data || response.data;
    const dataCurrent = responseData.accessToken || null;
    authStore.setAccessToken(dataCurrent);
  }
};

// Doing logout
export const doLogout = async () => {
  await sleep(50);
  const authStore = useAuthStore();
  const profileStore = useProfileStore();
  authStore.clear();
  profileStore.clear();
};

export const setUserProfile = async () => {
  await sleep(50);
  const profileStore = useProfileStore();
  let response = await axios.get("/api/profile");
  if (response.status === 200 || response.data?.success) {
    const dataCurrent = response.data.data || response.data || {};
    profileStore.setUser(dataCurrent);
    return dataCurrent;
  }
};
