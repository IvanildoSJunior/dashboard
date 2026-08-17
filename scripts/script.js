const boasVindas = document.getElementById('msgEntrada');

function obterSaudacao(hora) {
    if(hora >=5 && hora < 12) {
        return 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
}

function atualizarRelogio() {
    const agora = new Date();
    const hora = agora.getHours();
    const horario = agora.toLocaleTimeString('pt-BR');

    document.getElementById('relogio').innerText = horario;

    const nome = localStorage.getItem('nome');
    if(nome) {
        const saudacao = obterSaudacao(hora);
        boasVindas.innerText = `${saudacao}, ${nome}!`
    }
}


function pegarNome() {
    let nome = localStorage.getItem('nome')

    if(!nome) {
        nome = prompt('Qual é o seu nome?');
        while (nome === null || nome.trim() === "") {
            nome = prompt("Por favor digite algo! Qual é o seu nome?");
        }
        nome.trim();
        localStorage.setItem('nome', nome);
    }
}
pegarNome();
atualizarRelogio();
setInterval(atualizarRelogio, 1000);