const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hellooooo',
  });
});

router.post('/', (req, res) => {
  res.json({
    body: req.body,
  });
});

module.exports = router;
