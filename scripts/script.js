function atualizarRelogio() {
    const agora = new Date();
    const horario = agora.toLocaleTimeString('pt-BR');
    document.getElementById('relogio').innerHTML = horario;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();