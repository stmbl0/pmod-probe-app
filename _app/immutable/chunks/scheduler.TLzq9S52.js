function C(){}function P(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function K(){return Object.create(null)}function L(t){t.forEach(B)}function Q(t){return typeof t=="function"}function R(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function V(t){return Object.keys(t).length===0}function w(t,...n){if(t==null){for(const i of n)i(void 0);return C}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function W(t){let n;return w(t,e=>n=e)(),n}function X(t,n,e){t.$$.on_destroy.push(w(n,e))}function Y(t,n,e,i){if(t){const l=N(t,n,e,i);return t[0](l)}}function N(t,n,e,i){return t[1]&&i?P(e.ctx.slice(),t[1](i(n))):e.ctx}function Z(t,n,e,i){if(t[2]&&i){const l=t[2](i(e));if(n.dirty===void 0)return l;if(typeof l=="object"){const s=[],c=Math.max(n.dirty.length,l.length);for(let u=0;u<c;u+=1)s[u]=n.dirty[u]|l[u];return s}return n.dirty|l}return n.dirty}function $(t,n,e,i,l,s){if(l){const c=N(n,e,i,s);t.p(c,l)}}function tt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let m=!1;function nt(){m=!0}function et(){m=!1}function M(t,n,e,i){for(;t<n;){const l=t+(n-t>>1);e(l)<=i?t=l+1:n=l}return t}function O(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let a=0;a<n.length;a++){const o=n[a];o.claim_order!==void 0&&r.push(o)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let l=0;for(let r=0;r<n.length;r++){const a=n[r].claim_order,o=(l>0&&n[e[l]].claim_order<=a?l+1:M(1,l,S=>n[e[S]].claim_order,a))-1;i[r]=e[o]+1;const k=o+1;e[k]=r,l=Math.max(k,l)}const s=[],c=[];let u=n.length-1;for(let r=e[l]+1;r!=0;r=i[r-1]){for(s.push(n[r-1]);u>=r;u--)c.push(n[u]);u--}for(;u>=0;u--)c.push(n[u]);s.reverse(),c.sort((r,a)=>r.claim_order-a.claim_order);for(let r=0,a=0;r<c.length;r++){for(;a<s.length&&c[r].claim_order>=s[a].claim_order;)a++;const o=a<s.length?s[a]:null;t.insertBefore(c[r],o)}}function T(t,n){if(m){for(O(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function it(t,n,e){m&&!e?T(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function lt(t){t.parentNode&&t.parentNode.removeChild(t)}function ct(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function q(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function rt(){return x(" ")}function ut(){return x("")}function st(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function at(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function ot(t){return t.dataset.svelteH}function ft(t){return Array.from(t.childNodes)}function D(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,n,e,i,l=!1){D(t);const s=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(n(u)){const r=e(u);return r===void 0?t.splice(c,1):t[c]=r,l||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(n(u)){const r=e(u);return r===void 0?t.splice(c,1):t[c]=r,l?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function H(t,n,e,i){return A(t,l=>l.nodeName===n,l=>{const s=[];for(let c=0;c<l.attributes.length;c++){const u=l.attributes[c];e[u.name]||s.push(u.name)}s.forEach(c=>l.removeAttribute(c))},()=>i(n))}function _t(t,n,e){return H(t,n,e,q)}function I(t,n){return A(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>x(n),!0)}function dt(t){return I(t," ")}function ht(t,n){n=""+n,t.data!==n&&(t.data=n)}function mt(t,n){t.value=n??""}function pt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function bt(t,n,e){t.classList.toggle(n,!!e)}function z(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function yt(t,n){return new t(n)}let h;function p(t){h=t}function v(){if(!h)throw new Error("Function called outside component initialization");return h}function gt(t){v().$$.on_mount.push(t)}function xt(t){v().$$.after_update.push(t)}function vt(){const t=v();return(n,e,{cancelable:i=!1}={})=>{const l=t.$$.callbacks[n];if(l){const s=z(n,e,{cancelable:i});return l.slice().forEach(c=>{c.call(t,s)}),!s.defaultPrevented}return!0}}const d=[],E=[];let _=[];const y=[],j=Promise.resolve();let g=!1;function F(){g||(g=!0,j.then(G))}function kt(){return F(),j}function U(t){_.push(t)}function Et(t){y.push(t)}const b=new Set;let f=0;function G(){if(f!==0)return;const t=h;do{try{for(;f<d.length;){const n=d[f];f++,p(n),J(n.$$)}}catch(n){throw d.length=0,f=0,n}for(p(null),d.length=0,f=0;E.length;)E.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];b.has(e)||(b.add(e),e())}_.length=0}while(d.length);for(;y.length;)y.pop()();g=!1,b.clear(),p(t)}function J(t){if(t.fragment!==null){t.update(),L(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(U)}}function wt(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{L as A,K as B,G as C,Q as D,V as E,U as F,wt as G,h as H,p as I,B as J,d as K,F as L,nt as M,et as N,W as O,ot as P,bt as Q,st as R,mt as S,vt as T,Et as U,ct as V,Z as a,rt as b,Y as c,_t as d,q as e,ft as f,tt as g,I as h,lt as i,dt as j,it as k,T as l,ht as m,C as n,X as o,ut as p,xt as q,gt as r,R as s,x as t,$ as u,at as v,pt as w,E as x,yt as y,kt as z};
