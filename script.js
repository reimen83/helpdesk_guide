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
// SIDEBAR
// ============================================

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('visible');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
});

// Fechar sidebar ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
  });
});

// ============================================
// BREADCRUMB
// ============================================

const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
const sectionTitles = {
  'intro': 'Introdução',
  'atendimento': 'Gestão de Atendimento',
  'hardware': 'Hardware e Periféricos',
  'servidores': 'Servidores e Redes',
  'sistemas-senior': 'Sistemas Senior',
  'backup': 'Backup e Projetos',
  'conclusao': 'Conclusão',
  'recursos': 'Recursos Gratuitos',
  'quiz': 'Quiz Interativo',
  'blog': 'Blog',
  'contato': 'Contato'
};

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const section = link.getAttribute('data-section');
    if (section && sectionTitles[section]) {
      breadcrumbCurrent.textContent = sectionTitles[section];
    }
  });
});

// ============================================
// PROGRESSO
// ============================================

const progressFill = document.getElementById('progressFill');
const progressPercentage = document.getElementById('progressPercentage');
const progressText = document.getElementById('progressText');

function updateProgress() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  const total = Object.keys(sectionTitles).length - 4; // Excluir recursos, quiz, blog, contato
  const percentage = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  
  progressFill.style.width = percentage + '%';
  progressPercentage.textContent = percentage + '%';
  
  if (percentage === 0) {
    progressText.textContent = 'Comece a estudar para acompanhar seu progresso!';
  } else if (percentage < 50) {
    progressText.textContent = 'Ótimo começo! Continue estudando.';
  } else if (percentage < 100) {
    progressText.textContent = 'Você está quase lá! Termine as últimas seções.';
  } else {
    progressText.textContent = '🎉 Parabéns! Você completou todo o guia!';
  }
}

function markSectionComplete(sectionId) {
  let completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  if (!completed.includes(sectionId)) {
    completed.push(sectionId);
    localStorage.setItem('completedSections', JSON.stringify(completed));
    updateProgress();
    alert('✓ Seção marcada como concluída!');
  }
}

updateProgress();

// ============================================
// FAQ
// ============================================

function toggleFAQ(button) {
  const item = button.parentElement;
  item.classList.toggle('open');
}

// ============================================
// BUSCA
// ============================================

const searchInput = document.getElementById('searchInput');
const searchModal = document.getElementById('searchModal');
const searchModalInput = document.getElementById('searchModalInput');
const searchResults = document.getElementById('searchResults');

const searchableContent = [
  { title: 'Introdução', section: 'intro', text: 'Fundamentos de Help Desk' },
  { title: 'Gestão de Atendimento', section: 'atendimento', text: 'Ciclo de vida de um chamado' },
  { title: 'Hardware e Periféricos', section: 'hardware', text: 'Componentes e troubleshooting' },
  { title: 'Servidores e Redes', section: 'servidores', text: 'Infraestrutura e conceitos' },
  { title: 'Sistemas Senior', section: 'sistemas-senior', text: 'ERP e módulos principais' },
  { title: 'Backup e Projetos', section: 'backup', text: 'Estratégias e ferramentas' },
  { title: 'Conclusão', section: 'conclusao', text: 'Próximos passos' },
  { title: 'Recursos Gratuitos', section: 'recursos', text: 'Ferramentas e plataformas' },
  { title: 'Quiz Interativo', section: 'quiz', text: 'Teste seus conhecimentos' },
  { title: 'Blog', section: 'blog', text: 'Artigos e dicas' },
  { title: 'Contato', section: 'contato', text: 'Entre em contato' },
  { title: 'ITIL', section: 'atendimento', text: 'Conceitos ITIL essenciais' },
  { title: 'SLA', section: 'atendimento', text: 'Service Level Agreement' },
  { title: 'Troubleshooting', section: 'hardware', text: 'Metodologia de diagnóstico' },
  { title: 'Certificações', section: 'recursos', text: 'CompTIA A+, ITIL, Microsoft' }
];

function performSearch(query) {
  if (!query.trim()) {
    searchResults.innerHTML = '';
    return;
  }
  
  const results = searchableContent.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.text.toLowerCase().includes(query.toLowerCase())
  );
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-text">Nenhum resultado encontrado</div></div>';
    return;
  }
  
  searchResults.innerHTML = results.map(result => `
    <div class="search-result-item" onclick="navigateToSection('${result.section}')">
      <div class="search-result-title">${result.title}</div>
      <div class="search-result-text">${result.text}</div>
    </div>
  `).join('');
}

function navigateToSection(section) {
  closeSearchModal();
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    breadcrumbCurrent.textContent = sectionTitles[section] || section;
  }
}

function openSearchModal() {
  searchModal.classList.add('open');
  searchModalInput.focus();
}

function closeSearchModal() {
  searchModal.classList.remove('open');
  searchResults.innerHTML = '';
  searchModalInput.value = '';
}

// Atalho Ctrl+K para abrir busca
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
  
  if (e.key === 'Escape') {
    closeSearchModal();
  }
});

searchInput.addEventListener('click', openSearchModal);
searchModalInput.addEventListener('input', (e) => performSearch(e.target.value));
document.getElementById('searchModal').addEventListener('click', (e) => {
  if (e.target === searchModal) closeSearchModal();
});

// ============================================
// FORMULÁRIOS
// ============================================

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Enviar para Formspree
  fetch('https://formspree.io/f/2917895017215295327', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message
    })
  })
  .then(response => {
    if (response.ok) {
      alert('✓ Mensagem enviada com sucesso!');
      form.reset();
    } else {
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao enviar mensagem. Tente novamente.');
  });
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('.newsletter-input').value;
  
  // Aqui você pode integrar com Mailchimp ou outro serviço
  alert('✓ Inscrição realizada com sucesso! Verifique seu email.');
  event.target.reset();
}

// ============================================
// QUIZ
// ============================================

const quizQuestions = [
  {
    question: 'O que significa ITIL?',
    options: [
      'Information Technology Infrastructure Library',
      'Internet Technology Integration List',
      'IT Infrastructure and Learning',
      'Information Tech Integration Level'
    ],
    correct: 0
  },
  {
    question: 'Qual é o objetivo principal do Help Desk?',
    options: [
      'Vender produtos',
      'Fornecer suporte técnico aos usuários',
      'Gerenciar banco de dados',
      'Desenvolver software'
    ],
    correct: 1
  },
  {
    question: 'O que é SLA?',
    options: [
      'Service Level Agreement - Acordo de nível de serviço',
      'Software License Agreement',
      'System Load Analysis',
      'Secure Layer Authentication'
    ],
    correct: 0
  },
  {
    question: 'Qual é a ordem correta do ciclo de vida de um chamado?',
    options: [
      'Abertura → Triagem → Atendimento → Resolução → Encerramento',
      'Triagem → Abertura → Atendimento → Encerramento → Resolução',
      'Atendimento → Abertura → Triagem → Resolução → Encerramento',
      'Encerramento → Resolução → Atendimento → Triagem → Abertura'
    ],
    correct: 0
  },
  {
    question: 'Qual componente é responsável pelo processamento de dados?',
    options: [
      'RAM',
      'Processador (CPU)',
      'Disco Rígido',
      'Placa Mãe'
    ],
    correct: 1
  },
  {
    question: 'O que é DNS?',
    options: [
      'Data Network System',
      'Domain Name System - Converte nomes em endereços IP',
      'Direct Network Service',
      'Dynamic Network Setup'
    ],
    correct: 1
  },
  {
    question: 'Qual é a regra 3-2-1 de backup?',
    options: [
      '3 cópias, 2 mídias diferentes, 1 fora do site',
      '3 mídias, 2 cópias, 1 backup',
      '3 backups, 2 servidores, 1 nuvem',
      '3 dias, 2 semanas, 1 mês'
    ],
    correct: 0
  },
  {
    question: 'Qual é o tipo de backup que copia apenas dados modificados desde o último backup?',
    options: [
      'Full Backup',
      'Incremental Backup',
      'Diferencial Backup',
      'Snapshot Backup'
    ],
    correct: 1
  },
  {
    question: 'O que significa escalação em Help Desk?',
    options: [
      'Aumentar o preço do serviço',
      'Encaminhar um chamado para um nível superior',
      'Resolver rapidamente um problema',
      'Documentar a solução'
    ],
    correct: 1
  },
  {
    question: 'Qual certificação é mais recomendada para iniciantes em Help Desk?',
    options: [
      'ITIL Expert',
      'CompTIA A+',
      'AWS Certified',
      'Kubernetes Administrator'
    ],
    correct: 1
  }
];

let currentQuizQuestion = 0;
let quizScore = 0;

function startQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  document.getElementById('quizContainer').style.display = 'block';
  showQuizQuestion();
}

function showQuizQuestion() {
  const question = quizQuestions[currentQuizQuestion];
  const progress = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
  
  document.getElementById('quizProgress').textContent = `Questão ${currentQuizQuestion + 1} de ${quizQuestions.length}`;
  document.getElementById('quizProgressFill').style.width = progress + '%';
  
  const html = `
    <div class="quiz-question">
      <h3>${question.question}</h3>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button class="quiz-option" onclick="answerQuestion(${index})">
            ${String.fromCharCode(65 + index)}) ${option}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  document.getElementById('quizContent').innerHTML = html;
}

function answerQuestion(index) {
  const question = quizQuestions[currentQuizQuestion];
  if (index === question.correct) {
    quizScore++;
  }
  
  currentQuizQuestion++;
  
  if (currentQuizQuestion < quizQuestions.length) {
    showQuizQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const percentage = Math.round((quizScore / quizQuestions.length) * 100);
  const html = `
    <div class="quiz-results">
      <h3>Resultado do Quiz</h3>
      <div class="quiz-score">
        <div class="score-number">${quizScore}/${quizQuestions.length}</div>
        <div class="score-percentage">${percentage}%</div>
      </div>
      <p class="score-message">
        ${percentage >= 80 ? '🎉 Excelente! Você tem ótimo conhecimento!' :
          percentage >= 60 ? '👍 Bom resultado! Continue estudando.' :
          percentage >= 40 ? '📚 Você precisa estudar mais.' :
          '💪 Continue praticando!'}
      </p>
      <button class="btn btn-primary" onclick="location.reload()">Fazer Quiz Novamente</button>
    </div>
  `;
  
  document.getElementById('quizContent').innerHTML = html;
}

// Estilos para quiz
const quizStyles = `
  .quiz-question h3 {
    margin-bottom: 1.5rem;
    color: var(--primary);
  }
  
  .quiz-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .quiz-option {
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    background-color: var(--background);
    color: var(--foreground);
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .quiz-option:hover {
    border-color: var(--primary);
    background-color: var(--card-bg);
  }
  
  .quiz-results {
    text-align: center;
  }
  
  .quiz-score {
    margin: 2rem 0;
  }
  
  .score-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  .score-percentage {
    font-size: 1.5rem;
    color: var(--muted);
  }
  
  .score-message {
    font-size: 1.125rem;
    margin: 1.5rem 0;
    color: var(--foreground);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = quizStyles;
document.head.appendChild(styleSheet);

// ============================================
// DOWNLOAD PDF
// ============================================

function downloadPDF(type) {
  alert('✓ Download iniciado! Você receberá o arquivo em breve.\n\nNota: Esta é uma versão de demonstração. Para acessar os PDFs completos, entre em contato conosco.');
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Atualizar breadcrumb inicial
  breadcrumbCurrent.textContent = 'Introdução';
  
  // Scroll suave para seções
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#home') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// ============================================
// ANALYTICS (Opcional)
// ============================================

function trackEvent(eventName, eventData = {}) {
  // Implementar com Google Analytics ou similar
  console.log('Event:', eventName, eventData);
}

// Rastrear seções visualizadas
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      if (sectionId) {
        trackEvent('section_viewed', { section: sectionId });
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.content-section').forEach(section => {
  observer.observe(section);
});
