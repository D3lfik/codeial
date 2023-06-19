const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require ('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.create = async function(req, res) {
    try {
      const post = await Post.findById(req.body.post);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
      console.log(comment);
      post.comments.push(comment);
       post.save();
       comment = await comment.populate('user','name email');
       // commentsMailer.newComment(comment);

       let job = queue.create('emails', comment ).save(function(err){
        if (err){
          console.log('error in creating a queue');
          return ;

        }
        console.log('job enqueued',job.id);
       });

       if (req.xhr){
      
        return res.status(200).json({
          data:{
            comment:comment
          },
          message:"Post created"
        });
       }

      req.flash('success','Comment published!');
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
  





  