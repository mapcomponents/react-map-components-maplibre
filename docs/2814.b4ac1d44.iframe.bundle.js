"use strict";(self.webpackChunk_mapcomponents_react_maplibre=self.webpackChunk_mapcomponents_react_maplibre||[]).push([[2814],{32807:(t,e,n)=>{n(39855),n(19192),n(87973),n(21917),n(99930),n(89600),n(42277)},44342:(t,e,n)=>{n(55351),n(19192),n(89600)},30776:(t,e,n)=>{n(89600),n(42277)},87972:(t,e,n)=>{n(89600),n(42277)},67390:(t,e,n)=>{n(89600),n(42277)},3005:(t,e,n)=>{n(89600),n(42277)},88929:(t,e,n)=>{n(59094),n(19192),n(89600)},67708:(t,e,n)=>{n(19192)},17252:t=>{function e(t,e,r){r=r||2;var i,s,u,h,f,d,l,g=e&&e.length,v=g?e[0]*r:t.length,x=n(t,0,v,r,!0),y=[];if(!x||x.next===x.prev)return y;if(g&&(x=function(t,e,r,o){var i,s,u,h=[];for(i=0,s=e.length;i<s;i++)(u=n(t,e[i]*o,i<s-1?e[i+1]*o:t.length,o,!1))===u.next&&(u.steiner=!0),h.push(p(u));for(h.sort(a),i=0;i<h.length;i++)r=c(h[i],r);return r}(t,e,x,r)),t.length>80*r){i=u=t[0],s=h=t[1];for(var m=r;m<v;m+=r)(f=t[m])<i&&(i=f),(d=t[m+1])<s&&(s=d),f>u&&(u=f),d>h&&(h=d);l=0!==(l=Math.max(u-i,h-s))?32767/l:0}return o(x,y,r,i,s,l,0),y}function n(t,e,n,r,o){var i,s;if(o===N(t,e,n,r)>0)for(i=e;i<n;i+=r)s=M(i,t[i],t[i+1],s);else for(i=n-r;i>=e;i-=r)s=M(i,t[i],t[i+1],s);return s&&x(s,s.next)&&(Z(s),s=s.next),s}function r(t,e){if(!t)return t;e||(e=t);var n,r=t;do{if(n=!1,r.steiner||!x(r,r.next)&&0!==v(r.prev,r,r.next))r=r.next;else{if(Z(r),(r=e=r.prev)===r.next)break;n=!0}}while(n||r!==e);return e}function o(t,e,n,a,c,f,p){if(t){!p&&f&&function(t,e,n,r){var o=t;do{0===o.z&&(o.z=d(o.x,o.y,e,n,r)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next}while(o!==t);o.prevZ.nextZ=null,o.prevZ=null,function(t){var e,n,r,o,i,s,u,h,a=1;do{for(n=t,t=null,i=null,s=0;n;){for(s++,r=n,u=0,e=0;e<a&&(u++,r=r.nextZ);e++);for(h=a;u>0||h>0&&r;)0!==u&&(0===h||!r||n.z<=r.z)?(o=n,n=n.nextZ,u--):(o=r,r=r.nextZ,h--),i?i.nextZ=o:t=o,o.prevZ=i,i=o;n=r}i.nextZ=null,a*=2}while(s>1)}(o)}(t,a,c,f);for(var l,g,v=t;t.prev!==t.next;)if(l=t.prev,g=t.next,f?s(t,a,c,f):i(t))e.push(l.i/n|0),e.push(t.i/n|0),e.push(g.i/n|0),Z(t),t=g.next,v=g.next;else if((t=g)===v){p?1===p?o(t=u(r(t),e,n),e,n,a,c,f,2):2===p&&h(t,e,n,a,c,f):o(r(t),e,n,a,c,f,1);break}}}function i(t){var e=t.prev,n=t,r=t.next;if(v(e,n,r)>=0)return!1;for(var o=e.x,i=n.x,s=r.x,u=e.y,h=n.y,a=r.y,c=o<i?o<s?o:s:i<s?i:s,f=u<h?u<a?u:a:h<a?h:a,d=o>i?o>s?o:s:i>s?i:s,p=u>h?u>a?u:a:h>a?h:a,g=r.next;g!==e;){if(g.x>=c&&g.x<=d&&g.y>=f&&g.y<=p&&l(o,u,i,h,s,a,g.x,g.y)&&v(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function s(t,e,n,r){var o=t.prev,i=t,s=t.next;if(v(o,i,s)>=0)return!1;for(var u=o.x,h=i.x,a=s.x,c=o.y,f=i.y,p=s.y,g=u<h?u<a?u:a:h<a?h:a,x=c<f?c<p?c:p:f<p?f:p,y=u>h?u>a?u:a:h>a?h:a,m=c>f?c>p?c:p:f>p?f:p,E=d(g,x,e,n,r),b=d(y,m,e,n,r),w=t.prevZ,M=t.nextZ;w&&w.z>=E&&M&&M.z<=b;){if(w.x>=g&&w.x<=y&&w.y>=x&&w.y<=m&&w!==o&&w!==s&&l(u,c,h,f,a,p,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;if(w=w.prevZ,M.x>=g&&M.x<=y&&M.y>=x&&M.y<=m&&M!==o&&M!==s&&l(u,c,h,f,a,p,M.x,M.y)&&v(M.prev,M,M.next)>=0)return!1;M=M.nextZ}for(;w&&w.z>=E;){if(w.x>=g&&w.x<=y&&w.y>=x&&w.y<=m&&w!==o&&w!==s&&l(u,c,h,f,a,p,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;M&&M.z<=b;){if(M.x>=g&&M.x<=y&&M.y>=x&&M.y<=m&&M!==o&&M!==s&&l(u,c,h,f,a,p,M.x,M.y)&&v(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function u(t,e,n){var o=t;do{var i=o.prev,s=o.next.next;!x(i,s)&&y(i,o,o.next,s)&&b(i,s)&&b(s,i)&&(e.push(i.i/n|0),e.push(o.i/n|0),e.push(s.i/n|0),Z(o),Z(o.next),o=t=s),o=o.next}while(o!==t);return r(o)}function h(t,e,n,i,s,u){var h=t;do{for(var a=h.next.next;a!==h.prev;){if(h.i!==a.i&&g(h,a)){var c=w(h,a);return h=r(h,h.next),c=r(c,c.next),o(h,e,n,i,s,u,0),void o(c,e,n,i,s,u,0)}a=a.next}h=h.next}while(h!==t)}function a(t,e){return t.x-e.x}function c(t,e){var n=function(t,e){var n,r=e,o=t.x,i=t.y,s=-1/0;do{if(i<=r.y&&i>=r.next.y&&r.next.y!==r.y){var u=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(u<=o&&u>s&&(s=u,n=r.x<r.next.x?r:r.next,u===o))return n}r=r.next}while(r!==e);if(!n)return null;var h,a=n,c=n.x,d=n.y,p=1/0;r=n;do{o>=r.x&&r.x>=c&&o!==r.x&&l(i<d?o:s,i,c,d,i<d?s:o,i,r.x,r.y)&&(h=Math.abs(i-r.y)/(o-r.x),b(r,t)&&(h<p||h===p&&(r.x>n.x||r.x===n.x&&f(n,r)))&&(n=r,p=h)),r=r.next}while(r!==a);return n}(t,e);if(!n)return e;var o=w(n,t);return r(o,o.next),r(n,n.next)}function f(t,e){return v(t.prev,t,e.prev)<0&&v(e.next,t,t.next)<0}function d(t,e,n,r,o){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*o|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-r)*o|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function p(t){var e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function l(t,e,n,r,o,i,s,u){return(o-s)*(e-u)>=(t-s)*(i-u)&&(t-s)*(r-u)>=(n-s)*(e-u)&&(n-s)*(i-u)>=(o-s)*(r-u)}function g(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&y(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(b(t,e)&&b(e,t)&&function(t,e){var n=t,r=!1,o=(t.x+e.x)/2,i=(t.y+e.y)/2;do{n.y>i!=n.next.y>i&&n.next.y!==n.y&&o<(n.next.x-n.x)*(i-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==t);return r}(t,e)&&(v(t.prev,t,e.prev)||v(t,e.prev,e))||x(t,e)&&v(t.prev,t,t.next)>0&&v(e.prev,e,e.next)>0)}function v(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function x(t,e){return t.x===e.x&&t.y===e.y}function y(t,e,n,r){var o=E(v(t,e,n)),i=E(v(t,e,r)),s=E(v(n,r,t)),u=E(v(n,r,e));return o!==i&&s!==u||!(0!==o||!m(t,n,e))||!(0!==i||!m(t,r,e))||!(0!==s||!m(n,t,r))||!(0!==u||!m(n,e,r))}function m(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function E(t){return t>0?1:t<0?-1:0}function b(t,e){return v(t.prev,t,t.next)<0?v(t,e,t.next)>=0&&v(t,t.prev,e)>=0:v(t,e,t.prev)<0||v(t,t.next,e)<0}function w(t,e){var n=new _(t.i,t.x,t.y),r=new _(e.i,e.x,e.y),o=t.next,i=e.prev;return t.next=e,e.prev=t,n.next=o,o.prev=n,r.next=n,n.prev=r,i.next=r,r.prev=i,r}function M(t,e,n,r){var o=new _(t,e,n);return r?(o.next=r.next,o.prev=r,r.next.prev=o,r.next=o):(o.prev=o,o.next=o),o}function Z(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function _(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function N(t,e,n,r){for(var o=0,i=e,s=n-r;i<n;i+=r)o+=(t[s]-t[i])*(t[i+1]+t[s+1]),s=i;return o}t.exports=e,t.exports.default=e,e.deviation=function(t,e,n,r){var o=e&&e.length,i=o?e[0]*n:t.length,s=Math.abs(N(t,0,i,n));if(o)for(var u=0,h=e.length;u<h;u++){var a=e[u]*n,c=u<h-1?e[u+1]*n:t.length;s-=Math.abs(N(t,a,c,n))}var f=0;for(u=0;u<r.length;u+=3){var d=r[u]*n,p=r[u+1]*n,l=r[u+2]*n;f+=Math.abs((t[d]-t[l])*(t[p+1]-t[d+1])-(t[d]-t[p])*(t[l+1]-t[d+1]))}return 0===s&&0===f?0:Math.abs((f-s)/s)},e.flatten=function(t){for(var e=t[0][0].length,n={vertices:[],holes:[],dimensions:e},r=0,o=0;o<t.length;o++){for(var i=0;i<t[o].length;i++)for(var s=0;s<e;s++)n.vertices.push(t[o][i][s]);o>0&&(r+=t[o-1].length,n.holes.push(r))}return n}},74338:(t,e,n)=>{n(89600)},42955:(t,e,n)=>{n(67631),n(87972),n(3005),n(67390),n(99930),n(42277),n(89600)},74426:(t,e,n)=>{n(19192),n(43516),n(89600)},49709:(t,e,n)=>{n(99930)},62814:(t,e,n)=>{n.d(e,{Qwm:()=>v.A,Wcw:()=>g.A,Qk1:()=>c.A,kJI:()=>f.A,dcc:()=>p.A,yxm:()=>N.Ay,ra8:()=>I.A,NAY:()=>h.A,n1W:()=>u.A,j_:()=>l.A,IoC:()=>a.A,Lrk:()=>o.Lr,Bw9:()=>x.A,FsR:()=>m.A,W26:()=>y.A,_kn:()=>x.A,uO7:()=>E.A,wiw:()=>o.wi,zx7:()=>o.zx}),n(29631),n(64416);var r=n(40401),o=n(89600),i=n(99930);n(19088),n(5675),n(84732),n(58329),n(76411);var s=n(59391),u=(n(67708),n(78771)),h=(n(52939),n(96582),n(71431)),a=(n(67631),n(31472),n(19192)),c=(n(67484),n(73640));n(17252);var f=n(78123);n(32807);var d=n(42277);n(3005),n(45228),n(74338);var p=n(39855),l=n(87973);n(21633);var g=n(18758),v=n(9008),x=n(71583),y=(n(69054),n(51474),n(44342),n(49709),n(53395),n(21917),n(2145));n(72519),n(57111),n(95805),n(52108);var m=n(49264);n(30776),n(79870),n(93961),n(93995),n(87972),n(67390),n(42490),n(81080),n(42955);var E=n(83603);function b(t,e,n){var r,o=e[0]-t[0],i=e[1]-t[1],s=n[0]-e[0];return((r=o*(n[1]-e[1])-s*i)>0)-(r<0)||+r}function w(t,e){return e.geometry.coordinates[0].every((function(e){return(0,r.A)((0,o.zx)(e),t)}))}const M=function(){function t(e){this.id=t.buildId(e),this.coordinates=e,this.innerEdges=[],this.outerEdges=[],this.outerEdgesSorted=!1}return t.buildId=function(t){return t.join(",")},t.prototype.removeInnerEdge=function(t){this.innerEdges=this.innerEdges.filter((function(e){return e.from.id!==t.from.id}))},t.prototype.removeOuterEdge=function(t){this.outerEdges=this.outerEdges.filter((function(e){return e.to.id!==t.to.id}))},t.prototype.addOuterEdge=function(t){this.outerEdges.push(t),this.outerEdgesSorted=!1},t.prototype.sortOuterEdges=function(){var t=this;this.outerEdgesSorted||(this.outerEdges.sort((function(e,n){var r=e.to,o=n.to;if(r.coordinates[0]-t.coordinates[0]>=0&&o.coordinates[0]-t.coordinates[0]<0)return 1;if(r.coordinates[0]-t.coordinates[0]<0&&o.coordinates[0]-t.coordinates[0]>=0)return-1;if(r.coordinates[0]-t.coordinates[0]==0&&o.coordinates[0]-t.coordinates[0]==0)return r.coordinates[1]-t.coordinates[1]>=0||o.coordinates[1]-t.coordinates[1]>=0?r.coordinates[1]-o.coordinates[1]:o.coordinates[1]-r.coordinates[1];var i=b(t.coordinates,r.coordinates,o.coordinates);return i<0?1:i>0?-1:Math.pow(r.coordinates[0]-t.coordinates[0],2)+Math.pow(r.coordinates[1]-t.coordinates[1],2)-(Math.pow(o.coordinates[0]-t.coordinates[0],2)+Math.pow(o.coordinates[1]-t.coordinates[1],2))})),this.outerEdgesSorted=!0)},t.prototype.getOuterEdges=function(){return this.sortOuterEdges(),this.outerEdges},t.prototype.getOuterEdge=function(t){return this.sortOuterEdges(),this.outerEdges[t]},t.prototype.addInnerEdge=function(t){this.innerEdges.push(t)},t}(),Z=function(){function t(t,e){this.from=t,this.to=e,this.next=void 0,this.label=void 0,this.symetric=void 0,this.ring=void 0,this.from.addOuterEdge(this),this.to.addInnerEdge(this)}return t.prototype.getSymetric=function(){return this.symetric||(this.symetric=new t(this.to,this.from),this.symetric.symetric=this),this.symetric},t.prototype.deleteEdge=function(){this.from.removeOuterEdge(this),this.to.removeInnerEdge(this)},t.prototype.isEqual=function(t){return this.from.id===t.from.id&&this.to.id===t.to.id},t.prototype.toString=function(){return"Edge { "+this.from.id+" -> "+this.to.id+" }"},t.prototype.toLineString=function(){return(0,o.wi)([this.from.coordinates,this.to.coordinates])},t.prototype.compareTo=function(t){return b(t.from.coordinates,t.to.coordinates,this.to.coordinates)},t}(),_=function(){function t(){this.edges=[],this.polygon=void 0,this.envelope=void 0}return t.prototype.push=function(t){this.edges.push(t),this.polygon=this.envelope=void 0},t.prototype.get=function(t){return this.edges[t]},Object.defineProperty(t.prototype,"length",{get:function(){return this.edges.length},enumerable:!0,configurable:!0}),t.prototype.forEach=function(t){this.edges.forEach(t)},t.prototype.map=function(t){return this.edges.map(t)},t.prototype.some=function(t){return this.edges.some(t)},t.prototype.isValid=function(){return!0},t.prototype.isHole=function(){var t=this,e=this.edges.reduce((function(e,n,r){return n.from.coordinates[1]>t.edges[e].from.coordinates[1]&&(e=r),e}),0),n=(0===e?this.length:e)-1,r=(e+1)%this.length,o=b(this.edges[n].from.coordinates,this.edges[e].from.coordinates,this.edges[r].from.coordinates);return 0===o?this.edges[n].from.coordinates[0]>this.edges[r].from.coordinates[0]:o>0},t.prototype.toMultiPoint=function(){return(0,o.kB)(this.edges.map((function(t){return t.from.coordinates})))},t.prototype.toPolygon=function(){if(this.polygon)return this.polygon;var t=this.edges.map((function(t){return t.from.coordinates}));return t.push(this.edges[0].from.coordinates),this.polygon=(0,o.n1)([t])},t.prototype.getEnvelope=function(){return this.envelope?this.envelope:this.envelope=(0,s.A)(this.toPolygon())},t.findEdgeRingContaining=function(t,e){var n,r,i=t.getEnvelope();return e.forEach((function(e){var s,u,h,a,c,f,d=e.getEnvelope();if(r&&(n=r.getEnvelope()),u=i,h=(s=d).geometry.coordinates[0].map((function(t){return t[0]})),a=s.geometry.coordinates[0].map((function(t){return t[1]})),c=u.geometry.coordinates[0].map((function(t){return t[0]})),f=u.geometry.coordinates[0].map((function(t){return t[1]})),(Math.max.apply(null,h)!==Math.max.apply(null,c)||Math.max.apply(null,a)!==Math.max.apply(null,f)||Math.min.apply(null,h)!==Math.min.apply(null,c)||Math.min.apply(null,a)!==Math.min.apply(null,f))&&w(d,i)){for(var p=t.map((function(t){return t.from.coordinates})),l=void 0,g=function(t){e.some((function(e){return n=t,r=e.from.coordinates,n[0]===r[0]&&n[1]===r[1];var n,r}))||(l=t)},v=0,x=p;v<x.length;v++)g(x[v]);l&&e.inside((0,o.zx)(l))&&(r&&!w(n,d)||(r=e))}})),r},t.prototype.inside=function(t){return(0,r.A)(t,this.toPolygon())},t}();!function(){function t(){this.edges=[],this.nodes={}}t.fromGeoJson=function(e){!function(t){if(!t)throw new Error("No geojson passed");if("FeatureCollection"!==t.type&&"GeometryCollection"!==t.type&&"MultiLineString"!==t.type&&"LineString"!==t.type&&"Feature"!==t.type)throw new Error("Invalid input type '"+t.type+"'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature")}(e);var n=new t;return(0,i.iw)(e,(function(t){(0,d.mo)(t,"LineString","Graph::fromGeoJson"),(0,i.k7)(t,(function(t,e){if(t){var r=n.getNode(t),o=n.getNode(e);n.addEdge(r,o)}return e}))})),n},t.prototype.getNode=function(t){var e=M.buildId(t),n=this.nodes[e];return n||(n=this.nodes[e]=new M(t)),n},t.prototype.addEdge=function(t,e){var n=new Z(t,e),r=n.getSymetric();this.edges.push(n),this.edges.push(r)},t.prototype.deleteDangles=function(){var t=this;Object.keys(this.nodes).map((function(e){return t.nodes[e]})).forEach((function(e){return t._removeIfDangle(e)}))},t.prototype._removeIfDangle=function(t){var e=this;if(t.innerEdges.length<=1){var n=t.getOuterEdges().map((function(t){return t.to}));this.removeNode(t),n.forEach((function(t){return e._removeIfDangle(t)}))}},t.prototype.deleteCutEdges=function(){var t=this;this._computeNextCWEdges(),this._findLabeledEdgeRings(),this.edges.forEach((function(e){e.label===e.symetric.label&&(t.removeEdge(e.symetric),t.removeEdge(e))}))},t.prototype._computeNextCWEdges=function(t){var e=this;void 0===t?Object.keys(this.nodes).forEach((function(t){return e._computeNextCWEdges(e.nodes[t])})):t.getOuterEdges().forEach((function(e,n){t.getOuterEdge((0===n?t.getOuterEdges().length:n)-1).symetric.next=e}))},t.prototype._computeNextCCWEdges=function(t,e){for(var n,r,o=t.getOuterEdges(),i=o.length-1;i>=0;--i){var s=o[i],u=s.symetric,h=void 0,a=void 0;s.label===e&&(h=s),u.label===e&&(a=u),h&&a&&(a&&(r=a),h&&(r&&(r.next=h,r=void 0),n||(n=h)))}r&&(r.next=n)},t.prototype._findLabeledEdgeRings=function(){var t=[],e=0;return this.edges.forEach((function(n){if(!(n.label>=0)){t.push(n);var r=n;do{r.label=e,r=r.next}while(!n.isEqual(r));e++}})),t},t.prototype.getEdgeRings=function(){var t=this;this._computeNextCWEdges(),this.edges.forEach((function(t){t.label=void 0})),this._findLabeledEdgeRings().forEach((function(e){t._findIntersectionNodes(e).forEach((function(n){t._computeNextCCWEdges(n,e.label)}))}));var e=[];return this.edges.forEach((function(n){n.ring||e.push(t._findEdgeRing(n))})),e},t.prototype._findIntersectionNodes=function(t){var e=[],n=t,r=function(){var r=0;n.from.getOuterEdges().forEach((function(e){e.label===t.label&&++r})),r>1&&e.push(n.from),n=n.next};do{r()}while(!t.isEqual(n));return e},t.prototype._findEdgeRing=function(t){var e=t,n=new _;do{n.push(e),e.ring=n,e=e.next}while(!t.isEqual(e));return n},t.prototype.removeNode=function(t){var e=this;t.getOuterEdges().forEach((function(t){return e.removeEdge(t)})),t.innerEdges.forEach((function(t){return e.removeEdge(t)})),delete this.nodes[t.id]},t.prototype.removeEdge=function(t){this.edges=this.edges.filter((function(e){return!e.isEqual(t)})),t.deleteEdge()}}(),n(97132);var N=n(93481);function k(t){for(var e=t,n=[];e.parent;)n.unshift(e),e=e.parent;return n}n(64964),n(58019),n(42669),n(70656),n(55351),n(59094),n(27784),n(71998),n(55339);var O={search:function(t,e,n,r){t.cleanDirty();var o=(r=r||{}).heuristic||O.heuristics.manhattan,i=r.closest||!1,s=new z((function(t){return t.f})),u=e;for(e.h=o(e,n),s.push(e);s.size()>0;){var h=s.pop();if(h===n)return k(h);h.closed=!0;for(var a=t.neighbors(h),c=0,f=a.length;c<f;++c){var d=a[c];if(!d.closed&&!d.isWall()){var p=h.g+d.getCost(h),l=d.visited;(!l||p<d.g)&&(d.visited=!0,d.parent=h,d.h=d.h||o(d,n),d.g=p,d.f=d.g+d.h,t.markDirty(d),i&&(d.h<u.h||d.h===u.h&&d.g<u.g)&&(u=d),l?s.rescoreElement(d):s.push(d))}}}return i?k(u):[]},heuristics:{manhattan:function(t,e){return Math.abs(e.x-t.x)+Math.abs(e.y-t.y)},diagonal:function(t,e){var n=Math.sqrt(2),r=Math.abs(e.x-t.x),o=Math.abs(e.y-t.y);return 1*(r+o)+(n-2)*Math.min(r,o)}},cleanNode:function(t){t.f=0,t.g=0,t.h=0,t.visited=!1,t.closed=!1,t.parent=null}};function A(t,e){e=e||{},this.nodes=[],this.diagonal=!!e.diagonal,this.grid=[];for(var n=0;n<t.length;n++){this.grid[n]=[];for(var r=0,o=t[n];r<o.length;r++){var i=new C(n,r,o[r]);this.grid[n][r]=i,this.nodes.push(i)}}this.init()}function C(t,e,n){this.x=t,this.y=e,this.weight=n}function z(t){this.content=[],this.scoreFunction=t}A.prototype.init=function(){this.dirtyNodes=[];for(var t=0;t<this.nodes.length;t++)O.cleanNode(this.nodes[t])},A.prototype.cleanDirty=function(){for(var t=0;t<this.dirtyNodes.length;t++)O.cleanNode(this.dirtyNodes[t]);this.dirtyNodes=[]},A.prototype.markDirty=function(t){this.dirtyNodes.push(t)},A.prototype.neighbors=function(t){var e=[],n=t.x,r=t.y,o=this.grid;return o[n-1]&&o[n-1][r]&&e.push(o[n-1][r]),o[n+1]&&o[n+1][r]&&e.push(o[n+1][r]),o[n]&&o[n][r-1]&&e.push(o[n][r-1]),o[n]&&o[n][r+1]&&e.push(o[n][r+1]),this.diagonal&&(o[n-1]&&o[n-1][r-1]&&e.push(o[n-1][r-1]),o[n+1]&&o[n+1][r-1]&&e.push(o[n+1][r-1]),o[n-1]&&o[n-1][r+1]&&e.push(o[n-1][r+1]),o[n+1]&&o[n+1][r+1]&&e.push(o[n+1][r+1])),e},A.prototype.toString=function(){for(var t,e,n,r,o=[],i=this.grid,s=0,u=i.length;s<u;s++){for(t=[],n=0,r=(e=i[s]).length;n<r;n++)t.push(e[n].weight);o.push(t.join(" "))}return o.join("\n")},C.prototype.toString=function(){return"["+this.x+" "+this.y+"]"},C.prototype.getCost=function(t){return t&&t.x!==this.x&&t.y!==this.y?1.41421*this.weight:this.weight},C.prototype.isWall=function(){return 0===this.weight},z.prototype={push:function(t){this.content.push(t),this.sinkDown(this.content.length-1)},pop:function(){var t=this.content[0],e=this.content.pop();return this.content.length>0&&(this.content[0]=e,this.bubbleUp(0)),t},remove:function(t){var e=this.content.indexOf(t),n=this.content.pop();e!==this.content.length-1&&(this.content[e]=n,this.scoreFunction(n)<this.scoreFunction(t)?this.sinkDown(e):this.bubbleUp(e))},size:function(){return this.content.length},rescoreElement:function(t){this.sinkDown(this.content.indexOf(t))},sinkDown:function(t){for(var e=this.content[t];t>0;){var n=(t+1>>1)-1,r=this.content[n];if(!(this.scoreFunction(e)<this.scoreFunction(r)))break;this.content[n]=e,this.content[t]=r,t=n}},bubbleUp:function(t){for(var e=this.content.length,n=this.content[t],r=this.scoreFunction(n);;){var o,i=t+1<<1,s=i-1,u=null;if(s<e){var h=this.content[s];(o=this.scoreFunction(h))<r&&(u=s)}if(i<e){var a=this.content[i];this.scoreFunction(a)<(null===u?r:o)&&(u=i)}if(null===u)break;this.content[t]=this.content[u],this.content[u]=n,t=u}}},n(71546),n(81611),n(81420),n(3523),n(75738),n(58237),n(23595),n(832),n(84728);var I=n(55524);n(59004),n(43516),n(32560),n(71755),n(51635),n(88929),n(74426),n(92642)}}]);