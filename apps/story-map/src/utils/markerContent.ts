import { TFunction } from 'i18next';

/**
 * Creates HTML content for markers using i18n translations
 * @param t - The translation function from useTranslation
 * @param stationTitle - Translation key for the station title
 * @param label - Translation key for the marker label
 * @param description - Translation key for the marker description
 * @param coordinates - Coordinates string to display (optional)
 * @returns HTML string for marker content
 */
export const createMarkerContentHtml = (
	t: TFunction,
	stationTitle: string,
	label: string,
	description: string,
	markerCoordinates: string
): string => {
	return `
		<div style="padding: 12px; font-family: Arial, sans-serif; max-width: 220px;">
			<div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #3b82f6;">
				${t(stationTitle)}
			</div>
			<div style="display: flex; align-items: center; margin-bottom: 10px;">
				<span style="color: #6b7280; font-size: 14px;">${t(label)}</span>
			</div>
			<p style="margin: 0 0 8px 0;">${t(description)}</p>
			<div style="font-size: 13px; color: #6b7280;">
				<div>📍 ${markerCoordinates}</div>
			</div>
		</div>
	`;
};
