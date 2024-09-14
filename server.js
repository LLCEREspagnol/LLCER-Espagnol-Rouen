// Importer les modules nécessaires
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Créer une application Express
const app = express();
const PORT = 3000;

// Utiliser le middleware pour activer CORS et parser le body des requêtes
app.use(cors());
app.use(bodyParser.json());

// Définir le chemin du fichier où les commentaires seront stockés temporairement
const commentsFile = path.join(__dirname, 'comment.json');

// Route pour récupérer les commentaires (GET)
app.get('/comments', (req, res) => {
    fs.readFile(commentsFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture des commentaires :', err);
            return res.status(500).send('Erreur de lecture des commentaires');
        }

        try {
            const comments = JSON.parse(data);
            res.json(comments);
        } catch (parseError) {
            console.error('Erreur lors du parsing des commentaires :', parseError);
            res.status(500).send('Erreur de parsing des commentaires');
        }
    });
});

// Route pour ajouter un nouveau commentaire (POST)
app.post('/comments', (req, res) => {
    const newComment = {
        username: req.body.username,
        comment: req.body.comment,
        date: new Date().toLocaleString() // Ajouter la date du commentaire
    };

    fs.readFile(commentsFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture des commentaires :', err);
            return res.status(500).send('Erreur de lecture des commentaires');
        }

        let comments;
        try {
            comments = JSON.parse(data);
        } catch (parseError) {
            console.error('Erreur lors du parsing des commentaires :', parseError);
            comments = [];
        }

        comments.push(newComment);

        fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                console.error('Erreur d\'écriture des commentaires :', err);
                return res.status(500).send('Erreur d\'écriture du commentaire');
            }

            res.status(201).json(newComment);
        });
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});