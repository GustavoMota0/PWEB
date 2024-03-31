var
nome = prompt("Nome do aluno: ")
nota1 = parseFloat(prompt("Nota 1: ")), 
nota2 = parseFloat(prompt("Nota 2: ")), 
nota3 = parseFloat(prompt("Nota 3: "));

alert("Media: " + ((nota1 + nota2 + nota3) / 3).toFixed(2));

var decisao = confirm("O cálculo da média foi correto? (Ok = sim e Cancelar = não)");
if (decisao) {
alert("Obrigado por confirmar!");
} else {
alert("Você está errado!");
}