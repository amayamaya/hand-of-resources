const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('office plants routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it('#GET /officeplants should return a list of office plants', async () => {
    const resp = await request(app).get('/officeplants');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Spider Plant',
        origin: 'Woodstock Hardware',
        features: 'Babies on Babies',
      },
      {
        id: '2',
        name: 'Baby Rubber Plant',
        origin: 'OfferUp',
        features: 'Cool non-flower',
      },
      {
        id: '3',
        name: 'Peace Lily',
        origin: 'OfferUp',
        features: 'Rainforest Vibes',
      },
      {
        id: '4',
        name: 'Satin Pothos',
        origin: 'OfferUp',
        features: 'Silver Freckles',
      },
      {
        id: '5',
        name: 'Superba',
        origin: 'Lowes',
        features: 'Veining Foliage',
      },
    ]);
  });
  it('#GET officeplants/:id should return a single office plant', async () => {
    const resp = await request(app).get('/officeplants/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Spider Plant',
      origin: 'Woodstock Hardware',
      features: 'Babies on Babies',
    });
  });
  it('#POST /officeplants should create a new office plant', async () => {
    const newOfficePlant = {
      name: 'Trailing Pothos',
      origin: 'Victoria',
      features: 'Luscious Foliage',
    };
    const resp = await request(app).post('/officeplants').send(newOfficePlant);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newOfficePlant,
    });
  });
  it('#PUT /officeplants/:id should update an existing office plant', async () => {
    const resp = await request(app).put('/officeplants/1').send({
      features: 'Veining Foliage with blooms',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual('Veining Foliage with blooms');
  });
  it('#DELETE /officeplants/:id should delete an existing office plant', async () => {
    const resp = await request(app).delete('/officeplants/1');
    expect(resp.status).toBe(200);

    const officePlantsResp = await request(app).get('/officeplants/1');
    expect(officePlantsResp.status).toBe(404);
  });
});
