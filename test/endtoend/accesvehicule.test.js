import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'

describe('E2E02 - Test Accès Véhicule avec Authentification', () => {
  
  let app
  let accessToken
  let testUser = {
    name: `Test User E2E ${Date.now()}`,
    email: `e2e.${Date.now()}@example.com`,
    password: 'password123'
  }
  
  beforeAll(async () => {
    
    const { default: server } = await import('../../src/server.js')
    app = server
    
    // SETUP : Créer un utilisateur et obtenir le token
    // Étape 1 : Créer un utilisateur
    await request(app)
      .post('/api/signup')
      .send(testUser)
      .expect(201)
    
    // Étape 2 : Se connecter pour obtenir le token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(200)
    
    // Stocker le token pour les tests
    accessToken = loginResponse.body.accessToken
    expect(accessToken).toBeDefined()
  })

  it('E2E02 - AS un utilisateur authentifié WHEN GET /vehicles avec access token THEN 200 OK et données véhicule listées', async () => {
    // ARRANGE - L'utilisateur est déjà authentifié (token obtenu dans beforeAll)
    
    // ACT - Accéder à la liste des véhicules avec le token
    const response = await request(app)
      .get('/vehicles')
      .set('Authorization', `Bearer ${accessToken}`)
    
    // ASSERT - Vérifications du format AS/WHEN/THEN
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(Array.isArray(response.body)).toBe(true)
    
    // Log pour debug (optionnel)
    console.log('📋 Véhicules récupérés:', response.body.length)
  })

  it('E2E02 - Validation : GET /vehicles est public (pas de token requis)', async () => {
    // ARRANGE - Pas de token d'authentification
    
    // ACT - Accéder aux véhicules sans token
    const response = await request(app)
      .get('/vehicles')
      // Pas de header Authorization
    
    // ASSERT - Devrait marcher car GET /vehicles est public
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    
    console.log('✅ GET /vehicles est bien public - accessible sans token')
  })

  it('E2E02 - Validation : Route protégée devrait échouer sans token', async () => {
    // ARRANGE - Tester une route qui DOIT être protégée (POST)
    const vehicleData = {
      make: 'Test',
      model: 'FailTest',
      year: 2024,
      type: 'Sedan',
      status: 'Disponible'
    }
    
    // ACT - Essayer de créer un véhicule SANS token
    const response = await request(app)
      .post('/vehicles')
      .send(vehicleData)
      // Pas de header Authorization
    
    // ASSERT - Devrait être refusé
    expect(response.status).toBe(401) // Route protégée
    
    console.log('✅ POST /vehicles est bien protégé - refuse sans token')
  })

  it('E2E02 - Bonus : Créer un véhicule puis le récupérer', async () => {
    // ARRANGE - Données du véhicule à créer
    const vehicleData = {
      make: 'Toyota',
      model: 'Camry E2E Test',
      year: 2024,
      type: 'Sedan',
      status: 'Disponible'
    }
    
    // ACT 1 - Créer un véhicule
    const createResponse = await request(app)
      .post('/vehicles')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(vehicleData)
      .expect(201)
    
    const createdVehicle = createResponse.body
    expect(createdVehicle).toHaveProperty('id')
    expect(createdVehicle.make).toBe('Toyota')
    
    // ACT 2 - Récupérer la liste mise à jour
    const listResponse = await request(app)
      .get('/vehicles')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
    
    // ASSERT - Le nouveau véhicule devrait être dans la liste
    expect(Array.isArray(listResponse.body)).toBe(true)
    const vehicleFound = listResponse.body.find(v => v.id === createdVehicle.id)
    expect(vehicleFound).toBeDefined()
    expect(vehicleFound.model).toBe('Camry E2E Test')
    
    console.log('✅ Véhicule créé et récupéré avec succès:', vehicleFound.make, vehicleFound.model)
  })
})