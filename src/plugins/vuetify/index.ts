import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import "vuetify/styles";

const light = {
  dark: false,
  colors: {
    background: "#edf2ef",
    text: "#000",
    cardTitle: "#888",
    cardTextBG: "#fff",
  },
};
const dark = {
  dark: true,
  colors: {
    background: "hsl(207, 26%, 17%)",
    text: "#fff",
    cardTitle: "#647692",
    cardTextBG: "#ebebeb",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
});
