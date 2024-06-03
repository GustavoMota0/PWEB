var app = require('./app/config/server');

var rotaHome = require('./app/routes/home');
rotaHome(app);
var rotaCursos = require('./app/routes/cursos');
rotaCursos(app);
var rotaProfessores = require('./app/routes/professores');
rotaProfessores(app);
var rotaHistoria = require('./app/routes/historia');
rotaHistoria(app);
var rotaAdicionar_Usuario = require('./app/routes/adicionar_usuario');
rotaAdicionar_Usuario(app);

app.listen(3000,function(){
    console.log("Servidor iniciado...");
});
