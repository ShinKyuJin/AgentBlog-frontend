(this.webpackJsonpagentblog=this.webpackJsonpagentblog||[]).push([[9],{146:function(n,e,t){"use strict";t.d(e,"b",(function(){return s})),t.d(e,"c",(function(){return b})),t.d(e,"a",(function(){return d}));var r=t(32),o=t.n(r),a=t(75),i=t(151),c=t.n(i),u=t(152),l=t.n(u),f=t(77),s=function(n){return c()(n).replace(/<[^>]+>/g,"").replace(/&#(\d+);/g,(function(n,e){return String.fromCharCode(e)}))},b=function(){var n=Object(a.a)(o.a.mark((function n(e){var t;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(t=new FormData).append("file",e,e.name),n.next=4,l.a.post(f.b+"/api/upload",t,{headers:{"content-type":"multipart/form-data"}});case 4:return n.abrupt("return",n.sent);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),d=function(n){var e=n.slice(0,10).split("-");return"".concat(e[0],"\ub144 ").concat(e[1],"\uc6d4 ").concat(e[2],"\uc77c")}},148:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(e,"SkeletonTheme",{enumerable:!0,get:function(){return o.default}});var r=a(t(149)),o=a(t(155));function a(n){return n&&n.__esModule?n:{default:n}}},149:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=s,e.skeletonStyles=e.skeletonKeyframes=e.defaultHighlightColor=e.defaultBaseColor=void 0;(r=t(0))&&r.__esModule;var r,o=t(114);function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(t,!0).forEach((function(e){c(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(t).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function u(){var n=function(n,e){e||(e=n.slice(0));return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}(["\n  0% {\n    background-position: -200px 0;\n  }\n  100% {\n    background-position: calc(200px + 100%) 0;\n  }\n"]);return u=function(){return n},n}e.defaultBaseColor="#eee";e.defaultHighlightColor="#f5f5f5";var l=(0,o.keyframes)(u());e.skeletonKeyframes=l;var f=(0,o.css)("background-color:","#eee",";background-image:linear-gradient( 90deg,","#eee",",","#f5f5f5",",","#eee"," );background-size:200px 100%;background-repeat:no-repeat;border-radius:4px;display:inline-block;line-height:1;width:100%;;label:skeletonStyles;");function s(n){for(var e=n.count,t=n.duration,r=n.width,a=n.wrapper,c=n.height,u=n.circle,s=n.style,b=n.className,d=[],p=0;p<e;p++){var m={};null!==r&&(m.width=r),null!==c&&(m.height=c),null!==r&&null!==c&&u&&(m.borderRadius="50%");var h="react-loading-skeleton";b&&(h+=" "+b),d.push((0,o.jsx)("span",{key:p,className:h,css:(0,o.css)(f," animation:",l," ",t,"s ease-in-out infinite;label:Skeleton;"),style:i({},s,{},m)},"\u200c"))}return(0,o.jsx)("span",null,a?d.map((function(n,e){return(0,o.jsx)(a,{key:e},n,"\u200c")})):d)}e.skeletonStyles=f,s.defaultProps={count:1,duration:1.2,width:null,wrapper:null,height:null,circle:!1}},154:function(n,e,t){"use strict";var r=t(5),o=t(16),a=t(52),i=t(0),c=t.n(i),u=t(6),l=t(148),f=t.n(l);function s(){var n=Object(r.a)(["\n  display: ",";\n"]);return s=function(){return n},n}var b=u.c.img(s(),(function(n){return n._loading?"none":"inline"}));e.a=function(n){var e=n.loadingHeight,t=Object(a.a)(n,["loadingHeight"]),r=Object(i.useState)(!0),u=Object(o.a)(r,2),l=u[0],s=u[1],d=Object(i.useState)(!1),p=Object(o.a)(d,2),m=p[0],h=p[1];return c.a.createElement(c.a.Fragment,null,l&&!m&&c.a.createElement(f.a,{height:e}),!m&&c.a.createElement(b,Object.assign({_loading:l,onLoad:function(){return s(!1)},onError:function(n){h(!0),t.onError&&t.onError(n)}},t)))}},155:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(n){if(n&&n.__esModule)return n;if(null===n||"object"!==c(n)&&"function"!==typeof n)return{default:n};var e=i();if(e&&e.has(n))return e.get(n);var t={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var a=r?Object.getOwnPropertyDescriptor(n,o):null;a&&(a.get||a.set)?Object.defineProperty(t,o,a):t[o]=n[o]}t.default=n,e&&e.set(n,t);return t}(t(0)),o=t(114),a=t(149);function i(){if("function"!==typeof WeakMap)return null;var n=new WeakMap;return i=function(){return n},n}function c(n){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"===typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function u(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function l(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function f(n,e){return!e||"object"!==c(e)&&"function"!==typeof e?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):e}function s(n){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function b(n,e){return(b=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n})(n,e)}var d,p,m,h=function(n){function e(){return u(this,e),f(this,s(e).apply(this,arguments))}var t,r,a;return function(n,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&b(n,e)}(e,n),t=e,(r=[{key:"render",value:function(){var n=this.props,e=n.color,t=n.highlightColor,r=n.children,a=(0,o.css)(".react-loading-skeleton{background-color:",e,";background-image:linear-gradient( 90deg,",e,",",t,",",e," );};label:SkeletonTheme;");return(0,o.jsx)("div",{css:a},r)}}])&&l(t.prototype,r),a&&l(t,a),e}(r.Component);e.default=h,d=h,p="defaultProps",m={color:a.defaultBaseColor,highlightColor:a.defaultHighlightColor},p in d?Object.defineProperty(d,p,{value:m,enumerable:!0,configurable:!0,writable:!0}):d[p]=m},291:function(n,e,t){"use strict";t.r(e);var r=t(5),o=t(16),a=t(0),i=t.n(a),c=t(6),u=t(10);function l(){var n=Object(r.a)(["\n  {\n    seeTrendyPost {\n      id\n      user {\n        avatar\n        username\n      }\n      files {\n        url\n      }\n      url\n      title\n      description\n      content\n      thumbnail\n      likeCount\n      createdAt\n      commentCount\n    }\n  }\n"]);return l=function(){return n},n}function f(){var n=Object(r.a)(["\n  {\n    seeLatestPost {\n      id\n      user {\n        avatar\n        username\n      }\n      files {\n        url\n      }\n      url\n      title\n      description\n      content\n      thumbnail\n      likeCount\n      createdAt\n      commentCount\n    }\n  }\n"]);return f=function(){return n},n}var s=Object(u.gql)(f()),b=Object(u.gql)(l()),d=t(76),p=t(20),m=t(154),h=t(148),g=t.n(h),v=t(146);function y(){var n=Object(r.a)(["\n  font-size: 14px;\n  font-weight: 550;\n"]);return y=function(){return n},n}function O(){var n=Object(r.a)(["\n  color: rgb(134, 142, 150);\n  font-size: 14px;\n"]);return O=function(){return n},n}function j(){var n=Object(r.a)(["\n  word-break: break-word;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  word-wrap: break-word;\n  line-height: 1.5rem;\n  height: 1.5rem * 3;\n  font-size: 0.875rem;\n  color: rgb(73, 80, 87);\n"]);return j=function(){return n},n}function x(){var n=Object(r.a)(["\n  font-size: 1rem;\n  line-height: 1.5;\n"]);return x=function(){return n},n}function w(){var n=Object(r.a)(["\n  font-size: 0.875rem;\n  position: absolute;\n  right: 16px;\n"]);return w=function(){return n},n}function k(){var n=Object(r.a)(["\n  padding: 0 16px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  color: black;\n  text-decoration: none;\n  border-top: 1px solid rgb(240, 240, 240);\n  flex-direction: row;\n\n  &:focus {\n    color: black;\n  }\n"]);return k=function(){return n},n}function E(){var n=Object(r.a)(["\n  font-size: 13px;\n  color: rgb(134, 142, 150);\n"]);return E=function(){return n},n}function P(){var n=Object(r.a)(["\n  color: black;\n  text-decoration: none;\n\n  &:focus {\n    color: black;\n  }\n"]);return P=function(){return n},n}function C(){var n=Object(r.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 1rem;\n  flex: 1 1 0%;\n"]);return C=function(){return n},n}function _(){var n=Object(r.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-top-left-radius: 6px;\n  border-top-right-radius: 6px;\n  display: block;\n  object-fit: cover;\n"]);return _=function(){return n},n}function S(){var n=Object(r.a)(["\n  position: relative;\n  padding-bottom: 55%;\n  width: 100%;\n  max-height: 177px;\n"]);return S=function(){return n},n}function z(){var n=Object(r.a)(["\n  @media (max-width: 944px) {\n    width: calc(50% - 2rem);\n  }\n\n  @media (max-width: 768px) {\n    width: 100%;\n    margin: 0px 0px 1rem 0px;\n  }\n  width: 20rem;\n  margin: 1rem;\n\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  justify-content: space-between;\n  overflow: hidden;\n  border-radius: 6px;\n  background-color: white;\n  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;\n\n  -webkit-transition: box-shadow 0.25s ease-in 0s,\n    -webkit-transform 0.25s ease-in 0s;\n  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;\n\n  &:hover {\n    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;\n  }\n  @media (min-width: 944px) {\n    &:hover {\n      transform: translateY(-10px);\n      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;\n    }\n  }\n"]);return z=function(){return n},n}var T=c.c.article(z()),N=Object(c.c)(p.b)(S()),D=Object(c.c)(m.a)(_()),H=c.c.div(C()),M=Object(c.c)(p.b)(P()),W=c.c.div(E()),A=Object(c.c)(p.b)(k()),B=c.c.div(w()),F=c.c.b(x()),I=c.c.p(j()),q=c.c.p(O()),L=c.c.p(y()),Q=i.a.memo((function(n){var e=n.postInfo,t=Object(a.useState)(!1),r=Object(o.a)(t,2),c=r[0],u=r[1];if(e){var l=e.thumbnail,f=e.description?e.description:Object(v.b)(e.content);return i.a.createElement(T,null,l&&!c&&i.a.createElement(N,{to:"/@".concat(e.user.username,"/").concat(e.url)},i.a.createElement(D,{src:l,loadingHeight:177,onError:function(){return u(!0)}})),i.a.createElement(H,null,i.a.createElement(M,{to:"/@".concat(e.user.username,"/").concat(e.url)},i.a.createElement(F,null,e.title),i.a.createElement(I,null,f)),i.a.createElement(W,null,Object(v.a)(e.createdAt)," \xb7 ",e.commentCount,"\uac1c\uc758 \ub313\uae00")),i.a.createElement(A,{to:"/@".concat(e.user.username)},i.a.createElement(d.a,{size:"sm",url:e.user.avatar}),"\xa0",i.a.createElement(q,null,"by"),"\xa0",i.a.createElement(L,null,e.user.username),i.a.createElement(B,null,"\u2665\xa0",e.likeCount)))}return i.a.createElement(T,null,i.a.createElement(g.a,{height:400}))})),J=t(24);function K(){var n=Object(r.a)(["\n  width: 100%;\n"]);return K=function(){return n},n}function R(){var n=Object(r.a)(["\n  @media (max-width: 768px) {\n    margin: 0px;\n  }\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  margin: -1rem;\n"]);return R=function(){return n},n}var Y=c.c.section(R()),X=c.c.main(K()),G=function(n){var e,t,r,o=n.postType,c=Object(u.useQuery)(b,{skip:"recent"===o}),l=c.data,f=c.loading,d=c.error,p=Object(u.useQuery)(s,{skip:"trend"===o}),m=p.data,h=p.loading,g=p.error;"trend"===o?(e=null===l||void 0===l?void 0:l.seeTrendyPost,t=f,r=d):"recent"===o&&(e=null===m||void 0===m?void 0:m.seeLatestPost,t=h,r=g),Object(a.useEffect)((function(){r&&(setTimeout((function(){return window.location.reload()}),2e3),J.b.error("\ud3ec\uc2a4\ud2b8\ub97c \uac00\uc838\uc624\ub358 \uc911 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4."))}),[r]);var v=Array.from({length:20},(function(n,e){return e})).map((function(n){return i.a.createElement(Q,{key:n})})),y=e?e.map((function(n){return i.a.createElement(Q,{key:n.id,postInfo:n})})):null;return i.a.createElement(X,null,i.a.createElement(Y,null,t||!e||r?v:y))};function U(){var n=Object(r.a)(["\n  font-style: normal;\n"]);return U=function(){return n},n}var V=c.c.address(U()),Z=function(){return i.a.createElement(V,null,"Developed by miminishin/skyoun97")};function $(){var n=Object(r.a)(["\n  {\n    getPopularHashtag {\n      name\n    }\n  }\n"]);return $=function(){return n},n}var nn=Object(u.gql)($());function en(){var n=Object(r.a)(["\n  text-decoration: none;\n  color: ",";\n  font-size: 15px;\n  line-height: 1.5;\n\n  &:focus {\n    color: ",";\n  }\n\n  &:hover {\n    text-decoration: underline;\n  }\n\n  & + & {\n    margin-top: 5px;\n  }\n"]);return en=function(){return n},n}function tn(){var n=Object(r.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return tn=function(){return n},n}function rn(){var n=Object(r.a)(["\n  border: 1px solid rgb(233, 236, 239);\n"]);return rn=function(){return n},n}function on(){var n=Object(r.a)([""]);return on=function(){return n},n}function an(){var n=Object(r.a)(["\n  @media (max-width: 1440px) {\n    width: 12rem;\n  }\n  width: 16rem;\n"]);return an=function(){return n},n}function cn(){var n=Object(r.a)(["\n  @media (max-width: 1440px) {\n    margin-left: 3rem;\n    width: 12rem;\n  }\n\n  @media (max-width: 944px) {\n    display: none;\n  }\n  margin-left: 6rem;\n  width: 16rem;\n\n  display: flex;\n  flex-direction: column;\n  margin-right: auto;\n"]);return cn=function(){return n},n}var un=0,ln=c.c.aside(cn()),fn=c.c.div(an()),sn=c.c.b(on()),bn=c.c.hr(rn()),dn=c.c.p(tn()),pn=Object(c.c)(p.b)(en(),(function(n){return n.theme.greyColor}),(function(n){return n.theme.greyColor})),mn=i.a.memo((function(){var n=Object(a.useState)(!1),e=Object(o.a)(n,2),t=(e[0],e[1]),r=Object(u.useQuery)(nn).data,c=null===r||void 0===r?void 0:r.getPopularHashtag.map((function(n){var e=n.name;return i.a.createElement(pn,{to:"/tags/".concat(e),key:un++},"#\xa0",e)})),l=function(n){n.screenY>=90?t(!0):t(!1)};return i.a.createElement(ln,null,i.a.createElement(fn,null,i.a.createElement(sn,null,"\uc778\uae30 \ud0dc\uadf8"),i.a.createElement(bn,null),i.a.createElement(dn,{onWheel:l},c)),i.a.createElement(Z,null))})),hn=t(38),gn=t(15),vn=t(156);function yn(){var n=Object(r.a)(["\n  width: ",";\n  height: 2px;\n  bottom: 0px;\n  background: rgb(52, 58, 64);\n  transition: transform 0.35s cubic-bezier(0, 0, 0.1, 1.5) 0s;\n  position: relative;\n  transform: ",";\n"]);return yn=function(){return n},n}function On(){var n=Object(r.a)(["\n  width: ",";\n  display: flex;\n  position: relative;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.125rem;\n  height: 3rem;\n  text-decoration: none;\n  &:nth-child(",") {\n    color: rgb(52, 58, 64);\n    font-weight: bold;\n  }\n  color: rgb(134, 142, 150);\n  cursor: pointer;\n"]);return On=function(){return n},n}function jn(){var n=Object(r.a)(["\n  width: ",";\n  min-height: min-content;\n  display: flex;\n  flex-wrap: wrap;\n"]);return jn=function(){return n},n}var xn=c.c.div(jn(),(function(n){return n.tabCount*n.tabWidth+"rem"})),wn=c.c.div(On(),(function(n){return n.tabWidth+"rem"}),(function(n){return n.tabNum+1})),kn=c.c.div(yn(),(function(n){return 0===n.tabCount?0:100/n.tabCount+"%"}),(function(n){return"translateX(".concat(100*n.tabNum,"%);")})),En=i.a.memo((function(n){var e=n.tabNum,t=n.setTabNum,r=n.tabItems,o=n.tabWidth;return i.a.createElement("nav",null,i.a.createElement(vn.a,null,i.a.createElement("title",null,r[e].title)),i.a.createElement(xn,{tabCount:r.length,tabWidth:o||7},r.map((function(n,a){return i.a.createElement(wn,{key:a,tabNum:e,tabWidth:o||7,onClick:function(){return function(n){var e=r[n];t(n),window.history.replaceState(null,e.title||"",e.url)}(a)}},r[a].component)})),i.a.createElement(kn,{tabNum:e,tabCount:r.length})))})),Pn=t(47);function Cn(){var n=Object(r.a)(["\n  margin-left: 0.5rem;\n"]);return Cn=function(){return n},n}function _n(){var n=Object(r.a)(["\n  display: flex;\n  margin-top: 2rem;\n"]);return _n=function(){return n},n}function Sn(){var n=Object(r.a)(["\n  ","\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  margin-top: 2rem;\n"]);return Sn=function(){return n},n}var zn=c.c.div(Sn(),(function(n){return n.theme.responsiveContainer})),Tn=c.c.div(_n()),Nn=c.c.div(Cn());e.default=function(){var n=Object(gn.h)(),e=Object(a.useState)("/recent"===n.pathname?1:0),t=Object(o.a)(e,2),r=t[0],c=t[1];return Object(a.useEffect)((function(){return document.body.style.backgroundColor=hn.a.homeBgColor,function(){document.body.style.backgroundColor=hn.a.bgColor}}),[]),i.a.createElement(zn,null,i.a.createElement(En,Object.assign({tabNum:r,setTabNum:c},{tabItems:[{title:"Agent Blog",url:"/",component:i.a.createElement(i.a.Fragment,null,i.a.createElement(Pn.a,{type:"trend",size:18}),i.a.createElement(Nn,null,"\ud2b8\ub80c\ub529"))},{title:"\ucd5c\uc2e0\ud3ec\uc2a4\ud2b8",url:"/recent",component:i.a.createElement(i.a.Fragment,null,i.a.createElement(Pn.a,{type:"time",size:18}),i.a.createElement(Nn,null,"\ucd5c\uc2e0"))}]})),i.a.createElement(Tn,null,i.a.createElement(G,{postType:0===r?"trend":"recent"}),i.a.createElement(mn,null)))}}}]);
//# sourceMappingURL=9.186e938c.chunk.js.map