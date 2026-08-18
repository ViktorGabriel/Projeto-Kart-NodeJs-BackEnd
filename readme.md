<div align="center">

<img src="./docs/header.gif" alt="Mario Kart" width="320" />

# 🏁 Mario Kart — Simulador de Corrida

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-30.x-C21325?style=for-the-badge&logo=jest&logoColor=white)
![License](https://img.shields.io/badge/Licença-ISC-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

> **Projeto de Engenharia de Software** — Aplicação TypeScript orientada a objetos com SOLID, Design Patterns e testes automatizados.

</div>

---

## 🇧🇷 Português do Brasil

### 📋 Sobre o Projeto

Este projeto é um laboratório prático de **Engenharia de Software**, construído sobre o desafio **Mario Kart** da [DIO](https://www.dio.me/). O objetivo vai além de simular corridas: o código demonstra a aplicação rigorosa de princípios e padrões de desenvolvimento profissional em TypeScript.

| Personagem | Velocidade | Manobrabilidade | Poder |
|:---:|:---:|:---:|:---:|
| <img src="./docs/mario.gif" width="50"/><br>**Mario** | 4 | 3 | 3 |
| <img src="./docs/luigi.gif" width="50"/><br>**Luigi** | 3 | 4 | 4 |
| <img src="./docs/peach.gif" width="50"/><br>**Peach** | 3 | 4 | 2 |
| <img src="./docs/yoshi.gif" width="50"/><br>**Yoshi** | 2 | 4 | 3 |
| <img src="./docs/bowser.gif" width="50"/><br>**Bowser** | 5 | 2 | 5 |
| <img src="./docs/dk.gif" width="50"/><br>**Donkey Kong** | 2 | 2 | 5 |

---

### 🎯 O Objetivo Prático

A corrida acontece em **5 rodadas**. A cada rodada, um bloco de pista é sorteado aleatoriamente:

| Bloco | Atributo disputado | Resultado |
|:---|:---|:---|
| 🏎️ **Reta** | `velocidade` | O maior total (dado + velocidade) ganha 1 ponto |
| 🔄 **Curva** | `manobrabilidade` | O maior total (dado + manobrabilidade) ganha 1 ponto |
| 🥊 **Confronto** | `poder` | O perdedor perde 1 ponto (mínimo 0) |

> Ao final das 5 rodadas, o jogador com maior pontuação vence. Em caso de empate, a corrida é declarada empatada.

---

### 🏛️ Decisões Arquiteturais

#### Separação de Responsabilidades (SRP)

Cada classe tem uma única razão para mudar:

| Classe / Interface | Única Responsabilidade |
|:---|:---|
| `IPlayer` / `Player` | Estado e mutações válidas de um jogador |
| `IDiceService` / `DiceService` | Toda a aleatoriedade do jogo |
| `IBlockStrategy` / `BlockStrategy` | Contrato e base para resolução de blocos |
| `RetaStrategy`, `CurvaStrategy`, `ConfrontoStrategy` | Lógica de resolução de cada tipo de bloco |
| `RaceEngine` | Orquestração das rodadas |
| `src/index.ts` | Raiz de Composição — montagem e inicialização |

#### Princípios SOLID aplicados

- **S** — Cada classe tem uma responsabilidade única e bem definida.
- **O** — Novos tipos de bloco podem ser adicionados criando uma nova `*Strategy` sem alterar `RaceEngine`.
- **L** — Qualquer subclasse de `BlockStrategy` pode substituir outra sem quebrar o motor.
- **I** — `IDiceService` e `IBlockStrategy` são interfaces coesas e mínimas.
- **D** — `RaceEngine` depende de `IDiceService` (abstração), nunca de `DiceService` (concretude).

#### Design Patterns utilizados

| Pattern | Onde é aplicado |
|:---|:---|
| **Strategy** | `IBlockStrategy` + `RetaStrategy`, `CurvaStrategy`, `ConfrontoStrategy` |
| **Dependency Injection** | `RaceEngine` recebe `IDiceService` via construtor |
| **Composition Root** | `src/index.ts` — único ponto de montagem do grafo de dependências |
| **Template Method** | `BlockStrategy` (classe abstrata) define o contrato; subclasses implementam `resolve()` |

---

### 📁 Estrutura do Projeto

```
Kart/
├── __tests__/
│   └── Player.test.ts          # Testes unitários da entidade Player
├── docs/
│   ├── header.gif
│   ├── mario.gif, luigi.gif, peach.gif
│   ├── yoshi.gif, bowser.gif, dk.gif, toad.gif
├── src/
│   ├── interfaces/
│   │   ├── IPlayer.ts          # Contrato da entidade jogador
│   │   └── IRace.ts            # BlockType, IBlockStrategy, IDiceService, LogResultFn, StrategyResolver
│   ├── models/
│   │   └── Player.ts           # Implementação concreta de IPlayer
│   ├── services/
│   │   ├── DiceService.ts      # Aleatoriedade — dado e bloco
│   │   └── RaceEngine.ts       # Orquestração das rodadas
│   ├── strategies/
│   │   ├── BlockStrategy.ts    # Classe base abstrata
│   │   ├── RetaStrategy.ts     # Lógica do bloco Reta
│   │   ├── CurvaStrategy.ts    # Lógica do bloco Curva
│   │   └── ConfrontoStrategy.ts# Lógica do bloco Confronto
│   └── index.ts                # Raiz de Composição & ponto de entrada
├── package.json
├── tsconfig.json
└── README.md
```

---

### 🚀 Como Executar

#### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) v9 ou superior

#### Instalação

```bash
git clone https://github.com/ViktorGabriel/Projeto-Kart-NodeJs-BackEnd.git
cd Projeto-Kart-NodeJs-BackEnd
npm install
```

#### Executar a corrida (TypeScript direto)

```bash
npm run dev
```

#### Build de produção e execução

```bash
npm run build   # Compila TypeScript para ./dist
npm start       # Executa o JS compilado
```

#### Verificação de tipos

```bash
npm run typecheck
```

#### Testes automatizados

```bash
npm test               # Executa a suíte completa
npm run test:watch     # Modo watch (re-executa ao salvar)
npm run test:coverage  # Gera relatório de cobertura
```

---

---

## 🇺🇸 English

### 📋 About the Project

This project is a **Software Engineering** hands-on lab, built on top of the **Mario Kart** challenge from [DIO](https://www.dio.me/). The goal goes beyond simulating races: the codebase demonstrates rigorous application of professional TypeScript development principles and patterns.

---

### 🎯 The Practical Goal

The race takes place over **5 rounds**. Each round, a track block is randomly drawn:

| Block | Attribute contested | Outcome |
|:---|:---|:---|
| 🏎️ **Straight** | `velocidade` | Highest total (dice + speed) earns 1 point |
| 🔄 **Curve** | `manobrabilidade` | Highest total (dice + handling) earns 1 point |
| 🥊 **Confrontation** | `poder` | The loser loses 1 point (minimum 0) |

> After 5 rounds, the player with the most points wins. If tied, the race is declared a draw.

---

### 🏛️ Architectural Decisions

#### Separation of Concerns (SRP)

Each class has a single reason to change:

| Class / Interface | Single Responsibility |
|:---|:---|
| `IPlayer` / `Player` | Player state and valid mutations |
| `IDiceService` / `DiceService` | All game randomness |
| `IBlockStrategy` / `BlockStrategy` | Contract and base for block resolution |
| `RetaStrategy`, `CurvaStrategy`, `ConfrontoStrategy` | Per-block resolution logic |
| `RaceEngine` | Round orchestration |
| `src/index.ts` | Composition Root — wiring and bootstrapping |

#### SOLID Principles Applied

- **S** — Every class has a single, well-defined responsibility.
- **O** — New block types can be added by creating a new `*Strategy` without modifying `RaceEngine`.
- **L** — Any `BlockStrategy` subclass can replace another without breaking the engine.
- **I** — `IDiceService` and `IBlockStrategy` are lean, cohesive interfaces.
- **D** — `RaceEngine` depends on `IDiceService` (abstraction), never on `DiceService` (concrete).

#### Design Patterns Used

| Pattern | Where Applied |
|:---|:---|
| **Strategy** | `IBlockStrategy` + `RetaStrategy`, `CurvaStrategy`, `ConfrontoStrategy` |
| **Dependency Injection** | `RaceEngine` receives `IDiceService` via constructor |
| **Composition Root** | `src/index.ts` — sole wiring point of the dependency graph |
| **Template Method** | `BlockStrategy` (abstract class) defines the contract; subclasses implement `resolve()` |

---

### 📁 Project Structure

```
Kart/
├── __tests__/
│   └── Player.test.ts          # Unit tests for the Player entity
├── docs/
│   └── *.gif                   # Character assets
├── src/
│   ├── interfaces/
│   │   ├── IPlayer.ts          # Player entity contract
│   │   └── IRace.ts            # BlockType, IBlockStrategy, IDiceService, etc.
│   ├── models/
│   │   └── Player.ts           # Concrete IPlayer implementation
│   ├── services/
│   │   ├── DiceService.ts      # Randomness — dice and block
│   │   └── RaceEngine.ts       # Round orchestration
│   ├── strategies/
│   │   ├── BlockStrategy.ts    # Abstract base class
│   │   ├── RetaStrategy.ts     # Straight block logic
│   │   ├── CurvaStrategy.ts    # Curve block logic
│   │   └── ConfrontoStrategy.ts# Confrontation block logic
│   └── index.ts                # Composition Root & entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

### 🚀 How to Run

#### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher

#### Install

```bash
git clone https://github.com/ViktorGabriel/Projeto-Kart-NodeJs-BackEnd.git
cd Projeto-Kart-NodeJs-BackEnd
npm install
```

#### Run the race (TypeScript directly)

```bash
npm run dev
```

#### Production build and run

```bash
npm run build   # Compiles TypeScript to ./dist
npm start       # Runs the compiled JS
```

#### Type check

```bash
npm run typecheck
```

#### Automated tests

```bash
npm test               # Runs the full test suite
npm run test:watch     # Watch mode (re-runs on save)
npm run test:coverage  # Generates coverage report
```

---

<div align="center">

Feito com ❤️ por **Viktor Gabriel** — DIO Bootcamp Node.js

</div>
