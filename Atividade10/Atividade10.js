//Retornar o maior número inserido

var num1 = parseInt(prompt("Primeiro número: "));
var num2 = parseInt(prompt("Segundo número: ", num2));
var num3 = parseInt(prompt("Terceiro número: ", num3));
alert("Maior número: " + maior(num1, num2, num3));

function maior(num1, num2, num3) {
    if (num1 >= num2 && num1 >= num3) {
        return num1;
    }
    else if (num2 >= num1 && num2 >= num3) {
        return num2;
    }
    else {
        return num3;
    }
}

//Retornar os números inseridos anteriormente em ordem crescente

alert("Ordem crescente: " + crescente(num1, num2, num3));

function crescente(num1, num2, num3) {
    const min = Math.min(num1, num2, num3);
    const max = Math.max(num1, num2, num3);
    const meio = num1 + num2 + num3 - min - max;

    return [min, meio, max];
}

//Testar se é palíndromo e devolver uma resposta

s = prompt("Insira uma palavra: ");
alert(palindromo(s));

function palindromo(s) {
    s = s.trim().toUpperCase().split("");
    var palavra = s.slice();
    var palavraInvertida = s.reverse();

    if (palavra.join("") === palavraInvertida.join(""))
      return "Palíndromo";
    else 
      return "Não é palíndromo";
}

//Testar se é triângulo e determinar o seu tipo

var l1 = prompt("Insira o lado 1 de um triângulo: ");
var l2 = prompt("Insira o lado 2 de um triângulo: ");
var l3 = prompt("Insira o lado 3 de um triângulo: ");
alert(triangulo(l1, l2, l3));

function triangulo(l1, l2, l3) {
    l1 = parseInt(l1);
    l2 = parseInt(l2);
    l3 = parseInt(l3);

    if (l1 == "" || l2 == "" || l3 == "")
        return "Não é triângulo";
    else if (l1 + l2 <= l3)
        return "Não é triângulo";
    else if (l1 + l3 <= l2)
        return "Não é triângulo";
    else if (l2 + l3 <= l1)
        return "Não é triângulo";

    [l1, l2, l3] = crescente(l1, l2, l3);

    if (l1 === l2 && l1 === l3)
        return "Triângulo equilátero";
    else if (l1 === l2 || l1 === l3 || l2 === l3)
        return "Triângulo isósceles";
    else if ((Math.pow(l1, 2) + Math.pow(l2, 2)) === Math.pow(l3, 2))
        return "Triângulo retângulo";
    else
        return "Triângulo escaleno";
}
