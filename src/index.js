import { log } from "./utils.js";

const card_database = {};
window.card_database = card_database;

class XWebSocket extends WebSocket {
    constructor(...args) {
        super(...args);
        eavesdrop(this);
    }
}

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
                    card_database[msg.payload.game.discards[i].x] = JSON.parse(
                        JSON.stringify(msg.payload.game.discards[i]),
                    );
                }
            }

            for (let i = 0; i < msg.payload.game.players.length; i++) {
                msg.payload.game.players[i].hands = msg.payload.game.players[i].hands.map(
                    (card) => {
                        if (card_database[card.x]) {
                            log("Found card from database.", card_database[card.x]);
                            return card_database[card.x];
                        }
                        return card;
                    },
                );
            }
        }

        if (listeners.message) {
            listeners.message.forEach((listener) =>
                listener({ ...event, data: JSON.stringify(msg) }),
            );
        }
    });

    ws.addEventListener = (...args) => {
        log("Add event listener", ...args);
        if (args.length === 2) {
            args.push({});
        }

        const [type, listener] = args;

        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        listeners[type].push(listener);
    };
}
