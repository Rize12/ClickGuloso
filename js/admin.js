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
  onValue,
  push,
  onChildAdded,
  off
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

const EMAIL_ADMIN = "admin@cliqueesperto.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const banco = getDatabase(app);

const telaLogin = document.getElementById("telaLoginAdmin");
const telaPainel = document.getElementById("telaPainel");
const formLogin = document.getElementById("formLoginAdmin");
const emailAdmin = document.getElementById("emailAdmin");
const senhaAdmin = document.getElementById("senhaAdmin");
const statusAdmin = document.getElementById("statusAdmin");
const seletorUsuario = document.getElementById("seletorUsuario");
const areaChatAdmin = document.getElementById("areaChatAdmin");
const formResposta = document.getElementById("formResposta");
const respostaAdmin = document.getElementById("respostaAdmin");
const statusResposta = document.getElementById("statusResposta");
const botaoSair = document.getElementById("botaoSairAdmin");

let usuarioSelecionado = null;
let listenerAtual = null;

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = emailAdmin.value.trim();
  const senha = senhaAdmin.value;

  try {
    const resultado = await signInWithEmailAndPassword(auth, email, senha);

    if (resultado.user.email !== EMAIL_ADMIN) {
      await signOut(auth);
      statusAdmin.textContent = "Esta conta não tem acesso de administrador.";
      statusAdmin.className = "feedback incorreto";
    }
  } catch (erro) {
    statusAdmin.textContent = "E-mail ou senha incorretos.";
    statusAdmin.className = "feedback incorreto";
  }
});

botaoSair.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (usuario) => {
  if (!usuario || usuario.email !== EMAIL_ADMIN) {
    telaLogin.classList.remove("escondido");
    telaPainel.classList.add("escondido");
    return;
  }

  telaLogin.classList.add("escondido");
  telaPainel.classList.remove("escondido");
  carregarConversas();
});

function carregarConversas() {
  const referencia = ref(banco, "suportes");

  onValue(referencia, (dados) => {
    seletorUsuario.innerHTML = "";

    const conversas = dados.val();

    if (!conversas) {
      const opcao = document.createElement("option");
      opcao.textContent = "Nenhuma conversa encontrada";
      seletorUsuario.append(opcao);
      return;
    }

    Object.keys(conversas).forEach((uid) => {
      const opcao = document.createElement("option");
      opcao.value = uid;
      opcao.textContent = `Usuário ${uid.slice(0, 8)}`;
      seletorUsuario.append(opcao);
    });

    if (!usuarioSelecionado) {
      usuarioSelecionado = Object.keys(conversas)[0];
    }

    seletorUsuario.value = usuarioSelecionado;
    abrirChat(usuarioSelecionado);
  });
}

seletorUsuario.addEventListener("change", () => {
  usuarioSelecionado = seletorUsuario.value;
  abrirChat(usuarioSelecionado);
});

function abrirChat(uid) {
  if (!uid) return;

  if (listenerAtual) {
    off(listenerAtual);
  }

  areaChatAdmin.innerHTML = "";
  const caminho = `suportes/${uid}/mensagens`;

  listenerAtual = onChildAdded(ref(banco, caminho), (dados) => {
    const mensagem = dados.val();
    criarMensagem(mensagem.autor, mensagem.texto, mensagem.horario);
  });
}

formResposta.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const usuario = auth.currentUser;

  if (!usuario || usuario.email !== EMAIL_ADMIN) {
    statusResposta.textContent = "Acesso não autorizado.";
    statusResposta.className = "feedback incorreto";
    return;
  }

  const texto = respostaAdmin.value.trim();

  if (!usuarioSelecionado || !texto) {
    statusResposta.textContent = "Escolha uma conversa e escreva uma resposta.";
    statusResposta.className = "feedback incorreto";
    return;
  }

  try {
    await push(ref(banco, `suportes/${usuarioSelecionado}/mensagens`), {
      autor: "admin",
      texto,
      horario: Date.now()
    });

    respostaAdmin.value = "";
    statusResposta.textContent = "Resposta enviada!";
    statusResposta.className = "feedback correto";
  } catch (erro) {
    statusResposta.textContent = "Não foi possível enviar a resposta.";
    statusResposta.className = "feedback incorreto";
  }
});

function criarMensagem(autor, texto, horario) {
  const cartao = document.createElement("article");
  cartao.className = "cartao";

  const titulo = document.createElement("h3");
  titulo.textContent = autor === "admin" ? "Suporte" : "Usuário";

  const conteudo = document.createElement("p");
  conteudo.textContent = texto;

  const hora = document.createElement("p");
  hora.className = "acao";
  hora.textContent = horario
    ? new Date(horario).toLocaleString("pt-BR")
    : "";

  cartao.append(titulo, conteudo, hora);
  areaChatAdmin.append(cartao);
  areaChatAdmin.scrollTop = areaChatAdmin.scrollHeight;
}