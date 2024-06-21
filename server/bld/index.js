"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./routers/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.BACKEND_PORT;
app.use('/api/auth', auth_1.AuthRouter);
app.get('*', (req, res) => {
    console.log('what?');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
