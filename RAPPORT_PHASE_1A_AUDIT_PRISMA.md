# RAPPORT PHASE 1A — AUDIT PRISMA

## 1. Fichier analysé
`prisma/schema.prisma`

## 2. Validation syntaxique
**PASS**
Le schéma a été formaté (`npx prisma format`) et le client a été généré sans erreur avec la version 5 de Prisma. Aucune erreur de syntaxe ou de relation orpheline détectée par le compilateur Prisma.

## 3. Nombre de modèles
34 modèles (NiveauEnseignement, IA, IEF, Etablissement, Filiere, Metier, Discipline, MetierDiscipline, NiveauQualification, Competence, ElementDeCompetence, ObjectifSpecifique, Specialisation, ChampPratique, ValeurChampPratique, User, Role, Permission, RolePermission, Session, PasswordResetToken, DemandeInscription, ValidationInscription, Practice, PratiquePedagogiqueInspecteur, ReactionPedagogique, PracticeSpecialisation, Ressource, EvaluationPratique, PracticeConsultation, CommentairePratique, ReactionPratique, Favorite, UserCollection, CollectionItem, Notification, Conversation, ConversationParticipant, MessagePrive, SignalementPratique, AuditLog, AIPromptTemplate, AIGenerationLog, TutorielRapide, EmailTemplate, EmailLog, PlatformConfig).

## 4. Nombre d'enums
19 enums.

## 5. Relations principales
- **1-N (Un à Plusieurs) :**
  - IA → IEF
  - IEF → Etablissement
  - Filiere → Metier
  - Metier → Competence
  - Competence → ElementDeCompetence
  - ElementDeCompetence → ObjectifSpecifique
  - User → Practices, Commentaires, Ressources, etc.
- **N-N (Plusieurs à Plusieurs) implémentées par tables de jonction :**
  - Metier ↔ Discipline (MetierDiscipline)
  - Role ↔ Permission (RolePermission)
  - Practice ↔ Specialisation (PracticeSpecialisation)
  - Practice ↔ Inspecteur (PratiquePedagogiqueInspecteur)
  - Conversation ↔ User (ConversationParticipant)

## 6. Contraintes
Les contraintes relationnelles (`onDelete`) sont définies :
- Cascade : Pour les éléments dépendants stricts (ex: Metier → Competence, Practice → Ressource).
- Restrict / SetNull : Pour préserver l'historique ou interdire des suppressions destructrices (ex: Etablissement → Practice (`SetNull`), IA → IEF (`Restrict`)).
- Les clés étrangères et uniques composées sont correctement placées.

## 7. Index
Le modèle contient de nombreux index (`@@index`) sur les clés étrangères et sur les champs fréquemment filtrés (ex: `statut`, `statutPublication`, `categorie`, `createdAt`), optimisant les requêtes et les jointures potentielles.

## 8. Cohérence institutionnelle
**PASS**
La chaîne `NiveauEnseignement` → `IA` → `IEF` → `Etablissement` est bien modélisée.
*Observation :* L'application de contraintes métier strictes (ex: garantir qu'un IEF affecté à un Etablissement appartient bien au même `NiveauEnseignement` que l'Etablissement) nécessitera une vérification via l'API, car le schéma de la base de données seul (via Prisma) ne peut imposer ce type d'intégrité conditionnelle complexe.

## 9. Cohérence référentiel FPT
**PASS**
La chaîne hiérarchique `Filiere` → `Metier` → `Competence` → `ElementDeCompetence` → `ObjectifSpecifique` est correcte en termes de clés.
*Observation :* Même constat que pour l'institution, le back-end devra garantir l'intégrité de l'arbre lors de la création d'un élément (ex: qu'un objectif est bien rattaché au bon élément lui-même dans la bonne compétence).

## 10. Cohérence Practice ↔ Référentiel
**ATTENTION**
La table `Practice` possède des relations directes (`filiereId`, `metierId`, `competenceId`, etc.).
*Observation :* Une contrainte stricte au niveau de la DB pour empêcher par exemple d'avoir `metierId` de Filière A avec `competenceId` du Métier B est impossible via Prisma standard. **Cette règle nécessite une validation métier stricte au niveau de l'API NestJS** pour éviter des données incohérentes.

## 11. Authentification / utilisateurs
**PASS**
Les modèles `User`, `Role`, `Permission` gèrent bien la structure RBAC (Role ≠ Permission).
Le workflow `DemandeInscription` (En attente, confirmé, validé) est bien représenté.

## 12. Risques identifiés
| Règle                              | Garantie DB/Prisma | Nécessite API | Observation |
| ---------------------------------- | ------------------ | ------------- | ----------- |
| IA appartient à un niveau          | Oui                | Non           | Défini par la relation `NiveauEnseignement` |
| IEF appartient à une IA            | Oui                | Non           | Défini par `iaId` |
| Etablissement appartient à un IEF  | Oui                | Non           | Défini par `iefId` |
| Cohérence Niveau Etablissement / IEF| Non               | Oui           | Le backend devra s'assurer de l'alignement (`niveauEnseignementId` commun) |
| Métier appartient à une Filière    | Oui                | Non           | |
| Compétence appartient au Métier    | Oui                | Non           | |
| Élément appartient à la Compétence | Oui                | Non           | |
| Objectif appartient à l'Élément    | Oui                | Non           | |
| Cohérence complète d'une pratique  | Non                | Oui           | Risque: Pratique associée à un métier qui n'appartient pas à la filière choisie. Validation API impérative. |
| Workflow inscription               | Non                | Oui           | Le schéma fournit les status, l'API contrôlera les transitions. |
| Permissions selon rôle             | Oui                | Non           | Géré par `RolePermission` |

- **Risque potentiel :** L'usage d'une hiérarchie très plate (toutes les clés sur la table Practice) pour simplifier les requêtes augmente le risque d'incohérence si l'API ne blinde pas la validation. (Classé: IMPORTANT).

## 13. Corrections proposées
Aucune correction structurelle du modèle n'est nécessaire pour l'instant, le schéma est solide et correspond au besoin. Les validations mentionnées (risques) devront être prises en compte dans le développement de l'API NestJS.

## 14. Corrections réellement effectuées
Aucune. Le modèle a été intégré exactement comme fourni.

## 15. Fichiers modifiés
- `prisma/schema.prisma` (création avec le contenu fourni)
- `.gitignore` (ajout de node_modules/ suite aux tests syntaxiques)
- `package.json` et `pnpm-workspace.yaml` (indirectement via ajout du paquet prisma en root).

## 16. Fichiers créés
- `RAPPORT_PHASE_1A_AUDIT_PRISMA.md`

## 17. Tests exécutés
- Formatage Prisma (`npx prisma format`)
- Génération du client (`npx prisma generate`)

## 18. Résultat final
**VALIDÉ AVEC RÉSERVES** (Réserves concernant la nécessité de garantir l'intégrité des données croisées au niveau de l'API).
