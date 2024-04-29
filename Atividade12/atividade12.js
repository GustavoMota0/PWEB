function Retangulo(base, altura) {
    this.base = base;
    this.altura = altura;
  
    this.calcularArea = function() {
      return this.base * this.altura;
    };
}
  
let base = parseFloat(prompt("Insira a base do retângulo:"));
let altura = parseFloat(prompt("Insira a altura do retângulo:"));
  
let retangulo = new Retangulo(base, altura);
  
let area = retangulo.calcularArea();
alert("A área do retângulo é " + area);






class Conta {
    constructor(nomeCorrentista, banco, numeroConta, saldo) {
        this._nomeCorrentista = nomeCorrentista;
        this._banco = banco;
        this._numeroConta = numeroConta;
        this._saldo = saldo;
    }
  
    // Getters
    get nomeCorrentista() {
        return this._nomeCorrentista;
    }
  
    get banco() {
        return this._banco;
    }
  
    get numeroConta() {
        return this._numeroConta;
    }
  
    get saldo() {
        return this._saldo;
    }
  
    // Setters
    set nomeCorrentista(novoNome) {
        this._nomeCorrentista = novoNome;
    }
  
    set banco(novoBanco) {
        this._banco = novoBanco;
    }
  
    set numeroConta(novoNumero) {
        this._numeroConta = novoNumero;
    }
  
    set saldo(novoSaldo) {
        this._saldo = novoSaldo;
    }
  }
  
  class Corrente extends Conta {
    constructor(nomeCorrentista, banco, numeroConta, saldo, saldoEspecial) {
        super(nomeCorrentista, banco, numeroConta, saldo);
        this._saldoEspecial = saldoEspecial;
    }
  
    // Getter and Setter for saldoEspecial
    get saldoEspecial() {
        return this._saldoEspecial;
    }
  
    set saldoEspecial(novoSaldoEspecial) {
        this._saldoEspecial = novoSaldoEspecial;
    }
  }
  
  class Poupanca extends Conta {
    constructor(nomeCorrentista, banco, numeroConta, saldo, juros, dataVencimento) {
        super(nomeCorrentista, banco, numeroConta, saldo);
        this._juros = juros;
        this._dataVencimento = dataVencimento;
    }
  
    // Getters and Setters for juros and dataVencimento
    get juros() {
        return this._juros;
    }
  
    set juros(novosJuros) {
        this._juros = novosJuros;
    }
  
    get dataVencimento() {
        return this._dataVencimento;
    }
  
    set dataVencimento(novaData) {
        this._dataVencimento = novaData;
    }
  }
  
  // Getting user input for Corrente account
let nomeCorrentista = prompt("Digite o nome do correntista (Corrente):");
let bancoCorrente = prompt("Digite o banco (Corrente):");
let numeroContaCorrente = prompt("Digite o número da conta (Corrente):");
let saldoCorrente = parseFloat(prompt("Digite o saldo (Corrente):"));
let saldoEspecialCorrente = parseFloat(prompt("Digite o saldo especial (Corrente):"));
  
  // Creating Corrente object
let contaCorrente = new Corrente(nomeCorrentista, bancoCorrente, numeroContaCorrente, saldoCorrente, saldoEspecialCorrente);
  
  // Getting user input for Poupanca account
let nomeCorrentistaPoupanca = prompt("Digite o nome do correntista (Poupança):");
let bancoPoupanca = prompt("Digite o banco (Poupança):");
let numeroContaPoupanca = prompt("Digite o número da conta (Poupança):");
let saldoPoupanca = parseFloat(prompt("Digite o saldo (Poupança):"));
let jurosPoupanca = parseFloat(prompt("Digite os juros (Poupança):"));
let dataVencimentoPoupanca = prompt("Digite a data de vencimento (Poupança):");
  
  // Creating Poupanca object
let contaPoupanca = new Poupanca(nomeCorrentistaPoupanca, bancoPoupanca, numeroContaPoupanca, saldoPoupanca, jurosPoupanca, dataVencimentoPoupanca);
  
  // Displaying data using alert
alert("Conta Corrente\n" +
        "Nome: " + contaCorrente.nomeCorrentista + "\n" +
        "Banco: " + contaCorrente.banco + "\n" +
        "Número da Conta: " + contaCorrente.numeroConta + "\n" +
        "Saldo: " + contaCorrente.saldo + "\n" +
        "Saldo Especial: " + contaCorrente.saldoEspecial);
  
alert("Conta Poupança\n" +
        "Nome: " + contaPoupanca.nomeCorrentista + "\n" +
        "Banco: " + contaPoupanca.banco + "\n" +
        "Número da Conta: " + contaPoupanca.numeroConta + "\n" +
        "Saldo: " + contaPoupanca.saldo + "\n" + 
        "Juros: " + contaPoupanca.juros + "\n" +
        "Data de Vencimento: " + contaPoupanca.dataVencimento);