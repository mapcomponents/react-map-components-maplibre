import React, { ReactNode, useEffect, useRef, useState } from 'react';
import useMap from '../hooks/useMap';
import { Deck, Layer } from '@deck.gl/core/typed';
import { MapboxLayer } from '@deck.gl/mapbox/typed';

export interface DeckGlContextType {
	deckGl: Deck | undefined;
	deckGlLayerArray: Layer[];
	setDeckGlLayerArray: React.Dispatch<React.SetStateAction<Layer[]>>;
}
interface DeckGlContextProviderProps {
	mapId: string;
	children: ReactNode;
}

const layerId = 'deckgl-layer';
const DeckGlContext = React.createContext({} as DeckGlContextType);

const DeckGlContextProvider = ({ mapId, children }: DeckGlContextProviderProps) => {
	const mapHook = useMap({ mapId });

	const [deckGl, setDeckGl] = useState<Deck | undefined>(undefined);
	const layerRef = useRef<MapboxLayer<Layer> | undefined>(undefined);
	const [deckGlLayerArray, setDeckGlLayerArray] = useState([]);

	useEffect(() => {
		if (!mapHook.map) return;

		const deck = new Deck({
			gl: mapHook.map.painter.context.gl,
			layers: [],
		});

		layerRef.current = new MapboxLayer({
			id: layerId,
			deck: deck,
		});

		mapHook.map.addLayer(layerRef.current);

		setDeckGl(deck);
		return () => {
			mapHook.map?.removeLayer(layerId);
			layerRef.current = undefined;
		};
	}, [mapHook.map]);

	useEffect(() => {
		if (!deckGl) return;
		deckGl.setProps({
			layers: [...deckGlLayerArray],
		});
	}, [deckGlLayerArray, deckGl]);

	const value = {
		deckGl,
		deckGlLayerArray,
		setDeckGlLayerArray,
	};
	return <DeckGlContext.Provider value={value}>{children}</DeckGlContext.Provider>;
};

export { DeckGlContextProvider };
export default DeckGlContext;
