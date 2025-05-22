# **plan de test complet**

Le plan est conçu pour une API avec **authentification JWT**, **utilisateurs**, **véhicules**, et une **base de données Dockerisée**.

---

## ✅ **PLAN DE TEST – API UTILISATEURS & VÉHICULES**

### 🧾 1. **Objectifs du test**

- Vérifier le bon fonctionnement des endpoints de l’API.
- Valider l’authentification et l’autorisation via JWT.
- S'assurer de l’intégration correcte entre les services (API utilisateurs ↔ API véhicules).
- Garantir la stabilité après mises à jour (tests de régression).

---

### 🧩 2. **Système à tester (SUT)**

- **API Propelize** composée de :

  - Module d’authentification JWT (login, refresh).
  - Endpoints utilisateur : `/api/users`, `/api/login`, `/api/refresh-token`
  - Endpoints véhicule : `/api/vehicles` (protégé par token).
  - Base de données (MongoDB/PostgreSQL...) via Docker.
  - Docker Compose pour l’ensemble.

---

### 🏗️ 3. **Environnement de test**

- OS : Linux/Windows/macOS
- Outils :

  - Node.js ou équivalent (Python, Java...)
  - Postman ou Insomnia (tests manuels)
  - Vitest / Jest / Mocha (tests unitaires et d’intégration)
  - Supertest ou équivalent (tests HTTP)
  - Docker / Docker Compose

---

### 🧪 4. **Niveaux de test**

#### 🔹 **4.1 Tests unitaires**

| ID   | Fonction testée  | Cas de test              | Entrée         | Résultat attendu                |
| ---- | ---------------- | ------------------------ | -------------- | ------------------------------- |
| UT01 | `createUser()`   | Créer utilisateur valide | JSON correct   | `201 Created` + user enregistré |
| UT02 | `createUser()`   | Email déjà utilisé       | Email existant | `400 Bad Request`               |
| UT03 | `loginUser()`    | Identifiants valides     | login/pwd      | `200 OK` + access token         |
| UT04 | `loginUser()`    | Mauvais mot de passe     | mauvais pwd    | `401 Unauthorized`              |
| UT05 | `refreshToken()` | Token valide             | refreshToken   | nouveau access token            |

#### 🔹 **4.2 Tests d’intégration**

| ID   | Fonction testée    | Cas de test                         | Composants impliqués      | Résultat attendu                   |
| ---- | ------------------ | ----------------------------------- | ------------------------- | ---------------------------------- |
| IT01 | Connexion complète | Création → Login → Access véhicules | API + BDD                 | Accès à `/vehicles` avec token     |
| IT02 | Seeders            | Chargement des données init.        | API + Docker + BDD        | utilisateurs et véhicules présents |
| IT03 | Protection route   | Accès sans token                    | API auth + route protégée | `403 Forbidden`                    |
| IT04 | Token expiré       | Accès avec vieux token              | API auth + véhicules      | `401 Unauthorized`                 |

#### 🔹 **4.3 Tests end-to-end (E2E)**

Format **As / When / Then** (cours)

| ID    | Scénario       | AS                               | WHEN                                  | THEN                                 |
| ----- | -------------- | -------------------------------- | ------------------------------------- | ------------------------------------ |
| E2E01 | Signup complet | Un nouvel utilisateur            | Envoie POST `/api/signup`             | `201`, JWT retourné, user enregistré |
| E2E02 | Accès véhicule | Un utilisateur authentifié       | GET `/api/vehicles` avec access token | `200 OK`, données véhicule listées   |
| E2E03 | Refresh token  | Un utilisateur avec token expiré | POST `/api/refresh-token`             | Nouveau access token reçu            |

---

### 🧠 5. **Critères d’acceptation**

- Tous les tests doivent passer.
- Aucun endpoint ne doit être accessible sans token valide.
- Les données seedées doivent toujours apparaître au lancement.
- Les erreurs doivent retourner des statuts HTTP clairs (`400`, `401`, `403`, `500`).

---

### 📋 6. **Traçabilité**

| Exigence                         | Cas de test lié         |
| -------------------------------- | ----------------------- |
| Authentification sécurisée       | UT03, UT04, IT03, E2E01 |
| Sécurisation des endpoints       | IT03, E2E02             |
| Persistence des données          | IT02, E2E01             |
| Intégration API Users ↔ Vehicles | IT01, E2E02             |

---

### 🧾 7. **Outils de test**

- **Vitest/Jest** : tests unitaires
- **Supertest** : intégration HTTP
- **Docker** : setup complet
- **Postman** (optionnel) : tests manuels
- **Coverage tool** : mesurer la couverture

---

### 📊 8. **Rapport de test (à fournir)**

- Résultats de tous les cas (succès/échec)
- Logs des tests automatisés
- Couverture de test (%)
- Bugs détectés + suggestions

---
