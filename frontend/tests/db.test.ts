import { describe, it, expect } from 'vitest';
import {
  getDestinations,
  getDestinationById,
  saveChatMessage,
  savePlanPreview,
  getSavedDestinations,
  toggleSavedDestination,
} from '../src/lib/db';

describe('Prisma Database Helper Unit Tests', () => {
  it('getDestinations should return a non-empty list of destinations', async () => {
    const list = await getDestinations();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  it('getDestinations with search query should filter by keyword', async () => {
    const list = await getDestinations({ search: 'Pachmarhi' });
    expect(list.length).toBeGreaterThan(0);
    expect(list[0].name).toBe('Pachmarhi');
  });

  it('getDestinationById should return Pachmarhi for id "pachmarhi"', async () => {
    const dest = await getDestinationById('pachmarhi');
    expect(dest).not.toBeNull();
    expect(dest?.id).toBe('pachmarhi');
  });

  it('saveChatMessage should create conversation and message record', async () => {
    const res = await saveChatMessage({
      visitorId: 'test_db_visitor',
      role: 'user',
      message: 'Greetings from unit test',
    });
    expect(res.conversationId).toBeDefined();
    expect(res.messageId).toBeDefined();
  });

  it('savePlanPreview should store plan preview data', async () => {
    const preview = await savePlanPreview({
      destination: 'Hampi',
      budget: 25000,
      travelStyle: 'Cultural',
      interests: ['Architecture', 'Sunsets'],
    });
    expect(preview).toBeDefined();
    expect(preview.destination).toBe('Hampi');
  });

  it('toggleSavedDestination should add and remove items from saved list', () => {
    const initial = getSavedDestinations();
    const isSaved = initial.includes('varanasi');

    const updated = toggleSavedDestination('varanasi');
    expect(updated.includes('varanasi')).toBe(!isSaved);

    const reverted = toggleSavedDestination('varanasi');
    expect(reverted.includes('varanasi')).toBe(isSaved);
  });
});
