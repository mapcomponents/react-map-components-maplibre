---
sidebar_position: 0
---

# Introduction

MapComponents is an open source framework for creating Geo-IT applications.
A catalog of reliable components enables an accurate effort estimation and ensures a faster project launch than developing from scratch.
Well-matched components will help you reach your goal faster, and the high level of customizability enables the implementation of the most exotic requirements.
Due to the clear focus on current technologies such as Vector Tiles, MapLibre, React and Docker the implemented MapComponents applications are sustainable and future-proof.

### The main advantages

- Highly customizable and configurable
- Independent use of all components
- Highly integrable into existing systems

### Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" (there are some exceptions) and is expected to retrieve a maplibre-gl instance from mapContext and directly manipulate it or watch its state. An example implementation of basic required functions for the maplibre instance retrieval process using the useMap hook, can be seen here. If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at mapContext.map (the first maplibre instance that is registered in MapContext).
