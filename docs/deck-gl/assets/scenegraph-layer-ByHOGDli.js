import{W as V,X as Xt,Y as Vt,Z as Le,u as K,_ as Qt,V as Yt,i as kt,c as we,a as b,$ as Wt,a0 as Bt,a1 as zt,a2 as Zt,a3 as re,a4 as qt,a5 as $t,b as en,a6 as ht,a7 as tn,a8 as nn,a9 as rn,aa as sn,ab as on,ac as an,ad as cn,ae as Ke,q as fn,af as Ae,ag as ln,ah as un,ai as An,aj as dn,ak as Bn,al as hn,R as v,s as x,h as G,am as mn,K as pn,C as de,M as Cn,G as gn,an as bn,ao as En,A as mt,ap as In,f as Mn,p as Tn,g as Fn,m as Be}from"./useDeckGl-BLLSfejp.js";async function pt(t,e,n,r){return r._parse(t,e,n,r)}function Rn(t){globalThis.loaders||={},globalThis.loaders.modules||={},Object.assign(globalThis.loaders.modules,t)}function yn(t){return globalThis.loaders?.modules?.[t]||null}const he={};async function D(t,e=null,n={},r=null){return e&&(t=_n(t,e,n,r)),he[t]=he[t]||Gn(t),await he[t]}function _n(t,e,n={},r=null){if(!n.useLocalLibraries&&t.startsWith("http"))return t;r=r||t;const s=n.modules||{};return s[r]?s[r]:V?n.CDN?(Xt(n.CDN.startsWith("http")),`${n.CDN}/${e}@${Vt}/dist/libs/${r}`):Le?`../src/libs/${r}`:`modules/${e}/src/libs/${r}`:`modules/${e}/dist/libs/${r}`}async function Gn(t){if(t.endsWith("wasm"))return await vn(t);if(!V)try{const{requireFromFile:n}=globalThis.loaders||{};return await n?.(t)}catch(n){return console.error(n),null}if(Le)return importScripts(t);const e=await Sn(t);return Dn(e,t)}function Dn(t,e){if(!V){const{requireFromString:r}=globalThis.loaders||{};return r?.(t,e)}if(Le)return eval.call(globalThis,t),null;const n=document.createElement("script");n.id=e;try{n.appendChild(document.createTextNode(t))}catch{n.text=t}return document.body.appendChild(n),null}async function vn(t){const{readFileAsArrayBuffer:e}=globalThis.loaders||{};return V||!e||t.startsWith("http")?await(await fetch(t)).arrayBuffer():await e(t)}async function Sn(t){const{readFileAsText:e}=globalThis.loaders||{};return V||!e||t.startsWith("http")?await(await fetch(t)).text():await e(t)}function On(t,e=5){return typeof t=="string"?t.slice(0,e):ArrayBuffer.isView(t)?je(t.buffer,t.byteOffset,e):t instanceof ArrayBuffer?je(t,0,e):""}function je(t,e,n){if(t.byteLength<=e+n)return"";const r=new DataView(t);let s="";for(let o=0;o<n;o++)s+=String.fromCharCode(r.getUint8(e+o));return s}function Ln(t){try{return JSON.parse(t)}catch{throw new Error(`Failed to parse JSON from data starting with "${On(t)}"`)}}function Q(t,e){return K(t>=0),K(e>0),t+(e-1)&-4}function xn(t,e,n){let r;if(t instanceof ArrayBuffer)r=new Uint8Array(t);else{const s=t.byteOffset,o=t.byteLength;r=new Uint8Array(t.buffer||t.arrayBuffer,s,o)}return e.set(r,n),n+Q(r.byteLength,4)}function Hn(t){switch(t.constructor){case Int8Array:return"int8";case Uint8Array:case Uint8ClampedArray:return"uint8";case Int16Array:return"int16";case Uint16Array:return"uint16";case Int32Array:return"int32";case Uint32Array:return"uint32";case Float32Array:return"float32";case Float64Array:return"float64";default:return"null"}}function Pn(t){let e=1/0,n=1/0,r=1/0,s=-1/0,o=-1/0,i=-1/0;const a=t.POSITION?t.POSITION.value:[],c=a&&a.length;for(let f=0;f<c;f+=3){const l=a[f],u=a[f+1],A=a[f+2];e=l<e?l:e,n=u<n?u:n,r=A<r?A:r,s=l>s?l:s,o=u>o?u:o,i=A>i?A:i}return[[e,n,r],[s,o,i]]}function Un(t,e,n){const r=Hn(e.value),s=n||Nn(e);return{name:t,type:{type:"fixed-size-list",listSize:e.size,children:[{name:"value",type:r}]},nullable:!1,metadata:s}}function Nn(t){const e={};return"byteOffset"in t&&(e.byteOffset=t.byteOffset.toString(10)),"byteStride"in t&&(e.byteStride=t.byteStride.toString(10)),"normalized"in t&&(e.normalized=t.normalized.toString()),e}const me={};function Jn(t){if(me[t]===void 0){const e=Qt?Kn(t):wn(t);me[t]=e}return me[t]}function wn(t){const e=["image/png","image/jpeg","image/gif"],n=globalThis.loaders?.imageFormatsNode||e;return!!globalThis.loaders?.parseImageNode&&n.includes(t)}function Kn(t){switch(t){case"image/avif":case"image/webp":return jn(t);default:return!0}}function jn(t){try{return document.createElement("canvas").toDataURL(t).indexOf(`data:${t}`)===0}catch{return!1}}let k;class xe extends Yt{static get ZERO(){return k||(k=new xe(0,0,0,0),Object.freeze(k)),k}constructor(e=0,n=0,r=0,s=0){super(-0,-0,-0,-0),kt(e)&&arguments.length===1?this.copy(e):(we.debug&&(b(e),b(n),b(r),b(s)),this[0]=e,this[1]=n,this[2]=r,this[3]=s)}set(e,n,r,s){return this[0]=e,this[1]=n,this[2]=r,this[3]=s,this.check()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this.check()}fromObject(e){return we.debug&&(b(e.x),b(e.y),b(e.z),b(e.w)),this[0]=e.x,this[1]=e.y,this[2]=e.z,this[3]=e.w,this}toObject(e){return e.x=this[0],e.y=this[1],e.z=this[2],e.w=this[3],e}get ELEMENTS(){return 4}get z(){return this[2]}set z(e){this[2]=b(e)}get w(){return this[3]}set w(e){this[3]=b(e)}transform(e){return Wt(this,this,e),this.check()}transformByMatrix3(e){return Bt(this,this,e),this.check()}transformByMatrix2(e){return zt(this,this,e),this.check()}transformByQuaternion(e){return Zt(this,this,e),this.check()}applyMatrix4(e){return e.transform(this,this),this}}function Xn(){const t=new re(9);return re!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function Vn(t,e){if(t===e){const n=e[1],r=e[2],s=e[5];t[1]=e[3],t[2]=e[6],t[3]=n,t[5]=e[7],t[6]=r,t[7]=s}else t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8];return t}function Qn(t,e){const n=e[0],r=e[1],s=e[2],o=e[3],i=e[4],a=e[5],c=e[6],f=e[7],l=e[8],u=l*i-a*f,A=-l*o+a*c,d=f*o-i*c;let B=n*u+r*A+s*d;return B?(B=1/B,t[0]=u*B,t[1]=(-l*r+s*f)*B,t[2]=(a*r-s*i)*B,t[3]=A*B,t[4]=(l*n-s*c)*B,t[5]=(-a*n+s*o)*B,t[6]=d*B,t[7]=(-f*n+r*c)*B,t[8]=(i*n-r*o)*B,t):null}function Yn(t){const e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],i=t[5],a=t[6],c=t[7],f=t[8];return e*(f*o-i*c)+n*(-f*s+i*a)+r*(c*s-o*a)}function Xe(t,e,n){const r=e[0],s=e[1],o=e[2],i=e[3],a=e[4],c=e[5],f=e[6],l=e[7],u=e[8],A=n[0],d=n[1],B=n[2],h=n[3],p=n[4],C=n[5],I=n[6],m=n[7],N=n[8];return t[0]=A*r+d*i+B*f,t[1]=A*s+d*a+B*l,t[2]=A*o+d*c+B*u,t[3]=h*r+p*i+C*f,t[4]=h*s+p*a+C*l,t[5]=h*o+p*c+C*u,t[6]=I*r+m*i+N*f,t[7]=I*s+m*a+N*l,t[8]=I*o+m*c+N*u,t}function kn(t,e,n){const r=e[0],s=e[1],o=e[2],i=e[3],a=e[4],c=e[5],f=e[6],l=e[7],u=e[8],A=n[0],d=n[1];return t[0]=r,t[1]=s,t[2]=o,t[3]=i,t[4]=a,t[5]=c,t[6]=A*r+d*i+f,t[7]=A*s+d*a+l,t[8]=A*o+d*c+u,t}function Wn(t,e,n){const r=e[0],s=e[1],o=e[2],i=e[3],a=e[4],c=e[5],f=e[6],l=e[7],u=e[8],A=Math.sin(n),d=Math.cos(n);return t[0]=d*r+A*i,t[1]=d*s+A*a,t[2]=d*o+A*c,t[3]=d*i-A*r,t[4]=d*a-A*s,t[5]=d*c-A*o,t[6]=f,t[7]=l,t[8]=u,t}function Ve(t,e,n){const r=n[0],s=n[1];return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=s*e[3],t[4]=s*e[4],t[5]=s*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function zn(t,e){const n=e[0],r=e[1],s=e[2],o=e[3],i=n+n,a=r+r,c=s+s,f=n*i,l=r*i,u=r*a,A=s*i,d=s*a,B=s*c,h=o*i,p=o*a,C=o*c;return t[0]=1-u-B,t[3]=l-C,t[6]=A+p,t[1]=l+C,t[4]=1-f-B,t[7]=d-h,t[2]=A-p,t[5]=d+h,t[8]=1-f-u,t}var _e;(function(t){t[t.COL0ROW0=0]="COL0ROW0",t[t.COL0ROW1=1]="COL0ROW1",t[t.COL0ROW2=2]="COL0ROW2",t[t.COL1ROW0=3]="COL1ROW0",t[t.COL1ROW1=4]="COL1ROW1",t[t.COL1ROW2=5]="COL1ROW2",t[t.COL2ROW0=6]="COL2ROW0",t[t.COL2ROW1=7]="COL2ROW1",t[t.COL2ROW2=8]="COL2ROW2"})(_e||(_e={}));const Zn=Object.freeze([1,0,0,0,1,0,0,0,1]);class Y extends qt{static get IDENTITY(){return $n()}static get ZERO(){return qn()}get ELEMENTS(){return 9}get RANK(){return 3}get INDICES(){return _e}constructor(e,...n){super(-0,-0,-0,-0,-0,-0,-0,-0,-0),arguments.length===1&&Array.isArray(e)?this.copy(e):n.length>0?this.copy([e,...n]):this.identity()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this[4]=e[4],this[5]=e[5],this[6]=e[6],this[7]=e[7],this[8]=e[8],this.check()}identity(){return this.copy(Zn)}fromObject(e){return this.check()}fromQuaternion(e){return zn(this,e),this.check()}set(e,n,r,s,o,i,a,c,f){return this[0]=e,this[1]=n,this[2]=r,this[3]=s,this[4]=o,this[5]=i,this[6]=a,this[7]=c,this[8]=f,this.check()}setRowMajor(e,n,r,s,o,i,a,c,f){return this[0]=e,this[1]=s,this[2]=a,this[3]=n,this[4]=o,this[5]=c,this[6]=r,this[7]=i,this[8]=f,this.check()}determinant(){return Yn(this)}transpose(){return Vn(this,this),this.check()}invert(){return Qn(this,this),this.check()}multiplyLeft(e){return Xe(this,e,this),this.check()}multiplyRight(e){return Xe(this,this,e),this.check()}rotate(e){return Wn(this,this,e),this.check()}scale(e){return Array.isArray(e)?Ve(this,this,e):Ve(this,this,[e,e]),this.check()}translate(e){return kn(this,this,e),this.check()}transform(e,n){let r;switch(e.length){case 2:r=en(n||[-0,-0],e,this);break;case 3:r=$t(n||[-0,-0,-0],e,this);break;case 4:r=Bt(n||[-0,-0,-0,-0],e,this);break;default:throw new Error("Illegal vector")}return ht(r,e.length),r}transformVector(e,n){return this.transform(e,n)}transformVector2(e,n){return this.transform(e,n)}transformVector3(e,n){return this.transform(e,n)}}let W,z=null;function qn(){return W||(W=new Y([0,0,0,0,0,0,0,0,0]),Object.freeze(W)),W}function $n(){return z||(z=new Y,Object.freeze(z)),z}function Qe(){const t=new re(4);return re!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function er(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function Ct(t,e,n){n=n*.5;const r=Math.sin(n);return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=Math.cos(n),t}function Ye(t,e,n){const r=e[0],s=e[1],o=e[2],i=e[3],a=n[0],c=n[1],f=n[2],l=n[3];return t[0]=r*l+i*a+s*f-o*c,t[1]=s*l+i*c+o*a-r*f,t[2]=o*l+i*f+r*c-s*a,t[3]=i*l-r*a-s*c-o*f,t}function tr(t,e,n){n*=.5;const r=e[0],s=e[1],o=e[2],i=e[3],a=Math.sin(n),c=Math.cos(n);return t[0]=r*c+i*a,t[1]=s*c+o*a,t[2]=o*c-s*a,t[3]=i*c-r*a,t}function nr(t,e,n){n*=.5;const r=e[0],s=e[1],o=e[2],i=e[3],a=Math.sin(n),c=Math.cos(n);return t[0]=r*c-o*a,t[1]=s*c+i*a,t[2]=o*c+r*a,t[3]=i*c-s*a,t}function rr(t,e,n){n*=.5;const r=e[0],s=e[1],o=e[2],i=e[3],a=Math.sin(n),c=Math.cos(n);return t[0]=r*c+s*a,t[1]=s*c-r*a,t[2]=o*c+i*a,t[3]=i*c-o*a,t}function sr(t,e){const n=e[0],r=e[1],s=e[2];return t[0]=n,t[1]=r,t[2]=s,t[3]=Math.sqrt(Math.abs(1-n*n-r*r-s*s)),t}function ee(t,e,n,r){const s=e[0],o=e[1],i=e[2],a=e[3];let c=n[0],f=n[1],l=n[2],u=n[3],A,d,B,h,p;return A=s*c+o*f+i*l+a*u,A<0&&(A=-A,c=-c,f=-f,l=-l,u=-u),1-A>dn?(d=Math.acos(A),p=Math.sin(d),B=Math.sin((1-r)*d)/p,h=Math.sin(r*d)/p):(B=1-r,h=r),t[0]=B*s+h*c,t[1]=B*o+h*f,t[2]=B*i+h*l,t[3]=B*a+h*u,t}function or(t,e){const n=e[0],r=e[1],s=e[2],o=e[3],i=n*n+r*r+s*s+o*o,a=i?1/i:0;return t[0]=-n*a,t[1]=-r*a,t[2]=-s*a,t[3]=o*a,t}function ir(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t}function gt(t,e){const n=e[0]+e[4]+e[8];let r;if(n>0)r=Math.sqrt(n+1),t[3]=.5*r,r=.5/r,t[0]=(e[5]-e[7])*r,t[1]=(e[6]-e[2])*r,t[2]=(e[1]-e[3])*r;else{let s=0;e[4]>e[0]&&(s=1),e[8]>e[s*3+s]&&(s=2);const o=(s+1)%3,i=(s+2)%3;r=Math.sqrt(e[s*3+s]-e[o*3+o]-e[i*3+i]+1),t[s]=.5*r,r=.5/r,t[3]=(e[o*3+i]-e[i*3+o])*r,t[o]=(e[o*3+s]+e[s*3+o])*r,t[i]=(e[i*3+s]+e[s*3+i])*r}return t}const ar=sn,cr=an,fr=rn,lr=on,ur=tn,Ar=nn,bt=An,dr=(function(){const t=cn(),e=Ke(1,0,0),n=Ke(0,1,0);return function(r,s,o){const i=fn(s,o);return i<-.999999?(Ae(t,e,s),ln(t)<1e-6&&Ae(t,n,s),un(t,t),Ct(r,t,Math.PI),r):i>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(Ae(t,s,o),r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=1+i,bt(r,r))}})();(function(){const t=Qe(),e=Qe();return function(n,r,s,o,i,a){return ee(t,r,i,a),ee(e,s,o,a),ee(n,t,e,2*a*(1-a)),n}})();(function(){const t=Xn();return function(e,n,r,s){return t[0]=r[0],t[3]=r[1],t[6]=r[2],t[1]=s[0],t[4]=s[1],t[7]=s[2],t[2]=-n[0],t[5]=-n[1],t[8]=-n[2],bt(e,gt(e,t))}})();const Br=[0,0,0,1];class hr extends Bn{constructor(e=0,n=0,r=0,s=1){super(-0,-0,-0,-0),Array.isArray(e)&&arguments.length===1?this.copy(e):this.set(e,n,r,s)}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this.check()}set(e,n,r,s){return this[0]=e,this[1]=n,this[2]=r,this[3]=s,this.check()}fromObject(e){return this[0]=e.x,this[1]=e.y,this[2]=e.z,this[3]=e.w,this.check()}fromMatrix3(e){return gt(this,e),this.check()}fromAxisRotation(e,n){return Ct(this,e,n),this.check()}identity(){return er(this),this.check()}setAxisAngle(e,n){return this.fromAxisRotation(e,n)}get ELEMENTS(){return 4}get x(){return this[0]}set x(e){this[0]=b(e)}get y(){return this[1]}set y(e){this[1]=b(e)}get z(){return this[2]}set z(e){this[2]=b(e)}get w(){return this[3]}set w(e){this[3]=b(e)}len(){return ur(this)}lengthSquared(){return Ar(this)}dot(e){return fr(this,e)}rotationTo(e,n){return dr(this,e,n),this.check()}add(e){return ar(this,this,e),this.check()}calculateW(){return sr(this,this),this.check()}conjugate(){return ir(this,this),this.check()}invert(){return or(this,this),this.check()}lerp(e,n,r){return r===void 0?this.lerp(this,e,n):(lr(this,e,n,r),this.check())}multiplyRight(e){return Ye(this,this,e),this.check()}multiplyLeft(e){return Ye(this,e,this),this.check()}normalize(){const e=this.len(),n=e>0?1/e:0;return this[0]=this[0]*n,this[1]=this[1]*n,this[2]=this[2]*n,this[3]=this[3]*n,e===0&&(this[3]=1),this.check()}rotateX(e){return tr(this,this,e),this.check()}rotateY(e){return nr(this,this,e),this.check()}rotateZ(e){return rr(this,this,e),this.check()}scale(e){return cr(this,this,e),this.check()}slerp(e,n,r){let s,o,i;switch(arguments.length){case 1:({start:s=Br,target:o,ratio:i}=e);break;case 2:s=this,o=e,i=n;break;default:s=e,o=n,i=r}return ee(this,s,o,i),this.check()}transformVector4(e,n=new xe){return hn(n,e,this),ht(n,4)}lengthSq(){return this.lengthSquared()}setFromAxisAngle(e,n){return this.setAxisAngle(e,n)}premultiply(e){return this.multiplyLeft(e)}multiply(e){return this.multiplyRight(e)}}const ke=`precision highp int;

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
`,mr=`// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
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
`,pr=5,Cr=255;var j;(function(t){t[t.POINT=0]="POINT",t[t.DIRECTIONAL=1]="DIRECTIONAL"})(j||(j={}));const te={props:{},uniforms:{},name:"lighting",defines:{},uniformTypes:{enabled:"i32",lightType:"i32",directionalLightCount:"i32",pointLightCount:"i32",ambientColor:"vec3<f32>",lightColor0:"vec3<f32>",lightPosition0:"vec3<f32>",lightDirection0:"vec3<f32>",lightAttenuation0:"vec3<f32>",lightColor1:"vec3<f32>",lightPosition1:"vec3<f32>",lightDirection1:"vec3<f32>",lightAttenuation1:"vec3<f32>",lightColor2:"vec3<f32>",lightPosition2:"vec3<f32>",lightDirection2:"vec3<f32>",lightAttenuation2:"vec3<f32>"},defaultUniforms:{enabled:1,lightType:j.POINT,directionalLightCount:0,pointLightCount:0,ambientColor:[.1,.1,.1],lightColor0:[1,1,1],lightPosition0:[1,1,2],lightDirection0:[1,1,1],lightAttenuation0:[1,0,0],lightColor1:[1,1,1],lightPosition1:[1,1,2],lightDirection1:[1,1,1],lightAttenuation1:[1,0,0],lightColor2:[1,1,1],lightPosition2:[1,1,2],lightDirection2:[1,1,1],lightAttenuation2:[1,0,0]},source:mr,vs:ke,fs:ke,getUniforms:gr};function gr(t,e={}){if(t=t&&{...t},!t)return{...te.defaultUniforms};t.lights&&(t={...t,...Er(t.lights),lights:void 0});const{ambientLight:n,pointLights:r,directionalLights:s}=t||{};if(!(n||r&&r.length>0||s&&s.length>0))return{...te.defaultUniforms,enabled:0};const i={...te.defaultUniforms,...e,...br({ambientLight:n,pointLights:r,directionalLights:s})};return t.enabled!==void 0&&(i.enabled=t.enabled?1:0),i}function br({ambientLight:t,pointLights:e=[],directionalLights:n=[]}){const r={};r.ambientColor=pe(t);let s=0;for(const o of e){r.lightType=j.POINT;const i=s;r[`lightColor${i}`]=pe(o),r[`lightPosition${i}`]=o.position,r[`lightAttenuation${i}`]=o.attenuation||[1,0,0],s++}for(const o of n){r.lightType=j.DIRECTIONAL;const i=s;r[`lightColor${i}`]=pe(o),r[`lightDirection${i}`]=o.direction,s++}return s>pr&&v.warn("MAX_LIGHTS exceeded")(),r.directionalLightCount=n.length,r.pointLightCount=e.length,r}function Er(t){const e={pointLights:[],directionalLights:[]};for(const n of t||[])switch(n.type){case"ambient":e.ambientLight=n;break;case"directional":e.directionalLights?.push(n);break;case"point":e.pointLights?.push(n);break}return e}function pe(t={}){const{color:e=[0,0,0],intensity:n=1}=t;return e.map(r=>r*n/Cr)}const Ir=`out vec3 pbr_vPosition;
out vec2 pbr_vUV;

#ifdef HAS_NORMALS
# ifdef HAS_TANGENTS
out mat3 pbr_vTBN;
# else
out vec3 pbr_vNormal;
# endif
#endif

void pbr_setPositionNormalTangentUV(vec4 position, vec4 normal, vec4 tangent, vec2 uv)
{
  vec4 pos = pbrProjection.modelMatrix * position;
  pbr_vPosition = vec3(pos.xyz) / pos.w;

#ifdef HAS_NORMALS
#ifdef HAS_TANGENTS
  vec3 normalW = normalize(vec3(pbrProjection.normalMatrix * vec4(normal.xyz, 0.0)));
  vec3 tangentW = normalize(vec3(pbrProjection.modelMatrix * vec4(tangent.xyz, 0.0)));
  vec3 bitangentW = cross(normalW, tangentW) * tangent.w;
  pbr_vTBN = mat3(tangentW, bitangentW, normalW);
#else // HAS_TANGENTS != 1
  pbr_vNormal = normalize(vec3(pbrProjection.modelMatrix * vec4(normal.xyz, 0.0)));
#endif
#endif

#ifdef HAS_UV
  pbr_vUV = uv;
#else
  pbr_vUV = vec2(0.,0.);
#endif
}
`,Mr=`precision highp float;

uniform pbrMaterialUniforms {
  // Material is unlit
  bool unlit;

  // Base color map
  bool baseColorMapEnabled;
  vec4 baseColorFactor;

  bool normalMapEnabled;  
  float normalScale; // #ifdef HAS_NORMALMAP

  bool emissiveMapEnabled;
  vec3 emissiveFactor; // #ifdef HAS_EMISSIVEMAP

  vec2 metallicRoughnessValues;
  bool metallicRoughnessMapEnabled;

  bool occlusionMapEnabled;
  float occlusionStrength; // #ifdef HAS_OCCLUSIONMAP
  
  bool alphaCutoffEnabled;
  float alphaCutoff; // #ifdef ALPHA_CUTOFF
  
  // IBL
  bool IBLenabled;
  vec2 scaleIBLAmbient; // #ifdef USE_IBL
  
  // debugging flags used for shader output of intermediate PBR variables
  // #ifdef PBR_DEBUG
  vec4 scaleDiffBaseMR;
  vec4 scaleFGDSpec;
  // #endif
} pbrMaterial;

// Samplers
#ifdef HAS_BASECOLORMAP
uniform sampler2D pbr_baseColorSampler;
#endif
#ifdef HAS_NORMALMAP
uniform sampler2D pbr_normalSampler;
#endif
#ifdef HAS_EMISSIVEMAP
uniform sampler2D pbr_emissiveSampler;
#endif
#ifdef HAS_METALROUGHNESSMAP
uniform sampler2D pbr_metallicRoughnessSampler;
#endif
#ifdef HAS_OCCLUSIONMAP
uniform sampler2D pbr_occlusionSampler;
#endif
#ifdef USE_IBL
uniform samplerCube pbr_diffuseEnvSampler;
uniform samplerCube pbr_specularEnvSampler;
uniform sampler2D pbr_brdfLUT;
#endif

// Inputs from vertex shader

in vec3 pbr_vPosition;
in vec2 pbr_vUV;

#ifdef HAS_NORMALS
#ifdef HAS_TANGENTS
in mat3 pbr_vTBN;
#else
in vec3 pbr_vNormal;
#endif
#endif

// Encapsulate the various inputs used by the various functions in the shading equation
// We store values in this struct to simplify the integration of alternative implementations
// of the shading terms, outlined in the Readme.MD Appendix.
struct PBRInfo {
  float NdotL;                  // cos angle between normal and light direction
  float NdotV;                  // cos angle between normal and view direction
  float NdotH;                  // cos angle between normal and half vector
  float LdotH;                  // cos angle between light direction and half vector
  float VdotH;                  // cos angle between view direction and half vector
  float perceptualRoughness;    // roughness value, as authored by the model creator (input to shader)
  float metalness;              // metallic value at the surface
  vec3 reflectance0;            // full reflectance color (normal incidence angle)
  vec3 reflectance90;           // reflectance color at grazing angle
  float alphaRoughness;         // roughness mapped to a more linear change in the roughness (proposed by [2])
  vec3 diffuseColor;            // color contribution from diffuse lighting
  vec3 specularColor;           // color contribution from specular lighting
  vec3 n;                       // normal at surface point
  vec3 v;                       // vector from surface point to camera
};

const float M_PI = 3.141592653589793;
const float c_MinRoughness = 0.04;

vec4 SRGBtoLINEAR(vec4 srgbIn)
{
#ifdef MANUAL_SRGB
#ifdef SRGB_FAST_APPROXIMATION
  vec3 linOut = pow(srgbIn.xyz,vec3(2.2));
#else // SRGB_FAST_APPROXIMATION
  vec3 bLess = step(vec3(0.04045),srgbIn.xyz);
  vec3 linOut = mix( srgbIn.xyz/vec3(12.92), pow((srgbIn.xyz+vec3(0.055))/vec3(1.055),vec3(2.4)), bLess );
#endif //SRGB_FAST_APPROXIMATION
  return vec4(linOut,srgbIn.w);;
#else //MANUAL_SRGB
  return srgbIn;
#endif //MANUAL_SRGB
}

// Find the normal for this fragment, pulling either from a predefined normal map
// or from the interpolated mesh normal and tangent attributes.
vec3 getNormal()
{
  // Retrieve the tangent space matrix
#ifndef HAS_TANGENTS
  vec3 pos_dx = dFdx(pbr_vPosition);
  vec3 pos_dy = dFdy(pbr_vPosition);
  vec3 tex_dx = dFdx(vec3(pbr_vUV, 0.0));
  vec3 tex_dy = dFdy(vec3(pbr_vUV, 0.0));
  vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);

#ifdef HAS_NORMALS
  vec3 ng = normalize(pbr_vNormal);
#else
  vec3 ng = cross(pos_dx, pos_dy);
#endif

  t = normalize(t - ng * dot(ng, t));
  vec3 b = normalize(cross(ng, t));
  mat3 tbn = mat3(t, b, ng);
#else // HAS_TANGENTS
  mat3 tbn = pbr_vTBN;
#endif

#ifdef HAS_NORMALMAP
  vec3 n = texture(pbr_normalSampler, pbr_vUV).rgb;
  n = normalize(tbn * ((2.0 * n - 1.0) * vec3(pbrMaterial.normalScale, pbrMaterial.normalScale, 1.0)));
#else
  // The tbn matrix is linearly interpolated, so we need to re-normalize
  vec3 n = normalize(tbn[2].xyz);
#endif

  return n;
}

// Calculation of the lighting contribution from an optional Image Based Light source.
// Precomputed Environment Maps are required uniform inputs and are computed as outlined in [1].
// See our README.md on Environment Maps [3] for additional discussion.
#ifdef USE_IBL
vec3 getIBLContribution(PBRInfo pbrInfo, vec3 n, vec3 reflection)
{
  float mipCount = 9.0; // resolution of 512x512
  float lod = (pbrInfo.perceptualRoughness * mipCount);
  // retrieve a scale and bias to F0. See [1], Figure 3
  vec3 brdf = SRGBtoLINEAR(texture(pbr_brdfLUT,
    vec2(pbrInfo.NdotV, 1.0 - pbrInfo.perceptualRoughness))).rgb;
  vec3 diffuseLight = SRGBtoLINEAR(texture(pbr_diffuseEnvSampler, n)).rgb;

#ifdef USE_TEX_LOD
  vec3 specularLight = SRGBtoLINEAR(texture(pbr_specularEnvSampler, reflection, lod)).rgb;
#else
  vec3 specularLight = SRGBtoLINEAR(texture(pbr_specularEnvSampler, reflection)).rgb;
#endif

  vec3 diffuse = diffuseLight * pbrInfo.diffuseColor;
  vec3 specular = specularLight * (pbrInfo.specularColor * brdf.x + brdf.y);

  // For presentation, this allows us to disable IBL terms
  diffuse *= pbrMaterial.scaleIBLAmbient.x;
  specular *= pbrMaterial.scaleIBLAmbient.y;

  return diffuse + specular;
}
#endif

// Basic Lambertian diffuse
// Implementation from Lambert's Photometria https://archive.org/details/lambertsphotome00lambgoog
// See also [1], Equation 1
vec3 diffuse(PBRInfo pbrInfo)
{
  return pbrInfo.diffuseColor / M_PI;
}

// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
vec3 specularReflection(PBRInfo pbrInfo)
{
  return pbrInfo.reflectance0 +
    (pbrInfo.reflectance90 - pbrInfo.reflectance0) *
    pow(clamp(1.0 - pbrInfo.VdotH, 0.0, 1.0), 5.0);
}

// This calculates the specular geometric attenuation (aka G()),
// where rougher material will reflect less light back to the viewer.
// This implementation is based on [1] Equation 4, and we adopt their modifications to
// alphaRoughness as input as originally proposed in [2].
float geometricOcclusion(PBRInfo pbrInfo)
{
  float NdotL = pbrInfo.NdotL;
  float NdotV = pbrInfo.NdotV;
  float r = pbrInfo.alphaRoughness;

  float attenuationL = 2.0 * NdotL / (NdotL + sqrt(r * r + (1.0 - r * r) * (NdotL * NdotL)));
  float attenuationV = 2.0 * NdotV / (NdotV + sqrt(r * r + (1.0 - r * r) * (NdotV * NdotV)));
  return attenuationL * attenuationV;
}

// The following equation(s) model the distribution of microfacet normals across
// the area being drawn (aka D())
// Implementation from "Average Irregularity Representation of a Roughened Surface
// for Ray Reflection" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes
// from EPIC Games [1], Equation 3.
float microfacetDistribution(PBRInfo pbrInfo)
{
  float roughnessSq = pbrInfo.alphaRoughness * pbrInfo.alphaRoughness;
  float f = (pbrInfo.NdotH * roughnessSq - pbrInfo.NdotH) * pbrInfo.NdotH + 1.0;
  return roughnessSq / (M_PI * f * f);
}

void PBRInfo_setAmbientLight(inout PBRInfo pbrInfo) {
  pbrInfo.NdotL = 1.0;
  pbrInfo.NdotH = 0.0;
  pbrInfo.LdotH = 0.0;
  pbrInfo.VdotH = 1.0;
}

void PBRInfo_setDirectionalLight(inout PBRInfo pbrInfo, vec3 lightDirection) {
  vec3 n = pbrInfo.n;
  vec3 v = pbrInfo.v;
  vec3 l = normalize(lightDirection);             // Vector from surface point to light
  vec3 h = normalize(l+v);                        // Half vector between both l and v

  pbrInfo.NdotL = clamp(dot(n, l), 0.001, 1.0);
  pbrInfo.NdotH = clamp(dot(n, h), 0.0, 1.0);
  pbrInfo.LdotH = clamp(dot(l, h), 0.0, 1.0);
  pbrInfo.VdotH = clamp(dot(v, h), 0.0, 1.0);
}

void PBRInfo_setPointLight(inout PBRInfo pbrInfo, PointLight pointLight) {
  vec3 light_direction = normalize(pointLight.position - pbr_vPosition);
  PBRInfo_setDirectionalLight(pbrInfo, light_direction);
}

vec3 calculateFinalColor(PBRInfo pbrInfo, vec3 lightColor) {
  // Calculate the shading terms for the microfacet specular shading model
  vec3 F = specularReflection(pbrInfo);
  float G = geometricOcclusion(pbrInfo);
  float D = microfacetDistribution(pbrInfo);

  // Calculation of analytical lighting contribution
  vec3 diffuseContrib = (1.0 - F) * diffuse(pbrInfo);
  vec3 specContrib = F * G * D / (4.0 * pbrInfo.NdotL * pbrInfo.NdotV);
  // Obtain final intensity as reflectance (BRDF) scaled by the energy of the light (cosine law)
  return pbrInfo.NdotL * lightColor * (diffuseContrib + specContrib);
}

vec4 pbr_filterColor(vec4 colorUnused)
{
  // The albedo may be defined from a base texture or a flat color
#ifdef HAS_BASECOLORMAP
  vec4 baseColor = SRGBtoLINEAR(texture(pbr_baseColorSampler, pbr_vUV)) * pbrMaterial.baseColorFactor;
#else
  vec4 baseColor = pbrMaterial.baseColorFactor;
#endif

#ifdef ALPHA_CUTOFF
  if (baseColor.a < pbrMaterial.alphaCutoff) {
    discard;
  }
#endif

  vec3 color = vec3(0, 0, 0);

  if(pbrMaterial.unlit){
    color.rgb = baseColor.rgb;
  }
  else{
    // Metallic and Roughness material properties are packed together
    // In glTF, these factors can be specified by fixed scalar values
    // or from a metallic-roughness map
    float perceptualRoughness = pbrMaterial.metallicRoughnessValues.y;
    float metallic = pbrMaterial.metallicRoughnessValues.x;
#ifdef HAS_METALROUGHNESSMAP
    // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
    // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
    vec4 mrSample = texture(pbr_metallicRoughnessSampler, pbr_vUV);
    perceptualRoughness = mrSample.g * perceptualRoughness;
    metallic = mrSample.b * metallic;
#endif
    perceptualRoughness = clamp(perceptualRoughness, c_MinRoughness, 1.0);
    metallic = clamp(metallic, 0.0, 1.0);
    // Roughness is authored as perceptual roughness; as is convention,
    // convert to material roughness by squaring the perceptual roughness [2].
    float alphaRoughness = perceptualRoughness * perceptualRoughness;

    vec3 f0 = vec3(0.04);
    vec3 diffuseColor = baseColor.rgb * (vec3(1.0) - f0);
    diffuseColor *= 1.0 - metallic;
    vec3 specularColor = mix(f0, baseColor.rgb, metallic);

    // Compute reflectance.
    float reflectance = max(max(specularColor.r, specularColor.g), specularColor.b);

    // For typical incident reflectance range (between 4% to 100%) set the grazing
    // reflectance to 100% for typical fresnel effect.
    // For very low reflectance range on highly diffuse objects (below 4%),
    // incrementally reduce grazing reflecance to 0%.
    float reflectance90 = clamp(reflectance * 25.0, 0.0, 1.0);
    vec3 specularEnvironmentR0 = specularColor.rgb;
    vec3 specularEnvironmentR90 = vec3(1.0, 1.0, 1.0) * reflectance90;

    vec3 n = getNormal();                          // normal at surface point
    vec3 v = normalize(pbrProjection.camera - pbr_vPosition);  // Vector from surface point to camera

    float NdotV = clamp(abs(dot(n, v)), 0.001, 1.0);
    vec3 reflection = -normalize(reflect(v, n));

    PBRInfo pbrInfo = PBRInfo(
      0.0, // NdotL
      NdotV,
      0.0, // NdotH
      0.0, // LdotH
      0.0, // VdotH
      perceptualRoughness,
      metallic,
      specularEnvironmentR0,
      specularEnvironmentR90,
      alphaRoughness,
      diffuseColor,
      specularColor,
      n,
      v
    );


#ifdef USE_LIGHTS
    // Apply ambient light
    PBRInfo_setAmbientLight(pbrInfo);
    color += calculateFinalColor(pbrInfo, lighting.ambientColor);

    // Apply directional light
    for(int i = 0; i < lighting.directionalLightCount; i++) {
      if (i < lighting.directionalLightCount) {
        PBRInfo_setDirectionalLight(pbrInfo, lighting_getDirectionalLight(i).direction);
        color += calculateFinalColor(pbrInfo, lighting_getDirectionalLight(i).color);
      }
    }

    // Apply point light
    for(int i = 0; i < lighting.pointLightCount; i++) {
      if (i < lighting.pointLightCount) {
        PBRInfo_setPointLight(pbrInfo, lighting_getPointLight(i));
        float attenuation = getPointLightAttenuation(lighting_getPointLight(i), distance(lighting_getPointLight(i).position, pbr_vPosition));
        color += calculateFinalColor(pbrInfo, lighting_getPointLight(i).color / attenuation);
      }
    }
#endif

    // Calculate lighting contribution from image based lighting source (IBL)
#ifdef USE_IBL
    if (pbrMaterial.IBLenabled) {
      color += getIBLContribution(pbrInfo, n, reflection);
    }
#endif

 // Apply optional PBR terms for additional (optional) shading
#ifdef HAS_OCCLUSIONMAP
    if (pbrMaterial.occlusionMapEnabled) {
      float ao = texture(pbr_occlusionSampler, pbr_vUV).r;
      color = mix(color, color * ao, pbrMaterial.occlusionStrength);
    }
#endif

#ifdef HAS_EMISSIVEMAP
    if (pbrMaterial.emissiveMapEnabled) {
      vec3 emissive = SRGBtoLINEAR(texture(pbr_emissiveSampler, pbr_vUV)).rgb * pbrMaterial.emissiveFactor;
      color += emissive;
    }
#endif

    // This section uses mix to override final color for reference app visualization
    // of various parameters in the lighting equation.
#ifdef PBR_DEBUG
    // TODO: Figure out how to debug multiple lights

    // color = mix(color, F, pbr_scaleFGDSpec.x);
    // color = mix(color, vec3(G), pbr_scaleFGDSpec.y);
    // color = mix(color, vec3(D), pbr_scaleFGDSpec.z);
    // color = mix(color, specContrib, pbr_scaleFGDSpec.w);

    // color = mix(color, diffuseContrib, pbr_scaleDiffBaseMR.x);
    color = mix(color, baseColor.rgb, pbrMaterial.scaleDiffBaseMR.y);
    color = mix(color, vec3(metallic), pbrMaterial.scaleDiffBaseMR.z);
    color = mix(color, vec3(perceptualRoughness), pbrMaterial.scaleDiffBaseMR.w);
#endif

  }

  return vec4(pow(color,vec3(1.0/2.2)), baseColor.a);
}
`,Tr=`struct PBRFragmentInputs {
  pbr_vPosition: vec3f,
  pbr_vUV: vec2f,
  pbr_vTBN: mat3f,
  pbr_vNormal: vec3f
};

var fragmentInputs: PBRFragmentInputs;

fn pbr_setPositionNormalTangentUV(position: vec4f, normal: vec4f, tangent: vec4f, uv: vec2f)
{
  var pos: vec4f = pbrProjection.modelMatrix * position;
  pbr_vPosition = vec3(pos.xyz) / pos.w;

#ifdef HAS_NORMALS
#ifdef HAS_TANGENTS
  let normalW: vec3f = normalize(vec3(pbrProjection.normalMatrix * vec4(normal.xyz, 0.0)));
  let tangentW: vec3f = normalize(vec3(pbrProjection.modelMatrix * vec4(tangent.xyz, 0.0)));
  let bitangentW: vec3f = cross(normalW, tangentW) * tangent.w;
  fragmentInputs,pbr_vTBN = mat3(tangentW, bitangentW, normalW);
#else // HAS_TANGENTS != 1
  fragmentInputs.pbr_vNormal = normalize(vec3(pbrProjection.modelMatrix * vec4(normal.xyz, 0.0)));
#endif
#endif

#ifdef HAS_UV
  pbr_vUV = uv;
#else
  pbr_vUV = vec2(0.,0.);
#endif
}

struct pbrMaterialUniforms {
  // Material is unlit
  unlit: uint32,

  // Base color map
  baseColorMapEnabled: uint32,
  baseColorFactor: vec4f,

  normalMapEnabled : uint32,
  normalScale: f32,  // #ifdef HAS_NORMALMAP

  emissiveMapEnabled: uint32,
  emissiveFactor: vec3f, // #ifdef HAS_EMISSIVEMAP

  metallicRoughnessValues: vec2f,
  metallicRoughnessMapEnabled: uint32,

  occlusionMapEnabled: i32,
  occlusionStrength: f32, // #ifdef HAS_OCCLUSIONMAP
  
  alphaCutoffEnabled: i32,
  alphaCutoff: f32, // #ifdef ALPHA_CUTOFF
  
  // IBL
  IBLenabled: i32,
  scaleIBLAmbient: vec2f, // #ifdef USE_IBL
  
  // debugging flags used for shader output of intermediate PBR variables
  // #ifdef PBR_DEBUG
  scaleDiffBaseMR: vec4f,
  scaleFGDSpec: vec4f
  // #endif
} 
  
@binding(2) @group(0) var<uniform> material : pbrMaterialUniforms;

// Samplers
#ifdef HAS_BASECOLORMAP
uniform sampler2D pbr_baseColorSampler;
#endif
#ifdef HAS_NORMALMAP
uniform sampler2D pbr_normalSampler;
#endif
#ifdef HAS_EMISSIVEMAP
uniform sampler2D pbr_emissiveSampler;
#endif
#ifdef HAS_METALROUGHNESSMAP
uniform sampler2D pbr_metallicRoughnessSampler;
#endif
#ifdef HAS_OCCLUSIONMAP
uniform sampler2D pbr_occlusionSampler;
#endif
#ifdef USE_IBL
uniform samplerCube pbr_diffuseEnvSampler;
uniform samplerCube pbr_specularEnvSampler;
uniform sampler2D pbr_brdfLUT;
#endif

// Encapsulate the various inputs used by the various functions in the shading equation
// We store values in this struct to simplify the integration of alternative implementations
// of the shading terms, outlined in the Readme.MD Appendix.
struct PBRInfo {
  NdotL: f32,                  // cos angle between normal and light direction
  NdotV: f32,                  // cos angle between normal and view direction
  NdotH: f32,                  // cos angle between normal and half vector
  LdotH: f32,                  // cos angle between light direction and half vector
  VdotH: f32,                  // cos angle between view direction and half vector
  perceptualRoughness: f32,    // roughness value, as authored by the model creator (input to shader)
  metalness: f32,              // metallic value at the surface
  reflectance0: vec3f,            // full reflectance color (normal incidence angle)
  reflectance90: vec3f,           // reflectance color at grazing angle
  alphaRoughness: f32,         // roughness mapped to a more linear change in the roughness (proposed by [2])
  diffuseColor: vec3f,            // color contribution from diffuse lighting
  specularColor: vec3f,           // color contribution from specular lighting
  n: vec3f,                       // normal at surface point
  v: vec3f,                       // vector from surface point to camera
};

const M_PI = 3.141592653589793;
const c_MinRoughness = 0.04;

fn SRGBtoLINEAR(srgbIn: vec4f ) -> vec4f
{
#ifdef MANUAL_SRGB
#ifdef SRGB_FAST_APPROXIMATION
  var linOut: vec3f = pow(srgbIn.xyz,vec3(2.2));
#else // SRGB_FAST_APPROXIMATION
  var bLess: vec3f = step(vec3(0.04045),srgbIn.xyz);
  var linOut: vec3f = mix( srgbIn.xyz/vec3(12.92), pow((srgbIn.xyz+vec3(0.055))/vec3(1.055),vec3(2.4)), bLess );
#endif //SRGB_FAST_APPROXIMATION
  return vec4f(linOut,srgbIn.w);;
#else //MANUAL_SRGB
  return srgbIn;
#endif //MANUAL_SRGB
}

// Find the normal for this fragment, pulling either from a predefined normal map
// or from the interpolated mesh normal and tangent attributes.
fn getNormal() -> vec3f
{
  // Retrieve the tangent space matrix
#ifndef HAS_TANGENTS
  var pos_dx: vec3f = dFdx(pbr_vPosition);
  var pos_dy: vec3f = dFdy(pbr_vPosition);
  var tex_dx: vec3f = dFdx(vec3(pbr_vUV, 0.0));
  var tex_dy: vec3f = dFdy(vec3(pbr_vUV, 0.0));
  var t: vec3f = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);

#ifdef HAS_NORMALS
  var ng: vec3f = normalize(pbr_vNormal);
#else
  var ng: vec3f = cross(pos_dx, pos_dy);
#endif

  t = normalize(t - ng * dot(ng, t));
  var b: vec3f = normalize(cross(ng, t));
  var tbn: mat3f = mat3f(t, b, ng);
#else // HAS_TANGENTS
  var tbn: mat3f = pbr_vTBN;
#endif

#ifdef HAS_NORMALMAP
  vec3 n = texture(pbr_normalSampler, pbr_vUV).rgb;
  n = normalize(tbn * ((2.0 * n - 1.0) * vec3(pbrMaterial.normalScale, pbrMaterial.normalScale, 1.0)));
#else
  // The tbn matrix is linearly interpolated, so we need to re-normalize
  vec3 n = normalize(tbn[2].xyz);
#endif

  return n;
}

// Calculation of the lighting contribution from an optional Image Based Light source.
// Precomputed Environment Maps are required uniform inputs and are computed as outlined in [1].
// See our README.md on Environment Maps [3] for additional discussion.
#ifdef USE_IBL
fn getIBLContribution(PBRInfo pbrInfo, vec3 n, vec3 reflection) -> vec3f
{
  float mipCount = 9.0; // resolution of 512x512
  float lod = (pbrInfo.perceptualRoughness * mipCount);
  // retrieve a scale and bias to F0. See [1], Figure 3
  vec3 brdf = SRGBtoLINEAR(texture(pbr_brdfLUT,
    vec2(pbrInfo.NdotV, 1.0 - pbrInfo.perceptualRoughness))).rgb;
  vec3 diffuseLight = SRGBtoLINEAR(texture(pbr_diffuseEnvSampler, n)).rgb;

#ifdef USE_TEX_LOD
  vec3 specularLight = SRGBtoLINEAR(texture(pbr_specularEnvSampler, reflection, lod)).rgb;
#else
  vec3 specularLight = SRGBtoLINEAR(texture(pbr_specularEnvSampler, reflection)).rgb;
#endif

  vec3 diffuse = diffuseLight * pbrInfo.diffuseColor;
  vec3 specular = specularLight * (pbrInfo.specularColor * brdf.x + brdf.y);

  // For presentation, this allows us to disable IBL terms
  diffuse *= pbrMaterial.scaleIBLAmbient.x;
  specular *= pbrMaterial.scaleIBLAmbient.y;

  return diffuse + specular;
}
#endif

// Basic Lambertian diffuse
// Implementation from Lambert's Photometria https://archive.org/details/lambertsphotome00lambgoog
// See also [1], Equation 1
fn diffuse(pbrInfo: PBRInfo) -> vec3<f32> {
  return pbrInfo.diffuseColor / PI;
}

// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
fn specularReflection(pbrInfo: PBRInfo) -> vec3<f32> {
  return pbrInfo.reflectance0 +
    (pbrInfo.reflectance90 - pbrInfo.reflectance0) *
    pow(clamp(1.0 - pbrInfo.VdotH, 0.0, 1.0), 5.0);
}

// This calculates the specular geometric attenuation (aka G()),
// where rougher material will reflect less light back to the viewer.
// This implementation is based on [1] Equation 4, and we adopt their modifications to
// alphaRoughness as input as originally proposed in [2].
fn geometricOcclusion(pbrInfo: PBRInfo) -> f32 {
  let NdotL: f32 = pbrInfo.NdotL;
  let NdotV: f32 = pbrInfo.NdotV;
  let r: f32 = pbrInfo.alphaRoughness;

  let attenuationL = 2.0 * NdotL / (NdotL + sqrt(r * r + (1.0 - r * r) * (NdotL * NdotL)));
  let attenuationV = 2.0 * NdotV / (NdotV + sqrt(r * r + (1.0 - r * r) * (NdotV * NdotV)));
  return attenuationL * attenuationV;
}

// The following equation(s) model the distribution of microfacet normals across
// the area being drawn (aka D())
// Implementation from "Average Irregularity Representation of a Roughened Surface
// for Ray Reflection" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes
// from EPIC Games [1], Equation 3.
fn microfacetDistribution(pbrInfo: PBRInfo) -> f32 {
  let roughnessSq = pbrInfo.alphaRoughness * pbrInfo.alphaRoughness;
  let f = (pbrInfo.NdotH * roughnessSq - pbrInfo.NdotH) * pbrInfo.NdotH + 1.0;
  return roughnessSq / (PI * f * f);
}

fn PBRInfo_setAmbientLight(pbrInfo: ptr<function, PBRInfo>) {
  (*pbrInfo).NdotL = 1.0;
  (*pbrInfo).NdotH = 0.0;
  (*pbrInfo).LdotH = 0.0;
  (*pbrInfo).VdotH = 1.0;
}

fn PBRInfo_setDirectionalLight(pbrInfo: ptr<function, PBRInfo>, lightDirection: vec3<f32>) {
  let n = (*pbrInfo).n;
  let v = (*pbrInfo).v;
  let l = normalize(lightDirection);             // Vector from surface point to light
  let h = normalize(l + v);                      // Half vector between both l and v

  (*pbrInfo).NdotL = clamp(dot(n, l), 0.001, 1.0);
  (*pbrInfo).NdotH = clamp(dot(n, h), 0.0, 1.0);
  (*pbrInfo).LdotH = clamp(dot(l, h), 0.0, 1.0);
  (*pbrInfo).VdotH = clamp(dot(v, h), 0.0, 1.0);
}

fn PBRInfo_setPointLight(pbrInfo: ptr<function, PBRInfo>, pointLight: PointLight) {
  let light_direction = normalize(pointLight.position - pbr_vPosition);
  PBRInfo_setDirectionalLight(pbrInfo, light_direction);
}

fn calculateFinalColor(pbrInfo: PBRInfo, lightColor: vec3<f32>) -> vec3<f32> {
  // Calculate the shading terms for the microfacet specular shading model
  let F = specularReflection(pbrInfo);
  let G = geometricOcclusion(pbrInfo);
  let D = microfacetDistribution(pbrInfo);

  // Calculation of analytical lighting contribution
  let diffuseContrib = (1.0 - F) * diffuse(pbrInfo);
  let specContrib = F * G * D / (4.0 * pbrInfo.NdotL * pbrInfo.NdotV);
  // Obtain final intensity as reflectance (BRDF) scaled by the energy of the light (cosine law)
  return pbrInfo.NdotL * lightColor * (diffuseContrib + specContrib);
}

fn pbr_filterColor(colorUnused: vec4<f32>) -> vec4<f32> {
  // The albedo may be defined from a base texture or a flat color
  var baseColor: vec4<f32>;
  #ifdef HAS_BASECOLORMAP
  baseColor = SRGBtoLINEAR(textureSample(pbr_baseColorSampler, pbr_baseColorSampler, pbr_vUV)) * pbrMaterial.baseColorFactor;
  #else
  baseColor = pbrMaterial.baseColorFactor;
  #endif

  #ifdef ALPHA_CUTOFF
  if (baseColor.a < pbrMaterial.alphaCutoff) {
    discard;
  }
  #endif

  var color = vec3<f32>(0.0, 0.0, 0.0);

  if (pbrMaterial.unlit) {
    color = baseColor.rgb;
  } else {
    // Metallic and Roughness material properties are packed together
    // In glTF, these factors can be specified by fixed scalar values
    // or from a metallic-roughness map
    var perceptualRoughness = pbrMaterial.metallicRoughnessValues.y;
    var metallic = pbrMaterial.metallicRoughnessValues.x;
    #ifdef HAS_METALROUGHNESSMAP
    // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
    // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
    let mrSample = textureSample(pbr_metallicRoughnessSampler, pbr_metallicRoughnessSampler, pbr_vUV);
    perceptualRoughness = mrSample.g * perceptualRoughness;
    metallic = mrSample.b * metallic;
    #endif
    perceptualRoughness = clamp(perceptualRoughness, c_MinRoughness, 1.0);
    metallic = clamp(metallic, 0.0, 1.0);
    // Roughness is authored as perceptual roughness; as is convention,
    // convert to material roughness by squaring the perceptual roughness [2].
    let alphaRoughness = perceptualRoughness * perceptualRoughness;

    let f0 = vec3<f32>(0.04);
    var diffuseColor = baseColor.rgb * (vec3<f32>(1.0) - f0);
    diffuseColor *= 1.0 - metallic;
    let specularColor = mix(f0, baseColor.rgb, metallic);

    // Compute reflectance.
    let reflectance = max(max(specularColor.r, specularColor.g), specularColor.b);

    // For typical incident reflectance range (between 4% to 100%) set the grazing
    // reflectance to 100% for typical fresnel effect.
    // For very low reflectance range on highly diffuse objects (below 4%),
    // incrementally reduce grazing reflectance to 0%.
    let reflectance90 = clamp(reflectance * 25.0, 0.0, 1.0);
    let specularEnvironmentR0 = specularColor;
    let specularEnvironmentR90 = vec3<f32>(1.0, 1.0, 1.0) * reflectance90;

    let n = getNormal();                          // normal at surface point
    let v = normalize(pbrProjection.camera - pbr_vPosition);  // Vector from surface point to camera

    let NdotV = clamp(abs(dot(n, v)), 0.001, 1.0);
    let reflection = -normalize(reflect(v, n));

    var pbrInfo = PBRInfo(
      0.0, // NdotL
      NdotV,
      0.0, // NdotH
      0.0, // LdotH
      0.0, // VdotH
      perceptualRoughness,
      metallic,
      specularEnvironmentR0,
      specularEnvironmentR90,
      alphaRoughness,
      diffuseColor,
      specularColor,
      n,
      v
    );

    #ifdef USE_LIGHTS
    // Apply ambient light
    PBRInfo_setAmbientLight(&pbrInfo);
    color += calculateFinalColor(pbrInfo, lighting.ambientColor);

    // Apply directional light
    for (var i = 0; i < lighting.directionalLightCount; i++) {
      if (i < lighting.directionalLightCount) {
        PBRInfo_setDirectionalLight(&pbrInfo, lighting_getDirectionalLight(i).direction);
        color += calculateFinalColor(pbrInfo, lighting_getDirectionalLight(i).color);
      }
    }

    // Apply point light
    for (var i = 0; i < lighting.pointLightCount; i++) {
      if (i < lighting.pointLightCount) {
        PBRInfo_setPointLight(&pbrInfo, lighting_getPointLight(i));
        let attenuation = getPointLightAttenuation(lighting_getPointLight(i), distance(lighting_getPointLight(i).position, pbr_vPosition));
        color += calculateFinalColor(pbrInfo, lighting_getPointLight(i).color / attenuation);
      }
    }
    #endif

    // Calculate lighting contribution from image based lighting source (IBL)
    #ifdef USE_IBL
    if (pbrMaterial.IBLenabled) {
      color += getIBLContribution(pbrInfo, n, reflection);
    }
    #endif

    // Apply optional PBR terms for additional (optional) shading
    #ifdef HAS_OCCLUSIONMAP
    if (pbrMaterial.occlusionMapEnabled) {
      let ao = textureSample(pbr_occlusionSampler, pbr_occlusionSampler, pbr_vUV).r;
      color = mix(color, color * ao, pbrMaterial.occlusionStrength);
    }
    #endif

    #ifdef HAS_EMISSIVEMAP
    if (pbrMaterial.emissiveMapEnabled) {
      let emissive = SRGBtoLINEAR(textureSample(pbr_emissiveSampler, pbr_emissiveSampler, pbr_vUV)).rgb * pbrMaterial.emissiveFactor;
      color += emissive;
    }
    #endif

    // This section uses mix to override final color for reference app visualization
    // of various parameters in the lighting equation.
    #ifdef PBR_DEBUG
    // TODO: Figure out how to debug multiple lights

    // color = mix(color, F, pbr_scaleFGDSpec.x);
    // color = mix(color, vec3(G), pbr_scaleFGDSpec.y);
    // color = mix(color, vec3(D), pbr_scaleFGDSpec.z);
    // color = mix(color, specContrib, pbr_scaleFGDSpec.w);

    // color = mix(color, diffuseContrib, pbr_scaleDiffBaseMR.x);
    color = mix(color, baseColor.rgb, pbrMaterial.scaleDiffBaseMR.y);
    color = mix(color, vec3<f32>(metallic), pbrMaterial.scaleDiffBaseMR.z);
    color = mix(color, vec3<f32>(perceptualRoughness), pbrMaterial.scaleDiffBaseMR.w);
    #endif
  }

  return vec4<f32>(pow(color, vec3<f32>(1.0 / 2.2)), baseColor.a);
}
`,We=`uniform pbrProjectionUniforms {
  mat4 modelViewProjectionMatrix;
  mat4 modelMatrix;
  mat4 normalMatrix;
  vec3 camera;
} pbrProjection;
`,Fr={name:"pbrProjection",vs:We,fs:We,getUniforms:t=>t,uniformTypes:{modelViewProjectionMatrix:"mat4x4<f32>",modelMatrix:"mat4x4<f32>",normalMatrix:"mat4x4<f32>",camera:"vec3<i32>"}},Et={props:{},uniforms:{},name:"pbrMaterial",dependencies:[te,Fr],source:Tr,vs:Ir,fs:Mr,defines:{LIGHTING_FRAGMENT:!0,HAS_NORMALMAP:!1,HAS_EMISSIVEMAP:!1,HAS_OCCLUSIONMAP:!1,HAS_BASECOLORMAP:!1,HAS_METALROUGHNESSMAP:!1,ALPHA_CUTOFF:!1,USE_IBL:!1,PBR_DEBUG:!1},getUniforms:t=>t,uniformTypes:{unlit:"i32",baseColorMapEnabled:"i32",baseColorFactor:"vec4<f32>",normalMapEnabled:"i32",normalScale:"f32",emissiveMapEnabled:"i32",emissiveFactor:"vec3<f32>",metallicRoughnessValues:"vec2<f32>",metallicRoughnessMapEnabled:"i32",occlusionMapEnabled:"i32",occlusionStrength:"f32",alphaCutoffEnabled:"i32",alphaCutoff:"f32",IBLenabled:"i32",scaleIBLAmbient:"vec2<f32>",scaleDiffBaseMR:"vec4<f32>",scaleFGDSpec:"vec4<f32>"}};class se{id;matrix=new x;display=!0;position=new G;rotation=new G;scale=new G(1,1,1);userData={};props={};constructor(e={}){const{id:n}=e;this.id=n||mn(this.constructor.name),this._setScenegraphNodeProps(e)}getBounds(){return null}destroy(){}delete(){this.destroy()}setProps(e){return this._setScenegraphNodeProps(e),this}toString(){return`{type: ScenegraphNode, id: ${this.id})}`}setPosition(e){return this.position=e,this}setRotation(e){return this.rotation=e,this}setScale(e){return this.scale=e,this}setMatrix(e,n=!0){n?this.matrix.copy(e):this.matrix=e}setMatrixComponents(e){const{position:n,rotation:r,scale:s,update:o=!0}=e;return n&&this.setPosition(n),r&&this.setRotation(r),s&&this.setScale(s),o&&this.updateMatrix(),this}updateMatrix(){const e=this.position,n=this.rotation,r=this.scale;return this.matrix.identity(),this.matrix.translate(e),this.matrix.rotateXYZ(n),this.matrix.scale(r),this}update(e={}){const{position:n,rotation:r,scale:s}=e;return n&&this.setPosition(n),r&&this.setRotation(r),s&&this.setScale(s),this.updateMatrix(),this}getCoordinateUniforms(e,n){n=n||this.matrix;const r=new x(e).multiplyRight(n),s=r.invert(),o=s.transpose();return{viewMatrix:e,modelMatrix:n,objectMatrix:n,worldMatrix:r,worldInverseMatrix:s,worldInverseTransposeMatrix:o}}_setScenegraphNodeProps(e){"position"in e&&this.setPosition(e.position),"rotation"in e&&this.setRotation(e.rotation),"scale"in e&&this.setScale(e.scale),"matrix"in e&&this.setMatrix(e.matrix),Object.assign(this.props,e)}}class U extends se{children;constructor(e={}){e=Array.isArray(e)?{children:e}:e;const{children:n=[]}=e;v.assert(n.every(r=>r instanceof se),"every child must an instance of ScenegraphNode"),super(e),this.children=n}getBounds(){const e=[[1/0,1/0,1/0],[-1/0,-1/0,-1/0]];return this.traverse((n,{worldMatrix:r})=>{const s=n.getBounds();if(!s)return;const[o,i]=s,a=new G(o).add(i).divide([2,2,2]);r.transformAsPoint(a,a);const c=new G(i).subtract(o).divide([2,2,2]);r.transformAsVector(c,c);for(let f=0;f<8;f++){const l=new G(f&1?-1:1,f&2?-1:1,f&4?-1:1).multiply(c).add(a);for(let u=0;u<3;u++)e[0][u]=Math.min(e[0][u],l[u]),e[1][u]=Math.max(e[1][u],l[u])}}),Number.isFinite(e[0][0])?e:null}destroy(){this.children.forEach(e=>e.destroy()),this.removeAll(),super.destroy()}add(...e){for(const n of e)Array.isArray(n)?this.add(...n):this.children.push(n);return this}remove(e){const n=this.children,r=n.indexOf(e);return r>-1&&n.splice(r,1),this}removeAll(){return this.children=[],this}traverse(e,{worldMatrix:n=new x}={}){const r=new x(n).multiplyRight(this.matrix);for(const s of this.children)s instanceof U?s.traverse(e,{worldMatrix:r}):e(s,{worldMatrix:r})}}class Ge extends se{model;bounds=null;managedResources;constructor(e){super(e),this.model=e.model,this.managedResources=e.managedResources||[],this.bounds=e.bounds||null,this.setProps(e)}destroy(){this.model&&(this.model.destroy(),this.model=null),this.managedResources.forEach(e=>e.destroy()),this.managedResources=[]}getBounds(){return this.bounds}draw(e){return this.model.draw(e)}}const Ce=Math.PI/180,Z=new Float32Array(16),ze=new Float32Array(12);function Ze(t,e,n){const r=e[0]*Ce,s=e[1]*Ce,o=e[2]*Ce,i=Math.sin(o),a=Math.sin(r),c=Math.sin(s),f=Math.cos(o),l=Math.cos(r),u=Math.cos(s),A=n[0],d=n[1],B=n[2];t[0]=A*u*l,t[1]=A*c*l,t[2]=A*-a,t[3]=d*(-c*f+u*a*i),t[4]=d*(u*f+c*a*i),t[5]=d*l*i,t[6]=B*(c*i+u*a*f),t[7]=B*(-u*i+c*a*f),t[8]=B*l*f}function qe(t){return t[0]=t[0],t[1]=t[1],t[2]=t[2],t[3]=t[4],t[4]=t[5],t[5]=t[6],t[6]=t[8],t[7]=t[9],t[8]=t[10],t[9]=t[12],t[10]=t[13],t[11]=t[14],t.subarray(0,12)}const Rr={size:12,accessor:["getOrientation","getScale","getTranslation","getTransformMatrix"],shaderAttributes:{instanceModelMatrixCol0:{size:3,elementOffset:0},instanceModelMatrixCol1:{size:3,elementOffset:3},instanceModelMatrixCol2:{size:3,elementOffset:6},instanceTranslation:{size:3,elementOffset:9}},update(t,{startRow:e,endRow:n}){const{data:r,getOrientation:s,getScale:o,getTranslation:i,getTransformMatrix:a}=this.props,c=Array.isArray(a),f=c&&a.length===16,l=Array.isArray(o),u=Array.isArray(s),A=Array.isArray(i),d=f||!c&&!!a(r[0]);d?t.constant=f:t.constant=u&&l&&A;const B=t.value;if(t.constant){let h;d?(Z.set(a),h=qe(Z)):(h=ze,Ze(h,s,o),h.set(i,9)),t.value=new Float32Array(h)}else{let h=e*t.size;const{iterable:p,objectInfo:C}=pn(r,e,n);for(const I of p){C.index++;let m;if(d)Z.set(f?a:a(I,C)),m=qe(Z);else{m=ze;const N=u?s:s(I,C),jt=l?o:o(I,C);Ze(m,N,jt),m.set(A?i:i(I,C),9)}B[h++]=m[0],B[h++]=m[1],B[h++]=m[2],B[h++]=m[3],B[h++]=m[4],B[h++]=m[5],B[h++]=m[6],B[h++]=m[7],B[h++]=m[8],B[h++]=m[9],B[h++]=m[10],B[h++]=m[11]}}}};function yr(t,e){return e===de.CARTESIAN||e===de.METER_OFFSETS||e===de.DEFAULT&&!t.isGeospatial}const _r="4.3.3",oe={TRANSCODER:"basis_transcoder.js",TRANSCODER_WASM:"basis_transcoder.wasm",ENCODER:"basis_encoder.js",ENCODER_WASM:"basis_encoder.wasm"};let $e;async function et(t){Rn(t.modules);const e=yn("basis");return e||($e||=Gr(t),await $e)}async function Gr(t){let e=null,n=null;return[e,n]=await Promise.all([await D(oe.TRANSCODER,"textures",t),await D(oe.TRANSCODER_WASM,"textures",t)]),e=e||globalThis.BASIS,await Dr(e,n)}function Dr(t,e){const n={};return e&&(n.wasmBinary=e),new Promise(r=>{t(n).then(s=>{const{BasisFile:o,initializeBasis:i}=s;i(),r({BasisFile:o})})})}let ge;async function tt(t){const e=t.modules||{};return e.basisEncoder?e.basisEncoder:(ge=ge||vr(t),await ge)}async function vr(t){let e=null,n=null;return[e,n]=await Promise.all([await D(oe.ENCODER,"textures",t),await D(oe.ENCODER_WASM,"textures",t)]),e=e||globalThis.BASIS,await Sr(e,n)}function Sr(t,e){const n={};return e&&(n.wasmBinary=e),new Promise(r=>{t(n).then(s=>{const{BasisFile:o,KTX2File:i,initializeBasis:a,BasisEncoder:c}=s;a(),r({BasisFile:o,KTX2File:i,BasisEncoder:c})})})}const S={COMPRESSED_RGB_S3TC_DXT1_EXT:33776,COMPRESSED_RGBA_S3TC_DXT5_EXT:33779,COMPRESSED_RGB_PVRTC_4BPPV1_IMG:35840,COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:35842,COMPRESSED_RGB_ETC1_WEBGL:36196,COMPRESSED_RGBA_ASTC_4X4_KHR:37808},Or=["","WEBKIT_","MOZ_"],nt={WEBGL_compressed_texture_s3tc:"dxt",WEBGL_compressed_texture_s3tc_srgb:"dxt-srgb",WEBGL_compressed_texture_etc1:"etc1",WEBGL_compressed_texture_etc:"etc2",WEBGL_compressed_texture_pvrtc:"pvrtc",WEBGL_compressed_texture_atc:"atc",WEBGL_compressed_texture_astc:"astc",EXT_texture_compression_rgtc:"rgtc"};let q=null;function Lr(t){if(!q){t=t||xr()||void 0,q=new Set;for(const e of Or)for(const n in nt)if(t&&t.getExtension(`${e}${n}`)){const r=nt[n];q.add(r)}}return q}function xr(){try{return document.createElement("canvas").getContext("webgl")}catch{return null}}const M=[171,75,84,88,32,50,48,187,13,10,26,10];function Hr(t){const e=new Uint8Array(t);return!(e.byteLength<M.length||e[0]!==M[0]||e[1]!==M[1]||e[2]!==M[2]||e[3]!==M[3]||e[4]!==M[4]||e[5]!==M[5]||e[6]!==M[6]||e[7]!==M[7]||e[8]!==M[8]||e[9]!==M[9]||e[10]!==M[10]||e[11]!==M[11])}const Pr={etc1:{basisFormat:0,compressed:!0,format:S.COMPRESSED_RGB_ETC1_WEBGL},etc2:{basisFormat:1,compressed:!0},bc1:{basisFormat:2,compressed:!0,format:S.COMPRESSED_RGB_S3TC_DXT1_EXT},bc3:{basisFormat:3,compressed:!0,format:S.COMPRESSED_RGBA_S3TC_DXT5_EXT},bc4:{basisFormat:4,compressed:!0},bc5:{basisFormat:5,compressed:!0},"bc7-m6-opaque-only":{basisFormat:6,compressed:!0},"bc7-m5":{basisFormat:7,compressed:!0},"pvrtc1-4-rgb":{basisFormat:8,compressed:!0,format:S.COMPRESSED_RGB_PVRTC_4BPPV1_IMG},"pvrtc1-4-rgba":{basisFormat:9,compressed:!0,format:S.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG},"astc-4x4":{basisFormat:10,compressed:!0,format:S.COMPRESSED_RGBA_ASTC_4X4_KHR},"atc-rgb":{basisFormat:11,compressed:!0},"atc-rgba-interpolated-alpha":{basisFormat:12,compressed:!0},rgba32:{basisFormat:13,compressed:!1},rgb565:{basisFormat:14,compressed:!1},bgr565:{basisFormat:15,compressed:!1},rgba4444:{basisFormat:16,compressed:!1}};async function Ur(t,e){if(e.basis.containerFormat==="auto"){if(Hr(t)){const r=await tt(e);return rt(r.KTX2File,t,e)}const{BasisFile:n}=await et(e);return be(n,t,e)}switch(e.basis.module){case"encoder":const n=await tt(e);switch(e.basis.containerFormat){case"ktx2":return rt(n.KTX2File,t,e);case"basis":default:return be(n.BasisFile,t,e)}case"transcoder":default:const{BasisFile:r}=await et(e);return be(r,t,e)}}function be(t,e,n){const r=new t(new Uint8Array(e));try{if(!r.startTranscoding())throw new Error("Failed to start basis transcoding");const s=r.getNumImages(),o=[];for(let i=0;i<s;i++){const a=r.getNumLevels(i),c=[];for(let f=0;f<a;f++)c.push(Nr(r,i,f,n));o.push(c)}return o}finally{r.close(),r.delete()}}function Nr(t,e,n,r){const s=t.getImageWidth(e,n),o=t.getImageHeight(e,n),i=t.getHasAlpha(),{compressed:a,format:c,basisFormat:f}=It(r,i),l=t.getImageTranscodedSizeInBytes(e,n,f),u=new Uint8Array(l);if(!t.transcodeImage(u,e,n,f,0,0))throw new Error("failed to start Basis transcoding");return{width:s,height:o,data:u,compressed:a,format:c,hasAlpha:i}}function rt(t,e,n){const r=new t(new Uint8Array(e));try{if(!r.startTranscoding())throw new Error("failed to start KTX2 transcoding");const s=r.getLevels(),o=[];for(let i=0;i<s;i++)o.push(Jr(r,i,n));return[o]}finally{r.close(),r.delete()}}function Jr(t,e,n){const{alphaFlag:r,height:s,width:o}=t.getImageLevelInfo(e,0,0),{compressed:i,format:a,basisFormat:c}=It(n,r),f=t.getImageTranscodedSizeInBytes(e,0,0,c),l=new Uint8Array(f);if(!t.transcodeImage(l,e,0,0,c,0,-1,-1))throw new Error("Failed to transcode KTX2 image");return{width:o,height:s,data:l,compressed:i,levelSize:f,hasAlpha:r,format:a}}function It(t,e){let n=t&&t.basis&&t.basis.format;return n==="auto"&&(n=Mt()),typeof n=="object"&&(n=e?n.alpha:n.noAlpha),n=n.toLowerCase(),Pr[n]}function Mt(){const t=Lr();return t.has("astc")?"astc-4x4":t.has("dxt")?{alpha:"bc3",noAlpha:"bc1"}:t.has("pvrtc")?{alpha:"pvrtc1-4-rgba",noAlpha:"pvrtc1-4-rgb"}:t.has("etc1")?"etc1":t.has("etc2")?"etc2":"rgb565"}const wr={dataType:null,batchType:null,name:"Basis",id:"basis",module:"textures",version:_r,worker:!0,extensions:["basis","ktx2"],mimeTypes:["application/octet-stream","image/ktx2"],tests:["sB"],binary:!0,options:{basis:{format:"auto",libraryPath:"libs/",containerFormat:"auto",module:"transcoder"}}},Kr={...wr,parse:Ur};function jr(t){return{addressModeU:st(t.wrapS),addressModeV:st(t.wrapT),magFilter:Xr(t.magFilter),...Vr(t.minFilter)}}function st(t){switch(t){case 33071:return"clamp-to-edge";case 10497:return"repeat";case 33648:return"mirror-repeat";default:return}}function Xr(t){switch(t){case 9728:return"nearest";case 9729:return"linear";default:return}}function Vr(t){switch(t){case 9728:return{minFilter:"nearest"};case 9729:return{minFilter:"linear"};case 9984:return{minFilter:"nearest",mipmapFilter:"nearest"};case 9985:return{minFilter:"linear",mipmapFilter:"nearest"};case 9986:return{minFilter:"nearest",mipmapFilter:"linear"};case 9987:return{minFilter:"linear",mipmapFilter:"linear"};default:return{}}}function Qr(t,e,n,r){const s={defines:{MANUAL_SRGB:!0,SRGB_FAST_APPROXIMATION:!0},bindings:{},uniforms:{camera:[0,0,0],metallicRoughnessValues:[1,1]},parameters:{},glParameters:{},generatedTextures:[]};s.defines.USE_TEX_LOD=!0;const{imageBasedLightingEnvironment:o}=r;return o&&(s.bindings.pbr_diffuseEnvSampler=o.diffuseEnvSampler.texture,s.bindings.pbr_specularEnvSampler=o.specularEnvSampler.texture,s.bindings.pbr_BrdfLUT=o.brdfLutTexture.texture,s.uniforms.scaleIBLAmbient=[1,1]),r?.pbrDebug&&(s.defines.PBR_DEBUG=!0,s.uniforms.scaleDiffBaseMR=[0,0,0,0],s.uniforms.scaleFGDSpec=[0,0,0,0]),n.NORMAL&&(s.defines.HAS_NORMALS=!0),n.TANGENT&&r?.useTangents&&(s.defines.HAS_TANGENTS=!0),n.TEXCOORD_0&&(s.defines.HAS_UV=!0),r?.imageBasedLightingEnvironment&&(s.defines.USE_IBL=!0),r?.lights&&(s.defines.USE_LIGHTS=!0),e&&Yr(t,e,s),s}function Yr(t,e,n){if(n.uniforms.unlit=!!e.unlit,e.pbrMetallicRoughness&&kr(t,e.pbrMetallicRoughness,n),e.normalTexture){w(t,e.normalTexture,"pbr_normalSampler","HAS_NORMALMAP",n);const{scale:r=1}=e.normalTexture;n.uniforms.normalScale=r}if(e.occlusionTexture){w(t,e.occlusionTexture,"pbr_occlusionSampler","HAS_OCCLUSIONMAP",n);const{strength:r=1}=e.occlusionTexture;n.uniforms.occlusionStrength=r}switch(e.emissiveTexture&&(w(t,e.emissiveTexture,"pbr_emissiveSampler","HAS_EMISSIVEMAP",n),n.uniforms.emissiveFactor=e.emissiveFactor||[0,0,0]),e.alphaMode||"MASK"){case"MASK":const{alphaCutoff:r=.5}=e;n.defines.ALPHA_CUTOFF=!0,n.uniforms.alphaCutoff=r;break;case"BLEND":v.warn("glTF BLEND alphaMode might not work well because it requires mesh sorting")(),n.parameters.blend=!0,n.parameters.blendColorOperation="add",n.parameters.blendColorSrcFactor="src-alpha",n.parameters.blendColorDstFactor="one-minus-src-alpha",n.parameters.blendAlphaOperation="add",n.parameters.blendAlphaSrcFactor="one",n.parameters.blendAlphaDstFactor="one-minus-src-alpha",n.glParameters.blend=!0,n.glParameters.blendEquation=32774,n.glParameters.blendFunc=[770,771,1,771];break}}function kr(t,e,n){e.baseColorTexture&&w(t,e.baseColorTexture,"pbr_baseColorSampler","HAS_BASECOLORMAP",n),n.uniforms.baseColorFactor=e.baseColorFactor||[1,1,1,1],e.metallicRoughnessTexture&&w(t,e.metallicRoughnessTexture,"pbr_metallicRoughnessSampler","HAS_METALROUGHNESSMAP",n);const{metallicFactor:r=1,roughnessFactor:s=1}=e;n.uniforms.metallicRoughnessValues=[r,s]}function w(t,e,n,r,s){const o=e.texture.source.image;let i;o.compressed?i=o:i={data:o};const a={wrapS:10497,wrapT:10497,...e?.texture?.sampler},c=t.createTexture({id:e.uniformName||e.id,sampler:jr(a),...i});s.bindings[n]=c,r&&(s.defines[r]=!0),s.generatedTextures.push(c)}var y;(function(t){t[t.POINTS=0]="POINTS",t[t.LINES=1]="LINES",t[t.LINE_LOOP=2]="LINE_LOOP",t[t.LINE_STRIP=3]="LINE_STRIP",t[t.TRIANGLES=4]="TRIANGLES",t[t.TRIANGLE_STRIP=5]="TRIANGLE_STRIP",t[t.TRIANGLE_FAN=6]="TRIANGLE_FAN"})(y||(y={}));function Wr(t){switch(t){case y.POINTS:return"point-list";case y.LINES:return"line-list";case y.LINE_STRIP:return"line-strip";case y.TRIANGLES:return"triangle-list";case y.TRIANGLE_STRIP:return"triangle-strip";default:throw new Error(String(t))}}const zr=`
layout(0) positions: vec4; // in vec4 POSITION;

  #ifdef HAS_NORMALS
    in vec4 normals; // in vec4 NORMAL;
  #endif

  #ifdef HAS_TANGENTS
    in vec4 TANGENT;
  #endif

  #ifdef HAS_UV
    // in vec2 TEXCOORD_0;
    in vec2 texCoords;
  #endif

@vertex
  void main(void) {
    vec4 _NORMAL = vec4(0.);
    vec4 _TANGENT = vec4(0.);
    vec2 _TEXCOORD_0 = vec2(0.);

    #ifdef HAS_NORMALS
      _NORMAL = normals;
    #endif

    #ifdef HAS_TANGENTS
      _TANGENT = TANGENT;
    #endif

    #ifdef HAS_UV
      _TEXCOORD_0 = texCoords;
    #endif

    pbr_setPositionNormalTangentUV(positions, _NORMAL, _TANGENT, _TEXCOORD_0);
    gl_Position = u_MVPMatrix * positions;
  }

@fragment
  out vec4 fragmentColor;

  void main(void) {
    vec3 pos = pbr_vPosition;
    fragmentColor = pbr_filterColor(vec4(1.0));
  }
`,Zr=`#version 300 es

  // in vec4 POSITION;
  in vec4 positions;

  #ifdef HAS_NORMALS
    // in vec4 NORMAL;
    in vec4 normals;
  #endif

  #ifdef HAS_TANGENTS
    in vec4 TANGENT;
  #endif

  #ifdef HAS_UV
    // in vec2 TEXCOORD_0;
    in vec2 texCoords;
  #endif

  void main(void) {
    vec4 _NORMAL = vec4(0.);
    vec4 _TANGENT = vec4(0.);
    vec2 _TEXCOORD_0 = vec2(0.);

    #ifdef HAS_NORMALS
      _NORMAL = normals;
    #endif

    #ifdef HAS_TANGENTS
      _TANGENT = TANGENT;
    #endif

    #ifdef HAS_UV
      _TEXCOORD_0 = texCoords;
    #endif

    pbr_setPositionNormalTangentUV(positions, _NORMAL, _TANGENT, _TEXCOORD_0);
    gl_Position = pbrProjection.modelViewProjectionMatrix * positions;
  }
`,qr=`#version 300 es
  out vec4 fragmentColor;

  void main(void) {
    vec3 pos = pbr_vPosition;
    fragmentColor = pbr_filterColor(vec4(1.0));
  }
`;function $r(t,e){const{id:n,geometry:r,parsedPPBRMaterial:s,vertexCount:o,modelOptions:i={}}=e;v.info(4,"createGLTFModel defines: ",s.defines)();const a=[],c={depthWriteEnabled:!0,depthCompare:"less",depthFormat:"depth24plus",cullMode:"back"},f={id:n,source:zr,vs:Zr,fs:qr,geometry:r,topology:r.topology,vertexCount:o,modules:[Et],...i,defines:{...s.defines,...i.defines},parameters:{...c,...s.parameters,...i.parameters}},l=new Cn(t,f),{camera:u,...A}={...s.uniforms,...i.uniforms,...s.bindings,...i.bindings};return l.shaderInputs.setProps({pbrMaterial:A,pbrProjection:{camera:u}}),new Ge({managedResources:a,model:l})}const es={modelOptions:{},pbrDebug:!1,imageBasedLightingEnvironment:void 0,lights:!0,useTangents:!1};function ts(t,e,n={}){const r={...es,...n};return e.scenes.map(o=>ns(t,o,e.nodes,r))}function ns(t,e,n,r){const o=(e.nodes||[]).map(a=>Tt(t,a,n,r));return new U({id:e.name||e.id,children:o})}function Tt(t,e,n,r){if(!e._node){const i=(e.children||[]).map(c=>Tt(t,c,n,r));e.mesh&&i.push(rs(t,e.mesh,r));const a=new U({id:e.name||e.id,children:i});if(e.matrix)a.setMatrix(e.matrix);else{if(a.matrix.identity(),e.translation&&a.matrix.translate(e.translation),e.rotation){const c=new x().fromQuaternion(e.rotation);a.matrix.multiplyRight(c)}e.scale&&a.matrix.scale(e.scale)}e._node=a}const s=n.find(o=>o.id===e.id);return s._node=e._node,e._node}function rs(t,e,n){if(!e._mesh){const s=(e.primitives||[]).map((i,a)=>ss(t,i,a,e,n)),o=new U({id:e.name||e.id,children:s});e._mesh=o}return e._mesh}function ss(t,e,n,r,s){const o=e.name||`${r.name||r.id}-primitive-${n}`,i=Wr(e.mode||4),a=e.indices?e.indices.count:os(e.attributes),c=ot(o,e,i),f=Qr(t,e.material,c.attributes,s),l=$r(t,{id:o,geometry:ot(o,e,i),parsedPPBRMaterial:f,modelOptions:s.modelOptions,vertexCount:a});return l.bounds=[e.attributes.POSITION.min,e.attributes.POSITION.max],l}function os(t){throw new Error("getVertexCount not implemented")}function ot(t,e,n){const r={};for(const[s,o]of Object.entries(e.attributes)){const{components:i,size:a,value:c}=o;r[s]={size:a??i,value:c}}return new gn({id:t,topology:n,indices:e.indices.value,attributes:r})}const Ee=new hr;function is(t,{input:e,interpolation:n,output:r},s,o){const i=e[e.length-1],a=t%i,c=e.findIndex(A=>A>=a),f=Math.max(0,c-1);if(!Array.isArray(s[o]))switch(o){case"translation":s[o]=[0,0,0];break;case"rotation":s[o]=[0,0,0,1];break;case"scale":s[o]=[1,1,1];break;default:v.warn(`Bad animation path ${o}`)()}const l=e[f],u=e[c];switch(n){case"STEP":fs(s,o,r[f]);break;case"LINEAR":if(u>l){const A=(a-l)/(u-l);as(s,o,r[f],r[c],A)}break;case"CUBICSPLINE":if(u>l){const A=(a-l)/(u-l),d=u-l,B=r[3*f+1],h=r[3*f+2],p=r[3*c+0],C=r[3*c+1];cs(s,o,{p0:B,outTangent0:h,inTangent1:p,p1:C,tDiff:d,ratio:A})}break;default:v.warn(`Interpolation ${n} not supported`)();break}}function as(t,e,n,r,s){if(!t[e])throw new Error;if(e==="rotation"){Ee.slerp({start:n,target:r,ratio:s});for(let o=0;o<Ee.length;o++)t[e][o]=Ee[o]}else for(let o=0;o<n.length;o++)t[e][o]=s*r[o]+(1-s)*n[o]}function cs(t,e,{p0:n,outTangent0:r,inTangent1:s,p1:o,tDiff:i,ratio:a}){if(!t[e])throw new Error;for(let c=0;c<t[e].length;c++){const f=r[c]*i,l=s[c]*i;t[e][c]=(2*Math.pow(a,3)-3*Math.pow(a,2)+1)*n[c]+(Math.pow(a,3)-2*Math.pow(a,2)+a)*f+(-2*Math.pow(a,3)+3*Math.pow(a,2))*o[c]+(Math.pow(a,3)-Math.pow(a,2))*l}}function fs(t,e,n){if(!t[e])throw new Error;for(let r=0;r<n.length;r++)t[e][r]=n[r]}class ls{animation;startTime=0;playing=!0;speed=1;constructor(e){this.animation=e.animation,this.animation.name||="unnamed",Object.assign(this,e)}setTime(e){if(!this.playing)return;const r=(e/1e3-this.startTime)*this.speed;this.animation.channels.forEach(({sampler:s,target:o,path:i})=>{is(r,s,o,i),ds(o,o._node)})}}class us{animations;constructor(e){this.animations=e.animations.map((n,r)=>{const s=n.name||`Animation-${r}`;return new ls({animation:{name:s,channels:n.channels}})})}animate(e){v.warn("GLTFAnimator#animate is deprecated. Use GLTFAnimator#setTime instead")(),this.setTime(e)}setTime(e){this.animations.forEach(n=>n.setTime(e))}getAnimations(){return this.animations}}const As=new x;function ds(t,e){if(e.matrix.identity(),t.translation&&e.matrix.translate(t.translation),t.rotation){const n=As.fromQuaternion(t.rotation);e.matrix.multiplyRight(n)}t.scale&&e.matrix.scale(t.scale)}const Bs={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},hs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array};function ms(t){const e=hs[t.componentType],n=Bs[t.type],r=n*t.count,{buffer:s,byteOffset:o=0}=t.bufferView?.data??{};return{typedArray:new e(s,o+(t.byteOffset||0),r),components:n}}function ps(t){return(t.animations||[]).map((n,r)=>{const s=n.name||`Animation-${r}`,o=n.samplers.map(({input:a,interpolation:c="LINEAR",output:f})=>({input:it(t.accessors[a]),interpolation:c,output:it(t.accessors[f])})),i=n.channels.map(({sampler:a,target:c})=>({sampler:o[a],target:t.nodes[c.node??0],path:c.path}));return{name:s,channels:i}})}function it(t){if(!t._animation){const{typedArray:e,components:n}=ms(t);if(n===1)t._animation=Array.from(e);else{const r=[];for(let s=0;s<e.length;s+=n)r.push(Array.from(e.slice(s,s+n)));t._animation=r}}return t._animation}function De(t){if(ArrayBuffer.isView(t)||t instanceof ArrayBuffer||t instanceof ImageBitmap)return t;if(Array.isArray(t))return t.map(De);if(t&&typeof t=="object"){const e={};for(const n in t)e[n]=De(t[n]);return e}return t}function Cs(t,e,n){e=De(e);const r=ts(t,e,n),s=ps(e),o=new us({animations:s});return{scenes:r,animator:o}}function T(t,e){if(!t)throw new Error(e||"assert failed: gltf")}const Ft={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Rt={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4},gs=1.33,at=["SCALAR","VEC2","VEC3","VEC4"],bs=[[Int8Array,5120],[Uint8Array,5121],[Int16Array,5122],[Uint16Array,5123],[Uint32Array,5125],[Float32Array,5126],[Float64Array,5130]],Es=new Map(bs),Is={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ms={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4},Ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array};function yt(t){return at[t-1]||at[0]}function ce(t){const e=Es.get(t.constructor);if(!e)throw new Error("Illegal typed array");return e}function He(t,e){const n=Ts[t.componentType],r=Is[t.type],s=Ms[t.componentType],o=t.count*r,i=t.count*r*s;T(i>=0&&i<=e.byteLength);const a=Rt[t.componentType],c=Ft[t.type];return{ArrayType:n,length:o,byteLength:i,componentByteSize:a,numberOfComponentsInElement:c}}function Ka(t){let{images:e,bufferViews:n}=t;e=e||[],n=n||[];const r=e.map(i=>i.bufferView);n=n.filter(i=>!r.includes(i));const s=n.reduce((i,a)=>i+a.byteLength,0),o=e.reduce((i,a)=>{const{width:c,height:f}=a.image;return i+c*f},0);return s+Math.ceil(4*o*gs)}function Fs(t,e,n){const r=t.bufferViews[n];T(r);const s=r.buffer,o=e[s];T(o);const i=(r.byteOffset||0)+o.byteOffset;return new Uint8Array(o.arrayBuffer,i,r.byteLength)}function Rs(t,e,n){const r=typeof n=="number"?t.accessors?.[n]:n;if(!r)throw new Error(`No gltf accessor ${JSON.stringify(n)}`);const s=t.bufferViews?.[r.bufferView||0];if(!s)throw new Error(`No gltf buffer view for accessor ${s}`);const{arrayBuffer:o,byteOffset:i}=e[s.buffer],a=(i||0)+(r.byteOffset||0)+(s.byteOffset||0),{ArrayType:c,length:f,componentByteSize:l,numberOfComponentsInElement:u}=He(r,s),A=l*u,d=s.byteStride||A;if(typeof s.byteStride>"u"||s.byteStride===A)return new c(o,a,f);const B=new c(f);for(let h=0;h<r.count;h++){const p=new c(o,a+h*d,u);B.set(p,h*u)}return B}function ys(){return{asset:{version:"2.0",generator:"loaders.gl"},buffers:[],extensions:{},extensionsRequired:[],extensionsUsed:[]}}class g{gltf;sourceBuffers;byteLength;constructor(e){this.gltf={json:e?.json||ys(),buffers:e?.buffers||[],images:e?.images||[]},this.sourceBuffers=[],this.byteLength=0,this.gltf.buffers&&this.gltf.buffers[0]&&(this.byteLength=this.gltf.buffers[0].byteLength,this.sourceBuffers=[this.gltf.buffers[0]])}get json(){return this.gltf.json}getApplicationData(e){return this.json[e]}getExtraData(e){return(this.json.extras||{})[e]}hasExtension(e){const n=this.getUsedExtensions().find(s=>s===e),r=this.getRequiredExtensions().find(s=>s===e);return typeof n=="string"||typeof r=="string"}getExtension(e){const n=this.getUsedExtensions().find(s=>s===e),r=this.json.extensions||{};return n?r[e]:null}getRequiredExtension(e){return this.getRequiredExtensions().find(r=>r===e)?this.getExtension(e):null}getRequiredExtensions(){return this.json.extensionsRequired||[]}getUsedExtensions(){return this.json.extensionsUsed||[]}getRemovedExtensions(){return this.json.extensionsRemoved||[]}getObjectExtension(e,n){return(e.extensions||{})[n]}getScene(e){return this.getObject("scenes",e)}getNode(e){return this.getObject("nodes",e)}getSkin(e){return this.getObject("skins",e)}getMesh(e){return this.getObject("meshes",e)}getMaterial(e){return this.getObject("materials",e)}getAccessor(e){return this.getObject("accessors",e)}getTexture(e){return this.getObject("textures",e)}getSampler(e){return this.getObject("samplers",e)}getImage(e){return this.getObject("images",e)}getBufferView(e){return this.getObject("bufferViews",e)}getBuffer(e){return this.getObject("buffers",e)}getObject(e,n){if(typeof n=="object")return n;const r=this.json[e]&&this.json[e][n];if(!r)throw new Error(`glTF file error: Could not find ${e}[${n}]`);return r}getTypedArrayForBufferView(e){e=this.getBufferView(e);const n=e.buffer,r=this.gltf.buffers[n];T(r);const s=(e.byteOffset||0)+r.byteOffset;return new Uint8Array(r.arrayBuffer,s,e.byteLength)}getTypedArrayForAccessor(e){const n=this.getAccessor(e);return Rs(this.gltf.json,this.gltf.buffers,n)}getTypedArrayForImageData(e){e=this.getAccessor(e);const n=this.getBufferView(e.bufferView),s=this.getBuffer(n.buffer).data,o=n.byteOffset||0;return new Uint8Array(s,o,n.byteLength)}addApplicationData(e,n){return this.json[e]=n,this}addExtraData(e,n){return this.json.extras=this.json.extras||{},this.json.extras[e]=n,this}addObjectExtension(e,n,r){return e.extensions=e.extensions||{},e.extensions[n]=r,this.registerUsedExtension(n),this}setObjectExtension(e,n,r){const s=e.extensions||{};s[n]=r}removeObjectExtension(e,n){const r=e?.extensions||{};if(r[n]){this.json.extensionsRemoved=this.json.extensionsRemoved||[];const s=this.json.extensionsRemoved;s.includes(n)||s.push(n)}delete r[n]}addExtension(e,n={}){return T(n),this.json.extensions=this.json.extensions||{},this.json.extensions[e]=n,this.registerUsedExtension(e),n}addRequiredExtension(e,n={}){return T(n),this.addExtension(e,n),this.registerRequiredExtension(e),n}registerUsedExtension(e){this.json.extensionsUsed=this.json.extensionsUsed||[],this.json.extensionsUsed.find(n=>n===e)||this.json.extensionsUsed.push(e)}registerRequiredExtension(e){this.registerUsedExtension(e),this.json.extensionsRequired=this.json.extensionsRequired||[],this.json.extensionsRequired.find(n=>n===e)||this.json.extensionsRequired.push(e)}removeExtension(e){if(this.json.extensions?.[e]){this.json.extensionsRemoved=this.json.extensionsRemoved||[];const n=this.json.extensionsRemoved;n.includes(e)||n.push(e)}this.json.extensions&&delete this.json.extensions[e],this.json.extensionsRequired&&this._removeStringFromArray(this.json.extensionsRequired,e),this.json.extensionsUsed&&this._removeStringFromArray(this.json.extensionsUsed,e)}setDefaultScene(e){this.json.scene=e}addScene(e){const{nodeIndices:n}=e;return this.json.scenes=this.json.scenes||[],this.json.scenes.push({nodes:n}),this.json.scenes.length-1}addNode(e){const{meshIndex:n,matrix:r}=e;this.json.nodes=this.json.nodes||[];const s={mesh:n};return r&&(s.matrix=r),this.json.nodes.push(s),this.json.nodes.length-1}addMesh(e){const{attributes:n,indices:r,material:s,mode:o=4}=e,a={primitives:[{attributes:this._addAttributes(n),mode:o}]};if(r){const c=this._addIndices(r);a.primitives[0].indices=c}return Number.isFinite(s)&&(a.primitives[0].material=s),this.json.meshes=this.json.meshes||[],this.json.meshes.push(a),this.json.meshes.length-1}addPointCloud(e){const r={primitives:[{attributes:this._addAttributes(e),mode:0}]};return this.json.meshes=this.json.meshes||[],this.json.meshes.push(r),this.json.meshes.length-1}addImage(e,n){const r=bn(e),s=n||r?.mimeType,i={bufferView:this.addBufferView(e),mimeType:s};return this.json.images=this.json.images||[],this.json.images.push(i),this.json.images.length-1}addBufferView(e,n=0,r=this.byteLength){const s=e.byteLength;T(Number.isFinite(s)),this.sourceBuffers=this.sourceBuffers||[],this.sourceBuffers.push(e);const o={buffer:n,byteOffset:r,byteLength:s};return this.byteLength+=Q(s,4),this.json.bufferViews=this.json.bufferViews||[],this.json.bufferViews.push(o),this.json.bufferViews.length-1}addAccessor(e,n){const r={bufferView:e,type:yt(n.size),componentType:n.componentType,count:n.count,max:n.max,min:n.min};return this.json.accessors=this.json.accessors||[],this.json.accessors.push(r),this.json.accessors.length-1}addBinaryBuffer(e,n={size:3}){const r=this.addBufferView(e);let s={min:n.min,max:n.max};(!s.min||!s.max)&&(s=this._getAccessorMinMax(e,n.size));const o={size:n.size,componentType:ce(e),count:Math.round(e.length/n.size),min:s.min,max:s.max};return this.addAccessor(r,Object.assign(o,n))}addTexture(e){const{imageIndex:n}=e,r={source:n};return this.json.textures=this.json.textures||[],this.json.textures.push(r),this.json.textures.length-1}addMaterial(e){return this.json.materials=this.json.materials||[],this.json.materials.push(e),this.json.materials.length-1}createBinaryChunk(){const e=this.byteLength,n=new ArrayBuffer(e),r=new Uint8Array(n);let s=0;for(const o of this.sourceBuffers||[])s=xn(o,r,s);this.json?.buffers?.[0]?this.json.buffers[0].byteLength=e:this.json.buffers=[{byteLength:e}],this.gltf.binary=n,this.sourceBuffers=[n],this.gltf.buffers=[{arrayBuffer:n,byteOffset:0,byteLength:n.byteLength}]}_removeStringFromArray(e,n){let r=!0;for(;r;){const s=e.indexOf(n);s>-1?e.splice(s,1):r=!1}}_addAttributes(e={}){const n={};for(const r in e){const s=e[r],o=this._getGltfAttributeName(r),i=this.addBinaryBuffer(s.value,s);n[o]=i}return n}_addIndices(e){return this.addBinaryBuffer(e,{size:1})}_getGltfAttributeName(e){switch(e.toLowerCase()){case"position":case"positions":case"vertices":return"POSITION";case"normal":case"normals":return"NORMAL";case"color":case"colors":return"COLOR_0";case"texcoord":case"texcoords":return"TEXCOORD_0";default:return e}}_getAccessorMinMax(e,n){const r={min:null,max:null};if(e.length<n)return r;r.min=[],r.max=[];const s=e.subarray(0,n);for(const o of s)r.min.push(o),r.max.push(o);for(let o=n;o<e.length;o+=n)for(let i=0;i<n;i++)r.min[0+i]=Math.min(r.min[0+i],e[o+i]),r.max[0+i]=Math.max(r.max[0+i],e[o+i]);return r}}function ct(t){return(t%1+1)%1}const _t={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16,BOOLEAN:1,STRING:1,ENUM:1},_s={INT8:Int8Array,UINT8:Uint8Array,INT16:Int16Array,UINT16:Uint16Array,INT32:Int32Array,UINT32:Uint32Array,INT64:BigInt64Array,UINT64:BigUint64Array,FLOAT32:Float32Array,FLOAT64:Float64Array},Gt={INT8:1,UINT8:1,INT16:2,UINT16:2,INT32:4,UINT32:4,INT64:8,UINT64:8,FLOAT32:4,FLOAT64:8};function Pe(t,e){return Gt[e]*_t[t]}function fe(t,e,n,r){if(n!=="UINT8"&&n!=="UINT16"&&n!=="UINT32"&&n!=="UINT64")return null;const s=t.getTypedArrayForBufferView(e),o=le(s,"SCALAR",n,r+1);return o instanceof BigInt64Array||o instanceof BigUint64Array?null:o}function le(t,e,n,r=1){const s=_t[e],o=_s[n],i=Gt[n],a=r*s,c=a*i;let f=t.buffer,l=t.byteOffset;return l%i!==0&&(f=new Uint8Array(f).slice(l,l+c).buffer,l=0),new o(f,l,a)}function Ue(t,e,n){const r=`TEXCOORD_${e.texCoord||0}`,s=n.attributes[r],o=t.getTypedArrayForAccessor(s),i=t.gltf.json,a=e.index,c=i.textures?.[a]?.source;if(typeof c<"u"){const f=i.images?.[c]?.mimeType,l=t.gltf.images?.[c];if(l&&typeof l.width<"u"){const u=[];for(let A=0;A<o.length;A+=2){const d=Gs(l,f,o,A,e.channels);u.push(d)}return u}}return[]}function Dt(t,e,n,r,s){if(!n?.length)return;const o=[];for(const l of n){let u=r.findIndex(A=>A===l);u===-1&&(u=r.push(l)-1),o.push(u)}const i=new Uint32Array(o),a=t.gltf.buffers.push({arrayBuffer:i.buffer,byteOffset:i.byteOffset,byteLength:i.byteLength})-1,c=t.addBufferView(i,a,0),f=t.addAccessor(c,{size:1,componentType:ce(i),count:i.length});s.attributes[e]=f}function Gs(t,e,n,r,s=[0]){const o={r:{offset:0,shift:0},g:{offset:1,shift:8},b:{offset:2,shift:16},a:{offset:3,shift:24}},i=n[r],a=n[r+1];let c=1;e&&(e.indexOf("image/jpeg")!==-1||e.indexOf("image/png")!==-1)&&(c=4);const f=Ds(i,a,t,c);let l=0;for(const u of s){const A=typeof u=="number"?Object.values(o)[u]:o[u],d=f+A.offset,B=En(t);if(B.data.length<=d)throw new Error(`${B.data.length} <= ${d}`);const h=B.data[d];l|=h<<A.shift}return l}function Ds(t,e,n,r=1){const s=n.width,o=ct(t)*(s-1),i=Math.round(o),a=n.height,c=ct(e)*(a-1),f=Math.round(c),l=n.components?n.components:r;return(f*s+i)*l}function vt(t,e,n,r,s){const o=[];for(let i=0;i<e;i++){const a=n[i],c=n[i+1]-n[i];if(c+a>r)break;const f=a/s,l=c/s;o.push(t.slice(f,f+l))}return o}function St(t,e,n){const r=[];for(let s=0;s<e;s++){const o=s*n;r.push(t.slice(o,o+n))}return r}function Ot(t,e,n,r){if(n)throw new Error("Not implemented - arrayOffsets for strings is specified");if(r){const s=[],o=new TextDecoder("utf8");let i=0;for(let a=0;a<t;a++){const c=r[a+1]-r[a];if(c+i<=e.length){const f=e.subarray(i,c+i),l=o.decode(f);s.push(l),i+=c}}return s}return[]}const L="EXT_mesh_features",vs=L;async function Ss(t,e){const n=new g(t);Ls(n,e)}function Os(t,e){const n=new g(t);return Hs(n),n.createBinaryChunk(),n.gltf}function Ls(t,e){const n=t.gltf.json;if(n.meshes)for(const r of n.meshes)for(const s of r.primitives)xs(t,s,e)}function xs(t,e,n){if(!n?.gltf?.loadBuffers)return;const s=e.extensions?.[L]?.featureIds;if(s)for(const o of s){let i;if(typeof o.attribute<"u"){const a=`_FEATURE_ID_${o.attribute}`,c=e.attributes[a];i=t.getTypedArrayForAccessor(c)}else typeof o.texture<"u"&&n?.gltf?.loadImages?i=Ue(t,o.texture,e):i=[];o.data=i}}function Hs(t,e){const n=t.gltf.json.meshes;if(n)for(const r of n)for(const s of r.primitives)Us(t,s)}function Ps(t,e,n,r){e.extensions||(e.extensions={});let s=e.extensions[L];s||(s={featureIds:[]},e.extensions[L]=s);const{featureIds:o}=s,i={featureCount:n.length,propertyTable:r,data:n};o.push(i),t.addObjectExtension(e,L,s)}function Us(t,e){const n=e.extensions?.[L];if(!n)return;const r=n.featureIds;r.forEach((s,o)=>{if(s.data){const{accessorKey:i,index:a}=Ns(e.attributes),c=new Uint32Array(s.data);r[o]={featureCount:c.length,propertyTable:s.propertyTable,attribute:a},t.gltf.buffers.push({arrayBuffer:c.buffer,byteOffset:c.byteOffset,byteLength:c.byteLength});const f=t.addBufferView(c),l=t.addAccessor(f,{size:1,componentType:ce(c),count:c.length});e.attributes[i]=l}})}function Ns(t){const e="_FEATURE_ID_",n=Object.keys(t).filter(o=>o.indexOf(e)===0);let r=-1;for(const o of n){const i=Number(o.substring(e.length));i>r&&(r=i)}return r++,{accessorKey:`${e}${r}`,index:r}}const Js=Object.freeze(Object.defineProperty({__proto__:null,createExtMeshFeatures:Ps,decode:Ss,encode:Os,name:vs},Symbol.toStringTag,{value:"Module"})),H="EXT_structural_metadata",ws=H;async function Ks(t,e){const n=new g(t);Xs(n,e)}function js(t,e){const n=new g(t);return io(n),n.createBinaryChunk(),n.gltf}function Xs(t,e){if(!e.gltf?.loadBuffers)return;const n=t.getExtension(H);n&&(e.gltf?.loadImages&&Vs(t,n),Qs(t,n))}function Vs(t,e){const n=e.propertyTextures,r=t.gltf.json;if(n&&r.meshes)for(const s of r.meshes)for(const o of s.primitives)ks(t,n,o,e)}function Qs(t,e){const n=e.schema;if(!n)return;const r=n.classes,s=e.propertyTables;if(r&&s)for(const o in r){const i=Ys(s,o);i&&zs(t,n,i)}}function Ys(t,e){for(const n of t)if(n.class===e)return n;return null}function ks(t,e,n,r){if(!e)return;const o=n.extensions?.[H]?.propertyTextures;if(o)for(const i of o){const a=e[i];Ws(t,a,n,r)}}function Ws(t,e,n,r){if(!e.properties)return;r.dataAttributeNames||(r.dataAttributeNames=[]);const s=e.class;for(const o in e.properties){const i=`${s}_${o}`,a=e.properties?.[o];if(!a)continue;a.data||(a.data=[]);const c=a.data,f=Ue(t,a,n);f!==null&&(Dt(t,i,f,c,n),a.data=c,r.dataAttributeNames.push(i))}}function zs(t,e,n){const r=e.classes?.[n.class];if(!r)throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);const s=n.count;for(const o in r.properties){const i=r.properties[o],a=n.properties?.[o];if(a){const c=Zs(t,e,i,s,a);a.data=c}}}function Zs(t,e,n,r,s){let o=[];const i=s.values,a=t.getTypedArrayForBufferView(i),c=qs(t,n,s,r),f=$s(t,s,r);switch(n.type){case"SCALAR":case"VEC2":case"VEC3":case"VEC4":case"MAT2":case"MAT3":case"MAT4":{o=eo(n,r,a,c);break}case"BOOLEAN":throw new Error(`Not implemented - classProperty.type=${n.type}`);case"STRING":{o=Ot(r,a,c,f);break}case"ENUM":{o=to(e,n,r,a,c);break}default:throw new Error(`Unknown classProperty type ${n.type}`)}return o}function qs(t,e,n,r){return e.array&&typeof e.count>"u"&&typeof n.arrayOffsets<"u"?fe(t,n.arrayOffsets,n.arrayOffsetType||"UINT32",r):null}function $s(t,e,n){return typeof e.stringOffsets<"u"?fe(t,e.stringOffsets,e.stringOffsetType||"UINT32",n):null}function eo(t,e,n,r){const s=t.array,o=t.count,i=Pe(t.type,t.componentType),a=n.byteLength/i;let c;return t.componentType?c=le(n,t.type,t.componentType,a):c=n,s?r?vt(c,e,r,n.length,i):o?St(c,e,o):[]:c}function to(t,e,n,r,s){const o=e.enumType;if(!o)throw new Error("Incorrect data in the EXT_structural_metadata extension: classProperty.enumType is not set for type ENUM");const i=t.enums?.[o];if(!i)throw new Error(`Incorrect data in the EXT_structural_metadata extension: schema.enums does't contain ${o}`);const a=i.valueType||"UINT16",c=Pe(e.type,a),f=r.byteLength/c;let l=le(r,e.type,a,f);if(l||(l=r),e.array){if(s)return no({valuesData:l,numberOfElements:n,arrayOffsets:s,valuesDataBytesLength:r.length,elementSize:c,enumEntry:i});const u=e.count;return u?ro(l,n,u,i):[]}return Ne(l,0,n,i)}function no(t){const{valuesData:e,numberOfElements:n,arrayOffsets:r,valuesDataBytesLength:s,elementSize:o,enumEntry:i}=t,a=[];for(let c=0;c<n;c++){const f=r[c],l=r[c+1]-r[c];if(l+f>s)break;const u=f/o,A=l/o,d=Ne(e,u,A,i);a.push(d)}return a}function ro(t,e,n,r){const s=[];for(let o=0;o<e;o++){const i=n*o,a=Ne(t,i,n,r);s.push(a)}return s}function Ne(t,e,n,r){const s=[];for(let o=0;o<n;o++)if(t instanceof BigInt64Array||t instanceof BigUint64Array)s.push("");else{const i=t[e+o],a=so(r,i);a?s.push(a.name):s.push("")}return s}function so(t,e){for(const n of t.values)if(n.value===e)return n;return null}const oo="schemaClassId";function io(t,e){const n=t.getExtension(H);if(n&&n.propertyTables)for(const r of n.propertyTables){const s=r.class,o=n.schema?.classes?.[s];r.properties&&o&&ao(r,o,t)}}function ao(t,e,n){for(const r in t.properties){const s=t.properties[r].data;if(s){const o=e.properties[r];if(o){const i=uo(s,o,n);t.properties[r]=i}}}}function co(t,e,n=oo){let r=t.getExtension(H);r||(r=t.addExtension(H)),r.schema=fo(e,n,r.schema);const s=lo(e,n,r.schema);return r.propertyTables||(r.propertyTables=[]),r.propertyTables.push(s)-1}function fo(t,e,n){const r=n??{id:"schema_id"},s={properties:{}};for(const o of t){const i={type:o.elementType,componentType:o.componentType};s.properties[o.name]=i}return r.classes={},r.classes[e]=s,r}function lo(t,e,n){const r={class:e,count:0};let s=0;const o=n.classes?.[e];for(const i of t){if(s===0&&(s=i.values.length),s!==i.values.length&&i.values.length)throw new Error("Illegal values in attributes");o?.properties[i.name]&&(r.properties||(r.properties={}),r.properties[i.name]={values:0,data:i.values})}return r.count=s,r}function uo(t,e,n){const r={values:0};if(e.type==="STRING"){const{stringData:s,stringOffsets:o}=ho(t);r.stringOffsets=Ie(o,n),r.values=Ie(s,n)}else if(e.type==="SCALAR"&&e.componentType){const s=Bo(t,e.componentType);r.values=Ie(s,n)}return r}const Ao={INT8:Int8Array,UINT8:Uint8Array,INT16:Int16Array,UINT16:Uint16Array,INT32:Int32Array,UINT32:Uint32Array,INT64:Int32Array,UINT64:Uint32Array,FLOAT32:Float32Array,FLOAT64:Float64Array};function Bo(t,e){const n=[];for(const s of t)n.push(Number(s));const r=Ao[e];if(!r)throw new Error("Illegal component type");return new r(n)}function ho(t){const e=new TextEncoder,n=[];let r=0;for(const c of t){const f=e.encode(c);r+=f.length,n.push(f)}const s=new Uint8Array(r),o=[];let i=0;for(const c of n)s.set(c,i),o.push(i),i+=c.length;o.push(i);const a=new Uint32Array(o);return{stringData:s,stringOffsets:a}}function Ie(t,e){return e.gltf.buffers.push({arrayBuffer:t.buffer,byteOffset:t.byteOffset,byteLength:t.byteLength}),e.addBufferView(t)}const mo=Object.freeze(Object.defineProperty({__proto__:null,createExtStructuralMetadata:co,decode:Ks,encode:js,name:ws},Symbol.toStringTag,{value:"Module"})),Lt="EXT_feature_metadata",po=Lt;async function Co(t,e){const n=new g(t);go(n,e)}function go(t,e){if(!e.gltf?.loadBuffers)return;const n=t.getExtension(Lt);n&&(e.gltf?.loadImages&&bo(t,n),Eo(t,n))}function bo(t,e){const n=e.schema;if(!n)return;const r=n.classes,{featureTextures:s}=e;if(r&&s)for(const o in r){const i=r[o],a=Mo(s,o);a&&Fo(t,a,i)}}function Eo(t,e){const n=e.schema;if(!n)return;const r=n.classes,s=e.featureTables;if(r&&s)for(const o in r){const i=Io(s,o);i&&To(t,n,i)}}function Io(t,e){for(const n in t){const r=t[n];if(r.class===e)return r}return null}function Mo(t,e){for(const n in t){const r=t[n];if(r.class===e)return r}return null}function To(t,e,n){if(!n.class)return;const r=e.classes?.[n.class];if(!r)throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);const s=n.count;for(const o in r.properties){const i=r.properties[o],a=n.properties?.[o];if(a){const c=Ro(t,e,i,s,a);a.data=c}}}function Fo(t,e,n){const r=e.class;for(const s in n.properties){const o=e?.properties?.[s];if(o){const i=vo(t,o,r);o.data=i}}}function Ro(t,e,n,r,s){let o=[];const i=s.bufferView,a=t.getTypedArrayForBufferView(i),c=yo(t,n,s,r),f=_o(t,n,s,r);return n.type==="STRING"||n.componentType==="STRING"?o=Ot(r,a,c,f):Go(n)&&(o=Do(n,r,a,c)),o}function yo(t,e,n,r){return e.type==="ARRAY"&&typeof e.componentCount>"u"&&typeof n.arrayOffsetBufferView<"u"?fe(t,n.arrayOffsetBufferView,n.offsetType||"UINT32",r):null}function _o(t,e,n,r){return typeof n.stringOffsetBufferView<"u"?fe(t,n.stringOffsetBufferView,n.offsetType||"UINT32",r):null}function Go(t){const e=["UINT8","INT16","UINT16","INT32","UINT32","INT64","UINT64","FLOAT32","FLOAT64"];return e.includes(t.type)||typeof t.componentType<"u"&&e.includes(t.componentType)}function Do(t,e,n,r){const s=t.type==="ARRAY",o=t.componentCount,i="SCALAR",a=t.componentType||t.type,c=Pe(i,a),f=n.byteLength/c,l=le(n,i,a,f);return s?r?vt(l,e,r,n.length,c):o?St(l,e,o):[]:l}function vo(t,e,n){const r=t.gltf.json;if(!r.meshes)return[];const s=[];for(const o of r.meshes)for(const i of o.primitives)So(t,n,e,s,i);return s}function So(t,e,n,r,s){const o={channels:n.channels,...n.texture},i=Ue(t,o,s);i&&Dt(t,e,i,r,s)}const Oo=Object.freeze(Object.defineProperty({__proto__:null,decode:Co,name:po},Symbol.toStringTag,{value:"Module"})),Lo="4.3.3",P=!0,ft=1735152710,Je=12,ie=8,xo=1313821514,Ho=5130562,Po=0,Uo=0,No=1;function Jo(t,e=0){return`${String.fromCharCode(t.getUint8(e+0))}${String.fromCharCode(t.getUint8(e+1))}${String.fromCharCode(t.getUint8(e+2))}${String.fromCharCode(t.getUint8(e+3))}`}function wo(t,e=0,n={}){const r=new DataView(t),{magic:s=ft}=n,o=r.getUint32(e,!1);return o===s||o===ft}function Ko(t,e,n=0,r={}){const s=new DataView(e),o=Jo(s,n+0),i=s.getUint32(n+4,P),a=s.getUint32(n+8,P);switch(Object.assign(t,{header:{byteOffset:n,byteLength:a,hasBinChunk:!1},type:o,version:i,json:{},binChunks:[]}),n+=Je,t.version){case 1:return jo(t,s,n);case 2:return Xo(t,s,n,r={});default:throw new Error(`Invalid GLB version ${t.version}. Only supports version 1 and 2.`)}}function jo(t,e,n){K(t.header.byteLength>Je+ie);const r=e.getUint32(n+0,P),s=e.getUint32(n+4,P);return n+=ie,K(s===Po),ve(t,e,n,r),n+=r,n+=Se(t,e,n,t.header.byteLength),n}function Xo(t,e,n,r){return K(t.header.byteLength>Je+ie),Vo(t,e,n,r),n+t.header.byteLength}function Vo(t,e,n,r){for(;n+8<=t.header.byteLength;){const s=e.getUint32(n+0,P),o=e.getUint32(n+4,P);switch(n+=ie,o){case xo:ve(t,e,n,s);break;case Ho:Se(t,e,n,s);break;case Uo:r.strict||ve(t,e,n,s);break;case No:r.strict||Se(t,e,n,s);break}n+=Q(s,4)}return n}function ve(t,e,n,r){const s=new Uint8Array(e.buffer,n,r),i=new TextDecoder("utf8").decode(s);return t.json=JSON.parse(i),Q(r,4)}function Se(t,e,n,r){return t.header.hasBinChunk=!0,t.binChunks.push({byteOffset:n,byteLength:r,arrayBuffer:e.buffer}),Q(r,4)}function xt(t,e){if(t.startsWith("data:")||t.startsWith("http:")||t.startsWith("https:"))return t;const r=e.baseUri||e.uri;if(!r)throw new Error(`'baseUri' must be provided to resolve relative url ${t}`);return r.substr(0,r.lastIndexOf("/")+1)+t}const Qo="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",Yo="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",ko=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),Wo=new Uint8Array([32,0,65,253,3,1,2,34,4,106,6,5,11,8,7,20,13,33,12,16,128,9,116,64,19,113,127,15,10,21,22,14,255,66,24,54,136,107,18,23,192,26,114,118,132,17,77,101,130,144,27,87,131,44,45,74,156,154,70,167]),zo={0:"",1:"meshopt_decodeFilterOct",2:"meshopt_decodeFilterQuat",3:"meshopt_decodeFilterExp",NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},Zo={0:"meshopt_decodeVertexBuffer",1:"meshopt_decodeIndexBuffer",2:"meshopt_decodeIndexSequence",ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"};async function qo(t,e,n,r,s,o="NONE"){const i=await $o();ni(i,i.exports[Zo[s]],t,e,n,r,i.exports[zo[o||"NONE"]])}let Me;async function $o(){return Me||(Me=ei()),Me}async function ei(){let t=Qo;WebAssembly.validate(ko)&&(t=Yo,console.log("Warning: meshopt_decoder is using experimental SIMD support"));const e=await WebAssembly.instantiate(ti(t),{});return await e.instance.exports.__wasm_call_ctors(),e.instance}function ti(t){const e=new Uint8Array(t.length);for(let r=0;r<t.length;++r){const s=t.charCodeAt(r);e[r]=s>96?s-71:s>64?s-65:s>47?s+4:s>46?63:62}let n=0;for(let r=0;r<t.length;++r)e[n++]=e[r]<60?Wo[e[r]]:(e[r]-60)*64+e[++r];return e.buffer.slice(0,n)}function ni(t,e,n,r,s,o,i){const a=t.exports.sbrk,c=r+3&-4,f=a(c*s),l=a(o.length),u=new Uint8Array(t.exports.memory.buffer);u.set(o,l);const A=e(f,r,s,l,o.length);if(A===0&&i&&i(f,c,s),n.set(u.subarray(f,f+r*s)),a(f-a(0)),A!==0)throw new Error(`Malformed buffer data: ${A}`)}const ae="EXT_meshopt_compression",ri=ae;async function si(t,e){const n=new g(t);if(!e?.gltf?.decompressMeshes||!e.gltf?.loadBuffers)return;const r=[];for(const s of t.json.bufferViews||[])r.push(oi(n,s));await Promise.all(r),n.removeExtension(ae)}async function oi(t,e){const n=t.getObjectExtension(e,ae);if(n){const{byteOffset:r=0,byteLength:s=0,byteStride:o,count:i,mode:a,filter:c="NONE",buffer:f}=n,l=t.gltf.buffers[f],u=new Uint8Array(l.arrayBuffer,l.byteOffset+r,s),A=new Uint8Array(t.gltf.buffers[e.buffer].arrayBuffer,e.byteOffset,e.byteLength);await qo(A,i,o,u,a,c),t.removeObjectExtension(e,ae)}}const ii=Object.freeze(Object.defineProperty({__proto__:null,decode:si,name:ri},Symbol.toStringTag,{value:"Module"})),O="EXT_texture_webp",ai=O;function ci(t,e){const n=new g(t);if(!Jn("image/webp")){if(n.getRequiredExtensions().includes(O))throw new Error(`gltf: Required extension ${O} not supported by browser`);return}const{json:r}=n;for(const s of r.textures||[]){const o=n.getObjectExtension(s,O);o&&(s.source=o.source),n.removeObjectExtension(s,O)}n.removeExtension(O)}const fi=Object.freeze(Object.defineProperty({__proto__:null,name:ai,preprocess:ci},Symbol.toStringTag,{value:"Module"})),ne="KHR_texture_basisu",li=ne;function ui(t,e){const n=new g(t),{json:r}=n;for(const s of r.textures||[]){const o=n.getObjectExtension(s,ne);o&&(s.source=o.source,n.removeObjectExtension(s,ne))}n.removeExtension(ne)}const Ai=Object.freeze(Object.defineProperty({__proto__:null,name:li,preprocess:ui},Symbol.toStringTag,{value:"Module"})),di="4.3.3",Bi={dataType:null,batchType:null,name:"Draco",id:"draco",module:"draco",version:di,worker:!0,extensions:["drc"],mimeTypes:["application/octet-stream"],binary:!0,tests:["DRACO"],options:{draco:{decoderType:typeof WebAssembly=="object"?"wasm":"js",libraryPath:"libs/",extraAttributes:{},attributeNameEntry:void 0}}};function hi(t,e,n){const r=Ht(e.metadata),s=[],o=mi(e.attributes);for(const i in t){const a=t[i],c=lt(i,a,o[i]);s.push(c)}if(n){const i=lt("indices",n);s.push(i)}return{fields:s,metadata:r}}function mi(t){const e={};for(const n in t){const r=t[n];e[r.name||"undefined"]=r}return e}function lt(t,e,n){const r=n?Ht(n.metadata):void 0;return Un(t,e,r)}function Ht(t){Object.entries(t);const e={};for(const n in t)e[`${n}.string`]=JSON.stringify(t[n]);return e}const ut={POSITION:"POSITION",NORMAL:"NORMAL",COLOR:"COLOR_0",TEX_COORD:"TEXCOORD_0"},pi={1:Int8Array,2:Uint8Array,3:Int16Array,4:Uint16Array,5:Int32Array,6:Uint32Array,9:Float32Array},Ci=4;class gi{draco;decoder;metadataQuerier;constructor(e){this.draco=e,this.decoder=new this.draco.Decoder,this.metadataQuerier=new this.draco.MetadataQuerier}destroy(){this.draco.destroy(this.decoder),this.draco.destroy(this.metadataQuerier)}parseSync(e,n={}){const r=new this.draco.DecoderBuffer;r.Init(new Int8Array(e),e.byteLength),this._disableAttributeTransforms(n);const s=this.decoder.GetEncodedGeometryType(r),o=s===this.draco.TRIANGULAR_MESH?new this.draco.Mesh:new this.draco.PointCloud;try{let i;switch(s){case this.draco.TRIANGULAR_MESH:i=this.decoder.DecodeBufferToMesh(r,o);break;case this.draco.POINT_CLOUD:i=this.decoder.DecodeBufferToPointCloud(r,o);break;default:throw new Error("DRACO: Unknown geometry type.")}if(!i.ok()||!o.ptr){const A=`DRACO decompression failed: ${i.error_msg()}`;throw new Error(A)}const a=this._getDracoLoaderData(o,s,n),c=this._getMeshData(o,a,n),f=Pn(c.attributes),l=hi(c.attributes,a,c.indices);return{loader:"draco",loaderData:a,header:{vertexCount:o.num_points(),boundingBox:f},...c,schema:l}}finally{this.draco.destroy(r),o&&this.draco.destroy(o)}}_getDracoLoaderData(e,n,r){const s=this._getTopLevelMetadata(e),o=this._getDracoAttributes(e,r);return{geometry_type:n,num_attributes:e.num_attributes(),num_points:e.num_points(),num_faces:e instanceof this.draco.Mesh?e.num_faces():0,metadata:s,attributes:o}}_getDracoAttributes(e,n){const r={};for(let s=0;s<e.num_attributes();s++){const o=this.decoder.GetAttribute(e,s),i=this._getAttributeMetadata(e,s);r[o.unique_id()]={unique_id:o.unique_id(),attribute_type:o.attribute_type(),data_type:o.data_type(),num_components:o.num_components(),byte_offset:o.byte_offset(),byte_stride:o.byte_stride(),normalized:o.normalized(),attribute_index:s,metadata:i};const a=this._getQuantizationTransform(o,n);a&&(r[o.unique_id()].quantization_transform=a);const c=this._getOctahedronTransform(o,n);c&&(r[o.unique_id()].octahedron_transform=c)}return r}_getMeshData(e,n,r){const s=this._getMeshAttributes(n,e,r);if(!s.POSITION)throw new Error("DRACO: No position attribute found.");if(e instanceof this.draco.Mesh)switch(r.topology){case"triangle-strip":return{topology:"triangle-strip",mode:4,attributes:s,indices:{value:this._getTriangleStripIndices(e),size:1}};case"triangle-list":default:return{topology:"triangle-list",mode:5,attributes:s,indices:{value:this._getTriangleListIndices(e),size:1}}}return{topology:"point-list",mode:0,attributes:s}}_getMeshAttributes(e,n,r){const s={};for(const o of Object.values(e.attributes)){const i=this._deduceAttributeName(o,r);o.name=i;const a=this._getAttributeValues(n,o);if(a){const{value:c,size:f}=a;s[i]={value:c,size:f,byteOffset:o.byte_offset,byteStride:o.byte_stride,normalized:o.normalized}}}return s}_getTriangleListIndices(e){const r=e.num_faces()*3,s=r*Ci,o=this.draco._malloc(s);try{return this.decoder.GetTrianglesUInt32Array(e,s,o),new Uint32Array(this.draco.HEAPF32.buffer,o,r).slice()}finally{this.draco._free(o)}}_getTriangleStripIndices(e){const n=new this.draco.DracoInt32Array;try{return this.decoder.GetTriangleStripsFromMesh(e,n),Ii(n)}finally{this.draco.destroy(n)}}_getAttributeValues(e,n){const r=pi[n.data_type];if(!r)return console.warn(`DRACO: Unsupported attribute type ${n.data_type}`),null;const s=n.num_components,i=e.num_points()*s,a=i*r.BYTES_PER_ELEMENT,c=bi(this.draco,r);let f;const l=this.draco._malloc(a);try{const u=this.decoder.GetAttribute(e,n.attribute_index);this.decoder.GetAttributeDataArrayForAllPoints(e,u,c,a,l),f=new r(this.draco.HEAPF32.buffer,l,i).slice()}finally{this.draco._free(l)}return{value:f,size:s}}_deduceAttributeName(e,n){const r=e.unique_id;for(const[i,a]of Object.entries(n.extraAttributes||{}))if(a===r)return i;const s=e.attribute_type;for(const i in ut)if(this.draco[i]===s)return ut[i];const o=n.attributeNameEntry||"name";return e.metadata[o]?e.metadata[o].string:`CUSTOM_ATTRIBUTE_${r}`}_getTopLevelMetadata(e){const n=this.decoder.GetMetadata(e);return this._getDracoMetadata(n)}_getAttributeMetadata(e,n){const r=this.decoder.GetAttributeMetadata(e,n);return this._getDracoMetadata(r)}_getDracoMetadata(e){if(!e||!e.ptr)return{};const n={},r=this.metadataQuerier.NumEntries(e);for(let s=0;s<r;s++){const o=this.metadataQuerier.GetEntryName(e,s);n[o]=this._getDracoMetadataField(e,o)}return n}_getDracoMetadataField(e,n){const r=new this.draco.DracoInt32Array;try{this.metadataQuerier.GetIntEntryArray(e,n,r);const s=Ei(r);return{int:this.metadataQuerier.GetIntEntry(e,n),string:this.metadataQuerier.GetStringEntry(e,n),double:this.metadataQuerier.GetDoubleEntry(e,n),intArray:s}}finally{this.draco.destroy(r)}}_disableAttributeTransforms(e){const{quantizedAttributes:n=[],octahedronAttributes:r=[]}=e,s=[...n,...r];for(const o of s)this.decoder.SkipAttributeTransform(this.draco[o])}_getQuantizationTransform(e,n){const{quantizedAttributes:r=[]}=n,s=e.attribute_type();if(r.map(i=>this.decoder[i]).includes(s)){const i=new this.draco.AttributeQuantizationTransform;try{if(i.InitFromAttribute(e))return{quantization_bits:i.quantization_bits(),range:i.range(),min_values:new Float32Array([1,2,3]).map(a=>i.min_value(a))}}finally{this.draco.destroy(i)}}return null}_getOctahedronTransform(e,n){const{octahedronAttributes:r=[]}=n,s=e.attribute_type();if(r.map(i=>this.decoder[i]).includes(s)){const i=new this.draco.AttributeQuantizationTransform;try{if(i.InitFromAttribute(e))return{quantization_bits:i.quantization_bits()}}finally{this.draco.destroy(i)}}return null}}function bi(t,e){switch(e){case Float32Array:return t.DT_FLOAT32;case Int8Array:return t.DT_INT8;case Int16Array:return t.DT_INT16;case Int32Array:return t.DT_INT32;case Uint8Array:return t.DT_UINT8;case Uint16Array:return t.DT_UINT16;case Uint32Array:return t.DT_UINT32;default:return t.DT_INVALID}}function Ei(t){const e=t.size(),n=new Int32Array(e);for(let r=0;r<e;r++)n[r]=t.GetValue(r);return n}function Ii(t){const e=t.size(),n=new Int32Array(e);for(let r=0;r<e;r++)n[r]=t.GetValue(r);return n}const Mi="1.5.6",Ti="1.4.1",Te=`https://www.gstatic.com/draco/versioned/decoders/${Mi}`,E={DECODER:"draco_wasm_wrapper.js",DECODER_WASM:"draco_decoder.wasm",FALLBACK_DECODER:"draco_decoder.js",ENCODER:"draco_encoder.js"},Fe={[E.DECODER]:`${Te}/${E.DECODER}`,[E.DECODER_WASM]:`${Te}/${E.DECODER_WASM}`,[E.FALLBACK_DECODER]:`${Te}/${E.FALLBACK_DECODER}`,[E.ENCODER]:`https://raw.githubusercontent.com/google/draco/${Ti}/javascript/${E.ENCODER}`};let Re;async function Fi(t){const e=t.modules||{};return e.draco3d?Re||=e.draco3d.createDecoderModule({}).then(n=>({draco:n})):Re||=Ri(t),await Re}async function Ri(t){let e,n;switch(t.draco&&t.draco.decoderType){case"js":e=await D(Fe[E.FALLBACK_DECODER],"draco",t,E.FALLBACK_DECODER);break;case"wasm":default:[e,n]=await Promise.all([await D(Fe[E.DECODER],"draco",t,E.DECODER),await D(Fe[E.DECODER_WASM],"draco",t,E.DECODER_WASM)])}return e=e||globalThis.DracoDecoderModule,await yi(e,n)}function yi(t,e){const n={};return e&&(n.wasmBinary=e),new Promise(r=>{t({...n,onModuleLoaded:s=>r({draco:s})})})}const _i={...Bi,parse:Gi};async function Gi(t,e){const{draco:n}=await Fi(e),r=new gi(n);try{return r.parseSync(t,e?.draco)}finally{r.destroy()}}function Di(t){const e={};for(const n in t){const r=t[n];if(n!=="indices"){const s=Pt(r);e[n]=s}}return e}function Pt(t){const{buffer:e,size:n,count:r}=vi(t);return{value:e,size:n,byteOffset:0,count:r,type:yt(n),componentType:ce(e)}}function vi(t){let e=t,n=1,r=0;return t&&t.value&&(e=t.value,n=t.size||1),e&&(ArrayBuffer.isView(e)||(e=Si(e,Float32Array)),r=e.length/n),{buffer:e,size:n,count:r}}function Si(t,e,n=!1){return t?Array.isArray(t)?new e(t):n&&!(t instanceof e)?new e(t):t:null}const R="KHR_draco_mesh_compression",Oi=R;function Li(t,e,n){const r=new g(t);for(const s of Ut(r))r.getObjectExtension(s,R)}async function xi(t,e,n){if(!e?.gltf?.decompressMeshes)return;const r=new g(t),s=[];for(const o of Ut(r))r.getObjectExtension(o,R)&&s.push(Pi(r,o,e,n));await Promise.all(s),r.removeExtension(R)}function Hi(t,e={}){const n=new g(t);for(const r of n.json.meshes||[])Ui(r),n.addRequiredExtension(R)}async function Pi(t,e,n,r){const s=t.getObjectExtension(e,R);if(!s)return;const o=t.getTypedArrayForBufferView(s.bufferView),i=mt(o.buffer,o.byteOffset),a={...n};delete a["3d-tiles"];const c=await pt(i,_i,a,r),f=Di(c.attributes);for(const[l,u]of Object.entries(f))if(l in e.attributes){const A=e.attributes[l],d=t.getAccessor(A);d?.min&&d?.max&&(u.min=d.min,u.max=d.max)}e.attributes=f,c.indices&&(e.indices=Pt(c.indices)),t.removeObjectExtension(e,R),Ni(e)}function Ui(t,e,n=4,r,s){if(!r.DracoWriter)throw new Error("options.gltf.DracoWriter not provided");const o=r.DracoWriter.encodeSync({attributes:t}),i=s?.parseSync?.({attributes:t}),a=r._addFauxAttributes(i.attributes),c=r.addBufferView(o);return{primitives:[{attributes:a,mode:n,extensions:{[R]:{bufferView:c,attributes:a}}}]}}function Ni(t){if(!t.attributes&&Object.keys(t.attributes).length>0)throw new Error("glTF: Empty primitive detected: Draco decompression failure?")}function*Ut(t){for(const e of t.json.meshes||[])for(const n of e.primitives)yield n}const Ji=Object.freeze(Object.defineProperty({__proto__:null,decode:xi,encode:Hi,name:Oi,preprocess:Li},Symbol.toStringTag,{value:"Module"})),ue="KHR_texture_transform",wi=ue,$=new G,Ki=new Y,ji=new Y;async function Xi(t,e){if(!new g(t).hasExtension(ue)||!e.gltf?.loadBuffers)return;const s=t.json.materials||[];for(let o=0;o<s.length;o++)Vi(o,t)}function Vi(t,e){const n=e.json.materials?.[t],r=[n?.pbrMetallicRoughness?.baseColorTexture,n?.emissiveTexture,n?.normalTexture,n?.occlusionTexture,n?.pbrMetallicRoughness?.metallicRoughnessTexture],s=[];for(const o of r)o&&o?.extensions?.[ue]&&Qi(e,t,o,s)}function Qi(t,e,n,r){const s=Yi(n,r);if(!s)return;const o=t.json.meshes||[];for(const i of o)for(const a of i.primitives){const c=a.material;Number.isFinite(c)&&e===c&&ki(t,a,s)}}function Yi(t,e){const n=t.extensions?.[ue],{texCoord:r=0}=t,{texCoord:s=r}=n;if(!(e.findIndex(([i,a])=>i===r&&a===s)!==-1)){const i=Zi(n);return r!==s&&(t.texCoord=s),e.push([r,s]),{originalTexCoord:r,texCoord:s,matrix:i}}return null}function ki(t,e,n){const{originalTexCoord:r,texCoord:s,matrix:o}=n,i=e.attributes[`TEXCOORD_${r}`];if(Number.isFinite(i)){const a=t.json.accessors?.[i];if(a&&a.bufferView){const c=t.json.bufferViews?.[a.bufferView];if(c){const{arrayBuffer:f,byteOffset:l}=t.buffers[c.buffer],u=(l||0)+(a.byteOffset||0)+(c.byteOffset||0),{ArrayType:A,length:d}=He(a,c),B=Rt[a.componentType],h=Ft[a.type],p=c.byteStride||B*h,C=new Float32Array(d);for(let I=0;I<a.count;I++){const m=new A(f,u+I*p,2);$.set(m[0],m[1],1),$.transformByMatrix3(o),C.set([$[0],$[1]],I*h)}r===s?Wi(a,c,t.buffers,C):zi(s,a,e,t,C)}}}}function Wi(t,e,n,r){t.componentType=5126,n.push({arrayBuffer:r.buffer,byteOffset:0,byteLength:r.buffer.byteLength}),e.buffer=n.length-1,e.byteLength=r.buffer.byteLength,e.byteOffset=0,delete e.byteStride}function zi(t,e,n,r,s){r.buffers.push({arrayBuffer:s.buffer,byteOffset:0,byteLength:s.buffer.byteLength});const o=r.json.bufferViews;if(!o)return;o.push({buffer:r.buffers.length-1,byteLength:s.buffer.byteLength,byteOffset:0});const i=r.json.accessors;i&&(i.push({bufferView:o?.length-1,byteOffset:0,componentType:5126,count:e.count,type:"VEC2"}),n.attributes[`TEXCOORD_${t}`]=i.length-1)}function Zi(t){const{offset:e=[0,0],rotation:n=0,scale:r=[1,1]}=t,s=new Y().set(1,0,0,0,1,0,e[0],e[1],1),o=Ki.set(Math.cos(n),Math.sin(n),0,-Math.sin(n),Math.cos(n),0,0,0,1),i=ji.set(r[0],0,0,0,r[1],0,0,0,1);return s.multiplyRight(o).multiplyRight(i)}const qi=Object.freeze(Object.defineProperty({__proto__:null,decode:Xi,name:wi},Symbol.toStringTag,{value:"Module"})),_="KHR_lights_punctual",$i=_;async function ea(t){const e=new g(t),{json:n}=e,r=e.getExtension(_);r&&(e.json.lights=r.lights,e.removeExtension(_));for(const s of n.nodes||[]){const o=e.getObjectExtension(s,_);o&&(s.light=o.light),e.removeObjectExtension(s,_)}}async function ta(t){const e=new g(t),{json:n}=e;if(n.lights){const r=e.addExtension(_);T(!r.lights),r.lights=n.lights,delete n.lights}if(e.json.lights){for(const r of e.json.lights){const s=r.node;e.addObjectExtension(s,_,r)}delete e.json.lights}}const na=Object.freeze(Object.defineProperty({__proto__:null,decode:ea,encode:ta,name:$i},Symbol.toStringTag,{value:"Module"})),X="KHR_materials_unlit",ra=X;async function sa(t){const e=new g(t),{json:n}=e;for(const r of n.materials||[])r.extensions&&r.extensions.KHR_materials_unlit&&(r.unlit=!0),e.removeObjectExtension(r,X);e.removeExtension(X)}function oa(t){const e=new g(t),{json:n}=e;if(e.materials)for(const r of n.materials||[])r.unlit&&(delete r.unlit,e.addObjectExtension(r,X,{}),e.addExtension(X))}const ia=Object.freeze(Object.defineProperty({__proto__:null,decode:sa,encode:oa,name:ra},Symbol.toStringTag,{value:"Module"})),J="KHR_techniques_webgl",aa=J;async function ca(t){const e=new g(t),{json:n}=e,r=e.getExtension(J);if(r){const s=la(r,e);for(const o of n.materials||[]){const i=e.getObjectExtension(o,J);i&&(o.technique=Object.assign({},i,s[i.technique]),o.technique.values=ua(o.technique,e)),e.removeObjectExtension(o,J)}e.removeExtension(J)}}async function fa(t,e){}function la(t,e){const{programs:n=[],shaders:r=[],techniques:s=[]}=t,o=new TextDecoder;return r.forEach(i=>{if(Number.isFinite(i.bufferView))i.code=o.decode(e.getTypedArrayForBufferView(i.bufferView));else throw new Error("KHR_techniques_webgl: no shader code")}),n.forEach(i=>{i.fragmentShader=r[i.fragmentShader],i.vertexShader=r[i.vertexShader]}),s.forEach(i=>{i.program=n[i.program]}),s}function ua(t,e){const n=Object.assign({},t.values);return Object.keys(t.uniforms||{}).forEach(r=>{t.uniforms[r].value&&!(r in n)&&(n[r]=t.uniforms[r].value)}),Object.keys(n).forEach(r=>{typeof n[r]=="object"&&n[r].index!==void 0&&(n[r].texture=e.getTexture(n[r].index))}),n}const Aa=Object.freeze(Object.defineProperty({__proto__:null,decode:ca,encode:fa,name:aa},Symbol.toStringTag,{value:"Module"})),Nt=[mo,Js,ii,fi,Ai,Ji,na,ia,Aa,qi,Oo];function da(t,e={},n){const r=Nt.filter(s=>Jt(s.name,e));for(const s of r)s.preprocess?.(t,e,n)}async function Ba(t,e={},n){const r=Nt.filter(s=>Jt(s.name,e));for(const s of r)await s.decode?.(t,e,n)}function Jt(t,e){const n=e?.gltf?.excludeExtensions||{};return!(t in n&&!n[t])}const ye="KHR_binary_glTF";function ha(t){const e=new g(t),{json:n}=e;for(const r of n.images||[]){const s=e.getObjectExtension(r,ye);s&&Object.assign(r,s),e.removeObjectExtension(r,ye)}n.buffers&&n.buffers[0]&&delete n.buffers[0].uri,e.removeExtension(ye)}const At={accessors:"accessor",animations:"animation",buffers:"buffer",bufferViews:"bufferView",images:"image",materials:"material",meshes:"mesh",nodes:"node",samplers:"sampler",scenes:"scene",skins:"skin",textures:"texture"},ma={accessor:"accessors",animations:"animation",buffer:"buffers",bufferView:"bufferViews",image:"images",material:"materials",mesh:"meshes",node:"nodes",sampler:"samplers",scene:"scenes",skin:"skins",texture:"textures"};class pa{idToIndexMap={animations:{},accessors:{},buffers:{},bufferViews:{},images:{},materials:{},meshes:{},nodes:{},samplers:{},scenes:{},skins:{},textures:{}};json;normalize(e,n){this.json=e.json;const r=e.json;switch(r.asset&&r.asset.version){case"2.0":return;case void 0:case"1.0":break;default:console.warn(`glTF: Unknown version ${r.asset.version}`);return}if(!n.normalize)throw new Error("glTF v1 is not supported.");console.warn("Converting glTF v1 to glTF v2 format. This is experimental and may fail."),this._addAsset(r),this._convertTopLevelObjectsToArrays(r),ha(e),this._convertObjectIdsToArrayIndices(r),this._updateObjects(r),this._updateMaterial(r)}_addAsset(e){e.asset=e.asset||{},e.asset.version="2.0",e.asset.generator=e.asset.generator||"Normalized to glTF 2.0 by loaders.gl"}_convertTopLevelObjectsToArrays(e){for(const n in At)this._convertTopLevelObjectToArray(e,n)}_convertTopLevelObjectToArray(e,n){const r=e[n];if(!(!r||Array.isArray(r))){e[n]=[];for(const s in r){const o=r[s];o.id=o.id||s;const i=e[n].length;e[n].push(o),this.idToIndexMap[n][s]=i}}}_convertObjectIdsToArrayIndices(e){for(const n in At)this._convertIdsToIndices(e,n);"scene"in e&&(e.scene=this._convertIdToIndex(e.scene,"scene"));for(const n of e.textures)this._convertTextureIds(n);for(const n of e.meshes)this._convertMeshIds(n);for(const n of e.nodes)this._convertNodeIds(n);for(const n of e.scenes)this._convertSceneIds(n)}_convertTextureIds(e){e.source&&(e.source=this._convertIdToIndex(e.source,"image"))}_convertMeshIds(e){for(const n of e.primitives){const{attributes:r,indices:s,material:o}=n;for(const i in r)r[i]=this._convertIdToIndex(r[i],"accessor");s&&(n.indices=this._convertIdToIndex(s,"accessor")),o&&(n.material=this._convertIdToIndex(o,"material"))}}_convertNodeIds(e){e.children&&(e.children=e.children.map(n=>this._convertIdToIndex(n,"node"))),e.meshes&&(e.meshes=e.meshes.map(n=>this._convertIdToIndex(n,"mesh")))}_convertSceneIds(e){e.nodes&&(e.nodes=e.nodes.map(n=>this._convertIdToIndex(n,"node")))}_convertIdsToIndices(e,n){e[n]||(console.warn(`gltf v1: json doesn't contain attribute ${n}`),e[n]=[]);for(const r of e[n])for(const s in r){const o=r[s],i=this._convertIdToIndex(o,s);r[s]=i}}_convertIdToIndex(e,n){const r=ma[n];if(r in this.idToIndexMap){const s=this.idToIndexMap[r][e];if(!Number.isFinite(s))throw new Error(`gltf v1: failed to resolve ${n} with id ${e}`);return s}return e}_updateObjects(e){for(const n of this.json.buffers)delete n.type}_updateMaterial(e){for(const n of e.materials){n.pbrMetallicRoughness={baseColorFactor:[1,1,1,1],metallicFactor:1,roughnessFactor:1};const r=n.values?.tex||n.values?.texture2d_0||n.values?.diffuseTex,s=e.textures.findIndex(o=>o.id===r);s!==-1&&(n.pbrMetallicRoughness.baseColorTexture={index:s})}}}function Ca(t,e={}){return new pa().normalize(t,e)}async function ga(t,e,n=0,r,s){return ba(t,e,n,r),Ca(t,{normalize:r?.gltf?.normalize}),da(t,r,s),r?.gltf?.loadBuffers&&t.json.buffers&&await Ea(t,r,s),r?.gltf?.loadImages&&await Ia(t,r,s),await Ba(t,r,s),t}function ba(t,e,n,r){if(r.uri&&(t.baseUri=r.uri),e instanceof ArrayBuffer&&!wo(e,n,r)&&(e=new TextDecoder().decode(e)),typeof e=="string")t.json=Ln(e);else if(e instanceof ArrayBuffer){const i={};n=Ko(i,e,n,r.glb),T(i.type==="glTF",`Invalid GLB magic string ${i.type}`),t._glb=i,t.json=i.json}else T(!1,"GLTF: must be ArrayBuffer or string");const s=t.json.buffers||[];if(t.buffers=new Array(s.length).fill(null),t._glb&&t._glb.header.hasBinChunk){const{binChunks:i}=t._glb;t.buffers[0]={arrayBuffer:i[0].arrayBuffer,byteOffset:i[0].byteOffset,byteLength:i[0].byteLength}}const o=t.json.images||[];t.images=new Array(o.length).fill({})}async function Ea(t,e,n){const r=t.json.buffers||[];for(let s=0;s<r.length;++s){const o=r[s];if(o.uri){const{fetch:i}=n;T(i);const a=xt(o.uri,e),f=await(await n?.fetch?.(a))?.arrayBuffer?.();t.buffers[s]={arrayBuffer:f,byteOffset:0,byteLength:f.byteLength},delete o.uri}else t.buffers[s]===null&&(t.buffers[s]={arrayBuffer:new ArrayBuffer(o.byteLength),byteOffset:0,byteLength:o.byteLength})}}async function Ia(t,e,n){const r=Ma(t),s=t.json.images||[],o=[];for(const i of r)o.push(Ta(t,s[i],i,e,n));return await Promise.all(o)}function Ma(t){const e=new Set,n=t.json.textures||[];for(const r of n)r.source!==void 0&&e.add(r.source);return Array.from(e).sort()}async function Ta(t,e,n,r,s){let o;if(e.uri&&!e.hasOwnProperty("bufferView")){const a=xt(e.uri,r),{fetch:c}=s;o=await(await c(a)).arrayBuffer(),e.bufferView={data:o}}if(Number.isFinite(e.bufferView)){const a=Fs(t.json,t.buffers,e.bufferView);o=mt(a.buffer,a.byteOffset,a.byteLength)}T(o,"glTF image has no data");let i=await pt(o,[In,Kr],{...r,mimeType:e.mimeType,basis:r.basis||{format:Mt()}},s);i&&i[0]&&(i={compressed:!0,mipmaps:!1,width:i[0].width,height:i[0].height,data:i[0]}),t.images=t.images||[],t.images[n]=i}const Oe={dataType:null,batchType:null,name:"glTF",id:"gltf",module:"gltf",version:Lo,extensions:["gltf","glb"],mimeTypes:["model/gltf+json","model/gltf-binary"],text:!0,binary:!0,tests:["glTF"],parse:Fa,options:{gltf:{normalize:!0,loadBuffers:!0,loadImages:!0,decompressMeshes:!0},log:console}};async function Fa(t,e={},n){e={...Oe.options,...e},e.gltf={...Oe.options.gltf,...e.gltf};const{byteOffset:r=0}=e;return await ga({},t,r,e,n)}const Ra={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ya={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4},F={TEXTURE_MAG_FILTER:10240,TEXTURE_MIN_FILTER:10241,TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,REPEAT:10497,LINEAR:9729,NEAREST_MIPMAP_LINEAR:9986},_a={magFilter:F.TEXTURE_MAG_FILTER,minFilter:F.TEXTURE_MIN_FILTER,wrapS:F.TEXTURE_WRAP_S,wrapT:F.TEXTURE_WRAP_T},Ga={[F.TEXTURE_MAG_FILTER]:F.LINEAR,[F.TEXTURE_MIN_FILTER]:F.NEAREST_MIPMAP_LINEAR,[F.TEXTURE_WRAP_S]:F.REPEAT,[F.TEXTURE_WRAP_T]:F.REPEAT};function Da(){return{id:"default-sampler",parameters:Ga}}function va(t){return ya[t]}function Sa(t){return Ra[t]}class Oa{baseUri="";jsonUnprocessed;json;buffers=[];images=[];postProcess(e,n={}){const{json:r,buffers:s=[],images:o=[]}=e,{baseUri:i=""}=e;return T(r),this.baseUri=i,this.buffers=s,this.images=o,this.jsonUnprocessed=r,this.json=this._resolveTree(e.json,n),this.json}_resolveTree(e,n={}){const r={...e};return this.json=r,e.bufferViews&&(r.bufferViews=e.bufferViews.map((s,o)=>this._resolveBufferView(s,o))),e.images&&(r.images=e.images.map((s,o)=>this._resolveImage(s,o))),e.samplers&&(r.samplers=e.samplers.map((s,o)=>this._resolveSampler(s,o))),e.textures&&(r.textures=e.textures.map((s,o)=>this._resolveTexture(s,o))),e.accessors&&(r.accessors=e.accessors.map((s,o)=>this._resolveAccessor(s,o))),e.materials&&(r.materials=e.materials.map((s,o)=>this._resolveMaterial(s,o))),e.meshes&&(r.meshes=e.meshes.map((s,o)=>this._resolveMesh(s,o))),e.nodes&&(r.nodes=e.nodes.map((s,o)=>this._resolveNode(s,o)),r.nodes=r.nodes.map((s,o)=>this._resolveNodeChildren(s))),e.skins&&(r.skins=e.skins.map((s,o)=>this._resolveSkin(s,o))),e.scenes&&(r.scenes=e.scenes.map((s,o)=>this._resolveScene(s,o))),typeof this.json.scene=="number"&&r.scenes&&(r.scene=r.scenes[this.json.scene]),r}getScene(e){return this._get(this.json.scenes,e)}getNode(e){return this._get(this.json.nodes,e)}getSkin(e){return this._get(this.json.skins,e)}getMesh(e){return this._get(this.json.meshes,e)}getMaterial(e){return this._get(this.json.materials,e)}getAccessor(e){return this._get(this.json.accessors,e)}getCamera(e){return this._get(this.json.cameras,e)}getTexture(e){return this._get(this.json.textures,e)}getSampler(e){return this._get(this.json.samplers,e)}getImage(e){return this._get(this.json.images,e)}getBufferView(e){return this._get(this.json.bufferViews,e)}getBuffer(e){return this._get(this.json.buffers,e)}_get(e,n){if(typeof n=="object")return n;const r=e&&e[n];return r||console.warn(`glTF file error: Could not find ${e}[${n}]`),r}_resolveScene(e,n){return{...e,id:e.id||`scene-${n}`,nodes:(e.nodes||[]).map(r=>this.getNode(r))}}_resolveNode(e,n){const r={...e,id:e?.id||`node-${n}`};return e.mesh!==void 0&&(r.mesh=this.getMesh(e.mesh)),e.camera!==void 0&&(r.camera=this.getCamera(e.camera)),e.skin!==void 0&&(r.skin=this.getSkin(e.skin)),e.meshes!==void 0&&e.meshes.length&&(r.mesh=e.meshes.reduce((s,o)=>{const i=this.getMesh(o);return s.id=i.id,s.primitives=s.primitives.concat(i.primitives),s},{primitives:[]})),r}_resolveNodeChildren(e){return e.children&&(e.children=e.children.map(n=>this.getNode(n))),e}_resolveSkin(e,n){const r=typeof e.inverseBindMatrices=="number"?this.getAccessor(e.inverseBindMatrices):void 0;return{...e,id:e.id||`skin-${n}`,inverseBindMatrices:r}}_resolveMesh(e,n){const r={...e,id:e.id||`mesh-${n}`,primitives:[]};return e.primitives&&(r.primitives=e.primitives.map(s=>{const o={...s,attributes:{},indices:void 0,material:void 0},i=s.attributes;for(const a in i)o.attributes[a]=this.getAccessor(i[a]);return s.indices!==void 0&&(o.indices=this.getAccessor(s.indices)),s.material!==void 0&&(o.material=this.getMaterial(s.material)),o})),r}_resolveMaterial(e,n){const r={...e,id:e.id||`material-${n}`};if(r.normalTexture&&(r.normalTexture={...r.normalTexture},r.normalTexture.texture=this.getTexture(r.normalTexture.index)),r.occlusionTexture&&(r.occlusionTexture={...r.occlusionTexture},r.occlusionTexture.texture=this.getTexture(r.occlusionTexture.index)),r.emissiveTexture&&(r.emissiveTexture={...r.emissiveTexture},r.emissiveTexture.texture=this.getTexture(r.emissiveTexture.index)),r.emissiveFactor||(r.emissiveFactor=r.emissiveTexture?[1,1,1]:[0,0,0]),r.pbrMetallicRoughness){r.pbrMetallicRoughness={...r.pbrMetallicRoughness};const s=r.pbrMetallicRoughness;s.baseColorTexture&&(s.baseColorTexture={...s.baseColorTexture},s.baseColorTexture.texture=this.getTexture(s.baseColorTexture.index)),s.metallicRoughnessTexture&&(s.metallicRoughnessTexture={...s.metallicRoughnessTexture},s.metallicRoughnessTexture.texture=this.getTexture(s.metallicRoughnessTexture.index))}return r}_resolveAccessor(e,n){const r=va(e.componentType),s=Sa(e.type),o=r*s,i={...e,id:e.id||`accessor-${n}`,bytesPerComponent:r,components:s,bytesPerElement:o,value:void 0,bufferView:void 0,sparse:void 0};if(e.bufferView!==void 0&&(i.bufferView=this.getBufferView(e.bufferView)),i.bufferView){const a=i.bufferView.buffer,{ArrayType:c,byteLength:f}=He(i,i.bufferView),l=(i.bufferView.byteOffset||0)+(i.byteOffset||0)+a.byteOffset;let u=a.arrayBuffer.slice(l,l+f);i.bufferView.byteStride&&(u=this._getValueFromInterleavedBuffer(a,l,i.bufferView.byteStride,i.bytesPerElement,i.count)),i.value=new c(u)}return i}_getValueFromInterleavedBuffer(e,n,r,s,o){const i=new Uint8Array(o*s);for(let a=0;a<o;a++){const c=n+a*r;i.set(new Uint8Array(e.arrayBuffer.slice(c,c+s)),a*s)}return i.buffer}_resolveTexture(e,n){return{...e,id:e.id||`texture-${n}`,sampler:typeof e.sampler=="number"?this.getSampler(e.sampler):Da(),source:typeof e.source=="number"?this.getImage(e.source):void 0}}_resolveSampler(e,n){const r={id:e.id||`sampler-${n}`,...e,parameters:{}};for(const s in r){const o=this._enumSamplerParameter(s);o!==void 0&&(r.parameters[o]=r[s])}return r}_enumSamplerParameter(e){return _a[e]}_resolveImage(e,n){const r={...e,id:e.id||`image-${n}`,image:null,bufferView:e.bufferView!==void 0?this.getBufferView(e.bufferView):void 0},s=this.images[n];return s&&(r.image=s),r}_resolveBufferView(e,n){const r=e.buffer,s=this.buffers[r].arrayBuffer;let o=this.buffers[r].byteOffset||0;return e.byteOffset&&(o+=e.byteOffset),{id:`bufferView-${n}`,...e,buffer:this.buffers[r],data:new Uint8Array(s,o,e.byteLength)}}_resolveCamera(e,n){const r={...e,id:e.id||`camera-${n}`};return r.perspective,r.orthographic,r}}function La(t,e){return new Oa().postProcess(t,e)}async function xa(t){const e=[];return t.scenes.forEach(n=>{n.traverse(r=>{})}),await Ha(()=>e.some(n=>!n.loaded))}async function Ha(t){for(;t();)await new Promise(e=>requestAnimationFrame(e))}const dt=`uniform scenegraphUniforms {
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  mat4 sceneModelMatrix;
  bool composeModelMatrix;
} scenegraph;
`,Pa={name:"scenegraph",vs:dt,fs:dt,uniformTypes:{sizeScale:"f32",sizeMinPixels:"f32",sizeMaxPixels:"f32",sceneModelMatrix:"mat4x4<f32>",composeModelMatrix:"f32"}},Ua=`#version 300 es
#define SHADER_NAME scenegraph-layer-vertex-shader
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceColors;
in vec3 instancePickingColors;
in vec3 instanceModelMatrixCol0;
in vec3 instanceModelMatrixCol1;
in vec3 instanceModelMatrixCol2;
in vec3 instanceTranslation;
in vec3 positions;
#ifdef HAS_UV
in vec2 texCoords;
#endif
#ifdef LIGHTING_PBR
#ifdef HAS_NORMALS
in vec3 normals;
#endif
#endif
out vec4 vColor;
#ifndef LIGHTING_PBR
#ifdef HAS_UV
out vec2 vTEXCOORD_0;
#endif
#endif
void main(void) {
#if defined(HAS_UV) && !defined(LIGHTING_PBR)
vTEXCOORD_0 = texCoords;
geometry.uv = texCoords;
#endif
geometry.worldPosition = instancePositions;
geometry.pickingColor = instancePickingColors;
mat3 instanceModelMatrix = mat3(instanceModelMatrixCol0, instanceModelMatrixCol1, instanceModelMatrixCol2);
vec3 normal = vec3(0.0, 0.0, 1.0);
#ifdef LIGHTING_PBR
#ifdef HAS_NORMALS
normal = instanceModelMatrix * (scenegraph.sceneModelMatrix * vec4(normals, 0.0)).xyz;
#endif
#endif
float originalSize = project_size_to_pixel(scenegraph.sizeScale);
float clampedSize = clamp(originalSize, scenegraph.sizeMinPixels, scenegraph.sizeMaxPixels);
vec3 pos = (instanceModelMatrix * (scenegraph.sceneModelMatrix * vec4(positions, 1.0)).xyz) * scenegraph.sizeScale * (clampedSize / originalSize) + instanceTranslation;
if(scenegraph.composeModelMatrix) {
DECKGL_FILTER_SIZE(pos, geometry);
geometry.normal = project_normal(normal);
geometry.worldPosition += pos;
gl_Position = project_position_to_clipspace(pos + instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
}
else {
pos = project_size(pos);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, pos, geometry.position);
geometry.normal = project_normal(normal);
}
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
#ifdef LIGHTING_PBR
pbr_vPosition = geometry.position.xyz;
#ifdef HAS_NORMALS
pbr_vNormal = geometry.normal;
#endif
#ifdef HAS_UV
pbr_vUV = texCoords;
#else
pbr_vUV = vec2(0., 0.);
#endif
geometry.uv = pbr_vUV;
#endif
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,Na=`#version 300 es
#define SHADER_NAME scenegraph-layer-fragment-shader
in vec4 vColor;
out vec4 fragColor;
#ifndef LIGHTING_PBR
#if defined(HAS_UV) && defined(HAS_BASECOLORMAP)
in vec2 vTEXCOORD_0;
uniform sampler2D pbr_baseColorSampler;
#endif
#endif
void main(void) {
#ifdef LIGHTING_PBR
fragColor = vColor * pbr_filterColor(vec4(0));
geometry.uv = pbr_vUV;
#else
#if defined(HAS_UV) && defined(HAS_BASECOLORMAP)
fragColor = vColor * texture(pbr_baseColorSampler, vTEXCOORD_0);
geometry.uv = vTEXCOORD_0;
#else
fragColor = vColor;
#endif
#endif
fragColor.a *= layer.opacity;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,wt=[255,255,255,255],Ja={scenegraph:{type:"object",value:null,async:!0},getScene:t=>t&&t.scenes?typeof t.scene=="object"?t.scene:t.scenes[t.scene||0]:t,getAnimator:t=>t&&t.animator,_animations:null,sizeScale:{type:"number",value:1,min:0},sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},getPosition:{type:"accessor",value:t=>t.position},getColor:{type:"accessor",value:wt},_lighting:"flat",_imageBasedLightingEnvironment:void 0,getOrientation:{type:"accessor",value:[0,0,0]},getScale:{type:"accessor",value:[1,1,1]},getTranslation:{type:"accessor",value:[0,0,0]},getTransformMatrix:{type:"accessor",value:[]},loaders:[Oe]};class Kt extends Mn{getShaders(){const e={};let n;this.props._lighting==="pbr"?(n=Et,e.LIGHTING_PBR=1):n={name:"pbrMaterial"};const r=[Tn,Fn,Pa,n];return super.getShaders({defines:e,vs:Ua,fs:Na,modules:r})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),accessor:"getPosition",transition:!0},instanceColors:{type:"unorm8",size:this.props.colorFormat.length,accessor:"getColor",defaultValue:wt,transition:!0},instanceModelMatrix:Rr})}updateState(e){super.updateState(e);const{props:n,oldProps:r}=e;n.scenegraph!==r.scenegraph?this._updateScenegraph():n._animations!==r._animations&&this._applyAnimationsProp(this.state.animator,n._animations)}finalizeState(e){super.finalizeState(e),this.state.scenegraph?.destroy()}get isLoaded(){return!!(this.state?.scenegraph&&super.isLoaded)}_updateScenegraph(){const e=this.props,{device:n}=this.context;let r=null;if(e.scenegraph instanceof se)r={scenes:[e.scenegraph]};else if(e.scenegraph&&typeof e.scenegraph=="object"){const a=e.scenegraph,c=a.json?La(a):a,f=Cs(n,c,this._getModelOptions());r={gltf:c,...f},xa(f).then(()=>{this.setNeedsRedraw()}).catch(l=>{this.raiseError(l,"loading glTF")})}const s={layer:this,device:this.context.device},o=e.getScene(r,s),i=e.getAnimator(r,s);if(o instanceof U){this.state.scenegraph?.destroy(),this._applyAnimationsProp(i,e._animations);const a=[];o.traverse(c=>{c instanceof Ge&&a.push(c.model)}),this.setState({scenegraph:o,animator:i,models:a}),this.getAttributeManager().invalidateAll()}else o!==null&&Be.warn("invalid scenegraph:",o)()}_applyAnimationsProp(e,n){if(!e||!n)return;const r=e.getAnimations();Object.keys(n).sort().forEach(s=>{const o=n[s];if(s==="*")r.forEach(i=>{Object.assign(i,o)});else if(Number.isFinite(Number(s))){const i=Number(s);i>=0&&i<r.length?Object.assign(r[i],o):Be.warn(`animation ${s} not found`)()}else{const i=r.find(({animation:a})=>a.name===s);i?Object.assign(i,o):Be.warn(`animation ${s} not found`)()}})}_getModelOptions(){const{_imageBasedLightingEnvironment:e}=this.props;let n;return e&&(typeof e=="function"?n=e({gl:this.context.gl,layer:this}):n=e),{imageBasedLightingEnvironment:n,modelOptions:{id:this.props.id,isInstanced:!0,bufferLayout:this.getAttributeManager().getBufferLayouts(),...this.getShaders()},useTangents:!1}}draw({context:e}){if(!this.state.scenegraph)return;this.props._animations&&this.state.animator&&(this.state.animator.animate(e.timeline.getTime()),this.setNeedsRedraw());const{viewport:n,renderPass:r}=this.context,{sizeScale:s,sizeMinPixels:o,sizeMaxPixels:i,coordinateSystem:a}=this.props,c={camera:n.cameraPosition},f=this.getNumInstances();this.state.scenegraph.traverse((l,{worldMatrix:u})=>{if(l instanceof Ge){const{model:A}=l;A.setInstanceCount(f);const d={sizeScale:s,sizeMinPixels:o,sizeMaxPixels:i,composeModelMatrix:yr(n,a),sceneModelMatrix:u};A.shaderInputs.setProps({pbrProjection:c,scenegraph:d}),A.draw(r)}})}}Kt.defaultProps=Ja;Kt.layerName="ScenegraphLayer";export{_i as D,Oe as G,Y as M,hr as Q,Kt as S,Rr as a,Qr as b,pt as c,La as d,Ka as e,Pn as g,te as l,Et as p,yr as s};
