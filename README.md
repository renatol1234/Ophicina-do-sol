Baseado nos arquivos que você enviou, vou criar um **README.md** completo para seu projeto. Percebi que se trata de um sistema de indicações para a empresa "Ophicina do Sol" com formulários técnicos e painel comercial.

```markdown
# Sistema de Indicações - Ophicina do Sol

Sistema web para gerenciamento de indicações de clientes, com formulários técnicos para serviços e painel administrativo para acompanhamento.

## ✨ Funcionalidades

### 🏠 Página Principal
- Acesso aos formulários técnicos (Banho e Piscina)
- Redirecionamento para site oficial da Ophicina do Sol
- Sistema de indicações de clientes

### 📋 Formulários Técnicos
- **Formulário Técnico Banho**: Coleta informações para serviços de banho
- **Formulário Técnico Piscina**: Coleta informações para serviços de piscina

### 🤝 Sistema de Indicações
- Usuários podem indicar novos clientes
- Captura de dados completos do indicado
- Seleção de tipos de serviços

### 👨‍💼 Painel Comercial (Admin)
- **Autenticação segura** com Firebase
- Visualização de todas as indicações
- Gerenciamento de status (Positivo/Negativo)
- Controle de comissões
- Edição de informações das indicações
- Visualização de indicações confirmadas

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend/DB**: Firebase (Authentication, Realtime Database)
- **Hospedagem**: Firebase Hosting
- **Versionamento**: Git

## 📁 Estrutura do Projeto

```
projeto/
├── index.html              # Página principal do sistema
├── config.js              # Configuração de animação do footer
├── main.js               # Lógica principal de navegação
├── styles.css            # Estilos globais
├── block.js              # Script de bloqueio (se aplicável)
├── comercial/
│   ├── comercial.html    # Página de login comercial
│   └── comercial.js      # Lógica do painel comercial
├── indicação/
│   └── indicar.html      # Página de indicação de clientes
├── formulario tecnico banho residencia/
│   └── banho.html        # Formulário técnico para banho
└── Formulario tecnico de psicina/
    └── psicina.html      # Formulário técnico para piscina
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Edge)
- Acesso à internet (para Firebase)

### Execução Local
1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd nome-do-projeto
   ```

3. Abra o arquivo `index.html` em seu navegador:
   ```bash
   # Método 1: Clique duplo no arquivo
   # Método 2: Use um servidor local (recomendado)
   python -m http.server 8000
   ```

4. Acesse `http://localhost:8000` no navegador

## 🔐 Acesso ao Painel Comercial

1. Na página principal, clique em "Comercial"
2. Insira as credenciais de administrador:
   - **Email**: [configurado no Firebase]
   - **Senha**: [configurado no Firebase]

### Níveis de Acesso
- **Administradores**: Acesso completo a todas as funcionalidades
- **Comercial**: Visualização e edição limitada

## ⚙️ Configuração do Firebase

O projeto utiliza Firebase para:
- Autenticação de usuários
- Banco de dados em tempo real
- Hospedagem

Para configurar seu próprio Firebase:
1. Crie um projeto em [Firebase Console](https://console.firebase.google.com)
2. Ative Authentication e Realtime Database
3. Substitua as configurações em `comercial.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "SUA_API_KEY",
     authDomain: "SEU_PROJETO.firebaseapp.com",
     // ... outras configurações
   };
   ```

## 🎨 Personalização

### Logo
- Substitua `logo-site-15-e1717592786468.webp` pela logo da sua empresa
- Atualize o favicon em `icon.ico`

### Cores e Estilos
- Modifique `styles.css` para alterar cores, fontes e layout
- Ajuste os botões e formulários conforme necessário

## 📱 Responsividade

O sistema é responsivo e funciona em:
- Desktop (computadores)
- Tablet (iPad, Android)
- Mobile (iPhone, Android)

## 🔄 Fluxo de Trabalho

1. **Cliente** acessa o sistema
2. **Escolhe formulário** técnico ou indicação
3. **Preenche informações** necessárias
4. **Comercial** recebe os dados no painel
5. **Comercial** atualiza status e comissões
6. **Sistema** armazena tudo no Firebase

## 📊 Banco de Dados

### Estrutura
- **users**: Armazena dados dos usuários que fazem indicações
- **indications**: Armazena as indicações feitas
- **indicated**: Armazena indicações confirmadas

## 🛡️ Segurança

- Autenticação via Firebase Auth
- Controle de acesso por níveis (admin/comercial)
- Dados criptografados em trânsito
- Validação de formulários no frontend

## 🔧 Manutenção

### Adicionar Novos Administradores
1. Acesse o Firebase Console
2. Vá para Authentication → Users
3. Adicione o UID do usuário ao array `adminIds` em `comercial.js`

### Adicionar Novos Serviços
1. Atualize os formulários HTML
2. Modifique a lógica de processamento em JavaScript
3. Atualize o banco de dados se necessário

## 📄 Licença

© 2024 @renatol123 - Todos os direitos reservados

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas:
- Contato: [renatol123]
- Email: [seu-email@dominio.com]

---

**Desenvolvido com ❤️ para Ophicina do Sol**
```
