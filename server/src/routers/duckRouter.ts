import express, {Express, Request, Response} from "express";

export const DuckRouter = express.Router();

DuckRouter.get('/', (req: Request, res: Response) => {
    res.send('ducks')
})
