# DoFine Music

[lien](http://dofine.zachary.pm/) | [plateforme de vote](http://dofine.zachary.pm/#/votes)


Landing page et section de vote pour le festival DoFine. 🤘

Ce repository est uniquement à but de démonstration du code source du site DoFine Music, festival désormais terminé.

Powered by Wordpress and Angular! 🚀

## Thème

Le thème a été conçu avec *Angular.js* et *WP-JSON* pour la gestion des données.

## Plugin de Vote

Le plugin de vote permet aux spectateurs de voter pour leur artiste préféré grace à un système de vote utilisant *Facebook* afin d'authentifier les votes.

Voici la procédure : 

- L'utilisateur clique sur un bouton affichant une modal de Facebook demandant les permissions d'authentification
- Un token et le Facebook ID de la personne est récupéré puis envoyé au plugin en back
- Le plugin effectue une vérification du token et du Facebook ID puis regarde si la personne n'a pas déjà voté pour l'artiste.
- Le plugin envoie à Angular un message de validation et Angular propose à l'utilisateur de partager son vote sur son mur grace à une modal *Facebook UI*.

Ensuite, les administratrices de DoFine peuvent consulter sur le back de Wordpress le nombre de votes par artistes.

Le plugin est prévnu pour ne plus accepter de nouveaux votes à partir du 25 Mars à 22h.
