import { MapLibreMap } from '@mapcomponents/react-maplibre';
import "./App.css";

function App() {
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 4,
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
    </>
  );
}

export default App;
