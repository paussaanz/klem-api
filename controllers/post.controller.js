const Post = require("../models/Post.model");

module.exports.createPost = (req, res, next) => {
    Post.create(req.body)
      .then((createdPost) => {
        res.status(200).json({
          message: 'Post created successfully',
          createdPost
        });
      })
      .catch((error) => {
        next(error);
      });
  };