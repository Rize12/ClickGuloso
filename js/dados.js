// Arquivo para adicionar conteúdo novo facilmente.
const dicas = [
  { titulo: "Use senhas diferentes", texto: "Crie senhas longas e únicas para cada serviço. Evite aniversários, nomes e sequências simples." },
  { titulo: "Ative a verificação em duas etapas", texto: "Ative a verificação em duas etapas no e-mail, banco e redes sociais. Ela adiciona uma proteção extra caso alguém descubra sua senha." },
  { titulo: "Não compartilhe códigos", texto: "Códigos recebidos por SMS ou aplicativo são pessoais. Nunca envie para outra pessoa, mesmo que ela diga ser do banco." },
  { titulo: "Desconfie de urgência", texto: "Mensagens como “sua conta será bloqueada hoje” ou “clique agora para receber um prêmio” podem ser golpes." },
  { titulo: "Confira o endereço do site", texto: "Antes de digitar dados, confira se o endereço é o site oficial. Golpistas criam páginas parecidas com as originais." }
];

const exemplos = [
  { mensagem: "Seu cartão foi bloqueado. Para liberar, clique aqui e confirme sua senha e o código recebido por SMS.", alerta: "Pedido de senha e código de verificação.", acao: "Não clique. Acesse o aplicativo ou site oficial." },
  { mensagem: "Parabéns! Você ganhou um celular novo. Pague apenas a taxa de entrega pelo Pix para receber o prêmio.", alerta: "Prêmio inesperado e pedido de pagamento.", acao: "Ignore a mensagem e não faça o Pix." },
  { mensagem: "Olá, sou da entrega. Seu pacote está retido. Envie uma foto do documento e o código do cartão para liberar.", alerta: "Pedido de documento e dados do cartão.", acao: "Não envie nada e fale apenas pelos canais oficiais." }
];

const perguntas = [
  { pergunta: "Uma mensagem diz que sua conta será bloqueada em 10 minutos e pede sua senha. O que fazer?", alternativas: ["Enviar a senha rapidamente", "Clicar no link e informar os dados", "Não clicar e acessar o app oficial"], correta: 2, explicacao: "Nunca informe senha ou código por mensagem; use o app ou site oficial." },
  { pergunta: "Qual senha é mais segura?", alternativas: ["123456", "Uma frase longa, única, com números e símbolos", "A data de aniversário"], correta: 1, explicacao: "Senhas devem ser longas, únicas e difíceis de adivinhar." },
  { pergunta: "Alguém diz ser do suporte e pede o código de verificação que chegou no seu celular. O que fazer?", alternativas: ["Enviar o código", "Não enviar e encerrar a conversa", "Enviar apenas metade do código"], correta: 1, explicacao: "Códigos de verificação são pessoais e nunca devem ser compartilhados." }
];

const glossario = [
  { termo: "Phishing", definicao: "Tentativa de roubar dados por mensagens, e-mails ou sites falsos." },
  { termo: "Verificação em duas etapas", definicao: "Proteção extra que pede um código além da senha." },
  { termo: "Malware", definicao: "Programa malicioso que pode infectar celular ou computador." },
  { termo: "Dados pessoais", definicao: "Informações que identificam você, como CPF, endereço e dados bancários." }
];
