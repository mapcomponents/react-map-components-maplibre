import React, { useState, useRef } from "react";
import MapLibreGlWrapper from '../components/MapLibreMap/lib/MapLibreGlWrapper';

const MapContext = React.createContext({} as MapContextType);


/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */

const MapComponentsProvider = ({ children }:{children:any}) => {
  const [map, setMap] = useState<(MapLibreGlWrapper | undefined)>(undefined);
  const [mapIds, setMapIds] = useState<[...string[]]>([]);
  let mapIds_raw = useRef<[...string[]]>([]);
  let maps = useRef<any>({});


  const removeMap = (mapId:string) => {
    if (mapId) {
      if (typeof maps.current[mapId] !== "undefined") {
        delete maps.current[mapId];
      }
      let mapIdIndex = mapIds_raw.current.indexOf(mapId);
      if (mapIdIndex > -1) {
        mapIds_raw.current.splice(mapIdIndex, 1);
      }
      setMapIds([...mapIds_raw.current]);

      if (mapIds.length === 1 && map) {
        setMap(undefined);
      }
    } else {
      setMap(undefined);
      removeMap("anonymous_map");
    }
  };

  const setMapHandler = (mapInstance:MapLibreGlWrapper) => {
    setMap(mapInstance);

    if (mapIds.length === 0) {
      let mapId = "anonymous_map";
      setMapIds([...mapIds, mapId]);
      maps.current[mapId] = mapInstance;
    }
  };

  const value = {
    map: map,
    setMap: setMapHandler,
    maps: maps.current,
    mapIds: mapIds,
    registerMap: (mapId:string, mapInstance:MapLibreGlWrapper) => {
      if (mapId && mapInstance) {
        maps.current[mapId] = mapInstance;
        mapIds_raw.current.push(mapId);
        setMapIds([...mapIds_raw.current]);

        if (!map) {
          setMap(mapInstance);
        }
      }
    },
    removeMap,
    mapExists: (mapId:string) => {
      if (mapId && Object.keys(maps.current).indexOf(mapId) === -1) {
        return false;
      } else if (!mapId && !map) {
        return false;
      }
      return true;
    },
    getMap: (mapId:string):(MapLibreGlWrapper | null) => {
      if (mapId && mapIds.indexOf(mapId) !== -1) {
        return maps.current[mapId];
      } else if (!mapId && map) {
        return map;
      }

      return null;
    },
  };

  //@ts-ignore
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export { MapComponentsProvider };
export default MapContext;