# Guia de Help Desk - Versão Estática

Este é um site **100% estático** (HTML/CSS/JavaScript puro) pronto para deploy no Vercel ou qualquer outro host estático.

## 📁 Estrutura de Arquivos

```
/
├── index.html          # Página principal (32KB)
├── styles.css          # Estilos globais (24KB)
├── script.js           # Interatividade (17KB)
├── vercel.json         # Configuração Vercel
├── .vercelignore       # Arquivos ignorados no deploy
└── client/             # (Opcional) Código React original
```

## 🚀 Deploy no Vercel

### Opção 1: Deploy via Git (Recomendado)

1. **Conectar repositório GitHub:**
   ```bash
   git push origin main
   ```

2. **No Vercel:**
   - Acesse https://vercel.com/new
   - Selecione seu repositório `reimen83/helpdesk-guide`
   - Vercel detectará automaticamente como projeto estático
   - Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
npm install -g vercel
vercel
```

### Opção 3: Arrastar e Soltar

1. Acesse https://vercel.com/new/import
2. Selecione "Other"
3. Arraste a pasta do projeto

## ⚙️ Configuração do Vercel

O arquivo `vercel.json` já está configurado com:
- **Build Command:** Nenhum (site estático)
- **Output Directory:** `/` (raiz)
- **Framework:** Nenhum (estático)

## 📋 Funcionalidades Implementadas

### ✅ Completamente Funcionais

- **Navegação Sticky:** Navbar fixa no topo
- **Sidebar Responsivo:** Menu drawer em mobile
- **Breadcrumb Navigation:** Trilha de navegação
- **Dark Mode:** Toggle tema escuro/claro com localStorage
- **Busca Global:** Ctrl+K para abrir modal de busca
- **FAQ Interativa:** Accordion com toggle
- **Quiz Interativo:** 10 questões com pontuação
- **Progresso:** Rastreamento de seções concluídas
- **Formulário de Contato:** Integrado com Formspree
- **Newsletter:** Integração para email
- **Responsivo:** Mobile-first design

### 📦 Sem Dependências Externas

- ✅ Sem React
- ✅ Sem Vite
- ✅ Sem npm/pnpm
- ✅ Sem build process
- ✅ Sem servidor backend

## 🌐 Domínio Personalizado

### Configurar `helpdeskguide.com.br` no Vercel

1. **No Vercel Dashboard:**
   - Vá para Settings → Domains
   - Adicione `helpdeskguide.com.br`
   - Copie os registros DNS

2. **Na Hostinger (onde o domínio está registrado):**
   - Acesse o painel de controle
   - Vá para DNS
   - Adicione os registros fornecidos pelo Vercel
   - Aguarde propagação (até 48h)

## 📊 Analytics

Para adicionar analytics:

### Google Analytics
```html
<!-- Adicione ao final do <head> em index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Vercel Analytics
Ative automaticamente no dashboard Vercel.

## 🔒 SEO e Segurança

### ✅ Implementado

- Meta tags completas
- Schema.json estruturado
- robots.txt (em `/public/`)
- sitemap.xml (em `/public/`)
- Open Graph tags
- Twitter Card tags

### 📝 Próximos Passos

1. **Google Search Console:**
   - Acesse https://search.google.com/search-console
   - Adicione seu domínio
   - Envie o sitemap.xml

2. **Bing Webmaster Tools:**
   - https://www.bing.com/webmasters
   - Adicione o site

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
  --primary: #0066cc;        /* Azul principal */
  --secondary: #00a86b;      /* Verde secundário */
  --success: #22c55e;        /* Verde sucesso */
  /* ... outras cores */
}
```

### Adicionar Conteúdo

Edite as seções em `index.html` diretamente.

### Modificar Funcionalidades

Edite `script.js` para adicionar/modificar interatividade.

## 📱 Responsividade

O site é totalmente responsivo:
- **Desktop:** Layout completo com sidebar
- **Tablet:** Sidebar colapsável
- **Mobile:** Menu drawer com overlay

## ⚡ Performance

- **Tamanho Total:** ~73KB (HTML + CSS + JS)
- **Sem dependências:** Carregamento instantâneo
- **Sem build process:** Deploy em segundos
- **Caching:** Vercel CDN automático

## 🐛 Troubleshooting

### Formulário de contato não funciona
- Verifique se o Formspree ID está correto em `script.js`
- Teste em http://localhost:8000

### Dark mode não persiste
- Verifique se localStorage está habilitado
- Limpe cache do navegador

### Busca não encontra resultados
- Adicione novos itens ao array `searchableContent` em `script.js`

## 📞 Contato

- **Email:** reimentutors@gmail.com
- **LinkedIn:** https://linkedin.com/in/reinaldohneto
- **GitHub:** https://github.com/reimen83

## 📄 Licença

Este projeto é de código aberto e disponível para uso educacional.

---

**Última atualização:** 25 de Janeiro de 2026
**Versão:** 1.0.0 (Estática)
