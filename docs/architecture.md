# Architecture Technique - JANGANDOO FPT

Ce document décrit l'architecture technique de la plateforme JANGANDOO FPT.

## 1. Organisation en Monorepo

Le projet utilise `pnpm` et une architecture de monorepo pour partager le code entre le frontend, le backend et les différents packages.

```
/
├── apps/
│   ├── web/        # Frontend React/Vite
│   └── api/        # Backend NestJS
├── packages/
│   ├── ui/         # Composants UI partagés
│   ├── types/      # Types TypeScript partagés
│   └── config/     # Configurations partagées (ESLint, TSConfig, etc.)
├── prisma/
│   ├── schema.prisma # Source de vérité de la base de données
│   └── seed/       # Scripts de peuplement de la BDD
├── docs/           # Documentation
│   └── decisions/  # Architecture Decision Records (ADR)
└── tests/          # Tests de bout en bout (E2E)
```

## 2. Stack Technique Détaillée

### Frontend (`apps/web`)
- **React 19+**
- **Vite** comme bundler (rapide et moderne)
- **TypeScript** pour le typage fort et strict.
- **React Router** pour le routage côté client.
- **Tailwind CSS v3** pour le design system et l'UI (avec une palette de couleurs stricte FPT : Primary `#005f73`).
- Vitest pour l'exécution des tests.
- ErrorBoundary englobant pour protéger l'UI.
- Focus sur : Architecture de composants, Responsive Design, Accessibilité, UX/UI professionnelle et sobre (pas d'animations superflues).

### Backend (`apps/api`)
- **Node.js**
- **NestJS** pour sa structure modulaire et robuste (similaire à Angular)
- **TypeScript** (mode strict)
- **REST API** (Préfixe global `/api/v1`)
- **Validation** via `class-validator` et `ValidationPipe` global. Configuration validée via `Joi`.
- **Database** via un `DatabaseModule` global exportant `PrismaService` pour orchestrer le cycle de vie du client Prisma.
- **DTOs & Guards** pour la validation des données entrantes et la sécurité
- **Authentification :** JWT
- **Autorisation :** RBAC (Role-Based Access Control)

### Base de Données
- **SGBD :** PostgreSQL
- **ORM :** Prisma
- La conception de la base de données est définie de manière stricte dans `prisma/schema.prisma` qui est la source de vérité absolue pour tous les modèles métiers.

## 3. Flux de Données
1. Le client web (React) communique avec l'API (NestJS) via des appels REST.
2. L'API valide les requêtes via des DTO et des Guards.
3. L'API utilise Prisma pour interagir avec la base de données PostgreSQL.
4. Les réponses sont renvoyées au client sous format JSON.
