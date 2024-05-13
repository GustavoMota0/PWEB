function maiusculasMinusculas() {
    let texto = document.getElementById("texto").value;
    let maiusculasCheckbox = document.getElementById("maiusculas").checked;
    let minusculasCheckbox = document.getElementById("minusculas").checked;

    if (maiusculasCheckbox) {
        texto = texto.toUpperCase();
    } else if (minusculasCheckbox) {
        texto = texto.toLowerCase();
    }

    document.getElementById("texto").value = texto;
}