Voici la version adaptée de votre README avec les sections réorganisées et corrigées :

# Arrête d'être pauvre - API

## Description

Cette application a pour vocation de catégoriser les dépenses de l'utilisateur pour qu'il puisse avoir une vue d'ensemble de ces dépenses dans le mois.

## Table des matières

- [Installation](#installation)
- [Prérequis](#prérequis)
- [Variables d'environnement](#variables-denvironnement)
- [Architecture](#architecture)
- [Dépendances](#dépendances)

## Installation

Installer les dépendances :

```bash
$ npm install
```


Lancer le serveur :

```bash
$ npm run dev
```

## Prérequis

- PostgreSQL : 16.0
- Node.js : 22.2.0

## Dépendances

- `bcrypt`: ^5.1.1
- `dotenv`: ^16.4.5
- `jsonwebtoken`: ^9.0.2
- `pg`: ^8.11.5
- `postgres`: ^3.4.4
- `swagger-jsdoc`: ^6.2.8
- `swagger-ui-express`: ^5.0.0
- `uuid`: ^9.0.1

## Variables d'environnement

Dupliquer le fichier `.env.example` et lui assigner les valeurs adéquates dans un fichier `.env`.

## Architecture

- `./index.js` : Création du serveur et port d'écoute
- `./migration/migrations` : Création des migrations des tables SQL
- `./infra` : Annexes de plusieurs fichiers utilitaires
- `./infra/pgCommand` : Permet d'exécuter des commandes SQL 
- `./endpoint/controller` : Gère les réponses HTTP et envoie les données au service
- `./domain/` : Contient la logique de `category/dépenses` et `user` :


    `Le repository` permet d'utiliser les commandes de pgCommand et d'exécuter en fonction de l'instruction de service

    `Le service` sert de donner les instructions au repository et retourne une promesse géré par le controller

    


