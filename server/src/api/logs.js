const { Router } = require('express');

const LogEntry = require('../models/logEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const deletedEntry = await LogEntry.findByIdAndRemove(req.params.id);
  if (deletedEntry === null) {
    res.status(404);
    next(req);
  } else { res.json(deletedEntry); }
});

module.exports = router;
