import DeckGlContext from '../contexts/DeckGlContext';
import { useContext } from 'react';
import { Layer } from '@deck.gl/core';

function useDeckGl() {
	const deckGlContext = useContext(DeckGlContext);
	const layerArray = deckGlContext.deckGlLayerArray;

	function addLayer(layer: Layer) {
		const newDeckGLLayerArray = [...layerArray];
		newDeckGLLayerArray.push(layer);
		deckGlContext.setDeckGlLayerArray(newDeckGLLayerArray);
	}
	function removeLayer(layer: Layer) {
		const newDeckGLLayerArray = layerArray.filter((l) => l !== layer);
		deckGlContext.setDeckGlLayerArray(newDeckGLLayerArray);
	}
	return {
		addLayer,
		removeLayer,
		layerArray,
	};
}
export default useDeckGl;
