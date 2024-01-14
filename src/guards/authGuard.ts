import { useToken } from "@/composables/token";
import moment from "moment";
import type { NavigationGuard } from "vue-router";
export const authGuard: NavigationGuard = async (to, from, next) => {
  const { getToken } = useToken();

  console.log("authGuard");

  const tokenData = await getToken();
  if (tokenData) {
    const expiryDate = tokenData.expireDate;
    // convert expiryDate from UTC to local time
    const expiryDateLocal = moment.utc(expiryDate).local();

    // check if current time is past expiry date
    if (moment().isSameOrAfter(expiryDateLocal)) {
      next("/login");
    } else {
      next();
    }
  } else {
    next("/login");
  }
};
