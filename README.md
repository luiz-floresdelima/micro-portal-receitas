# 🍳 Mini Portal de Receitas – Next.js

Este projeto foi desenvolvido como parte de um **teste técnico**, com o objetivo de construir um **micro-portal de receitas** utilizando **Next.js** e **Tailwind CSS**, com foco em **performance, SEO** e **boas práticas de arquitetura front-end**.

---

## 🚀 Tecnologias Utilizadas

* [Next.js 16](https://nextjs.org/)
* [React 19](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/luiz-floresdelima/micro-portal-receitas
cd mini-portal-receitas
```

### 2️⃣ Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3️⃣ Rodar o projeto em modo desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧱 Estrutura de Pastas

```
src/
 ├── components/        # Componentes reutilizáveis (Header, Footer, RecipeCard, etc.)
 ├── app/               # Páginas do Next.js (Home, Receita, Busca, Categoria)
 ├── lib/               # Funções utilitárias e helpers
 ├── data/              # JSONs simulando consumo de API
 ├── __tests__/         # Testes unitários
 ├── __mocks__/         # Mocks para os testes unitários
 ├── types/             # Tipagens gerais
 └── public/            # Imagens e assets estáticos
```

---

## 🧠 Principais Funcionalidades

* **Home:** Exibe destaques e últimas receitas com carregamento estático (SSG).
* **Página da Receita:** Renderiza dados individuais via **SSG**.
* **Busca e Categoria:** Renderizadas com **ISR**, usando revalidate para simular atualização incremental (Server-side para busca).
* **Menu Horizontal e Footer:** Componentes fixos e responsivos, com links e informações institucionais.
* **SEO e Metatags:** Implementadas manualmente por página.
* **Performance e Core Web Vitals:** Otimização via **SSG** e **ISR**.

---

## ⚡ Deploy / Produção

### 1️⃣ Build de Produção

```bash
npm run build
```

### 2️⃣ Rodar localmente em modo produção

```bash
npm start
```

### 3️⃣ Deploy na Vercel (recomendado)

O projeto é compatível nativamente com deploy na **[Vercel](https://vercel.com/)**.
Basta conectar o repositório GitHub e as configurações de build serão detectadas automaticamente.

---

## 🧩 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz (se necessário):

```env
NEXT_PUBLIC_SITE_URL=https://seusite.com
```

---

## 🧱 Estratégia de Renderização

| Página                          | Método                         | Revalidação |
| ------------------------------- | ------------------------------ | ----------- |
| Home (`/`)                      | **SSG**                        | N/A         |
| Receita (`/receita/[slug]`)     | **SSG**                        | N/A         |
| Busca (`/busca`)                | **ISR (Server-side Simulado)** | 60 segundos |
| Categoria (`/categoria/[slug]`) | **ISR**                        | 60 segundos |

> O uso combinado de **SSG + ISR** garante alta performance, mantendo conteúdo atualizado sem prejudicar tempo de resposta.

---

## 🧰 Scripts Disponíveis

| Script  | Descrição                                 |
| ------- | ----------------------------------------- |
| `dev`   | Executa o projeto em modo desenvolvimento |
| `build` | Cria o build de produção                  |
| `start` | Roda o servidor em produção               |
| `test`  | Executa testes unitários                  |

---

## 🧑‍💻 Autor

**Luiz Lima**
📧 [[luizf.floresdelima@gmail.com](mailto:luizf.floresdelima@gmail.com)]
🔗 [LinkedIn](https://www.linkedin.com/in/luizfloresdelima/) | [GitHub](https://github.com/luiz-floresdelima)

---

## 📜 Licença

Este projeto é apenas para fins de avaliação técnica e demonstração de conhecimento.
