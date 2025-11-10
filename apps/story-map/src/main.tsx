import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapComponentsProvider } from '@mapcomponents/react-maplibre';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <MapComponentsProvider>
      <App />
    </MapComponentsProvider>
  </React.StrictMode>,
)
