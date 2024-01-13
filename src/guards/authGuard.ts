import { useToken } from "@/composables/token";
import type { NavigationGuard } from "vue-router";

export const authGuard: NavigationGuard = async (to, from, next) => {
  const { getToken } = useToken();

  const tokenData = await getToken();
  if (tokenData) {
    const expiryDate = tokenData.expireDate;
    // convert expiryDate from UTC to local time
    const expiryDateLocal = new Date(expiryDate).toLocaleString();

    // check if current time is past expiry date
    if (new Date() > new Date(expiryDateLocal)) {
      next("/login");
    } else {
      next();
    }
  } else {
    console.log("here");

    next("/login");
  }
};
