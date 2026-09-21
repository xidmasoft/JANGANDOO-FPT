# RAPPORT PHASE 1D

## 1. Objectif
Mettre en place la fondation frontend du projet JANGANDOO FPT dans `apps/web/` sans implémenter de logique métier, en utilisant React, Vite, TypeScript et un système de routage avec l'intégration du design system FPT.

## 2. État initial
Le répertoire `apps/web` n'était pas initialisé.

## 3. Versions utilisées
- React: ^19.x
- Vite: ^8.x
- TypeScript: ~6.0.x
- Tailwind CSS: ^3.4.x
- React Router DOM: ^7.x

## 4. Architecture frontend
L'architecture a été créée dans `apps/web/src/` et comprend :
- `components/ui` : Composants génériques (ex: ErrorBoundary).
- `components/layout` : Layouts principaux (ex: MainLayout).
- `routes` : Architecture de routage et pages racine.
- `test` : Configuration de setup vitest.

## 5. Configuration Vite
Vite est configuré via `vitest/config` (qui englobe `defineConfig` de Vite) avec le plugin React, un alias de chemin `@/` pointant vers `src/`, et la configuration de l'environnement de test JsDom.

## 6. Configuration React
Point d'entrée global `main.tsx` utilisant `createRoot`, englobé par un `StrictMode` et un `ErrorBoundary` global.

## 7. TypeScript
Le projet utilise TypeScript en mode strict. Les erreurs liées à l'import de types au moment du build (`ReactNode`, `ErrorInfo`) ont été résolues en respectant le `verbatimModuleSyntax` de TS 6+.

## 8. Routing
Configuration basique utilisant `react-router-dom` (`createBrowserRouter`) exposant :
- `/` via `HomePage`
- `*` via `NotFoundPage` (404)
Les deux partagent le `MainLayout`.

## 9. API abstraction
L'URL d'API est prête à être consommée grâce à la variable d'environnement `.env.example` -> `VITE_API_URL=http://localhost:3000/api/v1`. Les hooks et abstractions de service ne sont pas implémentés pour l'instant.

## 10. Design System
Les configurations de base de JANGANDOO FPT ont été implémentées.
Le fichier global `.css` et `tailwind.config.js` définissent un environnement clair et professionnel, mobile-first, prêt pour l'intégration UX/UI.

## 11. Typographie
L'application utilise l'échelle fournie par Tailwind et la police `Inter` (sans-serif) définie comme font-family par défaut.

## 12. Palette
Le fichier `tailwind.config.js` expose les couleurs suivantes :
- `primary`: `#005f73` (et `foreground`: blanc)
- `secondary`: `#0a9396`
- `accent`: `#e9d8a6`
- `success`, `warning`, `destructive`, `info`, `background` (`#f8f9fa`), `surface` (`#ffffff`), `muted` et `border`.

## 13. Composants UI
Pour le moment, l'`ErrorBoundary` et les pages fondatrices ont été générés. Les composants atomes (`Button`, `Input`, etc.) seront implémentés dans les packages UI appropriés lors de la prochaine phase (1E) ou créés selon le besoin.

## 14. Accessibilité
Le CSS par défaut respecte le contraste (noir sur blanc/gris clair et texte clair sur couleurs de fond primaires FPT). Le layout utilise des balises sémantiques `<header>`, `<main>`, `<footer>`, `<nav>`, et `<section>`.

## 15. Responsive
L'utilisation de la grille Tailwind et du Container central (`container mx-auto`, `md:grid-cols-2`) assure le support desktop/tablette/mobile dès le départ.

## 16. Gestion des erreurs
Un composant React Class `ErrorBoundary` a été ajouté au sommet de l'arbre (`main.tsx`) pour intercepter toute exception et afficher une UI professionnelle pour rediriger l'utilisateur vers l'accueil.

## 17. Loading / Empty states
À implémenter ultérieurement lors de la connexion à l'API.

## 18. Tests
- Utilisation de `vitest` et `@testing-library/react`.
- Un test E2E/Intégration léger (`App.test.tsx`) assure que l'application React et son Router sont montés correctement, et que le texte de la HomePage et du Header s'affichent bien.

## 19. Lint
`oxlint` est configuré par le template Vite de base pour le linting ultra-rapide.

## 20. Typecheck
Le typechecking fonctionne (`tsc --noEmit`) de manière transparente dans le build.

## 21. Build
Le build `pnpm --filter web build` fonctionne (temps de build ~1s) et produit un dossier `dist` compact.

## 22. Dépendances ajoutées
- `react-router-dom`, `lucide-react`, `clsx`, `tailwind-merge`
- (Dev) `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/*`, `jsdom`.

## 23. Fichiers créés
- Configuration : `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, `.env.example`
- Architecture src : `main.tsx`, `index.css`, `routes/index.tsx`, `routes/HomePage.tsx`, `routes/NotFoundPage.tsx`, `components/layout/MainLayout.tsx`, `components/ui/ErrorBoundary.tsx`
- Tests: `src/test/setup.ts`, `src/App.test.tsx`
- Documentation: `RAPPORT_PHASE_1D_FONDATION_FRONTEND.md`

## 24. Fichiers modifiés
- `package.json` de l'app `web` (ajout des scripts).
- `package.json` de la racine du monorepo (raccourcis scripts `*:web`).
- `docs/architecture.md` et `docs/development.md`.

## 25. Problèmes rencontrés
- Les imports Typescript de type `ReactNode` pour l'ErrorBoundary provoquaient une erreur de build strict `verbatimModuleSyntax`.
- La config par défaut Vite ne chargeait pas `vitest` correctement si l'on n'utilisait pas son plugin de configuration.

## 26. Solutions
- Utilisation des imports de type explicitement : `import { type ReactNode, type ErrorInfo }`.
- Modification de `vite.config.ts` pour qu'il encapsule `vitest/config`.

## 27. Points restant à traiter
Aucun point bloquant technique. L'application React est amorcée et découplée. Prêt pour commencer à consommer l'API lors de l'intégration des features.

## 28. État final
**VALIDÉ**