hum = prompt("Escolha Pedra (1), Papel (2) ou Tesoura (3): ");

comp = Math.random();

if (comp <= 0.33)
    comp = "Pedra";
else if (comp > 0.33 && comp <= 0.67)
    comp = "Papel";
else if (comp > 0.66)
    comp = "Tesoura";

alert("Computador escolheu: " + comp);

switch (hum) {
    case "1":
        if (comp == "Pedra")
            alert("Empate");
        else if (comp == "Papel")
            alert("Derrota");
        else if (comp == "Tesoura")
            alert("Vitória");
        break;
    case "2":
        if (comp == "Pedra")
            alert("Vitória");
        else if (comp == "Papel")
            alert("Empate");
        else if (comp == "Tesoura")
            alert("Derrota");
        break;
    case "3":
        if (comp == "Pedra")
            alert("Derrota");
        else if (comp == "Papel")
            alert("Vitória");
        else if (comp == "Tesoura")
            alert("Empate");
        break;
    default:
        alert("Não foi inserido um valor válido");
        break;
}