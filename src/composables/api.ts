import { useToken } from "@/composables/token";
import { useFetch } from "@vueuse/core";
import { sha512 } from "js-sha512";
import moment from "moment";

const { getToken } = useToken();
export function useApi() {
  const baseUrl = import.meta.env.VITE_GIFTLOV_BASE_URL;
  const now = moment().format("DDMMyyyyHHmmss");
  let valuesArray: any = [];
  async function get(url: string, params?: object) {
    let finalUrl = `${baseUrl}${url}`;
    if (params) {
      let paramString = "?";
      for (const property in params) {
        paramString += `${property}=${params[property]}&`;
      }
      finalUrl = finalUrl + paramString.substring(0, paramString.length - 1);
    }

    return useFetch(finalUrl, {
      headers: {
        "X-GIFTLOV-DATE": now,
        Authorization: getToken().token,
        Accept: "application/json",
        signature: getHash(url, "GET", params, undefined),
      },
    })
      .get()
      .json();
  }

  function post(url: string, body: object) {
    return useFetch(`${baseUrl}${url}`, {
      headers: {
        "X-GIFTLOV-DATE": now,
        Authorization: getToken().token,
        Accept: "application/json",
        signature: getHash(url, "POST", undefined, body),
      },
    })
      .post(body)
      .json();
  }

  function getAuthToken(body: object) {
    return useFetch(`${baseUrl}generateToken`, {
      headers: {
        "X-GIFTLOV-DATE": now,
      },
    })
      .post(body)
      .json();
  }

  function createValuesArray(obj: object) {
    for (const property in obj) {
      if (typeof obj[property] === "array") {
        createValuesArray(obj[property][0]);
      } else if (typeof obj[property] === "object") {
        createValuesArray(obj[property]);
      } else {
        valuesArray.push(obj[property]);
      }
    }
    return valuesArray;
  }
  function getHash(
    url: string,
    method: string,
    params?: object,
    body?: object,
  ) {
    let prepend = `${url}${method}`;
    let lexicographicArr = "";
    if (params) {
      const values = createValuesArray(params);

      lexicographicArr = values.sort().join("");
      prepend = prepend + lexicographicArr;
    }
    if (body) {
      const values = createValuesArray(body);
      lexicographicArr = values.sort().join("");
      prepend = prepend + lexicographicArr;
    }
    const sign = `${prepend}${now}${getToken().token}`;

    const secretKey = "coding_challenge_1";
    const hash = sha512.hmac(secretKey, sign);
    return hash;
  }

  return {
    get,
    post,
    getAuthToken,
  };
}
