function toggleTheme() {
  document.body.classList.toggle("light-mode");
}


// Terminal interativo com easter egg de senha secreta
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
const hackerToast = document.getElementById("hackerToast");

const terminalCommands = {
  help: 'comandos: help, whoami, scan, clear, sudo unlock',
  whoami: "convidado@cybersec - acesso nivel visitante",
  scan: "escaneando rede... 3 vulnerabilidades encontradas em sistemas desatualizados",
};

function printTerminalLine(text) {
  const line = document.createElement("p");
  line.textContent = "> " + text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function showHackerToast() {
  hackerToast.classList.add("show");
  setTimeout(() => hackerToast.classList.remove("show"), 3500);
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const value = terminalInput.value.trim();
    if (!value) return;

    printTerminalLine(">> " + value);
    const command = value.toLowerCase();

    if (command === "clear") {
      terminalOutput.innerHTML = "";
    } else if (command === "sudo unlock") {
      printTerminalLine("senha secreta aceita. modo hacker ativado.");
      showHackerToast();
    } else if (terminalCommands[command]) {
      printTerminalLine(terminalCommands[command]);
    } else {
      printTerminalLine('comando nao encontrado. digite "help"');
    }

    terminalInput.value = "";
  });
}


// Animação ao scroll: revela cards e itens da timeline conforme aparecem na tela
const revealTargets = document.querySelectorAll(".timeline-item, .custom-card, .course-card, .stat");
revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));


// Quiz interativo sobre segurança da informação
const quizQuestions = [
  {
    question: 'O que significa a sigla "VPN"?',
    options: [
      "Virtual Private Network",
      "Verified Public Node",
      "Virus Protection Network",
      "Visual Programming Network",
    ],
    correct: 0,
  },
  {
    question: "Qual ataque envolve enganar o usuário para que revele informações sigilosas?",
    options: ["DDoS", "Phishing", "Brute Force", "SQL Injection"],
    correct: 1,
  },
  {
    question: 'O que é um "Firewall"?',
    options: [
      "Um vírus de computador",
      "Um tipo de criptografia",
      "Um sistema de defesa que filtra o tráfego de rede",
      "Um software de edição de imagens",
    ],
    correct: 2,
  },
  {
    question: 'O que caracteriza um ataque de "Força Bruta"?',
    options: [
      "Explorar falhas em bancos de dados",
      "Inundar um servidor com requisições",
      "Espionar redes sem fio",
      "Tentar adivinhar senhas testando várias combinações",
    ],
    correct: 3,
  },
  {
    question: "Qual das opções é uma boa prática de segurança?",
    options: [
      "Usar a mesma senha em todos os sites",
      "Compartilhar credenciais por e-mail",
      "Ativar autenticação em dois fatores (2FA)",
      "Desativar atualizações automáticas",
    ],
    correct: 2,
  },
];

const quizQuestionBox = document.getElementById("quizQuestion");
const quizQuestionText = document.getElementById("quizQuestionText");
const quizOptions = document.getElementById("quizOptions");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");
const quizResultTitle = document.getElementById("quizResultTitle");
const quizResultText = document.getElementById("quizResultText");
const quizRestartBtn = document.getElementById("quizRestartBtn");

let quizIndex = 0;
let quizScore = 0;

function loadQuizQuestion() {
  const current = quizQuestions[quizIndex];
  quizProgress.textContent = "Pergunta " + (quizIndex + 1) + " de " + quizQuestions.length;
  quizQuestionText.textContent = current.question;
  quizOptions.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => selectQuizAnswer(index, button));
    quizOptions.appendChild(button);
  });
}

function selectQuizAnswer(selectedIndex, button) {
  const current = quizQuestions[quizIndex];
  const buttons = quizOptions.querySelectorAll(".quiz-option");
  buttons.forEach((b) => (b.disabled = true));

  if (selectedIndex === current.correct) {
    button.classList.add("correct");
    quizScore++;
  } else {
    button.classList.add("wrong");
    buttons[current.correct].classList.add("correct");
  }

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizQuestions.length) {
      loadQuizQuestion();
    } else {
      showQuizResult();
    }
  }, 900);
}

function showQuizResult() {
  quizQuestionBox.classList.add("d-none");
  quizResult.classList.remove("d-none");

  const total = quizQuestions.length;
  quizResultTitle.textContent = "Você acertou " + quizScore + " de " + total;

  if (quizScore === total) {
    quizResultText.textContent = "Excelente! Você já manda bem em segurança da informação.";
  } else if (quizScore >= total / 2) {
    quizResultText.textContent = "Bom trabalho! Você tem uma boa base, mas ainda há o que aprender.";
  } else {
    quizResultText.textContent = "Vale a pena revisar os conceitos básicos - confira os cursos gratuitos abaixo.";
  }
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizResult.classList.add("d-none");
  quizQuestionBox.classList.remove("d-none");
  loadQuizQuestion();
}

if (quizQuestionBox) {
  quizRestartBtn.addEventListener("click", restartQuiz);
  loadQuizQuestion();
}
