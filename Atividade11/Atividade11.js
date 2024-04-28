const funcionario1 = {
    Matricula: 12345,
    Nome: "João Silva",
    Funcao: "Desenvolvedor"
};

const funcionario2 = new Object();
funcionario1.Matricula = 12345;
funcionario1.Nome = "João Silva";
funcionario1.Funcao = "Desenvolvedor";

function Funcionario(matricula, nome, funcao) {
    this.Matricula = matricula;
    this.Nome = nome;
    this.Funcao = funcao;
}

const funcionario1 = new Funcionario(12345, "Jobson o Niltonianus", "Desenvolvedor");