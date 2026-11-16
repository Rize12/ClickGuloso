import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  serverTimestamp
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
const auth = getAuth(app);
const banco = getDatabase(app);

const telaLogin = document.getElementById("telaLogin");
const telaChat = document.getElementById("telaChat");
const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");
const statusLogin = document.getElementById("statusLogin");
const formMensagem = document.getElementById("formMensagem");
const mensagemUsuario = document.getElementById("mensagemUsuario");
const statusMensagem = document.getElementById("statusMensagem");
const areaMensagens = document.getElementById("areaMensagens");
const botaoSair = document.getElementById("botaoSair");

let caminhoChatAtual = null;

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = emailLogin.value.trim();
  const senha = senhaLogin.value;

  if (!email || !senha) {
    statusLogin.textContent = "Preencha e-mail e senha.";
    statusLogin.className = "feedback incorreto";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    statusLogin.textContent = "";
    statusLogin.className = "feedback";
  } catch (erro) {
    statusLogin.textContent = "E-mail ou senha incorretos.";
    statusLogin.className = "feedback incorreto";
  }
});

botaoSair.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (usuario) => {
  if (!usuario) {
    telaLogin.classList.remove("escondido");
    telaChat.classList.add("escondido");
    areaMensagens.innerHTML = "";
    caminhoChatAtual = null;
    return;
  }

  telaLogin.classList.add("escondido");
  telaChat.classList.remove("escondido");

  caminhoChatAtual = `suportes/${usuario.uid}/mensagens`;
  areaMensagens.innerHTML = "";

  onChildAdded(ref(banco, caminhoChatAtual), (dados) => {
    const mensagem = dados.val();
    criarMensagem(mensagem.autor, mensagem.texto, mensagem.horario);
  });
});

formMensagem.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const usuario = auth.currentUser;

  if (!usuario || !caminhoChatAtual) {
    statusMensagem.textContent = "Faça login para enviar mensagens.";
    statusMensagem.className = "feedback incorreto";
    return;
  }

  const texto = mensagemUsuario.value.trim();

  if (!texto) {
    statusMensagem.textContent = "Escreva uma mensagem.";
    statusMensagem.className = "feedback incorreto";
    return;
  }

  try {
    await push(ref(banco, caminhoChatAtual), {
      autor: "usuario",
      texto,
      horario: Date.now()
    });

    mensagemUsuario.value = "";
    statusMensagem.textContent = "Mensagem enviada!";
    statusMensagem.className = "feedback correto";
  } catch (erro) {
    statusMensagem.textContent = "Não foi possível enviar a mensagem.";
    statusMensagem.className = "feedback incorreto";
  }
});

function criarMensagem(autor, texto, horario) {
  const cartao = document.createElement("article");
  cartao.className = "cartao";

  const titulo = document.createElement("h3");
  titulo.textContent = autor === "admin" ? "Suporte" : "Você";

  const conteudo = document.createElement("p");
  conteudo.textContent = texto;

  const hora = document.createElement("p");
  hora.className = "acao";
  hora.textContent = horario
    ? new Date(horario).toLocaleString("pt-BR")
    : "";

  cartao.append(titulo, conteudo, hora);
  areaMensagens.append(cartao);
  areaMensagens.scrollTop = areaMensagens.scrollHeight;
}