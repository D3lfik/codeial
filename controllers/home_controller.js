const Post = require('../models/post');
const User = require ('../models/user');

module.exports.home = async function(req, res) {
  try {
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .exec();

    const users = await User.find({});

    return res.render('home', {
      title: 'Codeial | Home',
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
























// module.exports.home = async function(req, res) {
//   try {
//     const posts = await Post.find({})
//       .populate('user')
//       .populate({
//         path: 'comments',
//         populate: {
//           path: 'user'
//         }
//       })
//       .exec(function (err,posts){
//         User.find({},function(err,users){
//           return res.render ('home', {
//           title: 'Codeial | Home',
//           posts: posts,
//           all_users: users
//         });
//         });

//         });
//      } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// };


// console.log(req.cookies);
  // res.cookie('user_id', 25);

  // Post.find({}, function(err, posts){
  //     return res.render('home', {
  //         title: "Codeial | Home",
  //         posts:  posts
  //     });
  // });
