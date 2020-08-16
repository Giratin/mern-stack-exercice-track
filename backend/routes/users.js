const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get( async (req, res) => {
  const users = await User.find();
  res.json(users)
});

router.route('/add').post(async (req, res) => {
  const { username } = req.body;

  const isNewUser = await User.findOne({ username });

  if(isNewUser){
    return res.json({
      created : false,
      Message : "duplicated"
    })
  }

  const newUser = new User({ username });
  await newUser.save();

  res.json({
    created : true,
    Message : "User added!"
  }).status(200);
  
});

module.exports = router;