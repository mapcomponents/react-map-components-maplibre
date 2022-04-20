
declare module "*.svg" {
  const content: any;
  export default content;
  export { content as ReactComponent };
}
declare module "*.js" {
  const content: any;
  export default content;
}

//declare module '@mapcomponents/react-core';
type MapContextType= {
  mapIds: [string?];
  mapExists: Function;
  maps: [];
  map: any,
  getMap: Function;
  setMap: Function;
};

interface GeoJSON {
  type: string,
  features?: any
  geometry?: any
}