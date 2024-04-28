var altura = parseFloat(prompt("Insira a sua altura (m): "));
var peso = parseFloat(prompt("Insira o seu peso atual (kg): "));
var imc = calcImc(altura, peso);

alert("Seu IMC é " + imc.toFixed(1) + " e sua classicação é " + classificacao(imc) + " com grau de obesidade " + grauObesidade(imc));

function calcImc(altura, peso) {
    return (peso / (altura * altura));
}

function classificacao(imc) {
    if (imc < 18.5) {
      return "Magreza";
    } else if (imc >= 18.5 && imc < 25) {
      return "Normal";
    } else if (imc >= 25 && imc < 30) {
      return "Sobrepeso";
    } else if (imc >= 30 && imc < 40) {
      return "Obesidade";
    } else {
      return "Obesidade Grave";
    }
  }
  
  function grauObesidade(imc) {
    if (imc < 18.5) {
      return "0";
    } else if (imc >= 18.5 && imc < 25) {
      return "0";
    } else if (imc >= 25 && imc < 30) {
      return "I";
    } else if (imc >= 30 && imc < 40) {
      return "II";
    } else {
      return "III";
    }
  }