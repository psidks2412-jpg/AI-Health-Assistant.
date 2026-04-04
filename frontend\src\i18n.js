import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
  resources:{
    en:{translation:{welcome:"Hello"}},
    hi:{translation:{welcome:"नमस्ते"}}
  },
  lng:"en"
});

export default i18n;
