// ==UserScript==
// @name         Bang Cheater
// @version      1.0.0
// @description  Cheat on https://bang.jacoblin.cool/
// @author       JacobLinCool <jacoblincool@gmail.com> (https://github.com/JacobLinCool)
// @license      MIT
// @homepage     https://github.com/JacobLinCool/bang-cheater#readme
// @supportURL   https://github.com/JacobLinCool/bang-cheater/issues
// @updateURL    https://github.com/JacobLinCool/bang-cheater/raw/dist/bang-cheater.min.user.js
// @downloadURL  https://github.com/JacobLinCool/bang-cheater/raw/dist/bang-cheater.min.user.js
// @namespace    http://tampermonkey.net/
// @match        https://bang.jacoblin.cool/*
// @grant        none
// ==/UserScript==

(()=>{var g=Object.defineProperty,y=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var i=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var l=(t,e,a)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,c=(t,e)=>{for(var a in e||(e={}))h.call(e,a)&&l(t,a,e[a]);if(i)for(var a of i(e))u.call(e,a)&&l(t,a,e[a]);return t},p=(t,e)=>y(t,m(e));function r(...t){t.length>=1?console.log("%c[Cheater]","color: orange; font-weight: bold;",...t):console.log()}var s={};window.card_database=s;var f=class extends WebSocket{constructor(...e){super(...e);x(this)}};window.WebSocket=f;function x(t){let e={};t.addEventListener("open",()=>{r("Connected"),e.open&&e.open.forEach(a=>a())}),t.addEventListener("close",()=>{r("Disconnected"),e.close&&e.close.forEach(a=>a())}),t.addEventListener("message",a=>{let n=JSON.parse(a.data);if(n.payload.game){for(let o=0;o<n.payload.game.discards.length;o++)s[n.payload.game.discards[o].x]||(r("Put card into database.",n.payload.game.discards[o]),s[n.payload.game.discards[o].x]=JSON.parse(JSON.stringify(n.payload.game.discards[o])));for(let o=0;o<n.payload.game.players.length;o++)n.payload.game.players[o].hands=n.payload.game.players[o].hands.map(d=>s[d.x]?(r("Found card from database.",s[d.x]),s[d.x]):d)}e.message&&e.message.forEach(o=>o(p(c({},a),{data:JSON.stringify(n)})))}),t.addEventListener=(...a)=>{r("Add event listener",...a),a.length===2&&a.push({});let[n,o]=a;e[n]===void 0&&(e[n]=[]),e[n].push(o)}}})();
