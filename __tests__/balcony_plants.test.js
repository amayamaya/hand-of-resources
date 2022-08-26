const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('balcony plants routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it('#GET /balconyplants should return a list of balcony plants', async () => {
    const resp = await request(app).get('/balconyplants');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Delphiniums',
        origin: 'Bi-Mart',
        features: 'Tall with Blue Blooms',
      },
      {
        id: '2',
        name: 'Marigolds',
        origin: 'Woodstock Hardware',
        features: 'Bright Orange Blooms',
      },
      {
        id: '3',
        name: 'Hebe',
        origin: 'Garden Corner',
        features: 'Bushy with Purple Blooms',
      },
      {
        id: '4',
        name: 'Leopard Lily',
        origin: 'Victoria',
        features: 'Bulby plant with Leopard Spots',
      },
      {
        id: '5',
        name: 'Fuchsias',
        origin: 'Fred Meyer',
        features: 'Viny Plants with Vivid Pink, Purple, and White Blooms',
      },
    ]);
  });
  it('#GET balconyplants/:id should return a single balcony plant', async () => {
    const resp = await request(app).get('/balconyplants/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Delphiniums',
      origin: 'Bi-Mart',
      features: 'Tall with Blue Blooms',
    });
  });
  it('#POST /balconyplants should create a new balcony plant', async () => {
    const newBalconyPlant = {
      name: 'Peppers',
      origin: 'Adrian',
      features: 'Babies',
    };
    const resp = await request(app)
      .post('/balconyplants')
      .send(newBalconyPlant);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newBalconyPlant,
    });
  });
});
