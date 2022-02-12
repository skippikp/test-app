(this["webpackJsonptest-app"]=this["webpackJsonptest-app"]||[]).push([[0],{115:function(e,t,n){},135:function(e,t,n){},143:function(e,t,n){},144:function(e,t,n){},145:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),s=n(26),r=n.n(s),i=(n(115),n(14)),o=n(11),u=n(19),l=n.n(u),d=n(31),b=n(53),j=n(42),h=n.n(j),f=function e(){var t=this;Object(b.a)(this,e),this._apiBase="https://dispex.org/api/vtest",this.getResource=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("".concat(t._apiBase).concat(n));case 2:if(!((a=e.sent).status>=400)){e.next=5;break}throw new Error("Could not fetch ".concat(n,", received ").concat(a.status));case 5:return e.next=7,a;case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getStreets=Object(d.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getResource("/Request/streets");case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)}))),this.getHouses=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getResource("/Request/houses/".concat(n));case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getFlats=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getResource("/Request/house_flats/".concat(n));case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.postPerson=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"POST",headers:{"Content-Type":"text/json",accept:"text/plain"},data:t,url:"https://dispex.org/api/vtest/HousingStock/client"},e.next=3,h()(n);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getAllTenants=function(){var e=Object(d.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("https://dispex.org/api/vtest/HousingStock/clients?addressId="+t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.bindPerson=function(){var e=Object(d.a)(l.a.mark((function e(t,n){var a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"PUT",headers:{"Content-Type":"text/json",accept:"*/*"},data:{AddressId:t,ClientId:n},url:"https://dispex.org/api/vtest/HousingStock/bind_client"},e.next=3,h()(a);case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),this.removePerson=function(){var e=Object(d.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.delete("https://dispex.org/api/vtest/HousingStock/bind_client/".concat(t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},p=n(201),O=n(204),x=n(203),m=n(196),v=n(149),g=n(193),S=n(198),C=n(200),w=n(199),E=n(188),y="SET_STREETS",k="SET_HOUSES",T="SET_FLATS",F="SET_SELECTED_FLAT",I="SET_CLIENT_LIST",L=function(e){return{type:I,clientList:e}},A=(n(135),n(32)),N=n(2),P=new f,_={setClientList:L},H=Object(A.b)((function(e){return{selectedFlat:e.selectedFlat}}),_)((function(e){var t=e.name,n=e.phone,c=e.email,s=e.bindId,r=e.selectedFlat,u=e.setClientList,l={Id:0,Name:t,Phone:n,Email:c,BindId:0},d=Object(a.useState)(!1),b=Object(o.a)(d,2),j=b[0],h=b[1],f=Object(a.useState)(l),y=Object(o.a)(f,2),k=y[0],T=y[1],F=function(){h(!1),P.getAllTenants(r.id).then((function(e){u(e.data)}))};return Object(N.jsxs)("div",{className:"personInfo",children:[Object(N.jsxs)(p.a,{sx:{minWidth:275,maxWidth:500,minHeight:200},children:[Object(N.jsxs)(x.a,{children:[Object(N.jsx)(v.a,{sx:{fontSize:20},color:"text.secondary",gutterBottom:!0,children:t}),Object(N.jsx)(v.a,{sx:{fontSize:20},color:"green",children:n}),Object(N.jsx)(v.a,{sx:{mb:1.5},color:"text.secondary",children:c})]}),Object(N.jsxs)(O.a,{children:[Object(N.jsx)(m.a,{size:"small",onClick:function(){h(!0),T(l)},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"}),Object(N.jsx)(m.a,{size:"small",onClick:function(){return e=s,void P.removePerson(e).then((function(){P.getAllTenants(r.id).then((function(e){""!==e.data?u(e.data):u([])}))}));var e},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]})]}),Object(N.jsxs)(S.a,{open:j,onClose:F,children:[Object(N.jsx)(E.a,{children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0436\u0438\u043b\u044c\u0446\u0430"}),Object(N.jsxs)(w.a,{children:[Object(N.jsx)(g.a,{id:"outlined-name",label:"\u0418\u043c\u044f",sx:{m:1,width:"25ch"},onChange:function(e){T((function(t){return Object(i.a)(Object(i.a)({},t),{},{Name:e.target.value})}))},value:k.Name}),Object(N.jsx)(g.a,{id:"outlined-basic",label:"Email",sx:{m:1,width:"25ch"},variant:"outlined",value:k.Email,onChange:function(e){T((function(t){return Object(i.a)(Object(i.a)({},t),{},{Email:e.target.value})}))}})]}),Object(N.jsxs)(C.a,{children:[Object(N.jsx)(m.a,{onClick:F,children:"Cancel"}),Object(N.jsx)(m.a,{onClick:function(){return function(e){P.postPerson(e).then((function(){P.getAllTenants(r.id).then((function(e){u(e.data)}))})),h(!1)}(k)},children:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c"})]})]})]})})),B=n(191),R=n(192),q=function(e){var t=e.onOpen,n=e.loading,c=e.options,s=e.onChange,r=e.renderOptions,o=e.label,u=e.value;return Object(N.jsx)(R.a,{id:"select-component",onOpen:t,value:u,onChange:function(e,t){s(t)},isOptionEqualToValue:function(e,t){return e.label===t||e.label===(null===t||void 0===t?void 0:t.label)},loading:n,options:c,sx:{width:300},renderOption:r||function(e,t){return Object(a.createElement)("li",Object(i.a)(Object(i.a)({},e),{},{key:t.id}),t.label)},renderInput:function(e){return Object(N.jsx)(g.a,Object(i.a)(Object(i.a)({},e),{},{label:o}))}})},z=(n(143),new f),W={setAllHouses:function(e){return{type:k,houses:e}},setAllFlats:function(e){return{type:T,flats:e}},setSelectedFlat:function(e){return{type:F,selectedFlat:e}},setClientList:L,setAllStreets:function(e){return{type:y,streets:e}}},J=Object(A.b)((function(e){return{streets:e.streets,houses:e.houses,flats:e.flats,selectedFlat:e.selectedFlat,clientList:e.clientList}}),W)((function(e){var t=e.streets,n=e.houses,c=e.setAllHouses,s=e.flats,r=e.setAllFlats,u=e.selectedFlat,l=e.setSelectedFlat,d=e.clientList,b=e.setClientList,j=e.setAllStreets,h=Object(a.useState)(""),f=Object(o.a)(h,2),p=f[0],O=f[1],x=Object(a.useState)(""),m=Object(o.a)(x,2),v=m[0],g=m[1],S=Object(a.useState)(""),C=Object(o.a)(S,2),w=C[0],E=C[1],y=t.map((function(e){return{label:e.name,id:e.id}})),k=n.map((function(e){return{label:e.name,id:e.id}})),T=s.map((function(e){return{label:e.name,typeName:e.typeName,id:e.id}})),F=0===t.length,I=0===n.length,L=0===s.length;return Object(N.jsxs)("div",{className:"form",children:[Object(N.jsxs)(B.a,{direction:"row",spacing:2,children:[Object(N.jsx)(q,{onOpen:function(){z.getStreets().then((function(e){j(e)}))},loading:F,options:y,onChange:function(e){O(null===e?"":e.label),function(e){e&&z.getHouses(e.id).then((function(e){c(e)}))}(e),l(""),E(""),g(""),b([])},label:"\u0423\u043b\u0438\u0446\u0430"}),Object(N.jsx)(q,{loading:I,options:k,onChange:function(e){g(null===e?"":e.label),function(e){e&&z.getFlats(e.id).then((function(e){r(e)}))}(e),l(""),E(""),b([])},label:"\u0414\u043e\u043c",value:v}),Object(N.jsx)(q,{loading:L,options:T,onChange:function(e){if(null===e)return l(""),E(""),void b([]);var t;l(e),E(e.label),(t=e.id)&&z.getAllTenants(t).then((function(e){200===e.status?b(e.data):b([])}))},renderOptions:function(e,t){if("\u041a\u0432\u0430\u0440\u0442\u0438\u0440\u0430"===t.typeName)return Object(a.createElement)("li",Object(i.a)(Object(i.a)({},e),{},{key:t.id}),t.label)},label:"\u041a\u0432\u0430\u0440\u0442\u0438\u0440\u0430",value:w})]}),u?Object(N.jsx)("h4",{style:{fontWeight:500,fontSize:20},children:"\u0416\u0438\u043b\u044c\u0446\u044b ".concat(p," ").concat(v," \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430: ").concat(u.label," :")}):null,Object(N.jsx)("div",{className:"personInfo",children:d.map((function(e,t){var n=e.name,a=e.phone,c=e.email,s=e.bindId;return Object(N.jsx)(H,{bindId:s,name:n,phone:a,email:c},t)}))})]})})),U=(n(144),new f),D={setClientList:L},M=Object(A.b)((function(e){return{selectedFlat:e.selectedFlat}}),D)((function(e){var t=e.selectedFlat,n=e.setClientList,c=Object(a.useState)(!1),s=Object(o.a)(c,2),r=s[0],u=s[1],l=Object(a.useState)({Id:0,Name:"",Phone:"",Email:"",BindId:0}),d=Object(o.a)(l,2),b=d[0],j=d[1],h=function(e,a){U.bindPerson(e,a).then((function(){U.getAllTenants(t.id).then((function(e){n(e.data)}))}))},f=function(){u(!1),j({Id:0,Name:"",Phone:"",Email:"",BindId:0}),U.getAllTenants(t.id).then((function(e){n(e.data)}))};return Object(N.jsxs)("div",{children:[Object(N.jsx)(m.a,{variant:"outlined",onClick:function(){u(!0)},sx:{position:"absolute",top:30,right:100},disabled:!t,children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0436\u0438\u043b\u044c\u0446\u0430"}),Object(N.jsxs)(S.a,{open:r,onClose:f,children:[Object(N.jsx)(E.a,{children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0436\u0438\u043b\u044c\u0446\u0430"}),Object(N.jsxs)(w.a,{children:[Object(N.jsx)(g.a,{id:"outlined-name",label:"\u0424.\u0418.\u041e",sx:{m:1,width:"25ch"},onChange:function(e){j((function(t){return Object(i.a)(Object(i.a)({},t),{},{Name:e.target.value})}))},value:b.Name}),Object(N.jsx)(g.a,{id:"outlined-basic",label:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",type:"tel",required:!0,variant:"outlined",sx:{m:1,width:"25ch"},value:b.Phone,onChange:function(e){j((function(t){return Object(i.a)(Object(i.a)({},t),{},{Phone:e.target.value})}))}}),Object(N.jsx)(g.a,{id:"outlined-basic",label:"Email",variant:"outlined",sx:{m:1,width:"25ch"},value:b.Email,onChange:function(e){j((function(t){return Object(i.a)(Object(i.a)({},t),{},{Email:e.target.value})}))}})]}),Object(N.jsxs)(C.a,{children:[Object(N.jsx)(m.a,{onClick:f,children:"Cancel"}),Object(N.jsx)(m.a,{disabled:!b.Phone,onClick:function(){return function(e){U.postPerson(e).then((function(e){h(t.id,e.data.id)})),j({Id:0,Name:"",Phone:"",Email:"",BindId:0}),u(!1)}(b)},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})]})]})]})})),V=function(){return Object(N.jsxs)("div",{className:"app",children:[Object(N.jsx)(J,{}),Object(N.jsx)(M,{})]})},G=n(87),K={streets:[],houses:[],flats:[],selectedFlat:"",clientList:[]},Q=Object(G.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object(i.a)(Object(i.a)({},e),{},{streets:t.streets});case k:return Object(i.a)(Object(i.a)({},e),{},{houses:t.houses});case T:return Object(i.a)(Object(i.a)({},e),{},{flats:t.flats});case F:return Object(i.a)(Object(i.a)({},e),{},{selectedFlat:t.selectedFlat});case I:return Object(i.a)(Object(i.a)({},e),{},{clientList:t.clientList});default:return e}})),X=Q;r.a.render(Object(N.jsx)(c.a.StrictMode,{children:Object(N.jsx)(A.a,{store:X,children:Object(N.jsx)(V,{})})}),document.getElementById("root"))}},[[145,1,2]]]);
//# sourceMappingURL=main.ff613ff2.chunk.js.map