document.getElementById("contact").addEventListener("submit", function (e) {
    e.preventDefault();
    var erreur;
    var nom = document.getElementById('nom');
    var prenom = document.getElementById('prenom');
    var statut = document.getElementById('statut');
    var adresse_mail = document.getElementById('adresse_mail');
    var objet = document.getElementById('objet');
    var message = document.getElementById('message');
    var body = 'Nom: ' + nom + '<br/> Prénom: ' + prenom + '<br/> Statut: ' + statut + '<br/> Adresse mail: ' + adresse_mail + '<br/> Objet: ' + objet + '<br/> Message: ' + message;

    if (!nom.value) {
        erreur = "Veuillez renseigner un NOM"
    }
    if (!prenom.value) {
        erreur = "Veuillez renseigner un Prénom"
    }
    if (!statut.value) {
        erreur = "Veuillez renseigner un Statut"
    }
    if (!adresse_mail.value) {
        erreur = "Veuillez renseigner une Adremme Mail"
    }
    if (!objet.value) {
        erreur = "Veuillez renseigner un Objet"
    }

    if (!message.value) {
        erreur = "Veuillez écrire votre Mssage"
    }

    if (erreur) {
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        Swal.fire({
            title1: "Succès !",
            text: "Votre message a bien été envoyé !",
            icon: "success"
        });
    }
});