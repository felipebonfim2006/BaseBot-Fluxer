# 🤖 BaseBot Fluxer

Base otimizada para um bot utilizando `@fluxerjs/core`, estruturada com manipuladores dinâmicos (handlers) para eventos e comandos por prefixo. Totalmente livre do discord.js e sem dependência de banco de dados.

---

## 📋 Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior.
- Uma aplicação criada no [Discord Developer Portal](https://discord.com/developers/applications).

---

## ⚙️ 1. Configuração

Na pasta `src/configs/`, copie o arquivo de modelo `ex.config.json` para criar o seu `config.json` e preencha os valores:

```bash
cp src/configs/ex.config.json src/configs/config.json
```

```json
{
    "token": "seu-token-do-bot",
    "prefix": "!"
}
```

| Campo    | Descrição                                                            |
| -------- | -------------------------------------------------------------------- |
| `token`  | Token do bot, disponível na aba **Bot** do Discord Developer Portal. |
| `prefix` | Prefixo dos comandos enviados pelo chat (ex.: `?` ou `!`).           |

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

Para reiniciar o bot automaticamente quando um arquivo for alterado (necessário ter o nodemon configurado no seu `package.json`):

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
