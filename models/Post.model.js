const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  }
});

const questionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  answers: [answerSchema]
});

const postSchema = new Schema({
  coverImage: {
    type: String,
    required: true
  },
  ownerCompany:{
    type: String,
    required: true
  },
  privacy: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  trainingOutline: {
    type: String,
    required: true
  },
  trainingPDF: {
    type: String,
    required: true
  },
  insideImage: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  questions: {
    type: [questionSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    required: true
  }
}, {
  timestamps: true
});

function arrayLimit(val) {
  return val.length <= 5;
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
