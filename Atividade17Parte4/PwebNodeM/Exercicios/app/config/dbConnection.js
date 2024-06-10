var sql = require('mssql');

var connSQLServer = function() {
    const sqlConfig = {
        user:'BD2221009',
        password: 'Timber_2008',
        database: 'BD',
        server: 'APOLO',
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    }
    return sql.connect(sqlConfig);
}

module.exports = function() {
    console.log('O autoload carregou o módulo de conexão com o BD');
    return connSQLServer;
}