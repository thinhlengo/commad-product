class Development {
    static DATABASES = [{
        NAME: 'default',
        HOST: 'localhost',
        POST: 5432,
        DB_NAME: 'curt-development',
        USERNAME: '',
        PASSWORD: ''
    }];

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

export default Development;
