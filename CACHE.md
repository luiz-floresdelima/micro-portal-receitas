# 🗂 Estratégia de Cache – Mini Portal de Receitas

Este documento descreve a estratégia de cache utilizada no projeto do **Mini Portal de Receitas** em **Next.js 16**, detalhando como otimizar a performance, reduzir tempo de resposta e manter conteúdo atualizado.

---

## 1️⃣ Objetivo do Cache

* Garantir **alta performance** e carregamento rápido das páginas.
* Minimizar chamadas desnecessárias a dados estáticos e JSONs locais.
* Permitir atualização de conteúdo sem rebuild completo, usando técnicas de cache incremental.

---

## 2️⃣ Estratégias Utilizadas

### 2.1 Static Site Generation (SSG)

* **Páginas:** Home, Receita (`/receita/[slug]`).
* **Descrição:** As páginas são geradas estaticamente durante o build (`npm run build`).
* **Benefício:** Carregamento instantâneo, excelente para SEO e Core Web Vitals.
* **Cache:** Conteúdo pré-renderizado é servido diretamente pelo servidor ou CDN.

### 2.2 Incremental Static Regeneration (ISR)

* **Páginas:** Busca (`/busca`) e Categoria (`/categoria/[slug]`).
* **Descrição:** O Next.js revalida a página em background após o tempo definido (`revalidate: 60`).
* **Benefício:** Combina performance de SSG com conteúdo atualizado sem rebuild completo.
* **Funcionamento:**

  1. Primeira requisição serve a versão estática atual.
  2. Após `revalidate` segundos, uma nova versão é gerada em background.
  3. Usuários seguintes recebem a nova versão.

### 2.3 Cache de Cliente (Opcional / Simulação)

* Para otimizar experiência do usuário em buscas repetidas:

  * Dados podem ser armazenados em **sessionStorage** ou **localStorage**.
  * Permite carregamento instantâneo se o mesmo termo de busca for repetido.

### 2.4 Uso de CDN (opcional)

* Para ambientes de produção, recomenda-se servir conteúdo estático e imagens via **CDN**.
* Garante menor latência e melhor performance global.
* Next.js integra facilmente com Vercel ou outras CDNs.

---

## 3️⃣ Resumo do Cache por Página

| Página                          | Renderização       | Revalidação | Cache            | Observações                                         |
| ------------------------------- | ------------------ | ----------- | ---------------- | --------------------------------------------------- |
| Home (`/`)                      | SSG                | N/A         | Servido estático | Conteúdo pré-build, carregamento instantâneo        |
| Receita (`/receita/[slug]`)     | SSG                | N/A         | Servido estático | Conteúdo individual pré-build                       |
| Busca (`/busca`)                | SSG + ISR          | 60s         | Cache de página  | Atualização incremental                             |
| Categoria (`/categoria/[slug]`) | ISR                | 60s         | Cache de página  | Atualização incremental de listagem por categoria   |

---

## 4️⃣ Considerações Finais

* O uso combinado de **SSG + ISR + cache local opcional** garante:

  * Alta performance
  * Boa pontuação em Core Web Vitals
  * Conteúdo atualizado dinamicamente
* A estratégia é compatível com deploy em **Vercel** ou qualquer ambiente Next.js moderno.

> Observação: Para testes técnicos, a implementação de cache de cliente ou CDN pode ser simulada, mas a documentação mostra entendimento completo de boas práticas de caching.
