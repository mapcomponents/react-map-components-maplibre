# Change Log


## [v0.1.47] - 2022-06-15

### Fixed

- ed194ff: fix MlWmsLoader & useWms hooks default param values of GetCapabilities request
## [v0.1.46] - 2022-06-09

### Fixed
- 16e78aa: fix MlImageMarkerLayer initialization conditions 

### Added
- 06e30aa: add MeasureTool to catalog
- 35bc0ff: make MapLibreMap options.style property reactive to dynamic changes during runtime

## [v0.1.45] - 2022-05-10

### Fixed
- 336bca8: fix useLayer implicit layer types

## [v0.1.44] - 2022-05-10

### Fixed
- a81bb06: fix useLayer setPaintProperty error when changing geojson type using implicit layer types

## [v0.1.42] - 2022-05-10

### Fixed
- d974415: fix geojsonlayer default circle color

## [v0.1.41] - 2022-05-10

### Fixed
- 4c1f5b6: fix MlWmsLoader 
- 32e6a3f: fix useLayer reinitialization bug 

## [v0.1.39] - 2022-04-21

### Changed
- move d3 from devDependencies to dependencies
## [v0.1.38] - 2022-04-21

### Changed
- integrate MapContext from @mapcomonents/react-core

## [v0.1.37] (broken build) - 2022-04-20
## [v0.1.36] (broken build) - 2022-04-20
## [v0.1.35] (broken build) - 2022-04-20

### Changed
- migrate components and hooks to typescript

## [v0.1.34] - 2022-03-24

### Fixed
- 0ced5c1: revert to webpack inline transpilation exclusion as there is no effect on codesandbox installation issues

## [v0.1.33] - 2022-03-24

### Fixed
- 5b80cac: remove webpack inline transpilation exclusion to fix codesandbox installation issues

## [v0.1.32] - 2022-03-15

### Added
- bd333ce: add exports for useWms and MlMarker
## [v0.1.31] - 2022-02-24

### Added
- acbaa59: export MlTransitionGeoJsonLayer from esm module

## [v0.1.30] - 2022-02-20

### Fixed
- 26dc071: exclude maplibre-gl from transpilation using ! webpack import syntax to prevent "Uncaught ReferenceError" bug

## [v0.1.28] - 2022-02-20

### Added
- 486b7a2: add device orientation indicator to MlFollowGps component
### Changed
- aba9483: upgrade maplibre-gl to v2.1.6
- 2f5d769: add MlNavigationtools to all storybook demos by integrating it into storybook decorators
- ae871c0: migrate MlScaleReference to useMap hook
- a322419: migrate MlNavigationTools to useMap hook
- 241c28d: migrate MlNavigationCompass to useMap hook
- 1de0269: migrate MlOsmLayer to useMap hook
- 83694e5: migrate MlGPXViewer to useMap hook
- f1e7c3d: upgrade @mui dependencies
- 1c873d9: upgrade three, xmldom & jspdf dependencies
- 2890587: Remove all LineString transition logic from MlGeoJsonLayer to MlTransitionGeoJsonLayer

### Fixed
- 2890587: Merge pull request #5 from mapcomponents/feature/add-mltransitiongeojsonlayer

## [v0.1.27] - 2022-02-05
 
### Fixed
- 743b8ed: set includeBaseLayers filter in useMap hool to true to make waiting for base layers possible

### Changed
- da55245: make the registration of an onlayerchange event handler by the useMap hook dependent on its waitForLayer prop

## [v0.1.26] - 2022-02-02

### Fixed

- adjust MlFollowGps position marker style & add flyTo instead of setCenter for new Gps positions
- fix useWms hook retrieval of WMS GetMap URL

## [v0.1.25] - 2022-01-31

### Fixed

- fix MlFollowGps needsRedraw bug; refactor MlFollowGps

## [v0.1.24] - 2022-01-23

### Fixed

- fix MlVectorTileLayer sourceId

## [v0.1.23] - 2022-01-23

### Changed

- migrate MlVectorTileLayer to useMap hook & provide full control over layer & source id

## [v0.1.22] - 2022-01-23

### Changed

- make MlVectorTileLayer props.layers[].layout properties update dynamically

## [v0.1.21] - 2022-01-21

### Fixed

- migrate MlVectorTileLayer to useMap hook & provide full control over layer & source id

## [v0.1.20] - 2022-01-17

### Changed
- migrate MlWmsLayer to use useMap hook instead of mapContext

### Fixed
- adjust MapLibreGlWrapper to fire layerchange events more efficiently
- MlShareMapState: prevent pushing new history states if props.active is false
- fix MlWmsLayer & tests
- fix MlVectorTileLayer visible property
- fix MlGeoJsonLayer props.onHover, props.onClick, props.onLeave

### Added
- add props.sourceOptions to MlVectorTileLayer
## [v0.1.19] - 2022-01-09

### Added
- add props.options to MlGeoJsonLayer 
## [v0.1.18] - 2022-01-09

### Added
- add props.defaultPaintOverrides to MlGeoJsonLayer 

## [v0.1.17] - 2022-01-09
 
### Added
- add implicit layer-type (props.type) casting for MlGeoJsonLayer
### Changed
 
### Fixed
- fix MlGeoJsonLayer type prop: remove and add a new layer of the new type, if props.type changes

## [v0.1.16] - 2021-12-23
 
### Added
- add CHANGELOG.md
 
### Changed
- migrate MlComponentTemplate to utilize useMap hook
- migrate MlFollowGps to utilize useMap hook
 
### Fixed
- fix MlFollowGps - remove example code (setCenter)

## [v0.1.15] - 2021-12-21
 
### Added
- export MlFollowGps component from esm module
- add a useMap hook to reduce boilerplate code in components
 
### Changed
- adjust MlImageMarkerLayer to make use of the new useMap hook
 
### Fixed
 