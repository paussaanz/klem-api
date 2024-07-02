const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  challenger: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challenged: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  challengerAnswers: [{
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Post.questions',
      required: true
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'Post.questions.answers',
      required: true
    }
  }],
  challengedAnswers: [{
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Post.questions',
      required: true
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'Post.questions.answers',
      required: true
    }
  }],
  challengerScore: {
    type: Number,
    default: 0
  },
  challengedScore: {
    type: Number,
    default: 0
  },
  challengerFinalScore: {
    type: Number,
    default: 0
  },
  challengedFinalScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Initiated', 'Waiting for opponent', 'Completed'],
    default: 'Initiated'
  }
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
