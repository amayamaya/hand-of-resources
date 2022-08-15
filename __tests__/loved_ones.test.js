const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /lovedones should return a list of loved ones', async () => {
    const resp = await request(app).get('/lovedones');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Natalie',
        origin: 'LA',
        connection: 'Astrology',
      },
      {
        id: '2',
        name: 'Mehregan',
        origin: 'Austin',
        connection: 'Art',
      },
      {
        id: '3',
        name: 'Oriana',
        origin: 'Portland',
        connection: 'Lifetimes',
      },
      {
        id: '4',
        name: 'Alex',
        origin: 'Nowhere, TX',
        connection: 'Same Name',
      },
      {
        id: '5',
        name: 'Stephanie',
        origin: 'Amarillo',
        connection: 'Feels',
      },
    ]);
  });
  it('#GET lovedones/:id should return a single loved one', async () => {
    const resp = await request(app).get('/lovedones/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Natalie',
      origin: 'LA',
      connection: 'Astrology',
    });
  });
  it('#POST /lovedones should create a new loved one', async () => {
    const newLovedOne = {
      name: 'Victoria',
      origin: 'Portland',
      connection: 'Forge',
    };
    const resp = await request(app).post('/lovedones').send(newLovedOne);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newLovedOne,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
