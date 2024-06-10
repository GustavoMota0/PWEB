module.exports = function(app){
    app.get('/informacao/professores',async function(req,res) {
        //res.render("informacao/professores");
        const sql = require('mssql');

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
        async function getProfessores() {
            try {
                const pool = await sql.connect(sqlConfig);
                const results = await pool.request().query('select * from professores');
                //res.send(results.recordset);
                res.render('informacao/professores',{profs: results.recordset});
            }
            catch (err) {
                console.log(err);
            }
        }
        getProfessores();
    });
}