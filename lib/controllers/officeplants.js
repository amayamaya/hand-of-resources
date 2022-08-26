const { Router } = require('express');
const { OfficePlant } = require('../models/OfficePlant');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await OfficePlant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await OfficePlant.getById(req.params.id);
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
      const data = await OfficePlant.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await OfficePlant.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await OfficePlant.deleteById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
