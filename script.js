// ============================================
// SISTEMA DE ABAS
// ============================================

function switchTab(tabName) {
  // Remover classe ativa de todos os tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.drawer-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Adicionar classe ativa ao tab clicado
  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
  document.getElementById(`${tabName}-tab`)?.classList.add('active');
  
  // Fechar drawer se aberto
  closeDrawer();
  
  // Scroll para o topo
  window.scrollTo(0, 0);
  
  // Salvar tab ativo
  localStorage.setItem('activeTab', tabName);
}

// Restaurar tab ativo ao carregar página
window.addEventListener('load', () => {
  const activeTab = localStorage.getItem('activeTab') || 'home';
  switchTab(activeTab);
});

// Event listeners para tabs desktop
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.getAttribute('data-tab'));
  });
});

// Event listeners para tabs mobile (drawer)
document.querySelectorAll('.drawer-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.getAttribute('data-tab'));
  });
});

// ============================================
// DRAWER MOBILE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('visible');
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('visible');
}

menuToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// ============================================
// TEMA ESCURO / CLARO
// ============================================

const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Verificar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  sunIcon.style.display = isDark ? 'none' : 'block';
  moonIcon.style.display = isDark ? 'block' : 'none';
});

// ============================================
// PROGRESSO
// ============================================

const progressFill = document.getElementById('progressFill');
const progressPercentage = document.getElementById('progressPercentage');
const progressText = document.getElementById('progressText');

function updateProgress() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  const total = 7; // 7 seções de conteúdo
  const percentage = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  
  progressFill.style.width = percentage + '%';
  progressPercentage.textContent = percentage + '%';
  
  if (percentage === 0) {
    progressText.textContent = 'Comece a estudar para acompanhar seu progresso!';
  } else if (percentage === 100) {
    progressText.textContent = '🎉 Parabéns! Você completou todo o conteúdo!';
  } else {
    progressText.textContent = `Você completou ${completed.length} de ${total} seções`;
  }
}

function markSectionComplete(sectionId) {
  let completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  
  if (!completed.includes(sectionId)) {
    completed.push(sectionId);
    localStorage.setItem('completedSections', JSON.stringify(completed));
    updateProgress();
    
    // Feedback visual
    const btn = event.target;
    btn.textContent = '✓ Concluído';
    btn.style.opacity = '0.6';
    btn.disabled = true;
  }
}

// Atualizar progresso ao carregar
updateProgress();

// ============================================
// FAQ
// ============================================

function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const icon = element.querySelector('.faq-icon');
  
  faqItem.classList.toggle('open');
  
  if (faqItem.classList.contains('open')) {
    icon.textContent = '−';
    answer.style.maxHeight = answer.scrollHeight + 'px';
  } else {
    icon.textContent = '+';
    answer.style.maxHeight = '0';
  }
}

// ============================================
// QUIZ
// ============================================

const quizData = [
  {
    question: 'O que significa ITIL?',
    options: [
      'Information Technology Infrastructure Library',
      'Information Technology Integration Level',
      'Internet Technology Infrastructure List',
      'Information Technology Internet Link'
    ],
    correct: 0
  },
  {
    question: 'Qual é o primeiro passo no ciclo de vida de um chamado?',
    options: ['Resolução', 'Abertura', 'Encerramento', 'Triagem'],
    correct: 1
  },
  {
    question: 'O que é SLA?',
    options: [
      'Service Level Agreement',
      'System Load Analysis',
      'Software License Agreement',
      'Service Link Adapter'
    ],
    correct: 0
  },
  {
    question: 'Qual tipo de memória é volátil?',
    options: ['ROM', 'RAM', 'SSD', 'HD'],
    correct: 1
  },
  {
    question: 'O que faz um Firewall?',
    options: [
      'Aumenta a velocidade da internet',
      'Controla o tráfego de rede',
      'Cria backups automáticos',
      'Limpa arquivos temporários'
    ],
    correct: 1
  },
  {
    question: 'Qual é a regra 3-2-1 de backup?',
    options: [
      '3 cópias, 2 mídias diferentes, 1 fora do site',
      '3 servidores, 2 datacenters, 1 nuvem',
      '3 dias, 2 semanas, 1 mês',
      '3 GB, 2 TB, 1 PB'
    ],
    correct: 0
  },
  {
    question: 'O que significa DNS?',
    options: [
      'Domain Name System',
      'Digital Network Service',
      'Data Network Security',
      'Domain Network Setup'
    ],
    correct: 0
  },
  {
    question: 'Qual é a melhor certificação para iniciantes em Help Desk?',
    options: [
      'ITIL Foundation',
      'CompTIA A+',
      'Microsoft Certified',
      'Linux Foundation'
    ],
    correct: 1
  },
  {
    question: 'O que é troubleshooting?',
    options: [
      'Documentação de problemas',
      'Metodologia sistemática para diagnóstico e resolução',
      'Criação de tickets',
      'Backup de dados'
    ],
    correct: 1
  },
  {
    question: 'Qual é o tempo médio de estudo para CompTIA A+?',
    options: [
      '1 mês',
      '6 meses',
      '2-3 meses',
      '1 ano'
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quizContainer').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  const quiz = quizData[currentQuestion];
  const container = document.getElementById('quizContent');
  
  const progress = Math.round(((currentQuestion + 1) / quizData.length) * 100);
  document.getElementById('quizProgress').textContent = `Questão ${currentQuestion + 1} de ${quizData.length}`;
  document.getElementById('quizProgressFill').style.width = progress + '%';
  
  let html = `
    <div class="quiz-question">
      <h3>${quiz.question}</h3>
      <div class="quiz-options">
  `;
  
  quiz.options.forEach((option, index) => {
    html += `
      <button class="quiz-option" onclick="answerQuestion(${index})">
        ${option}
      </button>
    `;
  });
  
  html += '</div></div>';
  container.innerHTML = html;
}

function answerQuestion(index) {
  const quiz = quizData[currentQuestion];
  
  if (index === quiz.correct) {
    score++;
  }
  
  currentQuestion++;
  
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const percentage = Math.round((score / quizData.length) * 100);
  const container = document.getElementById('quizContent');
  
  let message = '';
  if (percentage === 100) {
    message = '🎉 Perfeito! Você acertou todas!';
  } else if (percentage >= 80) {
    message = '👏 Excelente! Você tem bom conhecimento!';
  } else if (percentage >= 60) {
    message = '👍 Bom! Continue estudando!';
  } else {
    message = '📚 Estude mais e tente novamente!';
  }
  
  container.innerHTML = `
    <div class="quiz-result">
      <h2>${message}</h2>
      <p class="result-score">Você acertou ${score} de ${quizData.length} questões</p>
      <p class="result-percentage">${percentage}%</p>
      <button class="btn btn-primary" onclick="startQuiz()">Fazer Novamente</button>
    </div>
  `;
}

// ============================================
// DOWNLOAD PDF
// ============================================

function downloadPDF(type) {
  const files = {
    'mini-curso': 'mini_curso_helpdesk.md',
    'guia-rapido': 'guia_rapido_referencias.md'
  };
  
  if (files[type]) {
    window.open(files[type], '_blank');
  }
}

// ============================================
// NEWSLETTER
// ============================================

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('.newsletter-input').value;
  
  if (email) {
    alert(`Obrigado! Você foi inscrito com o email: ${email}`);
    event.target.reset();
  }
}

// ============================================
// CONTATO
// ============================================

function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Simular envio
  alert(`Obrigado ${name}! Sua mensagem foi recebida. Entraremos em contato em breve.`);
  event.target.reset();
}

// ============================================
// BUSCA
// ============================================

const searchInput = document.getElementById('searchInput');
const searchModal = document.getElementById('searchModal');
const searchModalInput = document.getElementById('searchModalInput');
const searchResults = document.getElementById('searchResults');

// Abrir modal com Ctrl+K ou Cmd+K
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchModal.classList.add('active');
    searchModalInput.focus();
  }
});

// Fechar modal com Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearchModal();
  }
});

function closeSearchModal() {
  searchModal.classList.remove('active');
  searchModalInput.value = '';
  searchResults.innerHTML = '';
}

// Buscar conteúdo
searchModalInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  
  if (query.length < 2) {
    searchResults.innerHTML = '';
    return;
  }
  
  const sections = [
    { title: 'Introdução', tab: 'conteudo', text: 'Fundamentos ITIL, atendimento ao cliente' },
    { title: 'Hardware', tab: 'conteudo', text: 'CPU, RAM, SSD, periféricos' },
    { title: 'Servidores', tab: 'conteudo', text: 'Tipos de servidores, redes, IP, DNS' },
    { title: 'Backup', tab: 'conteudo', text: 'Estratégias de backup, ferramentas' },
    { title: 'Quiz', tab: 'quiz', text: 'Teste seus conhecimentos' },
    { title: 'Blog', tab: 'blog', text: 'Artigos e dicas' },
    { title: 'Recursos', tab: 'recursos', text: 'Ferramentas e certificações' },
    { title: 'Contato', tab: 'contato', text: 'Entre em contato conosco' }
  ];
  
  const results = sections.filter(s => 
    s.title.toLowerCase().includes(query) || 
    s.text.toLowerCase().includes(query)
  );
  
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="search-no-results">Nenhum resultado encontrado</p>';
    return;
  }
  
  searchResults.innerHTML = results.map(result => `
    <div class="search-result" onclick="switchTab('${result.tab}'); closeSearchModal();">
      <h4>${result.title}</h4>
      <p>${result.text}</p>
    </div>
  `).join('');
});

// Fechar modal ao clicar fora
searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    closeSearchModal();
  }
});
