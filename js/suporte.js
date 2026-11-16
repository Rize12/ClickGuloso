import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4-Hy8zBXHgq4e-Wh-hA0BiqgodEiGKh8",
  authDomain: "clickesperto.firebaseapp.com",
  databaseURL: "https://clickesperto-default-rtdb.firebaseio.com",
  projectId: "clickesperto",
  storageBucket: "clickesperto.firebasestorage.app",
  messagingSenderId: "435539643445",
  appId: "1:435539643445:web:40bcd852d81a934229b57c",
  measurementId: "G-1VNYY847Y9"
};

const app = initializeApp(firebaseConfig);
const banco = getDatabase(app);
const mensagensRef = ref(banco, "mensagensSuporte");

const formulario = document.getElementById("formSuporte");
const campoNome = document.getElementById("nomeUsuario");
const campoMensagem = document.getElementById("mensagemUsuario");
const status = document.getElementById("statusSuporte");
const areaMensagens = document.getElementById("areaMensagens");

function criarMensagem(nome, texto, horario) {
  const cartao = document.createElement("article");
  cartao.className = "cartao";

  const titulo = document.createElement("h3");
  titulo.textContent = nome;

  const mensagem = document.createElement("p");
  mensagem.textContent = texto;

  const hora = document.createElement("p");
  hora.className = "acao";
  hora.textContent = horario;

  cartao.append(titulo, mensagem, hora);
  areaMensagens.append(cartao);
  areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

onChildAdded(mensagensRef, (dados) => {
  const mensagem = dados.val();

  const horario = mensagem.horario
    ? new Date(mensagem.horario).toLocaleString("pt-BR")
    : "";

  criarMensagem(mensagem.nome, mensagem.texto, horario);
});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const texto = campoMensagem.value.trim();

  if (!nome || !texto) {
    status.textContent = "Preencha seu nome e escreva uma mensagem.";
    status.className = "feedback incorreto";
    return;
  }

  try {
    await push(mensagensRef, {
      nome,
      texto,
      horario: Date.now()
    });

    campoMensagem.value = "";
    status.textContent = "Mensagem enviada!";
    status.className = "feedback correto";
  } catch (erro) {
    status.textContent = "Não foi possível enviar a mensagem. Verifique a configuração do Firebase.";
    status.className = "feedback incorreto";
  }
});