//IT1 TEST
import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'

describe('IT1 - Test Accès Véhicule avec Authentification', () => {
  
  let app
  let accessToken
  let testUser = {
    name: `komol daniel`,
    email: `test@example.com`,
    password: 'lakomolie'
  }
  
  beforeAll(async () => {
    
    const { default: server } = await import('../src/server')
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

  it('IT1 - AS un utilisateur authentifié WHEN GET /vehicles avec access token THEN 200 OK et données véhicule listées', async () => {
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


})