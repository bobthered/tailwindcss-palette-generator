function g(){}const M=t=>t;function w(t,n){for(const e in n)t[e]=n[e];return t}function E(t){return t()}function S(){return Object.create(null)}function j(t){t.forEach(E)}function v(t){return typeof t=="function"}function A(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function B(t){return Object.keys(t).length===0}function y(t,...n){if(t==null){for(const o of n)o(void 0);return g}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function C(t){let n;return y(t,e=>n=e)(),n}function D(t,n,e){t.$$.on_destroy.push(y(n,e))}function P(t,n,e,o){if(t){const c=m(t,n,e,o);return t[0](c)}}function m(t,n,e,o){return t[1]&&o?w(e.ctx.slice(),t[1](o(n))):e.ctx}function U(t,n,e,o){if(t[2]&&o){const c=t[2](o(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const l=[],f=Math.max(n.dirty.length,c.length);for(let u=0;u<f;u+=1)l[u]=n.dirty[u]|c[u];return l}return n.dirty|c}return n.dirty}function G(t,n,e,o,c,l){if(c){const f=m(n,e,o,l);t.p(f,c)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function I(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function J(t,n){const e={};n=new Set(n);for(const o in t)!n.has(o)&&o[0]!=="$"&&(e[o]=t[o]);return e}function K(t,n,e){return t.set(e),n}function L(t){return t&&v(t.destroy)?t.destroy:g}let i;function _(t){i=t}function k(){if(!i)throw new Error("Function called outside component initialization");return i}function N(t){k().$$.on_mount.push(t)}function Q(t){k().$$.after_update.push(t)}function R(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(o=>o.call(this,n))}const a=[],b=[];let s=[];const h=[],x=Promise.resolve();let p=!1;function O(){p||(p=!0,x.then(z))}function T(){return O(),x}function q(t){s.push(t)}function V(t){h.push(t)}const d=new Set;let r=0;function z(){if(r!==0)return;const t=i;do{try{for(;r<a.length;){const n=a[r];r++,_(n),F(n.$$)}}catch(n){throw a.length=0,r=0,n}for(_(null),a.length=0,r=0;b.length;)b.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];d.has(e)||(d.add(e),e())}s.length=0}while(a.length);for(;h.length;)h.pop()();p=!1,d.clear(),_(t)}function F(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function W(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{B as A,W as B,_ as C,E as D,a as E,O as F,Q as a,b,q as c,w as d,I as e,P as f,H as g,U as h,D as i,L as j,v as k,J as l,i as m,g as n,N as o,C as p,V as q,j as r,A as s,T as t,G as u,K as v,R as w,M as x,S as y,z};
