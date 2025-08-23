import { sendContactForm, getBlogPosts, getCinemaPosts, getEpisodeDetails } from './api.js';

describe('API Tests', () => {
  test('check contact form', async () => {
    const response = await sendContactForm({
      'name': 'test',
      'social': 'test',
    });
    expect(response).toBe(true);
  });

  test('check blog posts', async () => {
    const response = await getBlogPosts();
    expect(response).not.toBe(false);
    if (Array.isArray(response)) {
      expect(response.length).toBeGreaterThan(0);
    }
  });

  test('check cinema posts', async () => {
    const response = await getCinemaPosts();
    expect(response).not.toBe(false);
    if (Array.isArray(response)) {
      expect(response.length).toBeGreaterThan(0);
    }
  });

  test('check episode details', async () => {
    const response = await getEpisodeDetails('test');
    expect(response).not.toBe(false);
    if (Array.isArray(response)) {
      expect(response.length).toBeGreaterThan(0);
    }
  });
});