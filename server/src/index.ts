import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DuckRouter } from './routers/duckRouter';
import { AuthRouter } from './routers/auth';

dotenv.config();

const app: Express = express();
const port = process.env.BACKEND_PORT;

app.use('/api/auth', AuthRouter);

app.get('*', (req, res) => {
    console.log('what?');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

