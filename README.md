# Arrête d'être pauvre - API

## Description

Cette application a pour vocation de catégoriser les dépenses de l'utilisateur pour qu'il puisse avoir une vue d'ensemble de ces dépenses dans le mois.

# Installation

Installer les dépendances 

```$ npm install```

Lancer le serveur 

```$ npm run dev```

# Prerequies

PostgreSQL : 16.0
NodeJS : 22.2.0

# Variables d'environnement

Dupliquer le .env.exemple et leur assigner les valeurs adequates dans un .env

# Architecture

./index.js -->  Création du serveur et port d'écoute 
./migration/migrations --> Création des migration des tables SQL
./infra --> annexes de plusieurs fichiers utilitaires
./endpoint


