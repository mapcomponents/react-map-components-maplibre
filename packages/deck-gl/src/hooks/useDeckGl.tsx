import DeckGlContext from '../contexts/DeckGlContext';
import { useContext } from 'react';
import { Effect, Layer } from '@deck.gl/core';

function useDeckGl() {
	const deckGlContext = useContext(DeckGlContext);

	function addEffect(effect: Effect) {
		deckGlContext.setDeckGlEffectArray((prevState) => [...prevState, effect]);
	}
	function removeEffect(effect: Effect) {
		deckGlContext.setDeckGlEffectArray((prevState) => prevState.filter((e) => e !== effect));
	}
	function addLayer(layer: Layer) {
		deckGlContext.setDeckGlLayerArray((prevState) => [...prevState, layer]);
	}
	function removeLayer(layer: Layer) {
		deckGlContext.setDeckGlLayerArray((prevState) => prevState.filter((l) => l !== layer));
	}
	return {
		addEffect,
		removeEffect,
		addLayer,
		removeLayer,
	};
}
export default useDeckGl;
