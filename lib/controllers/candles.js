const { Router } = require('express');
const { Candle } = require('../models/Candle');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Candle.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
