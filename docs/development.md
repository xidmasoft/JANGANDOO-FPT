# Guide de Développement - JANGANDOO FPT

Ce document décrit le flux de travail et les bonnes pratiques de développement sur le projet.

## 1. Principes Généraux

- **Développement Progressif :** Procéder étape par étape. Ne jamais essayer de générer de grandes parties du projet d'un coup.
- **Qualité avant la Vitesse :** Ne jamais contourner les tests ou les vérifications TypeScript pour gagner du temps.
- **Transparence :** Documenter les décisions importantes dans `docs/decisions/`.

## 2. Flux de Travail pour une Nouvelle Fonctionnalité

1. **Analyse :** Inspecter l'existant (code, dépendances, configuration).
2. **Planification :** Établir un plan clair et détaillé.
3. **Implémentation :** Coder la fonctionnalité avec une portée bien définie.
4. **Tests :** Écrire ou mettre à jour les tests automatisés correspondants.
5. **Validation :**
   - Exécuter les tests.
   - Vérifier l'absence d'erreurs TypeScript (pas de `any` injustifié).
   - Vérifier le build.
   - Vérifier les migrations de la BDD si le schéma Prisma a été modifié.
6. **Documentation :** Mettre à jour la documentation et/ou créer un ADR.
7. **Rapport :** Fournir un rapport décrivant les modifications.

## 3. Gestion de la Base de Données

Le fichier `prisma/schema.prisma` est sacré. C'est la **SOURCE DE VÉRITÉ** absolue.
- Ne **JAMAIS** modifier ce fichier pour accommoder un besoin purement frontend ou sans avoir analysé l'impact sur le modèle métier global.
- Si une modification est jugée nécessaire, justifiez-la et attendez une validation explicite avant de l'appliquer.

## 4. Scripts Utiles

Les scripts de base sont configurés dans le `package.json` à la racine pour interagir avec les espaces de travail.

Commandes spécifiques à l'API (`apps/api`) :
- `pnpm dev:api` : Lance l'API NestJS en mode développement
- `pnpm build:api` : Compile l'API NestJS
- `pnpm test:api` : Exécute les tests unitaires de l'API

Commandes spécifiques au Frontend (`apps/web`) :
- `pnpm dev:web` : Lance le serveur de développement Vite
- `pnpm build:web` : Effectue la vérification de type et compile React/Vite
- `pnpm lint:web` : Lance Oxlint sur le code frontend
- `pnpm test:web` : Exécute Vitest pour l'application frontend

Commandes Prisma :
- `pnpm prisma:generate` : Génère le Prisma Client à partir de `prisma/schema.prisma`
