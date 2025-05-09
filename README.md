
# Portofolio Airtable API

## Description

Ce projet est une application permettant de gérer des projets étudiants. L'interface permet aux utilisateurs de consulter des projets, de les liker et de consulter des détails. L'admin peut ajouter, modifier et supprimer des projets. Ce projet utilise Airtable pour stocker les données.

## Technologies utilisées

- **Backend** : Node.js, Express
- **Frontend** : Vue.js, Vite
- **Base de données** : Airtable
- **Authentification** : JWT (JSON Web Token)
- **Gestion des erreurs** : Middleware personnalisé pour la gestion des tokens JWT

## Prérequis

Avant de commencer, assurez-vous d’avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) version 14.x ou supérieure
- [NPM](https://www.npmjs.com/) (ou Yarn)
- [Airtable API Key](https://airtable.com/account) et les détails de votre base Airtable
- [Postman](https://www.postman.com/) (pour tester les APIs)

---

## Installation

### 1. **Cloner le repository**

Clonez le projet sur votre machine locale :

```bash
git clone https://github.com/jphayek/Airtable-api.git
cd nom-du-projet
```

### 2. **Installer les dépendances**

Dans le répertoire du projet, installez les dépendances backend et frontend :

```bash
# Installation des dépendances backend
npm install
# Si vous avez un frontend séparé
cd portfolio
npm install
```

### 3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet (ou modifiez-le si déjà existant) avec les variables suivantes :

```bash
# Fichier .env
AIRTABLE_API_KEY=patyORbdEPzFoTgBc.cff06b0482d8c80adbdb38750e049fee654c10dc338fb85e5dad3d4584749767
AIRTABLE_BASE_ID=appixTPSYVaBcV3QM
AIRTABLE_TABLE_NAME=Projets
PORT=5000
JWT_SECRET=ma_clé_ultra_secrète_que_personne_ne_devine
JWT_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0MTk1NzYwNiwiZXhwIjoxNzQxOTYxMjA2fQ.6ilv44TE5Hrw-_ZU-2X2uq35cIWuqh9xUKjGW6GLyjA
NODE_ENV=development
```


### 4. **Lancer le projet**

Pour démarrer le serveur backend :

```bash
node .\server.js
```

Cela démarre le serveur backend sur `http://localhost:5000`.

Si vous avez un frontend, vous pouvez également démarrer le frontend avec :

```bash
npm run dev
```

Cela démarre l'application frontend sur `http://localhost:5173/` (par défaut).

---
## Deux comptes à utiliser :

# admin et user
les deux ils ont le même mot de passe "password123"




---

## API Endpoints

### **GET /api/projects/projets**

Récupère tous les projets.

- **Réponse** : Liste des projets
- **Exemple** :
  ```json
  [
    {
      "id": "recUdMOs0cq7t65ar",
      "fields": {
        "Nom": "Projet 1",
        "Description": "Description du projet",
        "Technos": ["Vue.js", "Node.js"],
        "Lien": "http://example.com",
        "Promo": "2025",
        "Catégorie": "Web"
      }
    },
    ...
  ]
  ```

### **POST /api/projects/projets/:id/like**

Permet à un utilisateur de liker un projet. Le `userId` doit être envoyé dans le corps de la requête.

- **Paramètre** : `id` (ID du projet)
- **Body** :
  ```json
  {
    "userId": "user-123"
  }
  ```
- **Réponse** : Le projet mis à jour avec les likes
- **Erreur** : 400 si le projet est déjà liké par l'utilisateur.

### **POST /api/projects/projets**

Ajoute un nouveau projet.

- **Body** :
  ```json
  {
    "nom": "Nom du projet",
    "description": "Description du projet",
    "technos": ["Vue.js", "Node.js"],
    "lien": "http://example.com",
    "promo": "2025",
    "categorie": "Web"
  }
  ```

- **Réponse** : Détails du projet ajouté

---

## Authentification

Le projet utilise un système d'authentification JWT pour valider les utilisateurs. Le token doit être envoyé dans l'en-tête `Authorization` sous la forme `Bearer <token>`.

### Exemple d'utilisation du token JWT

Dans Postman, ajoutez les headers suivants pour tester les routes protégées :

| Key             | Value                           |
|-----------------|---------------------------------|
| Authorization   | Bearer <votre_token_JWT>        |

---

## Erreurs

Les erreurs possibles incluent :

- **401 Unauthorized** : Si le token JWT est absent ou invalide.
- **403 Forbidden** : Si le format du token est incorrect ou si l'utilisateur tente de liker un projet déjà liké.
- **404 Not Found** : Si le projet demandé n'existe pas.

---

## Contribution

Si vous souhaitez contribuer à ce projet, voici comment procéder :

1. Fork ce repository.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-fonctionnalite`).
3. Commitez vos modifications (`git commit -am 'Ajout de ma fonctionnalité'`).
4. Poussez vos changements sur votre fork (`git push origin feature/nom-de-la-fonctionnalite`).
5. Créez une pull request pour discuter de vos modifications.

---

## Auteurs

- **Nom de l'auteur principal** - [Jphayek](https://github.com/jphayek)

---

