module.exports = function(app){
    app.get('/informacao/professores',async function(req,res) {
        //res.render("informacao/professores");
        const sql = require('mssql');
        
        async function getProfessores() {
            try {
                var connection = app.config.dbConnection;
                const pool = await connection();
                //const pool = await sql.connect(sqlConfig);
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