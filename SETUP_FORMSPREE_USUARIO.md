# Setup Formspree - Guia Passo a Passo para reimentutors@gmail.com

## 📋 Informações do Usuário

- **Email para receber contatos:** reimentutors@gmail.com
- **Site:** Help Desk Guide
- **Página de contato:** /contato

---

## ✅ PASSO 1: Criar Conta no Formspree

1. Acesse: https://formspree.io
2. Clique em **"Sign Up"** (Inscrever-se)
3. Escolha uma opção:
   - **Email + Senha:** Preencha email e senha
   - **Google Sign In:** Use sua conta Google
   - **GitHub Sign In:** Use sua conta GitHub

4. Confirme seu email (você receberá um email de confirmação)

---

## ✅ PASSO 2: Criar um Novo Formulário

1. Após fazer login, clique em **"New Form"**
2. Preencha:
   - **Form Name:** Help Desk Guide Contact
   - **Email:** reimentutors@gmail.com
3. Clique em **"Create"**

---

## ✅ PASSO 3: Copiar o ID do Formulário

1. Você verá uma página com informações do formulário
2. Procure por **"Form ID"** ou **"Endpoint"**
3. O ID terá este formato: `f/abc123xyz` ou `f/xxxxxxxx`
4. **Copie este ID completo**

**Exemplo:**
```
Form ID: f/a1b2c3d4e5f6g7h8
```

---

## ✅ PASSO 4: Adicionar o ID ao Site

### Arquivo a Modificar:
`/home/ubuntu/helpdesk_guide/client/src/components/ContactFormFormspree.tsx`

### O que Procurar:
```typescript
const FORMSPREE_ID = 'f/COLOQUE_SEU_ID_AQUI';
```

### O que Substituir:
Se seu ID é `f/a1b2c3d4e5f6g7h8`, substitua por:
```typescript
const FORMSPREE_ID = 'f/a1b2c3d4e5f6g7h8';
```

---

## ✅ PASSO 5: Usar o Componente no Site

### Arquivo a Modificar:
`/home/ubuntu/helpdesk_guide/client/src/pages/Contact.tsx`

### Procure por:
```typescript
import ContactForm from '@/components/ContactForm';
```

### Substitua por:
```typescript
import ContactFormFormspree from '@/components/ContactFormFormspree';
```

### Depois Procure por:
```typescript
<ContactForm />
```

### Substitua por:
```typescript
<ContactFormFormspree />
```

---

## ✅ PASSO 6: Fazer Build e Deploy

Execute no terminal:

```bash
cd /home/ubuntu/helpdesk_guide
pnpm build
```

Depois faça um checkpoint para salvar as mudanças.

---

## ✅ PASSO 7: Testar o Formulário

1. Acesse seu site em `/contato`
2. Preencha o formulário com:
   - Nome: Seu nome
   - Email: Qualquer email
   - Mensagem: Teste
3. Clique em **"Enviar Mensagem"**
4. Você deve receber um email em **reimentutors@gmail.com** em poucos segundos

---

## 📧 O Que Você Receberá

Quando alguém enviar uma mensagem, você receberá um email assim:

```
De: noreply@formspree.io
Para: reimentutors@gmail.com
Assunto: New submission from Help Desk Guide Contact

Nome: João Silva
Email: joao@example.com
Mensagem: Olá, tenho dúvidas sobre Help Desk...
```

---

## 🔧 Configurações Adicionais no Formspree (Opcional)

### Resposta Automática

1. No painel do Formspree, vá para seu formulário
2. Clique em **"Settings"**
3. Ative **"Autoresponder"**
4. Escreva uma mensagem de resposta automática
5. Exemplo:
   ```
   Obrigado por entrar em contato! 
   Recebemos sua mensagem e responderemos em breve.
   ```

### Integração com Slack (Opcional)

1. Vá para **"Integrations"**
2. Clique em **"Slack"**
3. Autorize o Formspree
4. Escolha o canal
5. Agora você receberá notificações no Slack também!

---

## ❓ Dúvidas Frequentes

**P: Quanto custa?**
R: Formspree é gratuito para até 50 submissões/mês. Planos pagos começam em $25/mês.

**P: Meu email será visível para os usuários?**
R: Não! Seu email fica privado no Formspree. Usuários só veem o formulário.

**P: Posso mudar o email depois?**
R: Sim! Vá para Settings do formulário e altere o email.

**P: E se não receber o email?**
R: Verifique a pasta de Spam/Lixo. Adicione noreply@formspree.io aos contatos.

---

## 🚀 Próximos Passos

1. ✅ Criar conta no Formspree
2. ✅ Criar formulário
3. ✅ Copiar ID
4. ✅ Adicionar ao site
5. ✅ Fazer build
6. ✅ Testar
7. ⏭️ Compartilhar o site com pessoas
8. ⏭️ Monitorar emails recebidos

---

**Sucesso! Seu formulário de contato agora está funcionando! 🎉**
