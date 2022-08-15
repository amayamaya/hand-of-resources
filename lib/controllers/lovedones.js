const { Router } = require('express');
const { LovedOne } = require('../models/LovedOne');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await LovedOne.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
