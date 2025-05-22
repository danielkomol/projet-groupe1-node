Voici la documentation mise à jour de ton API **Propelize**, incluant la nouvelle **API utilisateurs avec authentification JWT**, la **mise à jour utilisateur**, et les instructions associées :

---

# 🚀 Propelize Vehicle & User API

API REST pour gérer les **véhicules** et les **utilisateurs** avec **authentification sécurisée JWT**, basée sur **Node.js**, **Express**, **Prisma** et **MySQL**.

---

## 🛠️ Installation

1. Créez une base de données MySQL nommée `vehicle_db`.
2. Clonez ou décompressez ce projet.
3. Installez les dépendances :

   ```bash
   npm install
   ```

4. Configurez votre fichier `.env` :

   ```
   DATABASE_URL="mysql://<user>:<password>@localhost:3306/vehicle_db"
   ACCESS_TOKEN_SECRET="votre_cle_access"
   REFRESH_TOKEN_SECRET="votre_cle_refresh"
   ```

5. Appliquez les migrations Prisma :

   ```bash
   npx prisma migrate dev --name init
   ```

6. Lancez l'API :

   ```bash
   npm run dev
   ```

---

## 🔒 Authentification

- Les routes **protégées** nécessitent un **JWT access token** dans l'en-tête :

  ```
  Authorization: Bearer <access_token>
  ```

- Utilisez le **refresh token** pour renouveler un access token expiré.

---

## 🔚 Endpoints disponibles

### 📦 Véhicules

- `GET    /vehicles` — Liste tous les véhicules
- `GET    /vehicles/:id` — Récupère un véhicule spécifique
- `POST   /vehicles` — Crée un véhicule (protégé)
- `PUT    /vehicles/:id` — Modifie un véhicule (protégé)
- `DELETE /vehicles/:id` — Supprime un véhicule (protégé)

### 👤 Utilisateurs

- `POST   /api/signup` — Crée un compte utilisateur
- `POST   /api/login` — Authentifie un utilisateur et renvoie des tokens JWT
- `POST   /api/refresh-token` — Renvoie un nouveau access token
- `PUT    /api/users/:id` — Met à jour les informations d’un utilisateur (protégé)

---

## 🔁 Exemple de flow

1. 🔐 **Signup** : `POST /api/signup` → crée un utilisateur
2. 🔑 **Login** : `POST /api/login` → reçoit `accessToken` et `refreshToken`
3. ✅ **Requête protégée** : `GET /vehicles` avec `Authorization: Bearer <accessToken>`
4. 🔄 **Token expiré ?** `POST /api/refresh-token` avec le refresh token

---

## ✅ Sécurité

- Les endpoints protégés par middleware JWT.
- Données sensibles hashées avec **bcrypt**.
- Gestion des droits possible via le champ `role` (ex: `user`, `admin`).

---

Souhaite-tu aussi que je te génère un fichier `README.md` directement basé sur cette doc ?
