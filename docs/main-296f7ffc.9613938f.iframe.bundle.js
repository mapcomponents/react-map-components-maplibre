/*! For license information please see main-296f7ffc.9613938f.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_mapcomponents_react_maplibre=self.webpackChunk_mapcomponents_react_maplibre||[]).push([[692],{11590:(t,e,r)=>{"use strict";r.d(e,{Z:()=>s});var n=r(516),o=r.n(n),i=r(93694),a=r.n(i)()(o());a.push([t.id,".docs-story > div:first-child{\n  z-index:0;\n}\n\n.docs-story > div > div:first-child, .innerZoomElementWrapper, .innerZoomElementWrapper > div:first-child, .innerZoomElementWrapper > div:first-child > div:first-child{\n\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.docs-story > div > div:first-child{\n  height: initial;\n}\n\n.innerZoomElementWrapper > div > div > div:first-child{\n  height: 100% !important;\n}\n","",{version:3,sources:["webpack://./.storybook/style.css"],names:[],mappings:"AAAA;EACE,SAAS;AACX;;AAEA;;EAEE,kBAAkB;EAClB,MAAM;EACN,SAAS;EACT,OAAO;EACP,QAAQ;AACV;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,uBAAuB;AACzB",sourcesContent:[".docs-story > div:first-child{\n  z-index:0;\n}\n\n.docs-story > div > div:first-child, .innerZoomElementWrapper, .innerZoomElementWrapper > div:first-child, .innerZoomElementWrapper > div:first-child > div:first-child{\n\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.docs-story > div > div:first-child{\n  height: initial;\n}\n\n.innerZoomElementWrapper > div > div > div:first-child{\n  height: 100% !important;\n}\n"],sourceRoot:""}]);const s=a},41398:(t,e,r)=>{"use strict";r.d(e,{Z:()=>s});var n=r(516),o=r.n(n),i=r(93694),a=r.n(i)()(o());a.push([t.id,"","",{version:3,sources:[],names:[],mappings:"",sourceRoot:""}]);const s=a},16151:(t,e,r)=>{"use strict";var n=r(16785),o=r.n(n),i=r(41398);o()(i.Z,{insert:"head",singleton:!1}),i.Z.locals},5945:(t,e,r)=>{"use strict";var n={};r.r(n),r.d(n,{__namedExportsOrder:()=>u,globalTypes:()=>l,parameters:()=>c});var o=r(34884),i=r(16785),a=r.n(i),s=r(11590);a()(s.Z,{insert:"head",singleton:!1}),s.Z.locals,console.log("ReactDOM.render warning is from storybook still using react 17 to render the UI; The components shown are using 18 thoug. See https://github.com/storybookjs/storybook/issues/17831 for more info. The issue will eventually be resolved by upgrading storybook, once it fully supports React 18");var c={docs:{inlineStories:!1},actions:{argTypesRegex:"^on[A-Z].*"},sourceLinkPrefix:"https://github.com/mapcomponents/react-map-components-maplibre/blob/main/src/"},l={theme:{name:"Theme",title:"Theme",description:"Theme for your components",defaultValue:"light",toolbar:{icon:"paintbrush",dynamicTitle:!0,items:[{value:"light",left:"☀️",title:"Light mode"},{value:"dark",left:"🌙",title:"Dark mode"}]}}},u=["parameters","globalTypes"];function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}Object.keys(n).forEach((function(t){var e=n[t];switch(t){case"args":return(0,o.uc)(e);case"argTypes":return(0,o.v9)(e);case"decorators":return e.forEach((function(t){return(0,o.$9)(t,!1)}));case"loaders":return e.forEach((function(t){return(0,o.HZ)(t,!1)}));case"parameters":return(0,o.h1)(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){f(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},e),!1);case"argTypesEnhancers":return e.forEach((function(t){return(0,o.My)(t)}));case"argsEnhancers":return e.forEach((function(t){return(0,o._C)(t)}));case"render":return(0,o.$P)(e);case"globals":case"globalTypes":var r={};return r[t]=e,(0,o.h1)(r,!1);case"__namedExportsOrder":case"decorateStory":case"renderToDOM":return null;default:return console.log(t+" was not supported :( !")}}))},57291:(t,e,r)=>{"use strict";r.r(e),r.d(e,{ExampleConfig:()=>h,StyleChangeConfig:()=>g,__namedExportsOrder:()=>b,default:()=>d});var n=r(67294),o=r(83730),i=r(76956),a=r(72642),s=r(18434),c=r(87455),l=r(4274);function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){y(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function y(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==u(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===u(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}const d={title:"Core/MapLibreMap",component:o.Z,argTypes:{options:{control:{type:"object"}}},decorators:l.Z,parameters:{sourceLink:"components/MapLibreMap/MapLibreMap.tsx"}};var h=function(t){return n.createElement(o.Z,{options:m({},t.options)})}.bind({});h.args={options:{style:"https://wms.wheregroup.com/tileserver/style/osm-bright.json",center:[8.607,53.1409349],zoom:14}};var v=[{name:"OSM-Bright",url:"https://wms.wheregroup.com/tileserver/style/osm-bright.json"},{name:"OSM-Fiord-Color",url:"https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json"}],g=function(t){var e,r,l=(e=(0,n.useState)(v[1].url),r=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,s=[],c=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(s.push(n.value),s.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return s}}(e,r)||function(t,e){if(t){if("string"==typeof t)return p(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=l[0],f=l[1];return n.createElement(n.Fragment,null,n.createElement(s.Z,{buttons:n.createElement(n.Fragment,null,v.map((function(t){return n.createElement(a.Z,{key:t.name,variant:u===t.url?"contained":"outlined",onClick:function(){f(t.url)},sx:{marginRight:"10px",marginTop:{xs:"10px",sm:"0px"}}},t.name)})))}),n.createElement(o.Z,{options:m(m({},t.options),{},{style:u})}),n.createElement(i.Z,{type:"line",geojson:c}))}.bind({});g.args={options:{zoom:14.5,center:[7.0851268,50.73884]}},g.parameters={},h.parameters=m({storySource:{source:"(args) => {\n\treturn <MapLibreMap options={{ ...args.options }} />;\n}"}},h.parameters),g.parameters=m({storySource:{source:"(args) => {\n\tconst [activeStyle, setActiveStyle] = useState(styles[1].url);\n\n\treturn (\n\t\t<>\n\t\t\t<TopToolbar\n\t\t\t\tbuttons={\n\t\t\t\t\t<>\n\t\t\t\t\t\t{styles.map((style) => (\n\t\t\t\t\t\t\t<Button\n\t\t\t\t\t\t\t\tkey={style.name}\n\t\t\t\t\t\t\t\tvariant={activeStyle === style.url ? 'contained' : 'outlined'}\n\t\t\t\t\t\t\t\tonClick={() => {\n\t\t\t\t\t\t\t\t\tsetActiveStyle(style.url);\n\t\t\t\t\t\t\t\t}}\n\t\t\t\t\t\t\t\tsx={{\n\t\t\t\t\t\t\t\t\tmarginRight: '10px',\n\t\t\t\t\t\t\t\t\tmarginTop: { xs: '10px', sm: '0px' },\n\t\t\t\t\t\t\t\t}}\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t{style.name}\n\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t))}\n\t\t\t\t\t</>\n\t\t\t\t}\n\t\t\t/>\n\t\t\t<MapLibreMap options={{ ...args.options, style: activeStyle }} />\n\t\t\t<MlGeoJsonLayer type=\"line\" geojson={sample_geojson_1} />\n\t\t</>\n\t);\n}"}},g.parameters);var b=["ExampleConfig","StyleChangeConfig"]},83730:(t,e,r)=>{"use strict";r.d(e,{Z:()=>f});var n=r(67294),o=r(74736),i=r(7491);function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){l(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==a(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===a(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r(72597);var u={mapId:void 0,options:{center:{lng:8.607,lat:53.1409349},zoom:11,container:"",style:{version:8,name:"blank",center:[0,0],zoom:0,sources:{},sprite:"https://wms.wheregroup.com/tileserver/sprites/osm-bright",glyphs:"https://wms.wheregroup.com/tileserver/fonts/{fontstack}/{range}.pbf",layers:[{id:"_background",type:"background",paint:{"background-color":"rgba(0,0,0,0)"}}]}}},p=function(t){var e,r,a=(0,n.useRef)(),s=(0,n.useRef)(),l=(0,n.useContext)(o.Z),p=(0,n.useRef)(t.mapId),f=(0,n.useRef)(!1),m=(0,n.useRef)(null===(e=t.options)||void 0===e?void 0:e.style);return(0,n.useEffect)((function(){var t=p.current;return function(){var e,r;f.current=!1,l.removeMap(t),a.current&&(null===(e=a.current.map)||void 0===e||null===(r=e.remove)||void 0===r||r.call(e),a.current.cancelled=!0,a.current=void 0)}}),[]),(0,n.useEffect)((function(){var e,r;f.current||s.current&&(f.current=!0,a.current=new i.Z({mapOptions:c(c(c({style:""},t.options),null!=t&&null!==(e=t.options)&&void 0!==e&&e.style?{}:{style:null==u||null===(r=u.options)||void 0===r?void 0:r.style}),{},{container:s.current}),onReady:function(e,r){e.once("load",(function(){null!=r&&r.cancelled?e.remove():(window._map=e,t.mapId?l.registerMap(t.mapId,r):l.setMap(r))}))}}))}),[t.options,t.mapId]),(0,n.useEffect)((function(){var e,r;null!==(e=a.current)&&void 0!==e&&e.map&&null!=t&&null!==(r=t.options)&&void 0!==r&&r.style&&m.current!==t.options.style&&(m.current=t.options.style,a.current.map.setStyle(t.options.style))}),[null==t||null===(r=t.options)||void 0===r?void 0:r.style]),n.createElement("div",{ref:s,className:"mapContainer",style:t.style})};p.defaultProps=u;const f=p;try{p.displayName="MapLibreMap",p.__docgenInfo={description:"Creates a MapLibreGlWrapper instance and registers it in MapContext\nafter the MapLibre-gl load event has fired.\n\nMapLibreMap returns the html node that will be used by MapLibre-gl to render the map.\nThis Component must be kept unaware of any related components that interact with the MapLibre-gl\ninstance.",displayName:"MapLibreMap",props:{mapId:{defaultValue:{value:"undefined"},description:"Id of the MapLibreGl(Wrapper) instance in mapContext",name:"mapId",required:!1,type:{name:"string | undefined"}},options:{defaultValue:{value:"{\n\t\tcenter: { lng: 8.607, lat: 53.1409349 },\n\t\tzoom: 11,\n\t\tcontainer: '',\n\t\tstyle: {\n\t\t\tversion: 8,\n\t\t\tname: 'blank',\n\t\t\tcenter: [0, 0],\n\t\t\tzoom: 0,\n\t\t\tsources: {},\n\t\t\tsprite: 'https://wms.wheregroup.com/tileserver/sprites/osm-bright',\n\t\t\tglyphs: 'https://wms.wheregroup.com/tileserver/fonts/{fontstack}/{range}.pbf',\n\t\t\tlayers: [\n\t\t\t\t{\n\t\t\t\t\tid: '_background',\n\t\t\t\t\ttype: 'background',\n\t\t\t\t\tpaint: {\n\t\t\t\t\t\t'background-color': 'rgba(0,0,0,0)',\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t}"},description:"Config object that is passed to the MapLibreGl constructor as first parameter.\nSee https://maplibre.org/maplibre-gl-js-docs/api/map/ for a formal documentation of al\navailable properties.",name:"options",required:!1,type:{name:"Partial<MapOptions> | undefined"}},style:{defaultValue:null,description:"css style definition passed to the map container DOM element",name:"style",required:!1,type:{name:"object | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MapLibreMap/MapLibreMap.tsx#MapLibreMap"]={docgenInfo:p.__docgenInfo,name:"MapLibreMap",path:"src/components/MapLibreMap/MapLibreMap.tsx#MapLibreMap"})}catch(t){}},7491:(t,e,r)=>{"use strict";r.d(e,{Z:()=>p});var n=r(24613);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},s=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function p(t,e,r,o){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),s=new P(o||[]);return n(a,"_invoke",{value:S(t,r,s)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=p;var m={};function y(){}function d(){}function h(){}var v={};u(v,s,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(x([])));b&&b!==e&&r.call(b,s)&&(v=b);var w=h.prototype=y.prototype=Object.create(v);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function i(n,a,s,c){var l=f(t[n],t,a);if("throw"!==l.type){var u=l.arg,p=u.value;return p&&"object"==o(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){i("next",t,s,c)}),(function(t){i("throw",t,s,c)})):e.resolve(p).then((function(t){u.value=t,s(u)}),(function(t){return i("throw",t,s,c)}))}c(l.arg)}var a;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){i(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=j(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=f(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function j(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var o=f(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,m;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,m):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function x(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:M}}function M(){return{value:void 0,done:!0}}return d.prototype=h,n(w,"constructor",{value:h,configurable:!0}),n(h,"constructor",{value:d,configurable:!0}),d.displayName=u(h,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,u(t,l,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},E(O.prototype),u(O.prototype,c,(function(){return this})),t.AsyncIterator=O,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new O(p(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(w),u(w,l,"Generator"),u(w,s,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=x,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(A),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),A(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:x(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),m}},t}function a(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function s(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return c(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==o(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===o(i)?i:String(i)),n)}var i}function u(t,e,r){return e&&l(t.prototype,e),r&&l(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}const p=u((function t(e){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var o=this;this.registeredElements={},this.baseLayers=[],this.firstSymbolLayer=void 0,this.eventHandlers={layerchange:[],viewportchange:[]},this.wrapper={on:function(t,e,r,n){if(o.eventHandlers[t]){"string"==typeof r&&(n=r,r={}),o.eventHandlers[t].push({handler:e,options:r});var i=[t,e];n&&"string"==typeof n&&(o.initRegisteredElements(n),o.registeredElements[n].wrapperEvents.push(i))}},off:function(t,e){o.eventHandlers[t]&&(o.eventHandlers[t]=o.eventHandlers[t].filter((function(t){return!Object.is(t[1],e)&&t})))},fire:function(t,e){if(o.eventHandlers[t]){var r=e||window,n=new Event(t);o.eventHandlers[t].forEach((function(t){t.handler.call(r,n,o)}))}},layerState:[],layerStateString:"",oldLayerStateStrings:{},buildLayerObject:function(t){return{id:t.id,type:t.type,visible:"none"!==t.visibility,baseLayer:-1!==o.baseLayers.indexOf(t.id)}},buildLayerObjects:function(){return o.map.style._order.map((function(t){return o.wrapper.buildLayerObject(o.map.style._layers[t])})).filter((function(t){return void 0!==t}))},refreshLayerState:function(){o.wrapper.layerState=o.wrapper.buildLayerObjects(),JSON.stringify(o.wrapper.layerState)!==o.wrapper.layerStateString&&(o.wrapper.fire("layerchange"),o.wrapper.layerStateString=JSON.stringify(o.wrapper.layerState))},viewportState:{center:{lng:0,lat:0},zoom:0,bearing:0,pitch:0},viewportStateString:"{}",oldViewportStateString:"{}",getViewport:function(){return"function"==typeof o.map.getCenter?{center:(t=o.map.getCenter(),{lng:t.lng,lat:t.lat}),zoom:o.map.getZoom(),bearing:o.map.getBearing(),pitch:o.map.getPitch()}:{center:{lng:0,lat:0},zoom:0,bearing:0,pitch:0};var t},refreshViewport:function(){o.wrapper.viewportState=o.wrapper.getViewport()}},this.cancelled=!1,this.initRegisteredElements=function(t,e){(void 0===o.registeredElements[t]||void 0!==e&&e)&&(o.registeredElements[t]={layers:[],sources:[],images:[],events:[],controls:[],wrapperEvents:[]})},this.addLayer=function(t,e,n){return o.map.style?(n&&"string"==typeof n&&void 0!==t.id&&(o.initRegisteredElements(n),o.registeredElements[n].layers.push(t.id),null!=t&&t.source&&"string"!=typeof(null==t?void 0:t.source)&&o.registeredElements[n].sources.push(t.id)),o.map.addLayer(t,e),r):r},this.addSource=function(t,e,n){return o.map.style?(n&&"string"==typeof n&&void 0!==t&&(o.initRegisteredElements(n),o.registeredElements[n].sources.push(t)),o.map.addSource(t,e),r):r},this.addImage=function(t,e,n,i){return o.map.style?"string"==typeof n&&void 0===i?o.addImage(t,e,void 0,n):(i&&"string"==typeof i&&void 0!==t&&(o.initRegisteredElements(i),o.registeredElements[i].images.push(t)),o.map.addImage(t,e,n),r):r},this.on=function(t,e,n,i){var a;if("string"==typeof n&&"function"==typeof e)return o.on.call(o,t,void 0,e,n);var c=[t,e,n];return e||(c=[t,n]),i&&"string"==typeof i&&(o.initRegisteredElements(i),o.registeredElements[i].events.push(c)),(a=o.map).on.apply(a,s(c)),r},this.addControl=function(t,e,n){return n&&"string"==typeof n&&(o.initRegisteredElements(n),o.registeredElements[n].controls.push(t)),o.map.addControl(t,e),r},this.cleanup=function(t){o.map.style&&void 0!==o.registeredElements[t]&&(o.registeredElements[t].layers.forEach((function(t){o.map.style.getLayer(t)&&o.map.style.removeLayer(t)})),o.registeredElements[t].sources.forEach((function(t){o.map.style.getSource(t)&&o.map.style.removeSource(t)})),o.registeredElements[t].images.forEach((function(t){o.map.hasImage(t)&&o.map.style.removeImage(t)})),o.registeredElements[t].events.forEach((function(t){var e;(e=o.map).off.apply(e,s(t))})),o.registeredElements[t].controls.forEach((function(t){o.map.removeControl(t)})),o.registeredElements[t].wrapperEvents.forEach((function(t){var e;(e=o.wrapper).off.apply(e,s(t))})),o.initRegisteredElements(t,!0))},["moveLayer","removeLayer","removeSource","setPaintProperty","setLayoutProperty"].forEach((function(t){r[t]=function(){var e;return o.map&&o.map.style&&"function"==typeof o.map.style[t]&&(e=o.map.style)[t].apply(e,arguments),o.map._update?o.map._update(!0):void 0}})),["getLayer","getSource","listImages","getPaintProperty","getLayoutProperty","removeImage"].forEach((function(t){r[t]=function(){var e;return!(!o.map||!o.map.style)&&(e=o.map.style)[t].apply(e,arguments)}})),this.addNativeMaplibreFunctionsAndProps=function(){Object.getOwnPropertyNames(Object.getPrototypeOf(r.map)).forEach((function(t){void 0===r[t]&&(r[t]=function(){var e;return(e=o.map)[t].apply(e,arguments)})})),Object.keys(r.map).forEach((function(t){void 0===r[t]&&(r[t]=o.map[t])}))},["getZoom","setZoom","getCenter","setCenter","getBearing","setBearing","getPitch","setPitch","jumpTo","flyTo","panTo","panBy","panBy","zoomTo","zoomIn","zoomOut","getPadding","setPadding","rotateTo","resetNorth","resetNorthPitch","snapToNorth","cameraForBounds","fitBounds","fitScreenCoordinates","getFreeCameraOptions","setFreeCameraOptions","easeTo","stop"].forEach((function(t){r[t]=function(){if("function"==typeof o.map[t]){for(var e,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=o.map[t]).call.apply(e,[o.map].concat(n))}}}));var c=function(){var t,r=(t=i().mark((function t(){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("string"!=typeof e.mapOptions.style||-1!==e.mapOptions.style.indexOf("mapbox://")){t.next=3;break}return t.next=3,fetch(e.mapOptions.style).then((function(t){if(t.ok)return t.json();throw new Error("error loading map style.json")})).then((function(t){t.layers.forEach((function(t){o.baseLayers.push(t.id),o.firstSymbolLayer||"symbol"!==t.type||(o.firstSymbolLayer=t.id)})),o.styleJson=t,e.mapOptions.style=t})).catch((function(t){console.log(t)}));case 3:o.map=new n.Map(e.mapOptions),o.addNativeMaplibreFunctionsAndProps(),o.wrapper.refreshViewport(),o.wrapper.fire("viewportchange"),o.map.on("load",(function(){o.addNativeMaplibreFunctionsAndProps()})),o.map.on("move",(function(){o.wrapper.viewportState=o.wrapper.getViewport(),o.wrapper.fire("viewportchange")})),o.map.on("idle",(function(){o.wrapper.refreshLayerState()})),o.map.on("data",(function(){o.wrapper.refreshLayerState()})),"function"==typeof e.onReady&&e.onReady(o.map,o);case 12:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function s(t){a(i,n,o,s,c,"next",t)}function c(t){a(i,n,o,s,c,"throw",t)}s(void 0)}))});return function(){return r.apply(this,arguments)}}();c()}))},24654:()=>{},37607:()=>{},77215:(t,e,r)=>{"use strict";t=r.nmd(t),(0,r(94690).configure)([r(10875),r(5880)],t,!1)}}]);