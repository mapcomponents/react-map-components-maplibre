import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			// button labels
			LanguageSwitcherButton: 'deutsch',
			StartWalkThroughButton: 'start walk through',
			StopWalkThroughButton: 'stop walk through',

			// marker content - titles
			'MlMarker.title': 'Marker',
			'useCameraFollowPath.title': 'Camera follows a path',
			'MlThreeJsLayer.title': '3D models',
			'MlGeoJsonLayer.title': 'GeoJSON objects',
			'MlFillExtrusionLayer.title': '2D to 3D (extrusion)',
			'MlIconLayer.title': 'Animation of icons',
			'MlLayerSwipe.title': 'Map curtain',
			'MlHexagonMap.title': 'Noise Map (with deck.gl)',
			'PointCloud.title': 'Point Cloud',
			'MlCreatePdfForm.title': 'PDF of a map view',
			'MlTerrainLayer.title': 'Terrain visualisation',
			'MultiTab.title': 'Communication between browser tabs',
			'3DTiles.title': 'Photorealistic 3D tiles',

			// marker content - descriptions
			'MlMarker.description':
				"Hi, I'm a marker. I'll show you around and introduce you to some other exciting components.",
			'useCameraFollowPath.description':
				'Fancy an exciting journey? Come with me and discover a selection of interesting components!',
			'MlThreeJsLayer.description': "I'm 3D. Cool, isn't it? Can you see my shadow?",
			'MlGeoJsonLayer.description':
				"Points, LineStrings or Polygons? It doesn't matter, with me you can easily represent all these geometric types.",
			'MlFillExtrusionLayer.description':
				'Simply turn 2D into 3D? Why not! I do this by extrusion.',
			'MlIconLayer.description': "That's cool! Now there's really some movement on the map!",
			'MlLayerSwipe.description':
				'Take a quick peek behind the curtain! What could be hiding behind it?',
			'MlHexagonMap.description':
				"It's pretty noisy here on the street! Time to create a noise map.",
			'PointCloud.description':
				"Imagine lots of three-dimensional points coming together to form an object. That's a point cloud. How beautiful!",
			'MlCreatePdfForm.description':
				'Move it a little more to the left! Make it a little bigger... Perfect, now the view fits! Now just create the PDF.',
			'MlTerrainLayer.description':
				"Phew, it's quite hilly here! Let's take a closer look at the terrain!",
			'MultiTab.description':
				"Sometimes one browser tab isn't enough? No problem, communication also works between different tabs! Feel free to give it a try.",
			'3DTiles.description':
				"A must-see on any trip to Hamburg! The Elbphilharmonie. So realistic, it's almost like being there.",
		},
	},
	de: {
		translation: {
			// button labels
			LanguageSwitcherButton: 'english',
			StartWalkThroughButton: 'durchlauf starten',
			StopWalkThroughButton: 'durchlauf stoppen',

			// marker content - titles
			'MlMarker.title': 'Marker',
			'useCameraFollowPath.title': 'Kamera folgt einer Route',
			'MlThreeJsLayer.title': '3D-Modelle',
			'MlGeoJsonLayer.title': 'GeoJSON Objekte',
			'MlFillExtrusionLayer.title': '2D zu 3D (Extrusion)',
			'MlIconLayer.title': 'Animation von Symbolen',
			'MlLayerSwipe.title': 'Kartenvorhang',
			'MlHexagonMap.title': 'Lärmkarte (mit deck.gl)',
			'PointCloud.title': 'Punktwolke',
			'MlCreatePdfForm.title': 'PDF eines Kartenausschnitts',
			'MlTerrainLayer.title': 'Geländedarstellung',
			'MultiTab.title': 'Kommunikation zwischen Browser-Tabs',
			'3DTiles.title': 'Fotorealistische 3D-Kacheln',

			// marker content - descriptions
			'MlMarker.description':
				'Hi, ich bin ein Marker. Ich führe dich etwas herum und stelle dir weitere spannende Komponenten vor.',
			'useCameraFollowPath.description':
				'Lust auf eine aufregende Reise? Komm mit und entdecke mit mir eine Auswahl an spannenden Komponenten!',
			'MlThreeJsLayer.description': 'Ich bin 3D. Cool, oder? Siehst du meinen Schattenwurf?',
			'MlGeoJsonLayer.description':
				'Punkte, Linien oder Flächen? Egal, mit mir kannst du einfach all diese Geometrieformen darstellen.',
			'MlFillExtrusionLayer.description':
				'Einfach aus 2D 3D machen? Warum nicht! Ich mache das durch Extrusion.',
			'MlIconLayer.description': 'Das ist ja cool! Jetzt kommt richtig Bewegung auf die Karte!',
			'MlLayerSwipe.description':
				'Kurz mal hinter den Vorhang linsen! Was sich dahinter wohl verbirgt?',
			'MlHexagonMap.description':
				'Ganz schön laut hier auf der Straße! Zeit, mal eine Lärmkarte zu erstellen.',
			'PointCloud.description':
				'Stell dir vor, ganz viele dreidimensionale Punkte versammeln sich zu einer Form eines Objekts. Das ist eine Punktwolke. Wie schön!',
			'MlCreatePdfForm.description':
				'Noch ein bisschen mehr nach links verschieben! Noch ein bisschen größer ziehen... Perfekt, jetzt passt der Ausschnitt! Jetzt nur noch das PDF erstellen.',
			'MlTerrainLayer.description':
				'Puh, ganz schön hügelig hier! Lass uns das Gelände mal genauer anschauen!',
			'MultiTab.description':
				'Manchmal ist ein Browser-Tab nicht genug? Kein Problem, die Kommunikation funktioniert auch zwischen verschiedenen Tabs! Probiere es gerne aus.',
			'3DTiles.description':
				'Darf bei keinem Ausflug nach Hamburg fehlen! Die Elbphilharmonie. So realistisch, als würdest du fast vor Ort sein.',
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
