const {Thought, User} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtid })
            .then((thought) => 
                !thought
                    ? res.status(404).json({
                        message: 'Thought ID not Found'
                    })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id}},
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'User ID not Found to post Thought'
                    })
                    : res.json('Created Thought'))
            .catch((err) => res.status(500).json(err))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({
                    message: 'Thought ID not Found'
                })
                : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'Thought ID not Found'
                    })
                    : User.findOneAndUpdate(
                        {thoughts: req.params.thoughtId},
                        { $pull: {thoughts: req.params.thoughtId}},
                        {new:true}
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'No User tied to thought'
                    })
                    : res.json({ message: 'Deleted Thought'})
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ 
                    message: 'Thought ID not Found'
                })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ 
                    message: 'Reaction ID not Found' 
                })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    }
}