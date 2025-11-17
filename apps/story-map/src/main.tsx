import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapComponentsProvider } from '@mapcomponents/react-maplibre';
import { StationProvider } from './contexts/StationContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<StationProvider>
			<MapComponentsProvider>
				<App />
			</MapComponentsProvider>
		</StationProvider>
	</React.StrictMode>
);
