import DeckGlContext from '../contexts/DeckGlContext';
import { useContext } from 'react';
import { Layer } from '@deck.gl/core';

function useDeckGl() {
	const deckGlContext = useContext(DeckGlContext);

	function addLayer(layer: Layer) {
		deckGlContext.setDeckGlLayerArray(prevState => [...prevState, layer])
	}
	function removeLayer(layer: Layer) {
		const newDeckGLLayerArray = deckGlContext.deckGlLayerArray.filter((l) => l !== layer);
		deckGlContext.setDeckGlLayerArray(newDeckGLLayerArray);
	}
	return {
		addLayer,
		removeLayer,
	};
}
export default useDeckGl;
