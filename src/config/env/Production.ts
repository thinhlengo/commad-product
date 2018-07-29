class Production {
    static DATABASES = [{
        NAME: 'default',
        HOST: 'localhost',
        PORT: 27017,
        DB_NAME: 'backend_seed_production',
        USERNAME: '',
        PASSWORD: ''
    }, {
        NAME: 'test',
        HOST: 'localhost',
        PORT: 27017,
        DB_NAME: 'backend_seed_production',
        USERNAME: '',
        PASSWORD: ''
    }];
    static RABBITMQ = {
        HOST: '192.168.1.87',
        USER: 'vnng_constance',
        PWD: 'vnng@123'
    };
    static eventStoreSettings = () => ({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        dbName: 'eventstore',
        username: '',
        password: '',
        eventsCollectionName: 'events',
        snapshotsCollectionName: 'snapshots',
        transactionsCollectionName: 'transactions',
        options: {
            useNewUrlParser: true
        }
        // url: `mongodb://192.168.1.87:27018/eventstore`;
    });
    static SMTP = {
        AUTHENTICATOR: {
            USERNAME: '[Authenticator Email]',
            PASSWORD: '[Password]'
        },
        SENDER: {
            NAME: '[Sender Name]',
            EMAIL: '[Sender Email]'
        }
    };
}

export default Production;
