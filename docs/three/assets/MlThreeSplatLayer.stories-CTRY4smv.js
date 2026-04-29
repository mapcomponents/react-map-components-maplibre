import{j as D}from"./index-Box9V7w1.js";import{r as z}from"./iframe-CcR1IH3I.js";import{am as xe,an as fe,ao as P,ap as ye,aq as ve,ar as Te,as as we,at as be,au as ce,av as Ce,aw as ue,ax as Se,ay as ge,az as ne,E as ke,g as _,Q as pe,f as Z,aA as ze,aB as F,aC as _e,r as I,aa as Ae,ab as Ie,V as L,aD as O,aE as De,aF as N,p as H,aG as Me,aH as Ee,aI as He,aJ as Pe,z as Ue,B as Ve,aK as Be,h as Le,aL as Re,aM as Fe,w as Oe,aN as Ne,L as he,F as de,X as U,ae as Ge,af as We,ag as je,ah as qe,ai as $e,aj as Ze,ak as Xe}from"./MlThreeObjectControls-TfhAdH8I.js";import"./index-Bd-URVpA.js";import"./preload-helper-D9Z9MdNV.js";function Ye(i){return fe("MuiLink",i)}const Qe=xe("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),Je=({theme:i,ownerState:e})=>{const t=e.color;if("colorSpace"in i&&i.colorSpace){const r=P(i,`palette.${t}.main`)||P(i,`palette.${t}`)||e.color;return i.alpha(r,.4)}const s=P(i,`palette.${t}.main`,!1)||P(i,`palette.${t}`,!1)||e.color,a=P(i,`palette.${t}.mainChannel`)||P(i,`palette.${t}Channel`);return"vars"in i&&a?`rgba(${a} / 0.4)`:ye(s,.4)},oe={primary:!0,secondary:!0,error:!0,info:!0,success:!0,warning:!0,textPrimary:!0,textSecondary:!0,textDisabled:!0},Ke=i=>{const{classes:e,component:t,focusVisible:s,underline:a}=i,r={root:["root",`underline${ce(a)}`,t==="button"&&"button",s&&"focusVisible"]};return Ce(r,Ye,e)},et=we(ue,{name:"MuiLink",slot:"Root",overridesResolver:(i,e)=>{const{ownerState:t}=i;return[e.root,e[`underline${ce(t.underline)}`],t.component==="button"&&e.button]}})(Se(({theme:i})=>({variants:[{props:{underline:"none"},style:{textDecoration:"none"}},{props:{underline:"hover"},style:{textDecoration:"none","&:hover":{textDecoration:"underline"}}},{props:{underline:"always"},style:{textDecoration:"underline","&:hover":{textDecorationColor:"inherit"}}},{props:({underline:e,ownerState:t})=>e==="always"&&t.color!=="inherit",style:{textDecorationColor:"var(--Link-underlineColor)"}},{props:({underline:e,ownerState:t})=>e==="always"&&t.color==="inherit",style:i.colorSpace?{textDecorationColor:i.alpha("currentColor",.4)}:null},...Object.entries(i.palette).filter(ge()).map(([e])=>({props:{underline:"always",color:e},style:{"--Link-underlineColor":i.alpha((i.vars||i).palette[e].main,.4)}})),{props:{underline:"always",color:"textPrimary"},style:{"--Link-underlineColor":i.alpha((i.vars||i).palette.text.primary,.4)}},{props:{underline:"always",color:"textSecondary"},style:{"--Link-underlineColor":i.alpha((i.vars||i).palette.text.secondary,.4)}},{props:{underline:"always",color:"textDisabled"},style:{"--Link-underlineColor":(i.vars||i).palette.text.disabled}},{props:{component:"button"},style:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Qe.focusVisible}`]:{outline:"auto"}}}]}))),tt=z.forwardRef(function(e,t){const s=ve({props:e,name:"MuiLink"}),a=Te(),{className:r,color:o="primary",component:h="a",onBlur:u,onFocus:p,TypographyClasses:d,underline:c="always",variant:n="inherit",sx:m,...l}=s,[f,y]=z.useState(!1),v=T=>{ne(T.target)||y(!1),u&&u(T)},C=T=>{ne(T.target)&&y(!0),p&&p(T)},S={...s,color:o,component:h,focusVisible:f,underline:c,variant:n},g=Ke(S);return D.jsx(et,{color:o,className:be(g.root,r),classes:d,component:h,onBlur:v,onFocus:C,ref:t,ownerState:S,variant:n,...l,sx:[...oe[o]===void 0?[{color:o}]:[],...Array.isArray(m)?m:[m]],style:{...l.style,...c==="always"&&o!=="inherit"&&!oe[o]&&{"--Link-underlineColor":Je({theme:a,ownerState:S})}}})});function Y(i,e,t){try{const s=i.next();s.done||!s.value?e(s):s.value.then(()=>e({done:s.done,value:void 0}),t)}catch(s){t(s)}}function Q(i=25){let e;return(t,s,a)=>{const r=performance.now();e===void 0||r-e>i?(e=r,setTimeout(()=>Y(t,s,a),0)):Y(t,s,a)}}function me(i,e,t,s,a){const r=()=>{let o;const h=u=>{u.done?t(u.value):o===void 0?o=!0:r()};do{if(o=void 0,a?.aborted){s(new DOMException("Aborted","AbortError"));return}e(i,h,s),o===void 0&&(o=!1)}while(o)};r()}function st(i,e){let t;return me(i,Y,s=>{t=s},s=>{throw s},e),t}function J(i,e,t){return new Promise((s,a)=>{me(i,e,s,a,t)})}const at=`
precision highp float;
#include <common>

attribute float splatIndex;

uniform vec2 invViewport;
uniform vec2 dataTextureSize;
uniform vec2 focal;
uniform sampler2D covariancesATexture;
uniform sampler2D covariancesBTexture;
uniform sampler2D centersTexture;
uniform sampler2D colorsTexture;

#if SH_DEGREE > 0
uniform highp usampler2D shTexture0;
#endif
#if SH_DEGREE > 1
uniform highp usampler2D shTexture1;
#endif
#if SH_DEGREE > 2
uniform highp usampler2D shTexture2;
#endif

varying vec4 vColor;
varying vec2 vPosition;

vec2 getDataUV(float index, vec2 textureSize) {
    float y = floor(index / textureSize.x);
    float x = index - y * textureSize.x;
    return vec2((x + 0.5) / textureSize.x, (y + 0.5) / textureSize.y);
}

#if SH_DEGREE > 0
ivec2 getDataUVint(float index, vec2 textureSize) {
    float y = floor(index / textureSize.x);
    float x = index - y * textureSize.x;
    return ivec2(uint(x + 0.5), uint(y + 0.5));
}
#endif

struct Splat {
    vec4 center;
    vec4 color;
    vec4 covA;
    vec4 covB;
#if SH_DEGREE > 0
    uvec4 sh0;
#endif
#if SH_DEGREE > 1
    uvec4 sh1;
#endif
#if SH_DEGREE > 2
    uvec4 sh2;
#endif
};

Splat readSplat(float splatIndex) {
    Splat splat;
    vec2 splatUV = getDataUV(splatIndex, dataTextureSize);
    splat.center = texture2D(centersTexture, splatUV);
    splat.color = texture2D(colorsTexture, splatUV);
    splat.covA = texture2D(covariancesATexture, splatUV) * splat.center.w;
    splat.covB = texture2D(covariancesBTexture, splatUV) * splat.center.w;
#if SH_DEGREE > 0
    ivec2 splatUVint = getDataUVint(splatIndex, dataTextureSize);
    splat.sh0 = texelFetch(shTexture0, splatUVint, 0);
#endif
#if SH_DEGREE > 1
    splat.sh1 = texelFetch(shTexture1, splatUVint, 0);
#endif
#if SH_DEGREE > 2
    splat.sh2 = texelFetch(shTexture2, splatUVint, 0);
#endif
    return splat;
}

vec3 computeColorFromSHDegree(vec3 dir, const vec3 sh[16]) {
    const float SH_C0 = 0.28209479;
    const float SH_C1 = 0.48860251;
    float SH_C2[5];
    SH_C2[0] = 1.092548430;
    SH_C2[1] = -1.09254843;
    SH_C2[2] = 0.315391565;
    SH_C2[3] = -1.09254843;
    SH_C2[4] = 0.546274215;
    
    float SH_C3[7];
    SH_C3[0] = -0.59004358;
    SH_C3[1] = 2.890611442;
    SH_C3[2] = -0.45704579;
    SH_C3[3] = 0.373176332;
    SH_C3[4] = -0.45704579;
    SH_C3[5] = 1.445305721;
    SH_C3[6] = -0.59004358;

    vec3 result = sh[0];

#if SH_DEGREE > 0
    float x = dir.x;
    float y = dir.y;
    float z = dir.z;
    result += -SH_C1 * y * sh[1] + SH_C1 * z * sh[2] - SH_C1 * x * sh[3];

#if SH_DEGREE > 1
    float xx = x * x, yy = y * y, zz = z * z;
    float xy = x * y, yz = y * z, xz = x * z;
    result += 
        SH_C2[0] * xy * sh[4] +
        SH_C2[1] * yz * sh[5] +
        SH_C2[2] * (2.0f * zz - xx - yy) * sh[6] +
        SH_C2[3] * xz * sh[7] +
        SH_C2[4] * (xx - yy) * sh[8];

#if SH_DEGREE > 2
    result += 
        SH_C3[0] * y * (3.0f * xx - yy) * sh[9] +
        SH_C3[1] * xy * z * sh[10] +
        SH_C3[2] * y * (4.0f * zz - xx - yy) * sh[11] +
        SH_C3[3] * z * (2.0f * zz - 3.0f * xx - 3.0f * yy) * sh[12] +
        SH_C3[4] * x * (4.0f * zz - xx - yy) * sh[13] +
        SH_C3[5] * z * (xx - yy) * sh[14] +
        SH_C3[6] * x * (xx - 3.0f * yy) * sh[15];
#endif
#endif
#endif

    return result;
}

vec4 decompose(uint value) {
    vec4 components = vec4(
        float((value) & 255u),
        float((value >> uint(8)) & 255u),
        float((value >> uint(16)) & 255u),
        float((value >> uint(24)) & 255u)
    );
    return components * vec4(2./255.) - vec4(1.);
}

vec3 computeSH(Splat splat, vec3 color, vec3 dir) {
    vec3 sh[16];
    sh[0] = color;

#if SH_DEGREE > 0
    vec4 sh00 = decompose(splat.sh0.x);
    vec4 sh01 = decompose(splat.sh0.y);
    vec4 sh02 = decompose(splat.sh0.z);
    sh[1] = vec3(sh00.x, sh00.y, sh00.z);
    sh[2] = vec3(sh00.w, sh01.x, sh01.y);
    sh[3] = vec3(sh01.z, sh01.w, sh02.x);
#endif
#if SH_DEGREE > 1
    vec4 sh03 = decompose(splat.sh0.w);
    vec4 sh04 = decompose(splat.sh1.x);
    vec4 sh05 = decompose(splat.sh1.y);
    sh[4] = vec3(sh02.y, sh02.z, sh02.w);
    sh[5] = vec3(sh03.x, sh03.y, sh03.z);
    sh[6] = vec3(sh03.w, sh04.x, sh04.y);
    sh[7] = vec3(sh04.z, sh04.w, sh05.x);
    sh[8] = vec3(sh05.y, sh05.z, sh05.w);
#endif
#if SH_DEGREE > 2
    vec4 sh06 = decompose(splat.sh1.z);
    vec4 sh07 = decompose(splat.sh1.w);
    vec4 sh08 = decompose(splat.sh2.x);
    vec4 sh09 = decompose(splat.sh2.y);
    vec4 sh10 = decompose(splat.sh2.z);
    vec4 sh11 = decompose(splat.sh2.w);
    sh[9] = vec3(sh06.x, sh06.y, sh06.z);
    sh[10] = vec3(sh06.w, sh07.x, sh07.y);
    sh[11] = vec3(sh07.z, sh07.w, sh08.x);
    sh[12] = vec3(sh08.y, sh08.z, sh08.w);
    sh[13] = vec3(sh09.x, sh09.y, sh09.z);
    sh[14] = vec3(sh09.w, sh10.x, sh10.y);
    sh[15] = vec3(sh10.z, sh10.w, sh11.x);
#endif

    return computeColorFromSHDegree(dir, sh);
}

vec4 gaussianSplatting(vec2 meshPos, vec3 worldPos, vec2 scale, vec3 covA, vec3 covB, mat4 worldMatrix, mat4 viewMatrix, mat4 projectionMatrix) {
    mat4 modelView = viewMatrix * worldMatrix;
    vec4 camspace = viewMatrix * vec4(worldPos, 1.0);
    vec4 pos2d = projectionMatrix * camspace;

    float bounds = 1.2 * pos2d.w;
    if (pos2d.z < -pos2d.w || pos2d.x < -bounds || pos2d.x > bounds || pos2d.y < -bounds || pos2d.y > bounds) {
        return vec4(0.0, 0.0, 2.0, 1.0);
    }

    mat3 Vrk = mat3(
        covA.x, covA.y, covA.z,
        covA.y, covB.x, covB.y,
        covA.z, covB.y, covB.z
    );

    mat3 J = mat3(
        focal.x / camspace.z, 0., -(focal.x * camspace.x) / (camspace.z * camspace.z),
        0., focal.y / camspace.z, -(focal.y * camspace.y) / (camspace.z * camspace.z),
        0., 0., 0.
    );

    mat3 T = transpose(mat3(modelView)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;

    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;

    if (lambda2 < 0.0) {
        return vec4(0.0, 0.0, 2.0, 1.0);
    }

    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

    vec2 vCenter = vec2(pos2d);
    return vec4(
        vCenter + ((meshPos.x * majorAxis + meshPos.y * minorAxis) * invViewport * pos2d.w) * scale,
        pos2d.zw
    );
}

void main() {
    Splat splat = readSplat(splatIndex);
    vec3 covA = splat.covA.xyz;
    vec3 covB = vec3(splat.covA.w, splat.covB.xy);

    vec4 worldPos = modelMatrix * vec4(splat.center.xyz, 1.0);

    vColor = splat.color;
    vPosition = position.xy;

    gl_Position = gaussianSplatting(vPosition, worldPos.xyz, vec2(1.0, 1.0), covA, covB, modelMatrix, viewMatrix, projectionMatrix);
}
`,rt=`
precision highp float;
#include <common>

varying vec4 vColor;
varying vec2 vPosition;

vec4 gaussianColor(vec4 inColor) {
    float A = -dot(vPosition, vPosition);
    if (A < -4.0) discard;
    float B = exp(A) * inColor.a;
    return vec4(inColor.rgb, B);
}

void main() {
    gl_FragColor = gaussianColor(vColor);
}
`,V=i=>ze.toHalfFloat(i);class ie{static build(e=1){const t=new Ue;t.setIndex([0,1,2]);const s=new Ve(new Float32Array([-3,-2,0,3,-2,0,0,4,0]),3);t.setAttribute("position",s);const a=new Be;a.setIndex(t.getIndex()),a.setAttribute("position",t.getAttribute("position"));const r=new Le(new Float32Array(e),1,!1);return r.setUsage(Re),a.setAttribute("splatIndex",r),a.instanceCount=0,a}}class M{static BATCH_SIZE=327680;static workCount=0;vertexCount=0;positions=null;hasInit=!1;splatIndex=null;depthValues=null;tempDepths=null;tempIndices=null;abortController=null;onmessage=null;terminate(){this.abortController?.abort(),this.abortController=null,this.vertexCount=0,this.positions=null,this.splatIndex=null,this.onmessage=null}initSortData(){if(this.hasInit||this.vertexCount<0)return;const e=this.vertexCount;this.depthValues=new Int32Array(e),this.splatIndex=new Uint32Array(e),this.tempDepths=new Int32Array(e),this.tempIndices=new Uint32Array(e),this.hasInit=!0}*sortData(e,t){this.hasInit||this.initSortData();const{positions:s,vertexCount:a,depthValues:r,splatIndex:o,tempDepths:h,tempIndices:u}=this;if(!s||!r||!o||!h||!u)return;let p=1/0;for(let n=0;n<a;n++){o[n]=n;const m=e[2]*s[4*n]+e[6]*s[4*n+1]+e[10]*s[4*n+2],l=Math.floor(m*4096);r[n]=l,p=Math.min(p,l)}t&&(M.workCount+=a,M.workCount>M.BATCH_SIZE&&(M.workCount=0,yield));const d=-p;for(let n=0;n<a;n++)r[n]+=d;const c=new Uint32Array(256);for(let n=0;n<32;n+=8){c.fill(0);for(let l=0;l<a;l++)c[r[l]>>n&255]++;let m=0;for(let l=0;l<c.length;l++){const f=c[l];c[l]=m,m+=f}for(let l=0;l<a;l++){const f=r[l]>>n&255,y=c[f]++;h[y]=r[l],u[y]=o[l]}r.set(h),o.set(u),t&&(M.workCount+=a,M.workCount>M.BATCH_SIZE&&(M.workCount=0,yield))}}init(e,t){this.positions=e,this.vertexCount=t,this.initSortData()}async sortDataAsync(e){this.abortController?.abort(),this.abortController=new AbortController;const t=this.abortController.signal;try{await J(this.sortData(e,!0),Q(),t),this.onmessage&&this.splatIndex&&this.onmessage(this.splatIndex)}catch(s){s instanceof Error&&s.name!=="AbortError"&&console.error("Splat sort error:",s)}finally{this.abortController=null}}}class X{static build(e=0){return new Fe({uniforms:{invViewport:{value:new L},dataTextureSize:{value:new L},focal:{value:new L},covariancesATexture:{value:null},covariancesBTexture:{value:null},centersTexture:{value:null},colorsTexture:{value:null},shTexture0:{value:null},shTexture1:{value:null},shTexture2:{value:null}},defines:{SH_DEGREE:e},vertexShader:at,fragmentShader:rt,transparent:!0,alphaTest:1,blending:Ne,depthTest:!0,depthWrite:!0,side:Oe})}static updateUniforms(e,t,s){const a=s.material;if(!a?.uniforms)return;const{uniforms:r}=a,o=e.getSize(new L);if(r.invViewport.value.set(1/o.x,1/o.y),t){const h=t._cleanProjectionMatrix,u=h?.elements??h??t.projectionMatrix.elements;r.focal.value.set(u[0]*.5*o.x,u[5]*.5*o.y)}if(s.covariancesATexture){const{width:h,height:u}=s.covariancesATexture.image;r.dataTextureSize.value.set(h,u),r.covariancesATexture.value=s.covariancesATexture,r.covariancesBTexture.value=s.covariancesBTexture,r.centersTexture.value=s.centersTexture,r.colorsTexture.value=s.colorsTexture,s.shTextures?.forEach((p,d)=>{r[`shTexture${d}`].value=p})}a.uniformsNeedUpdate=!0}}class B extends ke{static ROW_OUTPUT_LENGTH=32;static SPLAT_BATCH_SIZE=327680;vertexCount=0;worker=null;frameIdLastUpdate=-1;frameIdThisUpdate=0;cameraMatrix=null;internalModelViewMatrix=null;canPostToWorker=!1;covariancesATextureInternal=null;covariancesBTextureInternal=null;centersTextureInternal=null;colorsTextureInternal=null;splatPositions=null;splatPositions2=null;splatIndex=null;shTexturesInternal=null;splatsDataInternal=null;keepInRam=!1;oldDirection=new _;useRGBACovariants=!0;tmpCovariances=[0,0,0,0,0,0];sortIsDirty=!1;lastSortTime=0;sortThrottleMs=200;shDegreeValue=0;tempQuaternion=new pe;tempPosition=new _;tempScale=new _;tempColor=new Uint8Array(4);tempMatrix=new Z;isGaussianSplattingMesh=!0;readyToDisplay=!1;type="GaussianSplattingMesh";get shDegree(){return this.shDegreeValue}get splatsData(){return this.splatsDataInternal}get covariancesATexture(){return this.covariancesATextureInternal}get covariancesBTexture(){return this.covariancesBTextureInternal}get centersTexture(){return this.centersTextureInternal}get colorsTexture(){return this.colorsTextureInternal}get shTextures(){return this.shTexturesInternal}constructor(){super(),this.geometry=ie.build(),this.material=X.build(),this.setEnabled(!1)}setEnabled(e){this.visible=e}postToWorker(e=!1){const t=this.frameIdThisUpdate;if((e||t!==this.frameIdLastUpdate)&&this.worker&&this.cameraMatrix&&this.canPostToWorker){this.internalModelViewMatrix=new Z().multiplyMatrices(this.cameraMatrix,this.matrixWorld);const s=this.cameraMatrix.clone().invert(),a=new Z().multiplyMatrices(s,this.matrixWorld),r=new _(0,0,1).transformDirection(a),o=r.dot(this.oldDirection);if(e||Math.abs(o-1)>=.01)return this.oldDirection.copy(r),this.frameIdLastUpdate=t,this.canPostToWorker=!1,this.worker.sortDataAsync(this.internalModelViewMatrix.elements)}}onBeforeRender(e,t,s,a,r,o){this.frameIdThisUpdate=e.info.render.frame;const h=performance.now();h-this.lastSortTime>this.sortThrottleMs&&(this.lastSortTime=h,this.sortDataAsync(s).catch(u=>{u.name!=="AbortError"&&console.warn("Splat sorting error:",u)})),X.updateUniforms(e,s,this),super.onBeforeRender(e,t,s,a,r,o)}loadDataAsync(e){return this.updateDataAsync(e)}dispose(){this.covariancesATextureInternal?.dispose(),this.covariancesBTextureInternal?.dispose(),this.centersTextureInternal?.dispose(),this.colorsTextureInternal?.dispose(),this.shTexturesInternal?.forEach(e=>e.dispose()),this.covariancesATextureInternal=null,this.covariancesBTextureInternal=null,this.centersTextureInternal=null,this.colorsTextureInternal=null,this.shTexturesInternal=null,this.worker?.terminate(),this.worker=null}copyTextures(e){this.covariancesATextureInternal=e.covariancesATexture?.clone()??null,this.covariancesBTextureInternal=e.covariancesBTexture?.clone()??null,this.centersTextureInternal=e.centersTexture?.clone()??null,this.colorsTextureInternal=e.colorsTexture?.clone()??null,e.shTexturesInternal&&(this.shTexturesInternal=e.shTexturesInternal.map(t=>t.clone()))}clone(){const e=new B;return e.geometry=this.geometry.clone(),e.material=this.material.clone(),e.vertexCount=this.vertexCount,e.copyTextures(this),e.splatPositions=this.splatPositions,e.readyToDisplay=!1,e.instantiateWorker(),e}makeSplatFromComponents(e,t,s,a,r,o,h,u,p,d,c){r.w=-r.w,a=a.multiplyScalar(2);const n=this.tempMatrix.elements,m=this.useRGBACovariants?4:2;this.splatPositions[4*e+0]=s.x,this.splatPositions[4*e+1]=s.y,this.splatPositions[4*e+2]=s.z,this.splatPositions2[4*e+0]=s.x,this.splatPositions2[4*e+1]=s.y,this.splatPositions2[4*e+2]=s.z,d.min(s),c.max(s);const{x:l,y:f,z:y,w:v}=r,C=l+l,S=f+f,g=y+y,T=l*C,x=l*S,b=l*g,K=f*S,ee=f*g,te=y*g,se=v*C,ae=v*S,re=v*g,{x:W,y:j,z:q}=a;n[0]=(1-(K+te))*W,n[1]=(x+re)*j,n[2]=(b-ae)*q,n[4]=(x-re)*W,n[5]=(1-(T+te))*j,n[6]=(ee+se)*q,n[8]=(b+ae)*W,n[9]=(ee-se)*j,n[10]=(1-(T+K))*q;const k=this.tmpCovariances;k[0]=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],k[1]=n[0]*n[4]+n[1]*n[5]+n[2]*n[6],k[2]=n[0]*n[8]+n[1]*n[9]+n[2]*n[10],k[3]=n[4]*n[4]+n[5]*n[5]+n[6]*n[6],k[4]=n[4]*n[8]+n[5]*n[9]+n[6]*n[10],k[5]=n[8]*n[8]+n[9]*n[9]+n[10]*n[10];let A=-1e4;for(let $=0;$<6;$++)A=Math.max(A,Math.abs(k[$]));this.splatPositions[4*e+3]=A,this.splatPositions2[4*e+3]=A,h[t*4+0]=V(k[0]/A),h[t*4+1]=V(k[1]/A),h[t*4+2]=V(k[2]/A),h[t*4+3]=V(k[3]/A),u[t*m+0]=V(k[4]/A),u[t*m+1]=V(k[5]/A),p[t*4+0]=o[0],p[t*4+1]=o[1],p[t*4+2]=o[2],p[t*4+3]=o[3]}makeSplatFromBuffer(e,t,s,a,r,o,h,u,p){const d=8*e,c=32*e;this.tempPosition.set(s[d],s[d+1],s[d+2]),this.tempScale.set(s[d+3],s[d+4],s[d+5]),this.tempQuaternion.set((a[c+29]-127.5)/127.5,(a[c+30]-127.5)/127.5,(a[c+31]-127.5)/127.5,(a[c+28]-127.5)/127.5).normalize(),this.tempColor[0]=a[c+24],this.tempColor[1]=a[c+25],this.tempColor[2]=a[c+26],this.tempColor[3]=a[c+27],this.makeSplatFromComponents(e,t,this.tempPosition,this.tempScale,this.tempQuaternion,this.tempColor,r,o,h,u,p)}updateTextures(e,t,s,a){const r=this.getTextureSize(this.vertexCount),o=(d,c,n,m)=>{const l=new O(d,c,n,m,De,N,I,I,H,H);return l.generateMipmaps=!1,l.needsUpdate=!0,l},h=(d,c,n,m)=>{const l=new O(d,c,n,m,Me,N,I,I,H,H);return l.generateMipmaps=!1,l.needsUpdate=!0,l},u=(d,c,n,m)=>{const l=new O(d,c,n,m,Ee,N,I,I,H,H);return l.generateMipmaps=!1,l.needsUpdate=!0,l},p=(d,c,n,m)=>{const l=new O(d,c,n,m,He,N,I,I,H,H);return l.generateMipmaps=!1,l.needsUpdate=!0,l};this.covariancesATextureInternal=p(e,r.x,r.y,F),this.covariancesBTextureInternal=p(t,r.x,r.y,this.useRGBACovariants?F:_e),this.centersTextureInternal=o(this.splatPositions,r.x,r.y,F),this.colorsTextureInternal=h(s,r.x,r.y,F),a&&(this.shTexturesInternal=a.map(d=>{const c=new Uint32Array(d.buffer),n=u(c,r.x,r.y,Pe);return n.wrapS=I,n.wrapT=I,n})),this.instantiateWorker()}updateBoundingInfo(e,t){this.boundingBox=new Ae(e,t),this.boundingSphere=this.boundingBox.getBoundingSphere(new Ie)}*updateDataCoroutine(e,t,s){this.covariancesATextureInternal||(this.readyToDisplay=!1);const a=new Uint8Array(e),r=new Float32Array(a.buffer);this.keepInRam&&(this.splatsDataInternal=e),this.shDegreeValue=s?s.length:0;const o=a.length/B.ROW_OUTPUT_LENGTH;o!==this.vertexCount&&(this.vertexCount=o,this.geometry=ie.build(this.vertexCount),this.material=X.build(this.shDegreeValue),this.updateSplatIndexBuffer(this.vertexCount));const h=this.getTextureSize(o),u=h.x*h.y;this.splatPositions=new Float32Array(4*u),this.splatPositions2=new Float32Array(4*o);const p=new Uint16Array(u*4),d=new Uint16Array((this.useRGBACovariants?4:2)*u),c=new Uint8Array(u*4),n=new _(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),m=new _(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let l=0;l<o;l++)this.makeSplatFromBuffer(l,l,r,a,p,d,c,n,m),t&&l%B.SPLAT_BATCH_SIZE===0&&(yield);this.updateTextures(p,d,c,s),this.updateBoundingInfo(n,m),this.setEnabled(!0),this.postToWorker(!0)}async updateDataAsync(e,t){return J(this.updateDataCoroutine(e,!0,t),Q())}updateData(e,t){st(this.updateDataCoroutine(e,!1,t))}sortDataAsync(e,t=!1){return!this.worker||!e?Promise.resolve():(this.cameraMatrix=e.matrixWorldInverse,this.postToWorker(t)??Promise.resolve())}updateSplatIndexBuffer(e){if(!this.splatIndex||e>this.splatIndex.length){this.splatIndex=new Float32Array(e);for(let t=0;t<e;t++)this.splatIndex[t]=t;this.geometry.attributes.splatIndex.set(this.splatIndex),this.geometry.attributes.splatIndex.needsUpdate=!0}this.geometry.instanceCount=e}instantiateWorker(){this.vertexCount&&(this.updateSplatIndexBuffer(this.vertexCount),this.worker?.terminate(),this.worker=new M,this.worker.init(this.splatPositions2,this.vertexCount),this.canPostToWorker=!0,this.worker.onmessage=e=>{if(this.splatIndex&&e){for(let t=0;t<this.vertexCount;t++)this.splatIndex[t]=e[t];this.geometry.attributes.splatIndex.set(this.splatIndex)}this.geometry.attributes.splatIndex.needsUpdate=!0,this.canPostToWorker=!0,this.readyToDisplay=!0,this.sortIsDirty&&(this.postToWorker(!0),this.sortIsDirty=!1)})}getTextureSize(e){let a=1;for(;4096*a<e;)a*=2;return a>4096&&(console.error(`GaussianSplatting texture size: (4096, ${a}), maxTextureSize: 4096`),a=4096),new L(4096,a)}}class nt extends he{load(e,t,s,a){const r=new de(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,o=>this.parse(o,t,a),s,a)}parse(e,t,s){const a=new B;a.loadDataAsync(e).then(()=>t(a)).catch(r=>{s?s(r):console.error(r)})}}const E=(i,e)=>{const t=(1<<e)-1;return(i&t)/t},le=(i,e)=>{e.x=E(i>>>21,11),e.y=E(i>>>11,10),e.z=E(i,11)},ot=(i,e)=>{e[0]=E(i>>>24,8)*255,e[1]=E(i>>>16,8)*255,e[2]=E(i>>>8,8)*255,e[3]=E(i,8)*255},it=(i,e)=>{const t=1/(Math.sqrt(2)*.5),s=(E(i>>>20,10)-.5)*t,a=(E(i>>>10,10)-.5)*t,r=(E(i,10)-.5)*t,o=Math.sqrt(1-(s*s+a*a+r*r));switch(i>>>30){case 0:e.set(o,s,a,r);break;case 1:e.set(s,o,a,r);break;case 2:e.set(s,a,o,r);break;case 3:e.set(s,a,r,o);break}};class w extends he{static ROW_OUTPUT_LENGTH=32;static SH_C0=.28209479177387814;static PLY_CONVERSION_BATCH_SIZE=32768;load(e,t,s,a){const r=new de(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,o=>this.parse(o,t,a),s,a)}parse(e,t,s){w.ConvertPLYToSplatAsync(e).then(a=>{const r=new B;return r.loadDataAsync(a).then(()=>t(r))}).catch(a=>{s?s(a):console.error(a)})}static async ConvertPLYToSplatAsync(e){return J(w.ConvertPLYToSplat(e,!0),Q())}static*ConvertPLYToSplat(e,t=!1){const s=w.ParseHeader(e);if(!s)return e;const a={value:0},r=w.getCompressedChunks(s,a);for(let o=0;o<s.vertexCount;o++)w.getSplat(s,o,r,a),t&&o%w.PLY_CONVERSION_BATCH_SIZE===0&&(yield);return s.buffer}static getCompressedChunks(e,t){if(!e.chunkCount)return null;const{dataView:s,chunkProperties:a,rowChunkLength:r,chunkCount:o}=e,h=[];for(let u=0;u<o;u++){const p={min:new _,max:new _,minScale:new _,maxScale:new _};for(const d of a){if(d.type!==0)continue;const c=s.getFloat32(d.offset+t.value,!0);switch(d.value){case 0:p.min.x=c;break;case 1:p.min.y=c;break;case 2:p.min.z=c;break;case 3:p.max.x=c;break;case 4:p.max.y=c;break;case 5:p.max.z=c;break;case 6:p.minScale.x=c;break;case 7:p.minScale.y=c;break;case 8:p.minScale.z=c;break;case 9:p.maxScale.x=c;break;case 10:p.maxScale.y=c;break;case 11:p.maxScale.z=c;break}}h.push(p),t.value+=r}return h}static getSplat(e,t,s,a){const r=new pe,o=new _,{buffer:h,dataView:u,vertexProperties:p,rowVertexLength:d}=e,c=w.ROW_OUTPUT_LENGTH,n=new Float32Array(h,t*c,3),m=new Float32Array(h,t*c+12,3),l=new Uint8ClampedArray(h,t*c+24,4),f=new Uint8ClampedArray(h,t*c+28,4),y=t>>8;let v=255,C=0,S=0,g=0;for(const T of p){let x;switch(T.type){case 0:x=u.getFloat32(a.value+T.offset,!0);break;case 1:x=u.getInt32(a.value+T.offset,!0);break;case 2:x=u.getUint32(a.value+T.offset,!0);break;case 3:x=u.getFloat64(a.value+T.offset,!0);break;case 4:x=u.getUint8(a.value+T.offset);break;default:continue}const b=s?.[y];switch(T.value){case 12:le(x,o),n[0]=U.lerp(b.min.x,b.max.x,o.x),n[1]=-U.lerp(b.min.y,b.max.y,o.y),n[2]=U.lerp(b.min.z,b.max.z,o.z);break;case 13:it(x,r),v=r.w,C=r.z,S=r.y,g=r.x;break;case 14:le(x,o),m[0]=Math.exp(U.lerp(b.minScale.x,b.maxScale.x,o.x)),m[1]=Math.exp(U.lerp(b.minScale.y,b.maxScale.y,o.y)),m[2]=Math.exp(U.lerp(b.minScale.z,b.maxScale.z,o.z));break;case 15:ot(x,l);break;case 16:n[0]=x;break;case 17:n[1]=x;break;case 18:n[2]=x;break;case 19:m[0]=Math.exp(x);break;case 20:m[1]=Math.exp(x);break;case 21:m[2]=Math.exp(x);break;case 22:l[0]=x;break;case 23:l[1]=x;break;case 24:l[2]=x;break;case 26:l[0]=(.5+w.SH_C0*x)*255;break;case 27:l[1]=(.5+w.SH_C0*x)*255;break;case 28:l[2]=(.5+w.SH_C0*x)*255;break;case 29:l[3]=(.5+w.SH_C0*x)*255;break;case 25:l[3]=1/(1+Math.exp(-x))*255;break;case 30:v=x;break;case 31:C=x;break;case 32:S=x;break;case 33:g=x;break}}r.set(C,S,g,v).normalize(),f[0]=r.w*128+128,f[1]=r.x*128+128,f[2]=r.y*128+128,f[3]=r.z*128+128,a.value+=d}static typeNameToEnum(e){switch(e){case"float":return 0;case"int":return 1;case"uint":return 2;case"double":return 3;case"uchar":return 4;default:return 5}}static valueNameToEnum(e){return{min_x:0,min_y:1,min_z:2,max_x:3,max_y:4,max_z:5,min_scale_x:6,min_scale_y:7,min_scale_z:8,max_scale_x:9,max_scale_y:10,max_scale_z:11,packed_position:12,packed_rotation:13,packed_scale:14,packed_color:15,x:16,y:17,z:18,scale_0:19,scale_1:20,scale_2:21,diffuse_red:22,red:22,diffuse_green:23,green:23,diffuse_blue:24,blue:24,f_dc_0:26,f_dc_1:27,f_dc_2:28,f_dc_3:29,opacity:25,rot_0:30,rot_1:31,rot_2:32,rot_3:33}[e]??34}static ParseHeader(e){const t=new Uint8Array(e),s=new TextDecoder().decode(t.slice(0,1024*10)),a=`end_header
`,r=s.indexOf(a);if(r<0)return null;const o=/element vertex (\d+)\n/.exec(s);if(!o)return null;const h=parseInt(o[1]),u=/element chunk (\d+)\n/.exec(s),p=u?parseInt(u[1]):0,d={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1,list:0};let c;(v=>{v[v.Vertex=0]="Vertex",v[v.Chunk=1]="Chunk"})(c||(c={}));let n=1,m=0,l=0;const f=[],y=[];for(const v of s.slice(0,r).split(`
`))if(v.startsWith("property ")){const[,C,S]=v.split(" "),g={value:w.valueNameToEnum(S),type:w.typeNameToEnum(C),offset:n===1?l:m};n===1?(y.push(g),l+=d[C]??0):(f.push(g),m+=d[C]??0)}else if(v.startsWith("element ")){const[,C]=v.split(" ");n=C==="chunk"?1:0}return{vertexCount:h,chunkCount:p,rowVertexLength:m,rowChunkLength:l,vertexProperties:f,chunkProperties:y,dataView:new DataView(e,r+a.length),buffer:new ArrayBuffer(w.ROW_OUTPUT_LENGTH*h)}}}const G=i=>{const{url:e,position:t,transform:s,init:a,onDone:r,customLoaders:o}=i,h=z.useMemo(()=>({splat:(u,p)=>{new nt().load(u,c=>p(c))},ply:(u,p)=>{new w().load(u,c=>p(c))}}),[]);return Ge({url:e,position:t,transform:s,init:a,onDone:r,loaders:h,customLoaders:o}),null};try{G.displayName="MlThreeSplatLayer",G.__docgenInfo={description:"",displayName:"MlThreeSplatLayer",props:{url:{defaultValue:null,description:"",name:"url",required:!0,type:{name:"string"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"LngLatLike"}},transform:{defaultValue:null,description:"",name:"transform",required:!1,type:{name:"ThreeModelTransform | undefined"}},init:{defaultValue:null,description:"",name:"init",required:!1,type:{name:"(() => void) | undefined"}},onDone:{defaultValue:null,description:"",name:"onDone",required:!1,type:{name:"(() => void) | undefined"}},customLoaders:{defaultValue:null,description:"",name:"customLoaders",required:!1,type:{name:"Record<string, ModelLoader> | undefined"}},mapId:{defaultValue:null,description:"",name:"mapId",required:!1,type:{name:"string | undefined"}}}}}catch{}const mt={title:"MapComponents/MlThreeSplatLayer",component:G,argTypes:{options:{control:{type:"object"}}},decorators:We},lt=()=>{const[i,e]=z.useState(!0),[t,s]=z.useState(100),[a,r]=z.useState({x:270,y:0,z:5}),[o,h]=z.useState({lng:7.0968,lat:50.736}),[u,p]=z.useState({x:0,y:0,z:30}),[d,c]=z.useState(!0),[n,m]=z.useState(!1),[l,f]=z.useState("translate"),y=je({mapId:"map_1"});return z.useEffect(()=>{y.map&&(y.map?.setZoom(17.5),y.map?.setPitch(44.5),y.map?.setCenter([7.096614581535903,50.736500960686556]))},[y.map]),D.jsxs(D.Fragment,{children:[i&&D.jsx(G,{url:"assets/splats/output.splat",position:[o.lng,o.lat],transform:{rotation:{x:a.x*Math.PI/180,y:a.y*Math.PI/180,z:a.z*Math.PI/180},scale:t,position:u}}),D.jsx(qe,{unmovableButtons:D.jsx($e,{variant:d?"contained":"outlined",onClick:()=>c(!d),children:"Sidebar"})}),D.jsxs(Ze,{open:d,setOpen:c,name:"Splat Config",children:[D.jsx(Xe,{showLayer:i,setShowLayer:e,scale:t,setScale:s,rotation:a,setRotation:r,mapPosition:o,setMapPosition:h,position:u,setPosition:p,layerName:"Splat",enableTransformControls:n,setEnableTransformControls:m,transformMode:l,setTransformMode:f}),D.jsxs(ue,{variant:"body2",sx:{mt:2,p:1,backgroundColor:"rgba(255,255,255,0.1)",borderRadius:1},children:["The splat used is from"," ",D.jsx(tt,{href:"https://www.patreon.com/posts/cluster-fly-141866089",target:"_blank",rel:"noopener",children:"Cluster Fly"})," ","by Dany Bittel published under CC."]})]})]})},R=lt.bind({});R.parameters={};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const [showLayer, setShowLayer] = useState(true);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState({
    x: 270,
    y: 0,
    z: 5
  });
  const [mapPosition, setMapPosition] = useState({
    lng: 7.0968,
    lat: 50.736
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    z: 30
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enableTransformControls, setEnableTransformControls] = useState(false);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const mapHook = useMap({
    mapId: 'map_1'
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map?.setZoom(17.5);
    mapHook.map?.setPitch(44.5);
    mapHook.map?.setCenter([7.096614581535903, 50.736500960686556]);
  }, [mapHook.map]);
  return <>
            {showLayer && <MlThreeSplatLayer url="assets/splats/output.splat" position={[mapPosition.lng, mapPosition.lat]} transform={{
      rotation: {
        x: rotation.x * Math.PI / 180,
        y: rotation.y * Math.PI / 180,
        z: rotation.z * Math.PI / 180
      },
      scale: scale,
      position: position
    }} />}
            <TopToolbar unmovableButtons={<Button variant={sidebarOpen ? 'contained' : 'outlined'} onClick={() => setSidebarOpen(!sidebarOpen)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} name="Splat Config">
                <MlThreeObjectControls showLayer={showLayer} setShowLayer={setShowLayer} scale={scale} setScale={setScale} rotation={rotation} setRotation={setRotation} mapPosition={mapPosition} setMapPosition={setMapPosition} position={position} setPosition={setPosition} layerName="Splat" enableTransformControls={enableTransformControls} setEnableTransformControls={setEnableTransformControls} transformMode={transformMode} setTransformMode={setTransformMode} />
                <Typography variant="body2" sx={{
        mt: 2,
        p: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1
      }}>
                    The splat used is from{' '}
                    <Link href="https://www.patreon.com/posts/cluster-fly-141866089" target="_blank" rel="noopener">
                        Cluster Fly
                    </Link>{' '}
                    by Dany Bittel published under CC.
                </Typography>
            </Sidebar>
        </>;
}`,...R.parameters?.docs?.source}}};const xt=["Default"];export{R as Default,xt as __namedExportsOrder,mt as default};
