# 📝 TP — Mini-plateforme de blog: BlogApi

## 🎯 Objectif

Développer une petite API REST pour gérer des articles de blog et leurs commentaires.  
L’API devra être codée **dans un seul fichier `app.js`**, sans routeurs, et utiliser des **fichiers `.json`** pour stocker les données.  
Les fonctionnalités seront enrichies étape par étape (CRUD, fichiers, middlewares, etc.).

---

## ✅ Pré-requis pédagogiques

Ce TP mobilise les compétences suivantes déjà vues en cours :

- Création d’un serveur Express
- Requêtes REST (GET, POST, PATCH, DELETE)
- Middleware personnalisé
- Middleware de gestion des erreurs

---

## Structure du projet

```
Parcours-BlogApi/
├── app.js
├── package.json
└── data/
    ├── posts.json
    └── comments.json

```

## 🚀 Partie 1 — Initialisation du projet

1. Placer vous dans le bon dossier correspondant au parcours dans votre terminal VS Code

2. Initialisez le projet Node avec la commande suivante pour créer le fichier `package.json` :

   ```bash
   npm init -y
    ```

3. Installer Express : 

    ```bash 
    npm install express
    ```

## 💾 Partie 2 — Manipulation des fichiers JSON

Les données sont stockées dans deux fichiers JSON situés dans le dossier `data` :

- `data/posts.json` — contient la liste des articles
- `data/comments.json` — contient les commentaires associés

### 🔄 Lecture et écriture des fichiers

Utilisez le module natif `fs` avec les fonctions synchrones `readFileSync` et `writeFileSync`.

1. Ajoutez ces fonctions utilitaires en haut de votre `app.js` :

```js
const fs = require('fs');

const readJson = (path) => {
  const raw = fs.readFileSync(path, 'utf-8');
  return JSON.parse(raw);
};

const writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};
```
2. Créez une fonction `afficherFichier` qui utilise `readJson` pour lire un fichier et afficher son contenu dans la console.

Exemple :

```js
    const afficherFichier = (chemin) => {
    const contenu = readJson(chemin);
    console.log(contenu);
    };
```

Essayer de lire le contenu de `data/posts.json`
Prenez une capture d'écran du résultat et mettez là dans `/captures`

## 🧩 Partie 3 — Routes REST à développer

Travaillez uniquement dans le fichier app.js.
Nous allons mettre en place les routes suivantes : 

### 📄 Routes pour les articles (posts)
| Méthode | URL         | Description                 |
| ------- | ----------- | --------------------------- |
| GET     | /posts      | Liste tous les articles     |
| GET     | /posts/\:id | Affiche un article          |
| POST    | /posts      | Crée un nouvel article      |
| PATCH   | /posts/\:id | Modifie un article existant |
| DELETE  | /posts/\:id | Supprime un article         |

### 💬 Routes pour les commentaires (comments)
| Méthode | URL                  | Description                         |
| ------- | -------------------- | ----------------------------------- |
| GET     | /posts/\:id/comments | Liste les commentaires d’un article |
| POST    | /posts/\:id/comments | Ajoute un commentaire               |
| DELETE  | /comments/\:id       | Supprime un commentaire             |


#### Rappel  de création d'une route 

##### 🟢 GET /posts

Retourne tous les articles.

```js 
app.get('/posts', (req, res) => {
  const posts = readJson('./data/posts.json');
  res.json(posts);
});
```


### ✅ Bonnes pratiques

À chaque requête :

- Lisez le fichier concerné avec readJson
- Modifiez les données dans votre code
- Réécrivez le fichier avec writeJson
- Utilisez try...catch pour éviter les crashs :

    ```js
    try {
    // vos opérations de lecture / écriture
    } catch (err) {
    next(err); // envoie l'erreur au middleware final
    }
    ```


## 📦 Livrables

À la fin du TP, vous devez :

- Avoir complété toutes les routes demandées dans le fichier app.js
- Avoir utilisé les fichiers /data/posts.json et /data/comments.json comme base de données locale.
- Avoir testé votre API via un client HTTP comme Thunder Client ou Postman.
- Avoir ajouté au moins une route pour chaque opération du CRUD (Create, Read, Update, Delete) sur les posts et les comments.

- Laisser les fonctions utilitaires readJson et writeJson en haut du fichier.

    Votre projet doit contenir :

    - le dossier data/ avec les fichiers posts.json et comments.json,

    - le dossier capture/ avec la capture demandée

    - le fichier app.js avec toutes les routes,

    - le fichier package.json,

    - un fichier .gitignore qui ignore les nodes-modules

💡 Important : vous devez pousser votre code sur votre dépôt GitHub personnel au plus tard dimanche 23H avec le lien sur Moodle. 

## 🎁 Bonus

Optionnel si vous vous ennuyez et que vous voulez aller au delà vous pouvez générer les routes suivantes :

    GET /posts?author=Alice → filtre par auteur

    GET /stats → retourne le nombre total d’articles et de commentaires

    DELETE uniquement autorisé si req.headers['x-user'] === 'admin'


## 🧪 Objectifs de fin de TP

- ✅ Toutes les routes REST fonctionnent

- ✅ Les fichiers posts.json et comments.json sont correctement mis à jour

- ✅ Les erreurs sont gérées sans crash

- ✅ Le code reste lisible et cohérent dans un seul fichier# Parcours-BlogApi
# Parcours-BlogApi
