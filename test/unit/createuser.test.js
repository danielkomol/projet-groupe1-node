import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'

describe('UT01 - Test Création Utilisateur Valide', () => {
  
  let app
  
  beforeAll(async () => {
    const { default: server } = await import('../../src/server.js')
    app = server
  })

  it('UT01 - Devrait créer un utilisateur valide avec JSON correct et retourner 201 Created', async () => {
    // ARRANGE - Préparer des données valides
    const validUserData = {
      name: `Utilisateur Valide ${Date.now()}`,
      email: `valid.${Date.now()}@example.com`,
      password: 'MotDePasseSecurise123!'
    }

    // ACT - Créer l'utilisateur
    const response = await request(app)
      .post('/api/signup')
      .send(validUserData)

    // ASSERT - Vérifications détaillées
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('user')
    
    // Vérifier la structure de l'utilisateur retourné
    const user = response.body.user
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email', validUserData.email)
    expect(user.id).toBeTypeOf('number')
    expect(user.id).toBeGreaterThan(0)
    
    // Vérifier que le mot de passe n'est PAS retourné (sécurité)
    expect(user).not.toHaveProperty('password')
    
    // Vérifier le message de succès
    expect(response.body.message).toMatch(/utilisateur.*créé|user.*created/i)
    
    console.log('✅ Utilisateur créé avec succès:', user.email, 'ID:', user.id)
  })

  it('UT01 - Validation : Devrait créer plusieurs utilisateurs différents', async () => {
    // ARRANGE - Préparer plusieurs utilisateurs
    const users = [
      {
        name: 'Alice Dupont',
        email: `alice.${Date.now()}@test.com`,
        password: 'AlicePassword123'
      },
      {
        name: 'Bob Martin',
        email: `bob.${Date.now()}@test.com`,
        password: 'BobPassword456'
      }
    ]

    // ACT & ASSERT - Créer chaque utilisateur
    for (const userData of users) {
      const response = await request(app)
        .post('/api/signup')
        .send(userData)

      expect(response.status).toBe(201)
      expect(response.body.user.email).toBe(userData.email)
      console.log('✅ Utilisateur créé:', userData.name)
    }
  })

  it('UT01 - Validation : Vérifier les champs obligatoires', async () => {
    // Test avec tous les champs requis
    const completeUser = {
      name: 'Utilisateur Complet',
      email: `complet.${Date.now()}@example.com`,
      password: 'PasswordComplet123'
    }

    const response = await request(app)
      .post('/api/signup')
      .send(completeUser)

    expect(response.status).toBe(201)
    expect(response.body.user).toHaveProperty('id')
    expect(response.body.user).toHaveProperty('email')
    
    // Vérifier que l'ID est unique et valide
    expect(typeof response.body.user.id).toBe('number')
    expect(response.body.user.id).toBeGreaterThan(0)
  })

  it('UT01 - Validation : Format email valide accepté', async () => {
    // Test avec différents formats d'email valides
    const validEmails = [
      `test.${Date.now()}@domain.com`,
      `user${Date.now()}@test.org`,
      `valid${Date.now()}@example.net`
    ]

    for (const email of validEmails) {
      const userData = {
        name: 'Test User',
        email: email,
        password: 'ValidPassword123'
      }

      const response = await request(app)
        .post('/api/signup')
        .send(userData)

      expect(response.status).toBe(201)
      expect(response.body.user.email).toBe(email)
      console.log('✅ Email valide accepté:', email)
    }
  })

  it('UT01 - Validation : Structure de réponse cohérente', async () => {
    // ARRANGE
    const userData = {
      name: 'Test Structure',
      email: `structure.${Date.now()}@example.com`,
      password: 'StructureTest123'
    }

    // ACT
    const response = await request(app)
      .post('/api/signup')
      .send(userData)

    // ASSERT - Vérifier la structure exacte de la réponse
    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toMatch(/json/)
    
    // Structure de la réponse
    expect(response.body).toEqual({
      message: expect.any(String),
      user: {
        id: expect.any(Number),
        email: userData.email
      }
    })

    console.log('✅ Structure de réponse validée')
  })
})