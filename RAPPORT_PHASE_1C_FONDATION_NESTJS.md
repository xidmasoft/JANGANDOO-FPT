# RAPPORT PHASE 1C

## 1. Objectif
Construire uniquement la fondation technique du backend NestJS (`apps/api`) sans aucune fonctionnalité métier, mais prête à l'emploi (PrismaService, validation, configuration, health check).

## 2. État initial
L'architecture de base existait (Monorepo), mais le dossier `apps/api` était vierge. La configuration de PostgreSQL et de Prisma Client (v5.22.0) était déjà présente à la racine et testée.

## 3. Version NestJS
12.0.3

## 4. Version Node
22.22.1

## 5. Version TypeScript
6.0.3

## 6. Version Prisma
5.22.0

## 7. Architecture backend
Création d'une application NestJS standard via la CLI dans `apps/api/`. Les configurations TS, Vitest, et linting ont été respectées. L'application possède les modules `app`, `database`, et `health`.

## 8. PrismaService
Créé dans `apps/api/src/database/prisma.service.ts`. Il étend `PrismaClient` et gère `$connect` via l'interface `OnModuleInit`.

## 9. DatabaseModule
Créé dans `apps/api/src/database/database.module.ts`. Il fournit et exporte `PrismaService` et a été tagué avec `@Global()` pour le rendre accessible dans tout le projet backend sans import manuel constant, afin d'éviter les dépendances circulaires.

## 10. Configuration
`@nestjs/config` a été installé. Dans `app.module.ts`, `ConfigModule.forRoot` est appelé avec une validation `Joi` exigeant `DATABASE_URL` et définissant des valeurs par défaut pour `PORT` et `NODE_ENV`.

## 11. API prefix/versioning
L'API est configurée (`main.ts`) avec un préfixe global : `/api/v1`.

## 12. CORS
Le CORS est activé de base dans `main.ts` et restreint selon l'environnement de développement : ouvert sur `*` en `NODE_ENV=development` et fermé sinon.

## 13. Validation globale
`ValidationPipe` a été installé de façon globale dans `main.ts` (`whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`).

## 14. Gestion des erreurs
Par défaut de NestJS. Les messages de validation de classe ne remonteront pas les logs Prisma bruts puisqu'elles s'arrêteront au niveau de la requête (grâce au `ValidationPipe`).

## 15. Logging
Le logger par défaut de NestJS est en place et documente le démarrage du serveur (ex: `Application is running on...`).

## 16. Health check
Un `HealthController` a été créé dans `apps/api/src/health/health.controller.ts`. Accessible via `GET /api/v1/health`, il retourne `{ status: 'ok' }`.

## 17. Tests
Les tests unitaires standards NestJS ont été exécutés, ainsi que le test `e2e` `app.e2e-spec.ts`.
Ce dernier a été mis à jour avec `vitest` (la CLI moderne de Nest) pour s'assurer que le test de santé (health check) passe et que `PrismaService` soit mocké lors du lancement (via `vi.fn().mockResolvedValue(true)`) pour éviter une erreur d'initiation Prisma sur une BDD inexistante en CI.

## 18. Scripts
Les scripts du `package.json` de la racine utilisent `pnpm --filter api ...`.
- `dev:api`
- `build:api`
- `test:api`

## 19. Dépendances ajoutées
Dans `apps/api/package.json` :
- `@nestjs/config`
- `class-validator`
- `class-transformer`
- `joi`
- `@prisma/client` (v5.22.0)

## 20. Fichiers créés
- `RAPPORT_PHASE_1C_FONDATION_NESTJS.md`
- Code NestJS standard généré dans `apps/api/` (`main.ts`, `app.module.ts`, `prisma.service.ts`, `database.module.ts`, `health.controller.ts`, configs Nest).

## 21. Fichiers modifiés
- `docs/architecture.md`
- `docs/development.md`

## 22. Problèmes rencontrés
Lors des tests e2e, le `PrismaService` tentait de se connecter réellement à la base de données.

## 23. Solutions
Mock de `$connect` via `vi.fn()` et injection d'environnement par défaut dans `beforeEach()` au sein de `app.e2e-spec.ts`.

## 24. Points restant à traiter
Aucun point bloquant technique. L'API est prête à accueillir les endpoints métiers et l'authentification lors des prochaines phases.

## 25. État final
**VALIDÉ**
