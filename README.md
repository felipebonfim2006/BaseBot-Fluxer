# 🤖 BaseBot Fluxer

Base otimizada em ES Modules (ESM) para bots com @fluxerjs/core, estruturada com handlers dinâmicos para eventos e comandos e integração com MongoDB (Mongoose).

---

## 📋 Requisitos

- [Node.js](https://nodejs.org/) 22.13 ou superior (versão mínima exigida pelo `@fluxerjs/core`).
- Um servidor MongoDB acessível (local ou na nuvem).

> O projeto utiliza **ES Modules** (`import`/`export`). Certifique-se de manter o campo `"type": "module"` no `package.json`.

---

## ⚙️ 1. Configuração

Na pasta `src/configs/`, copie o arquivo de modelo `ex.config.json` para criar o seu `config.json` e preencha os valores:

```bash
cp src/configs/ex.config.json src/configs/config.json
```

```json
{
  "token": "seu-token-do-bot",
  "prefix": "?",
  "mongo_uri": "uri-do-mongodb"
}
```

| Campo       | Descrição                                                       |
| ----------- | --------------------------------------------------------------- |
| `token`     | Token do bot, disponível na aba **Aplicativos** do Fluxer.      |
| `prefix`    | Prefixo dos comandos enviados pelo chat (ex.: `?` ou `!`).      |
| `mongo_uri` | String de conexão do MongoDB usada para salvar os dados do bot. |

> **Importante:** O arquivo `config.json` contém o seu token e é extremamente sensível. O projeto já deve incluir um arquivo `.gitignore` na raiz configurado para ignorar o `config.json`, garantindo que suas credenciais nunca sejam publicadas acidentalmente no GitHub.

---

## 📦 2. Instalação

Abra o terminal na raiz do projeto (`BaseBot-Fluxer`) e instale as dependências. O projeto utiliza o arquivo `yarn.lock`, sendo recomendado o uso do Yarn.

### Usando Yarn

```bash
yarn install
```

### Usando NPM

```bash
npm install
```

---

## 🚀 3. Como iniciar o bot

### Iniciar normalmente

```bash
yarn start
# ou
npm start
```

### Modo de desenvolvimento

Para reiniciar o bot automaticamente quando um arquivo for alterado (o nodemon já está configurado no `package.json`):

```bash
yarn dev
# ou
npm run dev
```

---

## 📁 Estrutura do projeto

A estrutura atual do seu projeto BaseBot-Fluxer é:

```text
BaseBot-Fluxer/
├── src/
│   ├── commands/       # Comandos de prefixo separados por categoria
│   │   ├── moderacao/  # Comandos administrativos (ex: clear.js)
│   │   └── utilidades/ # Comandos gerais (ex: avatar.js, help.js, ping.js)
│   ├── configs/        # Arquivo config.json (local) e ex.config.json (modelo)
│   ├── events/         # Eventos do bot (MessageCreate, Ready, etc.)
│   │   ├── client/
│   │   └── guild/
│   └── handlers/       # Carregadores automáticos (Commands.js e Events.js)
├── .gitignore          # Regras do Git para ignorar arquivos sensíveis (node_modules, config.json)
├── index.js            # Arquivo principal que inicia o bot
├── package.json        # Dependências e scripts do projeto
└── yarn.lock           # Árvore de dependências do Yarn
```
