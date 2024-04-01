var cont, contMasc = 0, contFem = 0, totalIdade = 0, idadeMenor, idadeMaior, otimo = 0, bom = 0, regular = 0, pessimo = 0;

for (cont = 0; cont < 5; cont++) {
    idade = parseInt(prompt("Idade: "));
    if (cont == 0) {
        idadeMenor = idade;
        idadeMaior = idade;
    }
    else if (idade < idadeMenor)
        idadeMenor = idade;
    else if (idade > idadeMaior)
        idadeMaior = idade;

    sexo = prompt("Sexo (m/f): ");
    if (sexo == "m")
        contMasc += 1;
    else if (sexo == "f")
        contFem += 1;
    else
        alert("Sexo inserido não é válido");

    aval = parseInt(prompt("Opinião (4 = ótimo / 3 = bom / 2 = regular / 1 = péssimo): "));
    switch (aval) {
        case 1:
            pessimo += 1;
            break;
        case 2:
            regular += 1;
            break;
        case 3:
            bom += 1;
            break;
        case 4:
            otimo += 1;
            break;
        default:
            alert("Avaliação não é válida");
            break;
    }

    totalIdade += idade;
}

alert("Média da idade das pessoas: " + (totalIdade / cont).toFixed(2));
alert("A idade da pessoa mais velha: " + idadeMaior);
alert("A idade da pessoa mais nova: " + idadeMenor);
alert("A quantidade de pessoas que responderam péssimo: " + pessimo);
alert("A porcentagem de pessoas que responderam ótimo e bom: " + (((otimo + bom) / cont) * 100) + "%");
alert("O número de mulheres e homens que responderam ao questionário:\n" + contFem + " mulhere(s) e " + contMasc + " homem(s)");