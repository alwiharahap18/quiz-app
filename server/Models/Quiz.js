const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizPost = new Schema({
  judul: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  }, 
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  QA: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Quiz', QuizPost);