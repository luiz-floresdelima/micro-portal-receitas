# Entrega – Mini Portal de Receitas (Next.js)

## 1️⃣ Requisitos Funcionais Atendidos

* **Home:** Listagens de destaques e últimas receitas.
* **Página de Receita:** Renderização de páginas individuais via slug.
* **Estrutura do portal:**
  * Cabeçalho com menu horizontal (categorias).
  * Footer estático com links úteis.
* **Busca:** Implementada via **SSG com ISR** (revalidate 60s), garantindo atualização incremental do conteúdo.
* **Consumo de dados:** JSONs locais simulando API.
* **Estilização:** TailwindCSS para consistência e manutenção da camada de estilo.

> Observação: Não houve foco em UX/UI refinada, conforme orientações.

---

## 2️⃣ Requisitos Não-Funcionais

* **Clareza do código:**
  * Arquitetura baseada em pastas separadas (`components`, `app`, `lib`, `data`, `types`, `__tests__`, `__mocks__`).
  * Isolamento de responsabilidades e tipagem com TypeScript.

* **Performance:**
  * SSG para Home e Receita.
  * ISR para Busca e Categoria (`revalidate: 60s`).
  * Otimização de imagens via `<Image>` do Next.js, lazy loading nativo.
  * Bundle inicial enxuto, evitando JS desnecessário.

* **SEO técnico:**
  * Metatags: `<title>`, `<meta description>`, canonical, OG/Twitter.
  * Estrutura semântica de HTML.

* **Velocidade de navegação:** Páginas servidas estáticas ou com ISR minimizam TTFB/LCP/INP.

* **Documentação e explicações:** Este documento detalha decisões, trade-offs e alternativas consideradas.

---

## 3️⃣ Decisões Técnicas e Trade-offs

| Tema              | Decisão                | Justificativa                           | Alternativa Considerada | Trade-off                                            |
| ----------------- | ---------------------- | --------------------------------------- | ----------------------- | ---------------------------------------------------- |
| Home              | SSG                    | Carregamento instantâneo, SEO otimizado | SSR                     | Não reflete conteúdo atualizado em tempo real        |
| Página Receita    | SSG                    | Performance e consistência de SEO       | ISR                     | Não recebe atualização automática sem rebuild        |
| Busca             | SSG + ISR              | Atualização incremental, TTFB razoável  | CSR                     | CSR teria pior SEO, SSR completo não necessário      |
| Categoria         | ISR                    | Listagem dinâmica atualizável           | SSG                     | Conteúdo não crítico, ISR suficiente                 |
| Estilização       | TailwindCSS            | Consistência, manutenção fácil          | styled-components       | Tailwind é mais leve e rápido, menos runtime JS      |
| Cache             | ISR + simulação client | Balanceia performance e dados frescos   | SWR ou Redis            | Implementação simples, suficiente para teste técnico |
| SEO               | Manual, por página     | Cobertura de metatags essenciais        | next-seo                | Next SEO facilita, mas não usado para simplificação  |

---

## 4️⃣ Estrutura e Arquitetura

```
src/
 ├── components/        # Componentes reutilizáveis
 ├── app/               # Páginas Next.js (Home, Receita, Busca, Categoria)
 ├── lib/               # Funções utilitárias
 ├── data/              # JSONs simulando API
 ├── __tests__/         # Testes unitários
 ├── __mocks__/         # Mocks
 ├── types/             # Tipagem geral
 └── public/            # Assets estáticos
```

> Arquitetura simples, modular, com responsabilidade isolada por camada.

---

## 5️⃣ Checklist de Validação

* [x] Home com destaques e últimas receitas (SSG)
* [x] Página Receita (SSG)
* [x] Menu horizontal (categorias)
* [x] Footer estático
* [x] Busca com SSG + ISR (revalidate 60s)
* [x] Categoria com ISR (revalidate 60s)
* [x] Consumo de JSONs locais
* [x] Estilização com TailwindCSS
* [x] Metatags SEO base (<title>, description, canonical, OG/Twitter)
* [x] Otimização de imagens (`<Image>` do Next.js)
* [x] Performance e Core Web Vitals razoáveis em ambiente local
* [x] Estrutura de código limpa e tipada
* [x] Documentação de decisões técnicas e trade-offs

---

## 6️⃣ Observações Finais

* Métricas de build/bundle podem ser obtidas via `next build` (comentadas se necessário).
* Estrutura de cache e renderização foi planejada considerando **performance, SEO e atualização incremental de dados via ISR**.
* Implementações extras como A11y básica ou simulação de CDN podem ser facilmente adicionadas para produção.
