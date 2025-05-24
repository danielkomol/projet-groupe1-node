//UI 4
import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'

describe('UT02 - Test login avec Mauvais mot de passe', () => {
  
  let app
  const testEmail = `test@example.com`
  
  beforeAll(async () => {
    // Import de l'app
    const { default: server } = await import('../../src/server.js')
    app = server
  })

  it('UT04 - Devrait créer l\'utilisateur avec succès', async () => {
    // ARRANGE - Préparer les données du premier utilisateur
    const userData = {
      name: 'komol daniel',
      email: testEmail,
      password: 'lakomolie'
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

  it('UT04 - Devrait retourner 400 Bad Request quand password est faux', async () => {
    // ARRANGE - Préparer les données avec le même email
    const userData = {
      name: 'komol daniel',
      email: testEmail, // ← Même email que le test précédent
      password: 'autrepassword123'
    }

    // ACT - Tenter de login
    const response = await request(app)
      .post('/api/login')
      .send(userData)

    // ASSERT - Vérifications
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
    
    // Vérifier que le message d'erreur mentionne l'email
    const errorMessage = response.body.message.toLowerCase()
    const hasEmailError = errorMessage.includes('mot de passe') && 
                         (errorMessage.includes('déjà') || 
                          errorMessage.includes('already') || 
                          errorMessage.includes('exists') ||
                          errorMessage.includes('utilisé')||
                          errorMessage.includes('invalide'))
    
    expect(hasEmailError).toBe(true)
  })

})
