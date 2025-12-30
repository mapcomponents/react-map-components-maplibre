import{ao as ye,ap as ve,aq as F,ar as Te,as as be,at as we,ag as I,au as Ce,av as Se,aw as ue,ax as ge,ay as pe,az as ke,aA as ze,aB as oe,E as Me,g as _,Q as he,f as K,aC as Ae,aD as $,aE as Ie,r as E,aa as _e,ab as De,V as q,aF as Z,aG as Ee,aH as X,p as U,aI as Pe,aJ as He,aK as Ue,aL as Re,z as Ve,B as Be,aM as Le,h as Fe,aN as Oe,aO as Ge,w as Ne,aP as We,L as de,F as me,X as O,ae as xe,af as te,ah as qe,ai as je,aj as $e,ak as Ze,al as Xe,am as Ye,an as Qe}from"./ThreeObjectControls-BMfkGiIz.js";import{r as b}from"./iframe-Cqv_qD0s.js";import"./preload-helper-D9Z9MdNV.js";import"./index-BDqr4hXD.js";function Je(l){return ve("MuiLink",l)}const Ke=ye("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),et=({theme:l,ownerState:e})=>{const t=e.color;if("colorSpace"in l&&l.colorSpace){const a=F(l,`palette.${t}.main`)||F(l,`palette.${t}`)||e.color;return l.alpha(a,.4)}const s=F(l,`palette.${t}.main`,!1)||F(l,`palette.${t}`,!1)||e.color,r=F(l,`palette.${t}.mainChannel`)||F(l,`palette.${t}Channel`);return"vars"in l&&r?`rgba(${r} / 0.4)`:Te(s,.4)},ie={primary:!0,secondary:!0,error:!0,info:!0,success:!0,warning:!0,textPrimary:!0,textSecondary:!0,textDisabled:!0},tt=l=>{const{classes:e,component:t,focusVisible:s,underline:r}=l,a={root:["root",`underline${ue(r)}`,t==="button"&&"button",s&&"focusVisible"]};return ge(a,Je,e)},st=Ce(pe,{name:"MuiLink",slot:"Root",overridesResolver:(l,e)=>{const{ownerState:t}=l;return[e.root,e[`underline${ue(t.underline)}`],t.component==="button"&&e.button]}})(ke(({theme:l})=>({variants:[{props:{underline:"none"},style:{textDecoration:"none"}},{props:{underline:"hover"},style:{textDecoration:"none","&:hover":{textDecoration:"underline"}}},{props:{underline:"always"},style:{textDecoration:"underline","&:hover":{textDecorationColor:"inherit"}}},{props:({underline:e,ownerState:t})=>e==="always"&&t.color!=="inherit",style:{textDecorationColor:"var(--Link-underlineColor)"}},{props:({underline:e,ownerState:t})=>e==="always"&&t.color==="inherit",style:l.colorSpace?{textDecorationColor:l.alpha("currentColor",.4)}:null},...Object.entries(l.palette).filter(ze()).map(([e])=>({props:{underline:"always",color:e},style:{"--Link-underlineColor":l.alpha((l.vars||l).palette[e].main,.4)}})),{props:{underline:"always",color:"textPrimary"},style:{"--Link-underlineColor":l.alpha((l.vars||l).palette.text.primary,.4)}},{props:{underline:"always",color:"textSecondary"},style:{"--Link-underlineColor":l.alpha((l.vars||l).palette.text.secondary,.4)}},{props:{underline:"always",color:"textDisabled"},style:{"--Link-underlineColor":(l.vars||l).palette.text.disabled}},{props:{component:"button"},style:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Ke.focusVisible}`]:{outline:"auto"}}}]}))),at=b.forwardRef(function(e,t){const s=be({props:e,name:"MuiLink"}),r=we(),{className:a,color:o="primary",component:u="a",onBlur:h,onFocus:p,TypographyClasses:d,underline:c="always",variant:n="inherit",sx:m,...i}=s,[v,S]=b.useState(!1),T=y=>{oe(y.target)||S(!1),h&&h(y)},w=y=>{oe(y.target)&&S(!0),p&&p(y)},C={...s,color:o,component:u,focusVisible:v,underline:c,variant:n},g=tt(C);return I.jsx(st,{color:o,className:Se(g.root,a),classes:d,component:u,onBlur:T,onFocus:w,ref:t,ownerState:C,variant:n,...i,sx:[...ie[o]===void 0?[{color:o}]:[],...Array.isArray(m)?m:[m]],style:{...i.style,...c==="always"&&o!=="inherit"&&!ie[o]&&{"--Link-underlineColor":et({theme:r,ownerState:C})}}})});function se(l,e,t){try{const s=l.next();s.done||!s.value?e(s):s.value.then(()=>e({done:s.done,value:void 0}),t)}catch(s){t(s)}}function ae(l=25){let e;return(t,s,r)=>{const a=performance.now();e===void 0||a-e>l?(e=a,setTimeout(()=>se(t,s,r),0)):se(t,s,r)}}function fe(l,e,t,s,r){const a=()=>{let o;const u=h=>{h.done?t(h.value):o===void 0?o=!0:a()};do{if(o=void 0,r?.aborted){s(new DOMException("Aborted","AbortError"));return}e(l,u,s),o===void 0&&(o=!1)}while(o)};a()}function rt(l,e){let t;return fe(l,se,s=>{t=s},s=>{throw s},e),t}function re(l,e,t){return new Promise((s,r)=>{fe(l,e,s,r,t)})}const nt=`
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
`,ot=`
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
`,G=l=>Ae.toHalfFloat(l);class le{static build(e=1){const t=new Ve;t.setIndex([0,1,2]);const s=new Be(new Float32Array([-3,-2,0,3,-2,0,0,4,0]),3);t.setAttribute("position",s);const r=new Le;r.setIndex(t.getIndex()),r.setAttribute("position",t.getAttribute("position"));const a=new Fe(new Float32Array(e),1,!1);return a.setUsage(Oe),r.setAttribute("splatIndex",a),r.instanceCount=0,r}}class P{static BATCH_SIZE=327680;static workCount=0;vertexCount=0;positions=null;hasInit=!1;splatIndex=null;depthValues=null;tempDepths=null;tempIndices=null;abortController=null;onmessage=null;terminate(){this.abortController?.abort(),this.abortController=null,this.vertexCount=0,this.positions=null,this.splatIndex=null,this.onmessage=null}initSortData(){if(this.hasInit||this.vertexCount<0)return;const e=this.vertexCount;this.depthValues=new Int32Array(e),this.splatIndex=new Uint32Array(e),this.tempDepths=new Int32Array(e),this.tempIndices=new Uint32Array(e),this.hasInit=!0}*sortData(e,t){this.hasInit||this.initSortData();const{positions:s,vertexCount:r,depthValues:a,splatIndex:o,tempDepths:u,tempIndices:h}=this;if(!s||!a||!o||!u||!h)return;let p=1/0;for(let n=0;n<r;n++){o[n]=n;const m=e[2]*s[4*n]+e[6]*s[4*n+1]+e[10]*s[4*n+2],i=Math.floor(m*4096);a[n]=i,p=Math.min(p,i)}t&&(P.workCount+=r,P.workCount>P.BATCH_SIZE&&(P.workCount=0,yield));const d=-p;for(let n=0;n<r;n++)a[n]+=d;const c=new Uint32Array(256);for(let n=0;n<32;n+=8){c.fill(0);for(let i=0;i<r;i++)c[a[i]>>n&255]++;let m=0;for(let i=0;i<c.length;i++){const v=c[i];c[i]=m,m+=v}for(let i=0;i<r;i++){const v=a[i]>>n&255,S=c[v]++;u[S]=a[i],h[S]=o[i]}a.set(u),o.set(h),t&&(P.workCount+=r,P.workCount>P.BATCH_SIZE&&(P.workCount=0,yield))}}init(e,t){this.positions=e,this.vertexCount=t,this.initSortData()}async sortDataAsync(e){this.abortController?.abort(),this.abortController=new AbortController;const t=this.abortController.signal;try{await re(this.sortData(e,!0),ae(),t),this.onmessage&&this.splatIndex&&this.onmessage(this.splatIndex)}catch(s){s instanceof Error&&s.name!=="AbortError"&&console.error("Splat sort error:",s)}finally{this.abortController=null}}}class ee{static build(e=0){return new Ge({uniforms:{invViewport:{value:new q},dataTextureSize:{value:new q},focal:{value:new q},covariancesATexture:{value:null},covariancesBTexture:{value:null},centersTexture:{value:null},colorsTexture:{value:null},shTexture0:{value:null},shTexture1:{value:null},shTexture2:{value:null}},defines:{SH_DEGREE:e},vertexShader:nt,fragmentShader:ot,transparent:!0,alphaTest:1,blending:We,depthTest:!0,depthWrite:!0,side:Ne})}static updateUniforms(e,t,s){const r=s.material;if(!r?.uniforms)return;const{uniforms:a}=r,o=e.getSize(new q);if(a.invViewport.value.set(1/o.x,1/o.y),t){const u=t._cleanProjectionMatrix,h=u?.elements??u??t.projectionMatrix.elements;a.focal.value.set(h[0]*.5*o.x,h[5]*.5*o.y)}if(s.covariancesATexture){const{width:u,height:h}=s.covariancesATexture.image;a.dataTextureSize.value.set(u,h),a.covariancesATexture.value=s.covariancesATexture,a.covariancesBTexture.value=s.covariancesBTexture,a.centersTexture.value=s.centersTexture,a.colorsTexture.value=s.colorsTexture,s.shTextures?.forEach((p,d)=>{a[`shTexture${d}`].value=p})}r.uniformsNeedUpdate=!0}}class N extends Me{static ROW_OUTPUT_LENGTH=32;static SPLAT_BATCH_SIZE=327680;vertexCount=0;worker=null;frameIdLastUpdate=-1;frameIdThisUpdate=0;cameraMatrix=null;internalModelViewMatrix=null;canPostToWorker=!1;covariancesATextureInternal=null;covariancesBTextureInternal=null;centersTextureInternal=null;colorsTextureInternal=null;splatPositions=null;splatPositions2=null;splatIndex=null;shTexturesInternal=null;splatsDataInternal=null;keepInRam=!1;oldDirection=new _;useRGBACovariants=!0;tmpCovariances=[0,0,0,0,0,0];sortIsDirty=!1;lastSortTime=0;sortThrottleMs=200;shDegreeValue=0;tempQuaternion=new he;tempPosition=new _;tempScale=new _;tempColor=new Uint8Array(4);tempMatrix=new K;isGaussianSplattingMesh=!0;readyToDisplay=!1;type="GaussianSplattingMesh";get shDegree(){return this.shDegreeValue}get splatsData(){return this.splatsDataInternal}get covariancesATexture(){return this.covariancesATextureInternal}get covariancesBTexture(){return this.covariancesBTextureInternal}get centersTexture(){return this.centersTextureInternal}get colorsTexture(){return this.colorsTextureInternal}get shTextures(){return this.shTexturesInternal}constructor(){super(),this.geometry=le.build(),this.material=ee.build(),this.setEnabled(!1)}setEnabled(e){this.visible=e}postToWorker(e=!1){const t=this.frameIdThisUpdate;if((e||t!==this.frameIdLastUpdate)&&this.worker&&this.cameraMatrix&&this.canPostToWorker){this.internalModelViewMatrix=new K().multiplyMatrices(this.cameraMatrix,this.matrixWorld);const s=this.cameraMatrix.clone().invert(),r=new K().multiplyMatrices(s,this.matrixWorld),a=new _(0,0,1).transformDirection(r),o=a.dot(this.oldDirection);if(e||Math.abs(o-1)>=.01)return this.oldDirection.copy(a),this.frameIdLastUpdate=t,this.canPostToWorker=!1,this.worker.sortDataAsync(this.internalModelViewMatrix.elements)}}onBeforeRender(e,t,s,r,a,o){this.frameIdThisUpdate=e.info.render.frame;const u=performance.now();u-this.lastSortTime>this.sortThrottleMs&&(this.lastSortTime=u,this.sortDataAsync(s).catch(h=>{h.name!=="AbortError"&&console.warn("Splat sorting error:",h)})),ee.updateUniforms(e,s,this),super.onBeforeRender(e,t,s,r,a,o)}loadDataAsync(e){return this.updateDataAsync(e)}dispose(){this.covariancesATextureInternal?.dispose(),this.covariancesBTextureInternal?.dispose(),this.centersTextureInternal?.dispose(),this.colorsTextureInternal?.dispose(),this.shTexturesInternal?.forEach(e=>e.dispose()),this.covariancesATextureInternal=null,this.covariancesBTextureInternal=null,this.centersTextureInternal=null,this.colorsTextureInternal=null,this.shTexturesInternal=null,this.worker?.terminate(),this.worker=null}copyTextures(e){this.covariancesATextureInternal=e.covariancesATexture?.clone()??null,this.covariancesBTextureInternal=e.covariancesBTexture?.clone()??null,this.centersTextureInternal=e.centersTexture?.clone()??null,this.colorsTextureInternal=e.colorsTexture?.clone()??null,e.shTexturesInternal&&(this.shTexturesInternal=e.shTexturesInternal.map(t=>t.clone()))}clone(){const e=new N;return e.geometry=this.geometry.clone(),e.material=this.material.clone(),e.vertexCount=this.vertexCount,e.copyTextures(this),e.splatPositions=this.splatPositions,e.readyToDisplay=!1,e.instantiateWorker(),e}makeSplatFromComponents(e,t,s,r,a,o,u,h,p,d,c){a.w=-a.w,r=r.multiplyScalar(2);const n=this.tempMatrix.elements,m=this.useRGBACovariants?4:2;this.splatPositions[4*e+0]=s.x,this.splatPositions[4*e+1]=s.y,this.splatPositions[4*e+2]=s.z,this.splatPositions2[4*e+0]=s.x,this.splatPositions2[4*e+1]=s.y,this.splatPositions2[4*e+2]=s.z,d.min(s),c.max(s);const{x:i,y:v,z:S,w:T}=a,w=i+i,C=v+v,g=S+S,y=i*w,f=i*C,x=i*g,z=v*C,R=v*g,L=S*g,V=T*w,A=T*C,W=T*g,{x:B,y:Y,z:Q}=r;n[0]=(1-(z+L))*B,n[1]=(f+W)*Y,n[2]=(x-A)*Q,n[4]=(f-W)*B,n[5]=(1-(y+L))*Y,n[6]=(R+V)*Q,n[8]=(x+A)*B,n[9]=(R-V)*Y,n[10]=(1-(y+z))*Q;const M=this.tmpCovariances;M[0]=n[0]*n[0]+n[1]*n[1]+n[2]*n[2],M[1]=n[0]*n[4]+n[1]*n[5]+n[2]*n[6],M[2]=n[0]*n[8]+n[1]*n[9]+n[2]*n[10],M[3]=n[4]*n[4]+n[5]*n[5]+n[6]*n[6],M[4]=n[4]*n[8]+n[5]*n[9]+n[6]*n[10],M[5]=n[8]*n[8]+n[9]*n[9]+n[10]*n[10];let D=-1e4;for(let J=0;J<6;J++)D=Math.max(D,Math.abs(M[J]));this.splatPositions[4*e+3]=D,this.splatPositions2[4*e+3]=D,u[t*4+0]=G(M[0]/D),u[t*4+1]=G(M[1]/D),u[t*4+2]=G(M[2]/D),u[t*4+3]=G(M[3]/D),h[t*m+0]=G(M[4]/D),h[t*m+1]=G(M[5]/D),p[t*4+0]=o[0],p[t*4+1]=o[1],p[t*4+2]=o[2],p[t*4+3]=o[3]}makeSplatFromBuffer(e,t,s,r,a,o,u,h,p){const d=8*e,c=32*e;this.tempPosition.set(s[d],s[d+1],s[d+2]),this.tempScale.set(s[d+3],s[d+4],s[d+5]),this.tempQuaternion.set((r[c+29]-127.5)/127.5,(r[c+30]-127.5)/127.5,(r[c+31]-127.5)/127.5,(r[c+28]-127.5)/127.5).normalize(),this.tempColor[0]=r[c+24],this.tempColor[1]=r[c+25],this.tempColor[2]=r[c+26],this.tempColor[3]=r[c+27],this.makeSplatFromComponents(e,t,this.tempPosition,this.tempScale,this.tempQuaternion,this.tempColor,a,o,u,h,p)}updateTextures(e,t,s,r){const a=this.getTextureSize(this.vertexCount),o=(d,c,n,m)=>{const i=new Z(d,c,n,m,Ee,X,E,E,U,U);return i.generateMipmaps=!1,i.needsUpdate=!0,i},u=(d,c,n,m)=>{const i=new Z(d,c,n,m,Pe,X,E,E,U,U);return i.generateMipmaps=!1,i.needsUpdate=!0,i},h=(d,c,n,m)=>{const i=new Z(d,c,n,m,He,X,E,E,U,U);return i.generateMipmaps=!1,i.needsUpdate=!0,i},p=(d,c,n,m)=>{const i=new Z(d,c,n,m,Ue,X,E,E,U,U);return i.generateMipmaps=!1,i.needsUpdate=!0,i};this.covariancesATextureInternal=p(e,a.x,a.y,$),this.covariancesBTextureInternal=p(t,a.x,a.y,this.useRGBACovariants?$:Ie),this.centersTextureInternal=o(this.splatPositions,a.x,a.y,$),this.colorsTextureInternal=u(s,a.x,a.y,$),r&&(this.shTexturesInternal=r.map(d=>{const c=new Uint32Array(d.buffer),n=h(c,a.x,a.y,Re);return n.wrapS=E,n.wrapT=E,n})),this.instantiateWorker()}updateBoundingInfo(e,t){this.boundingBox=new _e(e,t),this.boundingSphere=this.boundingBox.getBoundingSphere(new De)}*updateDataCoroutine(e,t,s){this.covariancesATextureInternal||(this.readyToDisplay=!1);const r=new Uint8Array(e),a=new Float32Array(r.buffer);this.keepInRam&&(this.splatsDataInternal=e),this.shDegreeValue=s?s.length:0;const o=r.length/N.ROW_OUTPUT_LENGTH;o!==this.vertexCount&&(this.vertexCount=o,this.geometry=le.build(this.vertexCount),this.material=ee.build(this.shDegreeValue),this.updateSplatIndexBuffer(this.vertexCount));const u=this.getTextureSize(o),h=u.x*u.y;this.splatPositions=new Float32Array(4*h),this.splatPositions2=new Float32Array(4*o);const p=new Uint16Array(h*4),d=new Uint16Array((this.useRGBACovariants?4:2)*h),c=new Uint8Array(h*4),n=new _(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),m=new _(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<o;i++)this.makeSplatFromBuffer(i,i,a,r,p,d,c,n,m),t&&i%N.SPLAT_BATCH_SIZE===0&&(yield);this.updateTextures(p,d,c,s),this.updateBoundingInfo(n,m),this.setEnabled(!0),this.postToWorker(!0)}async updateDataAsync(e,t){return re(this.updateDataCoroutine(e,!0,t),ae())}updateData(e,t){rt(this.updateDataCoroutine(e,!1,t))}sortDataAsync(e,t=!1){return!this.worker||!e?Promise.resolve():(this.cameraMatrix=e.matrixWorldInverse,this.postToWorker(t)??Promise.resolve())}updateSplatIndexBuffer(e){if(!this.splatIndex||e>this.splatIndex.length){this.splatIndex=new Float32Array(e);for(let t=0;t<e;t++)this.splatIndex[t]=t;this.geometry.attributes.splatIndex.set(this.splatIndex),this.geometry.attributes.splatIndex.needsUpdate=!0}this.geometry.instanceCount=e}instantiateWorker(){this.vertexCount&&(this.updateSplatIndexBuffer(this.vertexCount),this.worker?.terminate(),this.worker=new P,this.worker.init(this.splatPositions2,this.vertexCount),this.canPostToWorker=!0,this.worker.onmessage=e=>{if(this.splatIndex&&e){for(let t=0;t<this.vertexCount;t++)this.splatIndex[t]=e[t];this.geometry.attributes.splatIndex.set(this.splatIndex)}this.geometry.attributes.splatIndex.needsUpdate=!0,this.canPostToWorker=!0,this.readyToDisplay=!0,this.sortIsDirty&&(this.postToWorker(!0),this.sortIsDirty=!1)})}getTextureSize(e){let r=1;for(;4096*r<e;)r*=2;return r>4096&&(console.error(`GaussianSplatting texture size: (4096, ${r}), maxTextureSize: 4096`),r=4096),new q(4096,r)}}class it extends de{load(e,t,s,r){const a=new me(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,o=>this.parse(o,t,r),s,r)}parse(e,t,s){const r=new N;r.loadDataAsync(e).then(()=>t(r)).catch(a=>{s?s(a):console.error(a)})}}const H=(l,e)=>{const t=(1<<e)-1;return(l&t)/t},ce=(l,e)=>{e.x=H(l>>>21,11),e.y=H(l>>>11,10),e.z=H(l,11)},lt=(l,e)=>{e[0]=H(l>>>24,8)*255,e[1]=H(l>>>16,8)*255,e[2]=H(l>>>8,8)*255,e[3]=H(l,8)*255},ct=(l,e)=>{const t=1/(Math.sqrt(2)*.5),s=(H(l>>>20,10)-.5)*t,r=(H(l>>>10,10)-.5)*t,a=(H(l,10)-.5)*t,o=Math.sqrt(1-(s*s+r*r+a*a));switch(l>>>30){case 0:e.set(o,s,r,a);break;case 1:e.set(s,o,r,a);break;case 2:e.set(s,r,o,a);break;case 3:e.set(s,r,a,o);break}};class k extends de{static ROW_OUTPUT_LENGTH=32;static SH_C0=.28209479177387814;static PLY_CONVERSION_BATCH_SIZE=32768;load(e,t,s,r){const a=new me(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,o=>this.parse(o,t,r),s,r)}parse(e,t,s){k.ConvertPLYToSplatAsync(e).then(r=>{const a=new N;return a.loadDataAsync(r).then(()=>t(a))}).catch(r=>{s?s(r):console.error(r)})}static async ConvertPLYToSplatAsync(e){return re(k.ConvertPLYToSplat(e,!0),ae())}static*ConvertPLYToSplat(e,t=!1){const s=k.ParseHeader(e);if(!s)return e;const r={value:0},a=k.getCompressedChunks(s,r);for(let o=0;o<s.vertexCount;o++)k.getSplat(s,o,a,r),t&&o%k.PLY_CONVERSION_BATCH_SIZE===0&&(yield);return s.buffer}static getCompressedChunks(e,t){if(!e.chunkCount)return null;const{dataView:s,chunkProperties:r,rowChunkLength:a,chunkCount:o}=e,u=[];for(let h=0;h<o;h++){const p={min:new _,max:new _,minScale:new _,maxScale:new _};for(const d of r){if(d.type!==0)continue;const c=s.getFloat32(d.offset+t.value,!0);switch(d.value){case 0:p.min.x=c;break;case 1:p.min.y=c;break;case 2:p.min.z=c;break;case 3:p.max.x=c;break;case 4:p.max.y=c;break;case 5:p.max.z=c;break;case 6:p.minScale.x=c;break;case 7:p.minScale.y=c;break;case 8:p.minScale.z=c;break;case 9:p.maxScale.x=c;break;case 10:p.maxScale.y=c;break;case 11:p.maxScale.z=c;break}}u.push(p),t.value+=a}return u}static getSplat(e,t,s,r){const a=new he,o=new _,{buffer:u,dataView:h,vertexProperties:p,rowVertexLength:d}=e,c=k.ROW_OUTPUT_LENGTH,n=new Float32Array(u,t*c,3),m=new Float32Array(u,t*c+12,3),i=new Uint8ClampedArray(u,t*c+24,4),v=new Uint8ClampedArray(u,t*c+28,4),S=t>>8;let T=255,w=0,C=0,g=0;for(const y of p){let f;switch(y.type){case 0:f=h.getFloat32(r.value+y.offset,!0);break;case 1:f=h.getInt32(r.value+y.offset,!0);break;case 2:f=h.getUint32(r.value+y.offset,!0);break;case 3:f=h.getFloat64(r.value+y.offset,!0);break;case 4:f=h.getUint8(r.value+y.offset);break;default:continue}const x=s?.[S];switch(y.value){case 12:ce(f,o),n[0]=O.lerp(x.min.x,x.max.x,o.x),n[1]=-O.lerp(x.min.y,x.max.y,o.y),n[2]=O.lerp(x.min.z,x.max.z,o.z);break;case 13:ct(f,a),T=a.w,w=a.z,C=a.y,g=a.x;break;case 14:ce(f,o),m[0]=Math.exp(O.lerp(x.minScale.x,x.maxScale.x,o.x)),m[1]=Math.exp(O.lerp(x.minScale.y,x.maxScale.y,o.y)),m[2]=Math.exp(O.lerp(x.minScale.z,x.maxScale.z,o.z));break;case 15:lt(f,i);break;case 16:n[0]=f;break;case 17:n[1]=f;break;case 18:n[2]=f;break;case 19:m[0]=Math.exp(f);break;case 20:m[1]=Math.exp(f);break;case 21:m[2]=Math.exp(f);break;case 22:i[0]=f;break;case 23:i[1]=f;break;case 24:i[2]=f;break;case 26:i[0]=(.5+k.SH_C0*f)*255;break;case 27:i[1]=(.5+k.SH_C0*f)*255;break;case 28:i[2]=(.5+k.SH_C0*f)*255;break;case 29:i[3]=(.5+k.SH_C0*f)*255;break;case 25:i[3]=1/(1+Math.exp(-f))*255;break;case 30:T=f;break;case 31:w=f;break;case 32:C=f;break;case 33:g=f;break}}a.set(w,C,g,T).normalize(),v[0]=a.w*128+128,v[1]=a.x*128+128,v[2]=a.y*128+128,v[3]=a.z*128+128,r.value+=d}static typeNameToEnum(e){switch(e){case"float":return 0;case"int":return 1;case"uint":return 2;case"double":return 3;case"uchar":return 4;default:return 5}}static valueNameToEnum(e){return{min_x:0,min_y:1,min_z:2,max_x:3,max_y:4,max_z:5,min_scale_x:6,min_scale_y:7,min_scale_z:8,max_scale_x:9,max_scale_y:10,max_scale_z:11,packed_position:12,packed_rotation:13,packed_scale:14,packed_color:15,x:16,y:17,z:18,scale_0:19,scale_1:20,scale_2:21,diffuse_red:22,red:22,diffuse_green:23,green:23,diffuse_blue:24,blue:24,f_dc_0:26,f_dc_1:27,f_dc_2:28,f_dc_3:29,opacity:25,rot_0:30,rot_1:31,rot_2:32,rot_3:33}[e]??34}static ParseHeader(e){const t=new Uint8Array(e),s=new TextDecoder().decode(t.slice(0,1024*10)),r=`end_header
`,a=s.indexOf(r);if(a<0)return null;const o=/element vertex (\d+)\n/.exec(s);if(!o)return null;const u=parseInt(o[1]),h=/element chunk (\d+)\n/.exec(s),p=h?parseInt(h[1]):0,d={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1,list:0};let c;(T=>{T[T.Vertex=0]="Vertex",T[T.Chunk=1]="Chunk"})(c||(c={}));let n=1,m=0,i=0;const v=[],S=[];for(const T of s.slice(0,a).split(`
`))if(T.startsWith("property ")){const[,w,C]=T.split(" "),g={value:k.valueNameToEnum(C),type:k.typeNameToEnum(w),offset:n===1?i:m};n===1?(S.push(g),i+=d[w]??0):(v.push(g),m+=d[w]??0)}else if(T.startsWith("element ")){const[,w]=T.split(" ");n=w==="chunk"?1:0}return{vertexCount:u,chunkCount:p,rowVertexLength:m,rowChunkLength:i,vertexProperties:v,chunkProperties:S,dataView:new DataView(e,a+r.length),buffer:new ArrayBuffer(k.ROW_OUTPUT_LENGTH*u)}}}const ne=l=>{const{url:e,position:t,mapPosition:s,altitude:r,rotation:a,scale:o,enableTransformControls:u,transformMode:h,onTransformChange:p,init:d,onDone:c}=l,{scene:n,worldMatrixInv:m}=xe(),i=b.useRef(void 0),[v,S]=b.useState(void 0),T=b.useRef(d),w=b.useRef(c);T.current=d,w.current=c;const C=b.useRef({position:t,mapPosition:s,altitude:r,rotation:a,scale:o});C.current={position:t,mapPosition:s,altitude:r,rotation:a,scale:o};const g=b.useRef(m);return g.current=m,b.useEffect(()=>{if(!n)return;typeof T.current=="function"&&T.current();const y=e.split(".").pop()?.toLowerCase(),f=x=>{const{position:z,mapPosition:R,altitude:L,rotation:V,scale:A}=C.current,W=g.current;if(R&&W){const B=te.toScenePosition(W,R,L);x.position.set(B.x,B.y,B.z)}else z&&x.position.set(z.x,z.y,z.z);V&&x.rotation.set(V.x,V.y,V.z),A&&(typeof A=="number"?x.scale.set(A,A,A):x.scale.set(A.x,A.y,A.z)),x.updateMatrixWorld(!0),i.current=x,n.add(x),S(x),typeof w.current=="function"&&w.current()};return y==="splat"?new it().load(e,z=>{f(z)}):y==="ply"?new k().load(e,z=>{f(z)}):console.warn("MlThreeSplatLayer: Unsupported file extension",y),()=>{i.current&&(n.remove(i.current),"dispose"in i.current&&typeof i.current.dispose=="function"&&i.current.dispose(),i.current=void 0,S(void 0))}},[n,e]),b.useEffect(()=>{if(v){if(s&&m){const y=te.toScenePosition(m,s,r);v.position.set(y.x,y.y,y.z)}else t&&v.position.set(t.x,t.y,t.z);a&&v.rotation.set(a.x,a.y,a.z),o&&(typeof o=="number"?v.scale.set(o,o,o):v.scale.set(o.x,o.y,o.z)),v.updateMatrixWorld(!0)}},[v,t,s,r,a,o,m]),u&&v?I.jsx(qe,{target:v,mode:h,onObjectChange:p}):null};ne.__docgenInfo={description:"",methods:[],displayName:"MlThreeSplatLayer",props:{mapId:{required:!1,tsType:{name:"string"},description:""},url:{required:!0,tsType:{name:"string"},description:""},position:{required:!1,tsType:{name:"signature",type:"object",raw:"{ x: number; y: number; z: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"z",value:{name:"number",required:!0}}]}},description:""},mapPosition:{required:!1,tsType:{name:"LngLatLike"},description:""},altitude:{required:!1,tsType:{name:"number"},description:""},rotation:{required:!1,tsType:{name:"signature",type:"object",raw:"{ x: number; y: number; z: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"z",value:{name:"number",required:!0}}]}},description:""},scale:{required:!1,tsType:{name:"union",raw:"{ x: number; y: number; z: number } | number",elements:[{name:"signature",type:"object",raw:"{ x: number; y: number; z: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"z",value:{name:"number",required:!0}}]}},{name:"number"}]},description:""},enableTransformControls:{required:!1,tsType:{name:"boolean"},description:""},transformMode:{required:!1,tsType:{name:"union",raw:"'translate' | 'rotate' | 'scale'",elements:[{name:"literal",value:"'translate'"},{name:"literal",value:"'rotate'"},{name:"literal",value:"'scale'"}]},description:""},onTransformChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(object: THREE.Object3D) => void",signature:{arguments:[{type:{name:"THREE.Object3D"},name:"object"}],return:{name:"void"}}},description:""},init:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onDone:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const xt={title:"MapComponents/MlThreeSplatLayer",component:ne,argTypes:{options:{control:{type:"object"}}},decorators:je},ut=()=>{const{worldMatrix:l}=xe(),[e,t]=b.useState(!0),[s,r]=b.useState(100),[a,o]=b.useState({x:270,y:0,z:5}),[u,h]=b.useState(!0),[p,d]=b.useState({lng:7.0968,lat:50.736}),[c,n]=b.useState(30),[m,i]=b.useState({x:0,y:0,z:100}),[v,S]=b.useState(!1),[T,w]=b.useState("translate"),[C,g]=b.useState(!0),y=$e({mapId:"map_1"});b.useEffect(()=>{y.map&&(y.map?.setZoom(17.5),y.map?.setPitch(44.5),y.map?.setCenter([7.096614581535903,50.736500960686556]))},[y.map]),b.useEffect(()=>{y.map&&u&&y.map.setCenter([p.lng,p.lat])},[u,y.map]);const f=x=>{if(o({x:x.rotation.x*180/Math.PI,y:x.rotation.y*180/Math.PI,z:x.rotation.z*180/Math.PI}),r(x.scale.x),u&&l){const[z,R,L]=te.toMapPosition(l,x.position);d({lng:z,lat:R}),n(parseFloat(L.toFixed(2)))}else i({x:x.position.x,y:x.position.y,z:x.position.z})};return I.jsxs(I.Fragment,{children:[e&&I.jsx(ne,{url:"assets/splats/output.splat",rotation:{x:a.x*Math.PI/180,y:a.y*Math.PI/180,z:a.z*Math.PI/180},scale:s,enableTransformControls:v,transformMode:T,onTransformChange:f,...u?{mapPosition:[p.lng,p.lat],altitude:c}:{position:m}}),I.jsx(Ze,{unmovableButtons:I.jsx(Xe,{variant:C?"contained":"outlined",onClick:()=>g(!C),children:"Sidebar"})}),I.jsxs(Ye,{open:C,setOpen:g,name:"Splat Config",children:[I.jsx(Qe,{showLayer:e,setShowLayer:t,scale:s,setScale:r,rotation:a,setRotation:o,useMapCoords:u,setUseMapCoords:h,mapPosition:p,setMapPosition:d,altitude:c,setAltitude:n,position:m,setPosition:i,enableTransformControls:v,setEnableTransformControls:S,transformMode:T,setTransformMode:w,layerName:"Splat"}),I.jsxs(pe,{variant:"body2",sx:{mt:2,p:1,backgroundColor:"rgba(255,255,255,0.1)",borderRadius:1},children:["The splat used is from"," ",I.jsx(at,{href:"https://www.patreon.com/posts/cluster-fly-141866089",target:"_blank",rel:"noopener",children:"Cluster Fly"})," ","by Dany Bittel published under CC."]})]})]})},j=ut.bind({});j.parameters={};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const {
    worldMatrix
  } = useThree();
  const [showLayer, setShowLayer] = useState(true);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState({
    x: 270,
    y: 0,
    z: 5
  });
  const [useMapCoords, setUseMapCoords] = useState(true);
  const [mapPosition, setMapPosition] = useState({
    lng: 7.0968,
    lat: 50.736
  });
  const [altitude, setAltitude] = useState(30);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    z: 100
  });
  const [enableTransformControls, setEnableTransformControls] = useState(false);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mapHook = useMap({
    mapId: 'map_1'
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map?.setZoom(17.5);
    mapHook.map?.setPitch(44.5);
    mapHook.map?.setCenter([7.096614581535903, 50.736500960686556]);
  }, [mapHook.map]);

  // Center map on position when switching coordinate modes
  useEffect(() => {
    if (!mapHook.map) return;
    if (useMapCoords) {
      mapHook.map.setCenter([mapPosition.lng, mapPosition.lat]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMapCoords, mapHook.map]);
  const handleTransformChange = (object: THREE.Object3D) => {
    setRotation({
      x: object.rotation.x * 180 / Math.PI,
      y: object.rotation.y * 180 / Math.PI,
      z: object.rotation.z * 180 / Math.PI
    });
    setScale(object.scale.x);
    if (useMapCoords && worldMatrix) {
      const [lng, lat, alt] = ThreejsUtils.toMapPosition(worldMatrix, object.position);
      setMapPosition({
        lng,
        lat
      });
      setAltitude(parseFloat(alt.toFixed(2)));
    } else {
      setPosition({
        x: object.position.x,
        y: object.position.y,
        z: object.position.z
      });
    }
  };
  return <>
            {showLayer && <MlThreeSplatLayer url="assets/splats/output.splat" rotation={{
      x: rotation.x * Math.PI / 180,
      y: rotation.y * Math.PI / 180,
      z: rotation.z * Math.PI / 180
    }} scale={scale} enableTransformControls={enableTransformControls} transformMode={transformMode} onTransformChange={handleTransformChange} {...useMapCoords ? {
      mapPosition: [mapPosition.lng, mapPosition.lat],
      altitude: altitude
    } : {
      position: position
    }} />}

            <TopToolbar unmovableButtons={<Button variant={sidebarOpen ? 'contained' : 'outlined'} onClick={() => setSidebarOpen(!sidebarOpen)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} name="Splat Config">
                <ThreeObjectControls showLayer={showLayer} setShowLayer={setShowLayer} scale={scale} setScale={setScale} rotation={rotation} setRotation={setRotation} useMapCoords={useMapCoords} setUseMapCoords={setUseMapCoords} mapPosition={mapPosition} setMapPosition={setMapPosition} altitude={altitude} setAltitude={setAltitude} position={position} setPosition={setPosition} enableTransformControls={enableTransformControls} setEnableTransformControls={setEnableTransformControls} transformMode={transformMode} setTransformMode={setTransformMode} layerName="Splat" />
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
}`,...j.parameters?.docs?.source}}};const ft=["Default"];export{j as Default,ft as __namedExportsOrder,xt as default};
