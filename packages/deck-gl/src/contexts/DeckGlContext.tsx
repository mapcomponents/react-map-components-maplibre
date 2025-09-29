import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';
import { Layer } from '@deck.gl/core';
import { MapboxOverlay } from '@deck.gl/mapbox';

export interface DeckGlContextType {
	deckGlLayerArray: Layer[];
	setDeckGlLayerArray: React.Dispatch<React.SetStateAction<Layer[]>>;
}

interface DeckGlContextProviderProps {
	mapId: string;
	children: ReactNode;
}

const overlayId = 'deckgl-layer';
const DeckGlContext = React.createContext({} as DeckGlContextType);

const DeckGlContextProvider = ({ mapId, children }: DeckGlContextProviderProps) => {
	const mapHook = useMap({ mapId });

	const overlayRef = useRef<MapboxOverlay | undefined>(undefined);
	const [deckGlLayerArray, setDeckGlLayerArray] = useState<Layer[]>([]);

	useEffect(() => {
		if (!mapHook.map) return;

		overlayRef.current = new MapboxOverlay({
			id: overlayId,
		});

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mapHook.map.addControl(overlayRef.current);

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			overlayRef.current && mapHook.map?.removeControl(overlayRef.current);
			overlayRef.current = undefined;
		};
	}, [mapHook.map]);

	useEffect(() => {
		if (!overlayRef.current) return;
		overlayRef.current.setProps({
			layers: [...deckGlLayerArray],
		});
	}, [deckGlLayerArray]);

	const value = {
		deckGlLayerArray,
		setDeckGlLayerArray,
	};
	return <DeckGlContext.Provider value={value}>{children}</DeckGlContext.Provider>;
};

export { DeckGlContextProvider };
export default DeckGlContext;
