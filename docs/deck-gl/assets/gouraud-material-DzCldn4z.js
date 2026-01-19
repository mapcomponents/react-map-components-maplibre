import{f as x,P as R,O as G,Q as O,R as U}from"./useDeckGl-BLLSfejp.js";const N="compositeLayer.renderLayers";class H extends x{get isComposite(){return!0}get isDrawable(){return!1}get isLoaded(){return super.isLoaded&&this.getSubLayers().every(i=>i.isLoaded)}getSubLayers(){return this.internalState&&this.internalState.subLayers||[]}initializeState(i){}setState(i){super.setState(i),this.setNeedsUpdate()}getPickingInfo({info:i}){const{object:e}=i;return e&&e.__source&&e.__source.parent&&e.__source.parent.id===this.id&&(i.object=e.__source.object,i.index=e.__source.index),i}filterSubLayer(i){return!0}shouldRenderSubLayer(i,e){return e&&e.length}getSubLayerClass(i,e){const{_subLayerProps:t}=this.props;return t&&t[i]&&t[i].type||e}getSubLayerRow(i,e,t){return i.__source={parent:this,object:e,index:t},i}getSubLayerAccessor(i){if(typeof i=="function"){const e={index:-1,data:this.props.data,target:[]};return(t,n)=>t&&t.__source?(e.index=t.__source.index,i(t.__source.object,e)):i(t,n)}return i}getSubLayerProps(i={}){const{opacity:e,pickable:t,visible:n,parameters:r,getPolygonOffset:l,highlightedObjectIndex:C,autoHighlight:b,highlightColor:w,coordinateSystem:P,coordinateOrigin:y,wrapLongitude:T,positionFormat:A,modelMatrix:D,extensions:p,fetch:S,operation:M,_subLayerProps:L}=this.props,a={id:"",updateTriggers:{},opacity:e,pickable:t,visible:n,parameters:r,getPolygonOffset:l,highlightedObjectIndex:C,autoHighlight:b,highlightColor:w,coordinateSystem:P,coordinateOrigin:y,wrapLongitude:T,positionFormat:A,modelMatrix:D,extensions:p,fetch:S,operation:M},g=L&&i.id&&L[i.id],E=g&&g.updateTriggers,I=i.id||"sublayer";if(g){const h=this.props[R],c=i.type?i.type._propTypes:{};for(const u in g){const _=c[u]||h[u];_&&_.type==="accessor"&&(g[u]=this.getSubLayerAccessor(g[u]))}}Object.assign(a,i,g),a.id=`${this.props.id}-${I}`,a.updateTriggers={all:this.props.updateTriggers?.all,...i.updateTriggers,...E};for(const h of p){const c=h.getSubLayerProps.call(this,h);c&&Object.assign(a,c,{updateTriggers:Object.assign(a.updateTriggers,c.updateTriggers)})}return a}_updateAutoHighlight(i){for(const e of this.getSubLayers())e.updateAutoHighlight(i)}_getAttributeManager(){return null}_postUpdate(i,e){let t=this.internalState.subLayers;const n=!t||this.needsUpdate();if(n){const r=this.renderLayers();t=G(r,Boolean),this.internalState.subLayers=t}O(N,this,n,t);for(const r of t)r.parent=this}}H.layerName="CompositeLayer";const m=`precision highp int;

// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  vec3 color;
};

struct PointLight {
  vec3 color;
  vec3 position;
  vec3 attenuation; // 2nd order x:Constant-y:Linear-z:Exponential
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

uniform lightingUniforms {
  int enabled;
  int lightType;

  int directionalLightCount;
  int pointLightCount;

  vec3 ambientColor;

  vec3 lightColor0;
  vec3 lightPosition0;
  vec3 lightDirection0;
  vec3 lightAttenuation0;

  vec3 lightColor1;
  vec3 lightPosition1;
  vec3 lightDirection1;
  vec3 lightAttenuation1;

  vec3 lightColor2;
  vec3 lightPosition2;
  vec3 lightDirection2;
  vec3 lightAttenuation2;
} lighting;

PointLight lighting_getPointLight(int index) {
  switch (index) {
    case 0:
      return PointLight(lighting.lightColor0, lighting.lightPosition0, lighting.lightAttenuation0);
    case 1:
      return PointLight(lighting.lightColor1, lighting.lightPosition1, lighting.lightAttenuation1);
    case 2:
    default:  
      return PointLight(lighting.lightColor2, lighting.lightPosition2, lighting.lightAttenuation2);
  }
}

DirectionalLight lighting_getDirectionalLight(int index) {
  switch (index) {
    case 0:
      return DirectionalLight(lighting.lightColor0, lighting.lightDirection0);
    case 1:
      return DirectionalLight(lighting.lightColor1, lighting.lightDirection1);
    case 2:
    default:   
      return DirectionalLight(lighting.lightColor2, lighting.lightDirection2);
  }
} 

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

// #endif
`,z=`// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  color: vec3<f32>,
};

struct PointLight {
  color: vec3<f32>,
  position: vec3<f32>,
  attenuation: vec3<f32>, // 2nd order x:Constant-y:Linear-z:Exponential
};

struct DirectionalLight {
  color: vec3<f32>,
  direction: vec3<f32>,
};

struct lightingUniforms {
  enabled: i32,
  pointLightCount: i32,
  directionalLightCount: i32,

  ambientColor: vec3<f32>,

  // TODO - support multiple lights by uncommenting arrays below
  lightType: i32,
  lightColor: vec3<f32>,
  lightDirection: vec3<f32>,
  lightPosition: vec3<f32>,
  lightAttenuation: vec3<f32>,

  // AmbientLight ambientLight;
  // PointLight pointLight[MAX_LIGHTS];
  // DirectionalLight directionalLight[MAX_LIGHTS];
};

// Binding 0:1 is reserved for lighting (Note: could go into separate bind group as it is stable across draw calls)
@binding(1) @group(0) var<uniform> lighting : lightingUniforms;

fn lighting_getPointLight(index: i32) -> PointLight {
  return PointLight(lighting.lightColor, lighting.lightPosition, lighting.lightAttenuation);
}

fn lighting_getDirectionalLight(index: i32) -> DirectionalLight {
  return DirectionalLight(lighting.lightColor, lighting.lightDirection);
} 

fn getPointLightAttenuation(pointLight: PointLight, distance: f32) -> f32 {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}
`,v=3,X=255;var s;(function(o){o[o.POINT=0]="POINT",o[o.DIRECTIONAL=1]="DIRECTIONAL"})(s||(s={}));const d={props:{},uniforms:{},name:"lighting",defines:{MAX_LIGHTS:v},uniformTypes:{enabled:"i32",lightType:"i32",directionalLightCount:"i32",pointLightCount:"i32",ambientLightColor:"vec3<f32>",lightColor0:"vec3<f32>",lightPosition0:"vec3<f32>",lightDirection0:"vec3<f32>",lightAttenuation0:"vec3<f32>",lightColor1:"vec3<f32>",lightPosition1:"vec3<f32>",lightDirection1:"vec3<f32>",lightAttenuation1:"vec3<f32>",lightColor2:"vec3<f32>",lightPosition2:"vec3<f32>",lightDirection2:"vec3<f32>",lightAttenuation2:"vec3<f32>"},defaultUniforms:{enabled:1,lightType:s.POINT,directionalLightCount:0,pointLightCount:0,ambientLightColor:[.1,.1,.1],lightColor0:[1,1,1],lightPosition0:[1,1,2],lightDirection0:[1,1,1],lightAttenuation0:[1,0,0],lightColor1:[1,1,1],lightPosition1:[1,1,2],lightDirection1:[1,1,1],lightAttenuation1:[1,0,0],lightColor2:[1,1,1],lightPosition2:[1,1,2],lightDirection2:[1,1,1],lightAttenuation2:[1,0,0]},source:z,vs:m,fs:m,getUniforms:j};function j(o,i={}){if(o=o&&{...o},!o)return{...d.defaultUniforms};o.lights&&(o={...o,...F(o.lights),lights:void 0});const{ambientLight:e,pointLights:t,directionalLights:n}=o||{};if(!(e||t&&t.length>0||n&&n.length>0))return{...d.defaultUniforms,enabled:0};const l={...d.defaultUniforms,...i,...k({ambientLight:e,pointLights:t,directionalLights:n})};return o.enabled!==void 0&&(l.enabled=o.enabled?1:0),l}function k({ambientLight:o,pointLights:i=[],directionalLights:e=[]}){const t={};t.ambientLightColor=f(o);let n=0;for(const r of i){t.lightType=s.POINT;const l=n;t[`lightColor${l}`]=f(r),t[`lightPosition${l}`]=r.position,t[`lightAttenuation${l}`]=r.attenuation||[1,0,0],n++}for(const r of e){t.lightType=s.DIRECTIONAL;const l=n;t[`lightColor${l}`]=f(r),t[`lightDirection${l}`]=r.direction,n++}return n>v&&U.warn("MAX_LIGHTS exceeded")(),t.directionalLightCount=e.length,t.pointLightCount=i.length,t}function F(o){const i={pointLights:[],directionalLights:[]};for(const e of o||[])switch(e.type){case"ambient":i.ambientLight=e;break;case"directional":i.directionalLights?.push(e);break;case"point":i.pointLights?.push(e);break}return i}function f(o={}){const{color:i=[0,0,0],intensity:e=1}=o;return i.map(t=>t*e/X)}const $=`uniform phongMaterialUniforms {
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;
`,V=`uniform phongMaterialUniforms {
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
  vec3 halfway_direction = normalize(light_direction + view_direction);
  float lambertian = dot(light_direction, normal_worldspace);
  float specular = 0.0;
  if (lambertian > 0.0) {
    float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, material.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * material.diffuse * surfaceColor + specular * material.specularColor) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (lighting.enabled == 0) {
    return lightColor;
  }

  vec3 view_direction = normalize(cameraPosition - position_worldspace);
  lightColor = material.ambient * surfaceColor * lighting.ambientColor;

  for (int i = 0; i < lighting.pointLightCount; i++) {
    PointLight pointLight = lighting_getPointLight(i);
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getPointLightAttenuation(pointLight, distance(light_position_worldspace, position_worldspace));
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color / light_attenuation);
  }

  int totalLights = min(MAX_LIGHTS, lighting.pointLightCount + lighting.directionalLightCount);
  for (int i = lighting.pointLightCount; i < totalLights; i++) {
    DirectionalLight directionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
}
`,Y=`struct phongMaterialUniforms {
  ambient: f32,
  diffuse: f32,
  shininess: f32,
  specularColor: vec3<f32>,
};

@binding(2) @group(0) var<uniform> phongMaterial : phongMaterialUniforms;

fn lighting_getLightColor(surfaceColor: vec3<f32>, light_direction: vec3<f32>, view_direction: vec3<f32>, normal_worldspace: vec3<f32>, color: vec3<f32>) -> vec3<f32> {
  let halfway_direction: vec3<f32> = normalize(light_direction + view_direction);
  var lambertian: f32 = dot(light_direction, normal_worldspace);
  var specular: f32 = 0.0;
  if (lambertian > 0.0) {
    let specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, phongMaterial.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * phongMaterial.diffuse * surfaceColor + specular * phongMaterial.specularColor) * color;
}

fn lighting_getLightColor2(surfaceColor: vec3<f32>, cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32> {
  var lightColor: vec3<f32> = surfaceColor;

  if (lighting.enabled == 0) {
    return lightColor;
  }

  let view_direction: vec3<f32> = normalize(cameraPosition - position_worldspace);
  lightColor = phongMaterial.ambient * surfaceColor * lighting.ambientColor;

  if (lighting.lightType == 0) {
    let pointLight: PointLight  = lighting_getPointLight(0);
    let light_position_worldspace: vec3<f32> = pointLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
  } else if (lighting.lightType == 1) {
    var directionalLight: DirectionalLight = lighting_getDirectionalLight(0);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
  /*
  for (int i = 0; i < MAX_LIGHTS; i++) {
    if (i >= lighting.pointLightCount) {
      break;
    }
    PointLight pointLight = lighting.pointLight[i];
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
  }

  for (int i = 0; i < MAX_LIGHTS; i++) {
    if (i >= lighting.directionalLightCount) {
      break;
    }
    DirectionalLight directionalLight = lighting.directionalLight[i];
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  */
}

fn lighting_getSpecularLightColor(cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32>{
  var lightColor = vec3<f32>(0, 0, 0);
  let surfaceColor = vec3<f32>(0, 0, 0);

  if (lighting.enabled == 0) {
    let view_direction = normalize(cameraPosition - position_worldspace);

    switch (lighting.lightType) {
      case 0, default: {
        let pointLight: PointLight = lighting_getPointLight(0);
        let light_position_worldspace: vec3<f32> = pointLight.position;
        let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
        lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color);
      }
      case 1: {
        let directionalLight: DirectionalLight = lighting_getDirectionalLight(0);
        lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
      }
    }
  }
  return lightColor;
}
`,W={props:{},name:"gouraudMaterial",vs:V.replace("phongMaterial","gouraudMaterial"),fs:$.replace("phongMaterial","gouraudMaterial"),source:Y.replaceAll("phongMaterial","gouraudMaterial"),defines:{LIGHTING_VERTEX:1},dependencies:[d],uniformTypes:{ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{ambient:.35,diffuse:.6,shininess:32,specularColor:[.15,.15,.15]},getUniforms(o){const i={...o};return i.specularColor&&(i.specularColor=i.specularColor.map(e=>e/255)),{...W.defaultUniforms,...i}}};export{H as C,V as P,$ as a,Y as b,W as g,d as l};
