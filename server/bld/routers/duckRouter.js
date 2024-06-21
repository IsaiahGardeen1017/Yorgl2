"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuckRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.DuckRouter = express_1.default.Router();
exports.DuckRouter.get('/*', (req, res) => {
    console.log('ducks');
    res.send('ducks');
});
