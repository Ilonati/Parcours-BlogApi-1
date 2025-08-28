// const express = require('express');
// const fs = require('fs');
// const app1 = express();

// app.use(express.json());

// Fonctions utilitaires  lire/écrire des fichiers JSON 


// Test de démarrage
// app.get('/', (req, res) => {
//   res.send('Bienvenue sur l’API du mini-blog !');
// });

// Routes à compléter ici

// Lancement du serveur



const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware  parser le corps des requêtes en JSON
app.use(express.json());

// Fonctions utilitaires pour lire/écrire des fichiers JSON à placer ici

// Test de démarrage
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
  const id = parseInt(req.params.id);
  const pathPost = './data/posts.json';
  const posts = readJson(pathPost);
  const post = posts.find(p => p.id === id)
  if (!post) {
    res.status(404).send('Non trouve');
    res.json(post);
  }
});
// try {
//   const posts = readJson('./data/posts.json');
//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (post) {
//     res.json(post);
//   } else {
//     res.status(404).send('Article non trouvé');
//   }
// } catch (err) {
//   next(err);
// }


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

  const id = parseInt(req.params.id);
  const posts = readJson('./data/posts.json');
  posts.filter(p => p.id !== id);
  writeJson('./data/posts.json', posts);
  // try {
  //   let posts = readJson('./data/posts.json');
  //   posts = posts.filter(p => p.id !== parseInt(req.params.id));
  //   writeJson('./data/posts.json', posts);
  //   res.status(204).send();
  // } catch (err) {
  //   next(err);
  // }
});

// Routes à compléter ici

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});