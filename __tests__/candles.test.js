const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('candles routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /candles should return a list of candles', async () => {
    const resp = await request(app).get('/candles');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Abuela Rose',
        scent: 'Rose',
        color: 'Pink',
      },
      {
        id: '2',
        name: 'Lavender Crisp',
        scent: 'Lavender',
        color: 'Purple',
      },
      {
        id: '3',
        name: 'Moon Milk',
        scent: 'Jasmine and Peach',
        color: 'White',
      },
      {
        id: '4',
        name: 'Citrus Bliss',
        scent: 'Bergamot, Lime, and Sweet Orange',
        color: 'Red',
      },
    ]);
  });
  it('#GET candles/:id should return a single candle', async () => {
    const resp = await request(app).get('/candles/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Abuela Rose',
      scent: 'Rose',
      color: 'Pink',
    });
  });
  it('#POST /candles should create a new candle', async () => {
    const newCandle = {
      name: 'Blue Fields',
      scent: 'Floral',
      color: 'Blue',
    };
    const resp = await request(app).post('/candles').send(newCandle);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCandle,
    });
  });

  it('#PUT /candles/:id should update an existing candle', async () => {
    const resp = await request(app).put('/candles/4').send({
      color: 'white',
    });
    // console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.color).toBe('white');
  });

  it('#DELETE /candles/:id should delete an existing candle', async () => {
    const resp = await request(app).delete('/candles/1');
    console.log('hey respbody', resp.body);
    expect(resp.status).toBe(200);

    const candleResp = await request(app).get('/candles/1');
    expect(candleResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
