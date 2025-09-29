import { default as React, ReactNode } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { Layer } from '@deck.gl/core';
export interface DeckGlContextType {
    deckGlLayerArray: Layer[];
    setDeckGlLayerArray: React.Dispatch<React.SetStateAction<Layer[]>>;
}
interface DeckGlContextProviderProps {
    mapId: string;
    children: ReactNode;
}
declare const DeckGlContext: React.Context<DeckGlContextType>;
declare const DeckGlContextProvider: ({ mapId, children }: DeckGlContextProviderProps) => import("react/jsx-runtime").JSX.Element;
export { DeckGlContextProvider };
export default DeckGlContext;
//# sourceMappingURL=DeckGlContext.d.ts.map