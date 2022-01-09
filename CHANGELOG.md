# Change Log
 

## [Unreleased] - yyyy-mm-dd
 
### Added
### Changed
 
### Fixed

## [0.1.17] - 2022-01-09
 
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
 