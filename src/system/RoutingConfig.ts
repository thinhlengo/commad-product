import * as fsextra from 'fs-extra';
import * as path from 'path';
import {useExpressServer} from 'routing-controllers';
import {SystemController} from '../controllers/SystemController';
import {NotFoundUrl} from '../middleware/NotFoundUrl';
import UserController from '../controllers/UserController';
import FileController from '../controllers/FileController';
import DeviceController from '../controllers/DeviceController';
import {CustomErrorHandler} from '../middleware/CustomErrorHandler';

export class RoutingConfig {
    static config() {
        let folder = 'uploads/';
        let express = require('express'); // or you can import it if you have installed typings
        let app = express(); // your created express server
        // app.use() // you can configure it the way you want
        app.use(express.static(path.join(__dirname, '../../uploads')));
        fsextra.ensureDirSync(folder);

        useExpressServer(app, {
            cors: true,
            defaultErrorHandler: false,
            routePrefix: '/api',
            defaults: {
                nullResultCode: 404,
                undefinedResultCode: 204,
                paramOptions: {
                    required: true
                }
            },
            middlewares: [
                NotFoundUrl,
                CustomErrorHandler
            ],
            controllers: [
                SystemController,
                UserController,
                FileController,
                DeviceController
            ]
        });
        // const app = createExpressServer({
        //     cors: true,
        //     routePrefix: '/api',
        //     controllers: [
        //         SystemController
        //     ]
        // });
        return app;
    }
}
