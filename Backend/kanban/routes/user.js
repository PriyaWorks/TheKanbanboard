const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../model/user');
const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log('inside register')
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      // username : req.body.username,
      password : hash,
      profileimage : req.body.profileimage,
      confirmPassword : hash
    });
    user
      .save()
        .then( result => {
            result: result
            const token = jwt.sign({firstname: req.body.firstname, lastname: req.body.lastname}, 
              "secret_this_should_be_longer",
              { expiresIn: "1h"});
              res.status(200).json({
                token: token,
                expiresIn: 3600,
                firstname: req.body.firstname,
                lastname: req.body.lastname
              });
          });
          
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
    });  


router.post("/login", (req,res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then( user => {
        console.log(user)
      if(!user){
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }
      fetchedUser = user;
      console.log(fetchedUser)
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }
      const token = jwt.sign({firstname: fetchedUser.firstname, lastname: fetchedUser.lastname, userId: fetchedUser._id}, 
        "secret_this_should_be_longer",
        { expiresIn: "1h"});
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          firstname: fetchedUser.firstname,
          lastname: fetchedUser.lastname
        });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      }); 
    });
});

module.exports = router;
