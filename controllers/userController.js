const User = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .populate('thoughts')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({
                    message: 'User ID not found'
                })
                : res.json(user)    
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'User ID not found'
                })
                : res.json(user)    
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req,res) {
        user.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: 'User ID not found'
                    })
                    : User.Thought.deleteMany({ _id: {$in: user.Thought}})
            )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Unable to delete User, try again later'
                    })
                    : res.json({
                        message: 'Deleted User and their Thoughts'
                    })
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: { friends: req.body } },
         { runValidators: true, new: true }
        ) 
        .then((user) =>
             !user
                 ? res.status(404).json({ message: 'User ID not found' }) 
                 : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
     },
     deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.friendId }}},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'Friend ID not found'
                })
                : res.json(user) 
        )
        .catch((err) => res.status(500).json(err))
     }
};