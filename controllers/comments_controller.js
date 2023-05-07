const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req, res) {
    try {
      const post = await Post.findById(req.body.post);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
      console.log(comment);
      post.comments.push(comment);
      await post.save();
      return res.redirect("/");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  };


  module.exports.destroy = async function(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (comment.user == req.user.id) {
        let postId = comment.post;
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.error(err);
      return res.redirect('back');
    }
  };
  





  