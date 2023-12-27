import React from 'react';
import { mount } from '@cypress/react';
import {ExampleConfig} from "./useAddImage.stories";
import useMap from '../useMap';

describe('useAddImage tests', () => {
  it('loads and adds an image to the map', () => {
    // Define the props for the image query
    const imageId = 'wgLogo';
  	//Load useMap hook to query the image
		const mapHook = useMap({mapId: undefined});

    // Mount a component that uses the useAddImage Hook 
		mount(<ExampleConfig />);

    // Check if the loadImage and addImage in the demo functions worked
		expect(mapHook.map?.hasImage(imageId)).equal(true);

  });
});
