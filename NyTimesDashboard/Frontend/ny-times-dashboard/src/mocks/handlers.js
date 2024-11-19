import {rest} from 'msw';
import {mockData} from "./mockData";

export const handlers = [
    rest.get(`${process.env.REACT_APP_API_ENDPOINT}`, (req, res, ctx) =>{
        return res (
            ctx.status(200),
            ctx.json(mockData)
        )
    })
]