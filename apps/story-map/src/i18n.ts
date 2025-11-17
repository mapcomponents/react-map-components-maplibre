import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			// button labels
			LanguageSwitcherButton: 'deutsch',
			StartWalkThroughButton: 'start walk through',
			StopWalkThroughButton: 'stop walk through',

			// marker content - labels
			'MlMarker.label': 'MlMarker',
			'useCameraFollowPath.label': 'useCameraFollowPath',
			'MlThreeJsLayer.label': 'MlThreeJsLayer',
			'MlGeoJsonLayer.label': 'MlGeoJsonLayer',
			'MlFillExtrusionLayer.label': 'MlFillExtrusionLayer',
			'MlIconLayer.label': 'MlIconLayer',
			'MlLayerSwipe.label': 'MlLayerSwipe',
			'MlNoiseMap.label': 'MlNoiseMap',
			'PointCloudLayer.label': 'PointCloudLayer',
			'MlCreatePdfForm.label': 'MlCreatePdfForm',
			'MlTerrainLayer.label': 'MlTerrainLayer',
			'MultiTab.label': 'Multi-Tab',
			'ThreeDTilesLayer.label': '3DTilesLayer',

			// marker content - descriptions
			'MlMarker.description':
				"I'm a MapComponents marker component. I'll show you around and introduce you to other exciting components.",
			'useCameraFollowPath.description':
				"I'm a MapComponents hook. My function allows a camera to move along a predefined path.",
			'MlThreeJsLayer.description':
				"I'm a MapComponents component that displays 3D models on the map.",
			'MlGeoJsonLayer.description': "I'm a MapComponents component that displays GeoJSON objects.",
			'MlFillExtrusionLayer.description':
				"I'm a MapComponents component that converts 2D layers into 3D layers using extrusion.",
			'MlIconLayer.description':
				"I'm a MapComponents component that displays animated symbols on a layer.",
			'MlLayerSwipe.description':
				"I'm a MapComponents component that hides part of one of two overlapping maps, thus creating a map curtain.",
			'MlNoiseMap.description':
				"I'm a MapComponents component that displays an added DeckGL HexagonLayer using the useDeckGL hook. The example shows a noise map.",
			'PointCloudLayer.description':
				"I'm a MapComponents component that projects a Point Cloud onto a map. This is a collection of three-dimensional points that together represent the shape and geometry of an object or environment.",
			'MlCreatePdfForm.description':
				"I'm a MapComponents component that provides a form for creating a PDF version of the current map view.",
			'MlTerrainLayer.description': "I'm a MapComponents component that displays a terrain layer.",
			'MultiTab.description':
				"I'm a MapComponents component that shows a multi-tab application. A service worker enables communication between different browser tabs of an application.",
			'ThreeDTilesLayer.description':
				"I'm a MapComponents component that uses a 3D tiles layer to display large 3D datasets.",
		},
	},
	de: {
		translation: {
			// button labels
			LanguageSwitcherButton: 'english',
			StartWalkThroughButton: 'durchlauf starten',
			StopWalkThroughButton: 'durchlauf stoppen',

			// marker content - labels
			'MlMarker.label': 'MlMarker',
			'useCameraFollowPath.label': 'useCameraFollowPath',
			'MlThreeJsLayer.label': 'MlThreeJsLayer',
			'MlGeoJsonLayer.label': 'MlGeoJsonLayer',
			'MlFillExtrusionLayer.label': 'MlFillExtrusionLayer',
			'MlIconLayer.label': 'MlIconLayer',
			'MlLayerSwipe.label': 'MlLayerSwipe',
			'MlNoiseMap.label': 'MlNoiseMap',
			'PointCloudLayer.label': 'PointCloudLayer',
			'MlCreatePdfForm.label': 'MlCreatePdfForm',
			'MlTerrainLayer.label': 'MlTerrainLayer',
			'MultiTab.label': 'MultiTab',
			'ThreeDTilesLayer.label': '3DTilesLayer',

			// marker content - descriptions
			'MlMarker.description':
				'Ich bin eine MapComponents Marker Komponente. Ich führe dich etwas herum und stelle dir weitere spannende Komponenten vor.',
			'useCameraFollowPath.description':
				'Ich bin ein MapComponents Hook. Mit meiner Funktion kann eine Kamerafahrt entlang eines vorgegebenen Pfades erfolgen.',
			'MlThreeJsLayer.description':
				'Ich bin eine MapComponents Komponente, die die Darstellung von 3D Modellen auf der Karte ermöglicht.',
			'MlGeoJsonLayer.description':
				'Ich bin eine MapComponents Komponente, die GeoJSON Objekte darstellt.',
			'MlFillExtrusionLayer.description':
				'Ich bin eine MapComponents Komponente, die 2D Layer in 3D Layer mithilfe von Extrusion umwandelt.',
			'MlIconLayer.description':
				'Ich bin eine MapComponents Komponente, die animierte Symbole auf einem Layer darstellt.',
			'MlLayerSwipe.description':
				'Ich bin eine MapComponents Komponente, die einen Teil einer von zwei übereinanderliegenden Karten ausblendet und so einen Kartenvorhang erzeugt.',
			'MlNoiseMap.description':
				'Ich bin eine MapComponents Komponente, die einen hinzugefügten DeckGL HexagonLayer mittels des useDeckGL Hooks zeigt. Das Beispiel zeigt eine Lärmkarte.',
			'PointCloudLayer.description':
				'Ich bin eine MapComponents Komponente, die eine Punktwolken auf eine Karte projiziert. Dabei handelt es sich um eine Sammlung von dreidimensionalen Punkten, die gemeinsam die Form und Geometrie eines Objekts oder einer Umgebung darstellen.',
			'MlCreatePdfForm.description':
				'Ich bin eine MapComponents Komponente, die ein Formular zur Erstellung einer PDF-Version der aktuellen Kartenansicht bereitstellt.',
			'MlTerrainLayer.description':
				'Ich bin eine MapComponents Komponente, die eine Geländeschicht anzeigt.',
			'MultiTab.description':
				'Ich bin eine MapComponents Komponente, die eine Multi-Tab Anwendung zeigt. Dabei ermöglicht ein Service Worker die Kommunikation zwischen verschiedenen Browser-Tabs einer Anwendung.',
			'ThreeDTilesLayer.description':
				'Ich bin eine MapComponents Komponente, die eine 3D-Kachelschicht (3D Tiles) verwendet, um große 3D-Datensätze darzustellen.',
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
