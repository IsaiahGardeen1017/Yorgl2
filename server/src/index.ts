import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DuckRouter } from './routers/duckRouter';

dotenv.config();

const app: Express = express();
const port = process.env.BACKEND_PORT;

app.use(DuckRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

