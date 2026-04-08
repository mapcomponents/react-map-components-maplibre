/**
 * Stable UUIDs assigned to the style background / labels folders and
 * their inner VT entries by `updateStyle` in the store. These are
 * used to:
 *  - hide background / labels from the LayerTree when configured
 *  - disable reorder controls on style layers (they must stay pinned)
 */
export const STYLE_LAYER_UUIDS = {
	bgFolder: '__style-background-folder__',
	bgVt: '__style-background-vt__',
	labelsFolder: '__style-labels-folder__',
	labelsVt: '__style-labels-vt__',
} as const;

/** Set of all style layer UUIDs for quick membership tests. */
export const STYLE_LAYER_UUID_SET = new Set<string>(Object.values(STYLE_LAYER_UUIDS));
