const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Fonctions utilitaires
const readJson = (path) => {
  const raw = fs.readFileSync(path, 'utf-8');
  return JSON.parse(raw);
};

const writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

// Test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API du mini-blog !');
});


// ==============================
//          POSTS
// ==============================

const POSTS_PATH = './data/posts.json';

app.get('/posts', (req, res) => {
  const posts = readJson(POSTS_PATH);
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const posts = readJson(POSTS_PATH);
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post non trouvé' });
  res.json(post);
});

app.post('/posts', (req, res) => {
  const posts = readJson(POSTS_PATH);
  const newPost = {
    id: Date.now(),
    title: req.body.title || 'Titre par défaut',
    content: req.body.content || '',
    author: req.body.author || 'Anonyme'
  };
  posts.push(newPost);
  writeJson(POSTS_PATH, posts);
  res.status(201).json(newPost);
});

app.patch('/posts/:id', (req, res) => {
  const posts = readJson(POSTS_PATH);
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post non trouvé' });

  post.title = req.body.title ?? post.title;
  post.content = req.body.content ?? post.content;
  post.author = req.body.author ?? post.author;

  writeJson(POSTS_PATH, posts);
  res.json(post);
});

app.delete('/posts/:id', (req, res) => {
  let posts = readJson(POSTS_PATH);
  const initialLength = posts.length;
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  if (posts.length === initialLength) {
    return res.status(404).json({ error: 'Post non trouvé' });
  }
  writeJson(POSTS_PATH, posts);
  res.status(204).end();
});


// ==============================
//         COMMENTS
// ==============================

const COMMENTS_PATH = './data/comments.json';

app.get('/comments', (req, res) => {
  const comments = readJson(COMMENTS_PATH);
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const comments = readJson(COMMENTS_PATH);
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).json({ error: 'Commentaire non trouvé' });
  res.json(comment);
});

app.post('/comments', (req, res) => {
  const comments = readJson(COMMENTS_PATH);
  const newComment = {
    id: Date.now(),
    postId: req.body.postId || null,
    author: req.body.author || 'Anonyme',
    content: req.body.content || ''
  };
  comments.push(newComment);
  writeJson(COMMENTS_PATH, comments);
  res.status(201).json(newComment);
});

app.patch('/comments/:id', (req, res) => {
  const comments = readJson(COMMENTS_PATH);
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).json({ error: 'Commentaire non trouvé' });

  comment.author = req.body.author ?? comment.author;
  comment.content = req.body.content ?? comment.content;

  writeJson(COMMENTS_PATH, comments);
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  let comments = readJson(COMMENTS_PATH);
  const initialLength = comments.length;
  comments = comments.filter(c => c.id !== parseInt(req.params.id));
  if (comments.length === initialLength) {
    return res.status(404).json({ error: 'Commentaire non trouvé' });
  }
  writeJson(COMMENTS_PATH, comments);
  res.status(204).end();
});


// ==============================
//         Serveur
// ==============================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
