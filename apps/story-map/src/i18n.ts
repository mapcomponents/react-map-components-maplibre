import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			// button labels
			LanguageSwitcherButton: 'deutsch',
			StartWalkThroughButton: 'start walk through',
			StopWalkThroughButton: 'stop walk through',
			// marker content
			MlMarker: `
				<div style="padding: 12px; font-family: Arial, sans-serif; max-width: 220px">
				<div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #3b82f6">
				<img src="/apps/story-map/public/apple-icon-180.png"> Marker component</div>
				<div style="display: flex; align-items: center; margin-bottom: 10px">
				<span style="color: #6b7280; font-size: 14px">I'm a MapComponents marker component. I'll show you around.</span>
				</div>
				<p>Let's discover MapComponents together, an open-source framework for creating geo-IT applications!</p>
				<div style="font-size: 13px; color: #6b7280">
				<div>📍 50.763336, 7.103249</div>
				</div>
				</div>`,
		},
	},
	de: {
		translation: {
			// button labels
			LanguageSwitcherButton: 'english',
			StartWalkThroughButton: 'durchlauf starten',
			StopWalkThroughButton: 'durchlauf stoppen',
			// marker content
			MlMarker: `
				<div style="padding: 12px; font-family: Arial, sans-serif; max-width: 220px">
				<div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #3b82f6">Marker Komponente</div>
				<div style="display: flex; align-items: center; margin-bottom: 10px">
				<span style="color: #6b7280; font-size: 14px">Ich bin eine MapComponets Marker Komponente. Ich führe dich herum.</span>
				</div>
				<p>Lass uns gemeinsam MapComponets entdecken, ein Open-Source-Framework zur Erstellung von Geo-IT-Anwendungen!</p>
				<div style="font-size: 13px; color: #6b7280">
				<div>📍 50.763336, 7.103249</div>
				</div>
				</div>`,
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
