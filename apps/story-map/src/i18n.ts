import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			// button labels
			LanguageSwitcherButton: "deutsch",
			StartWalkThroughButton: "start walk through",
			StopWalkThroughButton: "stop walk through",
		},
	},
	de: {
		translation: {
			// button labels
			LanguageSwitcherButton: "english",
			StartWalkThroughButton: "durchlauf starten",
			StopWalkThroughButton: "durchlauf stoppen",
		},
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'de', // default language
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
