import React from 'react';
import ReactDOM from 'react-dom/client';
import { setWorkerUrl } from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { MapComponentsProvider } from '@mapcomponents/react-maplibre';
import App from './App';
import './index.css';

setWorkerUrl(maplibreWorkerUrl);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MapComponentsProvider>
			<App />
		</MapComponentsProvider>
	</React.StrictMode>
);
