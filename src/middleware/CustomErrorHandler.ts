import {Middleware, ExpressErrorMiddlewareInterface} from 'routing-controllers';
import LogHelper from '../helpers/LogHelper';

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, req: any, res: any, next: (err?: any) => any) {
        if (error) {
            res.status(400);
            res.send({error});
            LogHelper.writeLog(`${req.method} ${req.originalUrl}\n${JSON.stringify(error)}\n`);
        }
        res.end();
    }
}
