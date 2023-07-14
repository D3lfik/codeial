const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res) {
try {
const post = await Post.create({
content: req.body.content,
user: req.user._id
});

if (req.xhr){
  return res.status(200).json({
      data: {
        post:post
      },
      message:"Post Created!"
  });
}
req.flash('success', 'Post published !');
return res.redirect('back');
} catch (err) {
req.flash('error', err);
return res.redirect('back');
}
};


module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post.user == req.user.id) {
     // await post.remove();
      await Comment.deleteMany({ post: req.params.id });
       // CHANGE :: delete the associated likes for the post and all its comments' likes too
       await Like.deleteMany({likeable: post, onModel: 'Post'});
       await Like.deleteMany({_id: {$in: post.comments}});

      if (req.xhr){
        return res.status(200).json({
          data:{
            post_id: req.params.id
          },
          message :"Post deleted"
        });
      }
      req.flash('success', 'Post and Comments deleted !');
      return res.redirect('back');
    } else {
      req.flash('error', 'You cannot delete this post !');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error',err);
    return res.redirect('back');
  }
};
