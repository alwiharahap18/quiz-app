const express = require('express');

const router = express.Router();

const { 
  store, 
  index, 
  show,
  destroy,
  users,
  updateAnswers   
} = require('../controllers/Participant');

// POST handle
router.post(
  '/add', 
  store
);

// GET handle
router.get('/list/', index);
router.get('/show/:getId', show);
router.get('/users/:getId', users);
router.delete('/del/:getId', destroy);
router.post('/update/:getId', updateAnswers);

module.exports = router;