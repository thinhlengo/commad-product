import {getConnectionOptions, createConnection} from 'typeorm';
import Project from '../config/Project';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Database {
    static async connect() {
        let db = Project.DATABASES.find(db => db.NAME === 'default')!;
        const dbconfig : PostgresConnectionOptions = {
            'type': 'postgres',
            'host': db.HOST,
            'port': db.PORT,
            'username': db.USERNAME,
            'password': db.PASSWORD,
            'database': db.DB_NAME,
            'synchronize': true,
            'logging': false,
            'entities': [
                'dest/app/entity/*.js'
            ],
            'cli': {
                'entitiesDir': 'dest/app/entity'
            },
            'replication': {
                master: {
                    host: db.HOST,
                    port: db.PORT,
                    username: db.USERNAME,
                    password: db.PASSWORD,
                    database: db.DB_NAME
                },
                slaves: [{
                    host: db.HOST,
                    port: db.PORT,
                    username: db.USERNAME,
                    password: db.PASSWORD,
                    database: db.DB_NAME
                }],
            }
        };
        // read connection options from ormconfig file (or ENV variables)
        // const connectionOptions = await getConnectionOptions();
        // create a connection using modified connection options
        await createConnection(dbconfig).then(connection => {
            console.log('Database is connected');
        }).catch(error => {
            console.error(error);
        });
    }
}
