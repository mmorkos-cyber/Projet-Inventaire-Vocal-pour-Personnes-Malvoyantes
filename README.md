# Projet-Inventaire-Vocal-pour-Personnes-Malvoyantes

Contexte du projet

Votre entreprise collabore avec :

    Des associations pour personnes malvoyantes
    Des services publics (médiathèques, centres d’accueil)
    Des startups d’accessibilité numérique
    Des collectivités territoriales

Le besoin est réel :

    Permettre à une personne malvoyante de connaître le contenu d’une scène (table, sac, bureau) grâce à une photo, un inventaire automatique et une description vocale.

Ce type d’outil est utilisé pour :

    Retrouver un objet
    Vérifier le contenu d’un sac
    Inventorier un bureau
    Favoriser l’autonomie au quotidien

Votre équipe est chargée de produire un prototype fonctionnel en 2 jours. Suite à votre travaille de veille, TensorFlow a été choisi comme solution technique pour le prototype avant de déployer la solution sur des lunettes connectées.
Objectif du projet
Créer une mini‑application web capable de :

    Recevoir une image (upload, URL, ou webcam en option)
    Analyser son contenu grâce à un modèle pré‑entraîné TensorFlow.js
    Générer un inventaire lisible (ex : “2 bouteilles, 1 ordinateur portable”)
    Produire une description vocale via la Web Speech API
    Enrichir les objets détectés grâce à un fichier JSON sémantique
    (Bonus) Stocker les résultats pour une future analyse

Fonctionnement attendu
Étape 1 : L’utilisateur fournit une image

Upload d’un fichier (images à tester en ressource)

OU webcam (option avancée)
Étape 2 : Détection d’objets (COCO‑SSD)

Le modèle renvoie une liste d’objets détectés, par exemple :

    bottle

    cup

    laptop

    cell phone

    chair

    person

Étape 3 : Génération d’un inventaire

Exemple :

    1 laptop

    2 bottles

    1 phone

    1 chair

Étape 4 : Enrichissement sémantique (JSON, faites quelques objets)

Chaque objet peut être enrichi avec :

    Traduction FR
    Définition simple
    Catégorie
    Phrase vocale adaptée

Étape 5 : Synthèse vocale

Exemple :

    “J’ai détecté un ordinateur portable, deux bouteilles et un téléphone.”

    “Une bouteille est un récipient utilisé pour contenir des liquides.”

Étape 6 :(Bonus) Stockage des résultats

Dans un fichier JSON local ou dans une base SQLite ou dans un simple tableau en mémoire

Exemple de structure :

    {

    "date": "2026-05-26 14:32",

    "image": "upload_001.jpg",

    "inventaire": {

    "bottle": 2,

    "laptop": 1

    }

    }

Livrables attendus
A) Guide d'utilisation

Public : direction, associations, métiers.

Expliquer rapidement comment utiliser l'application
B) Guide de fonctionnement

Public : équipe IT.

Contenu attendu :

    Architecture du projet
    Structure des prédictions (JSON)
    Pipeline complet (image → prédiction → inventaire → voix)
    Gestion du JSON sémantique
    Pistes d’amélioration techniques

C) Mini‑application web fonctionnelle
Contenu minimal :

    Interface simple (upload + bouton “Analyser”)
    Affichage de l’image
    Détection COCO‑SSD
    Inventaire lisible
    synthèse vocale
    Enrichissement sémantique

Contenu avancé (optionnel) :

    Bounding boxes
    Webcam
    Mode accessibilité
    Historique des analyses
    Export JSON
    Stockage local

Contraintes techniques

    Application 100% front-end
    Aucun backend requis
    Utilisation obligatoire de TensorFlow.js
    Utilisation obligatoire d’un modèle pré‑entraîné
    Utilisation obligatoire d’un JSON sémantique
    Synthèse vocale obligatoire
    Interface accessible (lisibilité, contraste, taille de police)
