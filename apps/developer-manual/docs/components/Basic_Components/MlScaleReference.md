# MlScaleReference

This Component adds a scale either as an overlay or toolbar.

### Usage as an overlay

```javascript
import { MlScaleReference } from "@mapcomponents/react-maplibre";
```

```javascript
<div
  style={{
    bottom: "8px",
    left: "10px",
    position: "absolute",
    zIndex: 1000,
  }}
>
  <MlScaleReference />
</div>
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlscalereference--overlay"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

### Usage in toolbar

```javascript
import { MlScaleReference } from "@mapcomponents/react-maplibre";
import { TopToolbar } from "@mapcomponents/react-maplibre";
```

```javascript
<TopToolbar unmovableButtons={<MlScaleReference />} />
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlscalereference--toolbar"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

### Links
