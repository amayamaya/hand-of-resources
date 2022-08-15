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
  it('#PUT /lovedones/:id should update an existing loved one', async () => {
    const resp = await request(app).put('/lovedones/1').send({
      name: 'HsuBear',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('HsuBear');
  });
  it.only('#DELETE /lovedones/:id should delete an existing loved one', async () => {
    const resp = await request(app).delete('/lovedones/1');
    expect(resp.status).toBe(200);

    const lovedOneResp = await request(app).get('/lovedones/1');
    expect(lovedOneResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
