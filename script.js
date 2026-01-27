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
  const form = event.target;
  const email = form.querySelector('.newsletter-input').value;
  
  if (!email) {
    alert('Por favor, insira um email válido.');
    return;
  }
  
  fetch('https://formspree.io/f/xyzjpwqk', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
      _subject: 'Nova inscrição na Newsletter - Help Desk Guide'
    })
  })
  .then(response => {
    if (response.ok) {
      alert('✅ Obrigado! Você foi inscrito com sucesso. Verifique seu email.');
      form.reset();
    } else {
      alert('❌ Erro ao inscrever. Tente novamente.');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('❌ Erro ao enviar. Verifique sua conexão.');
  });
}

// ============================================
// CONTATO
// ============================================

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  if (!name || !email || !subject || !message) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  fetch('https://formspree.io/f/xyzjpwqk', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      name: name,
      email: email,
      subject: subject,
      message: message,
      _subject: 'Novo contato - ' + subject
    })
  })
  .then(response => {
    if (response.ok) {
      alert('✅ Obrigado ' + name + '! Sua mensagem foi enviada. Entraremos em contato em breve.');
      form.reset();
    } else {
      alert('❌ Erro ao enviar. Tente novamente.');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('❌ Erro ao enviar. Verifique sua conexão.');
  });
}

// ============================================
// BLOG - LER ARTIGOS
// ============================================

const blogArticles = {
  'dicas-atendimento': {
    title: '10 Dicas para Melhorar seu Atendimento no Help Desk',
    date: '24 de Janeiro de 2026',
    content: `<h2>10 Dicas para Melhorar seu Atendimento no Help Desk</h2>
      <p><strong>Publicado em:</strong> 24 de Janeiro de 2026</p>
      <p>O atendimento de qualidade é a base de um Help Desk eficiente. Aqui estão 10 dicas práticas para melhorar significativamente a sua performance:</p>
      <h3>1. Ouça Atentamente</h3>
      <p>Não interrompa o cliente. Deixe-o explicar completamente o problema antes de oferecer soluções.</p>
      <h3>2. Seja Empatético</h3>
      <p>Entenda a frustração do cliente. Mostre que você se importa e está ali para ajudar.</p>
      <h3>3. Comunique-se Claramente</h3>
      <p>Use linguagem simples e evite jargão técnico desnecessário.</p>
      <h3>4. Seja Proativo</h3>
      <p>Antecipe problemas e ofereça soluções antes que o cliente as solicite.</p>
      <h3>5. Documente Tudo</h3>
      <p>Mantenha registros detalhados de todos os chamados para referência futura.</p>
      <h3>6. Siga Procedimentos</h3>
      <p>Respeite os processos estabelecidos para garantir consistência.</p>
      <h3>7. Aprenda Continuamente</h3>
      <p>Invista em treinamento e desenvolvimento profissional.</p>
      <h3>8. Gerencie Seu Tempo</h3>
      <p>Priorize chamados e gerencie prazos eficientemente.</p>
      <h3>9. Mantenha a Calma</h3>
      <p>Sob pressão, manter a compostura é essencial.</p>
      <h3>10. Busque Feedback</h3>
      <p>Sempre pergunte aos clientes como foi sua experiência e melhore continuamente.</p>`
  },
  'comandos-windows': {
    title: 'Guia Completo: Comandos Windows Essenciais',
    date: '20 de Janeiro de 2026',
    content: `<h2>Guia Completo: Comandos Windows Essenciais</h2>
      <p><strong>Publicado em:</strong> 20 de Janeiro de 2026</p>
      <p>Domine os comandos mais importantes do Windows para troubleshooting e administração de sistemas.</p>
      <h3>Comandos de Sistema</h3>
      <p><code>ipconfig</code> - Exibe configuração de rede</p>
      <p><code>systeminfo</code> - Informações do sistema</p>
      <p><code>tasklist</code> - Lista de processos em execução</p>
      <p><code>taskkill</code> - Encerra um processo</p>
      <h3>Comandos de Rede</h3>
      <p><code>ping</code> - Testa conectividade</p>
      <p><code>tracert</code> - Rastreia rota de pacotes</p>
      <p><code>netstat</code> - Exibe conexões de rede</p>
      <p><code>nslookup</code> - Consulta DNS</p>
      <h3>Comandos de Disco</h3>
      <p><code>chkdsk</code> - Verifica integridade do disco</p>
      <p><code>defrag</code> - Desfragmenta disco</p>
      <p><code>diskpart</code> - Gerencia partições</p>`
  },
  'linux-helpdesk': {
    title: 'Linux para Help Desk: Primeiros Passos',
    date: '15 de Janeiro de 2026',
    content: `<h2>Linux para Help Desk: Primeiros Passos</h2>
      <p><strong>Publicado em:</strong> 15 de Janeiro de 2026</p>
      <p>Introdução ao Linux para profissionais de Help Desk.</p>
      <h3>O que é Linux?</h3>
      <p>Linux é um sistema operacional de código aberto baseado em Unix.</p>
      <h3>Distribuições Populares</h3>
      <p><strong>Ubuntu:</strong> Fácil de usar, ideal para iniciantes</p>
      <p><strong>CentOS:</strong> Estabilidade para servidores</p>
      <p><strong>Debian:</strong> Confiável e versátil</p>
      <h3>Comandos Básicos</h3>
      <p><code>ls</code> - Lista arquivos</p>
      <p><code>cd</code> - Muda de diretório</p>
      <p><code>pwd</code> - Mostra diretório atual</p>
      <p><code>mkdir</code> - Cria diretório</p>
      <p><code>sudo</code> - Executa como administrador</p>`
  },
  'comptia-a-plus': {
    title: 'Como Preparar-se para Certificação CompTIA A+',
    date: '10 de Janeiro de 2026',
    content: `<h2>Como Preparar-se para Certificação CompTIA A+</h2>
      <p><strong>Publicado em:</strong> 10 de Janeiro de 2026</p>
      <p>Estratégia completa para passar no exame CompTIA A+.</p>
      <h3>Sobre a Certificação</h3>
      <p>CompTIA A+ é a certificação mais procurada para profissionais de Help Desk.</p>
      <h3>Tempo de Preparação</h3>
      <p>Recomenda-se 2-3 meses de estudo intenso.</p>
      <h3>Tópicos Principais</h3>
      <p>- Hardware e componentes</p>
      <p>- Sistemas operacionais</p>
      <p>- Redes</p>
      <p>- Segurança</p>
      <p>- Troubleshooting</p>
      <h3>Recursos de Estudo</h3>
      <p>- Livros oficiais CompTIA</p>
      <p>- Cursos online (Udemy, Pluralsight)</p>
      <p>- Simulações de exame</p>`
  },
  'troubleshooting-rede': {
    title: 'Troubleshooting de Rede: Passo a Passo',
    date: '5 de Janeiro de 2026',
    content: `<h2>Troubleshooting de Rede: Passo a Passo</h2>
      <p><strong>Publicado em:</strong> 5 de Janeiro de 2026</p>
      <p>Metodologia sistemática para diagnosticar e resolver problemas de rede.</p>
      <h3>Passo 1: Entenda o Problema</h3>
      <p>Pergunte ao usuário: Quando começou? O que estava fazendo?</p>
      <h3>Passo 2: Teste a Conectividade</h3>
      <p>Use ping, ipconfig e tracert para diagnosticar.</p>
      <h3>Passo 3: Verifique o Hardware</h3>
      <p>Cabos, placas de rede, switches e roteadores.</p>
      <h3>Passo 4: Analise Logs</h3>
      <p>Verifique logs de rede e firewall.</p>
      <h3>Passo 5: Implemente a Solução</h3>
      <p>Teste e documente a resolução.</p>`
  },
  'tendencias-2026': {
    title: 'Tendências em Suporte Técnico para 2026',
    date: '1 de Janeiro de 2026',
    content: `<h2>Tendências em Suporte Técnico para 2026</h2>
      <p><strong>Publicado em:</strong> 1 de Janeiro de 2026</p>
      <p>Conheça as tendências que vão dominar o mercado de Help Desk em 2026.</p>
      <h3>1. Automação com IA</h3>
      <p>Chatbots e IA para resolver problemas simples automaticamente.</p>
      <h3>2. Cloud Computing</h3>
      <p>Mais empresas migrando para nuvem, exigindo novas habilidades.</p>
      <h3>3. Segurança Cibernética</h3>
      <p>Profissionais de Help Desk precisam entender segurança.</p>
      <h3>4. Trabalho Remoto</h3>
      <p>Suporte remoto se torna padrão.</p>
      <h3>5. Certificações em Demanda</h3>
      <p>CompTIA A+, Azure, AWS são altamente procuradas.</p>`
  }
};

function readBlogArticle(articleId) {
  const article = blogArticles[articleId];
  if (!article) {
    alert('Artigo não encontrado.');
    return;
  }
  
  // Criar modal
  const modal = document.createElement('div');
  modal.className = 'article-modal';
  modal.innerHTML = `
    <div class="article-modal-content">
      <button class="article-modal-close" onclick="this.closest('.article-modal').remove()">✕</button>
      <div class="article-body">
        ${article.content}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'flex';
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
