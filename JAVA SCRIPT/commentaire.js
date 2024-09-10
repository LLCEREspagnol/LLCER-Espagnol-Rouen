// Installe Express avec: npm install express
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Servir les fichiers HTML et JS

// Stocker les commentaires en mémoire (cela peut être remplacé par une base de données)
let comments = [];

// Route pour poster un commentaire
app.post('/comments', (req, res) => {
    const { author, content } = req.body;
    
    if (!author || !content) {
        return res.status(400).json({ error: 'Author and content are required' });
    }

    const comment = { author, content, date: new Date() };
    comments.push(comment);

    res.json(comment);  // Renvoie le commentaire ajouté pour confirmation
});

// Route pour récupérer tous les commentaires
app.get('/comments', (req, res) => {
    res.json(comments);  // Renvoie tous les commentaires
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
