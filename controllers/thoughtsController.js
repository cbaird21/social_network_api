const { createPoolCluster } = require('mysql2');
const { User, Thought } = require('../models')

module.exports = {
    // GET all users
    getThought(req, res) {
        Thought.find({})
            .then((thought) => res.status(200).json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // GET a thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { runValidators: true, new: true }
                )
            })
            .then((thought) =>
                !thought ? res.status(404).json({ message: "no user found with this id" })
                    : res.status(200).json(thought)
            )
            .catch((err) => {
                return res.status(500).json(err);
            })

    },
    // UPDATE a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID." })
            )
            .then((user) =>
                !user
                    ? res.status(404).son({ message: "Thought deleted but user not found" })
                    : res.status(200).json({ message: "The thought was succesfully deleted." })
            )
            .catch((err) => res.status(500).json(err))
    },
    // createReaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { id: req.params.thoughtId },
            { $addtoSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    }
}