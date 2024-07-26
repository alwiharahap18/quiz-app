const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipantPost = new Schema({
  nama: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }, 
  ig_id: {
    type: String,
    required: true
  }, 
  jawaban: {
    type: Array,
    required: false
  }, 
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Participant', ParticipantPost);