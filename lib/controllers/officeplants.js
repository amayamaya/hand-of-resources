const { Router } = require('express');
const { OfficePlant } = require('../models/OfficePlant');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await OfficePlant.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
