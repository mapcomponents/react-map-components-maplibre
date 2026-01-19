import{j as A}from"./index-17y-JmIx.js";import{G as se,m as R,f as le,p as Y,g as ue,M as O,U as k,H as U,I as de,J as ce,K as fe,N as ge,E as me,D as K,F as pe}from"./useDeckGl-BLLSfejp.js";import{r as P}from"./iframe-r0EXsZSX.js";import{P as he,a as ve,b as ye,l as be,g as xe,C as Ce}from"./gouraud-material-DzCldn4z.js";import"./index-DJSjLiaV.js";import"./preload-helper-D9Z9MdNV.js";const Z={name:"phongMaterial",dependencies:[be],source:ye,vs:ve,fs:he,defines:{LIGHTING_FRAGMENT:1},uniformTypes:{ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{ambient:.35,diffuse:.6,shininess:32,specularColor:[.15,.15,.15]},getUniforms(i){const e={...i};return e.specularColor&&(e.specularColor=e.specularColor.map(t=>t/255)),{...Z.defaultUniforms,...e}}},Se={COUNTER_CLOCKWISE:-1};function we(i,e,t={}){return Me(i,t)!==e?(Ie(i,t),!0):!1}function Me(i,e={}){return Math.sign(Ae(i,e))}const B={x:0,y:1,z:2};function Ae(i,e={}){const{start:t=0,end:n=i.length,plane:a="xy"}=e,o=e.size||2;let r=0;const s=B[a[0]],l=B[a[1]];for(let d=t,u=n-o;d<n;d+=o)r+=(i[d+s]-i[u+s])*(i[d+l]+i[u+l]),u=d;return r/2}function Ie(i,e){const{start:t=0,end:n=i.length,size:a=2}=e,o=(n-t)/a,r=Math.floor(o/2);for(let s=0;s<r;++s){const l=t+s*a,d=t+(o-1-s)*a;for(let u=0;u<a;++u){const g=i[l+u];i[l+u]=i[d+u],i[d+u]=g}}}class Pe extends se{constructor(e){const{indices:t,attributes:n}=Le(e);super({...e,indices:t,attributes:n})}}function Le(i){const{radius:e,height:t=1,nradial:n=10}=i;let{vertices:a}=i;a&&(R.assert(a.length>=n),a=a.flatMap(f=>[f[0],f[1]]),we(a,Se.COUNTER_CLOCKWISE));const o=t>0,r=n+1,s=o?r*3+1:n,l=Math.PI*2/n,d=new Uint16Array(o?n*3*2:0),u=new Float32Array(s*3),g=new Float32Array(s*3);let c=0;if(o){for(let f=0;f<r;f++){const m=f*l,h=f%n,p=Math.sin(m),y=Math.cos(m);for(let v=0;v<2;v++)u[c+0]=a?a[h*2]:y*e,u[c+1]=a?a[h*2+1]:p*e,u[c+2]=(1/2-v)*t,g[c+0]=a?a[h*2]:y,g[c+1]=a?a[h*2+1]:p,c+=3}u[c+0]=u[c-3],u[c+1]=u[c-2],u[c+2]=u[c-1],c+=3}for(let f=o?0:1;f<r;f++){const m=Math.floor(f/2)*Math.sign(.5-f%2),h=m*l,p=(m+n)%n,y=Math.sin(h),v=Math.cos(h);u[c+0]=a?a[p*2]:v*e,u[c+1]=a?a[p*2+1]:y*e,u[c+2]=t/2,g[c+2]=1,c+=3}if(o){let f=0;for(let m=0;m<n;m++)d[f++]=m*2+0,d[f++]=m*2+2,d[f++]=m*2+0,d[f++]=m*2+1,d[f++]=m*2+1,d[f++]=m*2+3}return{indices:d,attributes:{POSITION:{size:3,value:u},NORMAL:{size:3,value:g}}}}const j=`uniform columnUniforms {
  float radius;
  float angle;
  vec2 offset;
  bool extruded;
  bool stroked;
  bool isStroke;
  float coverage;
  float elevationScale;
  float edgeDistance;
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  highp int radiusUnits;
  highp int widthUnits;
} column;
`,Te={name:"column",vs:j,fs:j,uniformTypes:{radius:"f32",angle:"f32",offset:"vec2<f32>",extruded:"f32",stroked:"f32",isStroke:"f32",coverage:"f32",elevationScale:"f32",edgeDistance:"f32",widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",radiusUnits:"i32",widthUnits:"i32"}},Ve=`#version 300 es
#define SHADER_NAME column-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec3 instancePositions;
in float instanceElevations;
in vec3 instancePositions64Low;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in float instanceStrokeWidths;
in vec3 instancePickingColors;
out vec4 vColor;
#ifdef FLAT_SHADING
out vec3 cameraPosition;
out vec4 position_commonspace;
#endif
void main(void) {
geometry.worldPosition = instancePositions;
vec4 color = column.isStroke ? instanceLineColors : instanceFillColors;
mat2 rotationMatrix = mat2(cos(column.angle), sin(column.angle), -sin(column.angle), cos(column.angle));
float elevation = 0.0;
float strokeOffsetRatio = 1.0;
if (column.extruded) {
elevation = instanceElevations * (positions.z + 1.0) / 2.0 * column.elevationScale;
} else if (column.stroked) {
float widthPixels = clamp(
project_size_to_pixel(instanceStrokeWidths * column.widthScale, column.widthUnits),
column.widthMinPixels, column.widthMaxPixels) / 2.0;
float halfOffset = project_pixel_size(widthPixels) / project_size(column.edgeDistance * column.coverage * column.radius);
if (column.isStroke) {
strokeOffsetRatio -= sign(positions.z) * halfOffset;
} else {
strokeOffsetRatio -= halfOffset;
}
}
float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);
float dotRadius = column.radius * column.coverage * shouldRender;
geometry.pickingColor = instancePickingColors;
vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);
vec3 centroidPosition64Low = instancePositions64Low;
vec2 offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
if (column.radiusUnits == UNIT_METERS) {
offset = project_size(offset);
}
vec3 pos = vec3(offset, 0.);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);
geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (column.extruded && !column.isStroke) {
#ifdef FLAT_SHADING
cameraPosition = project.cameraPosition;
position_commonspace = geometry.position;
vColor = vec4(color.rgb, color.a * layer.opacity);
#else
vec3 lightColor = lighting_getLightColor(color.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, color.a * layer.opacity);
#endif
} else {
vColor = vec4(color.rgb, color.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,_e=`#version 300 es
#define SHADER_NAME column-layer-fragment-shader
precision highp float;
out vec4 fragColor;
in vec4 vColor;
#ifdef FLAT_SHADING
in vec3 cameraPosition;
in vec4 position_commonspace;
#endif
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
#ifdef FLAT_SHADING
if (column.extruded && !column.isStroke && !bool(picking.isActive)) {
vec3 normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
fragColor.rgb = lighting_getLightColor(vColor.rgb, cameraPosition, position_commonspace.xyz, normal);
}
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,L=[0,0,0,255],De={diskResolution:{type:"number",min:4,value:20},vertices:null,radius:{type:"number",min:0,value:1e3},angle:{type:"number",value:0},offset:{type:"array",value:[0,0]},coverage:{type:"number",min:0,max:1,value:1},elevationScale:{type:"number",min:0,value:1},radiusUnits:"meters",lineWidthUnits:"meters",lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:Number.MAX_SAFE_INTEGER,extruded:!0,wireframe:!1,filled:!0,stroked:!1,flatShading:!1,getPosition:{type:"accessor",value:i=>i.position},getFillColor:{type:"accessor",value:L},getLineColor:{type:"accessor",value:L},getLineWidth:{type:"accessor",value:1},getElevation:{type:"accessor",value:1e3},material:!0,getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class F extends le{getShaders(){const e={},{flatShading:t}=this.props;return t&&(e.FLAT_SHADING=1),super.getShaders({vs:Ve,fs:_e,defines:e,modules:[Y,t?Z:xe,ue,Te]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceElevations:{size:1,transition:!0,accessor:"getElevation"},instanceFillColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getFillColor",defaultValue:L},instanceLineColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getLineColor",defaultValue:L},instanceStrokeWidths:{size:1,accessor:"getLineWidth",transition:!0}})}updateState(e){super.updateState(e);const{props:t,oldProps:n,changeFlags:a}=e,o=a.extensionsChanged||t.flatShading!==n.flatShading;o&&(this.state.models?.forEach(s=>s.destroy()),this.setState(this._getModels()),this.getAttributeManager().invalidateAll());const r=this.getNumInstances();this.state.fillModel.setInstanceCount(r),this.state.wireframeModel.setInstanceCount(r),(o||t.diskResolution!==n.diskResolution||t.vertices!==n.vertices||(t.extruded||t.stroked)!==(n.extruded||n.stroked))&&this._updateGeometry(t)}getGeometry(e,t,n){const a=new Pe({radius:1,height:n?2:0,vertices:t,nradial:e});let o=0;if(t)for(let r=0;r<e;r++){const s=t[r],l=Math.sqrt(s[0]*s[0]+s[1]*s[1]);o+=l/e}else o=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*o}),a}_getModels(){const e=this.getShaders(),t=this.getAttributeManager().getBufferLayouts(),n=new O(this.context.device,{...e,id:`${this.props.id}-fill`,bufferLayout:t,isInstanced:!0}),a=new O(this.context.device,{...e,id:`${this.props.id}-wireframe`,bufferLayout:t,isInstanced:!0});return{fillModel:n,wireframeModel:a,models:[a,n]}}_updateGeometry({diskResolution:e,vertices:t,extruded:n,stroked:a}){const o=this.getGeometry(e,t,n||a);this.setState({fillVertexCount:o.attributes.POSITION.value.length/3});const r=this.state.fillModel,s=this.state.wireframeModel;r.setGeometry(o),r.setTopology("triangle-strip"),r.setIndexBuffer(null),s.setGeometry(o),s.setTopology("line-list")}draw({uniforms:e}){const{lineWidthUnits:t,lineWidthScale:n,lineWidthMinPixels:a,lineWidthMaxPixels:o,radiusUnits:r,elevationScale:s,extruded:l,filled:d,stroked:u,wireframe:g,offset:c,coverage:f,radius:m,angle:h}=this.props,p=this.state.fillModel,y=this.state.wireframeModel,{fillVertexCount:v,edgeDistance:N}=this.state,b={radius:m,angle:h/180*Math.PI,offset:c,extruded:l,stroked:u,coverage:f,elevationScale:s,edgeDistance:N,radiusUnits:k[r],widthUnits:k[t],widthScale:n,widthMinPixels:a,widthMaxPixels:o};l&&g&&(y.shaderInputs.setProps({column:{...b,isStroke:!0}}),y.draw(this.context.renderPass)),d&&(p.setVertexCount(v),p.shaderInputs.setProps({column:{...b,isStroke:!1}}),p.draw(this.context.renderPass)),!l&&u&&(p.setVertexCount(v*2/3),p.shaderInputs.setProps({column:{...b,isStroke:!0}}),p.draw(this.context.renderPass))}}F.layerName="ColumnLayer";F.defaultProps=De;function Ne({pointCount:i,getBinId:e}){const t=new Map;for(let n=0;n<i;n++){const a=e(n);if(a===null)continue;let o=t.get(String(a));o?o.points.push(n):(o={id:a,index:t.size,points:[n]},t.set(String(a),o))}return Array.from(t.values())}function Ee({bins:i,dimensions:e,target:t}){const n=i.length*e;(!t||t.length<n)&&(t=new Float32Array(n));for(let a=0;a<i.length;a++){const{id:o}=i[a];Array.isArray(o)?t.set(o,a*e):t[a]=o}return t}const Oe=i=>i.length,J=(i,e)=>{let t=0;for(const n of i)t+=e(n);return t},Ue=(i,e)=>i.length===0?NaN:J(i,e)/i.length,Re=(i,e)=>{let t=1/0;for(const n of i){const a=e(n);a<t&&(t=a)}return t},Fe=(i,e)=>{let t=-1/0;for(const n of i){const a=e(n);a>t&&(t=a)}return t},ke={COUNT:Oe,SUM:J,MEAN:Ue,MIN:Re,MAX:Fe};function Be({bins:i,getValue:e,operation:t,target:n}){(!n||n.length<i.length)&&(n=new Float32Array(i.length));let a=1/0,o=-1/0;for(let r=0;r<i.length;r++){const{points:s}=i[r];n[r]=t(s,e),n[r]<a&&(a=n[r]),n[r]>o&&(o=n[r])}return{value:n,domain:[a,o]}}function q(i,e,t){const n={};for(const o of i.sources||[]){const r=e[o];if(r)n[o]=je(r);else throw new Error(`Cannot find attribute ${o}`)}const a={};return o=>{for(const r in n)a[r]=n[r](o);return i.getValue(a,o,t)}}function je(i){const e=i.value,{offset:t=0,stride:n,size:a}=i.getAccessor(),o=e.BYTES_PER_ELEMENT,r=t/o,s=n?n/o:a;if(a===1)return i.isConstant?()=>e[0]:d=>{const u=r+s*d;return e[u]};let l;return i.isConstant?(l=Array.from(e),()=>l):(l=new Array(a),d=>{const u=r+s*d;for(let g=0;g<a;g++)l[g]=e[u+g];return l})}class qe{constructor(e){this.bins=[],this.binIds=null,this.results=[],this.dimensions=e.dimensions,this.channelCount=e.getValue.length,this.props={...e,binOptions:{},pointCount:0,operations:[],customOperations:[],attributes:{}},this.needsUpdate=!0,this.setProps(e)}destroy(){}get binCount(){return this.bins.length}setProps(e){const t=this.props;if(e.binOptions&&(U(e.binOptions,t.binOptions,2)||this.setNeedsUpdate()),e.operations)for(let n=0;n<this.channelCount;n++)e.operations[n]!==t.operations[n]&&this.setNeedsUpdate(n);if(e.customOperations)for(let n=0;n<this.channelCount;n++)!!e.customOperations[n]!=!!t.customOperations[n]&&this.setNeedsUpdate(n);e.pointCount!==void 0&&e.pointCount!==t.pointCount&&this.setNeedsUpdate(),e.attributes&&(e.attributes={...t.attributes,...e.attributes}),Object.assign(this.props,e)}setNeedsUpdate(e){e===void 0?this.needsUpdate=!0:this.needsUpdate!==!0&&(this.needsUpdate=this.needsUpdate||[],this.needsUpdate[e]=!0)}update(){if(this.needsUpdate===!0){this.bins=Ne({pointCount:this.props.pointCount,getBinId:q(this.props.getBin,this.props.attributes,this.props.binOptions)});const e=Ee({bins:this.bins,dimensions:this.dimensions,target:this.binIds?.value});this.binIds={value:e,type:"float32",size:this.dimensions}}for(let e=0;e<this.channelCount;e++)if(this.needsUpdate===!0||this.needsUpdate[e]){const t=this.props.customOperations[e]||ke[this.props.operations[e]],{value:n,domain:a}=Be({bins:this.bins,getValue:q(this.props.getValue[e],this.props.attributes,void 0),operation:t,target:this.results[e]?.value});this.results[e]={value:n,domain:a,type:"float32",size:1},this.props.onUpdate?.({channel:e})}this.needsUpdate=!1}preDraw(){}getBins(){return this.binIds}getResult(e){return this.results[e]}getResultDomain(e){return this.results[e]?.domain??[1/0,-1/0]}getBin(e){const t=this.bins[e];if(!t)return null;const n=new Array(this.channelCount);for(let a=0;a<n.length;a++){const o=this.results[a];n[a]=o?.value[e]}return{id:t.id,value:n,count:t.points.length,pointIndices:t.points}}}function Q(i,e,t){return i.createFramebuffer({width:e,height:t,colorAttachments:[i.createTexture({width:e,height:t,format:"rgba32float",sampler:{minFilter:"nearest",magFilter:"nearest"}})]})}const ze=`uniform binSorterUniforms {
  ivec4 binIdRange;
  ivec2 targetSize;
} binSorter;
`,He={name:"binSorter",vs:ze,uniformTypes:{binIdRange:"vec4<i32>",targetSize:"vec2<i32>"}},ee=[1,2,4,8],z=3e38,We={SUM:0,MEAN:0,MIN:0,MAX:0,COUNT:0},I=1024;class Ge{constructor(e,t){this.binsFBO=null,this.device=e,this.model=Xe(e,t)}get texture(){return this.binsFBO?this.binsFBO.colorAttachments[0].texture:null}destroy(){this.model.destroy(),this.binsFBO?.colorAttachments[0].texture.destroy(),this.binsFBO?.destroy()}getBinValues(e){if(!this.binsFBO)return null;const t=e%I,n=Math.floor(e/I),a=this.device.readPixelsToArrayWebGL(this.binsFBO,{sourceX:t,sourceY:n,sourceWidth:1,sourceHeight:1}).buffer;return new Float32Array(a)}setDimensions(e,t){const n=I,a=Math.ceil(e/n);this.binsFBO?this.binsFBO.height<a&&this.binsFBO.resize({width:n,height:a}):this.binsFBO=Q(this.device,n,a);const o={binIdRange:[t[0][0],t[0][1],t[1]?.[0]||0,t[1]?.[1]||0],targetSize:[this.binsFBO.width,this.binsFBO.height]};this.model.shaderInputs.setProps({binSorter:o})}setModelProps(e){const t=this.model;e.attributes&&t.setAttributes(e.attributes),e.constantAttributes&&t.setConstantAttributes(e.constantAttributes),e.vertexCount!==void 0&&t.setVertexCount(e.vertexCount),e.shaderModuleProps&&t.shaderInputs.setProps(e.shaderModuleProps)}update(e){if(!this.binsFBO)return;const t=$e(e);this._updateBins("SUM",t.SUM+t.MEAN),this._updateBins("MIN",t.MIN),this._updateBins("MAX",t.MAX)}_updateBins(e,t){if(t===0)return;t|=ee[3];const n=this.model,a=this.binsFBO,o=e==="MAX"?-z:e==="MIN"?z:0,r=this.device.beginRenderPass({id:`gpu-aggregation-${e}`,framebuffer:a,parameters:{viewport:[0,0,a.width,a.height],colorMask:t},clearColor:[o,o,o,0],clearDepth:!1,clearStencil:!1});n.setParameters({blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendColorOperation:e==="MAX"?"max":e==="MIN"?"min":"add",blendAlphaOperation:"add"}),n.draw(r),r.end()}}function $e(i){const e={...We};for(let t=0;t<i.length;t++){const n=i[t];n&&(e[n]+=ee[t])}return e}function Xe(i,e){let t=e.vs;e.dimensions===2&&(t+=`
void getBin(out int binId) {
  ivec2 binId2;
  getBin(binId2);
  if (binId2.x < binSorter.binIdRange.x || binId2.x >= binSorter.binIdRange.y) {
    binId = -1;
  } else {
    binId = (binId2.y - binSorter.binIdRange.z) * (binSorter.binIdRange.y - binSorter.binIdRange.x) + binId2.x;
  }
}
`);const n=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-vertex

${t}

out vec3 v_Value;

void main() {
  int binIndex;
  getBin(binIndex);
  binIndex = binIndex - binSorter.binIdRange.x;
  if (binIndex < 0) {
    gl_Position = vec4(0.);
    return;
  }
  int row = binIndex / binSorter.targetSize.x;
  int col = binIndex - row * binSorter.targetSize.x;
  vec2 position = (vec2(col, row) + 0.5) / vec2(binSorter.targetSize) * 2.0 - 1.0;
  gl_Position = vec4(position, 0.0, 1.0);
  gl_PointSize = 1.0;

#if NUM_CHANNELS == 3
  getValue(v_Value);
#elif NUM_CHANNELS == 2
  getValue(v_Value.xy);
#else
  getValue(v_Value.x);
#endif
}
`,a=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-fragment

precision highp float;

in vec3 v_Value;
out vec4 fragColor;

void main() {
  fragColor.xyz = v_Value;

  #ifdef MODULE_GEOMETRY
  geometry.uv = vec2(0.);
  DECKGL_FILTER_COLOR(fragColor, geometry);
  #endif

  fragColor.w = 1.0;
}
`;return new O(i,{bufferLayout:e.bufferLayout,modules:[...e.modules||[],He],defines:{...e.defines,NON_INSTANCED_MODEL:1,NUM_CHANNELS:e.channelCount},isInstanced:!1,vs:n,fs:a,topology:"point-list",disableWarnings:!0})}const Ye=`uniform aggregatorTransformUniforms {
  ivec4 binIdRange;
  bvec3 isCount;
  bvec3 isMean;
  float naN;
} aggregatorTransform;
`,Ke={name:"aggregatorTransform",vs:Ye,uniformTypes:{binIdRange:"vec4<i32>",isCount:"vec3<f32>",isMean:"vec3<f32>"}};class Ze{constructor(e,t){this.binBuffer=null,this.valueBuffer=null,this._domains=null,this.device=e,this.channelCount=t.channelCount,this.transform=Je(e,t),this.domainFBO=Q(e,2,1)}destroy(){this.transform.destroy(),this.binBuffer?.destroy(),this.valueBuffer?.destroy(),this.domainFBO.colorAttachments[0].texture.destroy(),this.domainFBO.destroy()}get domains(){if(!this._domains){const e=this.device.readPixelsToArrayWebGL(this.domainFBO).buffer,t=new Float32Array(e);this._domains=[[-t[4],t[0]],[-t[5],t[1]],[-t[6],t[2]]].slice(0,this.channelCount)}return this._domains}setDimensions(e,t){const{model:n,transformFeedback:a}=this.transform;n.setVertexCount(e);const o={binIdRange:[t[0][0],t[0][1],t[1]?.[0]||0,t[1]?.[1]||0]};n.shaderInputs.setProps({aggregatorTransform:o});const r=e*t.length*4;(!this.binBuffer||this.binBuffer.byteLength<r)&&(this.binBuffer?.destroy(),this.binBuffer=this.device.createBuffer({byteLength:r}),a.setBuffer("binIds",this.binBuffer));const s=e*this.channelCount*4;(!this.valueBuffer||this.valueBuffer.byteLength<s)&&(this.valueBuffer?.destroy(),this.valueBuffer=this.device.createBuffer({byteLength:s}),a.setBuffer("values",this.valueBuffer))}update(e,t){if(!e)return;const n=this.transform,a=this.domainFBO,o=[0,1,2].map(l=>t[l]==="COUNT"?1:0),r=[0,1,2].map(l=>t[l]==="MEAN"?1:0),s={isCount:o,isMean:r,bins:e};n.model.shaderInputs.setProps({aggregatorTransform:s}),n.run({id:"gpu-aggregation-domain",framebuffer:a,parameters:{viewport:[0,0,2,1]},clearColor:[-3e38,-3e38,-3e38,0],clearDepth:!1,clearStencil:!1}),this._domains=null}}function Je(i,e){const t=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-vertex

uniform sampler2D bins;

#if NUM_DIMS == 1
out float binIds;
#else
out vec2 binIds;
#endif

#if NUM_CHANNELS == 1
flat out float values;
#elif NUM_CHANNELS == 2
flat out vec2 values;
#else
flat out vec3 values;
#endif

const float NAN = intBitsToFloat(-1);

void main() {
  int row = gl_VertexID / SAMPLER_WIDTH;
  int col = gl_VertexID - row * SAMPLER_WIDTH;
  vec4 weights = texelFetch(bins, ivec2(col, row), 0);
  vec3 value3 = mix(
    mix(weights.rgb, vec3(weights.a), aggregatorTransform.isCount),
    weights.rgb / max(weights.a, 1.0),
    aggregatorTransform.isMean
  );
  if (weights.a == 0.0) {
    value3 = vec3(NAN);
  }

#if NUM_DIMS == 1
  binIds = float(gl_VertexID + aggregatorTransform.binIdRange.x);
#else
  int y = gl_VertexID / (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  int x = gl_VertexID - y * (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  binIds.y = float(y + aggregatorTransform.binIdRange.z);
  binIds.x = float(x + aggregatorTransform.binIdRange.x);
#endif

#if NUM_CHANNELS == 3
  values = value3;
#elif NUM_CHANNELS == 2
  values = value3.xy;
#else
  values = value3.x;
#endif

  gl_Position = vec4(0., 0., 0., 1.);
  // This model renders into a 2x1 texture to obtain min and max simultaneously.
  // See comments in fragment shader
  gl_PointSize = 2.0;
}
`,n=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-fragment

precision highp float;

#if NUM_CHANNELS == 1
flat in float values;
#elif NUM_CHANNELS == 2
flat in vec2 values;
#else
flat in vec3 values;
#endif

out vec4 fragColor;

void main() {
  vec3 value3;
#if NUM_CHANNELS == 3
  value3 = values;
#elif NUM_CHANNELS == 2
  value3.xy = values;
#else
  value3.x = values;
#endif
  if (isnan(value3.x)) discard;
  // This shader renders into a 2x1 texture with blending=max
  // The left pixel yields the max value of each channel
  // The right pixel yields the min value of each channel
  if (gl_FragCoord.x < 1.0) {
    fragColor = vec4(value3, 1.0);
  } else {
    fragColor = vec4(-value3, 1.0);
  }
}
`;return new de(i,{vs:t,fs:n,topology:"point-list",modules:[Ke],parameters:{blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendColorOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendAlphaOperation:"max"},defines:{NUM_DIMS:e.dimensions,NUM_CHANNELS:e.channelCount,SAMPLER_WIDTH:I},varyings:["binIds","values"],disableWarnings:!0})}class H{static isSupported(e){return e.features.has("float32-renderable-webgl")&&e.features.has("texture-blend-float-webgl")}constructor(e,t){this.binCount=0,this.binIds=null,this.results=[],this.device=e,this.dimensions=t.dimensions,this.channelCount=t.channelCount,this.props={...t,pointCount:0,binIdRange:[[0,0]],operations:[],attributes:{},binOptions:{}},this.needsUpdate=new Array(this.channelCount).fill(!0),this.binSorter=new Ge(e,t),this.aggregationTransform=new Ze(e,t),this.setProps(t)}getBins(){const e=this.aggregationTransform.binBuffer;return e?(this.binIds?.buffer!==e&&(this.binIds={buffer:e,type:"float32",size:this.dimensions}),this.binIds):null}getResult(e){const t=this.aggregationTransform.valueBuffer;return!t||e>=this.channelCount?null:(this.results[e]?.buffer!==t&&(this.results[e]={buffer:t,type:"float32",size:1,stride:this.channelCount*4,offset:e*4}),this.results[e])}getResultDomain(e){return this.aggregationTransform.domains[e]}getBin(e){if(e<0||e>=this.binCount)return null;const{binIdRange:t}=this.props;let n;if(this.dimensions===1)n=[e+t[0][0]];else{const[[s,l],[d]]=t,u=l-s;n=[e%u+s,Math.floor(e/u)+d]}const a=this.binSorter.getBinValues(e);if(!a)return null;const o=a[3],r=[];for(let s=0;s<this.channelCount;s++){const l=this.props.operations[s];l==="COUNT"?r[s]=o:o===0?r[s]=NaN:r[s]=l==="MEAN"?a[s]/o:a[s]}return{id:n,value:r,count:o}}destroy(){this.binSorter.destroy(),this.aggregationTransform.destroy()}setProps(e){const t=this.props;if("binIdRange"in e&&!U(e.binIdRange,t.binIdRange,2)){const n=e.binIdRange;if(R.assert(n.length===this.dimensions),this.dimensions===1){const[[a,o]]=n;this.binCount=o-a}else{const[[a,o],[r,s]]=n;this.binCount=(o-a)*(s-r)}this.binSorter.setDimensions(this.binCount,n),this.aggregationTransform.setDimensions(this.binCount,n),this.setNeedsUpdate()}if(e.operations)for(let n=0;n<this.channelCount;n++)e.operations[n]!==t.operations[n]&&this.setNeedsUpdate(n);if(e.pointCount!==void 0&&e.pointCount!==t.pointCount&&(this.binSorter.setModelProps({vertexCount:e.pointCount}),this.setNeedsUpdate()),e.binOptions&&(U(e.binOptions,t.binOptions,2)||this.setNeedsUpdate(),this.binSorter.model.shaderInputs.setProps({binOptions:e.binOptions})),e.attributes){const n={},a={};for(const o of Object.values(e.attributes))for(const[r,s]of Object.entries(o.getValue()))ArrayBuffer.isView(s)?a[r]=s:s&&(n[r]=s);this.binSorter.setModelProps({attributes:n,constantAttributes:a})}e.shaderModuleProps&&this.binSorter.setModelProps({shaderModuleProps:e.shaderModuleProps}),Object.assign(this.props,e)}setNeedsUpdate(e){e===void 0?this.needsUpdate.fill(!0):this.needsUpdate[e]=!0}update(){}preDraw(){if(!this.needsUpdate.some(Boolean))return;const{operations:e}=this.props,t=this.needsUpdate.map((n,a)=>n?e[a]:null);this.binSorter.update(t),this.aggregationTransform.update(this.binSorter.texture,e);for(let n=0;n<this.channelCount;n++)this.needsUpdate[n]&&(this.needsUpdate[n]=!1,this.props.onUpdate?.({channel:n}))}}class te extends Ce{get isDrawable(){return!0}initializeState(){this.getAttributeManager().remove(["instancePickingColors"])}updateState(e){super.updateState(e);const t=this.getAggregatorType();if(e.changeFlags.extensionsChanged||this.state.aggregatorType!==t){this.state.aggregator?.destroy();const n=this.createAggregator(t);return n.setProps({attributes:this.getAttributeManager()?.attributes}),this.setState({aggregator:n,aggregatorType:t}),!0}return!1}finalizeState(e){super.finalizeState(e),this.state.aggregator.destroy()}updateAttributes(e){const{aggregator:t}=this.state;t.setProps({attributes:e});for(const n in e)this.onAttributeChange(n);t.update()}draw({shaderModuleProps:e}){const{aggregator:t}=this.state;t.setProps({shaderModuleProps:e}),t.preDraw()}_getAttributeManager(){return new ce(this.context.device,{id:this.props.id,stats:this.context.stats})}}te.layerName="AggregationLayer";const Qe=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function et(i,e=!1,t=Float32Array){let n;if(Number.isFinite(i[0]))n=new t(i);else{n=new t(i.length*4);let a=0;for(let o=0;o<i.length;o++){const r=i[o];n[a++]=r[0],n[a++]=r[1],n[a++]=r[2],n[a++]=Number.isFinite(r[3])?r[3]:255}}if(e)for(let a=0;a<n.length;a++)n[a]/=255;return n}const T={linear:"linear",quantile:"nearest",quantize:"nearest",ordinal:"nearest"};function tt(i,e){i.setSampler({minFilter:T[e],magFilter:T[e]})}function nt(i,e,t="linear"){const n=et(e,!1,Uint8Array);return i.createTexture({format:"rgba8unorm",sampler:{minFilter:T[t],magFilter:T[t],addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},data:n,width:n.length/4,height:1})}class W{constructor(e,t){this.props={scaleType:"linear",lowerPercentile:0,upperPercentile:100},this.domain=null,this.cutoff=null,this.input=e,this.inputLength=t,this.attribute=e}getScalePercentile(){if(!this._percentile){const e=G(this.input,this.inputLength);this._percentile=it(e)}return this._percentile}getScaleOrdinal(){if(!this._ordinal){const e=G(this.input,this.inputLength);this._ordinal=at(e)}return this._ordinal}getCutoff({scaleType:e,lowerPercentile:t,upperPercentile:n}){if(e==="quantile")return[t,n-1];if(t>0||n<100){const{domain:a}=this.getScalePercentile();let o=a[Math.floor(t)-1]??-1/0,r=a[Math.floor(n)-1]??1/0;if(e==="ordinal"){const{domain:s}=this.getScaleOrdinal();o=s.findIndex(l=>l>=o),r=s.findIndex(l=>l>r)-1,r===-2&&(r=s.length-1)}return[o,r]}return null}update(e){const t=this.props;if(e.scaleType!==t.scaleType)switch(e.scaleType){case"quantile":{const{attribute:n}=this.getScalePercentile();this.attribute=n,this.domain=[0,99];break}case"ordinal":{const{attribute:n,domain:a}=this.getScaleOrdinal();this.attribute=n,this.domain=[0,a.length-1];break}default:this.attribute=this.input,this.domain=null}return(e.scaleType!==t.scaleType||e.lowerPercentile!==t.lowerPercentile||e.upperPercentile!==t.upperPercentile)&&(this.cutoff=this.getCutoff(e)),this.props=e,this}}function at(i){const e=new Set;for(const a of i)Number.isFinite(a)&&e.add(a);const t=Array.from(e).sort(),n=new Map;for(let a=0;a<t.length;a++)n.set(t[a],a);return{attribute:{value:i.map(a=>Number.isFinite(a)?n.get(a):NaN),type:"float32",size:1},domain:t}}function it(i,e=100){const t=Array.from(i).filter(Number.isFinite).sort(ot);let n=0;const a=Math.max(1,e),o=new Array(a-1);for(;++n<a;)o[n-1]=rt(t,n/a);return{attribute:{value:i.map(r=>Number.isFinite(r)?st(o,r):NaN),type:"float32",size:1},domain:o}}function G(i,e){const t=(i.stride??4)/4,n=(i.offset??0)/4;let a=i.value;if(!a){const r=i.buffer?.readSyncWebGL(0,t*4*e);r&&(a=new Float32Array(r.buffer),i.value=a)}if(t===1)return a.subarray(0,e);const o=new Float32Array(e);for(let r=0;r<e;r++)o[r]=a[r*t+n];return o}function ot(i,e){return i-e}function rt(i,e){const t=i.length;if(e<=0||t<2)return i[0];if(e>=1)return i[t-1];const n=(t-1)*e,a=Math.floor(n),o=i[a],r=i[a+1];return o+(r-o)*(n-a)}function st(i,e){let t=0,n=i.length;for(;t<n;){const a=t+n>>>1;i[a]>e?n=a:t=a+1}return t}function lt({dataBounds:i,getBinId:e,padding:t=0}){const n=[i[0],i[1],[i[0][0],i[1][1]],[i[1][0],i[0][1]]].map(l=>e(l)),a=Math.min(...n.map(l=>l[0]))-t,o=Math.min(...n.map(l=>l[1]))-t,r=Math.max(...n.map(l=>l[0]))+t+1,s=Math.max(...n.map(l=>l[1]))+t+1;return[[a,r],[o,s]]}const ne=Math.PI/3,_=2*Math.sin(ne),D=1.5,ut=Array.from({length:6},(i,e)=>{const t=e*ne;return[Math.sin(t),-Math.cos(t)]});function E([i,e],t){let n=Math.round(e=e/t/D),a=Math.round(i=i/t/_-(n&1)/2);const o=e-n;if(Math.abs(o)*3>1){const r=i-a,s=a+(i<a?-1:1)/2,l=n+(e<n?-1:1),d=i-s,u=e-l;r*r+o*o>d*d+u*u&&(a=s+(n&1?1:-1)/2,n=l)}return[a,n]}const dt=`
const vec2 DIST = vec2(${_}, ${D});

ivec2 pointToHexbin(vec2 p, float radius) {
  p /= radius * DIST;
  float pj = round(p.y);
  float pjm2 = mod(pj, 2.0);
  p.x -= pjm2 * 0.5;
  float pi = round(p.x);
  vec2 d1 = p - vec2(pi, pj);

  if (abs(d1.y) * 3. > 1.) {
    vec2 v2 = step(0.0, d1) - 0.5;
    v2.y *= 2.0;
    vec2 d2 = d1 - v2;
    if (dot(d1, d1) > dot(d2, d2)) {
      pi += v2.x + pjm2 - 0.5;
      pj += v2.y;
    }
  }
  return ivec2(pi, pj);
}
`;function $([i,e],t){return[(i+(e&1)/2)*t*_,e*t*D]}const ct=`
const vec2 DIST = vec2(${_}, ${D});

vec2 hexbinCentroid(vec2 binId, float radius) {
  binId.x += fract(binId.y * 0.5);
  return binId * DIST * radius;
}
`,ft=`#version 300 es
#define SHADER_NAME hexagon-cell-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec2 instancePositions;
in float instanceElevationValues;
in float instanceColorValues;
in vec3 instancePickingColors;
uniform sampler2D colorRange;
out vec4 vColor;
${ct}
float interp(float value, vec2 domain, vec2 range) {
float r = min(max((value - domain.x) / (domain.y - domain.x), 0.), 1.);
return mix(range.x, range.y, r);
}
vec4 interp(float value, vec2 domain, sampler2D range) {
float r = (value - domain.x) / (domain.y - domain.x);
return texture(range, vec2(r, 0.5));
}
void main(void) {
geometry.pickingColor = instancePickingColors;
if (isnan(instanceColorValues) ||
instanceColorValues < hexagon.colorDomain.z ||
instanceColorValues > hexagon.colorDomain.w ||
instanceElevationValues < hexagon.elevationDomain.z ||
instanceElevationValues > hexagon.elevationDomain.w
) {
gl_Position = vec4(0.);
return;
}
vec2 commonPosition = hexbinCentroid(instancePositions, column.radius) + (hexagon.originCommon - project.commonOrigin.xy);
commonPosition += positions.xy * column.radius * column.coverage;
geometry.position = vec4(commonPosition, 0.0, 1.0);
geometry.normal = project_normal(normals);
float elevation = 0.0;
if (column.extruded) {
elevation = interp(instanceElevationValues, hexagon.elevationDomain.xy, hexagon.elevationRange);
elevation = project_size(elevation);
geometry.position.z = (positions.z + 1.0) / 2.0 * elevation;
}
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vColor = interp(instanceColorValues, hexagon.colorDomain.xy, colorRange);
vColor.a *= layer.opacity;
if (column.extruded) {
vColor.rgb = lighting_getLightColor(vColor.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,gt=`uniform hexagonUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
} hexagon;
`,mt={name:"hexagon",vs:gt,uniformTypes:{colorDomain:"vec4<f32>",elevationDomain:"vec4<f32>",elevationRange:"vec2<f32>",originCommon:"vec2<f32>"}};class ae extends F{getShaders(){const e=super.getShaders();return e.modules.push(mt),{...e,vs:ft}}initializeState(){super.initializeState();const e=this.getAttributeManager();e.remove(["instanceElevations","instanceFillColors","instanceLineColors","instanceStrokeWidths"]),e.addInstanced({instancePositions:{size:2,type:"float32",accessor:"getBin"},instanceColorValues:{size:1,type:"float32",accessor:"getColorValue"},instanceElevationValues:{size:1,type:"float32",accessor:"getElevationValue"}})}updateState(e){super.updateState(e);const{props:t,oldProps:n}=e,a=this.state.fillModel;if(n.colorRange!==t.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=nt(this.context.device,t.colorRange,t.colorScaleType);const o={colorRange:this.state.colorTexture};a.shaderInputs.setProps({hexagon:o})}else n.colorScaleType!==t.colorScaleType&&tt(this.state.colorTexture,t.colorScaleType)}finalizeState(e){super.finalizeState(e),this.state.colorTexture?.destroy()}draw({uniforms:e}){const{radius:t,hexOriginCommon:n,elevationRange:a,elevationScale:o,extruded:r,coverage:s,colorDomain:l,elevationDomain:d}=this.props,u=this.props.colorCutoff||[-1/0,1/0],g=this.props.elevationCutoff||[-1/0,1/0],c=this.state.fillModel;c.vertexArray.indexBuffer&&c.setIndexBuffer(null),c.setVertexCount(this.state.fillVertexCount);const f={colorDomain:[Math.max(l[0],u[0]),Math.min(l[1],u[1]),Math.max(l[0]-1,u[0]),Math.min(l[1]+1,u[1])],elevationDomain:[Math.max(d[0],g[0]),Math.min(d[1],g[1]),Math.max(d[0]-1,g[0]),Math.min(d[1]+1,g[1])],elevationRange:[a[0]*o,a[1]*o],originCommon:n};c.shaderInputs.setProps({column:{extruded:r,coverage:s,radius:t},hexagon:f}),c.draw(this.context.renderPass)}}ae.layerName="HexagonCellLayer";const pt=`uniform binOptionsUniforms {
  vec2 hexOriginCommon;
  float radiusCommon;
} binOptions;
`,ht={name:"binOptions",vs:pt,uniformTypes:{hexOriginCommon:"vec2<f32>",radiusCommon:"f32"}};function X(){}const vt={gpuAggregation:!0,colorDomain:null,colorRange:Qe,getColorValue:{type:"accessor",value:null},getColorWeight:{type:"accessor",value:1},colorAggregation:"SUM",lowerPercentile:{type:"number",min:0,max:100,value:0},upperPercentile:{type:"number",min:0,max:100,value:100},colorScaleType:"quantize",onSetColorDomain:X,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:"accessor",value:null},getElevationWeight:{type:"accessor",value:1},elevationAggregation:"SUM",elevationScale:{type:"number",min:0,value:1},elevationLowerPercentile:{type:"number",min:0,max:100,value:0},elevationUpperPercentile:{type:"number",min:0,max:100,value:100},elevationScaleType:"linear",onSetElevationDomain:X,radius:{type:"number",min:1,value:1e3},coverage:{type:"number",min:0,max:1,value:1},getPosition:{type:"accessor",value:i=>i.position},hexagonAggregator:{type:"function",optional:!0,value:null},extruded:!1,material:!0};class S extends te{getAggregatorType(){const{gpuAggregation:e,hexagonAggregator:t,getColorValue:n,getElevationValue:a}=this.props;return e&&(t||n||a)?(R.warn("Features not supported by GPU aggregation, falling back to CPU")(),"cpu"):e&&H.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(e){if(e==="cpu"){const{hexagonAggregator:t,radius:n}=this.props;return new qe({dimensions:2,getBin:{sources:["positions"],getValue:({positions:a},o,r)=>{if(t)return t(a,n);const l=this.state.aggregatorViewport.projectPosition(a),{radiusCommon:d,hexOriginCommon:u}=r;return E([l[0]-u[0],l[1]-u[1]],d)}},getValue:[{sources:["colorWeights"],getValue:({colorWeights:a})=>a},{sources:["elevationWeights"],getValue:({elevationWeights:a})=>a}]})}return new H(this.context.device,{dimensions:2,channelCount:2,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1}),...super.getShaders({modules:[Y,ht],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float colorWeights;
  in float elevationWeights;
  
  ${dt}

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    binId = pointToHexbin(positionCommon.xy, binOptions.radiusCommon);
  }
  void getValue(out vec2 value) {
    value = vec2(colorWeights, elevationWeights);
  }
  `})})}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},colorWeights:{size:1,accessor:"getColorWeight"},elevationWeights:{size:1,accessor:"getElevationWeight"}})}updateState(e){const t=super.updateState(e),{props:n,oldProps:a,changeFlags:o}=e,{aggregator:r}=this.state;if((o.dataChanged||!this.state.dataAsArray)&&(n.getColorValue||n.getElevationValue)&&(this.state.dataAsArray=Array.from(fe(n.data).iterable)),t||o.dataChanged||n.radius!==a.radius||n.getColorValue!==a.getColorValue||n.getElevationValue!==a.getElevationValue||n.colorAggregation!==a.colorAggregation||n.elevationAggregation!==a.elevationAggregation){this._updateBinOptions();const{radiusCommon:s,hexOriginCommon:l,binIdRange:d,dataAsArray:u}=this.state;if(r.setProps({binIdRange:d,pointCount:this.getNumInstances(),operations:[n.colorAggregation,n.elevationAggregation],binOptions:{radiusCommon:s,hexOriginCommon:l},onUpdate:this._onAggregationUpdate.bind(this)}),u){const{getColorValue:g,getElevationValue:c}=this.props;r.setProps({customOperations:[g&&(f=>g(f.map(m=>u[m]),{indices:f,data:n.data})),c&&(f=>c(f.map(m=>u[m]),{indices:f,data:n.data}))]})}}return o.updateTriggersChanged&&o.updateTriggersChanged.getColorValue&&r.setNeedsUpdate(0),o.updateTriggersChanged&&o.updateTriggersChanged.getElevationValue&&r.setNeedsUpdate(1),t}_updateBinOptions(){const e=this.getBounds();let t=1,n=[0,0],a=[[0,1],[0,1]],o=this.context.viewport;if(e&&Number.isFinite(e[0][0])){let r=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2];const{radius:s}=this.props,{unitsPerMeter:l}=o.getDistanceScales(r);t=l[0]*s;const d=E(o.projectFlat(r),t);r=o.unprojectFlat($(d,t));const u=o.constructor;o=o.isGeospatial?new u({longitude:r[0],latitude:r[1],zoom:12}):new ge({position:[r[0],r[1],0],zoom:12}),n=[Math.fround(o.center[0]),Math.fround(o.center[1])],a=lt({dataBounds:e,getBinId:g=>{const c=o.projectFlat(g);return c[0]-=n[0],c[1]-=n[1],E(c,t)},padding:1})}this.setState({radiusCommon:t,hexOriginCommon:n,binIdRange:a,aggregatorViewport:o})}draw(e){e.shaderModuleProps.project&&(e.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(e)}_onAggregationUpdate({channel:e}){const t=this.getCurrentLayer().props,{aggregator:n}=this.state;if(e===0){const a=n.getResult(0);this.setState({colors:new W(a,n.binCount)}),t.onSetColorDomain(n.getResultDomain(0))}else if(e===1){const a=n.getResult(1);this.setState({elevations:new W(a,n.binCount)}),t.onSetElevationDomain(n.getResultDomain(1))}}onAttributeChange(e){const{aggregator:t}=this.state;switch(e){case"positions":t.setNeedsUpdate(),this._updateBinOptions();const{radiusCommon:n,hexOriginCommon:a,binIdRange:o}=this.state;t.setProps({binIdRange:o,binOptions:{radiusCommon:n,hexOriginCommon:a}});break;case"colorWeights":t.setNeedsUpdate(0);break;case"elevationWeights":t.setNeedsUpdate(1);break}}renderLayers(){const{aggregator:e,radiusCommon:t,hexOriginCommon:n}=this.state,{elevationScale:a,colorRange:o,elevationRange:r,extruded:s,coverage:l,material:d,transitions:u,colorScaleType:g,lowerPercentile:c,upperPercentile:f,colorDomain:m,elevationScaleType:h,elevationLowerPercentile:p,elevationUpperPercentile:y,elevationDomain:v}=this.props,N=this.getSubLayerClass("cells",ae),b=e.getBins(),w=this.state.colors?.update({scaleType:g,lowerPercentile:c,upperPercentile:f}),M=this.state.elevations?.update({scaleType:h,lowerPercentile:p,upperPercentile:y});return!w||!M?null:new N(this.getSubLayerProps({id:"cells"}),{data:{length:e.binCount,attributes:{getBin:b,getColorValue:w.attribute,getElevationValue:M.attribute}},dataComparator:(oe,re)=>oe.length===re.length,updateTriggers:{getBin:[b],getColorValue:[w.attribute],getElevationValue:[M.attribute]},diskResolution:6,vertices:ut,radius:t,hexOriginCommon:n,elevationScale:a,colorRange:o,colorScaleType:g,elevationRange:r,extruded:s,coverage:l,material:d,colorDomain:w.domain||m||e.getResultDomain(0),elevationDomain:M.domain||v||e.getResultDomain(1),colorCutoff:w.cutoff,elevationCutoff:M.cutoff,transitions:u&&{getFillColor:u.getColorValue||u.getColorWeight,getElevation:u.getElevationValue||u.getElevationWeight},extensions:[]})}getPickingInfo(e){const t=e.info,{index:n}=t;if(n>=0){const a=this.state.aggregator.getBin(n);let o;if(a){const r=$(a.id,this.state.radiusCommon),s=this.context.viewport.unprojectFlat(r);o={col:a.id[0],row:a.id[1],position:s,colorValue:a.value[0],elevationValue:a.value[1],count:a.count},a.pointIndices&&(o.pointIndices=a.pointIndices,o.points=Array.isArray(this.props.data)?a.pointIndices.map(l=>this.props.data[l]):[])}t.object=o}return t}}S.layerName="HexagonLayer";S.defaultProps=vt;const yt={type:S,layerOpacity:.8,elevationRange:[30,75],elevationScale:1,extruded:!0,coverage:.9,autoHighlight:!1,material:{ambient:.6,diffuse:.5,shininess:10},radius:16,transitions:{elevationScale:1500},_filterData:null,colorRange:[[1,152,189,125],[73,227,206,150],[216,254,181,175],[254,237,177,200],[254,173,84,225],[209,55,78,255]]},V=i=>{const e=me();i={...yt,...i};const{mapId:t,...n}=i,a=K({mapId:t,waitForLayer:n.beforeId}),o=P.useMemo(()=>n.data?new S({...n}):null,[n.beforeId,n.data,n.elevationScale,n.extruded,n.coverage,n.autoHighlight,n.material,n.radius,n.transitions]);return P.useEffect(()=>{if(!(!a.map||!o))return e.addLayer(o),()=>{e.removeLayer(o)}},[a.map,o]),A.jsx(A.Fragment,{})};try{V.displayName="MlHexagonLayer",V.__docgenInfo={description:"",displayName:"MlHexagonLayer",props:{mapId:{defaultValue:null,description:"Id of the target MapLibre instance in mapContext",name:"mapId",required:!1,type:{name:"string | undefined"}},beforeId:{defaultValue:null,description:`Id of an existing layer in the mapLibre instance to help specify the layer order
This layer will be visually beneath the layer with the "beforeId" id.`,name:"beforeId",required:!1,type:{name:"string | undefined"}},radius:{defaultValue:{value:"1000"},description:"Radius of hexagon bin in meters. The hexagons are pointy-topped (rather than flat-topped).",name:"radius",required:!1,type:{name:"number | undefined"}},hexagonAggregator:{defaultValue:{value:"null"},description:`Custom accessor to retrieve a hexagonal bin index from each data object.
Not supported by GPU aggregation.`,name:"hexagonAggregator",required:!1,type:{name:"((position: number[], radius: number) => [number, number]) | null | undefined"}},colorDomain:{defaultValue:{value:"[min(colorWeight), max(colorWeight)]"},description:"Color scale domain, default is set to the extent of aggregated weights in each cell.",name:"colorDomain",required:!1,type:{name:"[number, number] | null | undefined"}},colorRange:{defaultValue:null,description:"Default: [colorbrewer](http://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6) `6-class YlOrRd`",name:"colorRange",required:!1,type:{name:"Color[] | undefined"}},coverage:{defaultValue:{value:"1"},description:"Cell size multiplier, clamped between 0 - 1.",name:"coverage",required:!1,type:{name:"number | undefined"}},elevationDomain:{defaultValue:{value:"[0, max(elevationWeight)]"},description:"Elevation scale input domain, default is set to between 0 and the max of aggregated weights in each cell.",name:"elevationDomain",required:!1,type:{name:"[number, number] | null | undefined"}},elevationRange:{defaultValue:{value:"[0, 1000]"},description:"Elevation scale output range.",name:"elevationRange",required:!1,type:{name:"[number, number] | undefined"}},elevationScale:{defaultValue:{value:"1"},description:"Cell elevation multiplier.",name:"elevationScale",required:!1,type:{name:"number | undefined"}},extruded:{defaultValue:{value:"true"},description:"Whether to enable cell elevation. If set to false, all cell will be flat.",name:"extruded",required:!1,type:{name:"boolean | undefined"}},upperPercentile:{defaultValue:{value:"100"},description:"Filter cells and re-calculate color by `upperPercentile`.\nCells with value larger than the upperPercentile will be hidden.",name:"upperPercentile",required:!1,type:{name:"number | undefined"}},lowerPercentile:{defaultValue:{value:"0"},description:"Filter cells and re-calculate color by `lowerPercentile`.\nCells with value smaller than the lowerPercentile will be hidden.",name:"lowerPercentile",required:!1,type:{name:"number | undefined"}},elevationUpperPercentile:{defaultValue:{value:"100"},description:"Filter cells and re-calculate elevation by `elevationUpperPercentile`.\nCells with elevation value larger than the `elevationUpperPercentile` will be hidden.",name:"elevationUpperPercentile",required:!1,type:{name:"number | undefined"}},elevationLowerPercentile:{defaultValue:{value:"0"},description:"Filter cells and re-calculate elevation by `elevationLowerPercentile`.\nCells with elevation value larger than the `elevationLowerPercentile` will be hidden.",name:"elevationLowerPercentile",required:!1,type:{name:"number | undefined"}},colorScaleType:{defaultValue:{value:"'quantize'"},description:`Scaling function used to determine the color of the grid cell, default value is 'quantize'.
Supported Values are 'quantize', 'linear', 'quantile' and 'ordinal'.`,name:"colorScaleType",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"quantize"'},{value:'"linear"'},{value:'"quantile"'},{value:'"ordinal"'}]}},elevationScaleType:{defaultValue:{value:"'linear'"},description:`Scaling function used to determine the elevation of the grid cell, only supports 'linear'.
Supported Values are 'linear' and 'quantile'.`,name:"elevationScaleType",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"linear"'}]}},material:{defaultValue:{value:"true"},description:"Material settings for lighting effect. Applies if `extruded: true`.\n@see https://deck.gl/docs/developer-guide/using-lighting",name:"material",required:!1,type:{name:"boolean | { ambient?: number | undefined; diffuse?: number | undefined; shininess?: number | undefined; specularColor?: [number, number, number] | undefined; } | undefined"}},colorAggregation:{defaultValue:{value:"'SUM'"},description:`Defines the operation used to aggregate all data object weights to calculate a cell's color value.
Valid values are 'SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'.`,name:"colorAggregation",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"SUM"'},{value:'"MEAN"'},{value:'"MIN"'},{value:'"MAX"'},{value:'"COUNT"'}]}},elevationAggregation:{defaultValue:{value:"'SUM'"},description:`Defines the operation used to aggregate all data object weights to calculate a cell's elevation value.
Valid values are 'SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'.`,name:"elevationAggregation",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"SUM"'},{value:'"MEAN"'},{value:'"MIN"'},{value:'"MAX"'},{value:'"COUNT"'}]}},getPosition:{defaultValue:{value:"object => object.position"},description:"Method called to retrieve the position of each object.",name:"getPosition",required:!1,type:{name:"Accessor<unknown, Position> | undefined"}},getColorWeight:{defaultValue:{value:"1"},description:"The weight of a data object used to calculate the color value for a cell.",name:"getColorWeight",required:!1,type:{name:"Accessor<unknown, number> | undefined"}},getColorValue:{defaultValue:{value:"null"},description:`After data objects are aggregated into cells, this accessor is called on each cell to get the value that its color is based on.
Not supported by GPU aggregation.`,name:"getColorValue",required:!1,type:{name:"AggregateAccessor<unknown> | null | undefined"}},getElevationWeight:{defaultValue:{value:"1"},description:"The weight of a data object used to calculate the elevation value for a cell.",name:"getElevationWeight",required:!1,type:{name:"Accessor<unknown, number> | undefined"}},getElevationValue:{defaultValue:{value:"null"},description:`After data objects are aggregated into cells, this accessor is called on each cell to get the value that its elevation is based on.
Not supported by GPU aggregation.`,name:"getElevationValue",required:!1,type:{name:"AggregateAccessor<unknown> | null | undefined"}},onSetColorDomain:{defaultValue:{value:"() => {}"},description:"This callback will be called when bin color domain has been calculated.",name:"onSetColorDomain",required:!1,type:{name:"((minMax: [number, number]) => void) | undefined"}},onSetElevationDomain:{defaultValue:{value:"() => {}"},description:"This callback will be called when bin elevation domain has been calculated.",name:"onSetElevationDomain",required:!1,type:{name:"((minMax: [number, number]) => void) | undefined"}},gpuAggregation:{defaultValue:{value:"true"},description:"When set to true, aggregation is performed on GPU, provided other conditions are met.",name:"gpuAggregation",required:!1,type:{name:"boolean | undefined"}},id:{defaultValue:null,description:"Unique identifier of the layer.",name:"id",required:!0,type:{name:"string"}},data:{defaultValue:null,description:"The data to visualize.",name:"data",required:!1,type:{name:"unknown"}},dataComparator:{defaultValue:null,description:"Callback to determine if two data values are equal.",name:"dataComparator",required:!1,type:{name:"(<LayerDataT = LayerData<unknown>>(newData: LayerDataT, oldData?: LayerDataT | undefined) => boolean) | null | undefined"}},_dataDiff:{defaultValue:null,description:"Callback to determine the difference between two data values, in order to perform a partial update.",name:"_dataDiff",required:!1,type:{name:"(<LayerDataT = LayerData<unknown>>(newData: LayerDataT, oldData?: LayerDataT | undefined) => { startRow: number; endRow?: number | undefined; }[]) | null | undefined"}},dataTransform:{defaultValue:null,description:"Callback to manipulate remote data when it's fetched and parsed.",name:"dataTransform",required:!1,type:{name:"(<LayerDataT = LayerData<unknown>>(data: unknown, previousData?: LayerDataT | undefined) => LayerDataT) | null | undefined"}},fetch:{defaultValue:null,description:"Custom implementation to fetch and parse content from URLs.",name:"fetch",required:!1,type:{name:"((url: string, context: { propName: string; layer: Layer<{}>; loaders?: Loader[] | undefined; loadOptions?: any; signal?: AbortSignal | undefined; }) => any) | undefined"}},updateTriggers:{defaultValue:null,description:"The dependencies used to trigger re-evaluation of functional accessors (get*).",name:"updateTriggers",required:!1,type:{name:"Record<string, any> | undefined"}},operation:{defaultValue:null,description:"Rendering operation of the layer. `+` separated list of names.",name:"operation",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"draw"'},{value:'"mask"'},{value:'"terrain"'},{value:'"draw+draw"'},{value:'"draw+mask"'},{value:'"draw+terrain"'},{value:'"mask+draw"'},{value:'"mask+mask"'},{value:'"mask+terrain"'},{value:'"terrain+draw"'},{value:'"terrain+mask"'},{value:'"terrain+terrain"'}]}},visible:{defaultValue:null,description:"If the layer should be rendered. Default true.",name:"visible",required:!1,type:{name:"boolean | undefined"}},pickable:{defaultValue:null,description:"If the layer can be picked on pointer events. Default false.",name:"pickable",required:!1,type:{name:"boolean | undefined"}},opacity:{defaultValue:null,description:"Opacity of the layer, between 0 and 1. Default 1.",name:"opacity",required:!1,type:{name:"number | undefined"}},coordinateSystem:{defaultValue:null,description:"The coordinate system of the data. Default to COORDINATE_SYSTEM.LNGLAT in a geospatial view or COORDINATE_SYSTEM.CARTESIAN in a non-geospatial view.",name:"coordinateSystem",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:"0"},{value:"3"},{value:"1"},{value:"-1"},{value:"2"}]}},coordinateOrigin:{defaultValue:null,description:"The coordinate origin of the data.",name:"coordinateOrigin",required:!1,type:{name:"[number, number, number] | undefined"}},modelMatrix:{defaultValue:null,description:"A 4x4 matrix to transform local coordianates to the world space.",name:"modelMatrix",required:!1,type:{name:"Matrix4Like | null | undefined"}},wrapLongitude:{defaultValue:null,description:"(Geospatial only) normalize geometries that cross the 180th meridian. Default false.",name:"wrapLongitude",required:!1,type:{name:"boolean | undefined"}},positionFormat:{defaultValue:null,description:"The format of positions, default 'XYZ'.",name:"positionFormat",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"XYZ"'},{value:'"XY"'}]}},colorFormat:{defaultValue:null,description:"The format of colors, default 'RGBA'.",name:"colorFormat",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"RGBA"'},{value:'"RGB"'}]}},parameters:{defaultValue:null,description:"Override the WebGL parameters used to draw this layer. See https://luma.gl/modules/gltools/docs/api-reference/parameter-setting#parameters",name:"parameters",required:!1,type:{name:"Parameters | undefined"}},transitions:{defaultValue:null,description:"Create smooth transitions when prop values update.",name:"transitions",required:!1,type:{name:"Record<string, any> | null | undefined"}},extensions:{defaultValue:null,description:"Add additional functionalities to this layer.",name:"extensions",required:!1,type:{name:"LayerExtension<unknown>[] | undefined"}},loaders:{defaultValue:null,description:"Add support for additional data formats.",name:"loaders",required:!1,type:{name:"Loader[] | undefined"}},loadOptions:{defaultValue:null,description:"Options to customize the behavior of loaders",name:"loadOptions",required:!1,type:{name:"any"}},getPolygonOffset:{defaultValue:null,description:"Callback to calculate the polygonOffset WebGL parameter.",name:"getPolygonOffset",required:!1,type:{name:"((params: { layerIndex: number; }) => [number, number]) | null | undefined"}},autoHighlight:{defaultValue:null,description:"Enable GPU-based object highlighting. Default false.",name:"autoHighlight",required:!1,type:{name:"boolean | undefined"}},highlightedObjectIndex:{defaultValue:null,description:"The index of the data object to highlight. If unspecified, the currently hoverred object is highlighted.",name:"highlightedObjectIndex",required:!1,type:{name:"number | null | undefined"}},highlightColor:{defaultValue:null,description:"The color of the highlight.",name:"highlightColor",required:!1,type:{name:"number[] | ((pickingInfo: { color: Uint8Array<ArrayBufferLike> | null; layer: Layer<{}> | null; sourceLayer?: Layer<{}> | null | undefined; viewport?: Viewport | undefined; ... 8 more ...; pixelRatio: number; }) => number[]) | undefined"}},onDataLoad:{defaultValue:null,description:"Called when remote data is fetched and parsed.",name:"onDataLoad",required:!1,type:{name:"(<LayerDataT = LayerData<unknown>>(data: LayerDataT, context: { propName: string; layer: Layer<{}>; }) => void) | null | undefined"}},onError:{defaultValue:null,description:"Called when the layer encounters an error.",name:"onError",required:!1,type:{name:"((error: Error) => boolean | void) | null | undefined"}},onHover:{defaultValue:null,description:"Called when the mouse enters/leaves an object of this layer.",name:"onHover",required:!1,type:{name:"((pickingInfo: { color: Uint8Array<ArrayBufferLike> | null; layer: Layer<{}> | null; sourceLayer?: Layer<{}> | null | undefined; viewport?: Viewport | undefined; ... 8 more ...; pixelRatio: number; }, event: MjolnirEvent) => boolean | void) | null | undefined"}},onClick:{defaultValue:null,description:"Called when the mouse clicks over an object of this layer.",name:"onClick",required:!1,type:{name:"((pickingInfo: { color: Uint8Array<ArrayBufferLike> | null; layer: Layer<{}> | null; sourceLayer?: Layer<{}> | null | undefined; viewport?: Viewport | undefined; ... 8 more ...; pixelRatio: number; }, event: MjolnirEvent) => boolean | void) | null | undefined"}},onDragStart:{defaultValue:null,description:"Called when the mouse starts dragging an object of this layer.",name:"onDragStart",required:!1,type:{name:"((pickingInfo: { color: Uint8Array<ArrayBufferLike> | null; layer: Layer<{}> | null; sourceLayer?: Layer<{}> | null | undefined; viewport?: Viewport | undefined; ... 8 more ...; pixelRatio: number; }, event: MjolnirEvent) => boolean | void) | null | undefined"}},onDrag:{defaultValue:null,description:"Called when the mouse drags an object of this layer.",name:"onDrag",required:!1,type:{name:"((pickingInfo: { color: Uint8Array<ArrayBufferLike> | null; layer: Layer<{}> | null; sourceLayer?: Layer<{}> | null | undefined; viewport?: Viewport | undefined; ... 8 more ...; pixelRatio: number; }, event: MjolnirEvent) => boolean | void) | null | undefined"}},onDragEnd:{defaultValue:null,description:"Called when the mouse releases an object of this layer.",name:"onDragEnd",required:!1,type:{name:"((pickingInfo: { color: Uint8Array<ArrayBufferLike> | null; layer: Layer<{}> | null; sourceLayer?: Layer<{}> | null | undefined; viewport?: Viewport | undefined; ... 8 more ...; pixelRatio: number; }, event: MjolnirEvent) => boolean | void) | null | undefined"}},numInstances:{defaultValue:null,description:"(Advanced) supply attribute size externally",name:"numInstances",required:!1,type:{name:"number | null | undefined"}},startIndices:{defaultValue:null,description:"(Advanced) supply variable-width attribute size externally",name:"startIndices",required:!1,type:{name:"NumericArray | null | undefined"}},_subLayerProps:{defaultValue:null,description:"(Experimental) override sub layer props. Only works on a composite layer.",name:"_subLayerProps",required:!1,type:{name:"{ [subLayerId: string]: { [propName: string]: any; type?: ConstructorOf<Layer<{}>> | undefined; }; } | null | undefined"}}}}}catch{}const At={title:"MapComponents/MlHexagonMap",component:V,argTypes:{},decorators:pe},ie=i=>{const[e,t]=P.useState({type:"",features:[]}),n=K({mapId:"map_1"});return P.useEffect(()=>{let a=!1;return(async()=>{try{const r=await fetch("https://mapcomponents.github.io/react-map-components-maplibre/deck-gl/assets/3D/laerm_points.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json(),l=Array.isArray(s?.features)?s.features:[];a||t({type:s?.type??"FeatureCollection",features:l})}catch(r){console.error(r),a||t({type:"",features:[]})}})(),()=>{a=!0}},[]),n.map?.setPitch(60),n.map?.setZoom(13.5),A.jsx(A.Fragment,{children:A.jsx(V,{data:e.features,getPosition:a=>a.geometry.coordinates,...i})})},x=ie.bind({});x.parameters={};x.args={mapId:"map_1",type:S,layerOpacity:.8,elevationRange:[30,75],elevationScale:1,extruded:!0,coverage:.9,autoHighlight:!1,material:{ambient:.6,diffuse:.5,shininess:10},radius:16,transitions:{elevationScale:1500},_filterData:null,colorRange:[[1,152,189,125],[73,227,206,150],[216,254,181,175],[254,237,177,200],[254,173,84,225],[209,55,78,255]]};const C=ie.bind({});C.parameters={};C.args={mapId:"map_1",type:S,layerOpacity:.8,specularColor:[51,51,51],elevationRange:[30,75],elevationScale:1,extruded:!0,coverage:.9,autoHighlight:!1,material:{ambient:.8,diffuse:.5,shininess:10},radius:16,transitions:{elevationScale:1500},_filterData:null,colorRange:[[1,152,189,Math.round(80*.8)],[73,227,206,Math.round(90*.8)],[216,254,181,Math.round(100*.8)],[254,237,177,Math.round(110*.8)],[254,173,84,Math.round(120*.8)],[209,55,78,Math.round(150*.8)]],getColorValue:i=>{const e=i.reduce((t,n)=>{const a=n?.properties?n.properties:n?.source?.properties;return!a?.dba&&t===-1/0?t:t<a.dba?a.dba:t},-1/0);return Number.isFinite(e)?Math.round(e):0},getElevationValue:i=>{const e=i.reduce((t,n)=>{const a=n?.properties?n.properties:n?.source?.properties;return!a?.dba&&t===-1/0?t:t<a.dba?a.dba:t},-1/0);return Number.isFinite(e)?Math.round(e):0}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`(context: any) => {
  const [noiseData, setNoiseData] = useState<{
    type: string;
    features: any[];
  }>({
    type: '',
    features: []
  });
  const mapHook = useMap({
    mapId: 'map_1'
  });
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('https://mapcomponents.github.io/react-map-components-maplibre/deck-gl/assets/3D/laerm_points.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const json = await res.json();
        const features = Array.isArray(json?.features) ? json.features : [];
        if (!cancelled) {
          setNoiseData({
            type: json?.type ?? 'FeatureCollection',
            features
          });
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setNoiseData({
            type: '',
            features: []
          });
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  mapHook.map?.setPitch(60);
  mapHook.map?.setZoom(13.5);
  return <>
            <MlHexagonLayer data={noiseData.features} getPosition={(d: any) => d.geometry.coordinates} {...context} />
        </>;
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`(context: any) => {
  const [noiseData, setNoiseData] = useState<{
    type: string;
    features: any[];
  }>({
    type: '',
    features: []
  });
  const mapHook = useMap({
    mapId: 'map_1'
  });
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('https://mapcomponents.github.io/react-map-components-maplibre/deck-gl/assets/3D/laerm_points.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const json = await res.json();
        const features = Array.isArray(json?.features) ? json.features : [];
        if (!cancelled) {
          setNoiseData({
            type: json?.type ?? 'FeatureCollection',
            features
          });
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setNoiseData({
            type: '',
            features: []
          });
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  mapHook.map?.setPitch(60);
  mapHook.map?.setZoom(13.5);
  return <>
            <MlHexagonLayer data={noiseData.features} getPosition={(d: any) => d.geometry.coordinates} {...context} />
        </>;
}`,...C.parameters?.docs?.source}}};const It=["DefaultSettings","CustomColorAndHeightProfile"];export{C as CustomColorAndHeightProfile,x as DefaultSettings,It as __namedExportsOrder,At as default};
