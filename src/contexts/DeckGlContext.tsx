import React, { ReactNode, useEffect, useRef, useState } from 'react';
import useMap from '../hooks/useMap';
import { Deck } from '@deck.gl/core/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';
interface DeckGlContextType {
	deckGl: Deck | undefined;
}
interface DeckGlContextProviderProps {
	mapId: string;
	children: ReactNode;
}
const DeckGlContext = React.createContext({} as DeckGlContextType);

const DeckGlContextProvider = ({ mapId, children }: DeckGlContextProviderProps) => {
	const mapHook = useMap({ mapId });

	const [deckGl, setDeckGl] = useState<Deck | undefined>(undefined);
	const layerRef = useRef<MapboxLayer<any> | undefined>(undefined);

	useEffect(() => {
		if (!mapHook.map) return;

		const deck = new Deck({
			gl: mapHook.map.painter.context.gl,
			layers: [],
		});

		layerRef.current = new MapboxLayer({
			id: 'deckgl-layer',
			deck: deck,
		});

		mapHook.map.addLayer(layerRef.current, 'poi_label');

		setDeckGl(deck);
	}, [mapHook.map]);

	const value = {
		deckGl,
	};
	return <DeckGlContext.Provider value={value}>{children}</DeckGlContext.Provider>;
};

export { DeckGlContextProvider };
export default DeckGlContext;
