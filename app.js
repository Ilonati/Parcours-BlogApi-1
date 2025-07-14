const express = require('express');
const fs = require('fs');
const app1 = express();

app.use(express.json());

// Fonctions utilitaires  lire/écrire des fichiers JSON 

// Test de démarrage
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API du mini-blog !');
});

// Routes à compléter ici

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware  parser le corps des requêtes en JSON
app.use(express.json());

// Fonctions utilitaires  lire et écrire dans les fichiers JSON
const readJson = (path) => {
  const raw = fs.readFileSync(path, 'utf-8');
  return JSON.parse(raw);
};

const writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

// Fonction  afficher le contenu d'un fichier JSON dans la console
const afficherFichier = (chemin) => {
  const contenu = readJson(chemin);
  console.log(contenu);
};

//  éviter le Cannot GET quand j'ouvre le localhoost sur internet
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Blog !');
});

//  lister tous les articles
app.get('/posts', (req, res) => {
  try {
    const posts = readJson('./data/posts.json');
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

//  afficher un article au choix
app.get('/posts/:id', (req, res) => {
  try {
    const posts = readJson('./data/posts.json');
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Article non trouvé');
    }
  } catch (err) {
    next(err);
  }
});

//  créer un nouvel article
app.post('/posts', (req, res) => {
  try {
    const posts = readJson('./data/posts.json');
    const newPost = req.body;
    posts.push(newPost);
    writeJson('./data/posts.json', posts);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

// modifier un article qui existe déjà
app.patch('/posts/:id', (req, res) => {
  try {
    const posts = readJson('./data/posts.json');
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
      Object.assign(post, req.body);
      writeJson('./data/posts.json', posts);
      res.json(post);
    } else {
      res.status(404).send('Article non trouvé');
    }
  } catch (err) {
    next(err);
  }
});

//  supprimer un article
app.delete('/posts/:id', (req, res) => {
  try {
    let posts = readJson('./data/posts.json');
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    writeJson('./data/posts.json', posts);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

//  lister les commentaires d'un article
app.get('/posts/:id/comments', (req, res) => {
  try {
    const comments = readJson('./data/comments.json');
    const filteredComments = comments.filter(c => c.postId === parseInt(req.params.id));
    res.json(filteredComments);
  } catch (err) {
    next(err);
  }
});

// ajouter un commentaire
app.post('/posts/:id/comments', (req, res) => {
  try {
    const comments = readJson('./data/comments.json');
    const newComment = { ...req.body, postId: parseInt(req.params.id) };  // ajoute ID de l'article
    comments.push(newComment);
    writeJson('./data/comments.json', comments);
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
});

//  supprimer un commentaire
app.delete('/comments/:id', (req, res) => {
  try {
    let comments = readJson('./data/comments.json');
    comments = comments.filter(c => c.id !== parseInt(req.params.id));
    writeJson('./data/comments.json', comments);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose a mal tourné!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});