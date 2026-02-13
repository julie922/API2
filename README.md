# API REST - H.C.C (Handball Club de Comines)

## 1 - Contexte

Le H.C.C, club de handball de la ville de Comines, etait un petit club local avec seulement quelques adherents. Les informations etaient echangees de maniere informelle, par le biais d'appels telephoniques et de messages textes. Mais depuis, le club a connu un developpement rapide, avec l'arrivee de nouveaux joueurs et l'expansion de son champ d'action.

Avec cette croissance, le club a besoin d'un systeme plus organise pour gerer ses adherents et ses evenements, tels que les matchs hebdomadaires. Il souhaite donc mettre en place un site internet et une application mobile pour promouvoir ses activites, avec un fil d'actualites et un espace membre pour les adherents.

## 2 - Besoins

Le H.C.C a pris la decision de mettre en place une **API REST** afin de fournir des informations en temps reel sur les matchs et les evenements, ainsi que des mises a jour regulieres sur les actualites du club. Public et adherents pourront ainsi s'informer sur le club a travers son futur site internet et son application mobile.

## 3 - Exigences techniques

| Technologie | Utilisation |
|---|---|
| **NestJS** | Framework backend |
| **SQLite** | Base de donnees locale (via `better-sqlite3`) |
| **TypeORM** | ORM pour les interactions avec la base de donnees |
| **JWT** | Authentification par tokens |
| **bcrypt** | Hashage des mots de passe |

L'API prend en compte **3 aspects fonctionnels** :
- Gestion de l'authentification
- Gestion des actualites
- Gestion des matchs

## 4 - Specifications fonctionnelles et regles de gestion

### 4.1 Authentification

- Un adherent peut avoir le role **coach**, **contributeur** ou **joueur**
- Un utilisateur peut se creer un compte adherent, son compte sera valide par le club
- Les adherents s'authentifient avec un email et un mot de passe et recoivent un token JWT

### 4.2 Gestion des adherents

- Seuls les adherents ayant le role **joueur** peuvent s'inscrire aux matchs
- Les adherents peuvent s'inscrire a plusieurs matchs
- Les adherents peuvent se desinscrire des matchs auxquels ils se sont inscrits
- L'API retourne les infos des adherents (nom, prenom, date d'inscription, matchs)

### 4.3 Gestion des actualites

- Seuls les adherents ayant le role **contributeur** peuvent publier des actualites
- L'API retourne les actualites avec les infos de l'auteur

### 4.4 Gestion des matchs

- Seul un adherent **coach** peut creer et modifier des matchs (ex: scores)
- Un match contient un adversaire et un score final
- Il ne peut pas y avoir un match le meme jour
- L'API retourne les matchs avec la liste des participants

## 5 - Structure du projet

```
src/
  ├── main.ts                       # Point d'entree
  ├── app.module.ts                 # Module racine
  ├── entities/                     # Entites TypeORM
  │   ├── adherent.entity.ts
  │   ├── match.entity.ts
  │   └── news.entity.ts
  ├── auth/                         # Authentification
  │   ├── auth.module.ts
  │   ├── auth.service.ts
  │   ├── auth.controller.ts
  │   ├── roles.decorator.ts
  │   ├── dto/
  │   │   ├── register.dto.ts
  │   │   └── login.dto.ts
  │   ├── guards/
  │   │   ├── jwt-auth.guard.ts
  │   │   └── roles.guard.ts
  │   └── strategies/
  │       └── jwt.strategy.ts
  ├── adherents/                    # Gestion des adherents
  │   ├── adherents.module.ts
  │   ├── adherents.service.ts
  │   └── adherents.controller.ts
  ├── matchs/                       # Gestion des matchs
  │   ├── matchs.module.ts
  │   ├── matchs.service.ts
  │   ├── matchs.controller.ts
  │   └── dto/
  │       ├── create-match.dto.ts
  │       └── update-match.dto.ts
  └── news/                         # Gestion des actualites
      ├── news.module.ts
      ├── news.service.ts
      ├── news.controller.ts
      └── dto/
          ├── create-news.dto.ts
          └── update-news.dto.ts
```

## 6 - Endpoints de l'API

### Authentification (`/auth`)

| Methode | Route | Description | Acces |
|---|---|---|---|
| POST | `/auth/register` | Creer un compte adherent | Public |
| POST | `/auth/login` | Se connecter et obtenir un token JWT | Public |

### Adherents (`/adherents`)

| Methode | Route | Description | Acces |
|---|---|---|---|
| GET | `/adherents` | Liste de tous les adherents | Public |
| GET | `/adherents/:id` | Details d'un adherent | Public |
| PATCH | `/adherents/:id/valider` | Valider un compte adherent | Coach |
| POST | `/adherents/matchs/:matchId/inscription` | S'inscrire a un match | Joueur (JWT) |
| DELETE | `/adherents/matchs/:matchId/desinscription` | Se desinscrire d'un match | Adherent (JWT) |

### Matchs (`/matchs`)

| Methode | Route | Description | Acces |
|---|---|---|---|
| GET | `/matchs` | Liste de tous les matchs + participants | Public |
| GET | `/matchs/:id` | Details d'un match + participants | Public |
| POST | `/matchs` | Creer un match | Coach |
| PATCH | `/matchs/:id` | Modifier un match (score, etc.) | Coach |
| DELETE | `/matchs/:id` | Supprimer un match | Coach |

### Actualites (`/news`)

| Methode | Route | Description | Acces |
|---|---|---|---|
| GET | `/news` | Liste de toutes les actualites | Public |
| GET | `/news/:id` | Details d'une actualite | Public |
| POST | `/news` | Publier une actualite | Contributeur |
| PATCH | `/news/:id` | Modifier une actualite | Contributeur |
| DELETE | `/news/:id` | Supprimer une actualite | Contributeur |

## 7 - Installation et lancement

```bash
# Installer les dependances
npm install

# Lancer en mode developpement
npm run start:dev

# Lancer les tests unitaires
npm run test

# Lancer les tests e2e
npm run test:e2e
```

L'API demarre sur `http://localhost:3000`.
