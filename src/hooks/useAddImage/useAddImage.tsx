import { useEffect, useRef } from 'react';
import useMap from '../useMap';

export interface useAddImageProps {
	/**
	 *
	 */
	imageId: string;
	/**
	 *
	 */
	imagePath: string;
}

/**
 *
 */
const useAddImage = (props: useAddImageProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		mapHook.map?.loadImage(props.imagePath).then(function (res) {
			if (!res?.data) {
				console.log('image ' + props.imagePath + 'could not be loaded');
				return; 
			}

			mapHook.map?.addImage(props.imageId, res.data);
			return; 
		});
		return () => {
			mapHook.map?.removeImage(props.imageId);
		};
	}, [mapHook.map, props]);

	return;
};

useAddImage.defaultProps = {
	mapId: undefined,
};
export default useAddImage;
