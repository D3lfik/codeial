const User = require('../models/user');


module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    return res.render('user_profile',{
        title:"profile"
    
    });

}
 
//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }



    return res.render('user_sign_up',{
        title: "Codeial | Sign up"
    });

}
//render the sign in page 
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
   return  res.redirect('/users/profile');
  }

    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

//get the sign up data 
module.exports.create = async function(req, res) {
    try {
      if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
      }
  
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        const createdUser = await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in creating user while signing up', err);
      return res.redirect('back');
    }
  };
//sign in and create the session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}


//sign Out 
module.exports.destroySession = async function(req, res) {
  await new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return res.redirect('/');
} 