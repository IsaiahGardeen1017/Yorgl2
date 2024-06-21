import express, {Express, Request, Response} from "express";

export const DuckRouter = express.Router();

DuckRouter.get('/*', (req: Request, res: Response) => {
    console.log('ducks')
    res.send('ducks')
})
