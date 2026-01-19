# Mini Curso: Help Desk e Suporte Técnico
## Preparação Profissional Completa

---

## Módulo 1: Fundamentos de Help Desk e ITIL 4

### O que é Help Desk?

O Help Desk, também conhecido como Service Desk, é a central de atendimento responsável por receber, registrar, acompanhar e resolver solicitações de suporte técnico dos usuários. Ele funciona como o primeiro ponto de contato entre os usuários e a equipe de TI, garantindo que os problemas sejam resolvidos de forma eficiente e organizada.

### Evolução do Help Desk

Antigamente, o suporte técnico era reativo e desorganizado. Um usuário ligava, explicava o problema e o técnico tentava resolver na hora. Não havia registro, priorização ou acompanhamento. Com o crescimento das empresas e da complexidade dos sistemas, surgiu a necessidade de estruturar esse processo. Assim nasceu o **Help Desk moderno**, baseado em metodologias como **ITIL** (Information Technology Infrastructure Library).

### O que é ITIL 4?

**ITIL 4** é a versão mais recente do framework de melhores práticas para gestão de serviços de TI. Diferente das versões anteriores, o ITIL 4 não é um manual engessado, mas um conjunto de princípios flexíveis que se adaptam à realidade de cada organização.

Os **7 Princípios do ITIL 4** são:

1. **Foco no Valor:** Tudo deve gerar valor para o negócio
2. **Começar Onde Você Está:** Não reinventar a roda, melhorar o que existe
3. **Progredir Iterativamente:** Pequenas melhorias contínuas
4. **Colaboração:** Trabalhar junto com todas as áreas
5. **Pensamento Holístico:** Ver o sistema como um todo
6. **Manter Simplicidade:** Evitar complexidade desnecessária
7. **Otimizar e Automatizar:** Usar tecnologia a favor

### Diferenças Fundamentais: Incidente, Requisição, Problema e Mudança

No Help Desk, você lidará com diferentes tipos de registros. Saber diferenciá-los é crucial para priorizar corretamente:

**Incidente:** É uma interrupção não planejada ou redução na qualidade de um serviço. Exemplos: o computador não liga, a internet caiu, o e-mail não funciona, a impressora não imprime. O foco do Help Desk é resolver o incidente o mais rápido possível para restaurar o serviço.

**Requisição de Serviço:** É uma solicitação do usuário para algo novo ou uma informação. Exemplos: pedido de instalação de um software, solicitação de novo mouse, pedido de acesso a um sistema, solicitação de aumento de espaço em disco. Requisições geralmente têm um prazo maior que incidentes.

**Problema:** É a causa raiz de um ou mais incidentes. Enquanto o incidente é o sintoma, o problema é a doença. Exemplo: vários usuários perdendo conexão à internet pode ser causado por um switch defeituoso. Identificar e resolver o problema evita que novos incidentes ocorram.

**Mudança:** É a adição, modificação ou remoção de algo que pode afetar os serviços de TI. Exemplos: atualização do sistema ERP, instalação de novo servidor, mudança de política de segurança. As mudanças devem ser planejadas e testadas antes de serem implementadas em produção.

### SLA (Service Level Agreement)

O **SLA** é um acordo formal entre a TI e os usuários (ou clientes) que define os níveis de serviço esperados. Ele estabelece prazos para resposta e resolução de problemas.

**Componentes principais do SLA:**

- **Tempo de Resposta:** Prazo máximo para o técnico dar o primeiro retorno ao usuário. Exemplo: 15 minutos para prioridade alta, 1 hora para prioridade média.
- **Tempo de Solução:** Prazo máximo para o problema ser resolvido definitivamente. Exemplo: 4 horas para prioridade alta, 1 dia útil para prioridade média.
- **Disponibilidade:** Percentual de tempo que o serviço deve estar disponível. Exemplo: 99.5% de uptime.

**Priorização de Chamados:**

A prioridade de um chamado é determinada por dois fatores:

1. **Impacto:** Quantas pessoas são afetadas? Um computador pessoal tem impacto baixo. Um servidor de arquivos parado tem impacto alto.
2. **Urgência:** O quanto o negócio para sem aquilo? Um diretor sem e-mail tem urgência alta. Um usuário sem acesso a um sistema secundário tem urgência baixa.

A combinação desses dois fatores define a prioridade:

| Impacto | Urgência | Prioridade | SLA Resposta | SLA Solução |
|---------|----------|-----------|--------------|-------------|
| Alto | Alta | Crítica | 15 min | 4 horas |
| Alto | Média | Alta | 30 min | 8 horas |
| Médio | Alta | Alta | 30 min | 8 horas |
| Médio | Média | Média | 1 hora | 1 dia |
| Baixo | Baixa | Baixa | 4 horas | 3 dias |

### Ciclo de Vida de um Chamado

Todo chamado passa por um ciclo de vida bem definido:

1. **Abertura:** O usuário relata o problema através de telefone, e-mail, chat ou portal de autoatendimento.
2. **Classificação:** O técnico categoriza o chamado (Hardware, Software, Rede, Acesso, etc.).
3. **Priorização:** Define-se a prioridade baseada em impacto e urgência.
4. **Atribuição:** O chamado é atribuído a um técnico ou grupo de técnicos.
5. **Diagnóstico:** O técnico investiga o problema, consultando a base de conhecimento.
6. **Resolução:** O problema é resolvido. Se não conseguir, o chamado é escalado.
7. **Verificação:** O usuário confirma se o problema foi realmente resolvido.
8. **Fechamento:** O chamado é fechado e documentado para futuras referências.

---

## Módulo 2: Hardware e Manutenção de Equipamentos

### Tipos de Manutenção

**Manutenção Preventiva:** Realizada antes de uma falha ocorrer, com o objetivo de evitar problemas. Inclui limpeza, verificação de saúde, troca de componentes desgastados, atualização de drivers e BIOS.

Benefícios: Reduz tempo de parada, prolonga vida útil dos equipamentos, melhora performance.

**Manutenção Corretiva:** Realizada após uma falha ocorrer, com o objetivo de restaurar o funcionamento. Inclui diagnóstico, substituição de componentes defeituosos, reparos.

Benefícios: Resolve problemas imediatos, restaura produtividade.

### Componentes Principais de um Computador

**Processador (CPU):** O "cérebro" do computador. Executa todas as instruções. Marcas comuns: Intel (Core i3, i5, i7, i9) e AMD (Ryzen).

**Memória RAM:** Memória de acesso rápido usada para executar programas. Quanto mais RAM, mais programas podem rodar simultaneamente. Capacidades comuns: 4GB, 8GB, 16GB, 32GB.

**Disco Rígido (HD) ou SSD:** Armazena dados permanentemente. SSDs são mais rápidos que HDs, mas mais caros. Capacidades comuns: 256GB, 512GB, 1TB, 2TB.

**Placa-mãe:** Conecta todos os componentes. Contém o BIOS/UEFI (firmware que inicia o computador).

**Fonte de Alimentação:** Distribui energia para todos os componentes. Deve ter potência suficiente.

**Cooler/Ventiladores:** Mantêm a temperatura dentro dos limites seguros.

### Diagnóstico de Problemas de Hardware

**Computador não liga:**
- Verificar se está conectado à energia
- Verificar se o botão de liga/desliga está funcionando
- Verificar se há luz indicadora de energia
- Se houver BIPs (sons), consultar código de erro

**Computador liga mas não carrega o SO:**
- Verificar se o disco rígido está sendo reconhecido no BIOS
- Tentar iniciar em modo seguro
- Usar ferramentas de diagnóstico como Windows Recovery ou Linux Live USB

**Computador lento:**
- Verificar uso de CPU e memória (Task Manager no Windows, top no Linux)
- Verificar espaço em disco disponível
- Verificar se há malware (usar antivírus)
- Verificar saúde do disco (CHKDSK no Windows, fsck no Linux)

**Tela azul (BSOD - Blue Screen of Death):**
- Anotar o código de erro
- Pesquisar o código de erro para identificar a causa
- Geralmente relacionado a drivers incompatíveis ou hardware defeituoso

### Manutenção Preventiva Prática

**Limpeza Interna:** Remover poeira do interior do gabinete. A poeira reduz a eficiência de resfriamento, causando superaquecimento.

**Troca de Pasta Térmica:** A pasta térmica entre o processador e o cooler degrada com o tempo. Recomenda-se trocar a cada 6-12 meses em computadores com uso intenso.

**Verificação de Saúde do Disco:** Usar ferramentas como CrystalDiskInfo (Windows) ou smartctl (Linux) para verificar o S.M.A.R.T. status do disco.

**Atualização de Drivers:** Manter drivers atualizados melhora compatibilidade e performance. Especialmente importante para placa de vídeo, áudio e rede.

**Atualização de BIOS:** Ocasionalmente, o fabricante lança atualizações de BIOS que corrigem bugs ou melhoram compatibilidade. Deve ser feito com cuidado, pois uma falha pode deixar o computador inutilizável.

### Periféricos Comuns

**Impressoras:**
- **Impressoras a Jato de Tinta:** Mais baratas, melhor qualidade de cor, mais caras de manutenção (cartucho caro)
- **Impressoras Laser:** Mais caras, melhor para volume alto, toner mais barato por página
- **Problemas comuns:** Atolamento de papel, cabeça entupida, falta de toner/cartucho, problemas de driver

**Configuração de Impressora em Rede:**
1. Conectar a impressora à rede (Ethernet ou Wi-Fi)
2. Descobrir o IP da impressora (geralmente imprime uma página de configuração ao ligar)
3. Acessar a interface web da impressora (ex: 192.168.1.100)
4. Configurar rede, nome, segurança
5. Instalar driver no computador
6. Adicionar impressora no sistema operacional

**Scanners:**
- Funcionam similar a impressoras
- Requerem software específico (geralmente fornecido pelo fabricante)
- Comum em impressoras multifuncionais

**Monitores:**
- Verificar conexão (HDMI, DisplayPort, VGA)
- Ajustar resolução no sistema operacional
- Problemas: tela preta, imagem distorcida, sem sinal

**Teclados e Mouses:**
- Geralmente problemas simples (bateria fraca, conexão solta)
- Fáceis de substituir

---

## Módulo 3: Administração de Servidores Windows e Linux

### Windows Server e Active Directory

**O que é Active Directory (AD)?**

O Active Directory é o serviço de diretório do Windows Server que gerencia usuários, computadores, grupos e permissões em uma rede corporativa. Ele funciona como um "banco de dados" centralizado de identidades.

**Funções Principais do AD:**

1. **Gestão de Usuários:** Criar, modificar e deletar contas de usuários
2. **Gestão de Computadores:** Registrar e gerenciar computadores na rede
3. **Gestão de Grupos:** Organizar usuários em grupos para facilitar atribuição de permissões
4. **Autenticação:** Validar credenciais de usuários quando fazem login
5. **Autorização:** Controlar quem tem acesso a quais recursos

**Tarefas Comuns do Help Desk com AD:**

- **Reset de Senha:** Usuário esqueceu a senha. O técnico reseta via AD.
- **Desbloqueio de Conta:** Usuário errou a senha várias vezes e a conta foi bloqueada. O técnico desbloqueia.
- **Criação de Novo Usuário:** Novo funcionário entra na empresa. O técnico cria a conta no AD.
- **Adição a Grupos:** Usuário precisa de acesso a uma pasta compartilhada. O técnico adiciona o usuário ao grupo apropriado.
- **Mudança de Permissões:** Usuário mudou de departamento. O técnico atualiza as permissões.

**Estrutura do AD:**

O AD é organizado em uma estrutura hierárquica chamada de **Organizational Units (OUs)**. Exemplo:

```
contoso.com
├── Usuários
│   ├── Administradores
│   ├── RH
│   ├── Vendas
│   └── TI
├── Computadores
│   ├── Desktops
│   ├── Notebooks
│   └── Servidores
└── Grupos
    ├── GRP_Acesso_Financeiro
    ├── GRP_Acesso_RH
    └── GRP_Acesso_Vendas
```

**GPO (Política de Grupo):**

As GPOs permitem aplicar configurações em massa a usuários e computadores. Exemplos:

- Forçar mudança de senha a cada 90 dias
- Bloquear acesso a USB
- Instalar software automaticamente
- Configurar papel de parede corporativo

### Linux Básico para Suporte

**O que é Linux?**

Linux é um sistema operacional de código aberto, usado principalmente em servidores. Diferente do Windows, o Linux é baseado em linha de comando (terminal).

**Distribuições Comuns:**

- **Ubuntu:** Fácil de usar, popular em servidores
- **CentOS/RHEL:** Estável, usado em ambientes corporativos
- **Debian:** Estável, base para Ubuntu

**Estrutura de Diretórios Linux:**

```
/
├── /home          - Diretórios dos usuários
├── /etc           - Arquivos de configuração
├── /var           - Dados variáveis (logs, cache)
├── /usr           - Programas e bibliotecas
├── /bin           - Comandos essenciais
├── /root          - Diretório do usuário root
└── /tmp           - Arquivos temporários
```

**Comandos Linux Essenciais:**

| Comando | Função | Exemplo |
|---------|--------|---------|
| `ls` | Listar arquivos | `ls -la /home` |
| `cd` | Mudar diretório | `cd /var/log` |
| `pwd` | Mostrar diretório atual | `pwd` |
| `cp` | Copiar arquivo | `cp arquivo.txt backup.txt` |
| `mv` | Mover/renomear arquivo | `mv arquivo.txt novo_nome.txt` |
| `rm` | Remover arquivo | `rm arquivo.txt` |
| `mkdir` | Criar diretório | `mkdir novo_diretorio` |
| `cat` | Mostrar conteúdo de arquivo | `cat /etc/hosts` |
| `grep` | Buscar texto em arquivo | `grep "erro" /var/log/syslog` |
| `chmod` | Mudar permissões | `chmod 755 script.sh` |
| `chown` | Mudar proprietário | `chown user:group arquivo.txt` |
| `ps` | Listar processos | `ps aux` |
| `top` | Monitor de processos | `top` |
| `df` | Espaço em disco | `df -h` |
| `du` | Tamanho de diretório | `du -sh /home` |
| `tail` | Últimas linhas de arquivo | `tail -f /var/log/syslog` |
| `sudo` | Executar como root | `sudo apt update` |

**Gerenciamento de Pacotes:**

- **Ubuntu/Debian:** `apt install`, `apt update`, `apt remove`
- **CentOS/RHEL:** `yum install`, `yum update`, `yum remove`

**Exemplo:** Instalar um servidor web
```bash
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

**Logs em Linux:**

Logs são registros de eventos do sistema. Localizados em `/var/log/`:

- `/var/log/syslog` - Eventos gerais do sistema
- `/var/log/auth.log` - Autenticação e login
- `/var/log/apache2/` - Logs do Apache
- `/var/log/nginx/` - Logs do Nginx

**Visualizar logs em tempo real:**
```bash
tail -f /var/log/syslog
```

---

## Módulo 4: Fundamentos de Redes

### Conceitos Básicos

**O que é uma Rede?**

Uma rede é um conjunto de computadores e dispositivos conectados que podem se comunicar e compartilhar recursos.

**Tipos de Redes:**

- **LAN (Local Area Network):** Rede local, geralmente em um prédio. Alcance: até 100 metros com cabo.
- **WAN (Wide Area Network):** Rede geograficamente distribuída, conecta LANs distantes. Exemplo: Internet.
- **Wi-Fi:** Rede sem fio, usa ondas de rádio.

### Protocolo TCP/IP

**TCP/IP** é o protocolo fundamental da Internet. Funciona em camadas:

| Camada | Protocolo | Função |
|--------|-----------|--------|
| Aplicação | HTTP, HTTPS, FTP, SMTP, DNS | Aplicações do usuário |
| Transporte | TCP, UDP | Entrega de dados |
| Internet | IP | Roteamento |
| Enlace | Ethernet, Wi-Fi | Conexão física |

**Endereço IP:**

Um endereço IP identifica um dispositivo na rede. Formato: `192.168.1.100`

- **Classe A:** 1.0.0.0 a 126.255.255.255 (grandes redes)
- **Classe B:** 128.0.0.0 a 191.255.255.255 (redes médias)
- **Classe C:** 192.0.0.0 a 223.255.255.255 (pequenas redes)

**IP Privado vs Público:**

- **IP Privado:** Usado internamente, não roteável na Internet. Faixas: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- **IP Público:** Único na Internet, roteável globalmente

**DHCP (Dynamic Host Configuration Protocol):**

O DHCP atribui automaticamente IPs aos dispositivos. Sem DHCP, seria necessário configurar manualmente cada IP.

### Equipamentos de Rede

**Switch:**

Conecta múltiplos dispositivos na mesma rede local (LAN). Funciona na camada 2 (enlace de dados).

- Todos os dispositivos conectados ao switch estão na mesma rede
- Permite comunicação entre eles
- Exemplo: Switch de 24 portas conecta até 24 computadores

**Roteador:**

Conecta diferentes redes e direciona dados entre elas. Funciona na camada 3 (internet).

- Conecta a rede local à Internet
- Atribui IPs privados aos dispositivos (via DHCP)
- Protege a rede interna (firewall básico)

**Access Point (AP):**

Fornece conectividade Wi-Fi. Pode ser um dispositivo separado ou integrado ao roteador.

- Frequências: 2.4GHz (alcance maior, mais lento) ou 5GHz (alcance menor, mais rápido)
- Segurança: WPA2 ou WPA3 (nunca usar WEP ou WPA, são inseguros)

### Cabeamento Estruturado

**Cabo de Rede (Ethernet):**

Conecta dispositivos à rede. Padrões:

- **Cat5e:** Até 1 Gbps, alcance 100m
- **Cat6:** Até 10 Gbps, alcance 100m
- **Cat6a:** Até 10 Gbps, alcance 100m (melhor blindagem)

**Padrões de Pinagem:**

Existem dois padrões: T568A e T568B. O importante é ser consistente.

**T568A:** Branco-Verde, Verde, Branco-Laranja, Azul, Branco-Azul, Laranja, Branco-Marrom, Marrom

**T568B:** Branco-Laranja, Laranja, Branco-Verde, Azul, Branco-Azul, Verde, Branco-Marrom, Marrom

**Patch Panel:**

Centraliza as conexões de rede. Todos os cabos da rede terminam no patch panel, que é conectado ao switch.

### Ferramentas de Diagnóstico de Rede

**Ping:**

Testa conectividade básica. Envia um pacote e aguarda resposta.

```bash
ping 8.8.8.8
```

Se receber resposta, há conectividade. Se não, há problema de rede.

**Tracert (Windows) / Traceroute (Linux):**

Mostra o caminho que os dados percorrem até o destino.

```bash
tracert google.com
```

Útil para identificar onde a conexão está falhando.

**Ipconfig (Windows) / Ifconfig (Linux):**

Mostra configurações de rede do computador.

```bash
ipconfig /all
```

Mostra IP, máscara de rede, gateway padrão, DNS.

**NSLookup:**

Resolve nomes de domínio para IPs.

```bash
nslookup google.com
```

Útil para verificar se o DNS está funcionando.

**Netstat:**

Mostra conexões de rede ativas.

```bash
netstat -an
```

---

## Módulo 5: Sistemas de Gestão (ERP/HCM) - Senior

### O que é ERP?

**ERP (Enterprise Resource Planning)** é um sistema integrado que gerencia todos os processos de negócio de uma empresa: finanças, vendas, compras, produção, recursos humanos, etc.

Benefícios: Integração de dados, relatórios centralizados, automação de processos, redução de erros.

### Senior Sistemas

**Senior Sistemas** é uma das maiores desenvolvedoras de software de gestão no Brasil. Suas principais soluções são:

**Sapiens (ERP):**

Sistema de gestão empresarial que cobre:
- Finanças (contas a pagar, contas a receber, fluxo de caixa)
- Suprimentos (compras, fornecedores, estoque)
- Vendas (pedidos, faturamento, comissões)
- Produção (planejamento, ordens de produção)
- Contabilidade

**Vetorh / HCM (Human Capital Management):**

Sistema de gestão de pessoas que cobre:
- Administração de Pessoal (cadastro de funcionários, histórico)
- Folha de Pagamento (cálculo de salários, descontos, benefícios)
- Ponto Eletrônico (registro de entrada/saída)
- Benefícios (vale refeição, vale transporte, seguro saúde)
- Medicina e Segurança do Trabalho (ASO, PPP, CIPA)
- Recrutamento e Seleção

### Papel do Help Desk no Suporte Senior

**Instalação do Cliente:**

O sistema Senior usa um cliente que deve ser instalado em cada máquina. O Help Desk é responsável por:

1. Baixar o instalador do cliente Senior
2. Instalar em cada computador
3. Configurar a conexão com o servidor
4. Criar atalhos na área de trabalho
5. Testar o acesso

**Gestão de Acessos:**

- Criar novos usuários no sistema Senior
- Atribuir permissões por módulo (ex: usuário de RH só acessa Vetorh)
- Reset de senhas
- Desbloqueio de contas

**Resolução de Erros Comuns:**

| Erro | Causa | Solução |
|------|-------|---------|
| "Erro de conexão com banco de dados" | Servidor offline ou rede fora | Verificar conectividade, reiniciar cliente |
| "DLL não encontrada" | Arquivo corrompido ou faltando | Reinstalar cliente |
| "Acesso negado" | Permissão insuficiente | Verificar permissões no AD e no Senior |
| "Sistema lento" | Muitos usuários, rede congestionada | Verificar performance do servidor |

**Senior Middleware:**

O Middleware é um serviço que gerencia a comunicação entre o cliente Senior e o servidor de banco de dados. Problemas com Middleware causam falhas de conexão.

Verificar status: Services (Windows) → procurar por "Senior Middleware"

### Conhecimento Funcional Básico

Para suportar melhor os usuários, é importante entender os processos básicos:

**Folha de Pagamento (Vetorh):**

1. Registrar ponto dos funcionários
2. Calcular horas extras, faltas, descontos
3. Gerar folha de pagamento
4. Gerar recibos (contracheque)
5. Exportar para banco para pagamento

**Pedido de Venda (Sapiens):**

1. Criar pedido com dados do cliente
2. Informar produtos e quantidades
3. Sistema calcula preço total
4. Gerar nota fiscal
5. Controlar faturamento

---

## Módulo 6: Backup e Recuperação de Dados

### Importância do Backup

Um backup é uma cópia dos dados. Sem backup, uma falha de hardware ou ataque de ransomware pode resultar em perda total de dados.

**Estatísticas:**
- 60% das empresas que perdem dados fecham em 6 meses
- Um ataque de ransomware custa em média $4.7 milhões
- 94% dos dados perdidos podem ser recuperados com backup

### Estratégia 3-2-1

A estratégia mais confiável para backup é a **Regra 3-2-1**:

1. **3 Cópias dos Dados:**
   - Original (produção)
   - Backup 1 (local)
   - Backup 2 (local ou remoto)

2. **2 Mídias Diferentes:**
   - Disco rígido externo (rápido, fácil de restaurar)
   - Fita magnética ou nuvem (barato, longo prazo)

3. **1 Cópia Off-site:**
   - Fora da empresa (proteção contra desastres físicos)
   - Nuvem, data center remoto, ou local físico diferente

### Tipos de Backup

**Full (Completo):**

Copia todos os dados. Vantagem: recuperação rápida e simples. Desvantagem: usa muito espaço e tempo.

Frequência recomendada: Semanal ou mensal

**Incremental:**

Copia apenas o que mudou desde o último backup (full ou incremental). Vantagem: usa pouco espaço. Desvantagem: recuperação mais complexa (precisa do full + todos os incrementais).

Frequência recomendada: Diário

**Diferencial:**

Copia apenas o que mudou desde o último backup full. Vantagem: equilíbrio entre espaço e velocidade. Desvantagem: usa mais espaço que incremental.

Frequência recomendada: Diário

**Exemplo de Estratégia:**

- Segunda a Sexta: Backup incremental (rápido, pouco espaço)
- Sábado: Backup full (completo, mais espaço)
- Resultado: Semana inteira coberta, recuperação rápida

### Conceitos Importantes

**RPO (Recovery Point Objective):**

Quanto de dado a empresa aceita perder em caso de desastre.

Exemplo: RPO de 1 hora significa que perderemos no máximo 1 hora de dados. Se o servidor cair às 14:30, perdemos dados até às 13:30.

**RTO (Recovery Time Objective):**

Quanto tempo a empresa pode ficar parada até restaurar o serviço.

Exemplo: RTO de 4 horas significa que o sistema deve estar operacional em no máximo 4 horas após a falha.

**Impacto no Negócio:**

| Serviço | RPO | RTO | Justificativa |
|---------|-----|-----|---------------|
| E-mail | 1 hora | 4 horas | Crítico, muitos usuários |
| Servidor de Arquivos | 4 horas | 8 horas | Importante, alguns usuários podem trabalhar offline |
| Sistema ERP | 1 hora | 2 horas | Crítico, negócio para sem ele |
| Servidor de Teste | 1 dia | 1 dia | Não crítico, pode ficar parado |

### Ferramentas de Backup

**Windows Server Backup:**

Ferramenta nativa do Windows Server. Simples, mas limitada.

**Veeam Backup & Replication:**

Solução profissional, suporta máquinas virtuais, backup em nuvem.

**Acronis:**

Solução completa, suporta múltiplos sistemas operacionais.

**Bacula:**

Solução open source, poderosa, mais complexa de configurar.

**Duplicati:**

Backup para nuvem (Google Drive, OneDrive, S3), fácil de usar.

### Teste de Recuperação

Um backup só é útil se conseguir restaurar os dados. Por isso, é essencial testar periodicamente:

1. Restaurar um arquivo individual
2. Restaurar um diretório inteiro
3. Restaurar o sistema operacional completo (bare metal recovery)

Recomendação: Testar recuperação mensalmente

---

## Módulo 7: Projetos e Melhorias de Infraestrutura

### Migrações

**O que é uma Migração?**

Uma migração é a mudança de um sistema para outro, geralmente com objetivo de melhorar performance, segurança ou funcionalidade.

**Tipos Comuns:**

1. **Migração de SO:** Windows 10 → Windows 11, ou Linux upgrade
2. **Migração de E-mail:** Sistema legado → Microsoft 365 ou Google Workspace
3. **Migração de Servidor:** Servidor físico → Virtual, ou para nuvem
4. **Migração de Dados:** Um banco de dados para outro

**Fases de uma Migração:**

1. **Planejamento:** Definir escopo, timeline, recursos necessários
2. **Preparação:** Backup, testes em ambiente de homologação
3. **Execução:** Migração dos dados/sistemas
4. **Validação:** Verificar se tudo funcionou
5. **Rollback (se necessário):** Voltar ao sistema anterior em caso de problema
6. **Suporte:** Acompanhamento pós-migração

**Papel do Help Desk:**

- Auxiliar no planejamento
- Preparar máquinas para migração
- Executar migração em máquinas dos usuários
- Suportar usuários durante transição
- Documentar problemas e soluções

### Inventário de TI

**O que é Inventário?**

Registro centralizado de todos os ativos de TI da empresa.

**Informações Importantes:**

- Computador: Modelo, série, processador, RAM, disco, SO, licenças
- Periféricos: Impressoras, scanners, monitores, teclados
- Servidores: Especificações, aplicações, backups
- Licenças: Software, versão, data de expiração, número de licenças
- Usuários: Quem usa qual computador, contato

**Ferramentas:**

- Planilha Excel (simples, manual)
- Jira Service Management (profissional)
- Snipe-IT (open source, especializada em inventário)

**Benefícios:**

- Controlar custos de licenças
- Planejar atualizações
- Rastrear equipamentos
- Cumprir auditorias

### Documentação Técnica

**O que é KB (Knowledge Base)?**

Base de conhecimento com artigos sobre como resolver problemas comuns.

**Exemplo de Artigo KB:**

**Título:** Como resetar senha no Windows

**Passos:**
1. Pressionar Ctrl+Alt+Delete
2. Clicar em "Trocar uma senha"
3. Digitar senha atual
4. Digitar nova senha (2x)
5. Pressionar Enter

**Benefícios:**

- Usuários resolvem problemas sozinhos (self-service)
- Reduz chamados repetitivos
- Novo técnico aprende mais rápido
- Documentação para auditorias

**Boas Práticas:**

- Linguagem clara e simples
- Incluir screenshots
- Passo a passo detalhado
- Manter atualizado

### Melhorias de Infraestrutura

**Identificar Gargalos:**

1. **Wi-Fi Lento em Certa Área:** Instalar novo Access Point
2. **Rede Congestionada:** Upgrade de switch ou roteador
3. **Servidor Lento:** Upgrade de RAM ou processador
4. **Armazenamento Cheio:** Adicionar novo disco ou migrar para SAN

**Implementação:**

1. Propor melhoria com justificativa (custo/benefício)
2. Testar em ambiente de teste
3. Agendar implementação em horário de baixo uso
4. Executar com cuidado
5. Validar funcionamento
6. Documentar mudança

### Segurança

**Ameaças Comuns:**

- **Malware:** Vírus, trojans, ransomware
- **Phishing:** E-mails fraudulentos tentando roubar credenciais
- **Força Bruta:** Tentativas repetidas de adivinhar senha
- **Acesso Não Autorizado:** Alguém acessando sistemas sem permissão

**Medidas de Proteção:**

1. **Antivírus:** Protege contra malware
2. **Firewall:** Bloqueia acessos não autorizados
3. **MFA (Multi-Factor Authentication):** Exige mais que senha (ex: código no celular)
4. **Patches:** Manter SO e softwares atualizados
5. **Política de Senha:** Senhas fortes, mudança periódica
6. **Treinamento:** Ensinar usuários sobre phishing e segurança

---

## Módulo 8: Soft Skills para Help Desk

### Comunicação Efetiva

**Desafio:** Usuário não entende termos técnicos, técnico fala "linguagem de TI".

**Solução:** Adaptar linguagem ao público.

**Exemplo:**

❌ Errado: "Seu DNS está resolvendo incorretamente, preciso fazer flush do cache do resolver."

✅ Certo: "Seu computador não está conseguindo encontrar o endereço do site. Vou limpar a memória de busca de endereços para resolver."

**Boas Práticas:**

- Ouvir atentamente o problema
- Fazer perguntas para entender melhor
- Explicar em linguagem simples
- Confirmar que entendeu corretamente
- Manter tom profissional e amigável

### Empatia e Paciência

**Lembre-se:** Para o usuário, o problema dele é crítico. Pode ser seu computador pessoal que não liga, ou o sistema que usa para trabalhar.

**Dicas:**

- Reconhecer a frustração do usuário
- Não culpar o usuário pelo problema
- Manter calma mesmo com usuários irritados
- Oferecer soluções, não apenas diagnóstico

### Organização e Priorização

**Cenário:** 10 chamados abertos, qual resolver primeiro?

**Resposta:** Aquele com maior impacto e urgência (SLA).

**Sistema de Priorização:**

1. Crítico: Resolver em até 4 horas (ex: servidor parado)
2. Alto: Resolver em até 8 horas (ex: vários usuários sem internet)
3. Médio: Resolver em até 1 dia (ex: impressora com problema)
4. Baixo: Resolver em até 3 dias (ex: pedido de software)

### Documentação

**Por que documentar?**

- Outro técnico consegue continuar o atendimento
- Histórico para análise de problemas recorrentes
- Evidência de que o problema foi resolvido
- Aprendizado para o futuro

**O que documentar:**

- Problema relatado pelo usuário
- Diagnóstico realizado
- Solução aplicada
- Resultado final
- Tempo gasto

**Exemplo:**

```
Chamado #12345
Usuário: João Silva
Data: 15/01/2024 10:30

Problema: Computador não liga

Diagnóstico:
- Verificado conexão à energia: OK
- Verificado botão liga/desliga: OK
- Verificado BIPs: Nenhum som (indicando problema em RAM ou HD)
- Testado com RAM de outro computador: Computador ligou

Solução: Substituída RAM defeituosa por RAM nova

Resultado: Computador ligando normalmente, testado por 30 minutos sem problemas

Tempo: 1 hora
```

---

## Conclusão

Este mini curso cobriu os fundamentos essenciais para trabalhar em Help Desk:

1. **ITIL 4 e Gestão de Chamados:** Estrutura e metodologia
2. **Hardware:** Manutenção e diagnóstico
3. **Servidores:** Windows AD e Linux básico
4. **Redes:** Conceitos e ferramentas
5. **Sistemas Senior:** ERP e HCM
6. **Backup:** Proteção de dados
7. **Projetos:** Migrações e melhorias
8. **Soft Skills:** Comunicação e organização

### Próximos Passos

1. **Estude este material** com atenção, releia as partes que não entendeu
2. **Pratique os comandos** Linux e Windows em um ambiente de teste (máquina virtual)
3. **Familiarize-se com ferramentas** de suporte (tickets, RMM, antivírus)
4. **Desenvolva suas habilidades** de comunicação com usuários
5. **Mantenha-se atualizado** sobre tendências de TI (ler blogs, assistir vídeos)
6. **Busque certificações** (CompTIA A+, Security+, ITIL Foundation)

### Dicas Finais

- **Seja proativo:** Não espere problemas, previna-os
- **Seja curioso:** Aprenda como as coisas funcionam
- **Seja organizado:** Documente tudo
- **Seja empático:** Lembre-se que usuários não são técnicos
- **Seja humilde:** Sempre há mais a aprender

Desejo muito sucesso na sua carreira em Help Desk!

---

**Versão:** 1.0  
**Data:** Janeiro 2024  
**Autor:** Guia Completo de Help Desk e Suporte Técnico
