const { Router } = require('express');
const { BalconyPlant } = require('../models/BalconyPlant');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await BalconyPlant.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
