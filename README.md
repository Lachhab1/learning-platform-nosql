# 🎓 Plateforme d'Apprentissage NoSQL

Une plateforme moderne et interactive pour maîtriser les bases de données NoSQL, conçue pour offrir une expérience d'apprentissage immersive.

## 📚 Vue d'ensemble

Cette plateforme d'apprentissage offre une approche pratique pour comprendre et maîtriser les technologies NoSQL. Elle combine théorie et pratique à travers des modules interactifs, permettant aux apprenants de développer leurs compétences dans un environnement réaliste.

## 🏗 Structure du Projet

```plaintext
project-root/
├── config/
│   ├── db.js          # Configuration de la base de données
│   └── env.js         # Gestion des variables d'environnement
├── controllers/
│   ├── courseController.js     # Gestion des cours
│   ├── enrollmentController.js # Gestion des inscriptions
│   └── userController.js       # Gestion des utilisateurs
├── middleware/
│   ├── errorHandler.js         # Gestion centralisée des erreurs
│   └── validators.js           # Validation des données
├── routes/
│   ├── courseRoutes.js        # Routes pour les cours
│   ├── enrollmentRoutes.js    # Routes pour les inscriptions
│   └── userRoutes.js          # Routes pour les utilisateurs
├── services/
│   ├── mongoService.js        # Service MongoDB
│   └── redisService.js        # Service Redis
├── app.js                     # Point d'entrée de l'application
├── .env                      # Variables d'environnement
├── .gitignore               # Fichiers ignorés par Git
├── README.md                # Documentation du projet
├── dump.rdb                 # Dump Redis
├── package-lock.json        # Verrouillage des versions des dépendances
└── package.json            # Configuration du projet et dépendances
```

## ✨ Fonctionnalités

### Fonctionnalités Principales
- **Gestion des Cours**: CRUD complet pour les cours via `courseController.js`
- **Système d'Inscription**: Gestion des inscriptions avec `enrollmentController.js`
- **Gestion des Utilisateurs**: Authentication et autorisation via `userController.js`
- **Cache Redis**: Optimisation des performances avec Redis
- **Validation des Données**: Middleware de validation robuste

## 🛠 Technologies Utilisées

- **Backend**: Node.js avec Express.js
- **Base de Données**: 
  - MongoDB pour le stockage principal
  - Redis pour le cache et les sessions
- **Validation**: Middleware personnalisé
- **Gestion d'Erreurs**: Système centralisé

## 🚀 Installation

### Prérequis
- Node.js (v14.x ou supérieur)
- npm (v6.x ou supérieur)
- MongoDB
- Redis

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/Lachhab1/learning-platform-nosql.git
cd learning-platform-nosql

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Lancer l'application
npm start
```

## 📝 API Routes

### Routes Utilisateurs
```

```

### Routes Cours
```
GET    /api/courses           # Liste des cours
POST   /api/courses          # Créer un cours
GET    /api/courses/:id      # Détails d'un cours
PUT    /api/courses/:id      # Mettre à jour un cours
DELETE /api/courses/:id      # Supprimer un cours
```

### Routes Inscriptions
```
POST   /api/enrollments          # S'inscrire à un cours
GET    /api/enrollments          # Liste des inscriptions
DELETE /api/enrollments/:id      # Annuler une inscription
```
