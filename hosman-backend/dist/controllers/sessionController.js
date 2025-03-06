"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifySessionUpdate = void 0;
const notifySessionUpdate = (io) => {
    io.emit("updateSessions");
};
exports.notifySessionUpdate = notifySessionUpdate;
