import {Middleware, ExpressMiddlewareInterface} from 'routing-controllers';
import {NextFunction, Request, Response} from 'express';

@Middleware({ type: 'after' })
export class NotFoundUrl implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response, next?: NextFunction): void {
        if (!res.headersSent) {
            res.status(404);
            res.send({error: {message: 'Api Not Found!'}});
        }
        res.end();
    }
}
