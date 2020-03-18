import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as ru from '../locales/ru';

let translate: any;

i18n.use(initReactI18next).init(
  {
    resources: {
      ru
    },
    fallbackLng: 'ru',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    debug: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    react: {
      wait: true,
      bindI18n: 'languageChanged loaded'
    }
  },
  (err, t) => {
    translate = t;
  }
);

export { translate as t };

export default i18n;
