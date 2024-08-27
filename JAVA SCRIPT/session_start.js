class ContactFormServlet {
    doPost(request, response) {
        let session = request.getSession();

        if (request.getParameter("send") !== null) {
            let nom = request.getParameter("nom");
            let prenom = request.getParameter("prenom");
            let statut = request.getParameter("statut");
            let adresse_mail = request.getParameter("adresse_mail");
            let objet = request.getParameter("objet");
            let message = request.getParameter("message");

            if (nom !== null && nom !== "" &&
                prenom !== null && prenom !== "" &&
                statut !== null && statut !== "" &&
                adresse_mail !== null && adresse_mail !== "" &&
                objet !== null && objet !== "" &&
                message !== null && message !== "") {

                let to = "llcerespagnol.universitederouen@hotmail.com";
                let subject = objet;

                let emailMessage = "<p><stong>Nom :</strong>" + nom + "</p> " +
                    "<p><stong>Prénom :</strong>" + prenom + "</p>" +
                    "<p><stong>Statut :</strong>" + statut + "</p>" +
                    "<p><stong>Message :</strong> <br> " + message + "</p>";

                let headers = "MIME-Version: 1.0" + "\r\n";
                headers += "Content-type:text/html;charset=UTF-8" + "\r\n";
                headers += "From: <" + adresse_mail + ">" + "\r\n";

                let send = this.sendEmail(to, subject, emailMessage, headers);

                if (send) {
                    session.setAttribute("succes_message", "🤩 Votre message a été envoyé avec succès ! 🤩");
                } else {
                    let info = "😢 Votre message n'a pas été envoyé ! 😢";
                }
            } else {
                let info = "⛔️ Veuillez remplir tous les champs ! ⛔️";
            }
        }
    }

    sendEmail(to, subject, message, headers) {
        // Code to send email
        return true; // Return true if email is sent successfully, false otherwise
    }
}