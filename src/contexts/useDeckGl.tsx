import DeckGlContext from './DeckGlContext';
import { useContext } from 'react';
import { Layer } from '@deck.gl/core/typed';

function useDeckGl() {
	const deckGlContext = useContext(DeckGlContext);

	function addLayer(layer: Layer) {
		const newDeckGLLayerArray = deckGlContext.deckGlLayerArray;
		newDeckGLLayerArray.push(layer);
		deckGlContext.setDeckGlLayerArray(newDeckGLLayerArray);
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
