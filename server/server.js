// Importation des modules requis
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
  console.log('EXCEPTION NON CAPTURÉE ! 💀');
  console.log(err);
  process.exit(1);
});


// Chargement du fichier d'environnement approprié
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './config.prod.env' });
} else {
  dotenv.config({ path: './config.dev.env' });
}

const app = require('./app');
// Import the environment variables

// Connexion à la base de données MongoDB
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true, // Utilisation du nouveau parseur d'URL du pilote MongoDB
    useUnifiedTopology: true, // Utilisation de la nouvelle topologie du pilote MongoDB
  })
  .then(() => console.log('Connexion MongoDB : OK'));

// Démarrage du serveur
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Gestion des rejets de promesse non traités
process.on('unhandledRejection', (err) => {
  console.log('REJET DE PROMESSE NON TRAITÉ ! 💀');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


