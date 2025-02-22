const bcrypt = require('bcryptjs');
const request = require('supertest');
const app = require('./server.js'); 
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


describe('POST /api/auth/login', () => {
  it('should login successfully with correct credentials', async () => {
    
    const hashedPassword = await bcrypt.hash('password', 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      ['user_test', 'user@example.com', hashedPassword] 
    );

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password' });  

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    
    await pool.query('DELETE FROM users WHERE email = $1', ['user@example.com']);
  });

  it('should return 401 with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'wrongpassword' });  

    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('Credenciales inválidas');
  });
});

describe('GET /api/protected', () => {
  it('should access protected route with valid token', async () => {
   
    const hashedPassword = await bcrypt.hash('password', 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      ['user_test', 'user@example.com', hashedPassword]
    );
    const userId = result.rows[0].id;

    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Ruta protegida accedida');

    
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  });

  it('should return 403 with invalid token', async () => {
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', 'Bearer invalid_token');

    expect(res.statusCode).toBe(403);
    expect(res.text).toBe('Token inválido');
  });
});
