declare module "*.svg" {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}



declare module 'csv2geojson' {
    

    export function csv2geojson(
        csvString: string,
        options: csvOptions,
        callback: (err: string, data: FeatureCollection) => void
    ): void
}

interface csvOptions {
	latfield?: string,
	lonfield?: string,
	delimiter?: string
}
