const janela = document.getElementById('janela');
const status = document.getElementById('status');

janela.addEventListener('mouseover', function() {
  this.src = 'imagens/janela-aberta.png';
  status.innerHTML = 'Janela Aberta';
});

janela.addEventListener('mouseout', function() {
  this.src = 'imagens/janela-fechada.png';
  status.innerHTML = 'Janela Fechada';
});

janela.addEventListener('click', function() {
  this.src = 'imagens/janela-quebrada.png';
  status.innerHTML = 'Janela Quebrada';
});