const express = require('express');

const router = express.Router();

const { 
  addQuiz, 
  quizzes, 
  quiz,
  deleteQuiz,  
  editQuiz // Import fungsi editQuiz
} = require('../controllers/Quiz');

// POST handle
router.post(
  '/add', 
  addQuiz
);

// GET handle
router.get('/list/:userId', quizzes);
router.get('/show/:getId', quiz);
router.delete('/del/:getId', deleteQuiz);

// PUT handle untuk mengedit kuis
router.put('/edit/:getId', editQuiz);

module.exports = router;