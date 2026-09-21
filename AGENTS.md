# AGENTS.md - Règles Permanentes du Projet JANGANDOO FPT

## Description Générale
JANGANDOO FPT ("Apprendre ensemble") est une "Communauté pédagogique virtuelle intelligente de la Formation Professionnelle et Technique". Le projet est une application full-stack construite pour le domaine de la Formation Professionnelle et Technique (FPT) au Sénégal.

Ce n'est **PAS** une simple application CRUD. C'est une plateforme professionnelle, institutionnelle, pédagogique et collaborative.

---

## 1. Stack Technique Obligatoire

### Frontend
- **Framework :** React, Vite
- **Langage :** TypeScript
- **Routage :** React Router
- **Style :** CSS moderne (architecture composants)
- **Principes :** Responsive design, Accessibilité, UX/UI professionnelle

### Backend
- **Framework :** NestJS, Node.js
- **Langage :** TypeScript
- **Architecture :** REST API, DTO, Guards, Validation, RBAC, Architecture modulaire
- **Authentification :** JWT

### Base de Données
- **Moteur :** PostgreSQL
- **ORM :** Prisma (Le fichier `prisma/schema.prisma` est la **SOURCE DE VÉRITÉ**)

### Outils & Gestion de Projet
- pnpm, Git, GitHub
- Tests automatisés
- Documentation
- Docker (lorsque pertinent)

---

## 2. Règle de la Source de Vérité des Données

Le fichier `prisma/schema.prisma` défini est la **SOURCE DE VÉRITÉ** du modèle métier.
Vous devez utiliser **exactement** les modèles, enums, relations et contraintes définis dans ce schéma.

**INTERDICTIONS FORMELLES :**
- NE PAS inventer de modèles métier ou de relations.
- NE PAS supprimer de relations.
- NE PAS modifier arbitrairement les enums.
- NE PAS ajouter des champs métier uniquement pour faciliter le frontend.
- NE PAS remplacer les relations Prisma par des relations fictives.
- NE PAS créer une seconde représentation concurrente du domaine.

**Protocole de modification :**
Si une modification semble nécessaire :
1. Ne pas modifier immédiatement le schéma.
2. Identifier le problème.
3. Expliquer pourquoi le schéma actuel ne permet pas la fonctionnalité.
4. Proposer la modification.
5. Attendre la validation explicite avant d'appliquer.

---

## 3. Cohérence Métier

Respecter **impérativement** les chaînes métier. Ces règles doivent être garanties **côté backend** :

- **Organisation :** `NiveauEnseignement` → `IA` → `IEF` → `Etablissement`
- **Référentiel FPT :** `Filiere` → `Metier` → `Competence` → `ElementDeCompetence` → `ObjectifSpecifique`
- **Relation Métier/Discipline :** `Metier` ↔ `MetierDiscipline` ↔ `Discipline`
- **Pratique :** `Practice` → `Filiere` → `Metier` → `Competence` → `ElementDeCompetence` → `ObjectifSpecifique` → `NiveauQualification`

**Exemples de contraintes :**
- Un `ElementDeCompetence` sélectionné doit appartenir à la `Competence` sélectionnée.
- Un `Metier` sélectionné doit appartenir à la `Filiere` sélectionnée.

---

## 4. UX/UI Professionnelle

L'interface doit donner une impression de plateforme institutionnelle moderne, sérieuse et humaine.

**À Privilégier :**
- Hiérarchie visuelle forte, typographie lisible, espace blanc.
- Navigation claire, composants cohérents, formulaires pédagogiques.
- Gestion explicite des états (loading/empty/error/success).
- Responsive design, accessibilité, navigation clavier, contraste suffisant.

**À Éviter :**
- Design générique généré par IA, accumulation de cartes, glassmorphism excessif.
- Gradients décoratifs inutiles, animations excessives, interfaces surchargées.
- Dashboards ressemblant à des templates SaaS génériques.

---

## 5. Philosophie et Règles de Développement

- **Développement Progressif :** Ne jamais générer tout le projet en une seule opération.
- Chaque phase doit :
  1. Analyser l'existant.
  2. Produire un plan.
  3. Implémenter une portée clairement définie.
  4. Écrire ou mettre à jour les tests.
  5. Exécuter les tests.
  6. Vérifier les erreurs TypeScript.
  7. Vérifier le build.
  8. Vérifier les migrations (si applicable).
  9. Documenter les décisions.
  10. Fournir un rapport final.
- **Règles Strictes :**
  - Ne **jamais** masquer une erreur.
  - Ne **pas** désactiver les tests pour faire passer le build.
  - Ne **pas** contourne les erreurs TypeScript avec `any` sans justification.
  - Ne **pas** supprimer une fonctionnalité pour faire passer les tests.
- **Avant toute modification importante :** Inspecter le dépôt, vérifier les dépendances, identifier les risques et proposer un plan.
- **Push automatique interdit :** Ne faire aucun push sans demande explicite.