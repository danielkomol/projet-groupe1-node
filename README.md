# Propelize Vehicle API

## Installation

1. Créez une base de données MySQL nommée `vehicle_db` via phpMyAdmin (XAMPP).
2. Clonez ou décompressez ce projet.
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Appliquez la migration pour créer la table :
   ```bash
   npx prisma migrate dev --name init
   ```
5. Lancez l'API :
   ```bash
   npm run dev
   ```

## Endpoints disponibles

- GET /vehicles
- GET /vehicles/:id
- POST /vehicles
- PUT /vehicles/:id
- DELETE /vehicles/:id
