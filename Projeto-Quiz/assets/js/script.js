//!DEFINDO AS VARIÁVEIS
const questao = document.querySelector('#questao');
const respostas = Array.from(document.querySelectorAll('.respostasQuiz'));
const progressBar = document.querySelector('.progress-bar');
const progressBarText = document.querySelector('#progress-bar--text');
const questaoNumero = document.querySelector('#score');
const pontuacaoNumero = document.querySelector('.pontuacaoNumero');

let questaoAtual = {};
let aceitarResposta = true;
let score = 0;
let contadorPerguntas = 0;
let perguntasDisponiveis = [];

//?ARRAY CONTENDO TODAS AS QUESTÕES QUE SERÃO UTILIZADAS 
let questoes = [
  {
    questao: "Que tipo de linguagem é HTML?",
    escolha1: "Protocolo de rede",
    escolha2: "Linguagem de marcação",
    escolha3: "Linguagem de script",
    escolha4: "Linguagem de programação",
    resposta: 2,
  },
  {
    questao: "Qual deve ser a primeira tag em qualquer documento HTML?",
    escolha1: "<head>",
    escolha2: "<html>",
    escolha3: "<!doctype html>",
    escolha4: "<body>",
    resposta: 3,
  },
  {
    questao: "Qual tag é usada para exibir imagem em uma página HTML?",
    escolha1: "img",
    escolha2: "image",
    escolha3: "picture",
    escolha4: "src",
    resposta: 1,
  },
  {
    questao: "HTML são páginas da web lidas e renderizadas por?",
    escolha1: "Servidor",
    escolha2: "Interpretador",
    escolha3: "Compilador",
    escolha4: "Navegador web",
    resposta: 4,
  },
  {
    questao: "Qual é tag HTML correta para a quebra de linha?",
    escolha1: "<br />",
    escolha2: "<nbsp>",
    escolha3: "<break />",
    escolha4: "<lb />",
    resposta: 1,
  },
  {
    questao: "Qual é o HTML correto para fazer um hiperlink?",
    escolha1: 'url="https://alunos.b7web.com.br/"',
    escolha2: "<https://alunos.b7web.com.br/>",
    escolha3: '<a href="https://alunos.b7web.com.br/">B7WEB</a>',
    escolha4: '<a name="https://alunos.b7web.com.br/">B7WEB</a>',
    resposta: 3,
  },
  {
    questao: "Documentos HTML são salvos em: ",
    escolha1: "Nenhuma das alternativas",
    escolha2: "Código de linguagem de máquina",
    escolha3: "Formato binário especial",
    escolha4: "Formato ASCII",
    resposta: 4,
  },
  {
    questao: "Qual tag cria uma caixa de seleção para um formulário em HTML?",
    escolha1: '<input type="checkbox">',
    escolha2: "<input checkbox>",
    escolha3: "<checkbox>",
    escolha4: "<input=checkbox>",
    resposta: 1,
  },
  {
    questao: "Escolha a tag HTML correta para o título de menor tamanho?",
    escolha1: "<h4>",
    escolha2: "<h6>",
    escolha3: "<h1>",
    escolha4: "<heading>",
    resposta: 2,
  },
  {
    questao: "Como podemos definir uma tag de vídeo em HTML 5?",
    escolha1: '<video src:"URL"></video>',
    escolha2: '<video src "URL"></video>',
    escolha3: '<video src="URL"></video>',
    escolha4: "<video></video>",
    resposta: 3,
  },
  {
    questao: 'Para que serve a tag "<body></body>"?',
    escolha1: "Incorporar vídeos e áudios",
    escolha2: "Engloba todos os elementos que são mostrados na página",
    escolha3: "Possui informações do meta como o título e charset da página",
    escolha4: "Renderiza um elemento em negrito",
    resposta: 2,
  },
  {
    questao: "Quem criou o HTML?",
    escolha1: "Bill Gates",
    escolha2: "Elon Musk",
    escolha3: "Mark Zuckergerg",
    escolha4: "Tim Berners-Lee",
    resposta: 4,
  },
  {
    questao:"Quais são as duas principais linguagens que trabalham juntamente com o HTML",
    escolha1: "JavaScript e PHP",
    escolha2: "C e PHP",
    escolha3: "CSS e JavaScript",
    escolha4: "PHP e type Script",
    resposta: 3,
  },
  {
    questao: "Qual é o HTML correto para adicionar uma cor de plano de fundo?",
    escolha1: '<body style="background-color:green";>',
    escolha2: '<body bg="green">',
    escolha3: '<body style:"background-color:green";>',
    escolha4: '<background>"green"</background>',
    resposta: 1,
  },
  {
    questao: "O que simboliza uma tag de fechamento?",
    escolha1: ' = "igual"',
    escolha2: ' ; "ponto e vírgula"',
    escolha3: ' / "barra"',
    escolha4: ' ! "exclamação"',
    resposta: 3,
  },
  {
    questao: "Qual destas qualidades NÃO SÃO do HTML",
    escolha1: "Totalmente grátis e de código-aberto",
    escolha2: "Permite a implementação de lógica",
    escolha3: "Uma linguagem amplamente utilizada com diversos recursos e uma comunidade gigante",
    escolha4: "Roda em todos os navegadores",
    resposta: 2,
  },
  {
    questao: "A tag para adição do estilo CSS fica entre que tags?",
    escolha1: '<body></body>',
    escolha2: '<title></title>',
    escolha3: '</title></head>',
    escolha4: '<head></head>',
    resposta: 3,
  },
  {
    questao: "Qual é a função da tag DD?",
    escolha1: "Lista de Definição.",
    escolha2: "Definição de elemnto.",
    escolha3: "Termo.",
    escolha4: "Elemento do Termo.",
    resposta: 4,
  },
  {
    questao: "O que significa CSS?",
    escolha1: "Folhas de estilo de computador.",
    escolha2: "Folhas de estilo criativo.",
    escolha3: "Folhas de estilo coloridas.",
    escolha4: "Folhas de estilo em cascata.",
    resposta: 4,
  },
  {
    questao: "Como você insere um comentário em um arquivo CSS?",
    escolha1: "/*Isto é um comentário*/",
    escolha2: "'Isto é um comentário",
    escolha3: "//Isto é um comentário//",
    escolha4: "//Isto é um comentário",
    resposta: 1,
  },

];

const scorePoints = 1;
const maxQuestoes = 10;
const maxRespostas = 4;

startGame = () =>{
  contadorPerguntas = 0;
  score = 0;
  perguntasDisponiveis = [...questoes];
  gerarNovaPergunta();
}
gerarNovaPergunta = () =>{
  if(perguntasDisponiveis.length === 0 || contadorPerguntas >= maxQuestoes){
    alert('Você acertou: '+score+' de '+maxQuestoes);
    resetarJogo();
  }else{
    contadorPerguntas++;
    questaoNumero.innerText = `Questão ${contadorPerguntas} de ${maxQuestoes}`;
    progressBar.style.width = `${(contadorPerguntas / maxQuestoes) * 100}%`;
    progressBarText.innerText = `${(contadorPerguntas / maxQuestoes) * 100}%`;

    const indiceQuestao = Math.floor(Math.random() * perguntasDisponiveis.length);
    questaoAtual = perguntasDisponiveis[indiceQuestao];
    questao.innerText = questaoAtual.questao;

    respostas.forEach((escolha) =>{
      const numero = escolha.dataset["number"];
      escolha.innerText = questaoAtual["escolha" + numero];
    });

    perguntasDisponiveis.splice(indiceQuestao, 1);
    aceitarResposta = true;
  }
};
respostas.forEach((escolha) =>{
  escolha.addEventListener('click', (e)=>{
    if(!aceitarResposta) return;
    aceitarResposta = false;
    const escolhaSelecionada = e.target;
    const respostaSelecionada = escolhaSelecionada.dataset['number'];

    let aplicarClasse = respostaSelecionada == questaoAtual.resposta ? "bg-success" : "bg-danger";
    if(aplicarClasse === "bg-success"){
      incrementScore(scorePoints);
    }
    escolhaSelecionada.parentElement.classList.add(aplicarClasse);
    setTimeout(() => {
      escolhaSelecionada.parentElement.classList.remove(aplicarClasse);
      gerarNovaPergunta();
    }, 1000);
  });
});
incrementScore = (num) =>{
  score += num;
  pontuacaoNumero.innerText = score;

};
resetarJogo = () =>{
  num = 0;
  questaoAtual = {};
  aceitarResposta = true;
  score = 0;
  contadorPerguntas = 0;
  perguntasDisponiveis = [];
  pontuacaoNumero.innerText = score;
  startGame();
};

startGame();