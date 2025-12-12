import DeckGlContext from '../contexts/DeckGlContext';
import { useContext } from 'react';
import { Layer } from '@deck.gl/core';

function useDeckGl() {
	const deckGlContext = useContext(DeckGlContext);

	function addLayer(layer: Layer) {
		deckGlContext.setDeckGlLayerArray((prevState) => [...prevState, layer]);
	}
	function removeLayer(layer: Layer) {
		deckGlContext.setDeckGlLayerArray((prevState) => prevState.filter((l) => l !== layer));
	}
	return {
		addLayer,
		removeLayer,
	};
}
export default useDeckGl;
