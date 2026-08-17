const boasVindas = document.getElementById("msgEntrada");
const inputTarefa = document.getElementById("todoList");
const formTarefa = document.querySelector("section#listSec form");
const ulTarefas = document.getElementById("listTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefasDashDev")) || [];

function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

function atualizarRelogio() {
  const agora = new Date();
  const hora = agora.getHours();
  const horario = agora.toLocaleTimeString("pt-BR");

  document.getElementById("relogio").innerText = horario;

  const nome = localStorage.getItem("nome");
  if (nome) {
    const saudacao = obterSaudacao(hora);
    boasVindas.innerText = `${saudacao}, ${nome}!`;
  }
}

function pegarNome() {
  let nome = localStorage.getItem("nome");

  if (!nome) {
    nome = prompt("Qual é o seu nome?");
    while (nome === null || nome.trim() === "") {
      nome = prompt("Por favor digite algo! Qual é o seu nome?");
    }
    nome.trim();
    localStorage.setItem("nome", nome);
  }
}

function adicionarTarefa(event) {
  event.preventDefault();

  const texto = inputTarefa.value.trim();

  if (texto === "") return;

  const novaTarefa = {
    texto: texto
  };

  tarefas.push(novaTarefa);
  salvarTarefasNoStorage();
  renderizarTarefas();

  inputTarefa.value = "";
  inputTarefa.focus();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefasNoStorage();
  renderizarTarefas();
}

function renderizarTarefas() {
  ulTarefas.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarefa.texto;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";

    btnRemover.addEventListener("click", () => removerTarefa(index));

    li.appendChild(spanTexto);
    li.appendChild(btnRemover);
    ulTarefas.appendChild(li);
  });
}

function salvarTarefasNoStorage() {
  localStorage.setItem("tarefasDashDev", JSON.stringify(tarefas));
}

formTarefa.addEventListener("submit", adicionarTarefa);
renderizarTarefas();
pegarNome();
atualizarRelogio();
setInterval(atualizarRelogio, 1000);
