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

(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/utils.js
  function log(...msg) {
    if (msg.length >= 1) {
      console.log("%c[Cheater]", "color: orange; font-weight: bold;", ...msg);
    } else {
      console.log();
    }
  }

  // src/index.js
  var card_database = {};
  window.card_database = card_database;
  var XWebSocket = class extends WebSocket {
    constructor(...args) {
      super(...args);
      eavesdrop(this);
    }
  };
  window.WebSocket = XWebSocket;
  function eavesdrop(ws) {
    const listeners = {};
    ws.addEventListener("open", () => {
      log("Connected");
      if (listeners.open) {
        listeners.open.forEach((listener) => listener());
      }
    });
    ws.addEventListener("close", () => {
      log("Disconnected");
      if (listeners.close) {
        listeners.close.forEach((listener) => listener());
      }
    });
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.payload.game) {
        for (let i = 0; i < msg.payload.game.discards.length; i++) {
          if (!card_database[msg.payload.game.discards[i].x]) {
            log("Put card into database.", msg.payload.game.discards[i]);
            card_database[msg.payload.game.discards[i].x] = JSON.parse(JSON.stringify(msg.payload.game.discards[i]));
          }
        }
        for (let i = 0; i < msg.payload.game.players.length; i++) {
          msg.payload.game.players[i].hands = msg.payload.game.players[i].hands.map((card) => {
            if (card_database[card.x]) {
              log("Found card from database.", card_database[card.x]);
              return card_database[card.x];
            }
            return card;
          });
        }
      }
      if (listeners.message) {
        listeners.message.forEach((listener) => listener(__spreadProps(__spreadValues({}, event), { data: JSON.stringify(msg) })));
      }
    });
    ws.addEventListener = (...args) => {
      log("Add event listener", ...args);
      if (args.length === 2) {
        args.push({});
      }
      const [type, listener] = args;
      if (listeners[type] === void 0) {
        listeners[type] = [];
      }
      listeners[type].push(listener);
    };
  }
})();
