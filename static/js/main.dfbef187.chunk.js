(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{28:function(n,e,t){"use strict";t.r(e);var c,i,r,o,a,s,l,h,u,d,f,b=t(0),j=t.n(b),v=t(13),m=t.n(v),O=t(2),p=t(3),x=p.b.div(c||(c=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  width: 100vw;\n  height: 100vh;\n"]))),g=t(8),w=t(9),y=p.b.div(i||(i=Object(O.a)(["\n  display: flex;\n  margin: 1vh 1vw;\n  width: 98vw;\n  align-items: center;\n  justify-content: center;\n"]))),k=p.b.input(r||(r=Object(O.a)(["\n  flex-grow: 1;\n"]))),T=p.b.button(o||(o=Object(O.a)(["\n  width: fit-content;\n"]))),D=t(6),S=t.n(D),I=t(17),C=t(19),F=p.b.div(a||(a=Object(O.a)(["\n  height: 90vh;\n  width: 98vw;\n  margin: 1vh 1vw;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),A=p.b.div(s||(s=Object(O.a)(["\n  flex: 2;\n  height: 100%;\n  width: auto;\n  margin: 1vh 1vw;\n  display: flex;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n"]))),E=p.b.div(l||(l=Object(O.a)(["\n  flex: 1;\n  height: 100%;\n  width: auto;\n  margin: 1vh 1vw;\n"]))),J=p.b.div(h||(h=Object(O.a)(["\n  height: 100px;\n  width: 100%;\n\n  img {\n    height: 100%;\n    border-radius: 2px;\n  }\n"]))),z=t(18),B=t.n(z),P=t(1),N=function(n){return Object(P.jsxs)(J,{children:[Object(P.jsx)("img",{src:n.Thumbnail,alt:"404"}),Object(P.jsx)("label",{children:n.Title})]})},q=function(){var n=Object(b.useState)([]),e=Object(C.a)(n,2),t=e[0],c=e[1];Object(b.useEffect)((function(){u=t}),[t]),Object(b.useEffect)((function(){d=c}),[]);var i=function(){var n=Object(I.a)(S.a.mark((function n(){var e,i,r,o;return S.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=Object(w.a)(t),i=Object(g.a)(t),n.prev=2,o=S.a.mark((function n(){var t;return S.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=r.value,n.next=3,new Promise((function(n,i){fetch("http://ec2-15-188-62-235.eu-west-3.compute.amazonaws.com:8080/video",{method:"POST",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify({format:t.Formats,url:t.Info.videoDetails.video_url,info:t.Info})}).then((function(n){if(n.body){var e=B.a.createWriteStream("".concat(t.Title,".mkv"),{size:parseInt(t.Info.formats[1].contentLength),writableStrategy:void 0,readableStrategy:void 0});n.body.pipeTo(e).then(console.log,console.error)}})).catch(i).finally((function(){e=e.filter((function(n,e){return n!==t})),c(e),n("Done")}))})).then(console.log).catch(console.error);case 3:case"end":return n.stop()}}),n)})),i.s();case 5:if((r=i.n()).done){n.next=9;break}return n.delegateYield(o(),"t0",7);case 7:n.next=5;break;case 9:n.next=14;break;case 11:n.prev=11,n.t1=n.catch(2),i.e(n.t1);case 14:return n.prev=14,i.f(),n.finish(14);case 17:case"end":return n.stop()}}),n,null,[[2,11,14,17]])})));return function(){return n.apply(this,arguments)}}();return Object(P.jsxs)(F,{children:[Object(P.jsx)(A,{children:t.map((function(n,e){return Object(P.jsx)(N,{Thumbnail:n.Thumbnail,Title:n.Title,Info:n.Info,Formats:n.Formats},e)}))}),Object(P.jsx)(E,{children:Object(P.jsx)("button",{onClick:i,children:"Download Videos"})})]})},L=function(){var n;return Object(P.jsxs)(y,{children:[Object(P.jsx)(k,{type:"text",ref:function(e){e&&(n=e)}}),Object(P.jsx)(T,{onClick:function(){fetch("http://ec2-15-188-62-235.eu-west-3.compute.amazonaws.com:8080/info",{method:"POST",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:n.value})}).then((function(n){return n.json()})).then((function(n){var e,t=Object(w.a)(u),c=Object(g.a)(n);try{for(c.s();!(e=c.n()).done;){var i=e.value,r=i.info,o={Info:r,Thumbnail:r.videoDetails.thumbnails[0].url,Title:r.videoDetails.title,Formats:i.formats};t.push(o)}}catch(a){c.e(a)}finally{c.f()}d(t)}))},children:"Add to queue"})]})},M=function(){return Object(P.jsxs)(x,{children:[Object(P.jsx)(L,{}),Object(P.jsx)(q,{})]})},R=Object(p.a)(f||(f=Object(O.a)(["\n  * {\n    margin: 0;\n    padding: 0;\n    color: var(--white);\n    font-family: Roboto;\n  }\n\n  html {\n    width: 100vw;\n    height: 100vh;\n  }\n\n  body {\n    background-color: var(--black);\n    overflow: hidden;\n    padding: 0;\n    margin: 0;\n    width: 100vw;\n    height: 100vh;\n  }\n\n  :root {\n    --white: #e8e6e3;\n    --almost-white: #CED4DA;\n    --light-grey: #ADB5BD;\n    --regular-grey: #6C757D;\n    --dark-grey: #495057;\n    --almost-black: #343A40;\n    --black: #212529;\n    --blue: #48cae4;\n  }\n"])));var V=function(){return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(M,{}),Object(P.jsx)(R,{})]})};m.a.render(Object(P.jsx)(j.a.StrictMode,{children:Object(P.jsx)(V,{})}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.dfbef187.chunk.js.map