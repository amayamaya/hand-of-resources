const { Router } = require('express');
const { Candle } = require('../models/Candle');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Candle.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Candle.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Candle.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
