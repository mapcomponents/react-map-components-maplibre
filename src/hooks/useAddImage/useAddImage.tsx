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
	imagePath: string
}

/**
 *
 */
const useAddImage = (props: useAddImageProps) => {

	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(()=>{

		if (!mapHook.map || initializedRef.current) return;

		mapHook.map?.loadImage(props.imagePath, function (error, image: HTMLImageElement) {
			if (error) throw error;
			mapHook.map?.addImage(props.imageId, image);
		
			return () => {
				mapHook.map?.removeImage(props.imageId);
			};
		});
	}, [mapHook.map, props]);
	
return; 

	};

useAddImage.defaultProps = {
	mapId: undefined,
};
export default useAddImage;
