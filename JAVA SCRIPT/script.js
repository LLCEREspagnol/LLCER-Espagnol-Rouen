document.addEventListener('DOMContentLoaded', function () {
    loadComments();
});

document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let username = document.getElementById('username').value.trim();
    let comment = document.getElementById('comment').value.trim();

    if (username && comment) {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                comment: comment,
            }),
        })
        .then(response => response.json())
        .then(data => {
            appendComment(data);
            document.getElementById('commentForm').reset();
        })
        .catch(error => {
            console.error('Erreur lors du chargement des commentaires :', error);
            document.getElementById('comments').innerHTML = '<p>Une erreur est survenue lors du chargement des commentaires. Veuillez réessayer.</p>';
        });
        
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});


function loadComments() {
    // Charger les commentaires à partir du serveur Node.js
    fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then(data => {
            let commentSection = document.getElementById('comments');
            commentSection.innerHTML = '';

            data.forEach(comment => {
                appendComment(comment);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

function appendComment(comment) {
    let commentSection = document.getElementById('comments');
    let commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<strong>${comment.username}:</strong> ${comment.comment} <br><small>${comment.date}</small>`;
    commentSection.appendChild(commentDiv);
}
