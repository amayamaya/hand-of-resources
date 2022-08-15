const { Router } = require('express');
const { LovedOne } = require('../models/LovedOne');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await LovedOne.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await LovedOne.getById(req.params.id);
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
      const data = await LovedOne.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
