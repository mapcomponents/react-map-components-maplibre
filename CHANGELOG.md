# Change Log
 

## [Unreleased] - yyyy-mm-dd
 
### Added
### Changed
 
### Fixed

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
 