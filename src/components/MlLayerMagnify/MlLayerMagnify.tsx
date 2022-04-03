import React, {
  useContext,
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo
} from "react";
// @ts-ignore
import syncMove from "@mapbox/mapbox-gl-sync-move";
import "./style.css";
// @ts-ignore
import { MapContext } from "@mapcomponents/react-core";

interface MlLayerMagnifyProps {
  /**
   * Id of the first MapLibre instance
   */
  map1Id: string;
  /**
   * Id of the second MapLibre instance
   */
  map2Id: string;
  /**
   * Size of the "magnifier"-circle
   */
  magnifierRadius?: number;
}

/**
 *
 * Hides the MapLibreMap referenced by props.map2Id except for the "magnifier"-circle that reveals
 * the map and can be dragged around on top of the MapLibreMap referenced by props.map1Id
 */
const MlLayerMagnify = (props: MlLayerMagnifyProps) => {
  const mapContext:MapContextType = useContext(MapContext);
  const syncMoveInitializedRef = useRef(false);
  const syncCleanupFunctionRef = useRef(null);

  const [swipeX, setSwipeX] = useState('50');
  const swipeXRef = useRef('50');
  const [swipeY, setSwipeY] = useState('50');
  const swipeYRef = useRef('50');

  const magnifierRadius = useMemo(() => {
    return props.magnifierRadius || 200;
  },[props.magnifierRadius]);

  const mapExists = useCallback(() => {
    if (!props.map1Id || !props.map2Id) {
      return false;
    }
    if (!mapContext.getMap(props.map1Id) || !mapContext.getMap(props.map2Id)) {
      return false;
    }

    return true;
  }, [props, mapContext]);

  const onResize = useRef(() => {
    if (!mapExists()) return;

    onMove({
      clientX: swipeXRef.current,
      clientY: swipeYRef.current,
    });
  });

  useEffect(() => {
    window.addEventListener("resize", onResize.current);
    let _onResize = onResize.current;

    return () => {
      window.removeEventListener("resize", _onResize);
      if (typeof syncCleanupFunctionRef.current === 'function') {
        // @ts-ignore
        syncCleanupFunctionRef.current();
      }
    };
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!mapExists()) return;

      let bounds = mapContext.maps[props.map1Id]
        .getCanvas()
        .getBoundingClientRect();
      let clientX =
        e.clientX ||
        (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
          ? e.touches[0].clientX
          : 0);
      let clientY =
        e.clientY ||
        (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
          ? e.touches[0].clientY
          : 0);

      clientX -= bounds.x;
      clientY -= bounds.y;
      let swipeX_tmp = ((clientX / bounds.width) * 100).toFixed(2);
      let swipeY_tmp = ((clientY / bounds.height) * 100).toFixed(2);

      if (
        swipeXRef.current !== swipeX_tmp ||
        swipeYRef.current !== swipeY_tmp
      ) {
        setSwipeX(swipeX_tmp);
        swipeXRef.current = swipeX_tmp;
        setSwipeY(swipeY_tmp);
        swipeYRef.current = swipeY_tmp;

        mapContext.maps[props.map2Id].getContainer().style.clipPath =
          `circle(${magnifierRadius}px at ` +
          (parseFloat(swipeXRef.current) * bounds.width) / 100 +
          "px " +
          (parseFloat(swipeYRef.current) * bounds.height) / 100 +
          "px)";
      }
    },
    [mapContext, mapExists, props, magnifierRadius]
  );

  useEffect(() => {
    if (!mapExists() || syncMoveInitializedRef.current) return;

    syncMoveInitializedRef.current = true;
    syncCleanupFunctionRef.current = syncMove(
      mapContext.getMap(props.map1Id).map,
      mapContext.getMap(props.map2Id).map
    );

    /*
    automatically adjust radius for small screens
    if (
      mapContext.maps[props.map1Id].getCanvas().clientWidth >
        mapContext.maps[props.map1Id].getCanvas().clientHeight &&
      magnifierRadius * 2 >
        mapContext.maps[props.map1Id].getCanvas().clientHeight
    ) {
      magnifierRadius = Math.floor(
        mapContext.maps[props.map1Id].getCanvas().clientHeight / 2
      );
      setMagnifierRadius(magnifierRadius);
    }

    if (
      mapContext.maps[props.map1Id].getCanvas().clientHeight >
        mapContext.maps[props.map1Id].getCanvas().clientWidth &&
      magnifierRadius * 2 >
        mapContext.maps[props.map1Id].getCanvas().clientWidth
    ) {
      magnifierRadius = Math.floor(
        mapContext.maps[props.map1Id].getCanvas().clientWidth / 2
      );
      setMagnifierRadius(magnifierRadius);
    }
    */

    onMove({
      clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
      clientY: mapContext.maps[props.map1Id].getCanvas().clientHeight / 2,
    });
  }, [mapContext.mapIds, mapContext, mapExists, props, onMove]);

  const onDown = (e:any) => {
    if (e.touches) {
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onTouchEnd);
    } else {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  const onTouchEnd = () => {
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onWheel = (e:any) => {
    let evCopy = new WheelEvent(e.type, e);
    mapContext.map.getCanvas().dispatchEvent(evCopy);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: swipeX + "%",
        top: swipeY + "%",
        borderRadius: "50%",
        width: magnifierRadius * 2 + 1 + "px",
        height: magnifierRadius * 2 + 1 + "px",
        background: "rgba(0,0,0,0)",
        border: "2px solid #fafafa",
        boxShadow:
          "1px 2px 2px rgba(19, 19, 19, .5), inset 1px 1px 1px rgba(19, 19, 19, .2)",
        cursor: "pointer",
        zIndex: "110",
        marginLeft: magnifierRadius * -1 - 1 + "px",
        marginTop: magnifierRadius * -1 - 1 + "px",
        textAlign: "center",
        lineHeight: "91px",
        fontSize: "2em",
        color: "#fafafa",
        userSelect: "none",
      }}
      onTouchStart={onDown}
      onMouseDown={onDown}
      onWheel={onWheel}
    ></div>
  );
};

MlLayerMagnify.defaultProps = {
  magnifierRadius: 200,
};

export default MlLayerMagnify;
