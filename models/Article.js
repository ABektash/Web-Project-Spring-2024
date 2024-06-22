const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  articleImg: {
    type: String
  },
  description: {
    type: String
  },
  body: {
    type: String
  },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;