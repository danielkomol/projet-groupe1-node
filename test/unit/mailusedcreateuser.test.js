import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'

describe('UT02 - Test Création Utilisateur avec Email Déjà Utilisé', () => {
  
  let app
  const testEmail = `test.${Date.now()}@example.com` // Email unique pour éviter les conflits
  
  beforeAll(async () => {
    // Import de l'app
    const { default: server } = await import('../../src/server.js')
    app = server
  })

  it('UT02 - Devrait créer le premier utilisateur avec succès', async () => {
    // ARRANGE - Préparer les données du premier utilisateur
    const userData = {
      name: 'Premier Utilisateur',
      email: testEmail,
      password: 'password123'
    }

    // ACT - Créer le premier utilisateur
    const response = await request(app)
      .post('/api/signup')
      .send(userData)

    // ASSERT - Vérifier que la création réussit
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).toHaveProperty('email', testEmail)
  })

  it('UT02 - Devrait retourner 400 Bad Request quand email est déjà utilisé', async () => {
    // ARRANGE - Préparer les données avec le même email
    const userData = {
      name: 'Deuxième Utilisateur',
      email: testEmail, // ← Même email que le test précédent
      password: 'autrepassword123'
    }

    // ACT - Tenter de créer un utilisateur avec le même email
    const response = await request(app)
      .post('/api/signup')
      .send(userData)

    // ASSERT - Vérifications
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    
    // Vérifier que le message d'erreur mentionne l'email
    const errorMessage = response.body.message.toLowerCase()
    const hasEmailError = errorMessage.includes('email') && 
                         (errorMessage.includes('déjà') || 
                          errorMessage.includes('already') || 
                          errorMessage.includes('exists') ||
                          errorMessage.includes('utilisé'))
    
    expect(hasEmailError).toBe(true)
  })

  it('UT02 - Validation : Devrait accepter un email différent', async () => {
    // ARRANGE - Email complètement unique
    const uniqueEmail = `nouveau.${Date.now()}@example.com`
    const userData = {
      name: 'Nouvel Utilisateur',
      email: uniqueEmail,
      password: 'password123'
    }

    // ACT - Créer utilisateur avec email différent
    const response = await request(app)
      .post('/api/signup')
      .send(userData)

    // ASSERT - Doit réussir
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).toHaveProperty('email', uniqueEmail)
  })
})
