
// This imports the model for User 
const { User } = require('../models');


module.exports = {

  // Retrieves user by name or ID

  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },


  // This creates a user and signs a token

  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'There was an error!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },


  // lThis logs in the user. {body} is deconstructed FYI
 
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "We can't find this person!" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'That is not the right password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  
  
};