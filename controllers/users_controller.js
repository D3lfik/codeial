const User = require('../models/user');
//rendfer profile page
module.exports.profile = async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    
    return res.render('user_profile', {
      title: "Profile",
      profile_user: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

//update profile 
module.exports.update = async function(req, res){
  try {
    if (req.user.id == req.params.id) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect('back');
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    // Handle any errors that occurred during the update process
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}

//about page 
module.exports.about  = function(req,res){
  return res.render ('about',{
    title:"About"
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
  req.flash('success',"Logged in Successfully");
    return res.redirect('/');
}


//sign Out 
const { promisify } = require('util');

module.exports.destroySession = async function(req, res) {
  try {
    const logout = promisify(req.logout).bind(req);

    await logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    // Return an error response or redirect to an error page
    return res.status(500).send('Internal Server Error');
  }
};
