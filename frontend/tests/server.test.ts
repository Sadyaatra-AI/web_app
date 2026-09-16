import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server';

describe('Sadyaatra Express Backend API Integration Tests', () => {
  it('GET /api/health should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', app: 'Sadyaatra' });
  });

  it('GET /api/destinations should return all destinations from DB layer', async () => {
    const res = await request(app).get('/api/destinations');
    expect(res.status).toBe(200);
    expect(res.body.destinations).toBeDefined();
    expect(Array.isArray(res.body.destinations)).toBe(true);
    expect(res.body.destinations.length).toBeGreaterThan(0);

    const first = res.body.destinations[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('heroImage');
  });

  it('GET /api/destinations with region filter should filter results', async () => {
    const res = await request(app).get('/api/destinations?region=South');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.destinations)).toBe(true);
    for (const d of res.body.destinations) {
      expect(d.region).toBe('South');
    }
  });

  it('GET /api/destinations/:id should return single destination details', async () => {
    const res = await request(app).get('/api/destinations/pachmarhi');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('pachmarhi');
    expect(res.body.name).toBe('Pachmarhi');
  });

  it('GET /api/destinations/:id should return 404 for unknown id', async () => {
    const res = await request(app).get('/api/destinations/nonexistent-sanctuary-12345');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Destination not found');
  });

  it('POST /api/chat should accept query and return assistant reply with DB conversation id', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({
        message: 'What is the best itinerary for Gokarna?',
        visitorId: 'test_user_unit',
        destinationContext: { name: 'Gokarna', state: 'Karnataka', country: 'India' },
      });

    expect(res.status).toBe(200);
    expect(res.body.reply).toBeDefined();
    expect(typeof res.body.reply).toBe('string');
    expect(res.body.conversationId).toBeDefined();
  });

  it('POST /api/chat should validate required message field', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Message is required');
  });

  it('POST /api/quiz-match should save web plan preview and return success', async () => {
    const res = await request(app)
      .post('/api/quiz-match')
      .send({
        mood: 'Slow & Peaceful',
        budget: '15000',
        duration: '3-4 days',
        destination: 'Pachmarhi',
        previewData: { score: 95, reasons: ['Great forest trails'] },
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.preview).toBeDefined();
  });

  it('GET /api/saved and POST /api/saved/toggle should manage saved sanctuaries', async () => {
    const initialRes = await request(app).get('/api/saved');
    expect(initialRes.status).toBe(200);
    expect(Array.isArray(initialRes.body.saved)).toBe(true);

    const toggleRes = await request(app)
      .post('/api/saved/toggle')
      .send({ id: 'hampi' });

    expect(toggleRes.status).toBe(200);
    expect(toggleRes.body.saved).toContain('hampi');
  });
});
